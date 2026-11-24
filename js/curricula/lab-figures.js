/**
 * Textbook-style lab schematics for the Experiment track.
 * Original SVG line drawings only — no scanned textbook / workbook pages.
 */

const PAPER = '#fffdf8';
const INK = '#1c1c1c';
const MUTED = '#5e584e';
const RAY = '#c4491d';
const RAY2 = '#1d4e89';
const OK = '#2a6b3a';

function svg(inner, vb = '0 0 320 140') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="100%" height="auto">${inner}</svg>`;
}
function frame(h = 140) {
  return `<rect x="0" y="0" width="320" height="${h}" fill="${PAPER}"/>`;
}
function L(lang, zh, en) {
  return lang === 'zh' ? zh : en;
}
function title(lang, zh, en) {
  return `<text x="160" y="20" fill="${INK}" font-size="12" text-anchor="middle">${L(lang, zh, en)}</text>`;
}

function opticsBench(lang, opts = {}) {
  const y = 78;
  const cx = opts.cx ?? 160;
  const u = opts.u ?? 90;
  const screen = opts.screen;
  const virtual = opts.virtual;
  const noImage = opts.noImage;
  const caption = opts.caption || '';
  let img = '';
  if (noImage) {
    img = `<text x="250" y="${y - 36}" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '无清晰实像', 'no sharp real image')}</text>`;
  } else if (virtual && screen != null) {
    img = `<line x1="${screen}" y1="${y}" x2="${screen}" y2="${y - 22}" stroke="${RAY2}" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="${screen}" y="${y + 36}" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '虚像', 'virtual')}</text>`;
  } else if (screen != null) {
    img = `<line x1="${screen}" y1="${y - 32}" x2="${screen}" y2="${y + 32}" stroke="${OK}" stroke-width="3"/>
      <line x1="${screen}" y1="${y}" x2="${screen}" y2="${y + 22}" stroke="${RAY}" stroke-width="2.5"/>
      <text x="${screen}" y="${y + 48}" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '光屏', 'Screen')}</text>`;
  }
  return `${frame()}
    ${caption ? title(lang, caption, caption) : ''}
    <line x1="16" y1="${y}" x2="304" y2="${y}" stroke="${MUTED}" stroke-width="1"/>
    <path d="M${cx} ${y - 36} Q${cx + 14} ${y} ${cx} ${y + 36} Q${cx - 14} ${y} ${cx} ${y - 36}" fill="none" stroke="${INK}" stroke-width="2"/>
    <line x1="${cx + 40}" y1="${y - 8}" x2="${cx + 40}" y2="${y + 8}" stroke="${INK}" stroke-width="2"/>
    <line x1="${cx - 40}" y1="${y - 8}" x2="${cx - 40}" y2="${y + 8}" stroke="${INK}" stroke-width="2"/>
    <text x="${cx + 40}" y="${y + 22}" fill="${MUTED}" font-size="11" text-anchor="middle">F</text>
    <text x="${cx - 40}" y="${y + 22}" fill="${MUTED}" font-size="11" text-anchor="middle">F</text>
    <line x1="${u}" y1="${y}" x2="${u}" y2="${y - 26}" stroke="${RAY}" stroke-width="2.5"/>
    <text x="${u}" y="${y + 36}" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '物', 'Obj')}</text>
    ${img}`;
}

function mirrorSketch(lang, plane = true) {
  const y = 70;
  return `${frame()}
    ${title(lang, plane ? '平面镜成像' : '反射定律', plane ? 'Plane-mirror image' : 'Law of reflection')}
    <line x1="160" y1="28" x2="160" y2="118" stroke="${INK}" stroke-width="2"/>
    <line x1="40" y1="${y}" x2="160" y2="${y}" stroke="${RAY}" stroke-width="2"/>
    <line x1="160" y1="${y}" x2="260" y2="${y - 28}" stroke="${RAY}" stroke-width="2"/>
    ${plane ? `<line x1="160" y1="${y}" x2="260" y2="${y}" stroke="${RAY2}" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="80" y="${y + 28}" fill="${MUTED}" font-size="11">${L(lang, '物', 'Obj')}</text>
      <text x="250" y="${y + 28}" fill="${MUTED}" font-size="11">${L(lang, "像", 'Img')}</text>` : ''}
    <text x="168" y="40" fill="${MUTED}" font-size="11">${L(lang, '镜面', 'Mirror')}</text>`;
}

function snellSketch(lang) {
  return `${frame()}
    ${title(lang, '折射定律 n₁sinθ₁ = n₂sinθ₂', 'Snell: n1 sin θ1 = n2 sin θ2')}
    <line x1="20" y1="70" x2="300" y2="70" stroke="${MUTED}" stroke-width="1.5"/>
    <line x1="160" y1="24" x2="160" y2="120" stroke="${MUTED}" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="90" y1="30" x2="160" y2="70" stroke="${RAY}" stroke-width="2.5"/>
    <line x1="160" y1="70" x2="230" y2="115" stroke="${RAY2}" stroke-width="2.5"/>
    <text x="100" y="48" fill="${MUTED}" font-size="11">θ1</text>
    <text x="200" y="100" fill="${MUTED}" font-size="11">θ2</text>
    <text x="50" y="60" fill="${MUTED}" font-size="11">n1</text>
    <text x="50" y="95" fill="${MUTED}" font-size="11">n2</text>`;
}

function leverSketch(lang) {
  return `${frame()}
    ${title(lang, '杠杆平衡 F₁L₁ = F₂L₂', 'Lever: F1 L1 = F2 L2')}
    <polygon points="160,100 148,118 172,118" fill="${INK}"/>
    <line x1="50" y1="78" x2="270" y2="78" stroke="${INK}" stroke-width="3"/>
    <line x1="80" y1="78" x2="80" y2="48" stroke="${RAY}" stroke-width="2.5"/>
    <line x1="240" y1="78" x2="240" y2="48" stroke="${RAY2}" stroke-width="2.5"/>
    <text x="80" y="40" fill="${MUTED}" font-size="11" text-anchor="middle">F1</text>
    <text x="240" y="40" fill="${MUTED}" font-size="11" text-anchor="middle">F2</text>
    <text x="110" y="98" fill="${MUTED}" font-size="11">L1</text>
    <text x="200" y="98" fill="${MUTED}" font-size="11">L2</text>`;
}

function pulleySketch(lang) {
  return `${frame()}
    ${title(lang, '滑轮组 F = (G+Gp)/n', 'Pulley: F = (G+Gp)/n')}
    <circle cx="160" cy="48" r="16" fill="none" stroke="${INK}" stroke-width="2"/>
    <circle cx="160" cy="78" r="16" fill="none" stroke="${INK}" stroke-width="2"/>
    <line x1="144" y1="48" x2="144" y2="110" stroke="${RAY}" stroke-width="2"/>
    <line x1="176" y1="48" x2="176" y2="78" stroke="${RAY}" stroke-width="2"/>
    <line x1="176" y1="48" x2="220" y2="48" stroke="${RAY}" stroke-width="2"/>
    <line x1="220" y1="48" x2="220" y2="100" stroke="${RAY}" stroke-width="2"/>
    <rect x="140" y="110" width="40" height="14" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <text x="160" y="134" fill="${MUTED}" font-size="11" text-anchor="middle">G</text>
    <text x="232" y="80" fill="${MUTED}" font-size="11">F</text>`;
}

function circuitSketch(lang) {
  return `${frame()}
    ${title(lang, '串 / 并联电路示意', 'Series / parallel sketch')}
    <rect x="40" y="48" width="18" height="28" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <text x="49" y="66" fill="${MUTED}" font-size="10" text-anchor="middle">E</text>
    <line x1="58" y1="62" x2="100" y2="62" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="112" cy="62" r="10" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <text x="112" y="66" fill="${MUTED}" font-size="10" text-anchor="middle">A</text>
    <line x1="122" y1="62" x2="160" y2="62" stroke="${INK}" stroke-width="1.5"/>
    <rect x="160" y="52" width="36" height="20" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <text x="178" y="66" fill="${MUTED}" font-size="10" text-anchor="middle">R</text>
    <line x1="196" y1="62" x2="260" y2="62" stroke="${INK}" stroke-width="1.5"/>
    <line x1="260" y1="62" x2="260" y2="100" stroke="${INK}" stroke-width="1.5"/>
    <line x1="260" y1="100" x2="49" y2="100" stroke="${INK}" stroke-width="1.5"/>
    <line x1="49" y1="100" x2="49" y2="76" stroke="${INK}" stroke-width="1.5"/>
    <text x="160" y="122" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '测电流与电压', 'Measure I and U')}</text>`;
}

function densityLabSketch(lang) {
  return `${frame()}
    ${title(lang, '量筒测体积 · ρ = m/V', 'Cylinder volume · ρ = m/V')}
    <rect x="70" y="40" width="50" height="80" fill="none" stroke="${INK}" stroke-width="2"/>
    <line x1="72" y1="70" x2="118" y2="70" stroke="${RAY2}" stroke-width="2"/>
    <text x="95" y="64" fill="${MUTED}" font-size="10" text-anchor="middle">V1</text>
    <line x1="72" y1="95" x2="118" y2="95" stroke="${RAY}" stroke-width="2"/>
    <text x="95" y="112" fill="${MUTED}" font-size="10" text-anchor="middle">V2</text>
    <rect x="180" y="70" width="70" height="40" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <text x="215" y="94" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '天平 m', 'Balance m')}</text>`;
}

function springSketch(lang) {
  return `${frame()}
    ${title(lang, '弹簧测力计 F = kx', 'Spring scale F = kx')}
    <line x1="160" y1="28" x2="160" y2="44" stroke="${INK}" stroke-width="2"/>
    <path d="M150 44 h20 l-8 8 h16 l-8 8 h16 l-8 8 h16 l-8 8 h16" fill="none" stroke="${INK}" stroke-width="2"/>
    <line x1="160" y1="92" x2="160" y2="110" stroke="${RAY}" stroke-width="2"/>
    <circle cx="160" cy="118" r="8" fill="none" stroke="${RAY}" stroke-width="2"/>
    <text x="190" y="70" fill="${MUTED}" font-size="11">x</text>
    <text x="190" y="118" fill="${MUTED}" font-size="11">F</text>`;
}

function pressureSketch(lang, liquid = false) {
  return `${frame()}
    ${title(lang, liquid ? '液体压强 p = ρgh' : '固体压强 p = F/A', liquid ? 'Liquid p = ρgh' : 'Solid p = F/A')}
    ${liquid
    ? `<rect x="100" y="40" width="120" height="80" fill="none" stroke="${INK}" stroke-width="2"/>
       <rect x="102" y="70" width="116" height="48" fill="${RAY2}" opacity="0.15"/>
       <line x1="100" y1="70" x2="220" y2="70" stroke="${RAY2}" stroke-width="1.5"/>
       <text x="160" y="64" fill="${MUTED}" font-size="11" text-anchor="middle">h</text>`
    : `<rect x="110" y="50" width="100" height="50" fill="none" stroke="${INK}" stroke-width="2"/>
       <line x1="160" y1="30" x2="160" y2="50" stroke="${RAY}" stroke-width="2.5"/>
       <text x="176" y="40" fill="${MUTED}" font-size="11">F</text>
       <text x="160" y="120" fill="${MUTED}" font-size="11" text-anchor="middle">A</text>`}`;
}

function meltingSketch(lang) {
  return `${frame()}
    ${title(lang, '熔化 T–t 曲线（平台）', 'Melting T–t (plateau)')}
    <line x1="40" y1="110" x2="290" y2="110" stroke="${MUTED}" stroke-width="1"/>
    <line x1="50" y1="110" x2="50" y2="30" stroke="${MUTED}" stroke-width="1"/>
    <path d="M60 100 L120 70 L200 70 L260 40" fill="none" stroke="${RAY}" stroke-width="2.5"/>
    <text x="160" y="64" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '熔点平台', 'melting plateau')}</text>
    <text x="280" y="124" fill="${MUTED}" font-size="11">t</text>
    <text x="36" y="40" fill="${MUTED}" font-size="11">T</text>`;
}

function projectileSketch(lang) {
  return `${frame()}
    ${title(lang, '平抛 x = v₀t · y = H − ½gt²', 'Projectile x = v0 t, y = H − ½ g t²')}
    <line x1="40" y1="110" x2="290" y2="110" stroke="${MUTED}" stroke-width="1"/>
    <line x1="50" y1="110" x2="50" y2="30" stroke="${MUTED}" stroke-width="1"/>
    <path d="M50 40 Q160 40 250 110" fill="none" stroke="${RAY}" stroke-width="2.5"/>
    <circle cx="50" cy="40" r="4" fill="${RAY}"/>
    <text x="64" y="36" fill="${MUTED}" font-size="11">v0</text>`;
}

function stGraphSketch(lang) {
  return `${frame()}
    ${title(lang, 's–t 图像', 's–t graph')}
    <line x1="50" y1="110" x2="290" y2="110" stroke="${MUTED}" stroke-width="1"/>
    <line x1="60" y1="110" x2="60" y2="30" stroke="${MUTED}" stroke-width="1"/>
    <path d="M60 100 L140 100 L220 50 L280 50" fill="none" stroke="${RAY}" stroke-width="2.5"/>
    <text x="280" y="124" fill="${MUTED}" font-size="11">t</text>
    <text x="40" y="40" fill="${MUTED}" font-size="11">s</text>`;
}

function vtAreaSketch(lang) {
  return `${frame()}
    ${title(lang, 'v–t 面积 = 位移', 'v–t area = displacement')}
    <line x1="50" y1="110" x2="290" y2="110" stroke="${MUTED}" stroke-width="1"/>
    <line x1="60" y1="110" x2="60" y2="30" stroke="${MUTED}" stroke-width="1"/>
    <path d="M60 90 L120 50 L200 50 L260 90" fill="${RAY}" opacity="0.12" stroke="${RAY}" stroke-width="2"/>
    <text x="160" y="78" fill="${MUTED}" font-size="11" text-anchor="middle">Δx</text>`;
}

function ampereSketch(lang) {
  return `${frame()}
    ${title(lang, '安培力 F = BIL', 'Ampere force F = B I L')}
    <line x1="60" y1="40" x2="60" y2="110" stroke="${MUTED}" stroke-width="1" stroke-dasharray="2 2"/>
    <line x1="100" y1="40" x2="100" y2="110" stroke="${MUTED}" stroke-width="1" stroke-dasharray="2 2"/>
    <line x1="140" y1="40" x2="140" y2="110" stroke="${MUTED}" stroke-width="1" stroke-dasharray="2 2"/>
    <line x1="180" y1="40" x2="180" y2="110" stroke="${MUTED}" stroke-width="1" stroke-dasharray="2 2"/>
    <line x1="70" y1="75" x2="220" y2="75" stroke="${INK}" stroke-width="3"/>
    <text x="230" y="70" fill="${MUTED}" font-size="11">I</text>
    <line x1="145" y1="75" x2="145" y2="45" stroke="${RAY}" stroke-width="2.5"/>
    <text x="156" y="50" fill="${MUTED}" font-size="11">F</text>
    <text x="90" y="30" fill="${MUTED}" font-size="11">B ×</text>`;
}

function chargeSketch(lang) {
  return `${frame()}
    ${title(lang, '库仑力 F = k|q₁q₂|/r²', 'Coulomb F = k|q1 q2|/r²')}
    <circle cx="100" cy="70" r="14" fill="none" stroke="${RAY}" stroke-width="2"/>
    <circle cx="220" cy="70" r="14" fill="none" stroke="${RAY2}" stroke-width="2"/>
    <text x="100" y="74" fill="${MUTED}" font-size="11" text-anchor="middle">q1</text>
    <text x="220" y="74" fill="${MUTED}" font-size="11" text-anchor="middle">q2</text>
    <line x1="114" y1="70" x2="206" y2="70" stroke="${INK}" stroke-width="1.5"/>
    <text x="160" y="62" fill="${MUTED}" font-size="11" text-anchor="middle">r</text>`;
}

function visionSketch(lang) {
  return `${frame()}
    ${title(lang, '近视 / 远视矫正示意', 'Myopia / hyperopia correction')}
    <ellipse cx="120" cy="70" rx="36" ry="28" fill="none" stroke="${INK}" stroke-width="2"/>
    <line x1="40" y1="70" x2="84" y2="70" stroke="${RAY}" stroke-width="2"/>
    <path d="M84 55 Q100 70 84 85" fill="none" stroke="${RAY2}" stroke-width="2"/>
    <text x="100" y="118" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '矫正透镜', 'correcting lens')}</text>
    <line x1="156" y1="55" x2="200" y2="70" stroke="${RAY}" stroke-width="1.5"/>
    <line x1="156" y1="85" x2="200" y2="70" stroke="${RAY}" stroke-width="1.5"/>`;
}

function waveSketch(lang) {
  return `${frame()}
    ${title(lang, '声波 y = A sin(2πft)', 'Sound y = A sin(2π f t)')}
    <line x1="30" y1="70" x2="300" y2="70" stroke="${MUTED}" stroke-width="1"/>
    <path d="M40 70 Q60 30 80 70 T120 70 T160 70 T200 70 T240 70 T280 70" fill="none" stroke="${RAY}" stroke-width="2.5"/>
    <text x="70" y="40" fill="${MUTED}" font-size="11">A</text>`;
}

function balanceSketch(lang) {
  return `${frame()}
    ${title(lang, '天平平衡', 'Balance equilibrium')}
    <line x1="160" y1="40" x2="160" y2="60" stroke="${INK}" stroke-width="2"/>
    <line x1="70" y1="70" x2="250" y2="70" stroke="${INK}" stroke-width="3"/>
    <rect x="60" y="78" width="40" height="24" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <rect x="220" y="78" width="40" height="24" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <text x="80" y="120" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '物体', 'object')}</text>
    <text x="240" y="120" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '砝码', 'weights')}</text>`;
}

function pinholeSketch(lang) {
  return `${frame()}
    ${title(lang, '小孔成像（相似三角形）', 'Pinhole (similar triangles)')}
    <line x1="50" y1="70" x2="50" y2="40" stroke="${RAY}" stroke-width="2.5"/>
    <line x1="140" y1="30" x2="140" y2="110" stroke="${INK}" stroke-width="2"/>
    <circle cx="140" cy="70" r="3" fill="${PAPER}" stroke="${INK}" stroke-width="1.5"/>
    <line x1="50" y1="40" x2="230" y2="100" stroke="${RAY}" stroke-width="1.5"/>
    <line x1="50" y1="70" x2="230" y2="70" stroke="${RAY}" stroke-width="1.5"/>
    <line x1="230" y1="40" x2="230" y2="110" stroke="${MUTED}" stroke-width="2"/>
    <text x="50" y="120" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '物', 'Obj')}</text>
    <text x="230" y="120" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '像', 'Img')}</text>`;
}

function frictionSketch(lang) {
  return `${frame()}
    ${title(lang, '摩擦力（水平面）', 'Friction on a level surface')}
    <line x1="40" y1="100" x2="290" y2="100" stroke="${INK}" stroke-width="2"/>
    <rect x="120" y="70" width="70" height="30" fill="none" stroke="${INK}" stroke-width="2"/>
    <line x1="190" y1="85" x2="250" y2="85" stroke="${RAY}" stroke-width="2.5"/>
    <text x="260" y="80" fill="${MUTED}" font-size="11">F</text>
    <line x1="120" y1="85" x2="70" y2="85" stroke="${RAY2}" stroke-width="2.5"/>
    <text x="58" y="80" fill="${MUTED}" font-size="11">f</text>`;
}

function archimedesSketch(lang) {
  return `${frame()}
    ${title(lang, '阿基米德原理 Fb = ρgV', 'Archimedes Fb = ρ g V')}
    <rect x="100" y="40" width="120" height="80" fill="none" stroke="${INK}" stroke-width="2"/>
    <rect x="102" y="70" width="116" height="48" fill="${RAY2}" opacity="0.15"/>
    <rect x="130" y="78" width="60" height="30" fill="none" stroke="${RAY}" stroke-width="2"/>
    <text x="160" y="98" fill="${MUTED}" font-size="11" text-anchor="middle">V</text>`;
}

function levelsSketch(lang) {
  return `${frame()}
    ${title(lang, '能级 Eₙ = −13.6 eV / n²', 'Levels E_n = −13.6 eV / n²')}
    <line x1="80" y1="110" x2="240" y2="110" stroke="${INK}" stroke-width="2"/>
    <line x1="80" y1="85" x2="240" y2="85" stroke="${INK}" stroke-width="2"/>
    <line x1="80" y1="55" x2="240" y2="55" stroke="${INK}" stroke-width="2"/>
    <line x1="80" y1="35" x2="240" y2="35" stroke="${MUTED}" stroke-width="1.5" stroke-dasharray="3 3"/>
    <text x="250" y="114" fill="${MUTED}" font-size="11">n=1</text>
    <text x="250" y="89" fill="${MUTED}" font-size="11">n=2</text>
    <text x="250" y="59" fill="${MUTED}" font-size="11">n=3</text>
    <line x1="160" y1="85" x2="160" y2="55" stroke="${RAY}" stroke-width="2"/>`;
}

function equationCard(lang, zh, en) {
  return `${frame()}
    <text x="160" y="64" fill="${INK}" font-size="14" text-anchor="middle">${L(lang, zh, en)}</text>
    <text x="160" y="94" fill="${MUTED}" font-size="11" text-anchor="middle">${L(lang, '对照读数与方程', 'Match readouts to the equation')}</text>`;
}

/** Multi-step drawers for textbook labs. */
const DRAW = {
  'convex-lens': (section, i, lang) => {
    if (section === 'prepare' && i === 0) return svg(opticsBench(lang, { u: 70, screen: 250, caption: L(lang, '光具座共轴', 'Coaxial bench') }));
    const steps = [
      { u: 90, screen: 250, caption: 'u > 2f' },
      { u: 120, screen: 200, caption: 'u = 2f' },
      { u: 135, screen: 235, caption: 'f < u < 2f' },
      { u: 145, noImage: true, caption: 'u ≈ f' },
      { u: 150, screen: 85, virtual: true, caption: 'u < f' },
    ];
    if (section === 'steps' && steps[i]) return svg(opticsBench(lang, steps[i]));
    if (section === 'steps' && i === 5) return svg(equationCard(lang, '1/u + 1/v = 1/f', '1/u + 1/v = 1/f'));
    if (section === 'conclude' && i === 0) {
      return svg(`${frame()}
        <text x="36" y="40" fill="${INK}" font-size="11">${L(lang, 'u>2f 倒立缩小实像', 'u>2f inverted diminished real')}</text>
        <text x="36" y="62" fill="${INK}" font-size="11">${L(lang, 'u=2f 倒立等大实像', 'u=2f inverted same-size real')}</text>
        <text x="36" y="84" fill="${INK}" font-size="11">${L(lang, 'f<u<2f 倒立放大实像', 'f<u<2f inverted magnified real')}</text>
        <text x="36" y="106" fill="${INK}" font-size="11">${L(lang, 'u<f 正立放大虚像', 'u<f erect magnified virtual')}</text>`);
    }
    return null;
  },
  pinhole: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(pinholeSketch(lang)) : null,
  reflection: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(mirrorSketch(lang, false)) : null,
  'plane-mirror': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(mirrorSketch(lang, true)) : null,
  refraction: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(snellSketch(lang)) : null,
  lever: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(leverSketch(lang)) : null,
  pulley: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(pulleySketch(lang)) : null,
  circuit: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(circuitSketch(lang)) : null,
  'density-lab': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(densityLabSketch(lang)) : null,
  density: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(densityLabSketch(lang)) : null,
  'spring-scale': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(springSketch(lang)) : null,
  'solid-pressure': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(pressureSketch(lang, false)) : null,
  'liquid-pressure': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(pressureSketch(lang, true)) : null,
  melting: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(meltingSketch(lang)) : null,
  boiling: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(meltingSketch(lang)) : null,
  projectile: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(projectileSketch(lang)) : null,
  'st-graph': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(stGraphSketch(lang)) : null,
  'vt-area': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(vtAreaSketch(lang)) : null,
  'ampere-force': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(ampereSketch(lang)) : null,
  charges: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(chargeSketch(lang)) : null,
  vision: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(visionSketch(lang)) : null,
  'sound-wave': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(waveSketch(lang)) : null,
  balance: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(balanceSketch(lang)) : null,
  friction: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(frictionSketch(lang)) : null,
  archimedes: (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(archimedesSketch(lang)) : null,
  'float-sink': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(archimedesSketch(lang)) : null,
  'atom-levels': (s, i, lang) => (s === 'steps' || s === 'prepare') && i === 0 ? svg(levelsSketch(lang)) : null,
};

/** Family fallbacks so every sim still gets a clear schematic. */
const FAMILY = {
  optics: (lang) => svg(opticsBench(lang, { u: 90, screen: 240, caption: L(lang, '光路示意', 'Ray sketch') })),
  mech: (lang) => svg(leverSketch(lang)),
  fluid: (lang) => svg(archimedesSketch(lang)),
  circuit: (lang) => svg(circuitSketch(lang)),
  wave: (lang) => svg(waveSketch(lang)),
  thermal: (lang) => svg(meltingSketch(lang)),
  motion: (lang) => svg(projectileSketch(lang)),
  em: (lang) => svg(ampereSketch(lang)),
  modern: (lang) => svg(levelsSketch(lang)),
  graph: (lang) => svg(stGraphSketch(lang)),
  other: (lang, id) => svg(equationCard(lang, id, id)),
};

const FAMILY_OF = {
  pinhole: 'optics', reflection: 'optics', 'plane-mirror': 'optics', refraction: 'optics',
  'convex-lens': 'optics', vision: 'optics', telescope: 'optics', malus: 'optics',
  'double-slit': 'optics', 'single-slit': 'optics', 'thin-film': 'optics', dispersion: 'optics',
  lever: 'mech', pulley: 'mech', work: 'mech', 'force-elements': 'mech', 'force-compose': 'mech',
  'two-force': 'mech', friction: 'mech', gravity: 'mech', 'spring-scale': 'mech', inertia: 'mech',
  collide: 'mech', 'solid-pressure': 'mech',
  density: 'fluid', 'density-lab': 'fluid', 'liquid-pressure': 'fluid', atmosphere: 'fluid',
  bernoulli: 'fluid', archimedes: 'fluid', 'float-sink': 'fluid', 'buoyancy-origin': 'fluid',
  'buoyancy-weigh': 'fluid',
  circuit: 'circuit', 'ac-rms': 'circuit', transformer: 'circuit', current: 'circuit',
  resistivity: 'circuit', capacitance: 'circuit',
  'sound-wave': 'wave', 'sound-absorb': 'wave', beats: 'wave', doppler: 'wave',
  'echo-range': 'wave', 'em-wave': 'wave', 'maxwell-wave': 'wave',
  melting: 'thermal', boiling: 'thermal', sublimation: 'thermal', 'specific-heat': 'thermal',
  'heat-engine': 'thermal', 'internal-energy': 'thermal', carnot: 'thermal', 'ideal-gas': 'thermal',
  'kinetic-gas': 'thermal', thermometer: 'thermal',
  projectile: 'motion', 'st-graph': 'motion', 'vt-area': 'motion', circular: 'motion',
  oscillator: 'motion', frames: 'motion', energy: 'motion', 'energy-share': 'motion',
  efficiency: 'motion', 'central-orbit': 'motion',
  'ampere-force': 'em', solenoid: 'em', 'bar-magnet': 'em', induction: 'em', lorentz: 'em',
  cyclotron: 'em', charges: 'em', 'point-field': 'em', 'field-potential': 'em',
  'atom-levels': 'modern', photoelectric: 'modern', 'half-life': 'modern', 'mass-energy': 'modern',
  'infinite-well': 'modern', 'finite-well': 'modern', 'barrier-tunnel': 'modern',
  'hydrogen-radial': 'modern', 'wave-packet': 'modern', ising: 'modern',
  'stern-gerlach': 'modern', 'bell-singlet': 'modern',
  balance: 'other', ruler: 'other', stopwatch: 'other', scales: 'other',
};

/**
 * @param {string} simId
 * @param {'purpose'|'prepare'|'steps'|'conclude'} section
 * @param {number} index
 * @param {'zh'|'en'} lang
 */
export function labFigureSvg(simId, section, index, lang = 'en') {
  const custom = DRAW[simId];
  if (custom) {
    const drawn = custom(section, index, lang);
    if (drawn) return drawn;
  }
  if ((section === 'steps' || section === 'prepare') && index === 0) {
    const fam = FAMILY_OF[simId] || 'other';
    const fn = FAMILY[fam] || FAMILY.other;
    return fn(lang, simId);
  }
  return null;
}

export function labFigureCount(simId) {
  let n = 0;
  for (let i = 0; i < 8; i += 1) {
    if (labFigureSvg(simId, 'steps', i, 'en')) n += 1;
  }
  return n;
}

export const LAB_FIGURE_SIMS = Object.keys(FAMILY_OF);

export default labFigureSvg;
