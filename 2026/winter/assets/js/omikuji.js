(() => {
  const button = document.querySelector('.hero-fortune');
  const announcement = document.getElementById('fortune-announcement');
  const poses = document.getElementById('fortune-poses').content;
  const shakeFrames = [...poses.querySelectorAll('img[alt=""]')];
  const fortunes = [...poses.querySelectorAll('img:not([alt=""])')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let displayed = button.querySelector('img');

  async function loadPose(source) {
    const image = new Image(2048,1843);
    image.alt = '';
    image.decoding = 'async';
    image.src = source.getAttribute('src');
    const timeout = setTimeout(() => image.removeAttribute('src'),10000);
    try {
      await image.decode();
      return image;
    } finally {
      clearTimeout(timeout);
    }
  }

  function display(image) {
    displayed.replaceWith(image);
    displayed = image;
  }

  async function shake() {
    if (motion.matches) return;
    const frames = await Promise.all(shakeFrames.map(loadPose));
    for (let i = 0; i < 4 && !motion.matches; i++) {
      display(frames[i % frames.length]);
      await new Promise(resolve => setTimeout(resolve,145));
    }
  }

  button.addEventListener('click',async () => {
    if (button.hasAttribute('aria-busy')) return;
    const previous = displayed;
    const selected = fortunes[Math.floor(Math.random() * fortunes.length)];
    button.setAttribute('aria-busy','true');
    announcement.textContent = 'おみくじを引いています。';
    // Fetch only the selected slip. A missing shake frame can still yield a result.
    const [result] = await Promise.allSettled([loadPose(selected),shake()]);
    if (result.status === 'fulfilled') {
      display(result.value);
      button.setAttribute('aria-label','もう一度おみくじを引く');
      announcement.textContent = 'おみくじの結果は' + selected.alt + 'です。';
    } else {
      display(previous);
      button.setAttribute('aria-label','おみくじを再試行');
      announcement.textContent = 'おみくじを読み込めませんでした。もう一度引けます。';
    }
    button.removeAttribute('aria-busy');
  });
  button.disabled = false;
})();
