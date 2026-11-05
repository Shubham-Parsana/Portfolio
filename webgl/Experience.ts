import { WebGLRenderer, Scene, Camera, Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three';
import { gsap } from 'gsap';
import vert from './shaders/dither.vert.glsl';
import frag from './shaders/dither.frag.glsl';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * One renderer, one RAF (gsap.ticker). Perf: renders at half resolution while the dither cells are big (canvas is upscaled
 * with image-rendering: pixelated), switches to 1x as cells shrink, and stops rendering entirely once scrolled past the hero.
 */
export class Experience {
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new Camera();
  private geo = new PlaneGeometry(2, 2);
  private mat: ShaderMaterial;
  private ratio = 0.5;
  private progress = 0;
  private op = -1;
  private mouse = new Vector2(-9999, -9999);   // CSS px, origin bottom-left
  private mouseT = new Vector2(-9999, -9999);
  private mouseBuf = new Vector2(-9999, -9999); // drawing-buffer px

  constructor(private canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
    this.mat = new ShaderMaterial({
      vertexShader: vert, fragmentShader: frag,
      uniforms: { uRes: { value: new Vector2() }, uMouse: { value: this.mouseBuf }, uProgress: { value: 0 }, uTime: { value: 0 }, uDpr: { value: 1 } },
    });
    const mesh = new Mesh(this.geo, this.mat);
    mesh.frustumCulled = false;
    this.scene.add(mesh);
    this.setRatio(this.ratio);
    window.addEventListener('resize', this.resize);
    window.addEventListener('pointermove', this.onMove, { passive: true });
    gsap.ticker.add(this.tick);
  }

  private setRatio(r: number) {
    this.ratio = r;
    this.renderer.setPixelRatio(r);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    (this.mat.uniforms.uRes.value as Vector2).set(window.innerWidth * r, window.innerHeight * r);
    this.mat.uniforms.uDpr.value = r;
  }
  private resize = () => this.setRatio(this.ratio);

  private onMove = (e: PointerEvent) => {
    this.mouseT.set(e.clientX, window.innerHeight - e.clientY);
    if (this.mouse.x < -999) this.mouse.copy(this.mouseT);
  };

  private tick = (time: number) => {
    if (document.hidden) return;
    const h = window.innerHeight, y = window.scrollY;
    const op = clamp(1 - (y - h * 0.6) / (h * 0.5));
    if (op !== this.op) { this.canvas.style.opacity = String(op); this.op = op; }
    if (op <= 0) return; // scrolled past the hero: no GPU work at all

    this.progress += (clamp(y / (h * 0.6)) - this.progress) * 0.12;
    const want = this.ratio === 0.5 ? (this.progress > 0.55 ? 1 : 0.5) : (this.progress < 0.45 ? 0.5 : 1);
    if (want !== this.ratio) this.setRatio(want);

    this.mouse.lerp(this.mouseT, 0.15);
    this.mouseBuf.copy(this.mouse).multiplyScalar(this.ratio);
    this.mat.uniforms.uProgress.value = this.progress;
    this.mat.uniforms.uTime.value = time;
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    gsap.ticker.remove(this.tick);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('pointermove', this.onMove);
    this.geo.dispose(); this.mat.dispose(); this.renderer.dispose();
  }
}
