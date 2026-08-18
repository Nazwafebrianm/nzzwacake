const items=[{"name": "Strawberry Cake", "cat": "strawberry", "url": "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1200", "source": "https://www.pexels.com/photo/strawberry-cake-1126359/", "desc": "Cake strawberry aesthetic dengan cream putih.", "fallback": "cake-1-fallback.svg"}, {"name": "Chocolate Cake", "cat": "chocolate", "url": "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200", "source": "https://www.pexels.com/photo/chocolate-cake-291528/", "desc": "Chocolate cake rich dengan tampilan elegan.", "fallback": "cake-2-fallback.svg"}, {"name": "Pink Celebration", "cat": "celebration", "url": "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=1200", "source": "https://www.pexels.com/photo/pink-cake-1028714/", "desc": "Cake cantik bernuansa pink untuk celebration.", "fallback": "cake-3-fallback.svg"}, {"name": "Berry Cream", "cat": "berry", "url": "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=1200", "source": "https://www.pexels.com/photo/berry-cake-1055272/", "desc": "Cake dengan berry dan cream yang fresh.", "fallback": "cake-4-fallback.svg"}, {"name": "Minimal White Cake", "cat": "minimal", "url": "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=1200", "source": "https://www.pexels.com/photo/white-cake-1721932/", "desc": "White cake minimal untuk vibe modern.", "fallback": "cake-5-fallback.svg"}, {"name": "Sweet Party Cake", "cat": "party", "url": "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=1200", "source": "https://www.pexels.com/photo/cake-2144112/", "desc": "Cake colorful untuk momen manis.", "fallback": "cake-6-fallback.svg"}];const grid=document.getElementById("grid");const wa=n=>"https://wa.me/6285864610573?text=halo%20kakak%20aku%20mau%20pesen%20"+encodeURIComponent(n)+"%20dong.....";function render(list){grid.innerHTML=list.length?list.map(x=>`<article class="card"><div class="photo"><img src="${x.url}" alt="${x.name}" loading="lazy" onerror="this.onerror=null;this.src='${x.fallback}'"><span class="tag">REAL PHOTO</span></div><div class="body"><small>NZZWACAKE MENU</small><h3>${x.name}</h3><p>${x.desc}</p><span class="price">Rp85.000</span><a class="order" target="_blank" href="${wa(x.name)}">Order ↗</a><div style="clear:both;margin-top:10px"><a class="source" target="_blank" href="${x.source}">View source ↗</a></div></div></article>`).join(""):"<p>Menu tidak ditemukan.</p>"}render(items);document.getElementById("filters").onclick=e=>{if(e.target.tagName!=="BUTTON")return;document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");const f=e.target.dataset.filter;render(f==="all"?items:items.filter(x=>x.cat===f))};document.getElementById("menu").onclick=()=>document.querySelector(".nav").classList.toggle("open");document.getElementById("searchOpen").onclick=()=>{document.getElementById("searchbar").style.display="block";document.getElementById("search").focus()};document.getElementById("searchClose").onclick=()=>document.getElementById("searchbar").style.display="none";document.getElementById("search").oninput=e=>{const q=e.target.value.toLowerCase();render(items.filter(x=>(x.name+" "+x.cat+" "+x.desc).toLowerCase().includes(q)))};

/* ================================
   AUTO SCROLL — 2s INACTIVITY
   ================================ */
(() => {
  const IDLE_DELAY = 2000;       // mulai setelah 2 detik tanpa aktivitas
  const SCROLL_SPEED = 0.55;     // px per frame — pelan
  const TOP_SPEED = 950;         // px per frame — cepat saat kembali ke atas
  let idleTimer = null;
  let autoScrolling = false;
  let rafId = null;
  let returningToTop = false;

  const atBottom = () =>
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 3;

  function stopAutoScroll() {
    autoScrolling = false;
    returningToTop = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function startAutoScroll() {
    if (autoScrolling) return;
    autoScrolling = true;
    returningToTop = false;
    rafId = requestAnimationFrame(tick);
  }

  function tick() {
    if (!autoScrolling) return;

    if (returningToTop) {
      const nextY = Math.max(0, window.scrollY - TOP_SPEED);
      window.scrollTo(0, nextY);

      if (nextY <= 0) {
        returningToTop = false;
      }
    } else {
      window.scrollBy(0, SCROLL_SPEED);

      if (atBottom()) {
        returningToTop = true;
      }
    }

    rafId = requestAnimationFrame(tick);
  }

  function resetIdleTimer() {
    stopAutoScroll();
    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {
      startAutoScroll();
    }, IDLE_DELAY);
  }

  // Aktivitas yang dianggap sebagai interaksi user.
  ["wheel", "touchstart", "touchmove", "pointerdown", "keydown", "click"].forEach(eventName => {
    window.addEventListener(eventName, resetIdleTimer, { passive: true });
  });

  // Mulai hitungan 2 detik sejak halaman selesai dimuat.
  window.addEventListener("load", resetIdleTimer);
  resetIdleTimer();
})();
