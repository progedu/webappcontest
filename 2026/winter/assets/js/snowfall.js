// Composite the original snow tiles in one pass. CSS supplies the same scene
// while textures are loading or when a graphics context is unavailable.
window.createWinterSnowfall = function (canvas, whiteout, flakes, redraw) {
  let gl;
  try {
    gl = canvas.getContext('webgl', {
      alpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power',
    });
  } catch {
    return null;
  }
  if (!gl) return null;

  const vertex = `
    attribute vec2 position;
    void main() { gl_Position = vec4(position,0.0,1.0); }`;
  const fragment = `
    precision highp float;
    uniform vec2 viewport, bufferSize, density;
    uniform vec4 motion;
    uniform sampler2D gust, crystals;
    vec4 over(vec4 under, vec4 top) { return top + under * (1.0 - top.a); }
    void main() {
      vec2 p = vec2(gl_FragCoord.x, bufferSize.y - gl_FragCoord.y) * viewport / bufferSize;
      vec2 direction = vec2(.258819,.965926);
      float t = dot(p,direction) / dot(viewport,direction);
      vec4 haze = t < .58
        ? vec4(.631,.749,.808,.22*(1.0-t/.58))
        : vec4(.933,.969,1.0,.322*(t-.58)/.42);
      vec4 snow = vec4(haze.rgb*haze.a,haze.a);
      snow = over(snow, texture2D(gust,fract((p-vec2(motion.x-18.0,motion.y))/256.0)));
      snow = over(snow, .82*texture2D(gust,fract((p-vec2(89.0-motion.x,61.0+motion.z))/384.0)));
      float x = (p.x+16.0-motion.x)/(viewport.x+32.0);
      float mask = mix(1.0/15.0,1.0,clamp(max(.25-x,x-.75)*4.0,0.0,1.0));
      vec2 fineUV = (p-vec2(motion.x-16.0,motion.w))/vec2(300.0,240.0);
      gl_FragColor = over(snow*density.x, texture2D(crystals,fract(fineUV))*density.y*mask);
    }`;

  let state;
  let department;
  let crystalURL;

  function setup() {
    const program = gl.createProgram();
    for (const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader,source);
      gl.compileShader(shader);
      gl.attachShader(program,shader);
      gl.deleteShader(shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program,gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program,'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
    gl.uniform1i(gl.getUniformLocation(program,'gust'),0);
    gl.uniform1i(gl.getUniformLocation(program,'crystals'),1);
    state = {
      textures: new Map(),
      motion: gl.getUniformLocation(program,'motion'),
      density: gl.getUniformLocation(program,'density'),
      viewport: gl.getUniformLocation(program,'viewport'),
      bufferSize: gl.getUniformLocation(program,'bufferSize'),
    };
  }

  function texture(url) {
    const context = state;
    if (context.textures.has(url)) return context.textures.get(url);
    context.textures.set(url,null);
    const image = new Image();
    image.onload = () => {
      if (state !== context || gl.isContextLost()) return;
      const tile = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D,tile);
      for (const wrap of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T]) gl.texParameteri(gl.TEXTURE_2D,wrap,gl.CLAMP_TO_EDGE);
      for (const filter of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER]) gl.texParameteri(gl.TEXTURE_2D,filter,gl.LINEAR);
      // Local files and privacy settings may prevent an image becoming a GL
      // texture even though the same image is already visible through CSS.
      try {
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
      } catch {
        gl.deleteTexture(tile);
        return;
      }
      if (gl.getError() !== gl.NO_ERROR) {
        gl.deleteTexture(tile);
        return;
      }
      context.textures.set(url,tile);
      redraw();
    };
    image.src = url;
    return null;
  }

  canvas.addEventListener('webglcontextlost',event => {
    event.preventDefault();
    state = null;
    redraw();
  });
  canvas.addEventListener('webglcontextrestored',() => { setup(); redraw(); });
  setup();
  const imageURL = (node,pseudo) => getComputedStyle(node,pseudo).backgroundImage.slice(5,-2);
  const gustURL = imageURL(whiteout,'::before');

  return function draw(layout, scrollY, section, distance, moving, flurries, storm) {
    if (!state || !flurries) return false;
    if (section !== department) {
      department = section;
      crystalURL = imageURL(flakes);
    }
    const gust = texture(gustURL);
    const crystals = texture(crystalURL);
    if (!gust || !crystals) return false;
    const w = layout.viewportWidth, h = layout.viewportHeight;
    const scale = Math.min(1,768 / Math.max(w,h));
    const width = Math.round(w*scale), height = Math.round(h*scale);
    if (width !== canvas.width || height !== canvas.height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0,0,width,height);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,gust);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D,crystals);
    gl.uniform2f(state.viewport,w,h);
    gl.uniform2f(state.bufferSize,width,height);
    gl.uniform2f(state.density,storm,.72*flurries);
    gl.uniform4f(state.motion,moving ? Math.sin(distance/420)*9 : 0, moving ? distance*.57%256 : 0,
      moving ? distance*.82%384 : 0, moving ? distance*.24%240 : 0);

    // Keep the rounded card edges, gutters, and gaps. Their geometry is cached
    // when page layout changes. No DOM measurement is needed while scrolling.
    const rect = (left,top,right,bottom) => {
      const x = Math.floor(left*width/w), y = Math.floor((h-bottom)*height/h);
      const rw = Math.ceil(right*width/w)-x, rh = Math.ceil((h-top)*height/h)-y;
      if (rw <= 0 || rh <= 0) return;
      gl.scissor(x,y,rw,rh);
      gl.drawArrays(gl.TRIANGLES,0,3);
    };
    const {left,right,cards} = layout.snowGaps;
    gl.enable(gl.SCISSOR_TEST);
    rect(0,0,left,h);
    rect(right,0,w,h);
    let cursor = 0;
    for (const card of cards) {
      if (card.bottom <= scrollY) continue;
      if (card.top >= scrollY+h) break;
      rect(left,cursor,right,Math.max(0,card.top-scrollY));
      cursor = Math.min(h,card.bottom-scrollY);
    }
    rect(left,cursor,right,h);
    gl.disable(gl.SCISSOR_TEST);
    return true;
  };
};
