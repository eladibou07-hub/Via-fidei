(function(){
"use strict";
const SAINTS=window.VF_SAINTS||[];
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const norm=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const pad=n=>String(n).padStart(2,"0");
const keyFor=d=>pad(d.getMonth()+1)+"-"+pad(d.getDate());
const aelfFor=(key,year=(new Date()).getFullYear())=>"https://www.aelf.org/"+year+"-"+key+"/romain/messe";
const MONTHS=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const FKEY="viafidei-v8-saint-favs";
let favs=[];try{favs=JSON.parse(localStorage.getItem(FKEY)||"[]");if(!Array.isArray(favs))favs=[];}catch{favs=[]}
let saintMonth=(new Date()).getMonth()+1, saintFilter="Tous", saintQuery="";

const css=document.createElement("style");
css.textContent=`
.vfs-hero{background:linear-gradient(145deg,#fffdf8,#f5ede0);border-left:5px solid var(--lit)}
.vfs-today-grid{display:grid;gap:10px}.vfs-card{border:1px solid var(--line);border-radius:14px;padding:13px;background:#fff}
.vfs-card h3{margin:4px 0 5px}.vfs-rank{font-size:10px;text-transform:uppercase;letter-spacing:.06em;background:var(--soft);border-radius:999px;padding:4px 7px;color:var(--muted);display:inline-block}
.vfs-focus{background:#f5efe5;border-left:4px solid var(--accent);padding:10px;border-radius:9px;margin:10px 0}
.vfs-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.vfs-item{border:1px solid var(--line);background:#fff;border-radius:14px;padding:12px;cursor:pointer;text-align:left;color:inherit}.vfs-item .date{font-size:11px;color:var(--muted);font-weight:800}.vfs-item h3{font-size:16px;margin:5px 0}.vfs-star{float:right;font-size:17px;color:var(--accent)}
.vfs-months{display:flex;gap:6px;overflow:auto;padding:5px 0}.vfs-chip{white-space:nowrap;border:1px solid var(--line);background:#fff;border-radius:999px;padding:7px 10px;color:var(--muted);font-weight:700;cursor:pointer}.vfs-chip.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.vfs-head{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}.vfs-count{font-size:11px;color:var(--muted)}.vfs-toolbar{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0}
@media(max-width:560px){.vfs-grid{grid-template-columns:1fr}}
`;
document.head.appendChild(css);

function isFav(id){return favs.includes(id);}
function toggleFav(id){
  const i=favs.indexOf(id); if(i>=0)favs.splice(i,1); else favs.push(id);
  localStorage.setItem(FKEY,JSON.stringify(favs));
}
function dateLabel(key){
  const [m,d]=key.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-FR",{day:"numeric",month:"long"}).format(new Date(2026,m-1,d));
}
function entryMatches(s){
  if(!saintQuery && saintFilter!=="Favoris" && saintMonth && +s.key.slice(0,2)!==saintMonth)return false;
  if(saintQuery && !norm(s.name+" "+s.kind+" "+s.bio+" "+s.focus).includes(norm(saintQuery)))return false;
  if(saintFilter==="Tous")return true;
  if(saintFilter==="Favoris")return isFav(s.id);
  const hay=norm(s.kind+" "+s.rank+" "+s.name+" "+s.bio);
  return hay.includes(norm(saintFilter));
}
function findNext(from=new Date()){
  const cur=+keyFor(from).replace("-","");
  const sorted=SAINTS.slice().sort((a,b)=>a.key.localeCompare(b.key));
  return sorted.find(s=>+s.key.replace("-","")>=cur)||sorted[0]||null;
}
function openSaint(id){
  const s=SAINTS.find(x=>x.id===id);if(!s)return;
  const modal=$("modal"),title=$("modalTitle"),body=$("modalBody");
  title.textContent=s.name;
  body.innerHTML=
    '<div class="vfs-toolbar"><span class="vfs-rank">'+esc(s.rank)+'</span><span class="tag">'+esc(s.kind)+'</span><span class="small">'+esc(s.period)+'</span></div>'+
    '<p>'+esc(s.bio)+'</p>'+
    '<div class="vfs-focus"><strong>À retenir</strong><br>'+esc(s.focus)+'</div>'+
    '<div class="noteBox"><strong>Prière</strong><br>'+esc(s.prayer)+'</div>'+
    '<div class="vf-actions"><button class="btn secondary" id="vfsFav">'+(isFav(s.id)?"★ Retirer des favoris":"☆ Ajouter aux favoris")+'</button>'+
    '<a class="btn secondary" target="_blank" rel="noopener" href="'+aelfFor(s.key)+'">Messe AELF du '+esc(dateLabel(s.key))+' ↗</a></div>';
  $("vfsFav").onclick=()=>{toggleFav(s.id);openSaint(s.id);renderSaints();renderTodaySaint();};
  modal.classList.add("show");
}
function renderTodaySaint(){
  const card=$("vfSaint");if(!card)return;
  const today=new Date(), key=keyFor(today), list=SAINTS.filter(s=>s.key===key);
  if(list.length){
    card.className="card vfs-hero";card.innerHTML='<div class="kicker">Saint / fête du jour</div><div class="vfs-today-grid" id="vfsTodayList"></div><div class="vf-actions"><button class="btn secondary" id="vfsAll">Tous les saints</button><a class="btn secondary" target="_blank" rel="noopener" href="'+aelfFor(key)+'">Liturgie AELF ↗</a></div>';
    const box=$("vfsTodayList");
    list.forEach(s=>{const el=document.createElement("div");el.className="vfs-card";el.innerHTML='<span class="vfs-rank">'+esc(s.rank)+'</span><h2>'+esc(s.name)+'</h2><p>'+esc(s.bio)+'</p><div class="vfs-focus"><strong>Pour aujourd’hui :</strong> '+esc(s.focus)+'</div><button class="btn secondary">Voir la fiche & prière</button>';el.querySelector("button").onclick=()=>openSaint(s.id);box.appendChild(el);});
  }else{
    const next=findNext(today);
    card.className="card vfs-hero";card.innerHTML='<div class="kicker">Saints & fêtes</div><h2>Aucune notice locale aujourd’hui</h2><p class="small">Le calendrier AELF reste la référence pour la célébration liturgique exacte du jour.</p>'+(next?'<div class="vfs-card"><span class="small">Prochaine notice</span><h3>'+esc(dateLabel(next.key))+' · '+esc(next.name)+'</h3><button class="btn secondary" id="vfsNext">Découvrir</button></div>':'')+'<div class="vf-actions"><button class="btn secondary" id="vfsAll">Tous les saints</button><a class="btn secondary" target="_blank" rel="noopener" href="'+aelfFor(key)+'">Liturgie AELF ↗</a></div>';
    if(next)$("vfsNext").onclick=()=>openSaint(next.id);
  }
  $("vfsAll").onclick=()=>{document.querySelector('[data-page="explore"]').click();document.querySelector('[data-vftab="saints"]').click();};
}

function addSaintsTab(){
  const tabs=document.querySelector(".vf-tabs");if(!tabs||document.querySelector('[data-vftab="saints"]'))return;
  const b=document.createElement("button");b.className="vf-tab";b.dataset.vftab="saints";b.textContent="😇 Saints";
  tabs.appendChild(b);
  b.onclick=()=>{
    document.querySelectorAll("[data-vftab]").forEach(x=>x.classList.toggle("active",x===b));
    renderSaints();
  };
}
function renderSaints(){
  const box=$("vfExploreContent");if(!box)return;
  box.innerHTML=
   '<div class="vfs-head"><div><h3>Saints & grandes fêtes</h3><p class="small">Calendrier local enrichi · notices courtes · prières · lien AELF.</p></div><button class="btn secondary" id="vfsRandom">Découvrir au hasard</button></div>'+
   '<input id="vfsSearch" class="search" placeholder="Rechercher : Augustin, martyr, docteur, Marie…">'+
   '<div class="vfs-months" id="vfsMonths"></div>'+
   '<div class="vfs-toolbar" id="vfsFilters"></div>'+
   '<div class="vfs-count" id="vfsCount"></div><div class="vfs-grid" id="vfsGrid"></div>';
  $("vfsSearch").value=saintQuery;$("vfsSearch").oninput=e=>{saintQuery=e.target.value;drawSaintGrid();};
  const months=$("vfsMonths");
  const all=document.createElement("button");all.className="vfs-chip"+(saintMonth===0?" active":"");all.textContent="Toute l’année";all.onclick=()=>{saintMonth=0;renderSaints();};months.appendChild(all);
  MONTHS.forEach((m,i)=>{const c=document.createElement("button");c.className="vfs-chip"+(saintMonth===i+1?" active":"");c.textContent=m;c.onclick=()=>{saintMonth=i+1;renderSaints();};months.appendChild(c);});
  ["Tous","Favoris","Martyr","Docteur","Apôtre","Marie","Prêtre","Évêque","Religieuse"].forEach(f=>{const c=document.createElement("button");c.className="vfs-chip"+(saintFilter===f?" active":"");c.textContent=f;c.onclick=()=>{saintFilter=f;drawSaintGrid();document.querySelectorAll("#vfsFilters .vfs-chip").forEach(x=>x.classList.toggle("active",x===c));};$("vfsFilters").appendChild(c);});
  $("vfsRandom").onclick=()=>{if(!SAINTS.length)return;openSaint(SAINTS[Math.floor(Math.random()*SAINTS.length)].id);};
  drawSaintGrid();
}
function drawSaintGrid(){
  const grid=$("vfsGrid"),count=$("vfsCount");if(!grid)return;
  const list=SAINTS.filter(entryMatches).sort((a,b)=>a.key.localeCompare(b.key)||a.name.localeCompare(b.name));
  count.textContent=list.length+" notice"+(list.length>1?"s":"")+" affichée"+(list.length>1?"s":"");
  grid.innerHTML=list.length?"":'<div class="vf-empty">Aucun saint ne correspond à ce filtre.</div>';
  list.forEach(s=>{const el=document.createElement("button");el.className="vfs-item";el.innerHTML='<span class="vfs-star">'+(isFav(s.id)?"★":"")+'</span><div class="date">'+esc(dateLabel(s.key))+'</div><h3>'+esc(s.name)+'</h3><div class="vf-meta"><span class="vfs-rank">'+esc(s.rank)+'</span><span class="small">'+esc(s.kind)+'</span></div><p class="small">'+esc(s.focus)+'</p>';el.onclick=()=>openSaint(s.id);grid.appendChild(el);});
}

addSaintsTab();
renderTodaySaint();

const ver=document.querySelector("header .small");if(ver)ver.textContent="V8 · Saints · Sources · FR/LAT";
document.title="Via Fidei — V8";
})();