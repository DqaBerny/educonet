document.addEventListener('DOMContentLoaded', function(){
  const sliders = Array.from(document.querySelectorAll('.slider'));
  sliders.forEach(slider => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prev = slider.querySelector('.slider-prev');
    const next = slider.querySelector('.slider-next');
    const dotsWrap = slider.querySelector('.slider-dots');
    if(!slides.length) return;

    let idx = 0;
    let timer = null;

    function go(i){
      slides.forEach((s,si)=> s.classList.toggle('active', si===i));
      const dots = Array.from(dotsWrap.querySelectorAll('button'));
      dots.forEach((d,di)=> d.classList.toggle('active', di===i));
      idx = i;
    }

    function nextSlide(){ go((idx+1) % slides.length); }
    function prevSlide(){ go((idx-1 + slides.length) % slides.length); }

    // build dots
    slides.forEach((s,i)=>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Go to slide ' + (i+1));
      btn.addEventListener('click', ()=>{ stop(); go(i); start(); });
      dotsWrap.appendChild(btn);
    });

    // wire controls
    if(prev) prev.addEventListener('click', ()=>{ stop(); prevSlide(); start(); });
    if(next) next.addEventListener('click', ()=>{ stop(); nextSlide(); start(); });

    // pause on hover/focus
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);

    // keyboard arrows
    slider.addEventListener('keydown', function(e){
      if(e.key === 'ArrowLeft') { stop(); prevSlide(); start(); }
      if(e.key === 'ArrowRight') { stop(); nextSlide(); start(); }
    });

    function start(){ if(timer) clearInterval(timer); timer = setInterval(nextSlide, 4000); }
    function stop(){ if(timer){ clearInterval(timer); timer = null; } }

    // make prev/next focusable
    if(prev) prev.tabIndex = 0;
    if(next) next.tabIndex = 0;

    // init
    go(0);
    start();
  });
});
