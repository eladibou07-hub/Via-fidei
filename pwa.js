(() => {
 const status=document.getElementById('offlineStatus'), button=document.getElementById('updateApp');
 let reg, reloadRequested=false;
 const say=t=>status.textContent=t;
 function offer(){if(reg?.waiting){button.hidden=false;say('Nouvelle version disponible. Enregistre ton carnet avant de recharger.');}}
 function check(){
  if(!navigator.serviceWorker.controller)return;
  const ch=new MessageChannel(),timer=setTimeout(()=>{ch.port1.close();say('Vérification hors connexion indisponible');},5000);
  ch.port1.onmessage=e=>{clearTimeout(timer);ch.port1.close();say(e.data.ready?'Disponible hors connexion':'Préparation hors connexion incomplète');};
  navigator.serviceWorker.controller.postMessage({type:'CACHE_STATUS'},[ch.port2]);
 }
 button.onclick=()=>{if(reg?.waiting){reloadRequested=true;reg.waiting.postMessage({type:'SKIP_WAITING'});}else location.reload();};
 if(!('serviceWorker' in navigator)||!isSecureContext){say('Mode hors connexion indisponible dans ce navigateur.');return;}
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reloadRequested)location.reload();else check();});
 window.addEventListener('load',async()=>{
  try{
   reg=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});offer();
   reg.addEventListener('updatefound',()=>{const w=reg.installing;w?.addEventListener('statechange',()=>{
    if(w.state==='installed'){if(navigator.serviceWorker.controller)offer();}
    if(w.state==='redundant')say('Mise à jour indisponible ; réessaie avec Internet.');
   });});
   await navigator.serviceWorker.ready;if(reg.waiting)offer();else check();
  }catch(e){console.error('Via Fidei : service worker',e);say('Mode hors connexion indisponible. Réessaie avec Internet.');}
 });
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&navigator.onLine&&reg)reg.update().catch(e=>console.warn('Via Fidei : mise à jour',e));});
})();