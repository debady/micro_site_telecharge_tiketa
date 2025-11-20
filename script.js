
(function(){
  const typingEl = document.getElementById('typing');
  const phrases = ['— design clair', '— navigation tactile', '— images larges'];
  let tIndex = 0, charIndex = 0, deleting = false;

  function tick(){
    const current = phrases[tIndex];
    if(!deleting){
      charIndex++;
      typingEl.textContent = current.slice(0,charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0,charIndex);
      if(charIndex === 0){
        deleting = false;
        tIndex = (tIndex+1)%phrases.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 70);
  }
  tick();

  const slidesEl = document.getElementById('slides');
  const dotsEl = document.getElementById('dots');
  const countEl = document.getElementById('count');

  const STORAGE_KEY = 'explora_app_images_v1';
  let images = loadImages(); 
  let current = 0;
  let autoplay = true;
  let autoplayIntervalId = null;
  const AUTOPLAY_DELAY = 4000;

  function loadImages(){
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if(raw) return JSON.parse(raw);
    } catch(e){}
    return [
      'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633037/Screenshot_20251120_095855_com.example.tiketa_vaty2j.jpg',
      'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633039/Screenshot_20251120_095858_com.example.tiketa_jnxjie.jpg',
      'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633039/Screenshot_20251120_095901_com.example.tiketa_qtonkv.jpg',
      // 'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633042/Screenshot_20251120_095903_com.example.tiketa_uih6ix.jpg',
      // 'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633042/Screenshot_20251120_095906_com.example.tiketa_xnvgym.jpg',
      // 'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633046/Screenshot_20251120_095910_com.example.tiketa_yqmx2e.jpg',

      // 'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633042/Screenshot_20251120_095915_com.example.tiketa_qfrtbo.jpg',
      // 'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633044/Screenshot_20251120_095942_com.example.tiketa_nty4kq.jpg',
      // 'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633046/Screenshot_20251120_095948_com.example.tiketa_w3mfao.jpg',
      // 'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633047/Screenshot_20251120_095957_com.example.tiketa_m9yiir.jpg',
      // 'https://res.cloudinary.com/diwsojrlc/image/upload/v1763633036/Screenshot_20251120_100004_com.example.tiketa_tnow3i.jpg',
    ];
  }
  function saveImages(){
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  }

  function renderSlides(){
    slidesEl.innerHTML = '';
    dotsEl.innerHTML = '';
    images.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Aperçu ${i+1}`;
      img.loading = 'lazy';
      slide.appendChild(img);
      slidesEl.appendChild(slide);

      const dot = document.createElement('div');
      dot.className = 'dot' + (i===current? ' active':'');
      dot.addEventListener('click', ()=> goTo(i));
      dotsEl.appendChild(dot);
    });
    countEl.textContent = images.length;
    updatePosition();
  }

  function updatePosition(){
    const total = images.length || 1;
    if(current < 0) current = total -1;
    if(current >= total) current = 0;
    slidesEl.style.transform = `translateX(calc(-${current} * 100%))`;
    const dotNodes = dotsEl.querySelectorAll('.dot');
    dotNodes.forEach((d, i)=> d.classList.toggle('active', i===current));
  }

  function prev(){ current = (current - 1 + images.length) % images.length; updatePosition(); restartAutoplay(); }
  function next(){ current = (current + 1) % images.length; updatePosition(); restartAutoplay(); }
  function goTo(i){ current = i; updatePosition(); restartAutoplay(); }

  function startAutoplay(){
    if(autoplayIntervalId) clearInterval(autoplayIntervalId);
    if(autoplay && images.length>1){
      autoplayIntervalId = setInterval(()=>{ next(); }, AUTOPLAY_DELAY);
      document.getElementById('playPause').textContent = 'Pause';
      document.getElementById('playPause').setAttribute('aria-pressed','false');
    }
  }
  function stopAutoplay(){
    if(autoplayIntervalId){ clearInterval(autoplayIntervalId); autoplayIntervalId = null; }
    document.getElementById('playPause').textContent = 'Play';
    document.getElementById('playPause').setAttribute('aria-pressed','true');
  }
  function restartAutoplay(){
    if(autoplay){
      stopAutoplay();
      startAutoplay();
    }
  }

  (function addSwipe(){
    let startX = 0, dist = 0;
    const threshold = 50;
    const el = document.getElementById('carousel');
    el.addEventListener('touchstart', (e)=> {
      startX = e.changedTouches[0].clientX;
    }, {passive:true});
    el.addEventListener('touchend', (e)=> {
      dist = e.changedTouches[0].clientX - startX;
      if(Math.abs(dist) > threshold){
        if(dist > 0) prev(); else next();
      }
    }, {passive:true});
  })();

  document.getElementById('prevBtn').addEventListener('click', prev);
  document.getElementById('nextBtn').addEventListener('click', next);
  document.getElementById('playPause').addEventListener('click', function(){
    if(autoplay){ autoplay = false; stopAutoplay(); } else { autoplay = true; startAutoplay(); }
  });

  const addBtn = document.getElementById('addUrl');
  const input = document.getElementById('imgUrl');
  addBtn.addEventListener('click', function(){
    const url = input.value.trim();
    if(!url) return alert('Colle une URL valide.');
    images.push(url);
    saveImages();
    input.value = '';
    current = images.length -1;
    renderSlides();
    startAutoplay();
  });




  renderSlides();
  startAutoplay();

  window.__ExploraPreview = {
    images, saveImages, loadImages, goTo,
  };
})();
