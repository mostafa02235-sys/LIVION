/* LIVION Android bridge: added only inside the APK. The game code itself is unchanged. */
(function(){
  window.LIVION_ANDROID = true;
  function shown(id){var e=document.getElementById(id);return !!(e&&!e.classList.contains('hide'));}
  var A = window.LivionAndroid = {};
  // Android back button: close the map/phone, otherwise open or close the pause menu. On the title screen, leave the app.
  A.back = function(){
    try{
      var G=window.__LIVION; if(!G||!G.started) return 'exit';
      if(shown('wmap')){G.closeMap();return 'ok';}
      if(shown('phone')){G.closePhone();return 'ok';}
      G.togglePause(); return 'ok';
    }catch(e){return 'ok';}
  };
  // App sent to background (home button, call, screen off): pause the game and silence audio.
  A.bg = function(){
    var G=window.__LIVION; if(!G) return;
    try{ if(G.started&&!G.paused) G.togglePause(); }catch(e){}
    try{ var c=G.sound.ctx; if(c&&c.state==='running') c.suspend(); }catch(e){}
  };
  A.fg = function(){ try{ var c=window.__LIVION.sound.ctx; if(c&&c.state==='suspended') c.resume(); }catch(e){} };
  // The action button reads EXIT while driving, so getting out of a car is obvious on a touchscreen.
  setInterval(function(){
    try{ var b=document.getElementById('bAct'); if(!b) return;
      var t=(window.__LIVION&&window.__LIVION.inCar)?'EXIT':'E'; if(b.textContent!==t) b.textContent=t; }catch(e){}
  },300);
  // Block the long-press text selection / callout that Android WebViews show.
  var st=document.createElement('style');
  st.textContent='*{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}input,textarea{-webkit-user-select:text;user-select:text}';
  document.head.appendChild(st);
  document.addEventListener('contextmenu',function(e){e.preventDefault();});
  // Show unexpected script errors on screen instead of failing silently (helps bug reports).
  var seen={};
  window.addEventListener('error',function(ev){
    var m=(ev&&ev.message)||'error'; if(seen[m]) return; seen[m]=1;
    var d=document.createElement('div');
    d.style.cssText='position:fixed;left:8px;bottom:8px;z-index:99999;max-width:70vw;background:rgba(160,20,20,.9);color:#fff;font:12px sans-serif;padding:6px 9px;border-radius:6px;pointer-events:none';
    d.textContent='LIVION error: '+m+(ev.lineno?' (line '+ev.lineno+')':'');
    document.body.appendChild(d); setTimeout(function(){d.remove();},8000);
  });
})();
