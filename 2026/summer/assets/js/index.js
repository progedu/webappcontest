(function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  const initTabs = () => {
    const setupTabGroup = (tabListSelector, panelContainerSelector) => {
      const tabs = Array.from(document.querySelectorAll(`${tabListSelector} [data-tab-target]`));
      const panels = Array.from(document.querySelectorAll(`${panelContainerSelector} .tab-pane`));

      if (!tabs.length || !panels.length) return;

      const activateTab = (tab) => {
        const target = document.querySelector(tab.dataset.tabTarget);
        if (!target) return;

        tabs.forEach((button) => {
          button.classList.remove("active");
          button.setAttribute("aria-selected", "false");
          button.setAttribute("tabindex", "-1");
        });

        panels.forEach((panel) => {
          panel.classList.remove("show", "active");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        tab.removeAttribute("tabindex");
        target.classList.add("show", "active");
      };

      tabs.forEach((tab, index) => {
        tab.addEventListener("click", (event) => {
          event.preventDefault();
          activateTab(tab);
        });

        tab.addEventListener("keydown", (event) => {
          if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

          event.preventDefault();
          const lastIndex = tabs.length - 1;
          let nextIndex = index;

          if (event.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1;
          if (event.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1;
          if (event.key === "Home") nextIndex = 0;
          if (event.key === "End") nextIndex = lastIndex;

          tabs[nextIndex].focus();
          activateTab(tabs[nextIndex]);
        });
      });

      const activeTab = tabs.find((tab) => tab.classList.contains("active")) || tabs[0];
      activateTab(activeTab);
    };

    setupTabGroup("#webAwardTabs", "#webAwardTabsContent");
    setupTabGroup("#ruleTabs", "#ruleTabsContent");
  };

  const initScrollReveal = () => {
    const selectors = [
      "main .attention",
      ".limit",
      "main > .news",
      "main > .tokuban",
      "main > .shoujou",
      "main > .division",
      "main > .rule",
      "main > .lesson",
      "main > .history",
      "main > .award",
      "main > .assessment",
      "main > .judge",
      ".tokuban-banner",
      ".shoujou .text-center > img",
      ".lesson .text-center > a",
      ".division dl",
      ".rule dl",
      ".award dl",
      ".assessment dl",
      ".judge .box",
      ".history_button"
    ];

    const targets = Array.from(new Set(
      selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)))
    ));

    if (!targets.length) return;

    root.classList.add("motion-ready");

    targets.forEach((target, index) => {
      target.classList.add("scroll-reveal");
      target.style.setProperty("--reveal-delay", `${Math.min((index % 6) * 55, 275)}ms`);
    });

    const revealVisibleTargets = () => {
      const viewportBottom = window.innerHeight * 1.12;
      targets.forEach((target) => {
        if (target.classList.contains("is-visible")) return;

        const rect = target.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < viewportBottom) {
          target.classList.add("is-visible");
        }
      });
    };

    revealVisibleTargets();

    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      root: null,
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.08
    });

    targets.forEach((target) => observer.observe(target));

    let revealTicking = false;
    window.addEventListener("scroll", () => {
      if (revealTicking) return;
      revealTicking = true;
      window.requestAnimationFrame(() => {
        revealVisibleTargets();
        revealTicking = false;
      });
    }, { passive: true });
  };

  const initScrollDepth = () => {
    if (reducedMotion) return;

    let ticking = false;
    const update = () => {
      const shift = Math.round(Math.min(window.scrollY, 7000) * -0.025);
      const depth = Math.min(window.scrollY / 3600, 1).toFixed(3);
      root.style.setProperty("--scroll-shift", `${shift}px`);
      root.style.setProperty("--scroll-depth", depth);
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  };

  const initSectionFish = () => {
    if (reducedMotion) return;

    const sectionSelector = [
      "main > .news",
      "main > .tokuban",
      "main > .shoujou",
      "main > .division",
      "main > .rule",
      "main > .lesson",
      "main > .history",
      "main > .award",
      "main > .assessment",
      "main > .judge"
    ].join(", ");
    const sections = Array.from(document.querySelectorAll(sectionSelector));

    const random = (min, max) => min + Math.random() * (max - min);

    const addFishLayer = (section, sectionIndex) => {
      if (section.querySelector(":scope > .section-fish-layer")) return;

      const layer = document.createElement("div");
      layer.className = "section-fish-layer";
      layer.setAttribute("aria-hidden", "true");

      const sectionHeight = section.getBoundingClientRect().height || 520;
      const depthRatio = sections.length > 1 ? sectionIndex / (sections.length - 1) : 0;
      const depthScale = 1 + depthRatio * 1.45;
      const currentCount = Math.min(4, Math.max(2, Math.round(sectionHeight / 420)));
      const bubbleCount = Math.min(24, Math.max(10, Math.round(sectionHeight / 76)));
      const starCount = Math.min(11, Math.max(4, Math.round(sectionHeight / 190)));
      const fishCount = Math.min(12, Math.max(5, Math.round(sectionHeight / 135)));

      for (let index = 0; index < currentCount; index += 1) {
        const current = document.createElement("span");
        current.className = `section-current section-current--${index % 2 === 0 ? "fast" : "slow"}`;
        current.style.setProperty("--current-y", `${random(8, 88).toFixed(1)}%`);
        current.style.setProperty("--current-duration", `${random(18, 34 + depthRatio * 10).toFixed(1)}s`);
        current.style.setProperty("--current-delay", `${random(0, 12).toFixed(1)}s`);
        current.style.setProperty("--current-opacity", `${random(0.14, depthRatio > 0.5 ? 0.24 : 0.3).toFixed(3)}`);
        current.style.setProperty("--current-tilt", `${random(-7, 7).toFixed(1)}deg`);
        layer.appendChild(current);
      }

      for (let index = 0; index < bubbleCount; index += 1) {
        const bubble = document.createElement("span");
        const bubbleSize = random(5, 18 + depthRatio * 8);
        bubble.className = "section-bubble";
        bubble.style.setProperty("--bubble-x", `${random(0, 100).toFixed(1)}%`);
        bubble.style.setProperty("--bubble-y", `${random(8, 96).toFixed(1)}%`);
        bubble.style.setProperty("--bubble-size", `${bubbleSize.toFixed(1)}px`);
        bubble.style.setProperty("--bubble-duration", `${random(14, 28 + depthRatio * 10).toFixed(1)}s`);
        bubble.style.setProperty("--bubble-delay", `${random(0, 18).toFixed(1)}s`);
        bubble.style.setProperty("--bubble-drift", `${random(-46, 54).toFixed(1)}px`);
        bubble.style.setProperty("--bubble-opacity", `${random(0.16, depthRatio > 0.55 ? 0.42 : 0.52).toFixed(3)}`);
        layer.appendChild(bubble);
      }

      for (let index = 0; index < starCount; index += 1) {
        const star = document.createElement("span");
        const starSize = random(12, 30 + depthRatio * 12);
        star.className = index % 3 === 0 ? "section-star section-star--shell" : "section-star";
        star.style.setProperty("--star-x", `${random(1, 99).toFixed(1)}%`);
        star.style.setProperty("--star-y", `${random(6, 94).toFixed(1)}%`);
        star.style.setProperty("--star-size", `${starSize.toFixed(1)}px`);
        star.style.setProperty("--star-duration", `${random(20, 42).toFixed(1)}s`);
        star.style.setProperty("--star-delay", `${random(0, 16).toFixed(1)}s`);
        star.style.setProperty("--star-rotation", `${random(-24, 26).toFixed(1)}deg`);
        star.style.setProperty("--star-opacity", `${random(0.12, depthRatio > 0.55 ? 0.28 : 0.34).toFixed(3)}`);
        layer.appendChild(star);
      }

      for (let index = 0; index < fishCount; index += 1) {
        const fishElement = document.createElement("span");
        const sizePattern = (index + sectionIndex) % 5;
        const fishSize = sizePattern === 0
          ? random(90, 138) * depthScale
          : sizePattern <= 2
            ? random(42, 76) * (1 + depthRatio * 1.05)
            : random(20, 38) * (1 + depthRatio * 0.7);
        const fishClasses = ["section-fish", "section-fish--right"];

        if (depthRatio > 0.45) fishClasses.push("section-fish--deep");
        if (depthRatio > 0.72 && sizePattern === 0) fishClasses.push("section-fish--abyss");

        fishElement.className = fishClasses.join(" ");
        fishElement.style.setProperty("--fish-y", `${random(10, 84).toFixed(1)}%`);
        fishElement.style.setProperty("--fish-size", `${fishSize.toFixed(1)}px`);
        fishElement.style.setProperty("--fish-duration", `${random(24, 46 + depthRatio * 18).toFixed(1)}s`);
        fishElement.style.setProperty("--fish-delay", `${(index === 0 ? random(0, 1.2) : random(2.2, 18)).toFixed(1)}s`);
        fishElement.style.setProperty("--fish-drift", `${random(-40, 42).toFixed(1)}px`);
        fishElement.style.setProperty("--fish-opacity", `${random(0.075, depthRatio > 0.55 ? 0.155 : 0.19).toFixed(3)}`);

        if (depthRatio > 0.58 && sizePattern === 0) {
          const light = document.createElement("span");
          light.className = "section-fish__light";
          fishElement.appendChild(light);
        }

        layer.appendChild(fishElement);
      }

      section.prepend(layer);
    };

    if (!("IntersectionObserver" in window)) {
      sections.forEach(addFishLayer);
      return;
    }

    const sectionIndexes = new Map(sections.map((section, index) => [section, index]));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        addFishLayer(entry.target, sectionIndexes.get(entry.target) || 0);
        observer.unobserve(entry.target);
      });
    }, {
      root: null,
      rootMargin: "20% 0px 20% 0px",
      threshold: 0.02
    });

    sections.forEach((section) => observer.observe(section));
  };

  const initUnderwaterCanvas = () => {
    if (reducedMotion) return;

    const canvas = document.createElement("canvas");
    canvas.className = "underwater-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame = 0;
    let startTime = performance.now();
    const bubbles = [];
    const motes = [];
    const rays = [];
    const sparkles = [];
    const fish = [];
    const marineShapes = [];

    const random = (min, max) => min + Math.random() * (max - min);
    const getPageDepth = () => {
      const pageHeight = Math.max(root.scrollHeight - window.innerHeight, 1);
      return Math.min(Math.max(window.scrollY / pageHeight, 0), 1);
    };

    const resetBubble = (bubble, initial = false) => {
      bubble.x = random(0, width);
      bubble.y = initial ? random(0, height) : height + random(20, 180);
      bubble.radius = random(3.2, 15);
      bubble.speed = random(0.18, 0.92);
      bubble.drift = random(-0.34, 0.34);
      bubble.phase = random(0, Math.PI * 2);
      bubble.alpha = random(0.28, 0.72);
    };

    const resetMote = (mote, initial = false) => {
      mote.x = random(0, width);
      mote.y = initial ? random(0, height) : height + random(20, 160);
      mote.radius = random(0.5, 2.2);
      mote.speed = random(0.08, 0.34);
      mote.drift = random(-0.12, 0.18);
      mote.alpha = random(0.08, 0.24);
    };

    const resetSparkle = (sparkle, initial = false) => {
      sparkle.x = random(0, width);
      sparkle.y = initial ? random(0, height) : height + random(30, 220);
      sparkle.radius = random(3, 10);
      sparkle.speed = random(0.05, 0.22);
      sparkle.drift = random(-0.18, 0.18);
      sparkle.phase = random(0, Math.PI * 2);
      sparkle.alpha = random(0.25, 0.72);
    };

    const resetFish = (item, initial = false) => {
      const sizeRoll = Math.random();
      const depth = getPageDepth();
      const depthScale = 1 + depth * 1.75;
      item.direction = 1;
      item.size = sizeRoll < 0.22
        ? random(82, 132) * depthScale
        : sizeRoll < 0.64
          ? random(40, 74) * (1 + depth * 1.08)
          : random(18, 34) * (1 + depth * 0.64);
      item.x = initial
        ? -item.size * 2.8 - random(0, width * 0.55)
        : -item.size * 2.8;
      item.y = random(height * 0.12, height * 0.88);
      item.speed = random(0.16, 0.58) * (1 - depth * 0.22);
      item.phase = random(0, Math.PI * 2);
      item.wave = random(0.36, 0.82);
      item.alpha = random(0.065, depth > 0.55 ? 0.145 : 0.18);
      item.deep = depth > 0.46 && sizeRoll < 0.5;
    };

    const resetMarineShape = (shape, initial = false) => {
      shape.type = Math.random() < 0.54 ? "star" : "shell";
      shape.x = initial ? random(0, width) : random(-40, width + 40);
      shape.y = initial ? random(0, height) : height + random(40, 180);
      shape.size = random(13, 34);
      shape.speed = random(0.025, 0.13);
      shape.drift = random(-0.1, 0.12);
      shape.rotation = random(0, Math.PI * 2);
      shape.spin = random(-0.003, 0.003);
      shape.phase = random(0, Math.PI * 2);
      shape.alpha = random(0.11, 0.26);
      shape.tint = Math.random() < 0.58 ? "warm" : "cool";
    };

    const createScene = () => {
      bubbles.length = 0;
      motes.length = 0;
      rays.length = 0;
      sparkles.length = 0;
      fish.length = 0;
      marineShapes.length = 0;

      const bubbleCount = Math.round(Math.min(74, Math.max(30, width / 23)));
      const moteCount = Math.round(Math.min(130, Math.max(54, width / 13)));
      const rayCount = Math.round(Math.min(10, Math.max(6, width / 210)));
      const sparkleCount = Math.round(Math.min(34, Math.max(14, width / 44)));
      const fishCount = Math.round(Math.min(12, Math.max(5, width / 170)));
      const marineShapeCount = Math.round(Math.min(18, Math.max(8, width / 95)));

      for (let index = 0; index < bubbleCount; index += 1) {
        const bubble = {};
        resetBubble(bubble, true);
        bubbles.push(bubble);
      }

      for (let index = 0; index < moteCount; index += 1) {
        const mote = {};
        resetMote(mote, true);
        motes.push(mote);
      }

      for (let index = 0; index < rayCount; index += 1) {
        rays.push({
          x: random(-width * 0.2, width * 1.05),
          width: random(width * 0.04, width * 0.12),
          angle: random(-0.42, -0.18),
          alpha: random(0.055, 0.13),
          speed: random(0.12, 0.35),
          phase: random(0, Math.PI * 2)
        });
      }

      for (let index = 0; index < sparkleCount; index += 1) {
        const sparkle = {};
        resetSparkle(sparkle, true);
        sparkles.push(sparkle);
      }

      for (let index = 0; index < fishCount; index += 1) {
        const item = {};
        resetFish(item, true);
        fish.push(item);
      }

      for (let index = 0; index < marineShapeCount; index += 1) {
        const shape = {};
        resetMarineShape(shape, true);
        marineShapes.push(shape);
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createScene();
    };

    const drawBackgroundGlow = (time) => {
      const pulse = Math.sin(time * 0.32) * 0.5 + 0.5;
      const gradient = context.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${0.26 + pulse * 0.08})`);
      gradient.addColorStop(0.34, "rgba(118, 244, 255, 0.16)");
      gradient.addColorStop(1, "rgba(15, 164, 224, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
    };

    const drawRays = (time) => {
      context.save();
      context.globalCompositeOperation = "source-over";
      context.lineCap = "round";
      context.lineJoin = "round";

      rays.forEach((ray, index) => {
        const yBase = height * (-0.2 + index * 0.16);
        const drift = Math.sin(time * ray.speed + ray.phase) * 36;
        const thickness = Math.max(30, ray.width * 0.62);

        context.save();
        context.translate(width * 0.5, height * 0.5);
        context.rotate(ray.angle);
        context.translate(-width * 0.5, -height * 0.5);
        context.beginPath();
        for (let x = -width * 0.25; x <= width * 1.25; x += 38) {
          const y = yBase
            + Math.sin((x + drift) * 0.007 + time * 0.82 + index) * 18
            + Math.sin((x - drift) * 0.016 - time * 0.54) * 8;

          if (x === -width * 0.25) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.strokeStyle = "rgba(0, 114, 190, 0.12)";
        context.lineWidth = thickness + 6;
        context.stroke();
        context.strokeStyle = `rgba(172, 252, 255, ${0.2 + ray.alpha})`;
        context.lineWidth = thickness;
        context.stroke();
        context.restore();
      });

      context.restore();
    };

    const drawCaustics = (time) => {
      context.save();
      context.globalCompositeOperation = "source-over";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = 2.8;

      for (let band = 0; band < 5; band += 1) {
        const yBase = height * (0.12 + band * 0.18);
        context.strokeStyle = band % 2 === 0 ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 117, 190, 0.1)";
        context.beginPath();

        for (let x = -80; x <= width + 80; x += 34) {
          const waveA = Math.sin(x * 0.011 + time * 0.64 + band * 0.9) * 12;
          const waveB = Math.sin(x * 0.026 - time * 0.42 + band) * 5;
          const y = yBase + waveA + waveB;

          if (x === -80) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.stroke();
      }

      context.restore();
    };

    const drawFish = (time) => {
      context.save();
      context.globalCompositeOperation = "source-over";

      fish.forEach((item) => {
        item.x += item.speed * item.direction;

        if (item.x > width + item.size * 3) {
          resetFish(item);
        }

        const swimY = item.y + Math.sin(time * item.wave + item.phase) * item.size * 0.28;
        const tailWag = Math.sin(time * 4.2 + item.phase) * item.size * 0.08;

        context.save();
        context.translate(item.x, swimY);
        context.scale(item.direction, 1);
        context.fillStyle = `rgba(1, 26, 64, ${item.alpha})`;
        context.strokeStyle = `rgba(255, 255, 255, ${item.alpha * 0.28})`;
        context.lineWidth = Math.max(1, item.size * 0.035);

        context.beginPath();
        context.ellipse(0, 0, item.size * (item.deep ? 0.82 : 0.72), item.size * (item.deep ? 0.39 : 0.31), 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(-item.size * (item.deep ? 0.72 : 0.62), 0);
        context.lineTo(-item.size * (item.deep ? 1.22 : 1.1), -item.size * (item.deep ? 0.34 : 0.28) + tailWag);
        context.lineTo(-item.size * (item.deep ? 1.14 : 1.02), item.size * (item.deep ? 0.33 : 0.27) + tailWag);
        context.closePath();
        context.fill();

        context.beginPath();
        context.moveTo(-item.size * 0.12, -item.size * (item.deep ? 0.3 : 0.24));
        context.quadraticCurveTo(item.size * 0.04, -item.size * (item.deep ? 0.7 : 0.58), item.size * 0.24, -item.size * (item.deep ? 0.28 : 0.22));
        context.closePath();
        context.fill();

        context.beginPath();
        context.moveTo(-item.size * 0.06, item.size * (item.deep ? 0.21 : 0.16));
        context.quadraticCurveTo(item.size * 0.12, item.size * (item.deep ? 0.52 : 0.44), item.size * 0.34, item.size * (item.deep ? 0.22 : 0.18));
        context.closePath();
        context.fill();

        if (item.deep) {
          context.strokeStyle = `rgba(1, 26, 64, ${item.alpha * 0.86})`;
          context.lineWidth = Math.max(1.2, item.size * 0.025);
          context.beginPath();
          context.moveTo(item.size * 0.42, -item.size * 0.24);
          context.quadraticCurveTo(item.size * 0.66, -item.size * 0.62, item.size * 0.9, -item.size * 0.36);
          context.stroke();

          context.fillStyle = `rgba(255, 247, 166, ${item.alpha * 0.72})`;
          context.beginPath();
          context.arc(item.size * 0.93, -item.size * 0.35, Math.max(2, item.size * 0.055), 0, Math.PI * 2);
          context.fill();
        }

        context.restore();
      });

      context.restore();
    };

    const drawStarShape = (shape) => {
      context.beginPath();

      for (let index = 0; index < 10; index += 1) {
        const radius = index % 2 === 0 ? shape.size : shape.size * 0.46;
        const angle = -Math.PI / 2 + index * Math.PI / 5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.closePath();
      context.fill();
      context.stroke();
    };

    const drawShellShape = (shape) => {
      const size = shape.size;

      context.beginPath();
      context.moveTo(-size * 0.85, size * 0.35);
      context.quadraticCurveTo(-size * 0.48, -size * 0.76, 0, -size * 0.88);
      context.quadraticCurveTo(size * 0.48, -size * 0.76, size * 0.85, size * 0.35);
      context.quadraticCurveTo(size * 0.34, size * 0.62, 0, size * 0.58);
      context.quadraticCurveTo(-size * 0.34, size * 0.62, -size * 0.85, size * 0.35);
      context.closePath();
      context.fill();
      context.stroke();

      context.beginPath();
      [-0.56, -0.28, 0, 0.28, 0.56].forEach((offset) => {
        context.moveTo(0, size * 0.5);
        context.quadraticCurveTo(offset * size, -size * 0.15, offset * size * 1.15, size * 0.22);
      });
      context.stroke();
    };

    const drawMarineShapes = (time) => {
      context.save();
      context.globalCompositeOperation = "source-over";
      context.lineJoin = "round";
      context.lineCap = "round";

      marineShapes.forEach((shape) => {
        shape.y -= shape.speed;
        shape.x += shape.drift + Math.sin(time * 0.5 + shape.phase) * 0.08;
        shape.rotation += shape.spin;

        if (shape.y < -shape.size * 3 || shape.x < -90 || shape.x > width + 90) {
          resetMarineShape(shape);
        }

        const pulse = Math.sin(time * 0.7 + shape.phase) * 0.5 + 0.5;
        const alpha = shape.alpha * (0.72 + pulse * 0.28);
        const isWarm = shape.tint === "warm";

        context.save();
        context.translate(shape.x, shape.y);
        context.rotate(shape.rotation);
        context.fillStyle = shape.type === "star"
          ? `rgba(255, 221, 63, ${alpha})`
          : isWarm
            ? `rgba(255, 255, 255, ${alpha})`
            : `rgba(167, 248, 255, ${alpha})`;
        context.strokeStyle = `rgba(1, 41, 98, ${alpha * 0.62})`;
        context.lineWidth = Math.max(1.2, shape.size * 0.055);

        if (shape.type === "star") {
          drawStarShape(shape);
        } else {
          drawShellShape(shape);
        }

        context.restore();
      });

      context.restore();
    };

    const drawBubbles = (time) => {
      context.save();
      context.globalCompositeOperation = "source-over";
      context.lineCap = "round";

      bubbles.forEach((bubble) => {
        bubble.y -= bubble.speed;
        bubble.x += bubble.drift + Math.sin(time * 1.1 + bubble.phase + bubble.y * 0.01) * 0.18;

        if (bubble.y < -bubble.radius * 4 || bubble.x < -80 || bubble.x > width + 80) {
          resetBubble(bubble);
        }

        context.fillStyle = `rgba(255, 255, 255, ${bubble.alpha * 0.22})`;
        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = `rgba(0, 77, 166, ${0.26 + bubble.alpha * 0.3})`;
        context.lineWidth = Math.max(1.7, bubble.radius * 0.16);
        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        context.stroke();

        context.strokeStyle = `rgba(255, 255, 255, ${0.54 + bubble.alpha * 0.28})`;
        context.lineWidth = Math.max(1.2, bubble.radius * 0.12);
        context.beginPath();
        context.arc(bubble.x - bubble.radius * 0.16, bubble.y - bubble.radius * 0.16, bubble.radius * 0.55, -2.55, -1.05);
        context.stroke();
      });

      context.restore();
    };

    const drawMotes = (time) => {
      context.save();
      context.globalCompositeOperation = "source-over";

      motes.forEach((mote) => {
        mote.y -= mote.speed;
        mote.x += mote.drift + Math.sin(time * 0.8 + mote.y * 0.012) * 0.08;

        if (mote.y < -20 || mote.x < -40 || mote.x > width + 40) {
          resetMote(mote);
        }

        context.fillStyle = `rgba(255, 255, 255, ${mote.alpha * 0.7})`;
        context.beginPath();
        context.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.restore();
    };

    const drawSparkles = (time) => {
      context.save();
      context.globalCompositeOperation = "source-over";
      context.lineCap = "round";

      sparkles.forEach((sparkle) => {
        sparkle.y -= sparkle.speed;
        sparkle.x += sparkle.drift + Math.sin(time * 0.72 + sparkle.phase) * 0.12;

        if (sparkle.y < -30 || sparkle.x < -40 || sparkle.x > width + 40) {
          resetSparkle(sparkle);
        }

        const twinkle = Math.sin(time * 1.8 + sparkle.phase) * 0.5 + 0.5;
        const alpha = sparkle.alpha * (0.46 + twinkle * 0.54);
        const radius = sparkle.radius * (0.72 + twinkle * 0.34);

        context.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        context.lineWidth = 1.8;
        context.beginPath();
        context.moveTo(sparkle.x - radius, sparkle.y);
        context.lineTo(sparkle.x + radius, sparkle.y);
        context.moveTo(sparkle.x, sparkle.y - radius);
        context.lineTo(sparkle.x, sparkle.y + radius);
        context.stroke();

        context.strokeStyle = `rgba(255, 241, 119, ${alpha * 0.72})`;
        context.lineWidth = 1.2;
        context.beginPath();
        context.moveTo(sparkle.x - radius * 0.55, sparkle.y - radius * 0.55);
        context.lineTo(sparkle.x + radius * 0.55, sparkle.y + radius * 0.55);
        context.moveTo(sparkle.x + radius * 0.55, sparkle.y - radius * 0.55);
        context.lineTo(sparkle.x - radius * 0.55, sparkle.y + radius * 0.55);
        context.stroke();
      });

      context.restore();
    };

    const draw = (now) => {
      const time = (now - startTime) / 1000;
      context.clearRect(0, 0, width, height);
      drawBackgroundGlow(time);
      drawRays(time);
      drawCaustics(time);
      drawFish(time);
      drawMarineShapes(time);
      drawMotes(time);
      drawSparkles(time);
      drawBubbles(time);
      animationFrame = window.requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        return;
      }

      startTime = performance.now();
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw(startTime);
    animationFrame = window.requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
  };

  document.addEventListener("DOMContentLoaded", () => {
    initUnderwaterCanvas();
    initTabs();
    initSectionFish();
    initScrollDepth();
  });
})();
