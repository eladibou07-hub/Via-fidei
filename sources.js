(function(){
"use strict";

const BOOKS = {
  "Genèse":"Gn","Gn":"Gn","Exode":"Ex","Ex":"Ex","Lévitique":"Lv","Nombres":"Nb","Deutéronome":"Dt",
  "Josué":"Jos","Juges":"Jg","Ruth":"Rt","1 Samuel":"1S","2 Samuel":"2S",
  "1 Rois":"1R","1 Kings":"1R","2 Rois":"2R","1 Chroniques":"1Ch","2 Chroniques":"2Ch",
  "Esdras":"Esd","Néhémie":"Ne","Tobie":"Tb","Judith":"Jdt","Esther":"Est","Job":"Jb",
  "Psaume":"Ps","Psaumes":"Ps","Ps":"Ps","Proverbes":"Pr","Qohélet":"Qo","Cantique":"Ct",
  "Sagesse":"Sg","Siracide":"Si","Isaïe":"Is","Jérémie":"Jr","Lamentations":"Lm",
  "Baruch":"Ba","Ézéchiel":"Ez","Daniel":"Dn","Osée":"Os","Joël":"Jl","Amos":"Am",
  "Abdias":"Ab","Jonas":"Jon","Michée":"Mi","Nahum":"Na","Habaquq":"Ha","Sophonie":"So",
  "Aggée":"Ag","Zacharie":"Za","Malachie":"Ml",
  "Matthieu":"Mt","Mt":"Mt","Marc":"Mc","Mc":"Mc","Luc":"Lc","Lc":"Lc","Jean":"Jn","Jn":"Jn",
  "Actes":"Ac","Ac":"Ac","Romains":"Rm","Rm":"Rm","1 Corinthiens":"1Co","1 Cor":"1Co","1Co":"1Co",
  "2 Corinthiens":"2Co","2 Cor":"2Co","2Co":"2Co","Galates":"Ga","Gal":"Ga","Ga":"Ga",
  "Éphésiens":"Ep","Eph":"Ep","Ep":"Ep","Philippiens":"Ph","Colossiens":"Col",
  "1 Thessaloniciens":"1Th","2 Thessaloniciens":"2Th","1 Timothée":"1Tm","2 Timothée":"2Tm","2 Tim":"2Tm",
  "Tite":"Tt","Philémon":"Phm","Hébreux":"He","He":"He","Jacques":"Jc",
  "1 Pierre":"1P","2 Pierre":"2P","1 Jean":"1Jn","2 Jean":"2Jn","3 Jean":"3Jn",
  "Jude":"Jude","Apocalypse":"Ap","Ap":"Ap"
};

const DOCS = [
  {keys:["révélation","écriture","bible","tradition","magistère"],label:"Dei Verbum — Révélation divine",url:"https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_fr.html"},
  {keys:["église","communion des saints","une, sainte","mission"],label:"Lumen Gentium — l’Église",url:"https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_fr.html"},
  {keys:["liturgie","sacrement","eucharistie"],label:"Sacrosanctum Concilium — liturgie",url:"https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19631204_sacrosanctum-concilium_fr.html"},
  {keys:["homme","conscience","mariage","vocation","souffrance"],label:"Gaudium et Spes — l’Église dans le monde",url:"https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_fr.html"},
  {keys:["esprit saint","pentecôte"],label:"Dominum et Vivificantem — l’Esprit Saint",url:"https://www.vatican.va/content/john-paul-ii/fr/encyclicals/documents/hf_jp-ii_enc_18051986_dominum-et-vivificantem.html"},
  {keys:["rosaire","marie"],label:"Rosarium Virginis Mariae — le Rosaire",url:"https://www.vatican.va/content/john-paul-ii/fr/apost_letters/2002/documents/hf_jp-ii_apl_20021016_rosarium-virginis-mariae.html"},
  {keys:["mort","jugement","ciel","purgatoire","enfer","espérance"],label:"Spe Salvi — l’espérance chrétienne",url:"https://www.vatican.va/content/benedict-xvi/fr/encyclicals/documents/hf_ben-xvi_enc_20071130_spe-salvi.html"}
];

function esc(x){return String(x||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
function p2(n){return String(n).padStart(2,"0");}
function isoDate(d){return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());}
function chapterUrl(ref){
  if(!ref) return null;
  const cleaned=String(ref).replace(/cf\.\s*/i,"").trim();
  const m=cleaned.match(/^(.+?)\s+(\d+)/);
  if(!m) return null;
  const book=m[1].trim(), chapter=m[2];
  let code=BOOKS[book];
  if(!code){
    const key=Object.keys(BOOKS).find(k=>book.toLowerCase()===k.toLowerCase());
    if(key) code=BOOKS[key];
  }
  return code ? "https://www.aelf.org/bible/"+code+"/"+chapter : null;
}
function topicDoc(title){
  const t=String(title||"").toLowerCase();
  return DOCS.find(d=>d.keys.some(k=>t.includes(k))) || null;
}
function journeyDateFor(i){
  const d=new Date(2026,8,29);
  d.setDate(d.getDate()+i);
  return d;
}
function sourceButton(href,label,kind){
  return '<a class="sourcebtn" target="_blank" rel="noopener" href="'+esc(href)+'"><span>'+kind+'</span>'+esc(label)+' ↗</a>';
}
function renderSourcePanel(){
  if(typeof DAYS==="undefined" || typeof current==="undefined") return;
  const d=DAYS[current];
  const bible=chapterUrl(d.ref);
  const doc=topicDoc(d.title+" "+d.understand);
  const jd=journeyDateFor(current);
  const cecUrl="https://www.vatican.va/archive/FRA0013/_INDEX.HTM";
  let html='<div class="sourcepanel"><div class="sourcehead"><strong>🔎 Sources & approfondissement</strong><span class="small">Textes officiels</span></div><div class="sourcegrid">';
  if(bible) html+=sourceButton(bible,d.ref,"📖");
  html+=sourceButton(cecUrl,"CEC "+(d.cec||""),"📚");
  if(doc) html+=sourceButton(doc.url,doc.label,"✝️");
  else html+=sourceButton("https://www.aelf.org/"+isoDate(jd)+"/romain/messe","Messe du "+new Intl.DateTimeFormat("fr-FR",{day:"numeric",month:"short",year:"numeric"}).format(jd),"⛪");
  html+='</div><div class="small sourcenote">Les références bibliques ouvrent le chapitre sur l’AELF ; la référence CEC indique les paragraphes précis à consulter.</div></div>';

  let panel=document.getElementById("vfSources");
  if(!panel){
    panel=document.createElement("div");
    panel.id="vfSources";
    const target=document.querySelector(".cecbox");
    if(target) target.insertAdjacentElement("afterend",panel);
  }
  if(panel) panel.innerHTML=html;
}
function addTodayOfficeButtons(){
  const link=document.getElementById("aelfLink");
  if(!link || document.getElementById("vfOffices")) return;
  const now=new Date(), date=isoDate(now);
  const box=document.createElement("div");
  box.id="vfOffices"; box.className="officebar";
  box.innerHTML=
    sourceButton("https://www.aelf.org/"+date+"/romain/messe","Messe","⛪")+
    sourceButton("https://www.aelf.org/"+date+"/romain/laudes","Laudes","🌅")+
    sourceButton("https://www.aelf.org/"+date+"/romain/vepres","Vêpres","🌇")+
    sourceButton("https://www.aelf.org/"+date+"/romain/complies","Complies","🌙");
  link.parentElement.insertAdjacentElement("afterend",box);
}
const css=document.createElement("style");
css.textContent=
".sourcepanel{background:#fbf7ef;border:1px solid var(--line);border-radius:15px;padding:13px;margin-top:12px}"+
".sourcehead{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:10px}"+
".sourcegrid,.officebar{display:flex;gap:7px;flex-wrap:wrap}"+
".sourcebtn{display:inline-flex;gap:6px;align-items:center;text-decoration:none;border:1px solid var(--line);background:#fff;color:var(--accent);border-radius:999px;padding:8px 11px;font-size:12px;font-weight:750}"+
".sourcebtn:active{transform:scale(.98)}.sourcenote{margin-top:9px}.officebar{margin-top:10px}";
document.head.appendChild(css);

const previousRenderDay=renderDay;
renderDay=function(){previousRenderDay();renderSourcePanel();};

const ver=document.querySelector("header .small");
if(ver) ver.textContent="V6 · Sources · FR/LAT";
document.title="Via Fidei — V6";
addTodayOfficeButtons();
renderSourcePanel();
})();