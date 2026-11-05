uniform vec2 uRes;      // drawing-buffer px
uniform vec2 uMouse;    // drawing-buffer px, origin bottom-left
uniform float uProgress, uTime, uDpr;

const vec3 INK = vec3(0.039, 0.039, 0.043);
const vec3 BONE = vec3(0.914, 0.902, 0.875);
const vec3 SIGNAL = vec3(1.0, 0.42, 0.173);
const vec3 PHOS = vec3(0.91, 0.64, 0.72);

float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }
float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 3; i++) { v += a * vn(p); p *= 2.03; a *= 0.5; } return v; }
float band(vec2 q, float c, float amp, float k, float ph, float w) { return exp(-abs(q.y - (c + amp * sin(q.x * k + ph))) / w); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  float ca = uRes.x / uRes.y;
  float px = mix(8.0, 2.0, uProgress) * uDpr;           // cell size: 8px -> 1px
  vec2 cell = floor(frag / px);
  vec2 uv = (cell + 0.5) * px / uRes;

  float slot = floor(uTime * 4.0);                       // occasional glitch band
  float gb = step(0.92, hash(slot)) * step(abs(uv.y - hash(slot + 3.0)), 0.025);
  uv.x += gb * (hash(slot + 7.0) - 0.5) * 0.08;

  float d = distance(frag, uMouse), r = 150.0 * uDpr;     // cursor lens: noise-free
  float lens = 1.0 - smoothstep(r - 2.0 * uDpr, r, d);
  float ring = smoothstep(r - 2.0 * uDpr, r, d) * (1.0 - smoothstep(r, r + 2.0 * uDpr, d));

  float noiseAmt = (1.0 - uProgress) * (1.0 - lens);     // scroll (and the lens) turns noise into signal
  float n = 0.5;
  if (noiseAmt > 0.002) n = fbm(vec2(uv.x * ca, uv.y) * 7.0 + vec2(uTime * 0.05, -uTime * 0.12));
  vec2 q = uv; q.y += (n - 0.5) * noiseAmt * 0.35;       // noise bends the signal

  float t = bayer8(cell);
  float nbit = step(t, smoothstep(0.35, 0.85, n) * noiseAmt * 0.9);
  float main = step(t, band(q, 0.52, 0.12, 5.2, uTime * 0.6, 0.012) * 1.1);
  float ghost = step(t, band(q, 0.44, 0.12, 5.2, uTime * 0.6 + 0.9, 0.008) * 0.9);

  float vis = mix(mix(0.5, 1.0, smoothstep(0.15, 0.75, uv.x)), 1.0, lens); // keep the left (text) side calm
  vec3 col = INK;
  col = mix(col, BONE, 0.14 * nbit * vis);
  col = mix(col, BONE, 0.35 * ghost * vis);
  col = mix(col, SIGNAL, 0.9 * main * vis);
  col = mix(col, SIGNAL, ring * 0.9);
  col += PHOS * gb * 0.1;
  col *= 1.0 - 0.02 * (1.0 + sin(frag.y / uDpr * 1.5 + uTime * 18.0));
  gl_FragColor = vec4(col, 1.0);
}
