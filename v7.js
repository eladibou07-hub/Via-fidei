(function(){
"use strict";
const D=window.VF7_DATA||{questions:[],library:[],saints:{},exam:[]};
const $=id=>document.getElementById(id);\nconst modalEl=$("modalEl"), modalTitleEl=$("modalTitleEl"), modalBodyEl=$("modalBodyEl");
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const norm=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const pad=n=>String(n).padStart(2,"0");
const localISO=(d=new Date())=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const dateKey=(d=new Date())=>pad(d.getMonth()+1)+"-"+pad(d.getDate());
const BOOKS={"Genèse":"Gn","Exode":"Ex","Psaume":"Ps","Psaumes":"Ps","Ps":"Ps","Isaïe":"Is","Matthieu":"Mt","Marc":"Mc","Luc":"Lc","Jean":"Jn","Actes":"Ac","Romains":"Rm","1 Corinthiens":"1Co","2 Corinthiens":"2Co","Galates":"Ga","Éphésiens":"Ep","Philippiens":"Ph","Colossiens":"Col","1 Timothée":"1Tm","2 Timothée":"2Tm","Hébreux":"He","Jacques":"Jc","1 Pierre":"1P","2 Pierre":"2P","1 Jean":"1Jn","2 Jean":"2Jn","3 Jean":"3Jn","Jude":"Jude","Apocalypse":"Ap","Daniel":"Dn"};
function bibleUrl(ref){
  const x=String(ref||"").replace(/^cf\.\s*/i,"").split(";")[0].trim();
  const m=x.match(/^(.+?)\s+(\d+)/); if(!m)return "https://www.aelf.org/bible";
  const book=m[1].trim(); let code=BOOKS[book];
  if(!code){const k=Object.keys(BOOKS).find(y=>norm(y)===norm(book));if(k)code=BOOKS[k];}
  return code?"https://www.aelf.org/bible/"+code+"/"+m[2]:"https://www.aelf.org/bible";
}
const CEC_URL="https://www.vatican.va/archive/FRA0013/_INDEX.HTM";

const style=document.createElement("style");
style.textContent=`
:root{--lit:#755a34}
body:before{content:"";position:fixed;left:0;right:0;top:0;height:4px;background:var(--lit);z-index:100}
.vf-toolbar{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.vf-pill{border:1px solid var(--line);background:#fff;color:var(--muted);border-radius:999px;padding:8px 11px;font-weight:750;cursor:pointer;text-decoration:none;font-size:12px}.vf-pill.active{background:var(--accent);border-color:var(--accent);color:#fff}
.vf-saint{border-left:5px solid var(--lit)}.vf-office-main{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center}.vf-office-list{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}
.vf-bookmark{font-size:13px}.vf-30{display:none}.vf-30.show{display:block}
.vf-tabs{display:flex;gap:7px;overflow:auto;margin-top:10px}.vf-tab{white-space:nowrap;border:1px solid var(--line);background:white;border-radius:999px;padding:8px 11px;font-weight:750;color:var(--muted)}.vf-tab.active{background:var(--accent);color:white;border-color:var(--accent)}
.vf-result,.vf-q,.vf-lib,.vf-mark,.vf-entry{border-top:1px solid var(--line);padding:12px 0}.vf-result:first-child,.vf-q:first-child,.vf-lib:first-child,.vf-mark:first-child,.vf-entry:first-child{border-top:0}.vf-result button,.vf-q button{width:100%;text-align:left;background:none;border:0;padding:0;color:inherit;cursor:pointer;font:inherit}
.vf-meta{display:flex;gap:6px;flex-wrap:wrap;margin-top:5px}.vf-type{font-size:10px;text-transform:uppercase;letter-spacing:.06em;background:var(--soft);padding:4px 7px;border-radius:999px;color:var(--muted)}
.vf-domain{margin:12px 0}.vf-domain-head{display:flex;justify-content:space-between;gap:10px;font-size:13px;margin-bottom:5px}.vf-domain .progress{height:8px}
.vf-jgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.vf-jgrid .full{grid-column:1/-1}.vf-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.vf-exam-cat{margin:16px 0 7px;color:var(--accent);font-weight:800}.vf-exam-item{display:flex;gap:9px;align-items:flex-start;padding:8px 0;border-top:1px solid var(--line)}.vf-exam-item input{width:auto;margin-top:4px}
.vf-lib a{color:var(--accent);font-weight:800;text-decoration:none}.vf-empty{padding:14px 0;color:var(--muted)}
.vf-lit-chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:999px;padding:5px 9px;background:#fff;font-size:11px;font-weight:800;margin-top:8px}
.vf-print-root{display:none}
@media(max-width:520px){.vf-jgrid{grid-template-columns:1fr}.vf-jgrid .full{grid-column:auto}.navbtn{font-size:10px!important}.navbtn b{font-size:18px!important}}
@media print{body>*:not(.vf-print-root){display:none!important}.vf-print-root{display:block!important;padding:24px;color:#111;background:#fff;font-family:Georgia,serif}.vf-print-root h1,.vf-print-root h2{font-family:Georgia,serif}.vf-print-item{break-inside:avoid;border-bottom:1px solid #bbb;padding:10px 0}.vf-print-small{font-size:11px;color:#555}}
`;
document.head.appendChild(style);

const MARK_KEY="viafidei-v7-bookmarks";
let marks=[];
try{marks=JSON.parse(localStorage.getItem(MARK_KEY)||"[]");if(!Array.isArray(marks))marks=[];}catch{marks=[]}
const markId=(type,id)=>type+":"+id;
function hasMark(type,id){return marks.some(m=>m.id===markId(type,id));}
function toggleMark(type,id,title,meta,target){
  const key=markId(type,id),i=marks.findIndex(m=>m.id===key);
  if(i>=0)marks.splice(i,1);else marks.unshift({id:key,type,title,meta:meta||"",target:target||"",saved:Date.now()});
  localStorage.setItem(MARK_KEY,JSON.stringify(marks));
  updateDayBookmarkButtons(); if($("vfExploreContent")&&currentExploreTab==="marks")renderMarks();
}
function gotoPage(id){
  document.querySelectorAll(".navbtn").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  const btn=document.querySelector('.navbtn[data-page="'+id+'"]');if(btn)btn.classList.add("active");
  const page=$(id);if(page)page.classList.add("active");
  if(id==="path")renderProgress();
}

/* Navigation + Explorer */
const main=document.querySelector("main");
const journalPage=$("journal");
const explore=document.createElement("section");
explore.id="explore";explore.className="page";
explore.innerHTML=`
<div class="card"><div class="kicker">Explorer Via Fidei</div><h2>Rechercher dans toute l’application</h2>
<input id="vfGlobalSearch" class="search" placeholder="Ex. anges, Eucharistie, purgatoire, Marie…">
<div id="vfSearchResults"></div></div>
<div class="card"><div class="vf-tabs">
<button class="vf-tab active" data-vftab="questions">❓ Questions de foi</button>
<button class="vf-tab" data-vftab="marks">🔖 Marque-pages</button>
<button class="vf-tab" data-vftab="library">📚 Bibliothèque</button>
</div><div id="vfExploreContent"></div></div>`;
main.insertBefore(explore,journalPage);
const navin=document.querySelector(".navin");navin.style.gridTemplateColumns="repeat(5,1fr)";
const jbtn=document.querySelector('.navbtn[data-page="journal"]');
const ebtn=document.createElement("button");ebtn.className="navbtn";ebtn.dataset.page="explore";ebtn.innerHTML="<b>🔎</b>Explorer";
navin.insertBefore(ebtn,jbtn);ebtn.onclick=()=>{gotoPage("explore");renderExplore(currentExploreTab);};

/* Global search */
function searchAll(q){
  const n=norm(q).trim();if(!n)return [];
  const out=[];
  DAYS.forEach((d,i)=>{if(norm(d.title+" "+d.ref+" "+d.understand+" "+d.cec).includes(n))out.push({type:"jour",title:d.title,meta:d.ref+" · CEC "+d.cec,action:()=>{current=i;renderDay();gotoPage("today");}});});
  PRAYERS.forEach(p=>{if(norm(p.name+" "+p.cat+" "+p.text+" "+(p.latinTitle||"")).includes(n))out.push({type:"prière",title:p.name,meta:p.cat,action:()=>openPrayer(p,"pray")});});
  D.questions.forEach((x,i)=>{if(norm(x.q+" "+x.a+" "+x.keys+" "+x.cec).includes(n))out.push({type:"question",title:x.q,meta:"CEC "+x.cec,action:()=>openQuestion(i)});});
  D.library.forEach((x,i)=>{if(norm(x.title+" "+x.cat+" "+x.desc+" "+x.keys).includes(n))out.push({type:"source",title:x.title,meta:x.cat,action:()=>window.open(x.url,"_blank","noopener")});});
  return out.slice(0,45);
}
function renderSearch(q){
  const box=$("vfSearchResults");if(!q.trim()){box.innerHTML='<p class="small">La recherche couvre les 365 jours, les prières, les questions de foi et la bibliothèque.</p>';return;}
  const res=searchAll(q);box.innerHTML=res.length?"":'<div class="vf-empty">Aucun résultat.</div>';
  res.forEach(r=>{const el=document.createElement("div");el.className="vf-result";el.innerHTML='<button><strong>'+esc(r.title)+'</strong><div class="vf-meta"><span class="vf-type">'+esc(r.type)+'</span><span class="small">'+esc(r.meta)+'</span></div></button>';el.querySelector("button").onclick=r.action;box.appendChild(el);});
}
$("vfGlobalSearch").oninput=e=>renderSearch(e.target.value);renderSearch("");

let currentExploreTab="questions";
document.querySelectorAll("[data-vftab]").forEach(b=>b.onclick=()=>{currentExploreTab=b.dataset.vftab;document.querySelectorAll("[data-vftab]").forEach(x=>x.classList.toggle("active",x===b));renderExplore(currentExploreTab);});
function renderExplore(tab){if(tab==="questions")renderQuestions();else if(tab==="marks")renderMarks();else renderLibrary();}

/* Questions de foi */
function relatedDay(q){
  const words=norm(q.keys).split(/\s+/).filter(x=>x.length>4);
  let best=-1,score=0;DAYS.forEach((d,i)=>{const t=norm(d.title+" "+d.understand);let s=0;words.forEach(w=>{if(t.includes(w))s++;});if(s>score){score=s;best=i;}});
  return best;
}
function openQuestion(i){
  const q=D.questions[i];modalTitleEl.textContent=q.q;
  modalBodyEl.innerHTML='<p>'+esc(q.a)+'</p><div class="noteBox"><strong>Repères</strong><br>📚 CEC '+esc(q.cec)+'<br>📖 '+esc(q.bible)+'</div><div class="vf-actions"><a class="btn secondary" target="_blank" rel="noopener" href="'+esc(bibleUrl(q.bible))+'">Bible AELF ↗</a><a class="btn secondary" target="_blank" rel="noopener" href="'+CEC_URL+'">Catéchisme ↗</a><button class="btn secondary" id="vfQMark">'+(hasMark("question",i)?"★ Retirer":"☆ Marquer")+'</button></div>';
  const rd=relatedDay(q);if(rd>=0){const b=document.createElement("button");b.className="btn soft";b.textContent="Voir dans le parcours";b.onclick=()=>{modalEl.classList.remove("show");current=rd;renderDay();gotoPage("today");};modalBodyEl.querySelector(".vf-actions").appendChild(b);}
  $("vfQMark").onclick=()=>{toggleMark("question",i,q.q,"CEC "+q.cec,String(i));openQuestion(i);};
  modalEl.classList.add("show");
}
function renderQuestions(filter=""){
  const box=$("vfExploreContent");box.innerHTML='<div><h3>Questions de foi</h3><p class="small">Réponses courtes avec références au Catéchisme et à la Bible.</p><input id="vfQuestionSearch" class="search" placeholder="Poser un mot-clé ou une question…"><div id="vfQuestionList"></div></div>';
  const draw=q=>{
    const n=norm(q);const list=D.questions.map((x,i)=>({x,i})).filter(o=>!n||norm(o.x.q+" "+o.x.a+" "+o.x.keys).includes(n));
    const l=$("vfQuestionList");l.innerHTML=list.length?"":'<div class="vf-empty">Aucune question correspondante.</div>';
    list.forEach(({x,i})=>{const el=document.createElement("div");el.className="vf-q";el.innerHTML='<button><strong>'+esc(x.q)+'</strong><div class="vf-meta"><span class="small">CEC '+esc(x.cec)+'</span>'+ (hasMark("question",i)?'<span class="vf-type">★</span>':'')+'</div></button>';el.querySelector("button").onclick=()=>openQuestion(i);l.appendChild(el);});
  };
  $("vfQuestionSearch").oninput=e=>draw(e.target.value);$("vfQuestionSearch").value=filter;draw(filter);
}

/* Bibliothèque */
function renderLibrary(){
  const box=$("vfExploreContent");box.innerHTML='<h3>Bibliothèque</h3><p class="small">Accès direct aux grandes sources officielles. Les liens externes nécessitent internet.</p>';
  D.library.forEach((x,i)=>{const el=document.createElement("div");el.className="vf-lib";el.innerHTML='<div class="row" style="justify-content:space-between;align-items:start"><div><span class="tag">'+esc(x.cat)+'</span><h3 style="margin:8px 0 4px"><a target="_blank" rel="noopener" href="'+esc(x.url)+'">'+esc(x.title)+' ↗</a></h3><div class="small">'+esc(x.desc)+'</div></div><button class="fav" aria-label="marque-page">'+(hasMark("library",i)?"★":"☆")+'</button></div>';el.querySelector(".fav").onclick=()=>{toggleMark("library",i,x.title,x.cat,String(i));renderLibrary();};box.appendChild(el);});
}
function renderMarks(){
  const box=$("vfExploreContent");box.innerHTML='<h3>Marque-pages</h3><p class="small">Journées, lectures, références CEC, questions et sources enregistrées. Tes favoris de prières apparaissent aussi ici.</p>';
  if(!marks.length && (!favs||!favs.length)){box.innerHTML+='<div class="vf-empty">Aucun marque-page pour le moment.</div>';return;}
  marks.forEach(m=>{const el=document.createElement("div");el.className="vf-mark";el.innerHTML='<div class="row" style="justify-content:space-between;align-items:start"><div><span class="vf-type">'+esc(m.type)+'</span><strong style="display:block;margin-top:6px">'+esc(m.title)+'</strong><span class="small">'+esc(m.meta)+'</span></div><button class="btn soft">Ouvrir</button></div>';el.querySelector("button").onclick=()=>openMark(m);box.appendChild(el);});
  (favs||[]).forEach(name=>{const p=PRAYERS.find(x=>x.name===name);if(!p)return;const el=document.createElement("div");el.className="vf-mark";el.innerHTML='<div class="row" style="justify-content:space-between"><div><span class="vf-type">prière favorite</span><strong style="display:block;margin-top:6px">'+esc(name)+'</strong></div><button class="btn soft">Prier</button></div>';el.querySelector("button").onclick=()=>openPrayer(p,"pray");box.appendChild(el);});
}
function openMark(m){
  if(m.type==="day"){current=+m.target;renderDay();gotoPage("today");}
  else if(m.type==="bible"||m.type==="cec"||m.type==="library")window.open(m.target.startsWith("http")?m.target:(D.library[+m.target]?.url||CEC_URL),"_blank","noopener");
  else if(m.type==="question")openQuestion(+m.target);
}

/* Today: modes, bookmarks, saint, offices */
let timeMode=localStorage.getItem("viafidei-v7-time")||"15";
const heroCards=document.querySelectorAll("#today .card.hero");
if(heroCards[1]){
  const tools=document.createElement("div");tools.id="vfTodayTools";tools.innerHTML='<div class="vf-toolbar"><span class="small" style="align-self:center"><strong>Temps disponible :</strong></span><button class="vf-pill" data-vftime="5">5 min</button><button class="vf-pill" data-vftime="15">15 min</button><button class="vf-pill" data-vftime="30">30 min</button></div><div class="vf-toolbar" id="vfDayMarks"></div>';
  heroCards[1].appendChild(tools);
}
const mainTodayCard=document.querySelector("#today .card:not(.hero)");
const extra30=document.createElement("div");extra30.id="vf30Card";extra30.className="card vf-30";extra30.innerHTML='<div class="kicker">Mode 30 minutes</div><h3>Prolonger la journée</h3><p class="small">Après les cinq étapes : relis le passage dans son contexte, consulte les références CEC puis écris quelques lignes dans ton carnet.</p><div class="vf-actions"><button class="btn secondary" id="vf30Bible">Lire le chapitre</button><button class="btn secondary" id="vf30Journal">Ouvrir mon carnet</button></div>';
mainTodayCard.insertAdjacentElement("afterend",extra30);
$("vf30Bible").onclick=()=>window.open(bibleUrl(DAYS[current].ref),"_blank","noopener");$("vf30Journal").onclick=()=>gotoPage("journal");
document.querySelectorAll("[data-vftime]").forEach(b=>b.onclick=()=>{timeMode=b.dataset.vftime;localStorage.setItem("viafidei-v7-time",timeMode);applyTimeMode();});
function applyTimeMode(){
  document.querySelectorAll("[data-vftime]").forEach(b=>b.classList.toggle("active",b.dataset.vftime===timeMode));
  const steps=[...document.querySelectorAll("#today .step")];steps.forEach((s,i)=>{s.style.display=(timeMode==="5"&&![0,1,3].includes(i))?"none":"";});
  extra30.classList.toggle("show",timeMode==="30");
  const stat=$("dayStat"),s=ds(current);if(timeMode==="5"){const ids=[0,1,3],n=ids.filter(i=>s.steps[i]).length;stat.textContent="Mode 5 min · "+n+"/3 étapes essentielles cochées"+(s.complete?" · journée terminée":"");}
  else stat.textContent=(timeMode==="30"?"Mode 30 min · ":"")+s.steps.filter(Boolean).length+"/5 étapes cochées"+(s.complete?" · journée terminée":"");
}
function updateDayBookmarkButtons(){
  const box=$("vfDayMarks");if(!box)return;const d=DAYS[current];
  box.innerHTML='<button class="vf-pill vf-bookmark" data-m="day">'+(hasMark("day",current)?"★":"☆")+' Journée</button><button class="vf-pill vf-bookmark" data-m="bible">'+(hasMark("bible",current)?"★":"☆")+' Lecture</button><button class="vf-pill vf-bookmark" data-m="cec">'+(hasMark("cec",current)?"★":"☆")+' CEC</button>';
  box.querySelector('[data-m="day"]').onclick=()=>toggleMark("day",current,d.title,d.date,String(current));
  box.querySelector('[data-m="bible"]').onclick=()=>toggleMark("bible",current,d.ref,d.title,bibleUrl(d.ref));
  box.querySelector('[data-m="cec"]').onclick=()=>toggleMark("cec",current,"CEC "+d.cec,d.title,CEC_URL);
}
const prevRenderDay=renderDay;
renderDay=function(){prevRenderDay();applyTimeMode();updateDayBookmarkButtons();};

/* Saint du jour */
function addSaintCard(){
  const now=new Date(),s=D.saints[dateKey(now)],first=heroCards[0];if(!first)return;
  const card=document.createElement("div");card.className="card vf-saint";card.id="vfSaint";
  const monthUrl="https://www.aelf.org/calendrier/romain/"+now.getFullYear()+"/"+pad(now.getMonth()+1);
  if(s)card.innerHTML='<div class="kicker">Saint / fête du jour</div><h2>'+esc(s.name)+'</h2><p>'+esc(s.bio)+'</p><div class="noteBox"><strong>Prière</strong><br>'+esc(s.prayer)+'</div><a class="btn secondary" target="_blank" rel="noopener" href="'+monthUrl+'">Calendrier AELF ↗</a>';
  else {const li=litInfo(now);card.innerHTML='<div class="kicker">Calendrier du jour</div><h2>'+esc(li.name)+'</h2><p class="small">Via Fidei affiche ici une notice lorsqu’une fête ou une mémoire majeure est disponible dans sa bibliothèque locale.</p><a class="btn secondary" target="_blank" rel="noopener" href="'+monthUrl+'">Voir les saints et fêtes AELF ↗</a>';}
  first.insertAdjacentElement("afterend",card);
}
function officeRoute(){
  const h=new Date().getHours();
  if(h<9)return ["laudes","Laudes"];
  if(h<11)return ["tierce","Tierce"];
  if(h<14)return ["sexte","Sexte"];
  if(h<17)return ["none","None"];
  if(h<21)return ["vepres","Vêpres"];
  return ["complies","Complies"];
}
function addOfficeCard(){
  const anchor=$("vfSaint")||heroCards[0];if(!anchor)return;
  const date=localISO(),rec=officeRoute();
  const mk=(route,label)=>'<a class="vf-pill" target="_blank" rel="noopener" href="https://www.aelf.org/'+date+'/romain/'+route+'">'+label+' ↗</a>';
  const card=document.createElement("div");card.className="card";card.id="vfOffice";
  card.innerHTML='<div class="kicker">Liturgie des Heures</div><div class="vf-office-main"><div><h2 style="margin-bottom:4px">Office maintenant : '+rec[1]+'</h2><div class="small">Suggestion selon l’heure de ton téléphone.</div></div>'+mk(rec[0],"Ouvrir")+'</div><details style="margin-top:10px"><summary class="small" style="cursor:pointer;font-weight:800">Tous les offices</summary><div class="vf-office-list">'+mk("lectures","Lectures")+mk("laudes","Laudes")+mk("tierce","Tierce")+mk("sexte","Sexte")+mk("none","None")+mk("vepres","Vêpres")+mk("complies","Complies")+'</div></details>';
  anchor.insertAdjacentElement("afterend",card);
  const old=$("vfOffices");if(old)old.remove();
}
function liturgicalTheme(){
  const li=litInfo(new Date()),map={blanc:"#c5a35a",rouge:"#a53d36",vert:"#517553",violet:"#76537d"};document.documentElement.style.setProperty("--lit",map[li.color]||"#755a34");
  const meta=$("litMeta");if(meta&&!$("vfLitChip")){const c=document.createElement("div");c.id="vfLitChip";c.className="vf-lit-chip";c.textContent="● "+li.name;meta.parentElement.appendChild(c);}
}
addSaintCard();addOfficeCard();liturgicalTheme();

/* Progression par grands domaines */
const DOMAINS=[
["Fondements de la foi",0,11],["Jésus & Esprit Saint",12,18],["Église",19,23],["Sacrements",24,31],["Vie chrétienne",32,38],["Prière & discernement",39,47],["Fins dernières & mission",48,51]
];
const pathFirst=document.querySelector("#path .card");
const prog=document.createElement("div");prog.className="card";prog.id="vfDomainProgress";prog.innerHTML='<h3>Ma progression par domaine</h3><div id="vfDomains"></div>';pathFirst.insertAdjacentElement("afterend",prog);
const exp=document.createElement("div");exp.className="card";exp.innerHTML='<h3>Exporter le parcours</h3><p class="small">Le bouton ouvre l’impression du téléphone : choisis ensuite « Enregistrer au format PDF ».</p><div class="vf-actions"><button class="btn secondary" id="vfPrintWeek">Semaine en PDF</button><button class="btn secondary" id="vfPrintMonth">30 jours en PDF</button></div>';prog.insertAdjacentElement("afterend",exp);
function renderDomains(){
  const box=$("vfDomains");box.innerHTML="";
  DOMAINS.forEach(([name,a,b])=>{const start=a*7,end=Math.min(364,(b+1)*7-1);let done=0,total=end-start+1;for(let i=start;i<=end;i++)if(ds(i).complete)done++;const pct=Math.round(done/total*100);box.innerHTML+='<div class="vf-domain"><div class="vf-domain-head"><strong>'+esc(name)+'</strong><span>'+pct+' % · '+done+'/'+total+'</span></div><div class="progress"><div class="bar" style="width:'+pct+'%"></div></div></div>';});
}
const prevRenderProgress=renderProgress;
renderProgress=function(){prevRenderProgress();renderDomains();};
renderDomains();

/* Journal v7 */
const JKEY="viafidei-v7-journal";
let journalData={};try{journalData=JSON.parse(localStorage.getItem(JKEY)||"{}")||{};}catch{journalData={}}
const oldJournal=(()=>{try{return JSON.parse(localStorage.getItem("viafidei-v4-journal")||"{}")||{};}catch{return {};}})();
journalPage.innerHTML=`
<div class="card"><div class="kicker">Mon carnet spirituel</div><h2>Écrire et relire</h2>
<div class="vf-jgrid">
<div><label class="small">Date</label><input id="vfJDate" type="date"></div>
<div><label class="small">Mots-clés</label><input id="vfJTags" placeholder="ex. prière, travail, gratitude"></div>
<div class="full"><label class="small">Intention de prière</label><input id="vfJIntention" placeholder="Pour qui ou pour quoi veux-tu prier ?"></div>
<div><label class="small">Gratitude</label><textarea id="vfJGratitude" placeholder="Pour quoi puis-je rendre grâce ?"></textarea></div>
<div><label class="small">Grâce reçue / lumière</label><textarea id="vfJGrace" placeholder="Une consolation, une compréhension, un appel…"></textarea></div>
<div><label class="small">Difficulté</label><textarea id="vfJDifficulty" placeholder="Ce qui a été difficile ou obscur…"></textarea></div>
<div><label class="small">Résolution</label><textarea id="vfJResolution" placeholder="Un pas concret à poser…"></textarea></div>
<div class="full"><label class="small">Notes libres</label><textarea id="vfJNote" placeholder="Ce que je retiens aujourd’hui…"></textarea></div>
</div>
<div class="vf-actions"><button class="btn" id="vfJSave">Enregistrer</button><button class="btn secondary" id="vfJClear">Effacer les champs</button><span class="small" id="vfJSaved"></span></div></div>
<div class="card"><h3>Examen de conscience</h3><p class="small">Guide de relecture à partir de la relation à Dieu, au prochain, aux responsabilités et aux Béatitudes. <strong>Les réponses ne sont pas enregistrées.</strong></p><div class="vf-actions"><button class="btn secondary" id="vfExam">Ouvrir l’examen</button><a class="btn secondary" target="_blank" rel="noopener" href="`+CEC_URL+`">CEC ↗</a></div></div>
<div class="card"><div class="row" style="justify-content:space-between"><h3>Historique</h3><button class="btn secondary" id="vfPrintJournal">Carnet en PDF</button></div><input id="vfJSearch" class="search" placeholder="Rechercher dans le carnet…"><div id="vfJHistory"></div></div>`;
const JFIELDS=["intention","tags","gratitude","grace","difficulty","resolution","note"];
const JIDS={intention:"vfJIntention",tags:"vfJTags",gratitude:"vfJGratitude",grace:"vfJGrace",difficulty:"vfJDifficulty",resolution:"vfJResolution",note:"vfJNote"};
$("vfJDate").value=localISO();
function clearJ(){JFIELDS.forEach(k=>$(JIDS[k]).value="");}
function loadJ(date){
  clearJ();const e=journalData[date];
  if(e)JFIELDS.forEach(k=>$(JIDS[k]).value=e[k]||"");
  else if(date===localISO()&&!Object.keys(journalData).length){$("vfJIntention").value=oldJournal.intention||"";$("vfJNote").value=oldJournal.note||"";}
}
function saveJ(){
  const date=$("vfJDate").value||localISO(),e={};JFIELDS.forEach(k=>e[k]=$(JIDS[k]).value.trim());e.updated=Date.now();journalData[date]=e;localStorage.setItem(JKEY,JSON.stringify(journalData));$("vfJSaved").textContent="Enregistré ✓";setTimeout(()=>$("vfJSaved").textContent="",1400);renderJHistory($("vfJSearch").value);
}
function renderJHistory(filter=""){
  const box=$("vfJHistory"),n=norm(filter);box.innerHTML="";const entries=Object.entries(journalData).sort((a,b)=>b[0].localeCompare(a[0])).filter(([d,e])=>!n||norm(d+" "+Object.values(e).join(" ")).includes(n));
  if(!entries.length){box.innerHTML='<div class="vf-empty">Aucune entrée enregistrée.</div>';return;}
  entries.forEach(([d,e])=>{const summary=e.grace||e.gratitude||e.note||e.intention||"Entrée de carnet";const el=document.createElement("div");el.className="vf-entry";el.innerHTML='<div class="row" style="justify-content:space-between;align-items:start"><div><strong>'+esc(new Intl.DateTimeFormat("fr-FR",{dateStyle:"long"}).format(new Date(d+"T12:00:00")))+'</strong><div class="small">'+esc(summary.slice(0,150))+'</div></div><div class="row"><button class="btn soft edit">Ouvrir</button><button class="btn soft del">×</button></div></div>';el.querySelector(".edit").onclick=()=>{$("vfJDate").value=d;loadJ(d);window.scrollTo({top:0,behavior:"smooth"});};el.querySelector(".del").onclick=()=>{if(confirm("Supprimer cette entrée du carnet ?")){delete journalData[d];localStorage.setItem(JKEY,JSON.stringify(journalData));renderJHistory($("vfJSearch").value);}};box.appendChild(el);});
}
$("vfJDate").onchange=e=>loadJ(e.target.value);$("vfJSave").onclick=saveJ;$("vfJClear").onclick=clearJ;$("vfJSearch").oninput=e=>renderJHistory(e.target.value);loadJ(localISO());renderJHistory();

/* Examen de conscience non persistant */
$("vfExam").onclick=()=>{
  modalTitleEl.textContent="Examen de conscience";
  let last="",html='<p class="small">Prends d’abord un moment de silence. Ces cases servent seulement à ta relecture actuelle et ne sont pas enregistrées.</p>';
  D.exam.forEach((x,i)=>{if(x.cat!==last){last=x.cat;html+='<div class="vf-exam-cat">'+esc(last)+'</div>';}html+='<label class="vf-exam-item"><input type="checkbox"><span>'+esc(x.q)+'</span></label>';});
  html+='<div class="noteBox small">Un examen de conscience n’a pas pour but de produire de l’angoisse, mais de regarder sa vie dans la vérité, la responsabilité et la confiance en la miséricorde de Dieu.</div><div class="vf-actions"><button class="btn secondary" id="vfExamReset">Tout décocher</button><a class="btn secondary" target="_blank" rel="noopener" href="'+CEC_URL+'">Consulter le CEC ↗</a></div>';
  modalBodyEl.innerHTML=html;$("vfExamReset").onclick=()=>modalBodyEl.querySelectorAll('input[type="checkbox"]').forEach(x=>x.checked=false);modalEl.classList.add("show");
};

/* Print / PDF via browser */
function printRoot(title,body){
  let root=$("vfPrintRoot");if(root)root.remove();root=document.createElement("div");root.id="vfPrintRoot";root.className="vf-print-root";root.innerHTML='<h1>Via Fidei</h1><h2>'+esc(title)+'</h2>'+body+'<p class="vf-print-small">Document généré depuis Via Fidei · '+esc(new Intl.DateTimeFormat("fr-FR",{dateStyle:"long"}).format(new Date()))+'</p>';document.body.appendChild(root);window.print();
}
function printWeek(){
  const start=Math.floor(current/7)*7,end=Math.min(364,start+6);let html="";for(let i=start;i<=end;i++){const d=DAYS[i];html+='<div class="vf-print-item"><h3>Jour '+(i+1)+' · '+esc(d.date)+' — '+esc(d.title)+'</h3><p><strong>'+esc(d.ref)+'</strong></p><p>'+esc(d.understand)+'</p><p><strong>CEC '+esc(d.cec)+'</strong></p><p><em>'+esc(d.meditation)+'</em></p></div>';}printRoot("Semaine "+(Math.floor(current/7)+1),html);
}
function printMonth(){
  const start=Math.max(0,current),end=Math.min(364,start+29);let html="";for(let i=start;i<=end;i++){const d=DAYS[i];html+='<div class="vf-print-item"><strong>Jour '+(i+1)+' · '+esc(d.date)+'</strong><br>'+esc(d.title)+'<div class="vf-print-small">'+esc(d.ref)+' · CEC '+esc(d.cec)+'</div></div>';}printRoot("30 jours de parcours",html);
}
function printJournal(){
  let html="";Object.entries(journalData).sort((a,b)=>b[0].localeCompare(a[0])).forEach(([d,e])=>{html+='<div class="vf-print-item"><h3>'+esc(new Intl.DateTimeFormat("fr-FR",{dateStyle:"long"}).format(new Date(d+"T12:00:00")))+'</h3>'+JFIELDS.filter(k=>e[k]).map(k=>'<p><strong>'+esc({intention:"Intention",tags:"Mots-clés",gratitude:"Gratitude",grace:"Grâce reçue / lumière",difficulty:"Difficulté",resolution:"Résolution",note:"Notes"}[k])+' :</strong> '+esc(e[k])+'</p>').join("")+'</div>';});printRoot("Mon carnet spirituel",html||"<p>Aucune entrée.</p>");
}
$("vfPrintWeek").onclick=printWeek;$("vfPrintMonth").onclick=printMonth;$("vfPrintJournal").onclick=printJournal;

/* Version */
const ver=document.querySelector("header .small");if(ver)ver.textContent="V7 · Parcours complet";
document.title="Via Fidei — V7";
renderExplore("questions");
renderDay();
})();