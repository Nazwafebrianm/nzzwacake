const items=[
{name:"Strawberry Cloud",price:"Rp85.000",cat:"Strawberry",img:"cake-01.svg",desc:"Lembut, fresh, dan manisnya pas."},
{name:"Choco Fudge",price:"Rp95.000",cat:"Chocolate",img:"cake-02.svg",desc:"Rich chocolate dengan tekstur fudgy."},
{name:"Caramel Honey",price:"Rp90.000",cat:"Caramel",img:"cake-03.svg",desc:"Creamy caramel dengan sentuhan honey."},
{name:"Berry Shortcake",price:"Rp88.000",cat:"Strawberry",img:"cake-04.svg",desc:"Shortcake ringan dengan berry cream."},
{name:"Orange Cream",price:"Rp82.000",cat:"Citrus",img:"cake-05.svg",desc:"Fresh citrus cream untuk mood cerah."},
{name:"Black Velvet",price:"Rp99.000",cat:"Chocolate",img:"cake-06.svg",desc:"Elegant dark cake dengan cream lembut."}
];
const grid=document.getElementById("grid");
const wa=n=>"https://wa.me/6285864610573?text=halo%20kakak%20aku%20mau%20pesen%20"+encodeURIComponent(n)+"%20dong.....";
function render(list){grid.innerHTML=list.length?list.map(x=>`<article class="card"><div class="photo"><img src="${x.img}" alt="${x.name} cake"></div><div class="body"><small>NZZWACAKE MENU</small><h3>${x.name}</h3><p>${x.desc}</p><span class="price">${x.price}</span><a class="order" target="_blank" href="${wa(x.name)}">Order ↗</a></div></article>`).join(""):"<p>Menu tidak ditemukan.</p>"}
render(items);
document.getElementById("filters").onclick=e=>{if(e.target.tagName!=="BUTTON")return;document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");const f=e.target.dataset.filter;render(f==="all"?items:items.filter(x=>x.cat===f))};
document.getElementById("menu").onclick=()=>document.querySelector(".nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.querySelector(".nav").classList.remove("open"));
document.getElementById("searchOpen").onclick=()=>{document.getElementById("searchbar").style.display="block";document.getElementById("search").focus()};
document.getElementById("searchClose").onclick=()=>document.getElementById("searchbar").style.display="none";
document.getElementById("search").oninput=e=>{const q=e.target.value.toLowerCase();render(items.filter(x=>(x.name+" "+x.cat+" "+x.desc).toLowerCase().includes(q)))};
