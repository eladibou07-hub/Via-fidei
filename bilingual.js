(function(){
"use strict";

const BI = {
  "Notre Père": {
    latinTitle: "Pater Noster",
    la: "Pater noster, qui es in caelis:\nsanctificetur nomen tuum;\nadveniat regnum tuum;\nfiat voluntas tua, sicut in caelo et in terra.\nPanem nostrum quotidianum da nobis hodie;\net dimitte nobis debita nostra,\nsicut et nos dimittimus debitoribus nostris;\net ne nos inducas in tentationem;\nsed libera nos a malo.\nAmen."
  },
  "Je vous salue Marie": {
    latinTitle: "Ave Maria",
    la: "Ave Maria, gratia plena,\nDominus tecum;\nbenedicta tu in mulieribus,\net benedictus fructus ventris tui, Iesus.\nSancta Maria, Mater Dei,\nora pro nobis peccatoribus,\nnunc et in hora mortis nostrae.\nAmen."
  },
  "Gloire au Père": {
    latinTitle: "Gloria Patri",
    la: "Gloria Patri et Filio et Spiritui Sancto.\nSicut erat in principio, et nunc et semper,\net in saecula saeculorum.\nAmen."
  },
  "Symbole des Apôtres": {
    latinTitle: "Symbolum Apostolorum",
    la: "Credo in Deum Patrem omnipotentem,\nCreatorem caeli et terrae,\net in Iesum Christum, Filium eius unicum, Dominum nostrum,\nqui conceptus est de Spiritu Sancto,\nnatus ex Maria Virgine,\npassus sub Pontio Pilato,\ncrucifixus, mortuus et sepultus,\ndescendit ad inferos,\ntertia die resurrexit a mortuis,\nascendit ad caelos,\nsedet ad dexteram Dei Patris omnipotentis,\ninde venturus est iudicare vivos et mortuos.\nCredo in Spiritum Sanctum,\nsanctam Ecclesiam catholicam,\nsanctorum communionem,\nremissionem peccatorum,\ncarnis resurrectionem,\nvitam aeternam.\nAmen."
  },
  "Saint Michel Archange": {
    latinTitle: "Sancte Michael Archangele",
    la: "Sancte Michael Archangele,\ndefende nos in proelio;\ncontra nequitiam et insidias diaboli esto praesidium.\nImperet illi Deus, supplices deprecamur:\ntuque, Princeps militiae caelestis,\nSatanam aliosque spiritus malignos,\nqui ad perditionem animarum pervagantur in mundo,\ndivina virtute in infernum detrude.\nAmen."
  },
  "Ange gardien": {
    latinTitle: "Angele Dei",
    la: "Angele Dei, qui custos es mei,\nme tibi commissum pietate superna,\nillumina, custodi, rege et guberna.\nAmen."
  },
  "Pour les défunts": {
    latinTitle: "Requiem aeternam",
    la: "Requiem aeternam dona eis, Domine,\net lux perpetua luceat eis.\nRequiescant in pace.\nAmen."
  },
  "Salve Regina": {
    latinTitle: "Salve Regina",
    la: "Salve, Regina, mater misericordiae,\nvita, dulcedo et spes nostra, salve.\nAd te clamamus, exsules filii Evae.\nAd te suspiramus, gementes et flentes\nin hac lacrimarum valle.\nEia ergo, advocata nostra,\nillos tuos misericordes oculos ad nos converte.\nEt Iesum, benedictum fructum ventris tui,\nnobis post hoc exsilium ostende.\nO clemens, o pia, o dulcis Virgo Maria."
  },
  "Angelus": {
    latinTitle: "Angelus Domini",
    fr: "V. L’Ange du Seigneur apporta l’annonce à Marie.\nR. Et elle conçut du Saint-Esprit.\nJe vous salue Marie…\n\nV. Voici la servante du Seigneur.\nR. Qu’il me soit fait selon votre parole.\nJe vous salue Marie…\n\nV. Et le Verbe s’est fait chair.\nR. Et il a habité parmi nous.\nJe vous salue Marie…\n\nV. Priez pour nous, sainte Mère de Dieu.\nR. Afin que nous soyons rendus dignes des promesses du Christ.\n\nPrions.\nSeigneur, répands ta grâce dans nos cœurs :\npar le message de l’ange,\nnous avons connu l’Incarnation de ton Fils Jésus-Christ ;\nconduis-nous, par sa Passion et sa Croix,\njusqu’à la gloire de la Résurrection.\nPar le Christ notre Seigneur.\nAmen.",
    la: "V. Angelus Domini nuntiavit Mariae.\nR. Et concepit de Spiritu Sancto.\nAve Maria…\n\nV. Ecce ancilla Domini.\nR. Fiat mihi secundum verbum tuum.\nAve Maria…\n\nV. Et Verbum caro factum est.\nR. Et habitavit in nobis.\nAve Maria…\n\nV. Ora pro nobis, sancta Dei Genetrix.\nR. Ut digni efficiamur promissionibus Christi.\n\nOremus.\nGratiam tuam, quaesumus, Domine, mentibus nostris infunde;\nut qui, Angelo nuntiante, Christi Filii tui incarnationem cognovimus,\nper passionem eius et crucem\nad resurrectionis gloriam perducamur.\nPer eundem Christum Dominum nostrum.\nAmen."
  },
  "Regina Caeli": {
    latinTitle: "Regina Caeli",
    fr: "Reine du ciel, réjouis-toi, alléluia.\nCar celui que tu as mérité de porter, alléluia,\nest ressuscité comme il l’avait dit, alléluia.\nPrie Dieu pour nous, alléluia.\n\nV. Réjouis-toi et sois dans l’allégresse, Vierge Marie, alléluia.\nR. Car le Seigneur est vraiment ressuscité, alléluia.\n\nPrions.\nDieu, qui as réjoui le monde\npar la Résurrection de ton Fils, notre Seigneur Jésus-Christ,\naccorde-nous, par sa Mère, la Vierge Marie,\nde parvenir aux joies de la vie éternelle.\nPar le Christ notre Seigneur.\nAmen.",
    la: "Regina caeli, laetare, alleluia.\nQuia quem meruisti portare, alleluia.\nResurrexit sicut dixit, alleluia.\nOra pro nobis Deum, alleluia.\n\nV. Gaude et laetare, Virgo Maria, alleluia.\nR. Quia surrexit Dominus vere, alleluia.\n\nOremus.\nDeus, qui per resurrectionem Filii tui,\nDomini nostri Iesu Christi,\nmundum laetificare dignatus es:\npraesta, quaesumus,\nut per eius Genetricem Virginem Mariam\nperpetuae capiamus gaudia vitae.\nPer eundem Christum Dominum nostrum.\nAmen."
  },
  "Magnificat": {
    latinTitle: "Magnificat",
    fr: "Mon âme exalte le Seigneur,\net mon esprit se réjouit en Dieu, mon Sauveur,\nparce qu’il a regardé l’humilité de sa servante.\nDésormais toutes les générations me diront bienheureuse,\ncar le Puissant a fait pour moi de grandes choses ;\nsaint est son nom.\nSa miséricorde s’étend d’âge en âge\nsur ceux qui le craignent.\nIl a déployé la force de son bras\net dispersé les orgueilleux dans les pensées de leur cœur.\nIl a renversé les puissants de leurs trônes\net élevé les humbles.\nIl a comblé de biens les affamés\net renvoyé les riches les mains vides.\nIl a secouru Israël, son serviteur,\nse souvenant de sa miséricorde,\ncomme il l’avait promis à nos pères,\nà Abraham et à sa descendance pour toujours.",
    la: "Magnificat anima mea Dominum,\net exsultavit spiritus meus in Deo salutari meo,\nquia respexit humilitatem ancillae suae.\nEcce enim ex hoc beatam me dicent omnes generationes,\nquia fecit mihi magna qui potens est,\net sanctum nomen eius,\net misericordia eius a progenie in progenies\ntimentibus eum.\nFecit potentiam in brachio suo,\ndispersit superbos mente cordis sui;\ndeposuit potentes de sede\net exaltavit humiles;\nesurientes implevit bonis\net divites dimisit inanes.\nSuscepit Israel puerum suum,\nrecordatus misericordiae,\nsicut locutus est ad patres nostros,\nAbraham et semini eius in saecula."
  },
  "Souvenez-vous": {
    latinTitle: "Memorare",
    la: "Memorare, o piissima Virgo Maria,\nnon esse auditum a saeculo,\nquemquam ad tua currentem praesidia,\ntua implorantem auxilia,\ntua petentem suffragia,\nesse derelictum.\nEgo tali animatus confidentia,\nad te, Virgo Virginum, Mater, curro;\nad te venio;\ncoram te gemens peccator assisto.\nNoli, Mater Verbi, verba mea despicere;\nsed audi propitia et exaudi.\nAmen."
  }
};

const EXTRAS = [
  {
    name: "Signe de croix", cat: "Fondamentales",
    text: "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.",
    latin: "In nomine Patris, et Filii, et Spiritus Sancti. Amen.",
    latinTitle: "Signum Crucis",
    understand: "Le signe de croix confesse la Trinité et rappelle la Croix du Christ."
  },
  {
    name: "Je confesse à Dieu", cat: "Conversion",
    text: "Je confesse à Dieu tout-puissant,\nje reconnais devant vous, frères et sœurs,\nque j’ai péché en pensée, en parole,\npar action et par omission.\nOui, j’ai vraiment péché.\nC’est pourquoi je supplie la bienheureuse Vierge Marie,\nles anges et tous les saints,\net vous aussi, frères et sœurs,\nde prier pour moi le Seigneur notre Dieu.",
    latin: "Confiteor Deo omnipotenti\net vobis, fratres,\nquia peccavi nimis\ncogitatione, verbo, opere et omissione:\nmea culpa, mea culpa, mea maxima culpa.\nIdeo precor beatam Mariam semper Virginem,\nomnes Angelos et Sanctos,\net vos, fratres,\norare pro me ad Dominum Deum nostrum.",
    latinTitle: "Confiteor",
    understand: "Le Confiteor est une reconnaissance du péché et une demande d’intercession."
  },
  {
    name: "Anima Christi", cat: "Eucharistie",
    text: "Âme du Christ, sanctifie-moi.\nCorps du Christ, sauve-moi.\nSang du Christ, enivre-moi.\nEau du côté du Christ, lave-moi.\nPassion du Christ, fortifie-moi.\nÔ bon Jésus, exauce-moi.\nDans tes blessures, cache-moi.\nNe permets pas que je sois séparé de toi.\nDe l’ennemi mauvais, défends-moi.\nÀ l’heure de ma mort, appelle-moi.\nEt ordonne-moi de venir à toi,\nafin qu’avec tes saints je te loue\ndans les siècles des siècles.\nAmen.",
    latin: "Anima Christi, sanctifica me.\nCorpus Christi, salva me.\nSanguis Christi, inebria me.\nAqua lateris Christi, lava me.\nPassio Christi, conforta me.\nO bone Iesu, exaudi me.\nIntra tua vulnera absconde me.\nNe permittas me separari a te.\nAb hoste maligno defende me.\nIn hora mortis meae voca me.\nEt iube me venire ad te,\nut cum Sanctis tuis laudem te\nin saecula saeculorum.\nAmen.",
    latinTitle: "Anima Christi",
    understand: "Ancienne prière d’union personnelle au Christ, particulièrement adaptée après la communion."
  },
  {
    name: "Veni Creator Spiritus", cat: "Esprit Saint",
    text: "Viens, Esprit Créateur,\nvisite les âmes de tes fidèles ;\nremplis de la grâce d’en haut\nles cœurs que tu as créés.\n\nToi qu’on appelle le Consolateur,\ndon du Dieu Très-Haut,\nsource vive, feu, charité\net onction spirituelle.\n\nToi qui répands tes sept dons,\ndoigt de la droite du Père,\npromesse solennelle du Père,\nmets ta parole sur nos lèvres.\n\nAllume la lumière dans nos esprits,\nrépands l’amour dans nos cœurs ;\nfortifie, par ta puissance durable,\nla faiblesse de notre corps.\n\nRepousse l’ennemi loin de nous\net donne-nous aussitôt la paix ;\nmarche devant nous comme guide,\nafin que nous évitions tout mal.\n\nFais-nous connaître le Père,\nfais-nous connaître aussi le Fils,\net toi, Esprit de l’un et de l’autre,\nfais-nous toujours croire en toi.\n\nGloire soit à Dieu le Père,\net au Fils ressuscité des morts,\nainsi qu’au Paraclet,\npour les siècles des siècles.\nAmen.",
    latin: "Veni, Creator Spiritus,\nmentes tuorum visita,\nimple superna gratia\nquae tu creasti pectora.\n\nQui diceris Paraclitus,\nAltissimi donum Dei,\nfons vivus, ignis, caritas\net spiritalis unctio.\n\nTu septiformis munere,\ndigitus paternae dexterae,\ntu rite promissum Patris,\nsermone ditans guttura.\n\nAccende lumen sensibus,\ninfunde amorem cordibus,\ninfirma nostri corporis\nvirtute firmans perpeti.\n\nHostem repellas longius\npacemque dones protinus;\nductore sic te praevio\nvitemus omne noxium.\n\nPer te sciamus da Patrem,\nnoscamus atque Filium,\nteque utriusque Spiritum\ncredamus omni tempore.\n\nDeo Patri sit gloria,\net Filio, qui a mortuis\nsurrexit, ac Paraclito,\nin saeculorum saecula.\nAmen.",
    latinTitle: "Veni Creator Spiritus",
    understand: "Hymne ancienne à l’Esprit Saint, pour demander lumière, force et charité."
  },
  {
    name: "Sous l’abri de ta miséricorde", cat: "Marie",
    text: "Sous l’abri de ta miséricorde,\nnous nous réfugions, sainte Mère de Dieu.\nNe méprise pas nos prières dans nos nécessités,\nmais délivre-nous toujours de tous les dangers,\nVierge glorieuse et bénie.",
    latin: "Sub tuum praesidium confugimus,\nsancta Dei Genetrix.\nNostras deprecationes ne despicias\nin necessitatibus nostris,\nsed a periculis cunctis libera nos semper,\nVirgo gloriosa et benedicta.",
    latinTitle: "Sub tuum praesidium",
    understand: "L’une des plus anciennes prières mariales connues."
  }
];

for (const p of PRAYERS) {
  const b = BI[p.name];
  if (b) {
    if (b.fr) p.text = b.fr;
    p.latin = b.la;
    p.latinTitle = b.latinTitle;
  }
}
for (const p of EXTRAS) {
  if (!PRAYERS.some(x => x.name === p.name)) PRAYERS.push(p);
}

const css = document.createElement("style");
css.textContent =
  ".langbar{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0}" +
  ".langbtn{border:1px solid var(--line);background:#fff;color:var(--muted);border-radius:999px;padding:8px 12px;font-weight:750;cursor:pointer}" +
  ".langbtn.active{background:var(--accent);border-color:var(--accent);color:#fff}" +
  ".bilingual{display:grid;grid-template-columns:1fr;gap:14px}" +
  ".langpane{background:#f7f1e7;border:1px solid var(--line);border-radius:14px;padding:14px}" +
  ".langpane h4{margin:0 0 9px;font-family:Georgia,serif;font-size:18px}" +
  ".latintext{font-family:Georgia,serif}" +
  ".bilingual-badge{font-size:10px;background:#e9dfcf;color:var(--accent);border-radius:999px;padding:4px 7px;margin-left:6px;font-weight:800}" +
  ".rosary-prayers details{border-top:1px solid var(--line);padding:9px 0}.rosary-prayers summary{cursor:pointer;font-weight:750;color:var(--accent)}" +
  "@media(min-width:650px){.bilingual.two{grid-template-columns:1fr 1fr}}";
document.head.appendChild(css);

const ver = document.querySelector("header .small");
if (ver) ver.textContent = "V5 · FR / LAT";
document.title = "Via Fidei — V5";

let prayerLang = localStorage.getItem("viafidei-v5-lang") || "fr";
function esc(x) {
  return String(x || "").replace(/[&<>"']/g, function(m) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m];
  });
}
function syncLang() {
  document.querySelectorAll("[data-vflang]").forEach(function(b) {
    b.classList.toggle("active", b.getAttribute("data-vflang") === prayerLang);
  });
}
function setLang(lang) {
  prayerLang = lang;
  localStorage.setItem("viafidei-v5-lang", lang);
  syncLang();
  renderPrayers(search.value || "");
}
function prayerText(p, lang) {
  if (lang === "la") return p.latin || p.text;
  return p.text;
}
function bilingualHtml(p) {
  return '<div class="bilingual two">' +
    '<div class="langpane"><h4>Français</h4><div class="modalpre">' + esc(p.text) + '</div></div>' +
    '<div class="langpane latintext"><h4>Latine</h4><div class="modalpre">' + esc(p.latin) + '</div></div>' +
    '</div>';
}

const intro = document.querySelector("#prayers .card p.small");
if (intro && !document.getElementById("vfLangBar")) {
  const bar = document.createElement("div");
  bar.id = "vfLangBar";
  bar.className = "langbar";
  bar.innerHTML =
    '<button class="langbtn" data-vflang="fr">Français</button>' +
    '<button class="langbtn" data-vflang="la">Latin</button>' +
    '<button class="langbtn" data-vflang="both">FR + Latin</button>';
  intro.insertAdjacentElement("afterend", bar);
  bar.querySelectorAll("[data-vflang]").forEach(function(b) {
    b.onclick = function(){ setLang(b.getAttribute("data-vflang")); };
  });
}

openPrayer = function(p, mode) {
  mode = mode || "pray";
  modalTitle.textContent = mode === "pray"
    ? (prayerLang === "la" && p.latinTitle ? p.latinTitle : p.name)
    : "Comprendre — " + p.name;
  if (mode === "pray") {
    if (prayerLang === "both" && p.latin) modalBody.innerHTML = bilingualHtml(p);
    else modalBody.textContent = prayerText(p, prayerLang);
  } else {
    modalBody.textContent = p.understand + (p.latin ? "\n\nDisponible en français et en latin." : "");
  }
  modal.classList.add("show");
};

renderPrayers = function(q) {
  q = q || "";
  prayerList.innerHTML = "";
  const list = PRAYERS.filter(function(p) {
    const txt = (p.name + " " + p.cat + " " + (p.latinTitle || "") + " " + (p.latin || "")).toLowerCase();
    return txt.includes(q.toLowerCase()) &&
      (prayerFilter === "Toutes" || p.cat === prayerFilter) &&
      (!favOnly || favs.includes(p.name));
  });
  if (!list.length) {
    prayerList.innerHTML = '<p class="small">Aucune prière ne correspond à ce filtre.</p>';
    return;
  }
  list.forEach(function(p) {
    const el = document.createElement("div");
    el.className = "prayer";
    el.innerHTML =
      '<div class="prayerhead"><div><span class="tag">' + esc(p.cat) + '</span>' +
      (p.latin ? '<span class="bilingual-badge">FR · LAT</span>' : '') +
      '<h3>' + esc(p.name) + '</h3>' +
      (p.latinTitle ? '<div class="small">' + esc(p.latinTitle) + '</div>' : '') +
      '</div><button class="fav" aria-label="favori">' + (favs.includes(p.name) ? '★' : '☆') + '</button></div>' +
      '<div class="row"><button class="btn pray">Prier</button><button class="btn secondary understand">Comprendre</button></div>';
    el.querySelector(".fav").onclick = function(){ toggleFav(p.name); };
    el.querySelector(".pray").onclick = function(){ openPrayer(p, "pray"); };
    el.querySelector(".understand").onclick = function(){ openPrayer(p, "understand"); };
    prayerList.appendChild(el);
  });
};

function byName(name) { return PRAYERS.find(function(p){ return p.name === name; }); }
function rosaryDetails() {
  const names = ["Symbole des Apôtres","Notre Père","Je vous salue Marie","Gloire au Père","Salve Regina"];
  let out = '<div class="rosary-prayers"><strong>Textes complets du chapelet</strong>';
  names.forEach(function(n) {
    const p = byName(n);
    if (!p) return;
    const label = prayerLang === "la" && p.latinTitle ? p.latinTitle : p.name;
    let body;
    if (prayerLang === "both" && p.latin) body = bilingualHtml(p);
    else body = '<div class="' + (prayerLang === "la" ? "latintext " : "") + 'modalpre">' + esc(prayerText(p, prayerLang)) + '</div>';
    out += '<details><summary>' + esc(label) + '</summary>' + body + '</details>';
  });
  return out + "</div>";
}

renderRosary = function(set) {
  const st = loadRosary(set);
  let out =
    '<div class="langbar">' +
    '<button class="langbtn ' + (prayerLang==="fr"?"active":"") + '" data-roslang="fr">Français</button>' +
    '<button class="langbtn ' + (prayerLang==="la"?"active":"") + '" data-roslang="la">Latin</button>' +
    '<button class="langbtn ' + (prayerLang==="both"?"active":"") + '" data-roslang="both">FR + Latin</button>' +
    '</div>' +
    '<label class="small">Mystères</label><select id="mysterySelect" class="select">' +
    Object.keys(MYSTERIES).map(function(k){ return '<option ' + (k===set?'selected':'') + '>' + k + '</option>'; }).join('') +
    '</select>' +
    '<div class="noteBox small">Suggestion habituelle : joyeux lundi/samedi, lumineux jeudi, douloureux mardi/vendredi, glorieux mercredi/dimanche.</div>' +
    rosaryDetails() +
    '<div class="rosary-step"><strong>Commencer</strong>' +
    '<label class="inlinecheck"><input type="checkbox" data-open="0" ' + (st.opening[0]?'checked':'') + '> ' + (prayerLang==="la"?"Symbolum Apostolorum":"Credo") + '</label>' +
    '<label class="inlinecheck"><input type="checkbox" data-open="1" ' + (st.opening[1]?'checked':'') + '> ' + (prayerLang==="la"?"Pater Noster":"Notre Père") + '</label>' +
    '<label class="inlinecheck"><input type="checkbox" data-open="2" ' + (st.opening[2]?'checked':'') + '> ' + (prayerLang==="la"?"3 Ave Maria + Gloria Patri":"3 Je vous salue Marie + Gloire au Père") + '</label></div>';

  MYSTERIES[set].forEach(function(m,i) {
    const d = st.decades[i];
    out += '<div class="decade"><span class="tag">' + (i+1) + 'e mystère</span><h3>' + esc(m[0]) + '</h3><p class="small">' + esc(m[1]) + '</p>' +
      '<label class="inlinecheck"><input type="checkbox" data-our="' + i + '" ' + (d.our?'checked':'') + '> ' + (prayerLang==="la"?"Pater Noster":"Notre Père") + '</label>' +
      '<div class="counter"><button data-minus="' + i + '">−</button><b>' + d.aves + '/10</b><button data-plus="' + i + '">+</button><span class="small">' + (prayerLang==="la"?"Ave Maria":"Je vous salue Marie") + '</span></div>' +
      '<label class="inlinecheck"><input type="checkbox" data-glory="' + i + '" ' + (d.glory?'checked':'') + '> ' + (prayerLang==="la"?"Gloria Patri":"Gloire au Père") + '</label></div>';
  });
  out += '<div class="rosary-step"><label class="inlinecheck"><input type="checkbox" id="rosaryFinal" ' + (st.final?'checked':'') + '> Salve Regina / ' + (prayerLang==="la"?"oratio finalis":"prière finale") + '</label></div>' +
    '<div class="row"><button class="btn secondary" id="resetRosary">Recommencer ce chapelet</button></div>';

  modalBody.innerHTML = out;
  document.getElementById("mysterySelect").onchange = function(e){ renderRosary(e.target.value); };
  modalBody.querySelectorAll("[data-roslang]").forEach(function(b){ b.onclick=function(){ setLang(b.getAttribute("data-roslang")); renderRosary(set); }; });
  modalBody.querySelectorAll("[data-open]").forEach(function(x){ x.onchange=function(){ st.opening[+x.dataset.open]=x.checked; saveRosary(set,st); }; });
  modalBody.querySelectorAll("[data-our]").forEach(function(x){ x.onchange=function(){ st.decades[+x.dataset.our].our=x.checked; saveRosary(set,st); }; });
  modalBody.querySelectorAll("[data-glory]").forEach(function(x){ x.onchange=function(){ st.decades[+x.dataset.glory].glory=x.checked; saveRosary(set,st); }; });
  modalBody.querySelectorAll("[data-plus]").forEach(function(x){ x.onclick=function(){ const i=+x.dataset.plus; st.decades[i].aves=Math.min(10,st.decades[i].aves+1); saveRosary(set,st); renderRosary(set); }; });
  modalBody.querySelectorAll("[data-minus]").forEach(function(x){ x.onclick=function(){ const i=+x.dataset.minus; st.decades[i].aves=Math.max(0,st.decades[i].aves-1); saveRosary(set,st); renderRosary(set); }; });
  document.getElementById("rosaryFinal").onchange=function(e){ st.final=e.target.checked; saveRosary(set,st); };
  document.getElementById("resetRosary").onclick=function(){ localStorage.removeItem("viafidei-v3-rosary-"+set); renderRosary(set); };
};

openRosary = function(set) {
  set = set || defaultMystery();
  modalTitle.textContent = "Chapelet guidé";
  renderRosary(set);
  modal.classList.add("show");
};
rosaryBtn.onclick = function(){ openRosary(); };

if (typeof prayBtn !== "undefined") {
  prayBtn.onclick = function(){
    const d = DAYS[current];
    const aliases = {"À l'ange gardien":"Ange gardien"};
    const p = PRAYERS.find(function(x){ return x.name === d.prayerTitle || x.name === aliases[d.prayerTitle]; });
    if (p) openPrayer(p,"pray");
    else {
      modalTitle.textContent=d.prayerTitle;
      modalBody.textContent=d.prayer;
      modal.classList.add("show");
    }
  };
}

syncLang();
renderPrayers(search.value || "");
})();