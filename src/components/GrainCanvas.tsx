import { useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform float uClick;
uniform float uClickAge;
uniform vec2 uClickPos;
uniform float uIntensity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 2; i++) {
    value += amp * noise(p);
    p *= 2.03;
    amp *= 0.5;
  }
  return value;
}

void main() {
  vec2 aspect = vec2(uRes.x / max(uRes.y, 1.0), 1.0);
  vec2 p = (vUv - 0.5) * aspect;

  vec2 pv = (uPointer - 0.5) * aspect;
  float distPointer = distance(p, pv);
  float warp = uPointerStrength * exp(-distPointer * 4.5) * 0.16;
  p += normalize(p - pv + 1e-5) * warp;

  float ring = 0.0;
  if (uClick > 0.001) {
    vec2 cv = (uClickPos - 0.5) * aspect;
    float distClick = distance(p, cv);
    float radius = uClickAge * 1.15;
    ring = uClick * exp(-pow((distClick - radius) * 5.0, 2.0));
    p += normalize(p - cv + 1e-5) * ring * 0.085;
  }

  float t = uTime * 0.045;
  float field = fbm(p * 2.4 + vec2(t, -t * 0.7));

  float grain = fract(field * 21.0 + uTime * 2.6);
  float speck = step(0.93, grain) * (0.3 + 0.7 * field);

  vec3 base = vec3(0.0588);
  vec3 ink = vec3(0.0);
  vec3 paper = vec3(0.96);
  vec3 signal = vec3(1.0, 0.169, 0.169);
  vec3 acid = vec3(0.831, 1.0, 0.0);

  vec3 col = base;
  col = mix(col, ink, smoothstep(0.32, 0.78, field) * 0.6);
  col += paper * speck * 0.17 * uIntensity;

  float fleck = step(0.9965, fract(grain * 7.13 + field));
  col = mix(col, mix(signal, acid, step(0.5, fract(field * 11.0))), fleck * 0.75);

  vec2 centred = (vUv - 0.5) * vec2(aspect.x, 1.0) * 1.5;
  col *= mix(0.5, 1.0, smoothstep(1.35, 0.15, length(centred)));

  col += signal * exp(-distPointer * 7.0) * uPointerStrength * 0.09;
  col += vec3(1.0) * ring * 0.3;

  col += (hash(gl_FragCoord.xy + uTime) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
  className?: string;
  intensity?: number;
};

/**
 * Quality ladder for the grain field. A software rasteriser (headless Chrome,
 * some VMs, browsers with GPU acceleration disabled) cannot afford the full
 * shader at 60fps, so we render fewer pixels instead of dropping frames.
 * Step 0 is the reference quality; step 3 is the CSS-grain fallback.
 */
const QUALITY_SCALES = [0.5, 0.35, 0.25, 0] as const;

function isSoftwareRenderer(gl: WebGLRenderingContext) {
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  if (!info) return false;
  const renderer = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL) ?? '');
  return /swiftshader|software|llvmpipe|basic render|mesa offscreen/i.test(renderer);
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Interactive grain field rendered on the GPU. Reacts to pointer position and
 * emits a shockwave ring on click. Falls back to a CSS grain layer when WebGL
 * is unavailable, and renders a single static frame under reduced motion.
 */
export default function GrainCanvas({ className = '', intensity = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (fallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    }) ?? canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) {
      canvas.dataset.webgl = 'unsupported';
      return;
    }

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vert || !frag || !program) return;

    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(program, 'uRes'),
      time: gl.getUniformLocation(program, 'uTime'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      pointerStrength: gl.getUniformLocation(program, 'uPointerStrength'),
      click: gl.getUniformLocation(program, 'uClick'),
      clickAge: gl.getUniformLocation(program, 'uClickAge'),
      clickPos: gl.getUniformLocation(program, 'uClickPos'),
      intensity: gl.getUniformLocation(program, 'uIntensity'),
    };

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, strength: 0, targetStrength: 0 };
    const click = { power: 0, age: 0, x: 0.5, y: 0.5 };
    // Film runs at 24fps and grain should feel like film, not like a monitor.
    // Capping the shader at ~30fps also keeps the main thread free for scroll
    // and hover work, which is what the user actually perceives as smooth.
    const FRAME_MS = 1000 / 30;
    let raf = 0;
    let visible = true;
    let lastDraw = 0;

    let quality = isSoftwareRenderer(gl) ? 1 : 0;
    let frameSamples = 0;
    let frameTotal = 0;

    const resize = () => {
      const scale = QUALITY_SCALES[quality];
      const dpr = Math.min(window.devicePixelRatio || 1, 1) * scale;
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(u.res, width, height);
    };

    const draw = (time: number, dt: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.07;
      pointer.y += (pointer.ty - pointer.y) * 0.07;
      pointer.strength += (pointer.targetStrength - pointer.strength) * 0.06;
      click.power *= 0.955 ** (dt * 60);
      click.age += dt;

      gl.uniform1f(u.time, time / 1000);
      gl.uniform2f(u.pointer, pointer.x, pointer.y);
      gl.uniform1f(u.pointerStrength, pointer.strength);
      gl.uniform1f(u.click, click.power);
      gl.uniform1f(u.clickAge, click.age);
      gl.uniform2f(u.clickPos, click.x, click.y);
      gl.uniform1f(u.intensity, intensity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (time: number) => {
      raf = window.requestAnimationFrame(loop);
      const dt = lastDraw ? Math.min((time - lastDraw) / 1000, 0.1) : 1 / 30;
      if (time - lastDraw < FRAME_MS) return;
      lastDraw = time;

      const frameStart = performance.now();
      draw(time, dt);

      // Measure the real cost of a frame and shed pixels if the hardware cannot
      // keep up. Frame time, not frame rate, is the honest signal here.
      frameTotal += performance.now() - frameStart;
      frameSamples += 1;
      if (frameSamples >= 20) {
        const average = frameTotal / frameSamples;
        frameSamples = 0;
        frameTotal = 0;
        if (average > 12 && quality < QUALITY_SCALES.length - 1) {
          quality += 1;
          if (quality === QUALITY_SCALES.length - 1) {
            window.cancelAnimationFrame(raf);
            setFallback(true);
            return;
          }
          resize();
        }
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (event.clientX - rect.left) / Math.max(rect.width, 1);
      pointer.ty = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1);
      pointer.targetStrength = 1;
    };

    const onPointerLeave = () => {
      pointer.targetStrength = 0;
    };

    const onPointerDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      click.x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      click.y = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1);
      click.power = 1;
      click.age = 0;
      lastDraw = 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    if (reducedMotion) {
      draw(performance.now(), 1 / 30);
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerdown', onPointerDown, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave, { passive: true });

      const io = new IntersectionObserver(
        ([entry]) => {
          const next = entry.isIntersecting;
          if (next === visible) return;
          visible = next;
          if (visible) {
            lastDraw = 0;
            raf = window.requestAnimationFrame(loop);
          } else {
            window.cancelAnimationFrame(raf);
          }
        },
        { threshold: 0.01 },
      );
      io.observe(canvas);

      const onVisibility = () => {
        if (document.hidden) {
          window.cancelAnimationFrame(raf);
        } else if (visible) {
          lastDraw = 0;
          raf = window.requestAnimationFrame(loop);
        }
      };
      document.addEventListener('visibilitychange', onVisibility);
      raf = window.requestAnimationFrame(loop);

      return () => {
        window.cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        io.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointerleave', onPointerLeave);
        gl.deleteProgram(program);
        gl.deleteShader(vert);
        gl.deleteShader(frag);
        gl.deleteBuffer(buffer);
      };
    }

    return () => {
      resizeObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buffer);
    };
  }, [fallback, intensity, reducedMotion]);

  return (
    <>
      {!fallback && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
        />
      )}
      {fallback && (
        <div
          aria-hidden="true"
          className={`grain-overlay pointer-events-none absolute inset-0 h-full w-full opacity-40 ${className}`}
        />
      )}
    </>
  );
}
