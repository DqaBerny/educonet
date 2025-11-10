document.addEventListener('DOMContentLoaded', function(){
  const section = document.querySelector('.video-section');
  if(!section) return;
  const toggle = section.querySelector('.video-toggle');
  if(!toggle) return;
  const wrapId = toggle.getAttribute('aria-controls');
  const wrap = wrapId ? document.getElementById(wrapId) : null;

  function updateUI(collapsed){
    section.classList.toggle('collapsed', !!collapsed);
    // aria-expanded reflects whether the content is visible
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.textContent = collapsed ? 'Show video' : 'Hide video';
    // if there's a video element, pause it when collapsed to avoid background playback
    const vid = section.querySelector('video');
    if(vid){
      try{
        if(collapsed){ vid.pause(); }
      }catch(e){ /* ignore if playback not available */ }
    }
  }

  toggle.addEventListener('click', function(){
    const isCollapsed = section.classList.toggle('collapsed');
    updateUI(isCollapsed);
  });

  // Start collapsed on narrow screens, expanded on wider screens
  const mql = window.matchMedia('(max-width: 767px)');
  function handleMq(e){
    if(e.matches){
      updateUI(true);
    } else {
      updateUI(false);
    }
  }
  // initial
  handleMq(mql);
  // listen for changes (addListener for older browsers)
  if(typeof mql.addEventListener === 'function') mql.addEventListener('change', handleMq);
  else if(typeof mql.addListener === 'function') mql.addListener(handleMq);
});
