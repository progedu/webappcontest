window.onload = function() {
    Particles.init({
      selector: '.background',
      color: '#e4cece',
      connectParticles: true,
      minDistance: 100,
      showCube: true,
      shape: 'square',
    });
};

const options = {
    root: null, // 今回はビューポートをルート要素とする
    rootMargin: "-40% 0px", // ビューポートの中心を判定基準にする
    threshold: 0
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry.intersectionRatio);
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add("active");
      }
    });
  }, options);

  const boxElList = document.querySelectorAll(".animation");
  boxElList.forEach((element) => {
    animationObserver.observe(element);
  });
