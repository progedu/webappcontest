(() => {
  const choices = [...document.querySelectorAll('[data-department-choice]')];
  const summaries = new Map([...document.querySelectorAll('[data-department-summary]')].map(summary => [
    summary.id.slice('department-'.length),
    summary,
  ]));
  const details = document.querySelector('.department-details');
  const sections = document.querySelectorAll('[data-departments]');
  const tabList = document.querySelector('.division-banners');
  const departmentPicker = document.getElementById('entry');
  const tabs = [...tabList.querySelectorAll('[data-department-choice]')];
  const departmentPane = document.getElementById('department-content-panel');
  const sky = document.querySelector('.winter-sky');
  const colorCanvas = sky.querySelector('canvas');
  const colors = colorCanvas.getContext('2d',{alpha:false});
  const sun = sky.querySelector('.winter-sky__sun');
  const ridge = sky.querySelector('.winter-sky__ridge');
  const sunPath = document.createElementNS('http://www.w3.org/2000/svg','path');
  let sunPathLength = 0;
  const snowWeight = document.getElementById('winter-snow-weight');
  const snowMask = document.getElementById('winter-snow-depth');
  const snowProfile = document.getElementById('winter-snow-profile').content.querySelector('image');
  let lastSnowCover = 0;
  let lastMaskedCover = 0;
  const banner = document.querySelector('.hero-visual');
  const stars = sky.querySelector('.winter-sky__stars');
  const kasumi = sky.querySelector('.winter-sky__kasumi');
  const cranes = sky.querySelector('.winter-sky__cranes');
  const leadCrane = cranes.querySelector('.winter-crane--lead');
  const followingCrane = cranes.querySelector('.winter-crane--following');
  const snowman = sky.querySelector('.winter-snowman');
  const whiteout = sky.querySelector('.winter-whiteout');
  const flakes = sky.querySelector('.winter-sky__flurries');
  let drawSnowfall;
  let snowfallRequested = false;
  const constellation = sky.querySelector('.winter-sky__constellation');
  const footer = document.getElementById('footer');
  const header = document.querySelector('.site-nav');
  const departmentHeader = document.querySelector('.department-header');
  const departmentLinks = departmentHeader.querySelectorAll('[data-section]');
  const phoneLayout = window.matchMedia(
    '(max-width: 47.99rem), (pointer: coarse) and (orientation: landscape) and (max-width: 64rem) and (max-height: 33.125rem)'
  );
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeDepartment = 'web';
  let compactMenuHeight;
  let headerOverhang = 0;
  const sunsetProgress = .91;

  // A single palette follows the winter sky from starlight to sunrise, sunset and night.
  const daylight = [
    { at: 0,    top: '#03050c', middle: '#070b16', horizon: '#111728', glow: '#ffc17500' },
    { at: .018, top: '#080a19', middle: '#211e33', horizon: '#57384a', glow: '#f3aa8200' },
    { at: .037, top: '#1d2340', middle: '#765064', horizon: '#eb967f', glow: '#ffa57859' },
    { at: .055, top: '#313d60', middle: '#b6787d', horizon: '#ffd18c', glow: '#ffcd829e' },
    { at: .10,  top: '#6c84a5', middle: '#e4aa9f', horizon: '#ffe2a8', glow: '#ffe2a4b0' },
    { at: .16,  top: '#90adc5', middle: '#eec9b2', horizon: '#ffe9b7', glow: '#ffdfa18c' },
    { at: .48, top: '#79b8dc', middle: '#cce8f2', horizon: '#edf2e9', glow: '#fffbdba8' },
    { at: .70, top: '#a6b9d4', middle: '#f2ceae', horizon: '#ffe5a9', glow: '#ffe4a696' },
    { at: .84, top: '#675878', middle: '#d98b7b', horizon: '#ffb469', glow: '#ffcf7bba' },
    { at: .91, top: '#29314e', middle: '#6b506c', horizon: '#d88f71', glow: '#ffc7844d' },
    { at: .97, top: '#080d1a', middle: '#182337', horizon: '#353448', glow: '#d9a68200' },
    { at: 1,   top: '#030610', middle: '#080f1d', horizon: '#141c2d', glow: '#d9a68200' },
  ].map(frame => ({
    at: frame.at,
    top: channels(frame.top),
    middle: channels(frame.middle),
    horizon: channels(frame.horizon),
    glow: channels(frame.glow),
  }));

  function channels(hex) {
    return hex.slice(1).match(/../g).map(pair => parseInt(pair,16));
  }

  function mixedColor(from,to,mix,alpha = 1) {
    const rgb = from.slice(0,3).map((a,i) => Math.round(a + (to[i] - a) * mix));
    return `rgba(${rgb.join(',')},${alpha})`;
  }

  // Only the diffuse sky colors use the small texture. All illustrated artwork is full resolution.
  function paintSky(progress,layout,sunX,sunY) {
    if (!colors || colors.isContextLost?.()) return;
    const next = daylight.findIndex(frame => frame.at >= progress);
    const from = daylight[Math.max(0,next - 1)];
    const to = daylight[next];
    // The sky is a diffuse texture. Repaint only when its palette or light centre
    // crosses a texture sample. The sun and the birds still move on every scroll.
    const tint = from === to ? 0 : Math.round(128 * (progress - from.at) / (to.at - from.at));
    const w = colorCanvas.width, h = colorCanvas.height;
    const hasGlow = !phoneLayout.matches && (from.glow[3] || to.glow[3]);
    const lightX = hasGlow ? Math.round(sunX * w / layout.viewportWidth) : 0;
    const lightY = hasGlow ? Math.round(sunY * h / layout.viewportHeight) : 0;
    const previous = layout.skySample;
    if (previous && previous.next === next && previous.tint === tint &&
        previous.x === lightX && previous.y === lightY) return;
    layout.skySample = { next,tint,x:lightX,y:lightY };
    const mix = tint / 128;
    const air = colors.createLinearGradient(0,0,0,h);
    const skyline = layout.ridgeBottom / layout.viewportHeight;
    air.addColorStop(0,mixedColor(from.top,to.top,mix));
    air.addColorStop(.55 * skyline,mixedColor(from.middle,to.middle,mix));
    air.addColorStop(.91 * skyline,mixedColor(from.horizon,to.horizon,mix));
    colors.fillStyle = air;
    colors.fillRect(0,0,w,h);
    const alpha = ((1 - mix) * from.glow[3] + mix * to.glow[3]) / 255;
    if (!phoneLayout.matches && alpha > 0) {
      const colorMix = to.glow[3] * mix / (255 * alpha);
      colors.save();
      colors.translate(lightX,lightY);
      colors.scale(.44 * w,.38 * h);
      const glow = colors.createRadialGradient(0,0,0,0,0,1);
      glow.addColorStop(0,mixedColor(from.glow,to.glow,colorMix,alpha));
      glow.addColorStop(1,mixedColor(from.glow,to.glow,colorMix,0));
      colors.fillStyle = glow;
      colors.fillRect(-1,-1,2,2);
      colors.restore();
    }
    if (colorCanvas.hidden) colorCanvas.hidden = false;
  }

  function ramp(value, start, end) {
    const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
    return t * t * (3 - 2 * t);
  }

  let sceneLayout;
  let layoutDirty = true;
  let lastSceneDistance = -1;

  function prepareSnowfall() {
    if (snowfallRequested || !window.createWinterSnowfall) return;
    snowfallRequested = true;
    const prepare = () => {
      drawSnowfall = window.createWinterSnowfall(sky.querySelector('.winter-snowfall'),whiteout,flakes,invalidateSceneryLayout);
      if (drawSnowfall) invalidateSceneryLayout();
    };
    if (window.requestIdleCallback) window.requestIdleCallback(prepare,{timeout:800});
    else setTimeout(prepare,0);
  }

  // All positions are in document or fixed-sky coordinates and survive scrolling.
  function measureScenery(scrollY) {
    const viewportHeight = window.innerHeight;
    const viewportWidth = document.documentElement.clientWidth;
    const headerHeight = header.offsetHeight;
    const tabBounds = tabList.getBoundingClientRect();
    const terrain = ridge.getBoundingClientRect();
    const sunDiameter = sun.offsetWidth;
    if (!terrain.height) return null;
    ridge.toggleAttribute('data-simple-snow',phoneLayout.matches);
    // Both ends are underground. A single quadratic Bézier with a centered control point
    // draws a parabola through the noon height, including a rounded crest.
    const horizonY = terrain.top + terrain.height * .73 + sunDiameter / 2;
    const peakY = terrain.bottom * .19;
    const startX = Math.max(0,tabBounds.left / 2 - sunDiameter / 3);
    const endX = viewportWidth - Math.max(0,(viewportWidth - tabBounds.right) / 2 - sunDiameter / 3);
    const curve = `M ${startX} ${horizonY} Q ${(startX + endX) / 2} ${2 * peakY - horizonY} ${endX} ${horizonY}`;
    if (!phoneLayout.matches && sunPath.getAttribute('d') !== curve) {
      sunPath.setAttribute('d',curve);
      sunPathLength = sunPath.getTotalLength();
    }
    const footerBounds = footer.getBoundingClientRect();
    const pane = departmentPane.getBoundingClientRect();
    const snowCards = phoneLayout.matches ? [] :
      [...departmentPane.querySelectorAll('.department-content > .page-section')]
        .filter(card => getComputedStyle(card).backgroundColor.startsWith('rgb('))
        .map(card => card.getBoundingClientRect()).filter(card => card.height > 24 && card.width > 24);
    return {
      snowGaps: {
        left: Math.max(tabBounds.left,...snowCards.map(card => card.left)) + 12,
        right: Math.min(tabBounds.right,...snowCards.map(card => card.right)) - 12,
        cards: snowCards.map(card => ({top: card.top+scrollY+12, bottom: card.bottom+scrollY-12})),
      },
      start: banner.getBoundingClientRect().bottom + scrollY - headerHeight,
      end: document.documentElement.scrollHeight - viewportHeight,
      footerStart: footerBounds.top + scrollY - viewportHeight,
      footerHeight: footerBounds.height,
      dockStart: pane.top + scrollY + headerOverhang - headerHeight,
      dockEnd: pane.bottom + scrollY - compactMenuHeight - headerHeight,
      stillX: tabBounds.left / 2,
      stillY: terrain.top + terrain.height * .24 - sunDiameter / 2,
      cardLeft: tabBounds.left, sunRadius: sunDiameter / 2,
      flightCeiling: headerHeight + compactMenuHeight + 8,
      viewportWidth, viewportHeight: sky.clientHeight, ridgeBottom: terrain.bottom, ridgeTop: terrain.top,
      craneWidth: leadCrane.getBoundingClientRect().width,
    };
  }

  function poseCrane(bird,x,y,wingCycle) {
    // One measured downstroke, then a glide with the wings held open.
    const phase = wingCycle % 1;
    const downstroke = phase < .67 ? Math.sin(Math.PI * phase / .67) ** 2 : 0;
    bird.style.setProperty('--downstroke',downstroke.toFixed(3));
    bird.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`;
  }

  function flyCranes(flight,layout,moving) {
    const opacity = ramp(flight,0,.04) * (1 - ramp(flight,1.8,2.15));
    cranes.style.opacity = opacity.toFixed(3);
    if (!opacity) return;
    const t = moving ? flight : .32;
    const runway = Math.max(1,layout.cardLeft - layout.craneWidth);
    // In a phone-sized gutter the wings already span nearly the whole sky.
    // Ease the last few pixels behind the card after both cranes have passed.
    const exitDistance = Math.max(0,layout.cardLeft - 2 * runway);
    const travel = runway * t + .5 * exitDistance * Math.max(0,t - .7) ** 2;
    const altitude = Math.max(layout.flightCeiling + 28,layout.ridgeTop * .56);
    // The outstretched necks point slightly upward. Let the flock glide along
    // that heading until the cards naturally cover it, even on narrow screens.
    const slope = Math.min(.24,(altitude - layout.flightCeiling) / Math.max(2.15 * runway,1.1 * layout.cardLeft));
    poseCrane(leadCrane,.28 * runway + travel,altitude - slope * travel,moving ? t * 1.6 : 0);
    poseCrane(followingCrane,.035 * runway + .94 * travel,
      altitude + layout.craneWidth * .72 - .86 * slope * travel,moving ? t * 1.72 + .28 : 0);
  }

  function updateWinterScenery(scrollY,layout) {
    const { start,end } = layout;
    const distance = Math.max(0,scrollY - start);
    if (distance === lastSceneDistance) return;
    lastSceneDistance = distance;
    const progress = Math.min(1,distance / Math.max(1,end - start));
    const footerExposure = Math.max(0,(scrollY - layout.footerStart) / layout.footerHeight);
    sky.toggleAttribute('data-footer-sky',footerExposure > 0);
    const moving = !reducedMotion.matches;
    // Leave a stretch of dark sky before sunlight reaches the ridge.
    const dawnDelay = 160;
    const dawnDistance = Math.max(0,distance - dawnDelay);
    const dayTime = Math.min(1,dawnDistance / Math.max(1,end - start - dawnDelay));
    const dawnLead = .052 * ramp(dawnDistance,0,68) * (1 - ramp(dayTime,.020,.105));
    const solarProgress = dayTime + dawnLead;


    const sunTravel = Math.min(1,solarProgress / .87);
    const noon = Math.sin(sunTravel * Math.PI);
    const visibility = ramp(footerExposure,.57,.96).toFixed(3);
    if (constellation.style.getPropertyValue('--chart-visibility') !== visibility) {
      constellation.style.setProperty('--chart-visibility',visibility);
    }
    const flurries = ramp(progress,.22,.42) * (1 - ramp(progress,.74,.91));
    const storm = ramp(progress,.33,.54) * (1 - ramp(progress,.61,.79));
    // Load the desktop depth profile ahead of snowfall. Phones crossfade the same artwork.
    if (!phoneLayout.matches && progress > .12 && !snowProfile.isConnected) {
      snowMask.append(snowProfile);
    }
    const snowCover = ramp(progress,.27,.72);
    if (snowCover !== lastSnowCover) {
      lastSnowCover = snowCover;
      ridge.toggleAttribute('data-snow',snowCover > 0);
      ridge.style.setProperty('--field-snow',snowCover.toFixed(3));
    }
    if (!phoneLayout.matches && snowCover !== lastMaskedCover) {
      lastMaskedCover = snowCover;
      const snowThreshold = 1.06 - .83 * snowCover;
      snowWeight.setAttribute('intercept',(.5 - 12 * snowThreshold).toFixed(3));
    }
    if (!phoneLayout.matches && progress > .09 && progress < .91) prepareSnowfall();
    const drawnSnow = !phoneLayout.matches && !!drawSnowfall?.(layout,scrollY,activeDepartment,distance,moving,flurries,storm);
    sky.toggleAttribute('data-drawn-snow',drawnSnow);
    if (!drawnSnow) {
      flakes.style.opacity = (.72 * flurries).toFixed(4);
      whiteout.toggleAttribute('hidden',storm === 0);
      whiteout.style.opacity = storm.toFixed(3);
      if (flurries > 0) {
        const sway = moving ? Math.sin(distance / 420) * 9 : 0;
        const offset = moving ? distance * .24 % 240 : 0;
        flakes.style.transform = `translate3d(${sway.toFixed(2)}px,${offset.toFixed(2)}px,0)`;
        if (storm > 0) {
          whiteout.style.setProperty('--sky-sway',sway.toFixed(2) + 'px');
          whiteout.style.setProperty('--gust-offset',(moving ? distance * .57 % 256 : 0).toFixed(2) + 'px');
          if (!phoneLayout.matches) whiteout.style.setProperty('--near-offset',(moving ? distance * .82 % 384 : 0).toFixed(2) + 'px');
        }
      }
    }
    // The meadow must be visibly covered before the snowman can take shape.
    const buildCover = moving ? snowCover : Number(snowCover >= .98);
    snowman.style.setProperty('--snow-base', ramp(buildCover,.65,.79).toFixed(3));
    snowman.style.setProperty('--snow-tail', ramp(buildCover,.75,.87).toFixed(3));
    snowman.style.setProperty('--snow-head', ramp(buildCover,.81,.93).toFixed(3));
    snowman.style.setProperty('--snow-finish', ramp(buildCover,.90,.98).toFixed(3));
    // The ground lights come on as the footer clears the snowman's foreground.
    const footlights = moving ? ramp(footerExposure,.12,.82) : Number(footerExposure >= .5);
    snowman.style.setProperty('--footlights',footlights.toFixed(3));
    const newYearGlow = ramp(solarProgress,.027,.056) * (1 - ramp(solarProgress,.085,.21));
    kasumi.style.opacity = newYearGlow.toFixed(3);
    let sunX = layout.stillX, sunY = layout.stillY;
    // Phones convey dawn through the sky color alone.
    let craneFlight = (progress - .10) / .20;
    if (!phoneLayout.matches) {
      sun.style.setProperty('--new-year-glow',newYearGlow.toFixed(3));
      const sunriseAt = dawnDelay + 16;
      const sunsetAt = (end - start) * sunsetProgress;
      const pathProgress = Math.min(1,Math.max(0,(distance - sunriseAt) / Math.max(1,sunsetAt - sunriseAt)));
      const point = sunPath.getPointAtLength(sunPathLength * pathProgress);
      // Start as the last sliver of sun enters the card. At one radius past
      // the shared left edge of the tabs and cards the cranes are fully visible.
      const radiiBehindCard = (point.x - layout.cardLeft) / layout.sunRadius;
      craneFlight = (radiiBehindCard - .6) / 10;
      if (moving) {
        sunX = point.x;
        sunY = point.y;
      }
      sun.style.transform = `translate3d(${sunX.toFixed(3)}px,${sunY.toFixed(3)}px,0) translate(-50%,-50%)`;
      sun.style.opacity = moving ? Number(pathProgress > 0 && pathProgress < 1) :
        ramp(solarProgress,.045,.11) * (1 - ramp(radiiBehindCard,.6,1));
    }
    paintSky(solarProgress,layout,sunX,sunY);
    flyCranes(craneFlight,layout,moving);
    stars.style.opacity = (1 - ramp(solarProgress,.025,.12) + .48 * ramp(progress,.91,1)).toFixed(4);
    const morning = ramp(solarProgress,.018,.16);
    const ridgeLight = .075 + .23 * (1 - morning) + (.555 + .40 * noon) * morning * (1 - .89 * ramp(progress,.88,.985));
    ridge.style.filter = `brightness(${ridgeLight.toFixed(3)}) sepia(${(.10 + .40 * progress ** 3).toFixed(3)})`;
    snowman.style.setProperty('--ridge-light',ridgeLight.toFixed(3));
  }

  let scrollScheduled = false;
  function updateScrollEffects() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (layoutDirty) {
        sceneLayout = measureScenery(scrollY);
        layoutDirty = false;
        lastSceneDistance = -1;
      }
      if (sceneLayout) {
        if (!phoneLayout.matches) {
          departmentHeader.toggleAttribute('data-docked',scrollY >= sceneLayout.dockStart && scrollY <= sceneLayout.dockEnd);
        }
        updateWinterScenery(scrollY,sceneLayout);
      }
      scrollScheduled = false;
    });
  }

  function invalidateSceneryLayout() {
    layoutDirty = true;
    updateScrollEffects();
  }

  tabList.setAttribute('role', 'tablist');
  departmentPane.setAttribute('role', 'tabpanel');
  departmentPane.tabIndex = 0;
  for (const link of choices) {
    link.setAttribute('aria-controls', link.hash.slice(1));
  }
  for (const tab of tabs) {
    const panel = document.getElementById(tab.hash.slice(1));
    tab.id = panel.id + '-tab';
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', departmentPane.id);
  }
  tabList.addEventListener('keydown', event => {
    const index = tabs.indexOf(event.target);
    if (index < 0 || event.altKey || event.ctrlKey || event.metaKey) return;
    let next;
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % tabs.length; break;
      case 'ArrowLeft': next = (index + tabs.length - 1) % tabs.length; break;
      case 'Home': next = 0; break;
      case 'End': next = tabs.length - 1; break;
      case ' ': next = index; break;
      default: return;
    }
    event.preventDefault();
    tabs[next].focus({ preventScroll: true });
    tabs[next].click();
  });

  function showDepartment(department) {
    if (!summaries.has(department)) return;
    const needsMeasurement = activeDepartment !== department || compactMenuHeight === undefined;
    if (department !== activeDepartment) {
      const snowVariant = department === 'web' ? 'snow' : department + '-snow';
      sky.querySelector('.winter-snowpack__surface').setAttribute('href', 'assets/img/winter-department-landscape.svg?drifts#' + snowVariant);
    }
    activeDepartment = department;
    document.body.dataset.activeDepartment = department;
    details.dataset.activeDepartment = department;
    const selected = summaries.get(department);
    departmentPane.setAttribute('aria-labelledby', selected.id + '-tab');
    for (const link of departmentLinks) {
      link.setAttribute('href', '#' + link.dataset.section + '-' + department);
    }

    for (const [key, summary] of summaries) {
      summary.hidden = key !== department;
    }
    for (const section of sections) {
      section.hidden = !section.dataset.departments.split(' ').includes(department);
    }
    for (const link of choices) {
      const isSelected = link.hash === '#' + selected.id;
      if (link.getAttribute('role') === 'tab') {
        link.setAttribute('aria-selected', String(isSelected));
        link.tabIndex = isSelected ? 0 : -1;
      } else if (isSelected) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    }
    if (needsMeasurement) measureNavigation();
    updateScrollEffects();
  }

  function syncLocation(target) {
    const saved = history.state?.contestDepartment;
    let department = location.hash ? saved || activeDepartment : 'web';
    const summary = target?.closest('[data-department-summary]');
    const group = target?.closest('[data-departments]');
    if (summary) {
      department = summary.id.slice('department-'.length);
    } else if (group) {
      const departments = group.dataset.departments.split(' ');
      if (!departments.includes(department)) department = departments[0];
    }

    showDepartment(department);
    if (saved !== activeDepartment) {
      history.replaceState({ ...history.state, contestDepartment: activeDepartment }, '');
    }
    if (summary && history.state?.atDepartmentPicker) return departmentPicker;
    // A department's rules link opens the full list, including shared rules at its start.
    return target?.id === 'rule-' + department ? document.getElementById('rules') : target;
  }

  function followLocation(alignFragment = false) {
    const target = document.getElementById(location.hash.slice(1));
    const wasHidden = target?.closest('[hidden]');
    const destination = syncLocation(target);
    if ((alignFragment && target) ||
        destination !== target || (wasHidden && !target.closest('[hidden]'))) {
      requestAnimationFrame(() => destination.scrollIntoView({ block: 'start', behavior: alignFragment ? 'instant' : 'auto' }));
    }
  }

  // Store the department with the navigation so reloading a shared section
  // (such as the judges) also restores the selection for this history entry.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;

    event.preventDefault();
    const picksDepartment = link.hasAttribute('data-department-choice');
    const fromHeader = picksDepartment && !tabList.contains(link);
    if (picksDepartment) {
      showDepartment(link.hash.slice('#department-'.length));
    }
    if (location.hash !== link.hash) {
      history.pushState({ contestDepartment: activeDepartment, atDepartmentPicker: fromHeader }, '', link.hash);
    } else if (picksDepartment && Boolean(history.state?.atDepartmentPicker) !== fromHeader) {
      history.replaceState({ ...history.state, atDepartmentPicker: fromHeader }, '');
    }
    if (picksDepartment) {
      if (fromHeader) {
        document.getElementById(target.id + '-tab').focus({ preventScroll: true });
        departmentPicker.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      return;
    }
    const destination = syncLocation(target);
    if (!destination.hasAttribute('tabindex')) destination.tabIndex = -1;
    destination.focus({ preventScroll: true });
    destination.scrollIntoView({ block: 'start' });
  });

  function measureNavigation() {
    const style = document.documentElement.style;
    style.setProperty('--site-header-height', header.offsetHeight + 'px');
    const wasDocked = departmentHeader.hasAttribute('data-docked');
    departmentHeader.removeAttribute('data-docked');
    compactMenuHeight = 0;
    headerOverhang = 0;
    if (!phoneLayout.matches) {
      const introHeight = departmentHeader.getBoundingClientRect().height;
      departmentHeader.setAttribute('data-docked','');
      compactMenuHeight = departmentHeader.getBoundingClientRect().height;
      headerOverhang = introHeight - compactMenuHeight;
      departmentHeader.toggleAttribute('data-docked',wasDocked);
    }
    style.setProperty('--department-menu-height', compactMenuHeight + 'px');
    departmentPane.style.setProperty('--department-header-overhang', headerOverhang + 'px');
    invalidateSceneryLayout();
  }

  async function showLoadingProgress() {
    const root = document.documentElement;
    if (!root.hasAttribute('data-page-loading')) return;
    const loader = document.querySelector('.page-loader');
    const bar = loader.querySelector('progress');
    const counter = loader.querySelector('[data-load-progress]');
    const status = loader.querySelector('[role="status"]');
    const resources = new Map();
    const anchor = document.getElementById(location.hash.slice(1));
    const openingSection = anchor?.closest('.page-section');

    // Let <picture> select the correct file for this display. Deep links also need
    // the selected section's images before the browser adjusts its scroll position.
    for (const img of document.images) {
      if (img.closest('[hidden]')) continue;
      if (img.loading === 'lazy') {
        const rect = img.getBoundingClientRect();
        if (!rect.width || (!openingSection?.contains(img) && (rect.top >= innerHeight || rect.bottom <= 0))) continue;
        img.loading = 'eager';
      }
      const url = img.currentSrc || img.src;
      if (url && !resources.has(url)) resources.set(url,img.decode());
    }

    function preloadImage(url) {
      const absolute = new URL(url,document.baseURI).href;
      if (resources.has(absolute)) return;
      const image = new Image();
      image.src = absolute;
      resources.set(absolute,image.decode());
    }

    // Include scenery that would otherwise first load halfway through scrolling.
    const layers = [stars,kasumi,ridge,flakes,snowman.querySelector('.winter-snowman__footlights')];
    const backgrounds = layers.map(layer => getComputedStyle(layer).backgroundImage);
    backgrounds.push(getComputedStyle(whiteout,'::before').backgroundImage);
    for (const background of backgrounds) {
      for (const [,url] of background.matchAll(/url\("([^"]+)"\)/g)) preloadImage(url);
    }
    if (!phoneLayout.matches) preloadImage(snowProfile.getAttribute('href'));

    const tasks = [
      ...resources.values(),
      document.fonts.load('400 1em "Noto Sans JP"','応募'),
      document.fonts.load('700 1em "Zen Maru Gothic"','プログラミングコンテスト'),
      document.fonts.ready,
      document.readyState === 'complete' ? Promise.resolve() :
        new Promise(resolve => window.addEventListener('load',resolve,{once:true})),
    ];
    let completed = 0;
    let failed = false;
    await Promise.all(tasks.map(async task => {
      try {
        await task;
      } catch {
        failed = true;
      }
      const value = Math.floor(++completed / tasks.length * 100);
      bar.value = value;
      counter.textContent = value + '%';
    }));
    status.textContent = failed ? '読み込めた内容で開きます' : '読み込み完了';
    // Give the 100% state a painted frame, including on a warm cache.
    requestAnimationFrame(() => setTimeout(() => root.removeAttribute('data-page-loading'),260));
  }
  if ('ResizeObserver' in window) {
    const navigationObserver = new ResizeObserver(measureNavigation);
    navigationObserver.observe(header);
  }
  followLocation();
  document.fonts.ready.then(measureNavigation);
  window.addEventListener('hashchange', () => followLocation());
  window.addEventListener('pageshow', event => {
    if (event.persisted) return;
    // Native fragment jumps can precede the final font and department menu measurements.
    document.fonts.ready.then(() => followLocation(true));
  });
  window.addEventListener('scroll', updateScrollEffects, { passive: true });
  window.addEventListener('resize', measureNavigation);
  phoneLayout.addEventListener('change', measureNavigation);
  colorCanvas.addEventListener('contextlost', () => { colorCanvas.hidden = true; });
  colorCanvas.addEventListener('contextrestored',invalidateSceneryLayout);
  reducedMotion.addEventListener('change', invalidateSceneryLayout);
  if ('ResizeObserver' in window) new ResizeObserver(invalidateSceneryLayout).observe(document.body);
  updateScrollEffects();
  requestAnimationFrame(() => showLoadingProgress().catch(() => {
    document.documentElement.removeAttribute('data-page-loading');
  }));
})();
