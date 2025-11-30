// Initialize Icons
if (window.lucide && typeof lucide.createIcons === 'function') {
  lucide.createIcons();
}

// 3D Canvas Demo Animation
const canvas3d = document.getElementById('demo-3d');
if (canvas3d) {
  const ctx = canvas3d.getContext('2d');
  const width = (canvas3d.width = canvas3d.offsetWidth);
  const height = (canvas3d.height = canvas3d.offsetHeight);

  let time = 0;
  function animate() {
    time += 0.02;
    ctx.clearRect(0, 0, width, height);

    // Draw animated grid
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1;

    for (let i = 0; i < 10; i++) {
      const x = (width / 10) * i + Math.sin(time + i) * 5;
      const y = (height / 10) * i + Math.cos(time + i) * 5;

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  }
  animate();
}

// SCROLL ANIMATION LOGIC

// 1. Horizontal Scroll Section
const stickySection = document.getElementById('process');
const track = document.getElementById('horizontal-track');
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  if (!stickySection || !track) return;

  const stickyTop = stickySection.offsetTop;
  const stickyHeight = stickySection.offsetHeight;
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;

  // Check if we are within the sticky section
  if (scrollY >= stickyTop && scrollY <= stickyTop + stickyHeight - viewportHeight) {
    // Calculate percentage
    const scrolledDistance = scrollY - stickyTop;
    const totalScrollableDistance = stickyHeight - viewportHeight;
    const percentage = scrolledDistance / totalScrollableDistance;

    // Move the track
    const trackWidth = track.scrollWidth;
    const viewWidth = window.innerWidth;
    const maxTranslate = trackWidth - viewWidth + 48; // 48px padding buffer

    // Only scroll horizontally if track is wider than view
    if (trackWidth > viewWidth) {
      const translateX = -(percentage * maxTranslate);
      track.style.transform = `translateX(${translateX}px)`;
    }

    // Update progress bar
    if (progressBar) {
      progressBar.style.width = `${percentage * 100}%`;
    }
  } else if (scrollY < stickyTop) {
    // Reset to start
    track.style.transform = `translateX(0px)`;
    if (progressBar) {
      progressBar.style.width = `0%`;
    }
  } else if (scrollY > stickyTop + stickyHeight - viewportHeight) {
    // Lock to end
    const trackWidth = track.scrollWidth;
    const viewWidth = window.innerWidth;
    if (trackWidth > viewWidth) {
      const maxTranslate = trackWidth - viewWidth + 48;
      track.style.transform = `translateX(-${maxTranslate}px)`;
    }
    if (progressBar) {
      progressBar.style.width = `100%`;
    }
  }
});