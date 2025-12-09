  const slides = document.getElementById('slides');
  const controlsEl = document.getElementById('controls');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  const totalSlides = 11;
  let currentIndex = 0;
  let autoplayInterval;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    controlsEl.appendChild(dot);
  }

  const dots = document.querySelectorAll('.dot');

  function updateSlide() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlide();
    resetAutoplay();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 4000);
  }

  prevBtn.onclick = () => {
    prevSlide();
    resetAutoplay();
  };

  nextBtn.onclick = () => {
    nextSlide();
    resetAutoplay();
  };

  // Start autoplay
  autoplayInterval = setInterval(nextSlide, 4000);
