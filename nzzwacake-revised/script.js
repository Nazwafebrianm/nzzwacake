const track = document.getElementById("track");
const dots = document.getElementById("dots");
let active = 0;

function render() {
  track.innerHTML = videos.map((v) => `
    <article class="video-card">
      <div class="frame yt-lite" data-id="${v.id}" data-title="${v.title}">
        <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy" width="480" height="360">
        <button type="button" aria-label="Putar video ${v.title}">▶</button>
      </div>
      <div class="video-text">
        <small>${v.topic}</small>
        <h3>${v.title}</h3>
      </div>
    </article>
  `).join("");

  dots.innerHTML = videos.map((_, i) => 
    `<button class="${i === 0 ? 'active' : ''}" aria-label="Video ${i + 1}"></button>`
  ).join("");

  [...dots.children].forEach((b, i) => {
    b.onclick = () => go(i);
  });
}

function go(i) {
  active = (i + videos.length) % videos.length;
  const card = track.querySelector(".video-card");
  if (!card) return;
  const width = card.getBoundingClientRect().width + 18;
  track.style.transform = `translateX(-${active * width}px)`;
  [...dots.children].forEach((b, idx) => b.classList.toggle("active", idx === active));
}

document.getElementById("previous").onclick = () => go(active - 1);
document.getElementById("next").onclick = () => go(active + 1);
window.onresize = () => go(active);

const nav = document.querySelector("nav");
const menu = document.querySelector(".menu");
menu.onclick = () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
};

document.querySelectorAll("nav a").forEach(a => {
  a.onclick = () => nav.classList.remove("open");
});

document.getElementById("orderForm").onsubmit = (e) => {
  e.preventDefault();
  document.getElementById("message").textContent = "Terima kasih! Pesanmu sudah kami terima. Tim nzzwacake akan segera menghubungi kamu.";
  e.target.reset();
};

document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("click", function(e) {
  const btn = e.target.closest(".yt-lite button");
  if (!btn) return;
  const container = btn.closest(".yt-lite");
  const id = container.dataset.id;
  const title = container.dataset.title || "";
  container.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="${title}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
});

render();
