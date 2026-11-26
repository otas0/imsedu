/**
 * Original textbook-style line schematics for Experiment-track labs.
 * English is the source language for comments. Student labels follow `lang`.
 * Drawings are inline SVG (no scanned textbook plates, no external images).
 * Nuclear and modern panels stay on public teaching relations.
 */

const INK = '#1c1c1c';
const RAY = '#c4491d';
const SEC = '#1d4e89';
const MUTED = '#5e584e';
const PAPER = '#fffdf8';
const H = 160;
/** Default Experiment panel height — room for table + caption without stacking. */
const H3 = 210;
/** Oblique (cabinet) foreshortening — keep KY mild so depth does not bury labels. */
const OBL_KX = 0.40;
const OBL_KY = 0.16;
/** Table origin in SVG (front-left corner of the board). */
const OBL_OX = 48;
const OBL_OY = 152;

function r(n) {
  const v = Math.round(Number(n) * 10) / 10;
  return Object.is(v, -0) ? '0' : String(v);
}

function L(lang, zh, en) {
  return lang === 'en' ? en : zh;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrap(inner, h = H) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 ${h}" width="100%" height="auto" font-family="ui-sans-serif,system-ui,sans-serif"><rect width="320" height="${h}" fill="${PAPER}"/>${inner}</svg>`;
}

function text(x, y, s, o = {}) {
  if (s == null || s === '') return '';
  const fill = o.fill || INK;
  const size = o.size || 11;
  const anchor = o.anchor || 'middle';
  const weight = o.bold ? ' font-weight="600"' : '';
  return `<text x="${r(x)}" y="${r(y)}" fill="${fill}" font-size="${size}" text-anchor="${anchor}"${weight}>${esc(s)}</text>`;
}

function line(x1, y1, x2, y2, color = INK, w = 1.6, dash = '') {
  const da = dash ? ` stroke-dasharray="${dash}"` : '';
  return `<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${da}/>`;
}

function dash(x1, y1, x2, y2, color = MUTED, w = 1.2) {
  return line(x1, y1, x2, y2, color, w, '4 3');
}

function box(x, y, w, h, o = {}) {
  const stroke = o.stroke == null ? INK : o.stroke;
  const fill = o.fill || 'none';
  const sw = o.w == null ? 1.6 : o.w;
  const da = o.dash ? ` stroke-dasharray="${o.dash}"` : '';
  const op = o.op != null ? ` fill-opacity="${o.op}"` : '';
  const st = stroke === 'none' ? '' : ` stroke="${stroke}" stroke-width="${sw}"${da}`;
  return `<rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" fill="${fill}"${op}${st}/>`;
}

function circ(cx, cy, rad, o = {}) {
  const stroke = o.stroke == null ? INK : o.stroke;
  const fill = o.fill || 'none';
  const sw = o.w == null ? 1.6 : o.w;
  const da = o.dash ? ` stroke-dasharray="${o.dash}"` : '';
  const op = o.op != null ? ` fill-opacity="${o.op}"` : '';
  const st = stroke === 'none' ? '' : ` stroke="${stroke}" stroke-width="${sw}"${da}`;
  return `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r(rad)}" fill="${fill}"${op}${st}/>`;
}

function poly(pts, o = {}) {
  const stroke = o.stroke == null ? INK : o.stroke;
  const fill = o.fill || 'none';
  const sw = o.w == null ? 1.6 : o.w;
  const da = o.dash ? ` stroke-dasharray="${o.dash}"` : '';
  const op = o.op != null ? ` fill-opacity="${o.op}"` : '';
  const ptsAttr = pts.map((p) => `${r(p[0])},${r(p[1])}`).join(' ');
  const st = stroke === 'none' ? '' : ` stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"${da}`;
  return `<polygon points="${ptsAttr}" fill="${fill}"${op}${st}/>`;
}

function path(d, o = {}) {
  const stroke = o.stroke == null ? INK : o.stroke;
  const fill = o.fill || 'none';
  const sw = o.w == null ? 1.6 : o.w;
  const da = o.dash ? ` stroke-dasharray="${o.dash}"` : '';
  const op = o.op != null ? ` fill-opacity="${o.op}"` : '';
  const st = stroke === 'none' ? '' : ` stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${da}`;
  return `<path d="${d}" fill="${fill}"${op}${st}/>`;
}

function polyLine(pts, color = INK, w = 1.7, dashPat = '') {
  if (!pts || pts.length < 2) return '';
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${r(p[0])} ${r(p[1])}`).join(' ');
  return path(d, { stroke: color, w, dash: dashPat || undefined });
}

function heading(lang, zh, en) {
  return text(14, 16, L(lang, zh, en), { anchor: 'start', size: 12, bold: true });
}

function caption(lang, zh, en, h = H) {
  return text(160, h - 8, L(lang, zh, en), { size: 11, fill: MUTED });
}

function panel(lang, titleZh, titleEn, capZh, capEn, body, h = H3) {
  return wrap(heading(lang, titleZh, titleEn) + body + caption(lang, capZh, capEn, h), h);
}

/** Map lab (x right, y up, z into the table) → SVG. Origin at table front-left. */
function obl(x, y, z, ox = OBL_OX, oy = OBL_OY) {
  return [ox + x + z * OBL_KX, oy - y + z * OBL_KY];
}

/** Dimension along the front apron (z≈0), clear of apparatus. */
function dimFront(x1, x2, label, color = SEC, z = 2) {
  const [a, y] = obl(x1, -18, z);
  const [b] = obl(x2, -18, z);
  // Extra lift so the label clears the apron edge.
  return hDim(a, b, y + 2, label, color);
}

/** Flat white schematic card on the table (for circuits / clean 2D diagrams). */
function noteCard(x, z, w, h) {
  return oblPoly3([[x, 1, z], [x + w, 1, z], [x + w, 1, z + 4], [x, 1, z + 4]], { fill: '#ebe4d6', w: 1 }) +
    oblPoly3([[x, 2, z + 2], [x + w, 2, z + 2], [x + w, 2 + h, z + 2], [x, 2 + h, z + 2]], { fill: PAPER, w: 1.3 });
}

/** Whiteboard / chart easel standing on the table (face at z−). */
function chartStand(cx, z, w, h) {
  const x0 = cx - w / 2;
  return standPost(x0 + 6, z, 7) + standPost(x0 + w - 6, z, 7) +
    oblPoly3([[x0, 0, z - 2], [x0 + w, 0, z - 2], [x0 + w, h, z - 2], [x0, h, z - 2]], { fill: '#faf6ee', w: 1.3 }) +
    oblPoly3([[x0 + w, 0, z - 2], [x0 + w, 0, z + 1], [x0 + w, h, z + 1], [x0 + w, h, z - 2]], { fill: '#ebe4d6', w: 1.1 });
}

/** Map legacy flat schematic coords onto the chart face in oblique space. */
function chartMapper(cx, z, w, h, fx0 = 20, fy0 = 32, fx1 = 292, fy1 = 140) {
  const x0 = cx - w / 2;
  const map = (fx, fy) => {
    const lx = ((fx - fx0) / (fx1 - fx0)) * w;
    const ly = ((fy - fy0) / (fy1 - fy0)) * h;
    return obl(x0 + lx, Math.max(0, Math.min(h, ly)), z);
  };
  const mpoly = (pts, color, wLine, dashPat) => {
    const out = pts.map((p) => obl(x0 + ((p[0] - fx0) / (fx1 - fx0)) * w, Math.max(0, Math.min(h, ((p[1] - fy0) / (fy1 - fy0)) * h)), z));
    return polyLine(out.map((p) => [p[0], p[1]]), color, wLine, dashPat);
  };
  const mpath = (d, o) => {
    const toObl = (nums, i) => {
      if (i % 2 === 0) return r(map(nums[i / 2], nums[i / 2 + 1])[0]);
      return r(map(nums[(i - 1) / 2], nums[(i - 1) / 2 + 1])[1]);
    };
    return path(d.replace(/([\d.]+)\s+([\d.]+)/g, (m, a, b) => {
      const [ox, oy] = map(Number(a), Number(b));
      return `${r(ox)} ${r(oy)}`;
    }), o);
  };
  return {
    map,
    line: (x1, y1, x2, y2, color = INK, ww = 1.6, dashPat = '') => {
      const [a, b] = map(x1, y1);
      const [c, d] = map(x2, y2);
      return line(a, b, c, d, color, ww, dashPat);
    },
    dash: (x1, y1, x2, y2, color = MUTED, ww = 1.2) => {
      const [a, b] = map(x1, y1);
      const [c, d] = map(x2, y2);
      return dash(a, b, c, d, color, ww);
    },
    arrow: (x1, y1, x2, y2, color = INK, ww = 1.6) => {
      const [a, b] = map(x1, y1);
      const [c, d] = map(x2, y2);
      return arrow(a, b, c, d, color, ww);
    },
    ray: (x1, y1, x2, y2, color = RAY) => {
      const [a, b] = map(x1, y1);
      const [c, d] = map(x2, y2);
      return ray(a, b, c, d, color);
    },
    text: (x, y, s, o = {}) => {
      const [a, b] = map(x, y);
      return text(a, b, s, o);
    },
    box: (x, y, bw, bh, o = {}) => {
      const z0 = z - 1.5;
      const lx = x0 + ((x - fx0) / (fx1 - fx0)) * w;
      const ly = ((y - fy0) / (fy1 - fy0)) * h;
      const dx = (bw / (fx1 - fx0)) * w;
      const dy = (bh / (fy1 - fy0)) * h;
      return oblPoly3([[lx, ly, z0], [lx + dx, ly, z0], [lx + dx, ly + dy, z0], [lx, ly + dy, z0]], {
        fill: o.fill || 'none', stroke: o.stroke == null ? (o.fill && o.fill !== 'none' ? 'none' : INK) : o.stroke,
        w: o.w == null ? 1.4 : o.w, op: o.op, dash: o.dash,
      });
    },
    circ: (cx, cy, rad, o = {}) => {
      const [a, b] = map(cx, cy);
      return circ(a, b, rad * 0.85, o);
    },
    poly: (pts, o = {}) => poly(pts.map((p) => map(p[0], p[1])), o),
    polyLine: (pts, color = INK, ww = 1.7, dashPat = '') => mpoly(pts, color, ww, dashPat),
    path: (d, o = {}) => mpath(d, o),
    axes: (x, yTop, ww, hh) => {
      const [ax, ay0] = map(x, yTop + hh);
      const [ax2, ay1] = map(x, yTop);
      const [bx, by] = map(x + ww, yTop + hh);
      return arrow(ax, ay0, ax, ay1, INK, 1.35) + arrow(ax, ay0, bx, by, INK, 1.35);
    },
    axisLabels: (x, yTop, ww, hh, xlab, ylab) => {
      const [tx, ty] = map(x + ww + 2, yTop + hh + 4);
      const [lx, ly] = map(x - 2, yTop + 3);
      return text(tx, ty, xlab, { anchor: 'start', size: 11, fill: MUTED }) +
        text(lx, ly, ylab, { anchor: 'end', size: 11, fill: SEC });
    },
    hDim: (x1, x2, y, label, color = SEC) => {
      const [a, b] = map(x1, y);
      const [c] = map(x2, y);
      return hDim(a, c, b - 8, label, color);
    },
    vDim: (x, y1, y2, label, color = SEC) => {
      const [a, b] = map(x, y1);
      const [, d] = map(x, y2);
      return vDim(a + 6, b, d, label, color);
    },
    ground: (x1, x2, y) => {
      const [a, b] = map(x1, y);
      const [c, d] = map(x2, y);
      let s = line(a, b, c, d, INK, 1.8);
      for (let fx = x1; fx < x2 - 2; fx += 8) {
        const [p, q] = map(fx, y);
        s += line(p, q, p - 4, q + 4, INK, 1.1);
      }
      return s;
    },
    crosses: (x, y, ww, hh, gap) => {
      const [a, b] = map(x, y);
      const [c, d] = map(x + ww, y + hh);
      return crosses(Math.min(a, c), Math.min(b, d), Math.abs(c - a), Math.abs(d - b), gap);
    },
    hatchesH: (x1, x2, y, down = true) => {
      const [a, b] = map(x1, y);
      const [c, d] = map(x2, y);
      return hatchesH(a, c, b, down);
    },
    hatchesV: (x, y1, y2, right = true) => {
      const [a, b] = map(x, y1);
      const [, d] = map(x, y2);
      return hatchesV(a, b, d, right);
    },
    chargeBall: (x, y, sign, rad = 16) => {
      const [a, b] = map(x, y);
      return circ(a, b, rad * 0.8, { fill: PAPER, w: 1.4 }) + text(a, b + 4, sign, { size: 12, fill: sign === '+' ? RAY : SEC });
    },
    sinePts: (x0, y, ww, amp, cycles, phase = 0, n = 80) => {
      const pts = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        pts.push([x0 + t * ww, y - amp * Math.sin(phase + t * cycles * Math.PI * 2)]);
      }
      return pts;
    },
    block: (x, y, bw, bh, o = {}) => {
      const lx = x0 + ((x - fx0) / (fx1 - fx0)) * w;
      const ly = ((y - fy0) / (fy1 - fy0)) * h;
      const dx = (bw / (fx1 - fx0)) * w;
      const dy = (bh / (fy1 - fy0)) * h;
      return oblPoly3([[lx, ly, z], [lx + dx, ly, z], [lx + dx, ly + dy, z], [lx, ly + dy, z]], { fill: PAPER, w: 1.3, ...o });
    },
    pendulum: (cx, y0, len, angDeg, bob = 7) => {
      const a = (angDeg * Math.PI) / 180;
      const [px, py] = map(cx, y0);
      const [qx, qy] = map(cx + Math.sin(a) * len, y0 + Math.cos(a) * len);
      return line(px - 10, py, px + 10, py, INK, 1.6) + line(px, py, qx, qy, INK, 1.4) + circ(qx, qy, bob, { fill: PAPER });
    },
    springV: (x, y1, y2, amp = 7, turns = 7) => {
      const n = turns;
      const dy = (y2 - y1) / n;
      let d = '';
      const [sx, sy] = map(x, y1);
      d += `M ${r(sx)} ${r(sy)}`;
      for (let i = 0; i < n; i++) {
        const yy = y1 + dy * i;
        const side = i % 2 === 0 ? amp : -amp;
        const [px, py] = map(x + side, yy + dy * 0.5);
        const [qx, qy] = map(x, yy + dy);
        d += ` Q ${r(px)} ${r(py)} ${r(qx)} ${r(qy)}`;
      }
      return path(d, { w: 1.5 });
    },
    piston: (x, y, pw, ph, top) => {
      const [ax] = map(x, y);
      const [bx, by] = map(x + pw, y + ph);
      const [tx] = map(x + pw / 2, top - 14);
      const [mx, my] = map(x + pw / 2, top);
      return box(x, y, pw, ph, { fill: 'rgba(180,210,230,0.12)' }) + box(x - 4, top, pw + 8, 8, { fill: PAPER }) + line(tx, my - 14, mx, my, INK, 1.5);
    },
    convexLens: (x, top, bot) => {
      const mid = (top + bot) / 2;
      const [cx, cy] = map(x, mid);
      const h = Math.abs(bot - top) / 2;
      return path(`M ${r(cx)} ${r(cy - h)} Q ${r(cx + 8)} ${r(cy)} ${r(cx)} ${r(cy + h)} Q ${r(cx - 8)} ${r(cy)} ${r(cx)} ${r(cy - h)} Z`, { fill: 'rgba(180,210,230,0.25)', w: 1.6 });
    },
    screenPlate: (x, top, bot) => box(x, top, 8, bot - top, { fill: '#f3efe4' }) + hatchesV(map(x + 8, top)[0], map(x + 8, top)[1], map(x + 8, bot)[1], true),
    beaker: (x, y, bw, bh, level) => {
      const lx = ((x - fx0) / (fx1 - fx0)) * w + (x0 - (x0));
      const cx = x0 + ((x + bw / 2 - fx0) / (fx1 - fx0)) * w;
      const cz = z;
      const rad = (bw / (fx1 - fx0)) * w * 0.45;
      const ht = ((bh / (fy1 - fy0)) * h) * 0.9;
      const lv = level != null ? (level / bh) * ht : null;
      return beaker3d(cx, cz, Math.max(12, rad), ht, lv);
    },
    magnetBar: (x, y, bw, bh, northOnRight) => {
      const lx = x0 + ((x - fx0) / (fx1 - fx0)) * w;
      const ly = ((y - fy0) / (fy1 - fy0)) * h;
      const dx = (bw / (fx1 - fx0)) * w;
      const dy = (bh / (fy1 - fy0)) * h;
      const [tx, ty] = map(x + bw / 2, y + bh / 2);
      let s = oblPoly3([[lx, ly, z], [lx + dx, ly, z], [lx + dx, ly + dy, z], [lx, ly + dy, z]], { fill: northOnRight ? 'rgba(29,78,137,0.14)' : 'rgba(196,73,29,0.14)', w: 1.3 });
      s += text(tx - dx * 0.25, ty + 3, 'N', { size: 12, fill: RAY });
      s += text(tx + dx * 0.25, ty + 3, 'S', { size: 12, fill: SEC });
      return s;
    },
  };
}

function obliqueShown(lang, step, table, draw) {
  // Prefer a clean flat schematic above a short bench — chartMapper was crowding labels.
  const row = table[step];
  let body = tableBoard(210, 52);
  body += draw({
    map: (x, y) => [x, y],
    line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim,
    ground, crosses, hatchesH, hatchesV,
    chargeBall: (x, y, sign, rad = 16) => circ(x, y, rad, { fill: PAPER, w: 1.4 }) + text(x, y + 4, sign, { size: 12, fill: sign === '+' ? RAY : SEC }),
    sinePts, block, pendulum, springV, piston, convexLens, screenPlate, beaker, magnetBar,
  });
  return panel(lang, row[0][0], row[0][1], row[1][0], row[1][1], body);
}

function oblRay(a, b, color = RAY) {
  const [x1, y1] = obl(a[0], a[1], a[2]);
  const [x2, y2] = obl(b[0], b[1], b[2]);
  return ray(x1, y1, x2, y2, color);
}

function oblArrow(a, b, color = INK, w = 1.6) {
  const [x1, y1] = obl(a[0], a[1], a[2]);
  const [x2, y2] = obl(b[0], b[1], b[2]);
  return arrow(x1, y1, x2, y2, color, w);
}

function slitPlate3d(x, z, h = 58, slitY = 30, slitH = 7, double = false) {
  const z1 = z - 3;
  const z2 = z + 3;
  const mid = h / 2;
  const y1 = double ? slitY - 12 : slitY;
  const y2 = double ? slitY + 12 : slitY;
  const face = (sy) => oblPoly3(
    [[x, 0, z1], [x, h, z1], [x, h, z2], [x, 0, z2], [x, 0, z1], [x, sy - slitH / 2, z1], [x, sy + slitH / 2, z1], [x, h, z1], [x, h, z2], [x, sy + slitH / 2, z2], [x, sy - slitH / 2, z2], [x, 0, z2]],
    { fill: '#2a2a2a', w: 1.2 },
  );
  return (double ? face(y1) + face(y2) : face(y2)) + standPost(x, z, 8);
}

function parallelPlates3d(x, z, gap, h = 58) {
  return glassPlate(x, z - 2, z + 2, h) + glassPlate(x + gap, z - 2, z + 2, h);
}

function oblLine(a, b, color = INK, w = 1.5, dashPat = '') {
  const [x1, y1] = obl(a[0], a[1], a[2]);
  const [x2, y2] = obl(b[0], b[1], b[2]);
  return line(x1, y1, x2, y2, color, w, dashPat);
}

function oblPoly3(pts, o = {}) {
  return poly(pts.map((p) => obl(p[0], p[1], p[2])), o);
}

function oblPathPts(pts, o = {}) {
  if (!pts || pts.length < 2) return '';
  const d = pts.map((p, i) => {
    const [x, y] = obl(p[0], p[1], p[2]);
    return `${i ? 'L' : 'M'}${r(x)} ${r(y)}`;
  }).join(' ');
  return path(d, o);
}

function tableBoard(w = 220, d = 72) {
  return oblPoly3([[0, 0, 0], [w, 0, 0], [w, 0, d], [0, 0, d]], { fill: '#f7f1e6', w: 1.4 }) +
    oblPoly3([[0, 0, 0], [w, 0, 0], [w, -5, 0], [0, -5, 0]], { fill: '#ebe4d6', w: 1.2 }) +
    oblPoly3([[w, 0, 0], [w, 0, d], [w, -5, d], [w, -5, 0]], { fill: '#e2d9c8', w: 1.1 });
}

function glassPlate(x, z0, z1, h = 72) {
  // Vertical glass along a short depth span so the face stays a slim parallelogram.
  const face = oblPoly3(
    [[x, 0, z0], [x, h, z0], [x, h, z1], [x, 0, z1]],
    { fill: 'rgba(160, 190, 210, 0.28)', w: 1.5 },
  );
  const rim = oblLine([x, h, z0], [x, h, z1], INK, 1.3) +
    oblLine([x, 0, z0], [x, h, z0], INK, 1.3) +
    oblLine([x, 0, z1], [x, h, z1], INK, 1.3) +
    oblLine([x, 0, z0], [x, 0, z1], INK, 1.2);
  return face + rim;
}

function clampBlock(x, z, label) {
  const s = oblPoly3(
    [[x - 4, 0, z - 3], [x + 4, 0, z - 3], [x + 4, 7, z - 3], [x - 4, 7, z - 3]],
    { fill: '#c8c4bc', w: 1.2 },
  ) + oblPoly3(
    [[x - 4, 0, z - 3], [x - 4, 0, z + 3], [x - 4, 7, z + 3], [x - 4, 7, z - 3]],
    { fill: '#b4b0a8', w: 1.1 },
  );
  if (!label) return s;
  const [lx, ly] = obl(x, 0, z);
  return s + text(lx, ly + 14, label, { size: 10, fill: MUTED });
}

function candle3d(x, z, o = {}) {
  const h = o.h == null ? 28 : o.h;
  const lit = !!o.lit;
  const ghost = !!o.ghost;
  const thin = !!o.thin;
  const rad = thin ? 3.4 : 5.8;
  const fill = ghost ? 'rgba(210,210,210,0.4)' : PAPER;
  const stroke = ghost ? MUTED : INK;
  const sw = ghost ? 1.15 : 1.45;
  const dz = rad * 0.55;
  // Front face + right face + elliptical top (textbook candle cylinder).
  let s = oblPoly3(
    [[x - rad, 0, z], [x + rad, 0, z], [x + rad, h, z], [x - rad, h, z]],
    { fill, stroke, w: sw },
  );
  s += oblPoly3(
    [[x + rad, 0, z], [x + rad, 0, z + dz], [x + rad, h, z + dz], [x + rad, h, z]],
    { fill: ghost ? 'rgba(190,190,190,0.3)' : '#efe8dc', stroke, w: sw },
  );
  const [tcx, tcy] = obl(x, h, z + dz * 0.35);
  s += `<ellipse cx="${r(tcx)}" cy="${r(tcy)}" rx="${r(rad + 0.8)}" ry="${r(rad * 0.42)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (lit && !ghost) {
    const [fx, fy] = obl(x, h + 13, z + dz * 0.2);
    s += path(
      `M ${r(tcx)} ${r(tcy - 1)} C ${r(tcx + 4.5)} ${r(tcy - 7)}, ${r(tcx + 2.5)} ${r(fy)}, ${r(fx)} ${r(fy)} C ${r(tcx - 2.5)} ${r(fy)}, ${r(tcx - 4.5)} ${r(tcy - 7)}, ${r(tcx)} ${r(tcy - 1)}`,
      { stroke: RAY, fill: '#ffe0c2', w: 1.05 },
    );
    const [bx, by] = obl(x, 0, z);
    s += circ(bx, by, 12, { fill: RAY, op: 0.11, stroke: 'none' });
  }
  if (o.label) {
    const [lx, ly] = obl(x, h + (lit ? 20 : 12), z + dz * 0.2);
    s += text(lx, ly, o.label, { size: 12, bold: true, fill: ghost ? MUTED : INK });
  }
  return s;
}

function standPost(x, z, h = 70) {
  return oblLine([x, 0, z], [x, h, z], INK, 2) +
    oblPoly3([[x - 8, 0, z - 6], [x + 8, 0, z - 6], [x + 8, 0, z + 6], [x - 8, 0, z + 6]], { fill: '#ddd8ce', w: 1.2 });
}

function lensOnStand(x, z, h = 56) {
  const [cx, cy] = obl(x, h / 2, z);
  return standPost(x, z, 8) +
    path(`M ${r(cx)} ${r(cy - 28)} Q ${r(cx + 9)} ${r(cy)} ${r(cx)} ${r(cy + 28)} Q ${r(cx - 9)} ${r(cy)} ${r(cx)} ${r(cy - 28)} Z`, { fill: 'rgba(180,210,230,0.25)', w: 1.6 }) +
    oblLine([x, 8, z], [x, h - 4, z], INK, 1.2);
}

function screenOnStand(x, z, h = 52) {
  return standPost(x, z, 8) +
    oblPoly3([[x - 2, 10, z - 18], [x - 2, 10 + h, z - 18], [x - 2, 10 + h, z + 18], [x - 2, 10, z + 18]], { fill: '#f3efe4', w: 1.4 }) +
    oblPoly3([[x - 2, 10, z + 18], [x + 3, 10, z + 18], [x + 3, 10 + h, z + 18], [x - 2, 10 + h, z + 18]], { fill: '#e8e2d4', w: 1.1 });
}

/** Vertical card with a central hole (pinhole imaging). */
function pinholeCard(x, z0, z1, h = 70, hole = 5) {
  const mid = (z0 + z1) / 2;
  const top = h / 2 + hole;
  const bot = h / 2 - hole;
  return oblPoly3([[x, 0, z0], [x, h, z0], [x, h, mid - hole], [x, top, mid - hole], [x, top, mid + hole], [x, h, mid + hole], [x, h, z1], [x, 0, z1], [x, 0, mid + hole], [x, bot, mid + hole], [x, bot, mid - hole], [x, 0, mid - hole]], {
    fill: '#2a2a2a', stroke: INK, w: 1.2,
  });
}

/** Short rectangular block sitting on the table (or raised by y0). */
function block3d(x, z, w, h, d, o = {}) {
  const y0 = o.y0 || 0;
  const fill = o.fill || PAPER;
  let s = oblPoly3([[x, y0, z], [x + w, y0, z], [x + w, y0 + h, z], [x, y0 + h, z]], { fill, w: 1.3 });
  s += oblPoly3([[x + w, y0, z], [x + w, y0, z + d], [x + w, y0 + h, z + d], [x + w, y0 + h, z]], { fill: '#e8e2d4', w: 1.2 });
  s += oblPoly3([[x, y0 + h, z], [x + w, y0 + h, z], [x + w, y0 + h, z + d], [x, y0 + h, z + d]], { fill: '#f7f1e6', w: 1.2 });
  if (o.label) {
    const [lx, ly] = obl(x + w / 2, y0 + h / 2, z + d / 2);
    s += text(lx, ly + 3, o.label, { size: 10, fill: o.labelFill || INK });
  }
  return s;
}

/** Graduated cylinder in oblique view. */
function cylinder3d(cx, z, rad, h, level) {
  const [bx, by] = obl(cx, 0, z);
  const [tx, ty] = obl(cx, h, z);
  let s = path(
    `M ${r(bx - rad)} ${r(by)} L ${r(tx - rad)} ${r(ty)} L ${r(tx + rad)} ${r(ty)} L ${r(bx + rad)} ${r(by)} Z`,
    { fill: 'rgba(180,210,230,0.12)', w: 1.4 },
  );
  s += `<ellipse cx="${r(bx)}" cy="${r(by)}" rx="${r(rad)}" ry="${r(rad * 0.35)}" fill="none" stroke="${INK}" stroke-width="1.3"/>`;
  s += `<ellipse cx="${r(tx)}" cy="${r(ty)}" rx="${r(rad)}" ry="${r(rad * 0.35)}" fill="none" stroke="${INK}" stroke-width="1.3"/>`;
  if (level != null) {
    const [lx, ly] = obl(cx, level, z);
    s += `<ellipse cx="${r(lx)}" cy="${r(ly)}" rx="${r(rad - 1)}" ry="${r((rad - 1) * 0.35)}" fill="${SEC}" fill-opacity="0.22" stroke="${SEC}" stroke-width="1.1"/>`;
  }
  // Tick marks.
  for (let i = 1; i <= 4; i++) {
    const yy = (h * i) / 5;
    const [a, b] = obl(cx + rad - 2, yy, z);
    const [c, d] = obl(cx + rad + 4, yy, z);
    s += line(a, b, c, d, MUTED, 1);
  }
  return s;
}

/** Open beaker / overflow can on the table. */
function beaker3d(cx, z, rad, h, level, o = {}) {
  const [bx, by] = obl(cx, 0, z);
  const [tx, ty] = obl(cx, h, z);
  let s = path(
    `M ${r(bx - rad)} ${r(by)} L ${r(tx - rad)} ${r(ty)} L ${r(tx + rad)} ${r(ty)} L ${r(bx + rad)} ${r(by)} Z`,
    { fill: 'rgba(180,210,230,0.1)', w: 1.5 },
  );
  s += `<ellipse cx="${r(bx)}" cy="${r(by)}" rx="${r(rad)}" ry="${r(rad * 0.38)}" fill="none" stroke="${INK}" stroke-width="1.4"/>`;
  s += `<ellipse cx="${r(tx)}" cy="${r(ty)}" rx="${r(rad)}" ry="${r(rad * 0.38)}" fill="none" stroke="${INK}" stroke-width="1.4"/>`;
  if (level != null) {
    const [lx, ly] = obl(cx, level, z);
    s += `<ellipse cx="${r(lx)}" cy="${r(ly)}" rx="${r(rad - 2)}" ry="${r((rad - 2) * 0.38)}" fill="${SEC}" fill-opacity="0.2" stroke="${SEC}" stroke-width="1.1"/>`;
  }
  if (o.spout) {
    // Overflow spout toward +x.
    s += oblPoly3(
      [[cx + rad - 2, h * 0.55, z], [cx + rad + 18, h * 0.42, z + 4], [cx + rad + 18, h * 0.5, z + 4], [cx + rad - 2, h * 0.62, z]],
      { fill: PAPER, w: 1.3 },
    );
  }
  return s;
}

/** Knife-edge fulcrum on the table. */
function fulcrum3d(x, z) {
  return oblPoly3([[x - 14, 0, z - 8], [x + 14, 0, z - 8], [x, 14, z]], { fill: '#ddd8ce', w: 1.4 }) +
    oblPoly3([[x + 14, 0, z - 8], [x + 14, 0, z + 8], [x, 14, z + 4], [x, 14, z]], { fill: '#cfc9bc', w: 1.2 });
}

/** Spring hanging from a stand (测力计 style). */
function springScale3d(x, z, stretch, o = {}) {
  const top = 78;
  const hook = top - 14 - stretch;
  let s = standPost(x, z, top);
  // Scale body.
  s += oblPoly3([[x - 8, top - 70, z - 4], [x + 8, top - 70, z - 4], [x + 8, top - 8, z - 4], [x - 8, top - 8, z - 4]], { fill: PAPER, w: 1.3 });
  // Coil.
  const turns = o.fat ? 8 : 6;
  const amp = o.fat ? 7 : 5;
  let d = '';
  const y1 = top - 8;
  const y2 = Math.max(hook + 8, 18);
  for (let i = 0; i <= turns; i++) {
    const yy = y1 - (i / turns) * (y1 - y2);
    const side = i % 2 === 0 ? amp : -amp;
    const [px, py] = obl(x + side, yy, z);
    d += `${i ? 'L' : 'M'}${r(px)} ${r(py)} `;
  }
  s += path(d.trim(), { w: 1.5 });
  const [hx, hy] = obl(x, hook, z);
  s += path(`M ${r(hx - 6)} ${r(hy)} L ${r(hx + 6)} ${r(hy)} L ${r(hx)} ${r(hy + 8)} Z`, { w: 1.3 });
  if (o.limitY != null) {
    const [a, b] = obl(x - 18, o.limitY, z);
    const [c, dd] = obl(x + 18, o.limitY, z);
    s += dash(a, b, c, dd, SEC, 1.1);
  }
  return s;
}

/** Wheel disc in the table plane (axis vertical). */
function oblWheel(cx, z, rad, y = 12) {
  const [x, cy] = obl(cx, y, z);
  let s = `<ellipse cx="${r(x)}" cy="${r(cy)}" rx="${r(rad)}" ry="${r(rad * 0.38)}" fill="${PAPER}" stroke="${INK}" stroke-width="1.4"/>`;
  s += circ(x, cy, 2.2, { fill: INK, stroke: 'none' });
  return s;
}

/** ⊗ markers for uniform B on the table. */
function oblBField(x0, x1, z0, z1, gap = 16) {
  let s = '';
  for (let zz = z0; zz <= z1; zz += gap) {
    for (let xx = x0; xx <= x1; xx += gap) {
      const [a, b] = obl(xx, 3, zz);
      s += line(a - 3, b - 3, a + 3, b + 3, MUTED, 1);
      s += line(a - 3, b + 3, a + 3, b - 3, MUTED, 1);
    }
  }
  return s;
}

function chargeBall3d(cx, z, sign, rad = 14) {
  const col = sign === '−' || sign === '-' ? SEC : RAY;
  const glyph = sign === '-' ? '−' : sign;
  const [x, y] = obl(cx, 20, z);
  return circ(x, y, rad, { fill: PAPER, w: 1.7 }) + text(x, y + 5, glyph, { size: 15, bold: true, fill: col });
}

/** Low-friction dynamics cart on the table. */
function cart3d(x, z, w = 48, h = 20, d = 26) {
  let s = block3d(x, z, w, h, d);
  const wheel = (wx) => {
    const [px, py] = obl(wx, 0, z + d * 0.5);
    return `<ellipse cx="${r(px)}" cy="${r(py + 2)}" rx="5" ry="2.2" fill="${INK}" fill-opacity="0.35" stroke="${INK}" stroke-width="1.1"/>`;
  };
  s += wheel(x + 8);
  s += wheel(x + w - 8);
  return s;
}

/** Small graph card (screen-fixed inset beside apparatus). */
function graphCard(x, y, w, h, inner) {
  return box(x, y, w, h, { fill: '#faf8f4', w: 1.2 }) + inner;
}

function oblArrow3d(x1, y1, z1, x2, y2, z2, color = RAY, w = 1.6) {
  const [a, b] = obl(x1, y1, z1);
  const [c, d] = obl(x2, y2, z2);
  return arrow(a, b, c, d, color, w);
}

/** Tuning fork standing on the table. */
function fork3d(x, z, h = 28) {
  const w = 7;
  let s = oblPoly3([[x - w, 0, z - 3], [x + w, 0, z - 3], [x + w, h, z - 3], [x - w, h, z - 3]], { fill: PAPER, w: 1.3 });
  s += oblLine([x - w * 0.55, h, z], [x - w * 0.55, h + 20, z], INK, 1.5);
  s += oblLine([x + w * 0.55, h, z], [x + w * 0.55, h + 20, z], INK, 1.5);
  s += oblLine([x - w * 0.55, h + 20, z], [x - w * 0.55, h + 6, z + 5], INK, 1.4);
  s += oblLine([x + w * 0.55, h + 20, z], [x + w * 0.55, h + 6, z + 5], INK, 1.4);
  return s;
}

/** Vertical bar magnet lying on the table (long axis +x). */
function magnetBar3d(x, z, w, h, d, northOnRight) {
  const nFill = 'rgba(196,73,29,0.18)';
  const sFill = 'rgba(29,78,137,0.18)';
  const mid = x + w / 2;
  let s = oblPoly3([[x, 0, z], [mid, 0, z], [mid, h, z], [x, h, z]], { fill: northOnRight ? sFill : nFill, w: 1.2 });
  s += oblPoly3([[mid, 0, z], [x + w, 0, z], [x + w, h, z], [mid, h, z]], { fill: northOnRight ? nFill : sFill, w: 1.2 });
  s += oblPoly3([[x + w, 0, z], [x + w, 0, z + d], [x + w, h, z + d], [x + w, h, z]], { fill: '#e8e2d4', w: 1.1 });
  const nX = northOnRight ? x + w * 0.75 : x + w * 0.25;
  const sX = northOnRight ? x + w * 0.25 : x + w * 0.75;
  s += text(...obl(nX, h + 10, z + d / 2), 'N', { size: 13, bold: true, fill: RAY });
  s += text(...obl(sX, h + 10, z + d / 2), 'S', { size: 13, bold: true, fill: SEC });
  return s;
}

/** Solenoid coil stack on the table (loops in yz plane). */
function solenoid3d(x0, z, turns, gap, h = 22) {
  let s = '';
  for (let i = 0; i < turns; i++) {
    const cx = x0 + i * gap;
    const [ex, ey] = obl(cx, h / 2, z);
    s += `<ellipse cx="${r(ex)}" cy="${r(ey)}" rx="7" ry="${r(h * 0.42)}" fill="${PAPER}" stroke="${INK}" stroke-width="1.35"/>`;
  }
  return s;
}

/** Open-top thermometer on the table. */
function thermometer3d(x, z, frac, o = {}) {
  const h = 62;
  const bulb = 12;
  let s = oblPoly3([[x - 4, bulb, z], [x + 4, bulb, z], [x + 4, h, z], [x - 4, h, z]], { fill: PAPER, w: 1.4 });
  const colH = frac * (h - bulb - 4);
  if (colH > 2) {
    s += oblPoly3([[x - 2.5, bulb, z], [x + 2.5, bulb, z], [x + 2.5, bulb + colH, z], [x - 2.5, bulb + colH, z]], { fill: RAY, op: 0.5, stroke: 'none' });
  }
  const [bx, by] = obl(x, bulb * 0.5, z);
  s += circ(bx, by, 6, { fill: RAY, op: 0.35, w: 1.2 });
  for (let i = 0; i <= 4; i++) {
    const yy = bulb + 6 + i * ((h - bulb - 8) / 4);
    const [a, b] = obl(x + 4, yy, z);
    const [c, d] = obl(x + 10, yy, z);
    s += line(a, b, c, d, MUTED, 1);
  }
  if (o.label) s += text(...obl(x, h + 12, z), o.label, { size: 10, fill: MUTED });
  return s;
}

/** Ruler flat on the table. */
function ruler3d(x, z, len, d = 22) {
  let s = oblPoly3([[x, 0, z], [x + len, 0, z], [x + len, 4, z], [x, 4, z]], { fill: PAPER, w: 1.3 });
  s += oblPoly3([[x + len, 0, z], [x + len, 0, z + d], [x + len, 4, z + d], [x + len, 4, z]], { fill: '#f0ebe0', w: 1.1 });
  const div = len > 120 ? 20 : 16;
  for (let i = 0; i <= len; i += div) {
    const tick = i % (div * 2) === 0 ? 4 : 2.5;
    s += oblLine([x + i, 4, z], [x + i, 4 + tick, z], INK, 1);
  }
  return s;
}

function arrow(x1, y1, x2, y2, color = INK, w = 1.6) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1.5) return '';
  const ux = dx / len;
  const uy = dy / len;
  const ah = Math.min(9, len * 0.45);
  const bx = x2 - ux * ah;
  const by = y2 - uy * ah;
  const px = -uy;
  const py = ux;
  const s = 3.3;
  return line(x1, y1, bx, by, color, w) +
    `<polygon points="${r(x2)},${r(y2)} ${r(bx + px * s)},${r(by + py * s)} ${r(bx - px * s)},${r(by - py * s)}" fill="${color}"/>`;
}

/** Chevron sitting on a ray, the line itself runs end to end. */
function ray(x1, y1, x2, y2, color = RAY) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 2) return '';
  const t = 0.58;
  const mx = x1 + dx * t;
  const my = y1 + dy * t;
  const ux = dx / len;
  const uy = dy / len;
  const ah = 8;
  const bx = mx - ux * ah;
  const by = my - uy * ah;
  const px = -uy;
  const py = ux;
  const s = 3.1;
  return line(x1, y1, x2, y2, color, 1.5) +
    `<polygon points="${r(mx)},${r(my)} ${r(bx + px * s)},${r(by + py * s)} ${r(bx - px * s)},${r(by - py * s)}" fill="${color}"/>`;
}

function hDim(x1, x2, y, label, color = SEC) {
  const a = Math.min(x1, x2);
  const b = Math.max(x1, x2);
  // Label sits clearly above the rule so it never rides the stroke.
  if (b - a < 8) return text((a + b) / 2, y - 8, label, { size: 10, fill: color });
  return line(a, y, b, y, color, 1.1) +
    line(a, y - 3, a, y + 3, color, 1.1) +
    line(b, y - 3, b, y + 3, color, 1.1) +
    text((a + b) / 2, y - 8, label, { size: 10, fill: color });
}

function vDim(x, y1, y2, label, color = SEC) {
  const a = Math.min(y1, y2);
  const b = Math.max(y1, y2);
  return line(x, a, x, b, color, 1.1) +
    line(x - 3, a, x + 3, a, color, 1.1) +
    line(x - 3, b, x + 3, b, color, 1.1) +
    text(x + 8, (a + b) / 2 + 3, label, { anchor: 'start', size: 10, fill: color });
}

function ground(x1, x2, y) {
  let s = line(x1, y, x2, y, INK, 1.8);
  for (let x = x1; x < x2 - 2; x += 8) s += line(x, y, x - 5, y + 6, INK, 1.1);
  return s;
}

function hatchesH(x1, x2, y, down = true) {
  const s = down ? 1 : -1;
  let out = '';
  for (let x = x1 + 2; x < x2; x += 7) out += line(x, y, x - 4, y + 6 * s, INK, 1.1);
  return out;
}

function hatchesV(x, y1, y2, right = true) {
  const s = right ? 1 : -1;
  const a = Math.min(y1, y2);
  const b = Math.max(y1, y2);
  let out = '';
  for (let y = a + 2; y < b; y += 7) out += line(x, y, x + 6 * s, y + 4, INK, 1.1);
  return out;
}

function sinePts(x0, y, w, amp, cycles, phase = 0, n = 80) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push([x0 + t * w, y - amp * Math.sin(phase + t * cycles * Math.PI * 2)]);
  }
  return pts;
}

function axes(x, yTop, w, h) {
  const y0 = yTop + h;
  return arrow(x, y0, x, yTop, INK, 1.35) + arrow(x, y0, x + w, y0, INK, 1.35);
}

function axisLabels(x, yTop, w, h, xlab, ylab) {
  const y0 = yTop + h;
  return text(x + w + 2, y0 + 4, xlab, { anchor: 'start', size: 11, fill: MUTED }) +
    text(x - 2, yTop + 3, ylab, { anchor: 'end', size: 11, fill: SEC });
}

function crosses(x, y, w, h, gap, color = MUTED) {
  let s = '';
  for (let yy = y; yy <= y + h; yy += gap) {
    for (let xx = x; xx <= x + w; xx += gap) {
      s += line(xx - 2.4, yy - 2.4, xx + 2.4, yy + 2.4, color, 1) +
        line(xx - 2.4, yy + 2.4, xx + 2.4, yy - 2.4, color, 1);
    }
  }
  return s;
}

function dots(x, y, w, h, gap, color = MUTED) {
  let s = '';
  for (let yy = y; yy <= y + h; yy += gap) {
    for (let xx = x; xx <= x + w; xx += gap) s += circ(xx, yy, 1.3, { fill: color, stroke: 'none' });
  }
  return s;
}

function candle(x, base, flameY) {
  const bodyTop = Math.min(base - 16, flameY + 14);
  return box(x - 4, bodyTop, 8, base - bodyTop, { fill: PAPER }) +
    path(`M ${r(x)} ${r(flameY)} C ${r(x + 5)} ${r(flameY + 6)}, ${r(x + 3)} ${r(flameY + 12)}, ${r(x)} ${r(bodyTop)} C ${r(x - 3)} ${r(flameY + 12)}, ${r(x - 5)} ${r(flameY + 6)}, ${r(x)} ${r(flameY)}`, { stroke: RAY, fill: PAPER, w: 1.2 });
}

function objArrow(x, axis, h, up, color = INK) {
  if (up) return arrow(x, axis, x, axis - h, color, 1.8);
  return arrow(x, axis, x, axis + h, color, 1.8);
}

function convexLens(x, top, bot) {
  const mid = (top + bot) / 2;
  return path(`M ${r(x)} ${r(top)} Q ${r(x + 10)} ${r(mid)} ${r(x)} ${r(bot)} Q ${r(x - 10)} ${r(mid)} ${r(x)} ${r(top)} Z`, { fill: PAPER, w: 1.7 }) +
    `<polygon points="${r(x)},${r(top - 1)} ${r(x - 4)},${r(top + 7)} ${r(x + 4)},${r(top + 7)}" fill="${INK}"/>` +
    `<polygon points="${r(x)},${r(bot + 1)} ${r(x - 4)},${r(bot - 7)} ${r(x + 4)},${r(bot - 7)}" fill="${INK}"/>`;
}

function concaveLens(x, top, bot) {
  const mid = (top + bot) / 2;
  return path(`M ${r(x - 8)} ${r(top)} Q ${r(x + 1)} ${r(mid)} ${r(x - 8)} ${r(bot)}`, { w: 1.7 }) +
    path(`M ${r(x + 8)} ${r(top)} Q ${r(x - 1)} ${r(mid)} ${r(x + 8)} ${r(bot)}`, { w: 1.7 }) +
    `<polygon points="${r(x)},${r(top + 8)} ${r(x - 4)},${r(top)} ${r(x + 4)},${r(top)}" fill="${INK}"/>` +
    `<polygon points="${r(x)},${r(bot - 8)} ${r(x - 4)},${r(bot)} ${r(x + 4)},${r(bot)}" fill="${INK}"/>`;
}

function screenPlate(x, top, bot) {
  return box(x, top, 8, bot - top, { fill: '#f3efe4' }) +
    hatchesV(x + 8, top, bot, true);
}

function bench(y) {
  return line(28, y, 300, y, INK, 1.8) +
    poly([[36, y], [28, y + 8], [44, y + 8]], { fill: PAPER }) +
    poly([[284, y], [276, y + 8], [292, y + 8]], { fill: PAPER });
}

function beaker(x, y, w, h, level) {
  const lip = 6;
  let s = path(`M ${r(x)} ${r(y)} L ${r(x)} ${r(y + h)} L ${r(x + w)} ${r(y + h)} L ${r(x + w)} ${r(y)}`, { w: 1.6 });
  s += line(x - 2, y, x + lip, y, INK, 1.4) + line(x + w - lip, y, x + w + 2, y, INK, 1.4);
  if (level != null) {
    const ly = y + h - level;
    s += box(x + 1.2, ly, w - 2.4, y + h - ly - 1.2, { fill: SEC, op: 0.14, stroke: 'none' });
    s += line(x + 1, ly, x + w - 1, ly, SEC, 1.3);
  }
  return s;
}

function cylinder(x, y, w, h, level) {
  let s = path(`M ${r(x)} ${r(y)} L ${r(x)} ${r(y + h)} Q ${r(x + w / 2)} ${r(y + h + 8)} ${r(x + w)} ${r(y + h)} L ${r(x + w)} ${r(y)}`, { w: 1.5 });
  for (let i = 1; i <= 5; i++) {
    const ty = y + h - i * (h / 6);
    s += line(x + w - 8, ty, x + w - 1, ty, MUTED, 1);
  }
  if (level != null) {
    const ly = y + h - level;
    s += box(x + 1.2, ly, w - 2.4, y + h - ly, { fill: SEC, op: 0.18, stroke: 'none' });
    s += line(x + 1, ly, x + w - 1, ly, SEC, 1.3);
  }
  return s;
}

function springV(x, y1, y2, amp = 7, turns = 7) {
  const n = turns;
  const dy = (y2 - y1) / n;
  let d = `M ${r(x)} ${r(y1)}`;
  for (let i = 0; i < n; i++) {
    const y = y1 + dy * i;
    const side = i % 2 === 0 ? amp : -amp;
    d += ` Q ${r(x + side)} ${r(y + dy * 0.5)} ${r(x)} ${r(y + dy)}`;
  }
  return path(d, { w: 1.5 });
}

function block(x, y, w, h, o = {}) {
  return box(x, y, w, h, { fill: PAPER, ...o });
}

function cellH(x, y) {
  return line(x, y - 8, x, y + 8, INK, 1.2) + line(x + 6, y - 14, x + 6, y + 14, INK, 2.4);
}

function resistorH(x, y, w) {
  return box(x, y - 7, w, 14, { fill: PAPER });
}

function switchH(x, y, closed) {
  if (closed) return circ(x, y, 1.6, { fill: INK }) + line(x, y, x + 28, y, INK, 1.6) + circ(x + 28, y, 1.6, { fill: INK });
  return circ(x, y, 1.6, { fill: INK }) + line(x, y, x + 24, y - 12, INK, 1.6) + circ(x + 28, y, 1.6, { fill: INK });
}

function lampH(x, y) {
  return circ(x, y, 10, { fill: PAPER }) + line(x - 6, y - 6, x + 6, y + 6, INK, 1.2) + line(x - 6, y + 6, x + 6, y - 6, INK, 1.2);
}

function meterH(x, y, letter) {
  return circ(x, y, 11, { fill: PAPER }) + text(x, y + 4, letter, { size: 11, bold: true });
}

/** @param {number} pos 0..1 slider along the rectangle */
function rheostatH(x, y, w, pos) {
  const sx = x + 8 + pos * (w - 16);
  return box(x, y - 7, w, 14, { fill: PAPER }) +
    line(sx, y - 16, sx, y - 7, INK, 1.3) +
    arrow(sx - 8, y - 16, sx + 6, y - 7, INK, 1.2);
}

function wheel(cx, cy, rad) {
  return circ(cx, cy, rad, { fill: PAPER }) + circ(cx, cy, 2, { fill: INK, stroke: 'none' });
}

function magnetBar(x, y, w, h, northOnRight) {
  const mid = x + w / 2;
  const nFill = 'rgba(196,73,29,0.14)';
  const sFill = 'rgba(29,78,137,0.14)';
  let s = box(x, y, w / 2, h, { fill: northOnRight ? sFill : nFill, stroke: 'none' });
  s += box(mid, y, w / 2, h, { fill: northOnRight ? nFill : sFill, stroke: 'none' });
  s += box(x, y, w, h, { fill: 'none' });
  s += line(mid, y, mid, y + h, INK, 1);
  const nX = northOnRight ? x + w * 0.75 : x + w * 0.25;
  const sX = northOnRight ? x + w * 0.25 : x + w * 0.75;
  s += text(nX, y + h / 2 + 4, 'N', { size: 13, bold: true, fill: RAY });
  s += text(sX, y + h / 2 + 4, 'S', { size: 13, bold: true, fill: SEC });
  return s;
}

function fork(x, y) {
  return path(`M ${r(x - 10)} ${r(y)} L ${r(x - 10)} ${r(y + 28)} Q ${r(x)} ${r(y + 40)} ${r(x + 10)} ${r(y + 28)} L ${r(x + 10)} ${r(y)}`, { w: 1.7 }) +
    line(x, y + 36, x, y + 52, INK, 1.7);
}

function piston(x, y, w, h, top) {
  return path(`M ${r(x)} ${r(y)} L ${r(x)} ${r(y + h)} L ${r(x + w)} ${r(y + h)} L ${r(x + w)} ${r(y)}`, { w: 1.6 }) +
    box(x - 4, top, w + 8, 8, { fill: PAPER }) +
    line(x + w / 2, top - 16, x + w / 2, top, INK, 1.6);
}

function massRect(x, y, w, h, label) {
  return block(x, y, w, h) + text(x + w / 2, y + h / 2 + 4, label, { size: 11 });
}

function pendulum(cx, y0, len, angDeg, bob = 7) {
  const a = (angDeg * Math.PI) / 180;
  const x = cx + Math.sin(a) * len;
  const y = y0 + Math.cos(a) * len;
  return line(cx - 16, y0, cx + 16, y0, INK, 1.8) +
    line(cx, y0, x, y, INK, 1.4) +
    circ(x, y, bob, { fill: PAPER });
}

function utube(x, y, w, h, hL, hR, shadeL = true) {
  const t = 8;
  const left = x;
  const right = x + w;
  const bot = y + h;
  let s = path(
    `M ${r(left)} ${r(y)} L ${r(left)} ${r(bot)} L ${r(right)} ${r(bot)} L ${r(right)} ${r(y)} ` +
    `M ${r(left + t)} ${r(y)} L ${r(left + t)} ${r(bot - t)} L ${r(right - t)} ${r(bot - t)} L ${r(right - t)} ${r(y)}`,
    { w: 1.5 },
  );
  const yL = bot - t - hL;
  const yR = bot - t - hR;
  s += box(left + 1.4, yL, t - 2.2, hL, { fill: SEC, op: shadeL ? 0.2 : 0.1, stroke: 'none' });
  s += box(right - t + 0.8, yR, t - 2.2, hR, { fill: RAY, op: 0.16, stroke: 'none' });
  s += line(left + 1, yL, left + t - 1, yL, SEC, 1.3);
  s += line(right - t + 1, yR, right - 1, yR, RAY, 1.3);
  return s;
}

function eyeShell(cx, cy) {
  return path(
    `M ${r(cx - 78)} ${r(cy)} Q ${r(cx)} ${r(cy - 34)} ${r(cx + 78)} ${r(cy)} Q ${r(cx)} ${r(cy + 34)} ${r(cx - 78)} ${r(cy)}`,
    { fill: PAPER, w: 1.6 },
  ) + dash(cx + 48, cy - 26, cx + 48, cy + 26, MUTED, 1.2);
}

function fTick(x, axis, label, below = false) {
  return line(x, axis - 5, x, axis + 5, MUTED, 1.2) +
    text(x, below ? axis + 16 : axis - 8, label, { size: 10, fill: MUTED });
}

/* ---------- optics ---------- */

function drawConvex(lang, step) {
  // Optical bench in oblique view: candle · lens · screen (textbook light-bench lab).
  const cases = {
    '-1': { title: ['光具座共轴', 'Coaxial bench'], cap: ['烛焰、光心、屏心等高', 'Flame, centre, and screen coaxial'], u: 70, v: 90, f: 40, prep: true },
    0: { title: ['u > 2f', 'u > 2f'], cap: ['倒立缩小实像', 'Inverted diminished real'], u: 100, f: 36 },
    1: { title: ['u = 2f', 'u = 2f'], cap: ['倒立等大实像', 'Inverted same-size real'], u: 80, f: 40 },
    2: { title: ['f < u < 2f', 'f < u < 2f'], cap: ['倒立放大实像', 'Inverted magnified real'], u: 56, f: 40 },
    3: { title: ['u ≈ f', 'u ≈ f'], cap: ['屏上无清晰实像', 'No sharp real image'], u: 40, f: 40, atFocus: true },
    4: { title: ['u < f', 'u < f'], cap: ['正立放大虚像', 'Erect magnified virtual'], u: 28, f: 48, virtual: true },
    5: { title: ['薄透镜方程', 'Thin-lens equation'], cap: ['1/u + 1/v = 1/f', '1/u + 1/v = 1/f'], u: 88, f: 38, law: true },
  };
  const c = cases[step];
  const z = 38;
  const lensX = 96;
  // Keep candle · lens · screen on the board with clear gaps.
  const u = Math.min(c.u, 52);
  const objX = Math.max(24, lensX - u);
  let v = c.v;
  if (v == null && !c.atFocus && !c.virtual) {
    const inv = 1 / c.f - 1 / Math.max(u, 1);
    v = inv > 0.001 ? 1 / inv : 70;
  }
  const scrX = Math.min(186, c.virtual || c.atFocus ? lensX + 72 : lensX + Math.min(v, 72));
  let body = tableBoard(210, 70);
  body += oblPoly3([[20, 2, z - 5], [190, 2, z - 5], [190, 2, z + 5], [20, 2, z + 5]], { fill: '#d8d2c6', w: 1.2 });
  body += candle3d(objX, z, { h: 24, lit: true, label: L(lang, '物', 'Obj') });
  body += lensOnStand(lensX, z, 52);
  body += text(...obl(lensX, 60, z), L(lang, '透镜', 'Lens'), { size: 10 });
  if (!c.virtual) {
    body += screenOnStand(scrX, z, c.atFocus ? 42 : 46);
    body += text(...obl(scrX + 12, 56, z), c.atFocus ? L(lang, '无实像', 'no image') : L(lang, '光屏', 'Screen'), {
      anchor: 'start', size: 10, fill: c.atFocus ? RAY : SEC,
    });
  } else {
    body += screenOnStand(scrX, z, 42);
    body += text(...obl(objX - 4, 48, z), L(lang, '虚像', 'virtual'), { size: 11, fill: SEC });
  }
  body += dimFront(objX, lensX, 'u');
  if (!c.atFocus && !c.virtual) body += dimFront(lensX, scrX, 'v', SEC);
  if (c.law) body += dimFront(lensX, lensX + Math.min(c.f, 36), 'f', RAY);
  if (c.prep) body += oblLine([objX, 34, z], [scrX, 34, z], SEC, 1.1, '4 3');
  return panel(lang, c.title[0], c.title[1], c.cap[0], c.cap[1], body);
}

function drawPinhole(lang, step) {
  // Candle · pinhole card · screen on the optical bench (oblique).
  const specs = {
    '-1': { u: 70, v: 70, d: 6, title: ['小孔成像', 'Pinhole'], cap: ['物、小孔、光屏', 'Object, hole, screen'], ideal: true },
    0: { u: 64, v: 72, d: 5, title: ['倒立的像', 'Inverted image'], cap: ['相似三角形', 'Similar triangles'], ideal: true },
    1: { u: 60, v: 64, d: 14, title: ['光斑直径', 'Spot diameter'], cap: ['d (u+v) / u', 'd (u+v) / u'] },
    2: { u: 60, v: 64, d: 5, title: ['孔径变小', 'Smaller hole'], cap: ['光斑变小', 'Spot shrinks'] },
    3: { u: 96, v: 56, d: 14, title: ['物距变大', 'Larger u'], cap: ['同一孔径光斑变小', 'Spot shrinks for fixed d'] },
    4: { u: 52, v: 96, d: 14, title: ['屏距变大', 'Larger v'], cap: ['光斑变大', 'Spot grows'] },
  };
  const c = specs[step];
  const z = 40;
  const plateX = 100;
  const objX = Math.max(16, plateX - Math.min(c.u, 70));
  const scrX = Math.min(200, plateX + Math.min(c.v, 90));
  let body = tableBoard(220, 72);
  body += oblPoly3([[14, 2, z - 6], [206, 2, z - 6], [206, 2, z + 6], [14, 2, z + 6]], { fill: '#d8d2c6', w: 1.2 });
  body += candle3d(objX, z, { h: 24, lit: true, label: L(lang, '物', 'Obj') });
  body += pinholeCard(plateX, z - 18, z + 18, 64, Math.max(3, c.d / 2));
  body += text(...obl(plateX, 70, z), 'd', { size: 10, fill: MUTED });
  body += screenOnStand(scrX, z, 48);
  body += text(...obl(scrX + 10, 60, z), c.ideal ? L(lang, '像', 'Img') : L(lang, '光斑', 'spot'), {
    anchor: 'start', size: 10, fill: SEC,
  });
  body += oblLine([objX, 36, z], [plateX, 32, z], RAY, 1.3);
  body += oblLine([plateX, 32, z], [scrX, c.ideal ? 22 : 36, z], RAY, 1.3);
  body += dimFront(objX, plateX, 'u');
  body += dimFront(plateX, scrX, 'v', SEC);
  return panel(lang, c.title[0], c.title[1], c.cap[0], c.cap[1], body);
}

function drawReflection(lang, step) {
  // Vertical mirror plate on the table + incident / reflected rays (lab protractor setup).
  const steps = {
    '-1': { th: 42, title: ['光的反射', 'Reflection'], cap: ['入射光线、法线、反射光线', 'Incident ray, normal, reflected ray'] },
    0: { th: 40, title: ['入射角 = 反射角', 'i = r'], cap: ['两角相等', 'The angles match'] },
    1: { th: 0, title: ['沿法线入射', 'Along the normal'], cap: ['原路返回', 'Returns on itself'] },
    2: { th: 62, title: ['入射角变大', 'Larger angle'], cap: ['反射角一起变大', 'Reflected angle follows'] },
    3: { th: 48, title: ['不要量镜面夹角', 'Not the mirror angle'], cap: ['90°−θ 不是反射定律的角', '90°−θ is not the law angle'], glancing: true },
    4: { th: 55, title: ['再核一次', 'Check again'], cap: ['另一条光线仍是 i = r', 'Another ray still has i = r'], second: true },
  };
  const c = steps[step];
  const mx = 118;
  const z = 40;
  const hitY = 34;
  const th = (c.th * Math.PI) / 180;
  const len = 58;
  let body = tableBoard(210, 70);
  body += glassPlate(mx, 24, 56, 66);
  body += clampBlock(mx, 26, '');
  body += clampBlock(mx, 54, '');
  body += oblLine([mx, hitY, z], [mx - 48, hitY, z], MUTED, 1.1, '4 3');
  body += text(...obl(mx - 56, hitY + 10, z), L(lang, '法线', 'N'), { size: 10, fill: MUTED });
  if (c.th < 1) {
    body += oblLine([mx - 50, hitY, z], [mx, hitY, z], RAY, 1.5);
    body += text(...obl(mx - 36, hitY + 14, z), 'θ = 0', { size: 11, fill: RAY });
  } else {
    const ix = mx - Math.cos(th) * len;
    const iy = hitY + Math.sin(th) * len * 0.5;
    const rx = mx - Math.cos(th) * len;
    const ry = hitY - Math.sin(th) * len * 0.5;
    body += ray(...obl(ix, iy, z), ...obl(mx, hitY, z), RAY);
    body += ray(...obl(mx, hitY, z), ...obl(rx, ry, z), RAY);
    body += text(...obl(mx - 26, hitY + 16, z), 'θ', { size: 12, fill: RAY });
    body += text(...obl(mx - 26, hitY - 12, z), 'θ', { size: 12, fill: RAY });
  }
  if (c.glancing) body += text(...obl(40, 12, z), '90°−θ', { size: 10, fill: MUTED });
  if (c.second) {
    const th2 = (28 * Math.PI) / 180;
    body += oblLine([mx - Math.cos(th2) * 44, hitY + Math.sin(th2) * 22, z], [mx, hitY, z], SEC, 1.25);
    body += oblLine([mx, hitY, z], [mx - Math.cos(th2) * 44, hitY - Math.sin(th2) * 22, z], SEC, 1.25);
  }
  body += text(...obl(mx + 12, 8, z), L(lang, '镜面', 'mirror'), { anchor: 'start', size: 10, fill: MUTED });
  return panel(lang, c.title[0], c.title[1], c.cap[0], c.cap[1], body);
}

function drawPlaneMirror(lang, step) {
  // Textbook: A (lit) | glass | ghost in plate | B (match). Clear gaps, dims on apron.
  const specs = {
    '-1': { d: 50, h: 30, title: ['探究平面镜成像', 'Plane-mirror imaging'], cap: ['玻璃板、蜡烛 A 与 B', 'Glass plate, candles A and B'] },
    0: { d: 46, h: 28, title: ['像距 = 物距', 'Image distance = object'], cap: ['A、像、B 到板等远', 'A, image, and B are equidistant'] },
    1: { d: 46, h: 38, title: ['像高 = 物高', 'Same height'], cap: ['换更高的蜡烛，B 仍重合', 'Taller candle; B still coincides'] },
    2: { d: 46, h: 28, title: ['左右对调', 'Left-right swap'], cap: ['正立，左右与物对调', 'Erect, left and right swapped'], hands: true },
    3: { d: 46, h: 28, title: ['光屏接不到', 'Screen misses it'], cap: ['镜后是虚像，屏上无像', 'Virtual; nothing on a screen'], screen: true },
    4: { d: 70, h: 28, title: ['物距加倍', 'Double the distance'], cap: ['像退后同样距离', 'Image retreats the same distance'] },
  };
  const c = specs[step];
  const gx = 100;
  const z0 = 26;
  const z1 = 54;
  const z = 40;
  const aX = Math.max(22, gx - c.d);
  const bX = Math.min(190, gx + (gx - aX));
  let body = tableBoard(210, 70);
  // Image is behind the glass at bX; B coincides with it when matched.
  if (c.screen) {
    body += candle3d(bX, z, { h: c.h, lit: false, ghost: true });
  } else {
    body += candle3d(bX, z, { h: c.h, lit: false, label: 'B' });
    if (step === -1 || step === 0) {
      body += arrow(...obl(bX + 18, c.h * 0.5, z), ...obl(bX + 6, c.h * 0.5, z), SEC, 1.35);
    }
  }
  body += glassPlate(gx, z0, z1, 68);
  body += clampBlock(gx, z0 + 2, '');
  body += clampBlock(gx, z1 - 2, '');
  body += candle3d(aX, z, { h: c.h, lit: true, label: 'A', thin: c.hands });
  if (c.hands) {
    body += text(...obl(aX - 10, c.h + 8, z), 'L', { size: 10, fill: RAY });
    body += text(...obl(aX + 10, c.h + 8, z), 'R', { size: 10, fill: SEC });
    body += text(...obl(bX - 10, c.h + 8, z), 'R', { size: 10, fill: SEC });
    body += text(...obl(bX + 10, c.h + 8, z), 'L', { size: 10, fill: RAY });
  }
  if (c.screen) {
    body += screenOnStand(Math.min(bX + 20, 188), z, 46);
    body += text(...obl(Math.min(bX + 34, 198), 58, z), L(lang, '屏上无像', 'no image'), {
      anchor: 'start', size: 10, fill: MUTED,
    });
  }
  body += dimFront(aX, gx, L(lang, '物距', 'd'));
  if (!c.screen) body += dimFront(gx, bX, L(lang, '像距', 'd'), SEC);
  return panel(lang, c.title[0], c.title[1], c.cap[0], c.cap[1], body);
}

function drawRefraction(lang, step) {
  // Semicircular glass block on the table (junior refraction / TIR lab).
  const specs = {
    '-1': { n1: 1, n2: 1.5, th: 40, title: ['光的折射', 'Refraction'], cap: ['界面、法线、两种介质', 'Interface, normal, two media'] },
    0: { n1: 1.33, n2: 1.33, th: 38, title: ['n₁ = n₂', 'n1 = n2'], cap: ['不偏折，θ₂ = θ₁', 'No bend, θ2 = θ1'] },
    1: { n1: 1, n2: 1.5, th: 48, title: ['折向法线', 'Toward the normal'], cap: ['n₂ > n₁，θ₂ < θ₁', 'n2 > n1, so θ2 < θ1'] },
    2: { n1: 1.5, n2: 1, th: 28, title: ['偏离法线', 'Away from the normal'], cap: ['n₁ sin θ₁ = n₂ sin θ₂', 'n1 sin θ1 = n2 sin θ2'] },
    3: { n1: 1.5, n2: 1, th: 62, title: ['全反射', 'Total reflection'], cap: ['超过临界角，折射消失', 'Past the critical angle, no refraction'], tir: true },
    4: { n1: 1.5, n2: 1, th: 41.8, title: ['临界角附近', 'Near the critical angle'], cap: ['折射光线贴着界面', 'Refracted ray grazes the surface'], crit: true },
  };
  const c = specs[step];
  const z = 48;
  const cx = 120;
  const th = (c.th * Math.PI) / 180;
  const s2raw = (c.n1 / c.n2) * Math.sin(th);
  const tir = c.tir || (!c.crit && s2raw >= 0.999);
  const s2 = Math.min(1, s2raw);
  let body = tableBoard(220, 72);
  // Flat face of the glass semicircle (interface).
  body += glassPlate(cx, 20, 76, 70);
  body += clampBlock(cx, 26, '');
  body += clampBlock(cx, 70, '');
  // Curved body cue (semicircle depth).
  const [ex, ey] = obl(cx + 40, 35, z);
  body += `<ellipse cx="${r(ex)}" cy="${r(ey)}" rx="36" ry="28" fill="rgba(160,190,210,0.18)" stroke="${INK}" stroke-width="1.3"/>`;
  body += text(...obl(40, 60, z), `n₁=${c.n1}`, { size: 10, fill: MUTED });
  body += text(...obl(cx + 20, 60, z), `n₂=${c.n2}`, { size: 10, fill: SEC });
  const hitY = 36;
  body += oblLine([cx, hitY, z], [cx - 48, hitY, z], MUTED, 1.1, '4 3');
  body += text(...obl(cx - 52, hitY + 8, z), L(lang, '法线', 'N'), { size: 10, fill: MUTED });
  const ix = cx - Math.cos(th) * 55;
  const iy = hitY + Math.sin(th) * 30;
  const [a1, b1] = obl(ix, iy, z);
  const [a2, b2] = obl(cx, hitY, z);
  body += ray(a1, b1, a2, b2, RAY);
  if (!tir) {
    const th2 = Math.asin(s2);
    const ox = cx + Math.cos(th2) * 50;
    const oy = hitY + Math.sin(th2) * 28;
    const [a3, b3] = obl(ox, oy, z);
    body += ray(a2, b2, a3, b3, RAY);
    body += text(...obl(cx - 24, hitY + 16, z), 'θ₁', { size: 11, fill: RAY });
    body += text(...obl(cx + 18, hitY + 16, z), c.crit ? '90°' : 'θ₂', { size: 11, fill: RAY });
  } else {
    const rx = cx - Math.cos(th) * 55;
    const ry = hitY - Math.sin(th) * 30;
    const [a3, b3] = obl(rx, ry, z);
    body += ray(a2, b2, a3, b3, RAY);
    body += text(...obl(cx - 40, hitY - 12, z), L(lang, '仅反射', 'reflect only'), { size: 10, fill: RAY });
  }
  return panel(lang, c.title[0], c.title[1], c.cap[0], c.cap[1], body, H3);
}

function drawVision(lang, step) {
  const titles = {
    '-1': [['近视与远视', 'Myopia and hyperopia'], ['透镜帮助像落在视网膜上', 'A lens puts the image on the retina']],
    0: [['近视 · 远物', 'Myopia, distant object'], ['凹透镜把像拉回视网膜，f = −D', 'Diverging lens puts the image on the retina, f = −D']],
    1: [['远点更近', 'Nearer far point'], ['|f| 更小，凹透镜更“弯”', 'Smaller |f|, stronger diverging lens']],
    2: [['近视 · 有限物距', 'Myopia, finite u'], ['1/u + 1/(−D) = 1/f', '1/u + 1/(−D) = 1/f']],
    3: [['远视', 'Hyperopia'], ['凸透镜把像送到视网膜，1/u + 1/(−N) = 1/f', 'Converging lens; 1/u + 1/(−N) = 1/f']],
    4: [['近点改变', 'Near point changes'], ['f > 0，这片不是整个眼球', 'f > 0; the lens is not the whole eye']],
  };
  const [title, cap] = titles[step];
  const z = 44;
  const far = step === 1;
  const hyper = step === 3 || step === 4;
  let body = tableBoard(220, 72);
  body += oblPoly3([[18, 2, z - 10], [206, 2, z - 10], [206, 2, z + 10], [18, 2, z + 10]], { fill: '#d8d2c6', w: 1.2 });
  if (step === -1) {
    body += lensOnStand(70, z, 48);
    body += text(...obl(70, 58, z), L(lang, '凹', 'div'), { size: 10, fill: SEC });
    body += lensOnStand(120, z, 48);
    body += text(...obl(120, 58, z), L(lang, '凸', 'conv'), { size: 10, fill: RAY });
    body += oblPoly3([[168, 14, z - 16], [168, 14, z + 16], [168, 46, z + 16], [168, 46, z - 16]], { fill: '#f3efe4', w: 1.4 });
    body += text(...obl(188, 30, z), L(lang, '眼', 'eye'), { size: 10, fill: MUTED });
    return panel(lang, title[0], title[1], cap[0], cap[1], body);
  }
  const lensX = hyper ? 62 : 58;
  body += lensOnStand(lensX, z, 50);
  body += text(...obl(lensX, 58, z), hyper ? L(lang, '凸透镜', 'convex') : (far ? L(lang, '度数更高', 'stronger') : L(lang, '凹透镜', 'concave')), { size: 10, fill: hyper ? RAY : SEC });
  body += oblPoly3([[152, 16, z - 18], [152, 16, z + 18], [152, 48, z + 18], [152, 48, z - 18]], { fill: '#f3efe4', w: 1.4 });
  const [retX, retY] = obl(162, 22, z);
  body += circ(retX, retY, 2.4, { fill: RAY, stroke: 'none' });
  body += text(...obl(178, 32, z), L(lang, '视网膜', 'retina'), { anchor: 'start', size: 9, fill: MUTED });
  const [ox1, oy1] = obl(24, 28, z);
  const [ix1, iy1] = obl(lensX - 8, 28, z);
  body += ray(ox1, oy1 - 6, ix1, iy1 - 6, RAY);
  body += ray(ox1, oy1 + 6, ix1, iy1 + 6, RAY);
  const [ret2x, ret2y] = obl(162, 32, z);
  const [lx, ly] = obl(lensX + 8, 32, z);
  body += ray(lx, ly - 6, ret2x, ret2y, RAY);
  body += ray(lx, ly + 6, ret2x, ret2y, RAY);
  if (hyper) {
    if (step === 4) body += text(...obl(120, 16, z), L(lang, '近点', 'near'), { size: 10, fill: SEC });
    else if (step !== 2) body += text(...obl(108, 8, z), 'N', { size: 11, fill: SEC });
  } else {
    if (step === 2) body += text(...obl(30, 36, z), 'u', { size: 11, fill: SEC });
    else body += text(...obl(24, 42, z), L(lang, '远物', 'far'), { size: 10, fill: MUTED });
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body);
}

function rotPoint(x, y, cx, cy, deg) {
  const a = (deg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [cx + dx * c - dy * s, cy + dx * s + dy * c];
}

function drawLever(lang, step) {
  const spec = {
    '-1': { tilt: 0, l1: 70, l2: 70, f1: 18, f2: 18, title: ['杠杆', 'Lever'], cap: ['支点、动力、阻力、力臂', 'Pivot, effort, load, arms'] },
    0: { tilt: 0, l1: 68, l2: 68, f1: 20, f2: 20, title: ['力矩平衡', 'Moments balance'], cap: ['F₁L₁ = F₂L₂', 'F1 L1 = F2 L2'] },
    1: { tilt: -10, l1: 96, l2: 48, f1: 18, f2: 18, title: ['加长 L₁', 'Longer L1'], cap: ['向左侧转动', 'Turns to the left'] },
    2: { tilt: 0, l1: 96, l2: 48, f1: 16, f2: 32, title: ['加大 F₂', 'Larger F2'], cap: ['重新平衡', 'Balanced again'] },
    3: { tilt: 0, l1: 88, l2: 44, f1: 16, f2: 32, title: ['L₂ 减半', 'Half L2'], cap: ['F₂ 约为两倍', 'F2 about twice'] },
    4: { tilt: 0, l1: 64, l2: 64, f1: 28, f2: 28, title: ['同比增大', 'Scaled together'], cap: ['两边同倍，仍平衡', 'Same factor, still level'] },
  }[step];
  const cx = 120;
  const z = 48;
  const beamY = 16;
  const tiltRad = (spec.tilt * Math.PI) / 180;
  const yL = beamY + Math.sin(tiltRad) * spec.l1;
  const yR = beamY - Math.sin(tiltRad) * spec.l2;
  let body = tableBoard(220, 72);
  body += fulcrum3d(cx, z);
  body += oblLine([cx - spec.l1, yL, z], [cx + spec.l2, yR, z], INK, 3);
  // Hung masses.
  body += block3d(cx - spec.l1 - 8, z - 6, 16, 10 + spec.f1 * 0.35, 12, { y0: Math.max(0, yL - 4 - spec.f1 * 0.35) });
  body += block3d(cx + spec.l2 - 8, z - 6, 16, 10 + spec.f2 * 0.35, 12, { y0: Math.max(0, yR - 4 - spec.f2 * 0.35) });
  const [f1x, f1y] = obl(cx - spec.l1, yL + 18, z);
  const [f2x, f2y] = obl(cx + spec.l2, yR + 18, z);
  body += text(f1x, f1y, 'F₁', { size: 12, fill: RAY });
  body += text(f2x, f2y, 'F₂', { size: 12, fill: SEC });
  body += text(...obl((cx - spec.l1 + cx) / 2, beamY + 14, z), 'L₁', { size: 11, fill: RAY });
  body += text(...obl((cx + spec.l2 + cx) / 2, beamY + 14, z), 'L₂', { size: 11, fill: SEC });
  body += text(...obl(cx, -2, z), L(lang, '支点', 'pivot'), { size: 10, fill: MUTED });
  return panel(lang, spec.title[0], spec.title[1], spec.cap[0], spec.cap[1], body, H3);
}

function drawPulley(lang, step) {
  const n = step === 4 ? 4 : 2;
  const ideal = step === 3;
  const showTravel = step === 1 || step === 4;
  const titles = {
    '-1': [['滑轮组', 'Block and tackle'], ['段数 n、物重 G、动滑轮重 Gp', 'Strands n, load G, pulley weight Gp']],
    0: [['省力', 'Force'], ['F = (G + Gp) / n', 'F = (G + Gp) / n']],
    1: [['绳端与升高', 'Rope and rise'], ['s = n h', 's = n h']],
    2: [['效率', 'Efficiency'], ['η = Gh / (Fs) < 1', 'η = Gh / (Fs) < 1']],
    3: [['理想滑轮', 'Ideal pulley'], ['Gp = 0，F = G/n，η = 1', 'Gp = 0, F = G/n, η = 1']],
    4: [['增加段数', 'More strands'], ['更省力，绳端移动更远', 'Less force, more rope travel']],
  };
  const [title, cap] = titles[step];
  const z = 44;
  let body = tableBoard(220, 72);
  body += oblLine([22, 66, z], [198, 66, z], INK, 2.2);
  body += oblLine([22, 66, z], [18, 62, z], INK, 1.2);
  body += oblLine([198, 66, z], [206, 62, z], INK, 1.2);
  if (n === 2) {
    body += oblWheel(114, z, 14, 52);
    body += oblWheel(114, z, 14, 26);
    body += oblPathPts(
      [[40, 66, z], [40, 10, z], [114, 10, z], [114, 26, z], [150, 26, z], [150, 52, z], [186, 52, z], [198, 38, z]],
      { stroke: RAY, w: 1.45 },
    );
    body += oblArrow3d(198, 42, z, 198, 18, z, RAY, 1.5);
    body += text(...obl(210, 28, z), 'F', { anchor: 'start', size: 13, fill: RAY });
    body += block3d(100, z - 8, 28, 10, 14, { y0: 8, label: ideal ? 'G' : 'G+Gp' });
  } else {
    body += oblWheel(96, z, 11, 50);
    body += oblWheel(148, z, 11, 50);
    body += oblWheel(96, z, 11, 22);
    body += oblWheel(148, z, 11, 22);
    body += oblLine([76, 66, z], [76, 22, z], RAY, 1.35);
    body += oblLine([108, 38, z], [108, 30, z], RAY, 1.35);
    body += oblLine([136, 38, z], [136, 30, z], RAY, 1.35);
    body += oblLine([168, 38, z], [168, 12, z], RAY, 1.35);
    body += oblArrow3d(168, 18, z, 168, 4, z, RAY, 1.5);
    body += text(...obl(180, 8, z), 'F', { anchor: 'start', size: 13, fill: RAY });
    body += oblLine([100, 12, z], [166, 12, z], INK, 1.4);
    body += block3d(108, z - 8, 48, 10, 14, { y0: 8, label: 'G' });
    body += text(...obl(48, 42, z), 'n=4', { size: 11, fill: SEC });
  }
  if (showTravel && n === 2) {
    const [a, ay] = obl(196, 20, z);
    const [b, by] = obl(196, 52, z);
    body += vDim(a, ay, by, 's', RAY);
    const [c, cy] = obl(92, 20, z);
    const [d, dy] = obl(92, 8, z);
    body += vDim(c, cy, dy, 'h', SEC);
  }
  if (step === 2) body += text(...obl(200, 58, z), 'η<1', { anchor: 'start', size: 12, fill: SEC });
  if (ideal) body += text(...obl(200, 58, z), 'η=1', { anchor: 'start', size: 12, fill: SEC });
  if (step === 0) body += text(...obl(200, 52, z), 'n=2', { anchor: 'start', size: 11, fill: MUTED });
  return panel(lang, title[0], title[1], cap[0], cap[1], body);
}

function drawSpring(lang, step) {
  const titles = {
    '-1': [['弹簧测力计', 'Spring scale'], ['弹簧、挂钩、刻度', 'Spring, hook, scale']],
    0: [['限度以内', 'Within the limit'], ['F = kx', 'F = kx']],
    1: [['伸长加倍', 'Double the extension'], ['F 加倍', 'F doubles']],
    2: [['劲度更大', 'Stiffer spring'], ['同一 x，F 更大', 'Same x, larger F']],
    3: [['超过限度', 'Past the limit'], ['模型不再给出力', 'The model stops giving a force']],
    4: [['提高限度', 'Raise the limit'], ['x 回到限度内，F = kx 恢复', 'x is allowed again, F = kx returns']],
  };
  const [title, cap] = titles[step];
  const x = step === 1 ? 48 : 28;
  const over = step === 3;
  const kFat = step === 2;
  const limit = step === 4 ? 68 : 50;
  const top = 36;
  const hook = top + 20 + x;
  const limitY = top + 20 + limit;
  let body = tableBoard(210, 58);
  // Scale body (classic textbook front view) above the bench.
  body += box(132, 30, 40, 100, { fill: PAPER });
  for (let i = 0; i <= 6; i++) {
    const yy = 40 + i * 12;
    body += line(158, yy, i % 2 === 0 ? 168 : 164, yy, MUTED, 1);
  }
  body += springV(152, 34, Math.min(hook, 118), kFat ? 8 : 6, kFat ? 8 : 6);
  body += line(152, Math.min(hook, 120), 152, Math.min(hook + 6, 128), INK, 1.5);
  body += path(`M 144 ${r(Math.min(hook + 6, 128))} L 160 ${r(Math.min(hook + 6, 128))} L 152 ${r(Math.min(hook + 14, 136))}`, { w: 1.3 });
  body += dash(110, limitY, 186, limitY, SEC, 1.2);
  body += text(102, limitY + 3, L(lang, '限度', 'limit'), { anchor: 'end', size: 10, fill: SEC });
  body += text(200, Math.min(hook, 120) + 4, over ? L(lang, '无力', 'no F') : 'F = kx', {
    anchor: 'start', size: 12, fill: over ? MUTED : RAY,
  });
  if (over) body += text(152, 148, L(lang, '已超出', 'beyond'), { size: 10, fill: RAY });
  if (kFat) body += text(70, 70, L(lang, 'k 大', 'large k'), { size: 11, fill: SEC });
  return panel(lang, title[0], title[1], cap[0], cap[1], body);
}

function frictionBlock3d(x, z, w, h, d, F, f, moving) {
  let s = block3d(x, z, w, h, d);
  const midY = h / 2;
  const [fx1, fy1] = obl(x + w, midY, z + d / 2);
  const [fx2, fy2] = obl(x + w + F, midY, z + d / 2);
  s += arrow(fx1, fy1, fx2, fy2, RAY, 1.6);
  s += text(fx2 + 6, fy2, 'F', { anchor: 'start', size: 11, fill: RAY });
  if (f > 0) {
    const [a1, b1] = obl(x, midY, z + d / 2);
    const [a2, b2] = obl(x - f, midY, z + d / 2);
    s += arrow(a1, b1, a2, b2, SEC, 1.6);
    s += text(a2 - 4, b2, 'f', { anchor: 'end', size: 11, fill: SEC });
  }
  const [gx, gy] = obl(x + w / 2, 0, z + d / 2);
  const [nx, ny] = obl(x + w / 2, h + 16, z + d / 2);
  s += arrow(gx, gy - 2, gx, gy + 14, INK, 1.3);
  s += text(gx + 8, gy + 14, 'G', { anchor: 'start', size: 10 });
  s += arrow(nx, ny, nx, ny - 14, MUTED, 1.3);
  s += text(nx + 8, ny - 10, 'N', { anchor: 'start', size: 10, fill: MUTED });
  if (moving) {
    const [mx1, my1] = obl(x + w / 2, h + 22, z + d / 2);
    s += arrow(mx1, my1, mx1 + 20, my1, RAY, 1.2);
  }
  return s;
}

function drawFriction(lang, step) {
  const titles = {
    '-1': [['摩擦力', 'Friction'], ['拉力、摩擦、支持力、重力', 'Pull, friction, normal, weight']],
    0: [['静摩擦', 'Static'], ['F < μₛN，物体不动，f = F', 'F < μs N, at rest, f = F']],
    1: [['开始滑动', 'Starts to slide'], ['f = μₖN，与拉力反向', 'f = μk N, opposite the pull']],
    2: [['再加大 F', 'Larger pull'], ['f 仍是 μₖN，加速度变大', 'f stays μk N, acceleration grows']],
    3: [['接触面积', 'Contact area'], ['面积改变，摩擦力不变', 'Area changes, friction does not']],
    4: [['增大质量', 'Larger mass'], ['N = mg 变大，最大摩擦变大', 'N = mg grows, so does friction']],
  };
  const [title, cap] = titles[step];
  let body = tableBoard(220, 72);
  if (step === 3) {
    body += frictionBlock3d(30, 30, 50, 22, 28, 22, 14, true);
    body += frictionBlock3d(140, 30, 80, 16, 40, 22, 14, true);
    body += text(...obl(55, 40, 44), L(lang, '小面积', 'small'), { size: 10, fill: MUTED });
    body += text(...obl(180, 36, 50), L(lang, '大面积', 'large'), { size: 10, fill: MUTED });
    body += text(160, 178, L(lang, 'f 相同', 'same f'), { size: 12, fill: SEC });
  } else if (step === 0) {
    body += frictionBlock3d(80, 36, 70, 26, 36, 18, 18, false);
    body += text(...obl(200, 40, 54), L(lang, '静止', 'rest'), { size: 12, fill: SEC });
  } else if (step === 1) {
    body += frictionBlock3d(70, 36, 70, 26, 36, 32, 18, true);
  } else if (step === 2) {
    body += frictionBlock3d(60, 36, 70, 26, 36, 46, 18, true);
    body += text(...obl(200, 50, 54), 'a', { size: 13, fill: RAY });
  } else if (step === 4) {
    body += frictionBlock3d(70, 36, 76, 36, 40, 34, 26, true);
  } else {
    body += frictionBlock3d(80, 36, 70, 26, 36, 22, 14, false);
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function pressurePatch(x, y, w, h, depth) {
  return box(x, y, w, h, { fill: RAY, op: depth, stroke: 'none' }) + box(x, y, w, h, { fill: 'none' });
}

function drawSolidP(lang, step) {
  const titles = {
    '-1': [['固体压强', 'Solid pressure'], ['压力 F 作用在面积 A 上', 'Force F on area A']],
    0: [['p = F / A', 'p = F / A'], ['压强是力除以面积', 'Pressure is force over area']],
    1: [['面积变小', 'Smaller area'], ['压强变大', 'Pressure rises']],
    2: [['力加倍', 'Double F'], ['面积不变，p 加倍', 'Same area, p doubles']],
    3: [['F 与 A 同倍', 'F and A together'], ['压强不变', 'Pressure unchanged']],
    4: [['两个面积', 'Two areas'], ['同一 F，p 与 A 成反比', 'Same F, p inverse to A']],
  };
  const [title, cap] = titles[step];
  let body = tableBoard(220, 72);
  const one = (x, z, aw, ah, ad, label) => {
    let s = oblPoly3([[x, 0, z], [x + aw, 0, z], [x + aw, 0, z + ad], [x, 0, z + ad]], { fill: RAY, op: 0.2, w: 1.1 });
    s += block3d(x + aw / 2 - 12, z + 4, 24, ah, Math.min(ad - 8, 20));
    const [tx, ty] = obl(x + aw / 2, ah + 14, z + ad / 2);
    s += arrow(tx, ty, tx, ty - 16, INK, 1.4);
    s += text(...obl(x + aw / 2, -4, z + ad / 2), label, { size: 10, fill: MUTED });
    return s;
  };
  if (step === 4 || step === -1) {
    body += one(30, 30, 70, 28, 40, L(lang, '大 A · 小 p', 'large A'));
    body += one(150, 30, 36, 28, 40, L(lang, '小 A · 大 p', 'small A'));
  } else if (step === 1) {
    body += one(90, 36, 32, 32, 40, 'A↓  p↑');
  } else if (step === 2) {
    body += one(80, 36, 64, 28, 40, '2F');
  } else if (step === 3) {
    body += one(20, 30, 50, 26, 36, 'F, A');
    body += one(120, 30, 90, 26, 36, '2F, 2A');
    body += text(160, 178, L(lang, 'p 相同', 'same p'), { size: 12, fill: SEC });
  } else {
    body += one(80, 36, 64, 30, 40, 'p = F/A');
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function tank(x, y, w, h, level, wide) {
  let s = path(`M ${r(x)} ${r(y)} L ${r(x)} ${r(y + h)} L ${r(x + w)} ${r(y + h)} L ${r(x + w)} ${r(y)}`, { w: wide ? 2.2 : 1.5 });
  const ly = y + h - level;
  s += box(x + 1.4, ly, w - 2.8, level - 1.4, { fill: SEC, op: 0.16, stroke: 'none' });
  s += line(x + 1, ly, x + w - 1, ly, SEC, 1.3);
  return s;
}

function drawLiquidP(lang, step) {
  const titles = {
    '-1': [['液体压强', 'Liquid pressure'], ['深度、容器底、U 型管', 'Depth, vessel base, U-tube']],
    0: [['深度', 'Depth'], ['p = ρgh', 'p = ρgh']],
    1: [['宽底与窄底', 'Wide and narrow'], ['同深度 p 相同，F = pA 不同', 'Same depth, same p; F = pA differs']],
    2: [['改变底面积', 'Change the base'], ['力随面积变，压强不变', 'Force follows area, pressure does not']],
    3: [['U 型管', 'U-tube'], ['左管 h₁、密度 ρ', 'Left height h1 and density ρ']],
    4: [['连通平衡', 'Connected balance'], ['ρ₁h₁ = ρ₂h₂，ρ₂ 大则 h₂ 小', 'ρ1 h1 = ρ2 h2; larger ρ2, smaller h2']],
  };
  const [title, cap] = titles[step];
  let body = tableBoard(220, 72);
  if (step === 3 || step === 4) {
    const hR = step === 4 ? 22 : 36;
    // U-tube as two cylinders joined by a base channel.
    body += cylinder3d(80, 40, 12, 70, 40);
    body += cylinder3d(150, 40, 12, 70, hR);
    body += oblPoly3([[80, 0, 40], [150, 0, 40], [150, 8, 40], [80, 8, 40]], { fill: SEC, op: 0.2, w: 1.2 });
    body += text(...obl(80, 48, 40), 'ρ₁', { size: 11, fill: SEC });
    body += text(...obl(150, 48, 40), 'ρ₂', { size: 11, fill: RAY });
    body += text(...obl(55, 20, 40), 'h₁', { size: 11, fill: SEC });
    if (step === 4) body += text(...obl(175, 50, 40), L(lang, 'h₂ 更小', 'smaller h2'), { size: 10, fill: RAY });
  } else if (step === 1) {
    body += beaker3d(60, 40, 36, 64, 40);
    body += beaker3d(170, 40, 18, 64, 40);
    body += text(...obl(60, 72, 40), L(lang, 'p 相同', 'same p'), { size: 11, fill: SEC });
    body += text(...obl(170, 72, 40), L(lang, 'F 较小', 'smaller F'), { size: 11, fill: RAY });
  } else if (step === 2) {
    body += beaker3d(55, 40, 20, 64, 38);
    body += beaker3d(160, 40, 40, 64, 38);
    body += text(...obl(55, 72, 40), 'A₁', { size: 11 });
    body += text(...obl(160, 72, 40), 'A₂', { size: 11 });
    body += text(160, 178, L(lang, 'p 不变', 'p fixed'), { size: 11, fill: SEC });
  } else {
    body += beaker3d(100, 44, 40, 70, 46);
    body += text(...obl(150, 30, 44), 'h', { size: 12, fill: SEC });
    body += text(...obl(100, 8, 44), 'p = ρgh', { size: 12, fill: RAY });
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function plateauGraph(lang, step, kind) {
  const boil = kind === 'boil';
  const sub = kind === 'sub';
  const names = boil
    ? { t: 'Tb', a: L(lang, '液体', 'liquid'), b: L(lang, '汽', 'vapour') }
    : sub
      ? { t: 'Ts', a: L(lang, '固体', 'solid'), b: L(lang, '气体', 'gas') }
      : { t: 'Tm', a: L(lang, '固', 'solid'), b: L(lang, '液', 'liquid') };
  const pair = {
    melt: {
      '-1': [['熔化曲线', 'Melting curve'], ['温度—时间，晶体有平台', 'Temperature–time, crystals have a plateau']],
      0: [['平台之前', 'Before the plateau'], ['晶体温度上升', 'Crystal temperature rises']],
      1: [['熔化平台', 'Melting plateau'], ['温度停在 Tm，熔化份额增加', 'Temperature stays at Tm while the melted share grows']],
      2: [['平台之后', 'After the plateau'], ['全部熔化后温度再升', 'After melting, temperature rises again']],
      3: [['非晶体', 'Not a crystal'], ['没有潜热平台', 'No latent-heat plateau']],
      4: [['质量或功率', 'Mass or power'], ['平台更晚、更长', 'Plateau comes later and lasts longer']],
    },
    boil: {
      '-1': [['沸腾', 'Boiling'], ['加热直至沸腾', 'Heat until it boils']],
      0: [['沸腾前', 'Before boiling'], ['温度上升，Q = Pt', 'Temperature rises, Q = P t']],
      1: [['沸腾平台', 'Boiling plateau'], ['温度停在 Tb，Q 仍增加', 'Temperature stays at Tb while Q grows']],
      2: [['汽化热', 'Latent heat'], ['平台上 Q = m Lv', 'On the plateau, Q = m Lv']],
      3: [['平台之后', 'After the plateau'], ['蒸汽温度再上升', 'Vapour temperature rises again']],
      4: [['更大 m 或更小 P', 'Larger m or smaller P'], ['更晚沸腾，平台更长', 'Boils later, longer plateau']],
    },
    sub: {
      '-1': [['升华', 'Sublimation'], ['固体直接到气体', 'Solid straight to gas']],
      0: [['平台前', 'Before the plateau'], ['固体温度上升', 'Solid temperature rises']],
      1: [['升华平台', 'Sublimation plateau'], ['温度停在 Ts', 'Temperature stays at Ts']],
      2: [['升华热', 'Latent heat'], ['Q = m Ls', 'Q = m Ls']],
      3: [['平台之后', 'After the plateau'], ['只有一个平台', 'Only one plateau']],
      4: [['停留更久', 'Stays longer'], ['m 大或 P 小', 'Larger m or smaller P']],
    },
  }[kind][step];
  const titles = pair;
  const z = 42;
  let body = tableBoard(220, 72);
  if (boil) {
    body += beaker3d(58, z, 32, 58, 38);
    const bubbles = step === 1 || step === 2 || step === -1 || step === 4;
    if (bubbles) {
      const [b1x, b1y] = obl(52, 28, z);
      body += circ(b1x, b1y, 3, { stroke: SEC, w: 1 });
      const [b2x, b2y] = obl(64, 36, z);
      body += circ(b2x, b2y, 4, { stroke: SEC, w: 1 });
    }
    if (step === 0 || step === -1) body += candle3d(90, z, { h: 18, lit: true, thin: true });
  } else {
    body += beaker3d(58, z, 30, 54, kind === 'sub' && step !== 3 ? 40 : 32);
    body += block3d(50, z - 6, 16, 12, 12, { y0: 6, label: kind === 'melt' ? names.a : '' });
    if (kind === 'melt' && step >= 1 && step !== 3) {
      body += block3d(50, z - 6, 16, 6, 12, { y0: 0, fill: SEC, label: names.b });
    }
  }
  body += thermometer3d(118, z - 4, step === 3 && kind === 'melt' ? 0.35 : step === 4 ? 0.42 : 0.58);
  const late = step === 4;
  const noPlat = step === 3 && kind === 'melt';
  const gx0 = 162;
  const gTop = 48;
  const gH = 76;
  const gW = 132;
  body += graphCard(gx0, gTop, gW, gH, (() => {
    const x0 = gx0 + 14;
    const y0 = gTop + gH - 8;
    const top = gTop + 10;
    let g = axes(x0, top, gW - 28, y0 - top);
    g += axisLabels(x0, top, gW - 34, y0 - top, 't', 'T');
    let pts;
    if (noPlat) pts = [[x0, y0], [x0 + gW - 36, top + 6]];
    else if (late) pts = [[x0, y0], [x0 + 52, top + 24], [x0 + gW - 36, top + 24]];
    else pts = [[x0, y0], [x0 + 30, top + 24], [x0 + 72, top + 24], [x0 + gW - 36, top + 10]];
    const hi = step === 0 ? [0, 1]
      : step === 1 ? [1, 2]
      : step === 2 ? (kind === 'melt' ? [2, 3] : [1, 2])
      : step === 3 && !noPlat ? (kind === 'melt' ? null : [2, 3])
      : null;
    g += polyLine(pts, INK, 1.8);
    if (hi && pts[hi[1]]) g += polyLine([pts[hi[0]], pts[hi[1]]], RAY, 2.6);
    if (!noPlat && pts[2]) {
      g += dash(x0, top + 24, pts[2][0], top + 24, SEC, 1);
      g += text(x0 - 2, top + 22, names.t, { anchor: 'end', size: 10, fill: SEC });
    }
    if (step === 1 || (step === 2 && kind !== 'melt')) {
      g += text((pts[1][0] + pts[2][0]) / 2, top + 16, names.a + '→' + names.b, { size: 9, fill: RAY });
    }
    return g;
  })());
  return panel(lang, titles[0][0], titles[0][1], titles[1][0], titles[1][1], body);
}

function drawMelting(lang, step) { return plateauGraph(lang, step, 'melt'); }
function drawBoiling(lang, step) { return plateauGraph(lang, step, 'boil'); }
function drawSublimation(lang, step) { return plateauGraph(lang, step, 'sub'); }

function drawSound(lang, step) {
  const titles = {
    '-1': [['音叉与声波', 'Fork and wave'], ['叉股带动正弦波', 'The prongs drive a sine wave']],
    0: [['正弦振动', 'Sinusoidal'], ['叉股与波形一起按正弦变化', 'Prongs and wave share the sine']],
    1: [['频率升高', 'Higher frequency'], ['振动变快，音高升高', 'Faster vibration, higher pitch']],
    2: [['振幅增大', 'Larger amplitude'], ['位移变大，更响', 'Larger displacement, louder']],
    3: [['一个周期', 'One period'], ['最大值是 A，过零两次', 'Maximum is A, two zeros']],
    4: [['纯正弦', 'Pure sine'], ['没有泛音', 'No harmonics']],
  };
  const [title, cap] = titles[step];
  const cycles = step === 1 ? 4.5 : step === 3 ? 1 : 2.2;
  const amp = step === 2 ? 22 : 12;
  const z = 40;
  let body = tableBoard(220, 72);
  body += fork3d(32, z, 30);
  if (step === 0 || step === -1) {
    body += oblArrow3d(44, 28, z + 6, 58, 28, z + 6, RAY, 1.3);
  }
  body += graphCard(118, 42, 178, 88, (() => {
    const x0 = 128;
    const y0 = 118;
    const pts = sinePts(x0, y0, 158, amp, cycles);
    let g = polyLine(pts, step === 4 ? INK : SEC, 1.7);
    g += dash(x0, y0, x0 + 158, y0, MUTED, 1);
    if (step === 3) {
      const mid = pts[Math.floor(pts.length / 2)];
      g += circ(pts[0][0], y0, 2.2, { fill: RAY, stroke: 'none' });
      g += circ(mid[0], mid[1], 2.2, { fill: RAY, stroke: 'none' });
      g += circ(pts[pts.length - 1][0], y0, 2.2, { fill: RAY, stroke: 'none' });
      g += text(170, y0 - amp - 6, 'A', { size: 12, fill: RAY });
      g += hDim(x0, x0 + 158, 132, 'T', SEC);
    }
    return g;
  })());
  if (step === 1) body += text(200, 42, 'f↑', { size: 13, fill: RAY });
  if (step === 2) body += text(200, 42, 'A↑', { size: 13, fill: RAY });
  if (step === 4) body += text(200, 48, L(lang, '单频', 'one f'), { size: 12, fill: SEC });
  return panel(lang, title[0], title[1], cap[0], cap[1], body);
}

function drawSt(lang, step) {
  const titles = {
    '-1': [['位移—时间', 'Displacement–time'], ['亮点停在该时刻的 x', 'The dot is x at that time']],
    0: [['时刻与位置', 'Time and place'], ['亮点的位置就是该时刻的 x', 'The dot marks x at that instant']],
    1: [['两段斜率', 'Two slopes'], ['换速前是 v₁，换速后是 v₂', 'v1 before the change, v2 after']],
    2: [['速度为负', 'Negative velocity'], ['后段往回走', 'The later part comes back']],
    3: [['平均速率', 'Average speed'], ['用 x/t 作从起点的平均', 'x/t from the start is the average']],
    4: [['换速时刻', 'When the speed changes'], ['两段各占多久，总位移跟着变', 'Each segment’s duration changes the net displacement']],
  };
  const [title, cap] = titles[step];
  const z = 44;
  const cartX = step === 0 ? 46 : 70;
  let body = tableBoard(220, 72);
  body += cart3d(cartX, z, 52, 18, 28);
  body += oblPoly3([[cartX + 56, 12, z - 6], [cartX + 72, 12, z - 6], [cartX + 72, 8, z - 6], [cartX + 56, 8, z - 6]], { fill: '#ddd8ce', w: 1.1 });
  for (let i = 0; i < 5; i++) {
    body += oblPoly3([[cartX + 56 + i * 3, 10, z - 5], [cartX + 58 + i * 3, 10, z - 5], [cartX + 58 + i * 3, 6, z - 5], [cartX + 56 + i * 3, 6, z - 5]], { fill: RAY, op: 0.5, stroke: 'none' });
  }
  const x0 = 152;
  const y0 = 118;
  const br = step === 4 ? 214 : 196;
  const y1 = step === 2 ? 72 : 60;
  const y2 = step === 2 ? 96 : 48;
  const xEnd = 278;
  body += graphCard(142, 38, 158, 100, (() => {
    let g = axes(x0, 46, 138, 66);
    g += axisLabels(x0, 46, 130, 66, 't', 's');
    g += polyLine([[x0, y0 - 8], [br, y1], [xEnd, y2]], INK, 1.9);
    const dotT = step === 0 ? 0.35 : 0.62;
    const ax = x0 + (br - x0) * Math.min(dotT, 1);
    let dot;
    if (ax <= br) {
      const u = (ax - x0) / (br - x0);
      dot = [ax, (y0 - 8) + u * (y1 - (y0 - 8))];
    } else {
      const u = (ax - br) / (xEnd - br);
      dot = [ax, y1 + u * (y2 - y1)];
    }
    if (step === 0 || step === -1 || step === 3) g += circ(dot[0], dot[1], 4, { fill: RAY, stroke: 'none' });
    if (step === 1) {
      g += dash(x0, y0 - 8, br, y0 - 8, MUTED, 1);
      g += dash(br, y0 - 8, br, y1, MUTED, 1);
      g += text((x0 + br) / 2, y0 - 16, 'v₁', { size: 11, fill: RAY });
      g += text((br + xEnd) / 2, Math.min(y1, y2) - 10, 'v₂', { size: 11, fill: SEC });
    }
    if (step === 3) {
      g += dash(x0, y0 - 8, dot[0], dot[1], RAY, 1.3);
      g += text((x0 + dot[0]) / 2, (y0 + dot[1]) / 2, 'x/t', { size: 11, fill: RAY });
    }
    if (step === 4) g += dash(br, 50, br, y0, SEC, 1.2);
    return g;
  })());
  return panel(lang, title[0], title[1], cap[0], cap[1], body);
}

function drawVt(lang, step) {
  const titles = {
    '-1': [['速度—时间', 'Velocity–time'], ['直线的斜率是加速度', 'The slope is the acceleration']],
    0: [['该时刻的速度', 'Velocity at that time'], ['v = v₀ + at', 'v = v0 + a t']],
    1: [['面积即位移', 'Area is displacement'], ['面积 = x(t₂) − x(t₁)', 'Area = x(t2) − x(t1)']],
    2: [['速度变号', 'Velocity changes sign'], ['面积带符号，可以变小', 'Signed area can shrink']],
    3: [['加速度更大', 'Larger acceleration'], ['同一区间面积跟着变', 'The area on the same interval changes']],
    4: [['梯形', 'Trapezoid'], ['½(v₁+v₂)(t₂−t₁)', '½ (v1+v2)(t2−t1)']],
  };
  const [title, cap] = titles[step];
  const z = 44;
  let body = tableBoard(220, 72);
  body += cart3d(48, z, 54, 18, 28);
  body += oblPoly3([[24, 14, z - 8], [70, 14, z - 8], [70, 12, z - 8], [24, 12, z - 8]], { fill: '#c8c4bc', w: 1.2 });
  const x0 = 152;
  const yBase = step === 2 ? 88 : 118;
  const top = 46;
  body += graphCard(142, 38, 158, 100, (() => {
    let g = axes(x0, top, 138, yBase - top);
    g += axisLabels(x0, top, 130, yBase - top, 't', 'v');
    const t1 = x0 + (step === 1 ? 0 : step === 4 ? 36 : 10);
    const t2 = x0 + 180;
    const v1 = step === 3 ? yBase - 18 : yBase - 28;
    const v2 = step === 2 ? yBase + 26 : step === 3 ? yBase - 78 : yBase - 62;
    if (step === 2) g += dash(x0, yBase, x0 + 120, yBase, MUTED, 1.1);
    const polyPts = [[t1, yBase], [t1, v1], [t2, v2], [t2, yBase]];
    if (step === 1 || step === 3 || step === 4 || step === 0) {
      g += poly(polyPts, { fill: RAY, op: 0.16, stroke: 'none' });
    }
    if (step === 2) {
      const cross = t1 + (t2 - t1) * (yBase - v1) / (v2 - v1);
      g += poly([[t1, yBase], [t1, v1], [cross, yBase]], { fill: SEC, op: 0.2, stroke: 'none' });
      g += poly([[cross, yBase], [t2, v2], [t2, yBase]], { fill: RAY, op: 0.2, stroke: 'none' });
    }
    g += polyLine([[t1, v1], [t2, v2]], INK, 2);
    if (step === 0) g += circ(t1 + 70, v1 + (v2 - v1) * 70 / (t2 - t1), 4, { fill: RAY, stroke: 'none' });
    if (step === 4) {
      g += dash(t1, v1, t2, v1, SEC, 1.1);
      g += text((t1 + t2) / 2, Math.min(v1, v2) - 8, L(lang, '梯形', 'trapezoid'), { size: 10, fill: SEC });
    }
    g += text(t1, yBase + 14, 't₁', { size: 10, fill: MUTED });
    g += text(t2, yBase + 14, 't₂', { size: 10, fill: MUTED });
    return g;
  })());
  return panel(lang, title[0], title[1], cap[0], cap[1], body);
}

function drawProjectile(lang, step) {
  const titles = {
    '-1': [['平抛', 'Horizontal launch'], ['桌边水平抛出', 'Launched horizontally from a table']],
    0: [['飞行时间', 'Time of flight'], ['H = ½ g t²', 'H = ½ g t²']],
    1: [['水平射程', 'Horizontal range'], ['x = v₀ t', 'x = v0 t']],
    2: [['只增大 v₀', 'Larger v0 only'], ['落地时间不变，射程增大', 'Same flight time, longer range']],
    3: [['只增大 H', 'Larger H only'], ['飞行时间变长，射程变大', 'Longer flight, longer range']],
    4: [['频闪', 'Strobes'], ['水平间隔相等，竖直间隔向下变大', 'Equal horizontal gaps, growing vertical gaps']],
  };
  const [title, cap] = titles[step];
  const z = 44;
  const tableH = step === 3 ? 42 : 30;
  const v0 = step === 2 ? 1.55 : 1;
  const launchX = 52;
  let body = tableBoard(220, 72);
  body += block3d(24, z - 6, 30, tableH, 34, { y0: 0 });
  const samples3d = (speed, hDrop, zL) => {
    const pts = [];
    const n = 16;
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      pts.push([launchX + speed * 120 * u, tableH + hDrop * u * u, zL]);
    }
    return pts;
  };
  const pathSvg = (pts, color, w, dash) => {
    const svgPts = pts.map((p) => obl(p[0], p[1], p[2]));
    return polyLine(svgPts, color, w, dash);
  };
  const hDrop = step === 3 ? 48 : 36;
  if (step === 2) {
    body += pathSvg(samples3d(1, hDrop, z), MUTED, 1.3, '3 3');
    body += pathSvg(samples3d(v0, hDrop, z), RAY, 1.8);
  } else if (step === 3) {
    body += pathSvg(samples3d(1, 36, z), MUTED, 1.3, '3 3');
    body += pathSvg(samples3d(1, hDrop, z), RAY, 1.8);
  } else {
    body += pathSvg(samples3d(v0, hDrop, z), RAY, 1.8);
  }
  body += oblArrow3d(launchX, tableH, z, launchX + 22, tableH, z, SEC, 1.5);
  body += text(...obl(launchX + 28, tableH + 6, z), 'v₀', { anchor: 'start', size: 11, fill: SEC });
  const [v1x, v1y] = obl(38, 0, z);
  const [v2x, v2y] = obl(38, tableH, z);
  body += vDim(v1x, v1y, v2y, 'H', SEC);
  if (step === 1 || step === 2 || step === 3) {
    const landX = launchX + v0 * 120;
    body += dimFront(launchX, landX, 'x', RAY);
  }
  if (step === 4 || step === 0 || step === -1) {
    for (let i = 1; i <= 4; i++) {
      const u = i / 5;
      const px = launchX + 120 * u;
      const py = tableH + hDrop * u * u;
      const [sx, sy] = obl(px, py, z);
      body += circ(sx, sy, 3.2, { fill: PAPER, stroke: RAY, w: 1.4 });
    }
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body);
}

function chargeBall(x, y, sign, rad = 16) {
  const col = sign === '−' || sign === '-' ? SEC : RAY;
  const glyph = sign === '-' ? '−' : sign;
  return circ(x, y, rad, { fill: PAPER, w: 1.7 }) + text(x, y + 5, glyph, { size: 16, bold: true, fill: col });
}

function drawBalance(lang, step) {
  const titles = {
    '-1': [['天平', 'Balance'], ['横梁、托盘、游码', 'Beam, pans, rider']],
    0: [['拨动游码', 'Slide the rider'], ['看横梁是否走平', 'Watch whether the beam levels']],
    1: [['配平', 'Balanced'], ['物 = 砝码 + 游码', 'object = weights + rider']],
    2: [['砝码偏多', 'Extra weights'], ['游码往回，或物侧偏轻', 'Rider moves back, or the object side is light']],
    3: [['游码归零', 'Rider at zero'], ['只比较砝码', 'Weights only']],
    4: [['更换物重', 'New object'], ['仍要两侧质量相等', 'The two sides must match again']],
  };
  const [title, cap] = titles[step];
  const tilt = step === 0 ? -8 : step === 2 ? 7 : 0;
  const rider = step === 3 ? 8 : step === 0 ? 50 : step === 2 ? 18 : 32;
  const cx = 120;
  const z = 48;
  const beamY = 52;
  const tiltRad = (tilt * Math.PI) / 180;
  const yL = beamY + Math.sin(tiltRad) * 72;
  const yR = beamY - Math.sin(tiltRad) * 72;
  let body = tableBoard(220, 72);
  // Column + base.
  body += oblPoly3([[cx - 16, 0, z - 12], [cx + 16, 0, z - 12], [cx + 16, 0, z + 12], [cx - 16, 0, z + 12]], { fill: '#ddd8ce', w: 1.2 });
  body += oblLine([cx, 0, z], [cx, beamY, z], INK, 2.2);
  body += oblLine([cx - 72, yL, z], [cx + 72, yR, z], INK, 2.4);
  // Pans.
  const pan = (x, y, label) => {
    let s = oblLine([x, y, z], [x, y - 12, z], INK, 1.2);
    s += oblPathPts([[x - 16, y - 12, z], [x, y - 20, z], [x + 16, y - 12, z]], { w: 1.4 });
    s += text(...obl(x, y - 28, z), label, { size: 10, fill: MUTED });
    return s;
  };
  body += pan(cx - 72, yL, L(lang, '物', 'obj'));
  body += pan(cx + 72, yR, L(lang, '砝码', 'wts'));
  body += block3d(cx - 80, z - 6, 16, 10, 12, { y0: Math.max(0, yL - 30) });
  const nW = step === 2 ? 3 : step === 4 ? 1 : 2;
  for (let i = 0; i < nW; i++) {
    body += block3d(cx + 60 + i * 10, z - 6, 8, 10, 10, { y0: Math.max(0, yR - 30) });
  }
  // Rider.
  const rx = cx - 72 + rider * 1.8;
  const ry = beamY + Math.sin(tiltRad) * (72 - rider * 1.8);
  body += oblPoly3([[rx, ry, z], [rx - 4, ry + 8, z], [rx + 4, ry + 8, z]], { fill: RAY, stroke: RAY, w: 0.8 });
  if (tilt === 0 && step !== -1 && step !== 3) {
    body += text(...obl(cx, 8, z), L(lang, '水平', 'level'), { size: 11, fill: SEC });
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function drawAmpere(lang, step) {
  const titles = {
    '-1': [['安培力', 'Ampere force'], ['匀强磁场中的直导线', 'Straight wire in a uniform field']],
    0: [['F = BIL', 'F = B I L'], ['力垂直于 B 和 I', 'Force perpendicular to B and I']],
    1: [['只增大 B', 'Increase B only'], ['F 同比增大，方向不变', 'F scales, sense unchanged']],
    2: [['只增大 L', 'Increase L only'], ['F 同比增大', 'F scales with L']],
    3: [['电流反向', 'Reverse I'], ['F 反向，大小仍是 |BIL|', 'F flips; size stays |BIL|']],
    4: [['电流为零', 'Current is zero'], ['力消失', 'The force vanishes']],
  };
  const [title, cap] = titles[step];
  const z = 46;
  const len = step === 2 ? 100 : 72;
  const cx = 118;
  const x1 = cx - len / 2;
  const x2 = cx + len / 2;
  const y = 12;
  const reverse = step === 3;
  const fLen = step === 1 || step === 2 ? 28 : 18;
  let body = tableBoard(220, 72);
  body += oblBField(28, 190, 28, 56, step === 1 ? 11 : 16);
  body += text(...obl(30, 52, z), step === 1 ? 'B↑' : 'B ⊗', { anchor: 'start', size: 11, fill: MUTED });
  body += oblLine([x1, y, z], [x2, y, z], INK, 2.8);
  body += dimFront(x1, x2, 'L', SEC);
  if (step === 4) {
    body += text(...obl(cx, y + 14, z), 'I = 0', { size: 12, fill: MUTED });
  } else {
    const dir = reverse ? -1 : 1;
    body += oblArrow3d(cx - dir * 22, y, z, cx + dir * 28, y, z, RAY, 1.7);
    body += text(...obl(cx, y + 16, z), 'I', { size: 13, fill: RAY });
    const fy = reverse ? y + fLen : y - fLen;
    body += oblArrow3d(cx, y, z, cx, fy, z, SEC, 1.9);
    body += text(...obl(cx + 16, fy, z), 'F', { anchor: 'start', size: 13, fill: SEC });
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function solenoidCoil(x, y, turns, gap) {
  let s = '';
  for (let i = 0; i < turns; i++) {
    s += `<ellipse cx="${r(x + i * gap)}" cy="${r(y)}" rx="9" ry="26" fill="${PAPER}" stroke="${INK}" stroke-width="1.35"/>`;
  }
  return s;
}

function drawSolenoid(lang, step) {
  const titles = {
    '-1': [['通电螺线管', 'Solenoid'], ['轴线磁场 B = μ₀ n I', 'Axial field B = μ0 n I']],
    0: [['读出 B', 'Read B'], ['B = μ₀ n I', 'B = μ0 n I']],
    1: [['右手定则', 'Right-hand rule'], ['拇指沿 B，指向 N', 'Thumb along B, toward N']],
    2: [['电流反向', 'Reverse I'], ['B 反向，N 极换端', 'B flips and N swaps ends']],
    3: [['增大 n 或 I', 'Larger n or I'], ['B 同比增大', 'B scales']],
    4: [['画面匝数', 'Drawn turns'], ['B 由匝密度 n 决定', 'B uses turn density n']],
  };
  const [title, cap] = titles[step];
  const turns = step === 4 ? 5 : 8;
  const gap = step === 4 ? 18 : 14;
  const x = step === 4 ? 56 : 38;
  const z = 44;
  const reverse = step === 2;
  const strong = step === 3;
  let body = tableBoard(220, 72);
  body += block3d(30, z - 10, 168, 6, 34, { y0: 0, fill: '#ddd8ce' });
  body += solenoid3d(x, z, turns, gap, 24);
  const xL = x + 6;
  const xR = x + (turns - 1) * gap - 6;
  if (reverse) body += oblArrow3d(xR, 14, z, xL, 14, z, SEC, strong ? 2.4 : 1.8);
  else body += oblArrow3d(xL, 14, z, xR, 14, z, SEC, strong ? 2.4 : 1.8);
  body += text(...obl(reverse ? xL - 6 : xR + 8, 18, z), 'B', { anchor: 'start', size: 13, fill: SEC });
  body += text(...obl(reverse ? xL : xR, 42, z), 'N', { size: 13, bold: true, fill: RAY });
  body += text(...obl(reverse ? xR : xL, 42, z), 'S', { size: 13, bold: true, fill: SEC });
  if (step === 1) {
    const [ax, ay] = obl(x - 8, 10, z);
    body += path(`M ${r(ax)} ${r(ay + 14)} Q ${r(ax - 16)} ${r(ay)} ${r(ax)} ${r(ay - 12)}`, { stroke: RAY, w: 1.4 });
    body += text(...obl(x - 20, 16, z), 'I', { size: 11, fill: RAY });
  }
  if (step === 4) body += text(...obl(160, 8, z), L(lang, '画出的圈数不是 n', 'drawn loops are not n'), { size: 11, fill: MUTED });
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function magnetLoops(x, y, w, h, nSide, count) {
  const cy = y + h / 2;
  const leave = nSide === 'right' ? x + w : x;
  const enter = nSide === 'right' ? x : x + w;
  let s = '';
  for (let i = 1; i <= count; i++) {
    const bulge = 10 + i * (count > 3 ? 12 : 16);
    s += path(`M ${r(leave)} ${r(cy - 4)} C ${r(leave + (nSide === 'right' ? 26 : -26))} ${r(cy - bulge)}, ${r(enter + (nSide === 'right' ? -26 : 26))} ${r(cy - bulge)}, ${r(enter)} ${r(cy - 4)}`, { stroke: SEC, w: 1.25 });
    s += path(`M ${r(leave)} ${r(cy + 4)} C ${r(leave + (nSide === 'right' ? 26 : -26))} ${r(cy + bulge)}, ${r(enter + (nSide === 'right' ? -26 : 26))} ${r(cy + bulge)}, ${r(enter)} ${r(cy + 4)}`, { stroke: SEC, w: 1.25 });
  }
  s += line(enter + 6, cy, leave - 6, cy, SEC, 1.2, '4 3');
  return s;
}

function drawMagnet(lang, step) {
  const titles = {
    '-1': [['条形磁铁', 'Bar magnet'], ['磁感线出 N 入 S', 'Lines leave N and enter S']],
    0: [['标出磁极', 'Mark the poles'], ['线从 N 离开，从 S 进入', 'Lines leave N and enter S']],
    1: [['磁场变强', 'Stronger field'], ['线条变密，走向不变', 'Denser lines, same sense']],
    2: [['对调磁极', 'Swap the poles'], ['进出端互换', 'The ends swap']],
    3: [['磁场变弱', 'Weaker field'], ['变疏，形状仍相同', 'Sparser, same shape']],
    4: [['疏密不是新磁极', 'Density is not new poles'], ['还是同一个 N、S', 'Still the same N and S']],
  };
  const [title, cap] = titles[step];
  const northRight = step !== 2;
  const count = step === 1 ? 4 : step === 3 ? 1 : 2;
  const z = 44;
  const mx = 54;
  const mw = 112;
  let body = tableBoard(220, 72);
  body += magnetBar3d(mx, z, mw, 14, 28, northRight);
  const cy = 20;
  const leave = northRight ? mx + mw : mx;
  const enter = northRight ? mx : mx + mw;
  for (let i = 1; i <= count; i++) {
    const bulge = 8 + i * (count > 3 ? 10 : 14);
    const [l1x, l1y] = obl(leave, cy - 2, z + 18);
    const [e1x, e1y] = obl(enter, cy - 2, z + 18);
    body += path(
      `M ${r(l1x)} ${r(l1y)} C ${r(l1x + (northRight ? 20 : -20))} ${r(l1y - bulge)}, ${r(e1x + (northRight ? -20 : 20))} ${r(e1y - bulge)}, ${r(e1x)} ${r(e1y)}`,
      { stroke: SEC, w: 1.2 },
    );
    const [l2x, l2y] = obl(leave, cy + 2, z + 18);
    const [e2x, e2y] = obl(enter, cy + 2, z + 18);
    body += path(
      `M ${r(l2x)} ${r(l2y)} C ${r(l2x + (northRight ? 20 : -20))} ${r(l2y + bulge)}, ${r(e2x + (northRight ? -20 : 20))} ${r(e2y + bulge)}, ${r(e2x)} ${r(e2y)}`,
      { stroke: SEC, w: 1.2 },
    );
  }
  if (step === 4) body += text(...obl(160, 8, z), L(lang, '形状未变', 'shape unchanged'), { size: 11, fill: MUTED });
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function drawInduction(lang, step) {
  const titles = {
    '-1': [['动生感应', 'Motional emf'], ['导轨、滑杆、匀强磁场', 'Rails, rod, uniform field']],
    0: [['改变 x', 'Change x'], ['Φ 随 x 变，ε 不随 x 变', 'Φ follows x; ε does not']],
    1: [['改变速度', 'Change speed'], ['ε = Bℓv，v 反向则 ε 反向', 'ε = Bℓv; reversed v reverses ε']],
    2: [['速度为零', 'Speed is zero'], ['ε = 0，I = 0', 'ε = 0 and I = 0']],
    3: [['增大 B 或 ℓ', 'Larger B or ℓ'], ['ε 与 I 同比增大', 'ε and I scale']],
    4: [['增大电阻', 'Larger R'], ['I = ε/R 变小，ε 不变', 'I = ε/R falls; ε stays']],
  };
  const [title, cap] = titles[step];
  const z = 46;
  const bar = step === 0 ? 138 : 168;
  const bar2 = step === 0 ? 188 : null;
  const v = step === 2 ? 0 : step === 1 ? 26 : 16;
  let body = tableBoard(220, 72);
  body += oblBField(36, 200, 30, 56, step === 3 ? 12 : 16);
  const y1 = 8;
  const y2 = 32;
  body += oblLine([32, y1, z], [200, y1, z], INK, 1.7);
  body += oblLine([32, y2, z], [200, y2, z], INK, 1.7);
  body += oblLine([32, y1, z], [32, y1 + 8, z], INK, 1.7);
  body += oblLine([32, y2 - 8, z], [32, y2, z], INK, 1.7);
  body += block3d(22, z - 8, 16, 16, 14, { y0: y1 + 4, label: step === 4 ? 'R↑' : 'R', labelFill: step === 4 ? RAY : INK });
  body += oblLine([bar, y1, z], [bar, y2, z], INK, 3);
  if (bar2) {
    body += oblLine([bar2, y1, z], [bar2, y2, z], SEC, 1.4, '4 3');
    body += dimFront(bar, bar2, 'Δx', SEC);
    body += text(...obl(158, 42, z), 'Φ', { size: 12, fill: SEC });
  }
  const midY = (y1 + y2) / 2;
  if (v > 0) {
    body += oblArrow3d(bar + 4, midY, z, bar + 4 + v, midY, z, RAY, 1.6);
    body += text(...obl(bar + v + 10, midY, z), 'v', { anchor: 'start', size: 12, fill: RAY });
  } else {
    body += text(...obl(bar + 8, midY, z), 'v = 0', { anchor: 'start', size: 12, fill: MUTED });
  }
  if (step === 1) body += text(...obl(200, 54, z), 'ε ∝ v', { anchor: 'start', size: 11, fill: RAY });
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function drawCharges(lang, step) {
  const titles = {
    '-1': [['两个点电荷', 'Two point charges'], ['库仑力沿连线', 'Coulomb force along the join']],
    0: [['改变间距', 'Change the spacing'], ['读出力 F', 'Read the force F']],
    1: [['库仑定律', 'Coulomb’s law'], ['F = k|q₁q₂|/r²', 'F = k|q1 q2|/r²']],
    2: [['距离加倍', 'Double r'], ['力约为 1/4', 'Force is about 1/4']],
    3: [['只改一个符号', 'Flip one sign'], ['力反向，大小不变', 'Force flips, size unchanged']],
    4: [['同号与异号', 'Like and unlike'], ['同号相斥，异号相吸', 'Like charges repel, unlike attract']],
  };
  const [title, cap] = titles[step];
  const zBase = 44;
  let body = tableBoard(220, 72);
  const pair = (x, z, s1, s2, dist, fLen, flip) => {
    let s = chargeBall3d(x, z, s1) + chargeBall3d(x + dist, z, s2);
    const leftOut = s1 === s2;
    const a = leftOut ? -1 : 1;
    const dir = flip ? -a : a;
    s += oblArrow3d(x + 16, 20, z, x + 16 + dir * fLen, 20, z, RAY, 1.6);
    s += oblArrow3d(x + dist - 16, 20, z, x + dist - 16 - dir * fLen, 20, z, RAY, 1.6);
    s += dimFront(x, x + dist, 'r', SEC);
    return s;
  };
  if (step === 4) {
    body += pair(30, zBase, '+', '+', 70, 14, false);
    body += pair(150, zBase, '+', '−', 70, 14, false);
    body += text(...obl(68, 42, zBase), L(lang, '斥', 'repel'), { size: 11, fill: RAY });
    body += text(...obl(186, 42, zBase), L(lang, '吸', 'attract'), { size: 11, fill: SEC });
  } else if (step === 2) {
    body += pair(34, 30, '+', '+', 58, 16, false);
    body += text(...obl(200, 28, 30), 'F', { anchor: 'start', size: 12, fill: RAY });
    body += pair(34, 52, '+', '+', 116, 6, false);
    body += text(...obl(200, 50, 52), 'F/4', { anchor: 'start', size: 12, fill: RAY });
    body += text(...obl(120, 40, 42), L(lang, 'r → 2r', 'r → 2r'), { size: 11, fill: MUTED });
  } else if (step === 3) {
    body += pair(34, 30, '+', '−', 82, 16, false);
    body += text(...obl(200, 28, 30), L(lang, '吸', 'attract'), { anchor: 'start', size: 11, fill: SEC });
    body += pair(34, 52, '−', '−', 82, 16, false);
    body += text(...obl(200, 50, 52), L(lang, '斥', 'repel'), { anchor: 'start', size: 11, fill: RAY });
    body += text(...obl(120, 40, 42), L(lang, '改 q₁ 符号', 'flip q₁'), { size: 11, fill: MUTED });
  } else {
    body += pair(60, zBase, '+', step === 0 ? '+' : '−', step === 0 ? 88 : 96, 16, false);
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function submergedBlock(bx, liquidTop, liquidBot, frac, label) {
  const bh = 36;
  const span = liquidBot - liquidTop;
  const top = liquidBot - frac * bh - (1 - frac) * 8;
  let s = block(bx, top, 32, bh);
  s += text(bx + 16, top + 20, label, { size: 10 });
  const subTop = Math.max(top, liquidTop);
  if (subTop < top + bh) {
    s += box(bx + 1, subTop, 30, top + bh - subTop, { fill: SEC, op: 0.18, stroke: 'none' });
  }
  return s;
}

function drawArchimedes(lang, step) {
  const titles = {
    '-1': [['阿基米德原理', 'Archimedes'], ['溢水杯与排开的液体', 'Overflow can and displaced liquid']],
    0: [['浸没比例', 'Immersion'], ['读 Vdisp 与浮力 Fb', 'Read Vdisp and buoyant force Fb']],
    1: [['原理', 'The principle'], ['Fb = ρ液 g Vdisp', 'Fb = ρ g Vdisp']],
    2: [['全部浸没', 'Fully under'], ['Vdisp 等于物体体积', 'Vdisp equals the object volume']],
    3: [['液体变密', 'Denser liquid'], ['同一 Vdisp，Fb 正比于 ρ', 'Same Vdisp, Fb scales with ρ']],
    4: [['g 变小', 'Smaller g'], ['Fb 变小，体积本身不决定浮力', 'Fb falls; volume alone does not set it']],
  };
  const [title, cap] = titles[step];
  const frac = step === 2 || step === 3 || step === 4 ? 1 : step === -1 ? 0.7 : 0.55;
  const level = step === 3 ? 58 : 48;
  const catchH = 14 + Math.round(frac * 28);
  let body = tableBoard(220, 72);
  body += beaker3d(70, 42, 36, 70, level, { spout: true });
  body += block3d(58, 34, 22, 16, 16, { y0: Math.max(4, level - frac * 22), label: step === 2 ? 'V' : '' });
  body += cylinder3d(170, 50, 16, 58, catchH);
  body += text(...obl(170, -4, 50), 'Vdisp', { size: 11, fill: SEC });
  const fLen = step === 4 ? 12 : step === 3 ? 26 : 18;
  const [bx, by] = obl(70, level - 8, 42);
  body += arrow(bx, by, bx, by - fLen, SEC, 1.6);
  body += text(bx + 10, by - fLen, 'Fb', { anchor: 'start', size: 12, fill: SEC });
  body += arrow(bx - 10, by + 4, bx - 10, by + 16, INK, 1.3);
  body += text(bx - 4, by + 20, 'G', { size: 11 });
  if (step === 4) body += text(...obl(210, 60, 50), 'g↓', { size: 13, fill: RAY });
  if (step === 3) body += text(...obl(210, 60, 50), 'ρ↑', { size: 13, fill: RAY });
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function drawFloat(lang, step) {
  const titles = {
    '-1': [['漂浮与下沉', 'Float and sink'], ['比较物体和液体的密度', 'Compare object and liquid density']],
    0: [['漂浮', 'Floating'], ['ρ < ρ液，Fb = G', 'ρ below the liquid, Fb = G']],
    1: [['悬浮', 'Suspended'], ['ρ 相等，Vdisp = V', 'Densities match, Vdisp = V']],
    2: [['沉底', 'On the bottom'], ['N = G − Fb', 'N = G − Fb']],
    3: [['轮船', 'Ship'], ['平均密度越过液体就下沉', 'It sinks when mean density exceeds the liquid']],
    4: [['潜艇压载', 'Submarine ballast'], ['压载使平均密度升高', 'Ballast raises the mean density']],
  };
  const [title, cap] = titles[step];
  const z = 48;
  let body = tableBoard(220, 72);
  body += beaker3d(110, z, 48, 72, 44);
  if (step === 3) {
    body += oblPoly3([[80, 36, z - 10], [140, 36, z - 10], [132, 22, z + 10], [88, 22, z + 10]], { fill: PAPER, w: 1.5 });
    body += text(...obl(110, 40, z), L(lang, '船', 'ship'), { size: 11 });
  } else if (step === 4) {
    body += block3d(92, z - 12, 36, 18, 24, { y0: 8, label: L(lang, '水', 'ballast'), labelFill: SEC });
  } else if (step === 2) {
    body += block3d(96, z - 10, 28, 18, 20, { y0: 2 });
    const [nx, ny] = obl(110, 24, z);
    body += text(nx + 20, ny, 'N', { size: 12, fill: MUTED });
    body += text(nx - 24, ny - 8, 'Fb', { size: 10, fill: SEC });
    body += text(nx + 20, ny + 16, 'G', { size: 10 });
  } else if (step === 1) {
    body += block3d(96, z - 10, 28, 18, 20, { y0: 22, label: 'ρ=ρ液' });
  } else {
    body += block3d(96, z - 10, 28, 16, 20, { y0: 36 });
    const [fx, fy] = obl(110, 50, z);
    body += text(fx + 22, fy - 10, 'Fb', { size: 11, fill: SEC });
    body += text(fx + 22, fy + 12, 'G', { size: 11 });
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function drawCircuit(lang, step) {
  // Textbook circuit: clean 2D schematic on a note card resting on the table.
  const titles = {
    '-1': [['电路', 'Circuit'], ['电源、开关、用电器', 'Cell, switch, load']],
    0: [['开关', 'Switch'], ['闭合有电流，断开为零', 'Closed: current. Open: zero']],
    1: [['串联电阻', 'Series resistors'], ['R 增大则电流下降', 'Larger R, smaller current']],
    2: [['变阻器', 'Rheostat'], ['滑片改变电流和分压', 'The slider changes current and share']],
    3: [['电功与电热', 'Work and heat'], ['W = UIt，Q = I²Rt', 'W = U I t, Q = I² R t']],
    4: [['并联', 'Parallel'], ['支路分流', 'Current splits in the branches']],
  };
  const [title, cap] = titles[step];
  // Bench shelf + classic schematic above it (textbook circuits stay 2D symbols).
  let body = tableBoard(210, 58);
  const y = 72;
  const y2 = 112;
  if (step === 4) {
    body += cellH(40, 58);
    body += line(46, 58, 80, 58, INK, 1.5);
    body += line(80, 42, 80, 100, INK, 1.5);
    body += line(80, 42, 196, 42, INK, 1.5);
    body += line(80, 100, 196, 100, INK, 1.5);
    body += resistorH(118, 42, 40);
    body += resistorH(118, 100, 40);
    body += text(138, 34, 'R₁', { size: 11 });
    body += text(138, 92, 'R₂', { size: 11 });
    body += line(196, 42, 196, 100, INK, 1.5);
    body += line(196, 71, 236, 71, INK, 1.5);
    body += meterH(250, 71, 'A');
    body += line(40, 58, 40, 118, INK, 1.5);
    body += line(258, 71, 258, 118, INK, 1.5);
    body += line(40, 118, 258, 118, INK, 1.5);
    body += text(40, 50, '+', { size: 11, fill: RAY });
  } else if (step === 0) {
    body += cellH(36, y);
    body += line(42, y, 70, y, INK, 1.5);
    body += switchH(70, y, true);
    body += text(84, y - 14, L(lang, '闭合', 'closed'), { size: 10, fill: SEC });
    body += line(98, y, 140, y, INK, 1.5);
    body += lampH(156, y);
    body += text(156, y - 18, L(lang, '灯', 'lamp'), { size: 10, fill: RAY });
    body += line(166, y, 210, y, INK, 1.5);
    body += meterH(226, y, 'A');
    body += text(226, y + 22, 'I', { size: 11, fill: RAY });
    body += line(36, y, 36, y2, INK, 1.5);
    body += line(236, y, 236, y2, INK, 1.5);
    body += line(36, y2, 236, y2, INK, 1.5);
    body += switchH(70, y2 - 8, false);
    body += text(150, y2 - 4, L(lang, '断开 I = 0', 'open, I = 0'), { size: 11, fill: MUTED });
  } else {
    body += cellH(34, y);
    body += line(40, y, 64, y, INK, 1.5);
    body += switchH(64, y, true);
    body += text(78, y - 14, 'S', { size: 10 });
    body += line(92, y, 108, y, INK, 1.5);
    body += resistorH(108, y, 34);
    body += text(125, y - 14, 'R₁', { size: 11 });
    body += line(142, y, 156, y, INK, 1.5);
    if (step === 2) {
      body += rheostatH(156, y, 48, 0.65);
      body += text(180, y + 22, 'Rs', { size: 11, fill: RAY });
    } else {
      body += resistorH(156, y, 38);
      body += text(175, y - 14, 'R₂', { size: 11 });
    }
    const after = step === 2 ? 204 : 194;
    body += line(after, y, 220, y, INK, 1.5);
    body += lampH(236, y);
    body += text(236, y - 18, L(lang, '灯', 'lamp'), { size: 10, fill: RAY });
    body += line(34, y, 34, y2, INK, 1.5);
    body += line(246, y, 246, y2, INK, 1.5);
    body += line(34, y2, 246, y2, INK, 1.5);
    if (step === 3) body += text(140, y2 - 8, 'W , Q', { size: 12, fill: SEC });
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body);
}

function drawDensityLab(lang, step) {
  // Junior lab: graduated cylinder V1 → immerse → V2; ρ = m/(V2−V1).
  const titles = {
    '-1': [['量筒测体积', 'Cylinder volume'], ['天平测 m，量筒读 V₁、V₂', 'Balance for m; cylinder for V1, V2']],
    0: [['放入之前', 'Before immersion'], ['记下样品与液面 V₁', 'Note the specimen and level V1']],
    1: [['浸没后读 V₂', 'Read V2 after'], ['V₂ = V₁ + V，并读质量 m', 'V2 = V1 + V, and read mass m']],
    2: [['差值法', 'Difference'], ['ρ = m / (V₂ − V₁)', 'ρ = m / (V2 − V1)']],
    3: [['错误算法', 'Wrong quotient'], ['m/V₂ 比真实密度偏小', 'm/V2 is smaller than the true density']],
    4: [['换样品', 'Another sample'], ['仍用差值法', 'Still use the difference method']],
  };
  const [title, cap] = titles[step];
  const dropped = step !== 0 && step !== -1;
  const v1 = step === 4 ? 22 : 28;
  const v2 = dropped ? v1 + (step === 4 ? 30 : 22) : v1;
  let body = tableBoard(210, 70);
  body += cylinder3d(70, 42, 16, 58, dropped ? v2 : v1);
  body += text(...obl(96, v1 + 4, 42), 'V₁', { anchor: 'start', size: 11, fill: MUTED });
  if (dropped) {
    body += block3d(60, 34, 16, 12, 12, { y0: Math.max(4, v2 - 14) });
    body += text(...obl(96, v2 + 4, 42), 'V₂', { anchor: 'start', size: 11, fill: SEC });
  } else {
    body += block3d(140, 36, 18, 12, 12, { label: L(lang, '样品', 'sample') });
  }
  body += oblPoly3([[145, 0, 22], [195, 0, 22], [195, 22, 22], [145, 22, 22]], { fill: PAPER, w: 1.3 });
  body += text(...obl(170, 11, 22), 'm', { size: 13 });
  if (step === 2) {
    body += text(...obl(170, 40, 36), 'V₂−V₁', { size: 11, fill: SEC });
    body += text(...obl(170, 54, 36), 'ρ', { size: 14, fill: RAY });
  }
  if (step === 3) {
    body += text(...obl(170, 40, 36), 'm/V₂', { size: 12, fill: RAY });
    body += text(...obl(170, 54, 36), L(lang, '偏小', 'low'), { size: 11, fill: RAY });
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function shown(lang, step, table, draw) {
  const row = table[step];
  return panel(lang, row[0][0], row[0][1], row[1][0], row[1][1], draw(row));
}

function drawAc(lang, step) {
  return shown(lang, step, {
    '-1': [['交流示意', 'AC sketch'], ['峰值 Im、Vm 与频率 f', 'Peaks Im, Vm and frequency f']],
    0: [['一个周期', 'One cycle'], ['正负对称的正弦', 'A sine, symmetric about zero']],
    1: [['有效值', 'rms values'], ['Irms = Im/√2，Vrms 同理', 'Irms = Im/√2, and the same for V']],
    2: [['只加倍 Im', 'Double Im only'], ['Irms 也加倍', 'Irms doubles too']],
    3: [['只改变 f', 'Change f only'], ['波形变密，有效值不变', 'Tighter wave, same rms']],
    4: [['只改变 Vm', 'Change Vm only'], ['电压有效值单独核对', 'Check voltage rms on its own']],
  }, () => {
    const z = 44;
    let s = tableBoard(220, 72);
    s += block3d(50, z - 10, 56, 28, 32, { y0: 0, label: L(lang, '源', 'source') });
    const y = 86;
    const amp = step === 2 ? 34 : 20;
    const cycles = step === 3 ? 4 : 1.25;
    s += graphCard(118, 42, 178, 88, (() => {
      let g = dash(128, y, 286, y, MUTED, 1);
      if (step === 4) {
        g += polyLine(sinePts(128, 70, 158, 16, 1.25), MUTED, 1.2, '4 3');
        g += polyLine(sinePts(128, 102, 158, 28, 1.25), RAY, 1.8);
        g += text(132, 58, 'Im', { anchor: 'start', size: 10, fill: MUTED });
        g += text(132, 128, 'Vm', { anchor: 'start', size: 11, fill: RAY });
        return g;
      }
      g += polyLine(sinePts(128, y, 158, amp, cycles), INK, 1.7);
      const rms = amp / Math.SQRT2;
      if (step === 1 || step === 2 || step === -1) {
        g += dash(128, y - rms, 278, y - rms, SEC, 1.2);
        g += text(282, y - rms + 3, 'rms', { anchor: 'start', size: 10, fill: SEC });
      }
      if (step === 0) {
        g += text(180, y - amp - 4, '+', { size: 12, fill: RAY });
        g += text(240, y + amp + 12, '−', { size: 12, fill: SEC });
      }
      return g;
    })());
    return s;
  });
}

function drawAtmosphere(lang, step) {
  const titles = {
    '-1': [['大气压', 'Atmosphere'], ['托里拆利管与马德堡半球', 'Torricelli tube and hemispheres']],
    0: [['水银柱', 'Mercury column'], ['记下 P 和 g，读高度 h', 'Note P and g, read height h']],
    1: [['托里拆利', 'Torricelli'], ['h = P / (ρ g)', 'h = P / (ρ g)']],
    2: [['气压增大', 'Higher pressure'], ['水银柱同比变高', 'The column rises in proportion']],
    3: [['g 增大', 'Larger g'], ['同一气压下水银柱变矮', 'Same pressure, shorter column']],
    4: [['半球', 'Hemispheres'], ['分离力 P·πr²，r 加倍力变 4 倍', 'Separating force P·πr²']],
  };
  const [title, cap] = titles[step];
  let body = tableBoard(220, 72);
  if (step === 4) {
    const [c1x, c1y] = obl(80, 36, 48);
    const [c2x, c2y] = obl(160, 36, 48);
    body += `<ellipse cx="${r(c1x)}" cy="${r(c1y)}" rx="32" ry="22" fill="${PAPER}" stroke="${INK}" stroke-width="1.5"/>`;
    body += `<ellipse cx="${r(c2x)}" cy="${r(c2y)}" rx="32" ry="22" fill="${PAPER}" stroke="${INK}" stroke-width="1.5"/>`;
    body += arrow(c1x + 28, c1y, c1x + 8, c1y, RAY, 1.5);
    body += arrow(c2x - 28, c2y, c2x - 8, c2y, RAY, 1.5);
    body += text(...obl(120, 60, 48), 'F', { size: 13, fill: RAY });
    body += text(...obl(120, 12, 48), 'r', { size: 12, fill: SEC });
  } else {
    const h = step === 2 ? 62 : step === 3 ? 28 : 46;
    body += beaker3d(100, 44, 32, 36, 18);
    // Mercury tube standing in the dish.
    body += oblPoly3([[112, 18, 44], [124, 18, 44], [124, 18 + h, 44], [112, 18 + h, 44]], { fill: MUTED, op: 0.28, w: 1.4 });
    body += text(...obl(140, 18 + h / 2, 44), 'h', { size: 12, fill: SEC });
    body += text(...obl(40, 50, 44), step === 2 ? 'P↑' : 'P', { size: 14 });
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function drawLevels(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['能级', 'Energy levels'], ['束缚能级按 1/n² 排布', 'Bound levels follow 1/n²']],
    0: [['落到 n=1', 'Down to n = 1'], ['读能级差，即光子能量', 'The gap is the photon energy']],
    1: [['吸收与放出', 'Absorb or emit'], ['向上是吸收，向下是放出', 'Up absorbs, down emits']],
    2: [['间隔变密', 'Gaps tighten'], ['越高的能级靠得越近', 'Higher levels sit closer']],
    3: [['同一能级', 'Same level'], ['光子能量为 0', 'Photon energy is 0']],
    4: [['1/n²', '1/n²'], ['能量为负，表示束缚', 'Negative energy means bound']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const ys = [120, 86, 66, 54, 46];
    let s = '';
    ys.forEach((y, i) => {
      const w = 150 - i * 8;
      s += line(70, y, 70 + w, y, INK, i === 0 ? 2 : 1.4);
      s += text(58, y + 4, 'n=' + (i + 1), { anchor: 'end', size: 10, fill: MUTED });
    });
    if (step === 1) {
      s += arrow(150, 120, 150, 66, RAY, 1.6);
      s += arrow(190, 66, 190, 120, SEC, 1.6);
    } else if (step === 3) {
      s += line(120, 86, 200, 86, RAY, 2);
      s += text(210, 90, 'E=0', { anchor: 'start', size: 12, fill: RAY });
    } else if (step !== 2) {
      s += arrow(160, ys[Math.min(4, step === 0 ? 3 : 2)], 160, 120, RAY, 1.5);
    }
    if (step === 4) s += text(230, 70, '∝ 1/n²', { anchor: 'start', size: 12, fill: SEC });
    return s;
  });
}

function drawTunnel(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['势垒', 'Barrier'], ['高度 V₀，宽度 a', 'Height V0, width a']],
    0: [['E < V₀', 'E below V0'], ['波函数渗过势垒', 'The wave leaks through']],
    1: [['隧穿概率', 'Tunnel probability'], ['T 随 κ 与 a 变化', 'T depends on κ and a']],
    2: [['加宽势垒', 'Wider barrier'], ['同一能量下 T 下降', 'T falls at the same energy']],
    3: [['E > V₀', 'E above V0'], ['出现共振峰', 'Resonance peaks appear']],
    4: [['靠近峰', 'Near a peak'], ['T 接近峰值', 'T approaches the peak']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const wide = step === 2;
    const x1 = wide ? 110 : 130;
    const x2 = wide ? 230 : 190;
    const top = step === 3 || step === 4 ? 70 : 48;
    let s = line(30, 110, x1, 110, INK, 1.6);
    s += line(x1, 110, x1, top, INK, 1.6);
    s += line(x1, top, x2, top, INK, 1.6);
    s += line(x2, top, x2, 110, INK, 1.6);
    s += line(x2, 110, 300, 110, INK, 1.6);
    s += text((x1 + x2) / 2, top - 6, 'V₀', { size: 11 });
    s += hDim(x1, x2, 126, 'a', SEC);
    const eY = step === 3 || step === 4 ? 58 : 78;
    s += dash(36, eY, 250, eY, RAY, 1.2);
    s += text(258, eY + 3, 'E', { anchor: 'start', size: 11, fill: RAY });
    if (step === 3 || step === 4) {
      s += polyLine(sinePts(x2, 100, 70, step === 4 ? 16 : 8, 2), SEC, 1.5);
    } else {
      const tail = [];
      for (let i = 0; i <= 24; i++) tail.push([x1 + i * 3, 90 - 16 * Math.exp(-i / (wide ? 5 : 8))]);
      s += polyLine(tail, SEC, 1.5);
    }
    return s;
  });
}

function drawBeats(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['拍', 'Beats'], ['两个靠近的频率', 'Two close frequencies']],
    0: [['包络', 'Envelope'], ['振幅一起一伏', 'The amplitude swells and fades']],
    1: [['拍频', 'Beat frequency'], ['Δf = |f₁ − f₂|', 'Δf = |f1 − f2|']],
    2: [['频率靠近', 'Closer frequencies'], ['拍变慢', 'The beat slows']],
    3: [['频率拉远', 'Frequencies apart'], ['拍变快', 'The beat quickens']],
    4: [['只改变 A', 'Change A only'], ['拍频不变，包络变高', 'Beat rate fixed, envelope taller']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const beats = step === 2 ? 1 : step === 3 ? 3 : 1.6;
    const amp = step === 4 ? 30 : 16;
    const y = 88;
    let s = polyLine(sinePts(30, y, 260, amp, beats * 8, 0, 140), SEC, 1.2);
    const env = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      env.push([30 + t * 260, y - amp * Math.abs(Math.cos(t * beats * Math.PI))]);
    }
    s += polyLine(env, RAY, 1.4, '5 3');
    return s;
  });
}

function drawBell(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['关联', 'Correlation'], ['两个测量角 α、β', 'Two measurement angles α, β']],
    0: [['α = β', 'α = β'], ['关联 −1，异号占满', 'Correlation −1, unlike outcomes fill it']],
    1: [['相差 90°', '90° apart'], ['关联为 0', 'Correlation is 0']],
    2: [['相差 180°', '180° apart'], ['关联 +1，同号占满', 'Correlation +1, like outcomes fill it']],
    3: [['扫描 β', 'Sweep β'], ['关联沿 −cos(α−β)', 'Correlation follows −cos(α−β)']],
    4: [['同号与异号', 'Like and unlike'], ['份额随角度差，不随单角', 'Shares follow the difference']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = circ(90, 86, 28, { fill: PAPER });
    s += circ(210, 86, 28, { fill: PAPER });
    const ang = step === 1 ? 90 : step === 2 ? 180 : step === 3 ? 50 : 0;
    const rad = (ang * Math.PI) / 180;
    s += line(90, 86, 90 + 22, 86, RAY, 1.6);
    s += line(210, 86, 210 + Math.cos(rad) * 22, 86 - Math.sin(rad) * 22, SEC, 1.6);
    s += text(90, 128, 'α', { size: 12, fill: RAY });
    s += text(210, 128, 'β', { size: 12, fill: SEC });
    if (step === 4) {
      const like = step === 2 ? 48 : 18;
      s += box(250, 90, 16, like, { fill: SEC, op: 0.25, stroke: INK, w: 1 });
      s += text(270, 80, L(lang, '同', 'like'), { anchor: 'start', size: 10 });
    }
    return s;
  });
}

function drawBernoulli(lang, step) {
  return shown(lang, step, {
    '-1': [['伯努利', 'Bernoulli'], ['管道或机翼', 'A pipe, or a wing']],
    0: [['连续性', 'Continuity'], ['A₁v₁ = A₂v₂', 'A1 v1 = A2 v2']],
    1: [['压强关系', 'Pressure link'], ['窄处更快，压强更低', 'Narrower, faster, lower pressure']],
    2: [['缩小 A₂', 'Smaller A2'], ['v₂ 增大，P₂ 下降', 'v2 rises, P2 falls']],
    3: [['公式前提失败', 'Formula premise fails'], ['P₂ 出现负值就超出前提', 'A negative P2 is outside the premise']],
    4: [['机翼', 'Wing'], ['升力来自同一 ½ρΔ(v²)', 'Lift uses the same ½ρΔ(v²)']],
  }, () => {
    const z = 44;
    let s = tableBoard(220, 72);
    if (step === 4) {
      s += oblPoly3([[36, 10, z - 6], [110, 26, z], [180, 14, z + 6], [170, 6, z + 4], [100, 12, z], [36, 8, z - 4]], { fill: PAPER, w: 1.6 });
      const pts = sinePts(40, 20, 160, 4, 2).map((p) => obl(p[0] - 20, p[1] * 0.15 + 18, z));
      s += polyLine(pts, SEC, 1.2);
      s += oblArrow3d(120, 24, z, 150, 22, z, RAY, 1.4);
      s += text(...obl(140, 38, z), 'v↑', { size: 12, fill: RAY });
      s += oblArrow3d(140, 8, z, 140, 18, z, RAY, 1.6);
      return s;
    }
    const neck = step === 2 ? 10 : 18;
    const yTop = 18;
    const yBot = 6;
    s += oblPathPts([[28, yTop, z], [100, yTop, z], [130, yTop - neck / 2, z], [200, yTop - neck / 2, z], [220, yTop, z]], { w: 1.6 });
    s += oblPathPts([[28, yBot, z], [100, yBot, z], [130, yBot + neck / 2, z], [200, yBot + neck / 2, z], [220, yBot, z]], { w: 1.6 });
    s += oblArrow3d(48, 12, z, 82, 12, z, SEC, 1.5);
    s += oblArrow3d(150, 14, z, 190, 14, z, RAY, 1.6);
    s += text(...obl(64, 24, z), 'A₁', { size: 11 });
    s += text(...obl(168, 24, z), 'A₂', { size: 11, fill: RAY });
    if (step === 3) s += text(...obl(168, 2, z), 'P₂ < 0', { size: 12, fill: RAY });
    return s;
  });
}

function drawBuoyOrigin(lang, step) {
  return shown(lang, step, {
    '-1': [['浮力来源', 'Origin of buoyancy'], ['上下表面的压力差', 'Pressure difference on the faces']],
    0: [['完全浸没', 'Fully under'], ['读上下压力和 Fb', 'Read the two pressures and Fb']],
    1: [['压力差', 'Pressure difference'], ['Fb = Fup − Fdown = ρgV', 'Fb = Fup − Fdown = ρgV']],
    2: [['沉得更深', 'Deeper'], ['两侧压力都增，差不变', 'Both pressures rise; the difference does not']],
    3: [['部分露出', 'Partly out'], ['Vsub 变小，Fb 变小', 'Vsub shrinks, so does Fb']],
    4: [['边长或密度', 'Size or density'], ['全浸时 Fb 正比于体积和 ρ', 'When covered, Fb scales with volume and ρ']],
  }, () => {
    const sunk = step !== 3;
    const z = 44;
    const level = sunk ? 44 : 32;
    let s = tableBoard(220, 72);
    s += beaker3d(100, z, 46, 62, level);
    const blockY = sunk ? (step === 2 ? 30 : 26) : 36;
    s += block3d(88, z - 8, 24, sunk ? 22 : 14, 18, { y0: blockY });
    const top = blockY + (sunk ? 22 : 14);
    const bot = blockY;
    s += oblArrow3d(100, bot, z, 100, bot - (step === 2 ? 18 : 12), z, SEC, 1.6);
    s += oblArrow3d(100, top, z, 100, top + (step === 1 || step === 0 ? 18 : 12), z, RAY, 1.5);
    s += text(...obl(118, top + 10, z), 'F↓', { anchor: 'start', size: 10, fill: RAY });
    s += text(...obl(118, bot - 6, z), 'F↑', { anchor: 'start', size: 10, fill: SEC });
    return s;
  });
}

function drawBuoyWeigh(lang, step) {
  return shown(lang, step, {
    '-1': [['浸没称重', 'Weighing under liquid'], ['弹簧秤吊着物体', 'A spring scale holds the object']],
    0: [['密度更大', 'Denser object'], ['读 G、Fb 和张力', 'Read G, Fb, and tension']],
    1: [['关系', 'Relation'], ['T = G − Fb', 'T = G − Fb']],
    2: [['液体更密', 'Denser liquid'], ['Fb 增大，张力减小', 'Fb rises, tension falls']],
    3: [['物体更轻', 'Object less dense'], ['细线松弛，不再完全浸没', 'The string slacks']],
    4: [['改变 g', 'Change g'], ['G 和 Fb 都含 g', 'Both G and Fb contain g']],
  }, () => {
    const slack = step === 3;
    const z = 44;
    let s = tableBoard(220, 72);
    s += beaker3d(112, z, 42, 58, 40);
    s += springScale3d(124, z, slack ? 8 : 22, { fat: false });
    if (!slack) s += oblLine([124, 18, z], [124, 28, z], INK, 1.3);
    s += block3d(110, z - 6, 28, slack ? 10 : 18, 16, { y0: slack ? 30 : 18 });
    s += text(...obl(196, slack ? 36 : 28, z), slack ? L(lang, '松', 'slack') : 'T', { anchor: 'start', size: 12, fill: slack ? MUTED : RAY });
    if (step === 4) s += text(...obl(36, 30, z), 'g', { anchor: 'start', size: 16 });
    return s;
  });
}

function drawCapacitance(lang, step) {
  const titles = {
    '-1': [['电容', 'Capacitance'], ['两块平行板', 'Two parallel plates']],
    0: [['定义', 'Definition'], ['C = Q / U', 'C = Q / U']],
    1: [['电荷加倍', 'Double Q'], ['C 加倍', 'C doubles']],
    2: [['电压加倍', 'Double U'], ['C 减半', 'C halves']],
    3: [['同比改变', 'Same factor'], ['C 不变', 'C unchanged']],
    4: [['再取一组', 'Another pair'], ['比值仍然稳定', 'The ratio stays put']],
  };
  const [title, cap] = titles[step];
  const z = 44;
  const gap = step === 2 ? 52 : 34;
  const q = step === 1 ? 5 : step === 4 ? 2 : 3;
  let body = tableBoard(220, 72);
  body += parallelPlates3d(72, z, gap, 58);
  for (let i = 0; i < q; i++) {
    body += text(...obl(76, 18 + i * 10, z), '+', { size: 11, fill: RAY });
    body += text(...obl(72 + gap + 6, 18 + i * 10, z), '−', { size: 11, fill: SEC });
  }
  body += dimFront(72, 72 + gap, step === 2 ? 'U↑' : 'U', SEC, z + 10);
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function drawCarnot(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['卡诺循环', 'Carnot cycle'], ['高温热源与低温热源', 'Hot and cold reservoirs']],
    0: [['读效率', 'Read efficiency'], ['记下 Th、Tc 和 η', 'Note Th, Tc, and η']],
    1: [['公式', 'Formula'], ['η = 1 − Tc/Th', 'η = 1 − Tc/Th']],
    2: [['提高 Tc', 'Raise Tc'], ['效率下降', 'Efficiency falls']],
    3: [['提高 Th', 'Raise Th'], ['效率上升', 'Efficiency rises']],
    4: [['温差消失', 'Temperatures meet'], ['η 接近 0', 'η approaches 0']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const hot = step === 3 ? 36 : step === 4 ? 70 : 48;
    const cold = step === 2 || step === 4 ? 78 : 108;
    let s = box(36, hot, 70, 28, { fill: RAY, op: 0.15 });
    s += box(36, cold, 70, 28, { fill: SEC, op: 0.15 });
    s += text(71, hot + 18, 'Th', { size: 13, fill: RAY });
    s += text(71, cold + 18, 'Tc', { size: 13, fill: SEC });
    s += box(150, 70, 70, 36, { fill: PAPER });
    s += text(185, 92, L(lang, '热机', 'engine'), { size: 12 });
    s += arrow(106, hot + 14, 150, 78, RAY, 1.4);
    s += arrow(150, 100, 106, cold + 10, SEC, 1.4);
    return s;
  });
}

function drawOrbit(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['中心天体', 'Central body'], ['轨道由速度决定', 'Speed chooses the orbit']],
    0: [['读轨道', 'Read the orbit'], ['偏心率、环绕与逃逸', 'Eccentricity, circular, escape']],
    1: [['环绕速度', 'Circular speed'], ['圆轨道，比能量为负', 'A circle, negative specific energy']],
    2: [['椭圆', 'Ellipse'], ['介于环绕和逃逸之间', 'Between circular and escape']],
    3: [['抛物线', 'Parabola'], ['比能量约为 0', 'Specific energy about 0']],
    4: [['双曲线', 'Hyperbola'], ['E > 0', 'E > 0']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = circ(120, 88, 8, { fill: RAY, stroke: 'none' });
    if (step === 1 || step === 0 || step === -1) s += circ(120, 88, 40, { fill: 'none', stroke: SEC, w: 1.5 });
    if (step === 2 || step === -1) s += `<ellipse cx="150" cy="88" rx="70" ry="36" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
    if (step === 3) {
      const pts = [];
      for (let i = -8; i <= 8; i++) pts.push([150 + i * 14, 88 - 4 - i * i * 1.1]);
      s += polyLine(pts, RAY, 1.6);
    }
    if (step === 4) {
      s += path('M 150 40 Q 210 88 150 136', { stroke: SEC, w: 1.6 });
      s += path('M 170 36 Q 250 88 170 140', { stroke: MUTED, w: 1.2, dash: '4 3' });
    }
    return s;
  });
}

function drawCircular(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['匀速圆周', 'Uniform circular'], ['速率不变，方向在变', 'Speed fixed, direction changes']],
    0: [['方向在变', 'Direction changes'], ['速率不变', 'The speed does not']],
    1: [['向心', 'Centripetal'], ['a = v²/r = ω²r', 'a = v²/r = ω²r']],
    2: [['半径变大', 'Larger radius'], ['ω 不变时 v 和 a 都增大', 'At fixed ω, v and a grow']],
    3: [['角速度变大', 'Larger ω'], ['a 按 ω² 增大', 'a grows with ω²']],
    4: [['质量变大', 'Larger mass'], ['F 增大，a 不变', 'F grows, a does not']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const rad = step === 2 ? 48 : 34;
    let s = circ(150, 88, rad, { fill: 'none', stroke: INK, w: 1.5 });
    s += circ(150 + rad, 88, step === 4 ? 8 : 5, { fill: PAPER });
    s += arrow(150 + rad, 88, 150 + rad, 88 - (step === 3 ? 28 : 16), RAY, 1.5);
    s += arrow(150 + rad, 88, 150 + rad - 18, 88, SEC, 1.5);
    s += text(150, 88, step === 4 ? 'm↑' : 'a', { size: 11, fill: SEC });
    return s;
  });
}

function drawCollide(lang, step) {
  return shown(lang, step, {
    '-1': [['碰撞', 'Collision'], ['两辆小车在一条直线上', 'Two carts on one line']],
    0: [['弹性', 'Elastic'], ['记下动量、速度和动能', 'Record momentum, speeds, kinetic energy']],
    1: [['都守恒', 'Both conserved'], ['动量和动能碰后仍相等', 'Momentum and kinetic energy match']],
    2: [['完全非弹性', 'Perfectly inelastic'], ['v₁ = v₂，动能变小', 'v1 = v2, kinetic energy drops']],
    3: [['等质量对心', 'Equal masses'], ['弹性时速度交换', 'Elastic case exchanges the speeds']],
    4: [['靶更重', 'Heavier target'], ['比较两种碰撞的末速度', 'Compare final speeds']],
  }, () => {
    const stick = step === 2;
    const z = 46;
    let s = tableBoard(220, 72);
    s += oblPoly3([[28, 2, z - 12], [200, 2, z - 12], [200, 0, z + 12], [28, 0, z + 12]], { fill: '#ddd8ce', w: 1.1 });
    s += cart3d(42, z, 44, 18, 26);
    s += text(...obl(64, 24, z), 'm₁', { size: 11 });
    s += oblArrow3d(86, 14, z, 108, 14, z, RAY, 1.5);
    if (stick) {
      s += cart3d(128, z, 64, 18, 26);
      s += text(...obl(160, 24, z), 'v', { size: 11, fill: SEC });
    } else {
      s += cart3d(148, z, 40, 18, 26);
      s += text(...obl(168, 24, z), 'm₂', { size: 11 });
      if (step === 3) s += oblArrow3d(148, 14, z, 120, 14, z, SEC, 1.4);
    }
    return s;
  });
}

function drawCoupled(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['耦合摆', 'Coupled pendulums'], ['等长双摆，弱弹簧相连', 'Equal pendulums, weak spring']],
    0: [['一个先动', 'One starts'], ['能量逐渐传给另一个', 'Energy gradually reaches the other']],
    1: [['方程', 'Equations'], ['耦合项是 κ(θ₁−θ₂)', 'The coupling is κ(θ1−θ2)']],
    2: [['能量交换', 'Energy swap'], ['此消彼长，合计守住', 'One falls as the other rises']],
    3: [['同相', 'In phase'], ['耦合项为零，一起摆', 'Coupling term is zero']],
    4: [['κ 或 L', 'κ or L'], ['κ 大则交换快，L 大则摆慢', 'Larger κ swaps faster; larger L swings slower']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const a1 = step === 3 ? 18 : step === 0 ? 22 : 16;
    const a2 = step === 3 ? 18 : step === 0 ? 0 : -14;
    let s = pendulum(100, 42, 62, a1, 7);
    s += pendulum(210, 42, step === 4 ? 78 : 62, a2, 7);
    s += line(100 + Math.sin(a1 * Math.PI / 180) * 40, 42 + Math.cos(a1 * Math.PI / 180) * 40,
      210 + Math.sin(a2 * Math.PI / 180) * 40, 42 + Math.cos(a2 * Math.PI / 180) * 40, RAY, 1.3);
    if (step === 2) {
      s += box(40, 124, 40, 12, { fill: RAY, op: 0.3, stroke: 'none' });
      s += box(220, 124, 16, 12, { fill: SEC, op: 0.3, stroke: 'none' });
    }
    return s;
  });
}

function drawCurrent(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['电流', 'Current'], ['电荷在一段时间里通过截面', 'Charge through a section in a time']],
    0: [['定义', 'Definition'], ['I = Q / t', 'I = Q / t']],
    1: [['时间加倍', 'Double t'], ['电流减半', 'Current halves']],
    2: [['电荷加倍', 'Double Q'], ['电流加倍', 'Current doubles']],
    3: [['同比放大', 'Same factor'], ['I 不变', 'I unchanged']],
    4: [['很短的时间', 'A short time'], ['Q 同比变小则 I 仍相同', 'Q scales down and I stays']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const n = step === 2 ? 6 : step === 4 ? 2 : 4;
    let s = line(40, 88, 280, 88, INK, 1.6);
    for (let i = 0; i < n; i++) s += arrow(70 + i * 28, 88, 88 + i * 28, 88, RAY, 1.4);
    s += line(200, 70, 200, 106, SEC, 1.4);
    s += text(210, 66, step === 1 ? 't↑' : 't', { anchor: 'start', size: 12, fill: SEC });
    return s;
  });
}

function drawCyclotron(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['匀强磁场中的圆', 'Circle in a uniform field'], ['只看半径和角速度', 'Radius and angular speed only']],
    0: [['读 r 与 ω', 'Read r and ω'], ['粒子走圆', 'The particle moves on a circle']],
    1: [['关系', 'Relations'], ['r = mv/(|q|B)，ω = |q|B/m', 'r = mv/(|q|B), ω = |q|B/m']],
    2: [['只增大 v', 'Larger v only'], ['半径增大，ω 不变', 'Radius grows, ω does not']],
    3: [['只增大 B', 'Larger B only'], ['半径变小，ω 变大', 'Radius shrinks, ω grows']],
    4: [['质量或电荷号', 'Mass or sign'], ['m 大则 r 大 ω 小；反号只反向', 'Larger m: bigger r, smaller ω']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const rad = step === 2 ? 48 : step === 3 ? 22 : 34;
    let s = crosses(70, 40, 140, 90, step === 3 ? 12 : 18);
    s += circ(150, 86, rad, { fill: 'none', stroke: RAY, w: 1.7 });
    const dir = step === 4 ? -1 : 1;
    s += arrow(150 + rad, 86, 150 + rad, 86 - dir * 8, RAY, 1.4);
    s += text(150, 86, 'r', { size: 12, fill: SEC });
    return s;
  });
}

function drawDensity(lang, step) {
  const titles = {
    '-1': [['密度', 'Density'], ['同体积的不同物质', 'Same volume, different substance']],
    0: [['读质量', 'Read the mass'], ['选定物质，记下 V 和 ρ', 'Choose a substance, note V and ρ']],
    1: [['公式', 'Formula'], ['m = ρV', 'm = ρV']],
    2: [['酒精与铁', 'Alcohol and iron'], ['同体积，质量按密度比', 'Same volume, mass follows density']],
    3: [['体积加倍', 'Double the volume'], ['质量加倍，密度不变', 'Mass doubles, density does not']],
    4: [['改用 ρ', 'Edit ρ'], ['ρ = m/V 仍然成立', 'ρ = m/V still holds']],
  };
  const [title, cap] = titles[step];
  const z = 42;
  const big = step === 3;
  const w = big ? 34 : 24;
  const h = big ? 28 : 20;
  let body = tableBoard(220, 72);
  body += block3d(28, z, w, h, 20, { label: step === 2 ? L(lang, '酒精', 'alcohol') : 'V' });
  if (step === 2) body += block3d(120, z, 24, h, 20, { label: L(lang, '铁', 'iron'), labelFill: RAY });
  body += springScale3d(172, z, 4);
  body += text(...obl(172, 52, z), step === 3 ? '2m' : 'm', { size: 14 });
  if (step === 1) body += text(...obl(172, 68, z), 'ρV', { size: 12, fill: SEC });
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function drawDipole(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['角分布', 'Angular factor'], ['只画 sin²θ，不是天线', 'sin²θ only, not an antenna']],
    0: [['θ = 0', 'θ = 0'], ['角因子为 0', 'The factor is 0']],
    1: [['θ = 90°', 'θ = 90°'], ['因子为 1，最大方向', 'Factor 1, the maximum']],
    2: [['30° 与 60°', '30° and 60°'], ['60° 明显更大', '60° is clearly larger']],
    3: [['θ = 180°', 'θ = 180°'], ['回到轴上，因子又为 0', 'Back on the axis, factor 0 again']],
    4: [['只是角因子', 'Angular factor only'], ['不是功率或馈电', 'Not power and not a feed']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = line(160, 40, 160, 130, INK, 1.3);
    s += line(70, 86, 250, 86, MUTED, 1);
    const lobe = (scale) => {
      const pts = [];
      for (let i = 0; i <= 40; i++) {
        const th = (i / 40) * Math.PI;
        const rho = scale * Math.sin(th) ** 2;
        pts.push([160 + rho * Math.sin(th), 86 - rho * Math.cos(th)]);
      }
      return polyLine(pts, RAY, 1.5);
    };
    if (step === 1 || step === -1 || step === 4) s += lobe(70);
    if (step === 2) {
      s += lobe(30);
      s += polyLine([[160, 86], [160 + Math.sin(Math.PI / 3) * 52, 86 - Math.cos(Math.PI / 3) * 52]], SEC, 1.4);
    }
    if (step === 0 || step === 3) s += text(200, 50, '0', { size: 16, fill: RAY });
    return s;
  });
}

function drawDispersion(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['色散', 'Dispersion'], ['ω 与 k 不是直线', 'ω versus k is not a straight line']],
    0: [['读三个量', 'Read three quantities'], ['ω、相速度、群速度', 'ω, phase velocity, group velocity']],
    1: [['两种速度', 'Two speeds'], ['vp = ω/k，vg = c²k/ω', 'vp = ω/k, vg = c²k/ω']],
    2: [['增大 k', 'Larger k'], ['vp 与 vg 逐渐靠近', 'vp and vg move together']],
    3: [['增大 ω₀', 'Larger ω0'], ['vp 变大，vg 变小', 'vp rises, vg falls']],
    4: [['ω₀ → 0', 'ω0 → 0'], ['两种速度都靠近 c', 'Both speeds approach c']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const x0 = 50;
    const y0 = 120;
    let s = axes(x0, 40, 200, 80);
    s += axisLabels(x0, 40, 190, 80, 'k', 'ω');
    const pts = [];
    const w0 = step === 3 ? 1.4 : step === 4 ? 0.05 : 0.6;
    for (let i = 0; i <= 24; i++) {
      const k = i / 24;
      const w = Math.sqrt(w0 * w0 + k * k) * 60;
      pts.push([x0 + k * 180, y0 - w]);
    }
    s += polyLine(pts, INK, 1.7);
    const mark = step === 2 ? 18 : 8;
    s += circ(pts[mark][0], pts[mark][1], 3.5, { fill: RAY, stroke: 'none' });
    return s;
  });
}

function drawDoppler(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['多普勒', 'Doppler'], ['声源 S 与观察者 O', 'Source S and observer O']],
    0: [['都静止', 'Both at rest'], ['f′ = f', 'f′ = f']],
    1: [['观察者靠近', 'Observer approaches'], ['分子用 v+vo，f′ 升高', 'Numerator v+vo, f′ rises']],
    2: [['声源靠近', 'Source approaches'], ['分母用 v−vs', 'Denominator uses v−vs']],
    3: [['互相远离', 'Moving apart'], ['频率下降', 'Frequency falls']],
    4: [['只改变 f', 'Change f only'], ['f′ 与 f 成正比', 'f′ scales with f']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = text(70, 120, 'S', { size: 13, bold: true });
    s += text(240, 120, 'O', { size: 13, bold: true, fill: SEC });
    const squeeze = step === 2 || step === 1;
    for (let i = 1; i <= 4; i++) {
      const rad = squeeze && step === 2 ? 12 + i * 14 : 16 + i * 18;
      s += circ(step === 3 ? 120 : 80, 78, rad, { stroke: i === 4 ? RAY : MUTED, w: 1.1 });
    }
    if (step === 1) s += arrow(220, 100, 190, 100, SEC, 1.5);
    if (step === 2) s += arrow(100, 100, 140, 100, RAY, 1.5);
    if (step === 3) s += arrow(100, 108, 70, 108, RAY, 1.4);
    return s;
  });
}

function drawDoubleSlit(lang, step) {
  const titles = {
    '-1': [['双缝', 'Double slit'], ['双缝、屏、条纹', 'Slits, screen, fringes']],
    0: [['中央亮纹', 'Central bright'], ['y = 0 处最亮', 'Brightest at y = 0']],
    1: [['条纹间距', 'Fringe spacing'], ['Δy = λD/d', 'Δy = λD/d']],
    2: [['缝距或波长', 'Slit gap or wavelength'], ['d 小或 λ、D 大则变疏', 'Smaller d, or larger λ or D, spreads them']],
    3: [['光强形状', 'Intensity shape'], ['正比于 cos²', 'Proportional to cos²']],
    4: [['单缝包络', 'Single-slit envelope'], ['再乘 sinc²', 'Times sinc²']],
  };
  const [title, cap] = titles[step];
  const z = 40;
  const slitX = 52;
  const scrX = 168;
  let body = tableBoard(220, 72);
  body += oblPoly3([[16, 2, z - 4], [200, 2, z - 4], [200, 2, z + 4], [16, 2, z + 4]], { fill: '#d8d2c6', w: 1.2 });
  body += slitPlate3d(slitX, z, 54, 28, 5, true);
  body += candle3d(24, z, { h: 22, lit: true, thin: true });
  body += screenOnStand(scrX, z, 50);
  for (let i = -2; i <= 2; i++) {
    const yy = 30 + i * (step === 2 ? 9 : 6);
    body += oblLine([scrX - 1, yy, z + 14], [scrX - 1, yy, z - 14], i === 0 ? RAY : SEC, i === 0 ? 2.5 : 1.3);
  }
  body += oblRay([34, 32, z], [slitX, 30, z], RAY);
  body += oblRay([34, 32, z], [slitX, 36, z], RAY);
  body += dimFront(slitX, scrX, 'D', SEC, z + 8);
  if (step === 1) body += text(...obl(slitX + 6, 48, z + 12), 'd', { size: 11, fill: SEC });
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function drawEcho(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['回声测距', 'Echo range'], ['声音走到反射面再回来', 'Sound goes out and comes back']],
    0: [['读距离', 'Read the distance'], ['记下 t 和 v', 'Note t and v']],
    1: [['公式', 'Formula'], ['s = vt/2', 's = v t / 2']],
    2: [['时间加倍', 'Double t'], ['距离加倍', 'Distance doubles']],
    3: [['声速改变', 'Different speed'], ['同一时间，距离正比于 v', 'Same time, distance scales with v']],
    4: [['忘了除 2', 'Forgetting the half'], ['vt 恰好是读数的两倍', 'v t is exactly twice the reading']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const sDist = step === 2 ? 150 : 100;
    let body = box(40, 70, 28, 40, { fill: PAPER });
    body += text(54, 94, L(lang, '源', 'src'), { size: 11 });
    body += line(40 + sDist, 48, 40 + sDist, 124, INK, 2);
    body += hatchesV(40 + sDist, 48, 124, true);
    body += ray(70, 82, 40 + sDist, 70, RAY);
    body += ray(40 + sDist, 98, 70, 100, SEC);
    body += hDim(68, 40 + sDist, 132, step === 4 ? 'vt' : 's', SEC);
    return body;
  });
}

function drawEfficiency(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['效率', 'Efficiency'], ['输入分成有用和浪费', 'Input splits into useful and waste']],
    0: [['读 η', 'Read η'], ['记下 Ein 和 Eu', 'Note Ein and Eu']],
    1: [['公式', 'Formula'], ['η = Eu/Ein，浪费 = Ein−Eu', 'η = Eu/Ein, waste = Ein−Eu']],
    2: [['有用变多', 'More useful'], ['效率升高', 'Efficiency rises']],
    3: [['输入变多', 'More input'], ['效率下降，浪费变大', 'Efficiency falls, waste grows']],
    4: [['没有有用输出', 'No useful output'], ['效率为 0', 'Efficiency is 0']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const eu = step === 4 ? 0 : step === 2 ? 36 : 20;
    const waste = step === 3 ? 36 : step === 4 ? 40 : 18;
    let s = arrow(30, 80, 110, 80, INK, 1.8);
    s += text(60, 70, 'Ein', { size: 12 });
    s += box(110, 62, 40, 36, { fill: PAPER });
    if (eu) s += arrow(150, 70, 230, 70, SEC, 1.6);
    s += arrow(150, 100, 230, 120, RAY, 1.5);
    s += text(240, 74, eu ? 'Eu' : '0', { anchor: 'start', size: 12, fill: SEC });
    s += text(240, 124, L(lang, '浪费', 'waste'), { anchor: 'start', size: 11, fill: RAY });
    s += box(236, 112, waste, 8, { fill: RAY, op: 0.25, stroke: 'none' });
    return s;
  });
}

function drawEmWave(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['电磁波', 'Electromagnetic wave'], ['E 与 B 互相垂直', 'E and B are perpendicular']],
    0: [['同相', 'In phase'], ['一起变号，没有相位差', 'They change sign together']],
    1: [['波速', 'Wave speed'], ['c = fλ', 'c = fλ']],
    2: [['频率升高', 'Higher frequency'], ['波长变短，仍同相', 'Shorter wavelength, still in phase']],
    3: [['E 的振幅', 'E amplitude'], ['B 按 |E|/c 一起变', 'B follows |E|/c']],
    4: [['传播方向', 'Direction of travel'], ['与 E、B 都垂直', 'Perpendicular to both E and B']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const cycles = step === 2 ? 3 : 1.4;
    const ampE = step === 3 ? 28 : 16;
    let s = arrow(30, 90, 300, 90, INK, 1.2);
    s += polyLine(sinePts(40, 90, 230, ampE, cycles), RAY, 1.7);
    s += polyLine(sinePts(40, 90, 230, step === 3 ? 18 : 10, cycles), SEC, 1.5);
    s += text(36, 64, 'E', { size: 12, fill: RAY });
    s += text(36, 112, 'B', { size: 12, fill: SEC });
    if (step === 4) s += text(250, 70, L(lang, '传播', 'travel'), { size: 11, fill: MUTED });
    return s;
  });
}

function drawEnergy(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['斜面能量', 'Incline energy'], ['斜面接到一段水平面', 'An incline running onto a flat']],
    0: [['没有摩擦', 'No friction'], ['机械能保持 m g H', 'Mechanical energy stays m g H']],
    1: [['沿斜面', 'On the incline'], ['a = g sin α', 'a = g sin α']],
    2: [['加上摩擦', 'Add friction'], ['机械能下降，水平段停下', 'Energy falls; it stops on the flat']],
    3: [['更陡', 'Steeper'], ['下滑更快', 'It speeds up more']],
    4: [['只增大质量', 'Mass only'], ['μ=0 时加速度不变', 'With μ = 0, acceleration is unchanged']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const ang = step === 3 ? 38 : 24;
    const rad = (ang * Math.PI) / 180;
    const x0 = 40;
    const y0 = 120;
    const len = 120;
    const x1 = x0 + Math.cos(rad) * len;
    const y1 = y0 - Math.sin(rad) * len;
    let s = line(x1, y1, x0, y0, INK, 1.8) + line(x0, y0, 280, y0, INK, 1.8);
    const bx = step === 2 ? 200 : x1 - 20;
    const by = step === 2 ? y0 - 22 : y1 + 10;
    s += block(bx, by, 26, 18);
    if (step !== 2) s += arrow(bx, by, bx - 16, by + 12, RAY, 1.4);
    s += vDim(x1 + 16, y1, y0, 'H', SEC);
    if (step === 1) s += text(120, 70, 'α', { size: 13, fill: RAY });
    return s;
  });
}

function drawShare(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['能量分配', 'Energy share'], ['一个总量分进两个库', 'One store split into two']],
    0: [['读两库', 'Read both stores'], ['E₁、E₂ 与合计', 'E1, E2, and the total']],
    1: [['比例', 'Fraction'], ['E₂ = f E₀', 'E2 = f E0']],
    2: [['f 从 0 到 1', 'f from 0 to 1'], ['能量从库 1 转到库 2', 'Energy moves from store 1 to store 2']],
    3: [['总量变大', 'Larger total'], ['两库同比增大', 'Both stores scale']],
    4: [['各一半', 'Half each'], ['f = 0.5，两库相等', 'f = 0.5, the stores match']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const f = step === 2 ? 0.85 : step === 4 ? 0.5 : step === 0 ? 0.35 : 0.4;
    const scale = step === 3 ? 70 : 52;
    let s = box(70, 120 - f * scale, 50, f * scale, { fill: RAY, op: 0.25 });
    s += box(170, 120 - (1 - f) * scale, 50, (1 - f) * scale, { fill: SEC, op: 0.25 });
    s += text(95, 134, 'E₁', { size: 12, fill: RAY });
    s += text(195, 134, 'E₂', { size: 12, fill: SEC });
    return s;
  });
}

function drawPotential(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['匀强电场', 'Uniform field'], ['平行极板，间距 d', 'Parallel plates, separation d']],
    0: [['电势差', 'Potential difference'], ['U = Ed', 'U = E d']],
    1: [['电荷的功', 'Work on a charge'], ['W = qU', 'W = q U']],
    2: [['间距变大', 'Larger d'], ['U 和 |W| 都增大', 'U and |W| both grow']],
    3: [['负电荷', 'Negative charge'], ['功的符号反过来', 'The sign of the work flips']],
    4: [['场强加倍', 'Double E'], ['U 和 W 都加倍', 'U and W both double']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const gap = step === 2 ? 90 : 60;
    let s = line(80, 40, 80, 130, INK, 2);
    s += line(80 + gap, 40, 80 + gap, 130, SEC, 2);
    for (let i = 0; i < (step === 4 ? 4 : 3); i++) s += arrow(92, 52 + i * 22, 80 + gap - 12, 52 + i * 22, RAY, 1.3);
    s += text(80 + gap / 2, 146, 'd', { size: 12, fill: SEC });
    if (step === 1 || step === 3) s += chargeBall(80 + gap / 2, 86, step === 3 ? '−' : '+', 12);
    return s;
  });
}

function wellFig(M, finite, step) {
  const { line, polyLine, text } = M;
  const x1 = 70;
  const x2 = step === 2 ? 230 : 190;
  const top = finite ? 48 : 36;
  let s = line(24, 100, x1, 100, INK, 1.6);
  s += line(x1, 100, x1, top, INK, 1.7);
  s += line(x1, top, x2, top, finite ? INK : 'none', finite ? 1.5 : 0);
  if (!finite) {
    s += line(x1, 36, x1, 100, INK, 1.7);
  }
  s += line(x2, top, x2, 100, INK, 1.7);
  s += line(x2, 100, 300, 100, INK, 1.6);
  const n = step === 1 ? 3 : step === 0 ? 1 : 2;
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const u = i / 40;
    const x = x1 + u * (x2 - x1);
    let y = 100 - Math.sin(n * Math.PI * u) * 28;
    if (finite && (u < 0.02 || u > 0.98)) y = 100 - Math.sin(n * Math.PI * Math.min(0.98, Math.max(0.02, u))) * 18;
    pts.push([x, y]);
  }
  if (finite && step !== 4) {
    pts.unshift([x1 - 16, 100 - 6]);
    pts.push([x2 + 16, 100 - 6]);
  }
  s += polyLine(pts, SEC, 1.6);
  return s;
}

function drawFinite(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['有限深势阱', 'Finite well'], ['波函数可以渗出阱外', 'The wave can leak outside']],
    0: [['束缚态', 'Bound states'], ['读个数、基态和宇称', 'Count, ground state, parity']],
    1: [['比无限阱低', 'Below the infinite well'], ['基态能量更低', 'The ground energy is lower']],
    2: [['改变宽度', 'Change the width'], ['数目和位置一起变', 'Count and positions both move']],
    3: [['阱变浅', 'Shallower well'], ['束缚态变少', 'Fewer bound states']],
    4: [['透射', 'Transmission'], ['高于阱口时 T 明显变大', 'T rises once E clears the well']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    if (step === 4) {
      let s = axes(48, 40, 200, 80);
      s += axisLabels(48, 40, 190, 80, 'E', 'T');
      s += polyLine([[48, 110], [120, 104], [150, 70], [230, 48]], RAY, 1.7);
      return s;
    }
    let s = wellFig(M, true, step);
    if (step === 3) s += text(200, 60, 'V₀↓', { size: 12, fill: RAY });
    return s;
  });
}

function drawInfinite(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['无限深势阱', 'Infinite well'], ['两端波函数为零', 'The wave is zero at both walls']],
    0: [['基态', 'Ground state'], ['n = 1，内部无节点', 'n = 1, no interior node']],
    1: [['更高能级', 'Higher levels'], ['节点数是 n−1，能量按 n²', 'Nodes are n−1; energy follows n²']],
    2: [['宽度加倍', 'Double L'], ['同一 n 的能量变为 1/4', 'Same n, energy becomes 1/4']],
    3: [['阱壁', 'The walls'], ['x = 0 和 x = L 处为零', 'Zero at x = 0 and x = L']],
    4: [['核对 n²', 'Check n²'], ['E₃/E₁ 接近 9', 'E3/E1 is about 9']],
  }, (M) => wellFig(M, false, step));
}

function drawCompose(lang, step) {
  return shown(lang, step, {
    '-1': [['同一直线上的力', 'Collinear forces'], ['先看方向，再相加', 'Mind the sense, then add']],
    0: [['同向', 'Same sense'], ['合力等于两者之和', 'The resultant is the sum']],
    1: [['反向且较小', 'Smaller opposite'], ['合力变小，仍向右', 'Smaller resultant, still to the right']],
    2: [['等大反向', 'Equal and opposite'], ['合力为 0', 'Resultant is 0']],
    3: [['反向且更大', 'Larger opposite'], ['合力向左', 'Resultant points left']],
    4: [['不要取绝对值再加', 'Do not add the sizes'], ['方向相反时那样会算大', 'That overcounts when they oppose']],
  }, () => {
    const f2 = step === 0 ? 40 : step === 1 ? -24 : step === 2 ? -40 : step === 3 ? -64 : 36;
    const z = 46;
    let s = tableBoard(220, 72);
    s += block3d(90, z - 8, 48, 16, 28, { y0: 0 });
    s += oblLine([40, 10, z], [200, 10, z], MUTED, 1.2);
    s += oblArrow3d(70, 20, z, 70 + 44, 20, z, RAY, 1.8);
    s += text(...obl(86, 34, z), 'F₁', { size: 12, fill: RAY });
    if (f2 !== 0) s += oblArrow3d(168, 20, z, 168 + f2, 20, z, SEC, 1.8);
    s += text(...obl(168, 34, z), 'F₂', { size: 12, fill: SEC });
    return s;
  });
}

function drawTorque(lang, step) {
  return shown(lang, step, {
    '-1': [['力矩', 'Torque'], ['力臂是支点到力的作用线', 'The arm is from the pivot to the line of force']],
    0: [['读力矩', 'Read the torque'], ['τ = s F sin θ', 'τ = s F sin θ']],
    1: [['力更大', 'Larger force'], ['力矩同比增大', 'Torque scales']],
    2: [['沿杆的力', 'Force along the rod'], ['sin θ = 0，力矩为 0', 'sin θ = 0, torque is 0']],
    3: [['垂直', 'Perpendicular'], ['|τ| 最大', '|τ| is largest']],
    4: [['改作用点', 'Move the point'], ['同一力，作用点不同力矩不同', 'Same force, different point, different torque']],
  }, () => {
    const th = step === 2 ? 0 : step === 3 ? 90 : 50;
    const rad = (th * Math.PI) / 180;
    const pivot = step === 4 ? 80 : 118;
    const z = 46;
    let s = tableBoard(220, 72);
    s += fulcrum3d(118, z);
    s += oblLine([44, 14, z], [196, 14, z], INK, 2.4);
  const fx = pivot + Math.cos(rad) * 30;
    const fy = 14 + Math.sin(rad) * 30;
    s += oblArrow3d(pivot, 14, z, fx, fy, z, RAY, 1.7);
    s += text(...obl(pivot, 38, z), 's', { size: 12, fill: SEC });
    return s;
  });
}

function drawFourier(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['方波级数', 'Square-wave series'], ['奇次正弦叠成方波', 'Odd sines build a square wave']],
    0: [['只有基频', 'Fundamental only'], ['N = 1', 'N = 1']],
    1: [['多项', 'More terms'], ['平台变平，边沿出现起伏', 'Flatter top, ripple at the edge']],
    2: [['部分和', 'Partial sum'], ['(4A/π) Σ sin(kωt)/k', '(4A/π) Σ sin(kωt)/k']],
    3: [['改变振幅', 'Change amplitude'], ['高度变化，形状不变', 'Height changes, shape does not']],
    4: [['改变基频', 'Change the fundamental'], ['谐波仍是 1、3、5 倍', 'Harmonics stay 1, 3, 5 times']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const N = step === 0 ? 1 : step === 4 ? 5 : 9;
    const amp = step === 3 ? 32 : 18;
    const cycles = step === 4 ? 2.4 : 1.2;
    const pts = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * cycles * Math.PI * 2;
      let y = 0;
      for (let k = 1; k <= N; k += 2) y += Math.sin(k * t) / k;
      pts.push([30 + (i / 100) * 260, 88 - y * amp]);
    }
    return polyLine(pts, step === 0 ? SEC : INK, 1.7);
  });
}

function drawFrames(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['参照系', 'Frames'], ['地面、小车、人', 'Ground, cart, person']],
    0: [['地面', 'Ground'], ['这是存储的速度', 'These are the stored speeds']],
    1: [['以车为参照', 'Cart frame'], ['人的速度变成相对小车', 'The person is seen from the cart']],
    2: [['以人为参照', 'Person frame'], ['小车速度变成相对人', 'The cart is seen from the person']],
    3: [['速度相同', 'Equal speeds'], ['互相看着是静止', 'Each sees the other at rest']],
    4: [['改变车速', 'Change the cart'], ['其余物体的相对速度一起变', 'Other relative speeds move with it']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = ground(24, 300, 124);
    s += block(70, 96, 70, 24);
    s += text(105, 112, L(lang, '车', 'cart'), { size: 11 });
    s += circ(180, 86, 10, { fill: PAPER });
    s += text(180, 90, L(lang, '人', 'person'), { size: 9 });
    const vc = step === 3 ? 18 : step === 4 ? 34 : 20;
    const vp = step === 3 ? 18 : 12;
    if (step !== 1) s += arrow(140, 108, 140 + vc, 108, RAY, 1.4);
    if (step !== 2) s += arrow(180, 70, 180 + (step === 1 ? vp - vc : vp), 70, SEC, 1.4);
    return s;
  });
}

function drawGravity(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['重力', 'Weight'], ['G = mg，g 看地点', 'G = mg, and g depends on place']],
    0: [['地球', 'Earth'], ['g = 9.80', 'g = 9.80']],
    1: [['月球', 'Moon'], ['约为地球的 1.62/9.80', 'About 1.62/9.80 of Earth']],
    2: [['火星', 'Mars'], ['g = 3.71，介于两者之间', 'g = 3.71, between the two']],
    3: [['质量加倍', 'Double the mass'], ['G 加倍', 'G doubles']],
    4: [['质量不是重力', 'Mass is not weight'], ['g 变了，G 就变', 'Change g and G changes']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const g = step === 1 ? 1.62 : step === 2 ? 3.71 : 9.8;
    const m = step === 3 ? 2 : 1;
    const len = Math.min(70, g * m * 3.2);
    let s = circ(80, 90, step === 1 ? 22 : step === 2 ? 28 : 36, { fill: PAPER });
    const name = step === 1 ? L(lang, '月', 'Moon') : step === 2 ? L(lang, '火', 'Mars') : L(lang, '地', 'Earth');
    s += text(80, 94, name, { size: 12 });
    s += block(180, 70, 36, 28);
    s += arrow(198, 98, 198, 98 + len, RAY, 1.8);
    s += text(214, 110, 'G', { anchor: 'start', size: 13, fill: RAY });
    return s;
  });
}

function drawHalf(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['半衰期', 'Half-life'], ['剩余份额随时间下降', 'The remaining fraction falls with time']],
    0: [['起点', 'The start'], ['t = 0 时 N = N₀', 'At t = 0, N = N0']],
    1: [['一个半衰期', 'One half-life'], ['N 约为 N₀/2', 'N is about N0/2']],
    2: [['两个半衰期', 'Two half-lives'], ['N 约为 N₀/4', 'N is about N0/4']],
    3: [['更长的半衰期', 'Longer half-life'], ['同一时刻剩余更多', 'More remains at the same time']],
    4: [['改变 N₀', 'Change N0'], ['形状不变，各点同比缩放', 'Shape fixed, every point scales']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const x0 = 48;
    const y0 = 120;
    let s = axes(x0, 36, 210, 84);
    s += axisLabels(x0, 36, 200, 84, 't', 'N');
    const slow = step === 3;
    const scale = step === 4 ? 0.7 : 1;
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const y = y0 - 70 * scale * Math.exp(-(slow ? 1.2 : 2.4) * t);
      pts.push([x0 + t * 190, y]);
    }
    s += polyLine(pts, INK, 1.7);
    if (step === 1 || step === 2) {
      const k = step === 1 ? 0.28 : 0.5;
      s += dash(x0 + k * 190, 40, x0 + k * 190, y0, SEC, 1.1);
    }
    return s;
  });
}

function drawEngine(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['热机循环', 'Engine cycle'], ['p–V 图上的闭合路径', 'A closed path on the p–V diagram']],
    0: [['四个冲程', 'Four strokes'], ['按顺序走一圈', 'One lap in order']],
    1: [['效率与功', 'Efficiency and work'], ['阴影面积是净功 W', 'The shaded area is the net work W']],
    2: [['不是吸热', 'Not the heat in'], ['面积等于 W，不等于 Qin', 'The area equals W, not Qin']],
    3: [['压缩比', 'Compression ratio'], ['r 增大则效率升高', 'Larger r, higher efficiency']],
    4: [['吸热变多', 'More heat in'], ['W 同比增大，η 不变', 'W scales, η does not']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const x0 = 70;
    const y0 = 120;
    let s = axes(x0, 40, 180, 80);
    s += axisLabels(x0, 40, 170, 80, 'V', 'p');
    const wide = step === 3 ? 150 : 110;
    const pts = [[x0 + 20, y0 - 20], [x0 + 20, y0 - 70], [x0 + wide, y0 - 50], [x0 + wide, y0 - 16], [x0 + 20, y0 - 20]];
    if (step === 1 || step === 2 || step === 4) s += poly(pts, { fill: RAY, op: step === 4 ? 0.28 : 0.16, stroke: 'none' });
    s += polyLine(pts, INK, 1.7);
    return s;
  });
}

function drawHydrogen(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['径向概率', 'Radial probability'], ['P(r) 对全部 r 积分接近 1', 'P(r) over all r integrates near 1']],
    0: [['基态', 'Ground state'], ['n=1，l=0，一个峰', 'n=1, l=0, one peak']],
    1: [['有节点', 'A node'], ['n=2，l=0，主峰外移', 'n=2, l=0, the main peak moves out']],
    2: [['改变 l', 'Change l'], ['n=2，l=1，节点结构改变', 'n=2, l=1, the nodes change']],
    3: [['更高的 n', 'Higher n'], ['峰继续外移', 'The peak keeps moving out']],
    4: [['峰与节点', 'Peak and node'], ['P(r) 不是 R(r) 本身', 'P(r) is not R(r) itself']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const x0 = 46;
    const y0 = 120;
    let s = axes(x0, 40, 220, 80);
    s += axisLabels(x0, 40, 210, 80, 'r', 'P');
    const pts = [];
    const n = step === 0 || step === -1 ? 1 : step === 3 ? 3 : 2;
    for (let i = 0; i <= 50; i++) {
      const x = i / 50;
      const peak = 0.25 + (n - 1) * 0.12;
      const y = Math.exp(-((x - peak) ** 2) / 0.02) * (step === 1 && x < 0.18 ? x / 0.18 : 1);
      const node = step === 1 && x > 0.12 && x < 0.2 ? 0.15 : 1;
      pts.push([x0 + x * 200, y0 - y * node * 60]);
    }
    s += polyLine(pts, SEC, 1.7);
    return s;
  });
}

function drawIdeal(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['理想气体', 'Ideal gas'], ['汽缸、活塞、气体', 'Cylinder, piston, gas']],
    0: [['状态方程', 'Equation of state'], ['p = nRT/V', 'p = n R T / V']],
    1: [['体积加倍', 'Double V'], ['压强减半', 'Pressure halves']],
    2: [['温度加倍', 'Double T'], ['压强加倍', 'Pressure doubles']],
    3: [['物质的量加倍', 'Double n'], ['压强加倍', 'Pressure doubles']],
    4: [['等压膨胀', 'Isobaric expansion'], ['T 与 V 同倍，p 不变', 'T and V scale together, p stays']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const top = step === 1 || step === 4 ? 48 : 70;
    let s = piston(120, 36, 70, 90, top);
    s += box(122, top + 8, 66, 116 - top, { fill: SEC, op: step === 2 || step === 3 ? 0.22 : 0.1, stroke: 'none' });
    s += text(230, 80, step === 1 ? 'p/2' : step === 4 ? 'p' : 'p', { anchor: 'start', size: 14, fill: RAY });
    return s;
  });
}

function drawImageCharge(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['像电荷', 'Image charge'], ['导体平面的另一侧', 'On the other side of a conducting plane']],
    0: [['镜像位置', 'Mirror position'], ['像在平面正下方同样距离', 'The image sits the same distance below']],
    1: [['吸引力', 'Attractive force'], ['大小 kq²/(2h)²，指向平面', 'Size kq²/(2h)², toward the plane']],
    2: [['高度减半', 'Half the height'], ['力变为 4 倍', 'The force becomes 4 times']],
    3: [['电荷变大', 'Larger charge'], ['力按 q² 增大', 'Force scales with q²']],
    4: [['不是真实电荷', 'Not a real charge'], ['导体内部并没有放电荷', 'Nothing is placed inside the conductor']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const h = step === 2 ? 24 : 42;
    let s = line(40, 88, 280, 88, INK, 2);
    s += hatchesH(40, 280, 88, true);
    s += chargeBall(150, 88 - h, '+', step === 3 ? 18 : 13);
    s += chargeBall(150, 88 + h, step === 4 ? '?' : '−', 13);
    s += dash(150, 88 - h + 14, 150, 88 + h - 14, MUTED, 1.1);
    s += vDim(176, 88 - h, 88, 'h', SEC);
    return s;
  });
}

function drawInertia(lang, step) {
  return shown(lang, step, {
    '-1': [['惯性演示', 'Inertia'], ['小车上的木块，前方有挡板', 'A block on a cart, with a stop ahead']],
    0: [['没有摩擦', 'No friction'], ['车被挡住后木块仍前进', 'After the cart stops, the block keeps going']],
    1: [['加上摩擦', 'Add friction'], ['木块减速，a = −μg', 'The block slows, a = −μg']],
    2: [['摩擦更大', 'More friction'], ['相对小车更快停住', 'It stops relative to the cart sooner']],
    3: [['挡板移近', 'Stop moves closer'], ['共同匀速段变短', 'The shared coast is shorter']],
    4: [['初速度', 'Initial speed'], ['碰板前更快，碰后加速度仍由 μ、g 决定', 'Faster before the stop; after, only μ and g']],
  }, () => {
    const cartX = step === 3 ? 130 : 70;
    const z = 46;
    let s = tableBoard(220, 72);
    s += oblPoly3([[28, 2, z - 12], [200, 2, z - 12], [200, 0, z + 12], [28, 0, z + 12]], { fill: '#ddd8ce', w: 1.1 });
    s += oblLine([178, 4, z], [178, 28, z], INK, 2.4);
    s += cart3d(cartX, z, 66, 16, 26);
    s += block3d(cartX + (step === 0 ? 42 : 14), z - 4, 22, 14, 14, { y0: 18 });
    if (step === 4) s += oblArrow3d(cartX + 50, 18, z, cartX + 86, 18, z, RAY, 1.5);
    return s;
  });
}

function drawInternal(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['内能', 'Internal energy'], ['热量和功都能改变 ΔU', 'Heat and work can both change ΔU']],
    0: [['都为正', 'Both positive'], ['ΔU 等于两者之和', 'ΔU is their sum']],
    1: [['一进一出', 'One in, one out'], ['Q = −W 时 ΔU = 0', 'If Q = −W, then ΔU = 0']],
    2: [['只放热', 'Heat leaves'], ['W = 0，内能下降', 'W = 0, internal energy falls']],
    3: [['只做功', 'Work in only'], ['Q = 0，内能上升', 'Q = 0, internal energy rises']],
    4: [['交换数值', 'Swap the values'], ['ΔU 不变', 'ΔU is unchanged']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = box(120, 60, 80, 56, { fill: PAPER });
    s += text(160, 92, 'ΔU', { size: 14 });
    if (step !== 3) s += arrow(40, 78, 120, 78, RAY, 1.6);
    if (step !== 2) s += arrow(40, 104, 120, 104, SEC, 1.6);
    s += text(28, 82, step === 2 ? 'Q<0' : 'Q', { anchor: 'start', size: 12, fill: RAY });
    s += text(28, 108, 'W', { anchor: 'start', size: 12, fill: SEC });
    return s;
  });
}

function drawIsing(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['伊辛格子', 'Ising grid'], ['自旋向上或向下', 'Spins point up or down']],
    0: [['磁化与温度', 'Magnetisation and temperature'], ['标出 Tc', 'Mark Tc']],
    1: [['Tc 以下', 'Below Tc'], ['成片同向，|M| 明显', 'Patches align, |M| is clear']],
    2: [['Tc 以上', 'Above Tc'], ['更乱，|M| 接近 0', 'More mixed, |M| near 0']],
    3: [['涨落', 'Fluctuations'], ['台阶仍在 Tc 附近', 'The step stays near Tc']],
    4: [['更大的格子', 'Larger grid'], ['降采样只影响绘制', 'Downsampling only affects the drawing']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    if (step === 0 || step === 3) {
      let s = axes(48, 40, 200, 80);
      s += axisLabels(48, 40, 190, 80, 'T', '|M|');
      s += polyLine([[48, 58], [120, 62], [140, 100], [230, 112]], INK, 1.7);
      s += dash(140, 40, 140, 120, RAY, 1.1);
      s += text(148, 52, 'Tc', { anchor: 'start', size: 11, fill: RAY });
      return s;
    }
    const ordered = step !== 2;
    const n = step === 4 ? 8 : 5;
    let s = '';
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        const up = ordered ? ((i + j) % 5 !== 0) : ((i * 3 + j * 5) % 2 === 0);
        const x = 70 + i * 22;
        const y = 46 + j * 14;
        s += arrow(x, up ? y + 10 : y, x, up ? y : y + 10, up ? RAY : SEC, 1.2);
      }
    }
    return s;
  });
}

function drawKinetic(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['气体动理论', 'Kinetic theory'], ['容器里的分子', 'Molecules in a box']],
    0: [['读压强', 'Read the pressure'], ['记下 ρ 和 vrms', 'Note ρ and vrms']],
    1: [['公式', 'Formula'], ['p = ρ vrms² / 3', 'p = ρ vrms² / 3']],
    2: [['速率加倍', 'Double the speed'], ['压强变为 4 倍', 'Pressure becomes 4 times']],
    3: [['密度加倍', 'Double the density'], ['压强加倍', 'Pressure doubles']],
    4: [['一减一半一加倍', 'Half ρ, double speed'], ['压强变为 2 倍', 'Pressure becomes 2 times']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = box(70, 48, 160, 80, { fill: PAPER });
    const n = step === 3 ? 12 : 7;
    const sp = step === 2 || step === 4 ? 16 : 8;
    for (let i = 0; i < n; i++) {
      const x = 86 + (i % 4) * 34;
      const y = 64 + Math.floor(i / 4) * 22;
      s += circ(x, y, 4, { fill: PAPER, stroke: SEC });
      s += arrow(x, y, x + sp, y - 4, RAY, 1.1);
    }
    return s;
  });
}

function drawLaser(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['腔长', 'Cavity length'], ['两面镜子之间的距离 L', 'Distance L between two mirrors']],
    0: [['模式间隔', 'Mode spacing'], ['Δν = c / (2L)', 'Δν = c / (2L)']],
    1: [['腔长加倍', 'Double L'], ['间隔减半', 'The spacing halves']],
    2: [['腔长缩短', 'Shorter cavity'], ['模式分得更开', 'Modes sit farther apart']],
    3: [['用 c 心算', 'Check with c'], ['c = 3.00×10⁸ m/s', 'c = 3.00×10⁸ m/s']],
    4: [['不是功率', 'Not a power'], ['Δν 不是输出功率', 'Δν is not an output power']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const L = step === 1 ? 180 : step === 2 ? 80 : 130;
    const x = 160 - L / 2;
    let s = line(x, 50, x, 120, INK, 3);
    s += line(x + L, 50, x + L, 120, INK, 3);
    s += hDim(x, x + L, 136, 'L', SEC);
    const gaps = step === 1 ? 3 : step === 2 ? 2 : 3;
    for (let i = 0; i < gaps; i++) s += ray(x + 6, 70 + i * 10, x + L - 6, 70 + i * 10, RAY);
    return s;
  });
}

function drawContract(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['长度收缩', 'Length contraction'], ['杆在相对运动的参照系里', 'A rod in a relatively moving frame']],
    0: [['很慢', 'Very slow'], ['ℓ 几乎等于 ℓ₀', 'ℓ is almost ℓ0']],
    1: [['速度增大', 'Larger speed'], ['γ 增大，ℓ 变短', 'γ grows, ℓ shortens']],
    2: [['静长加倍', 'Double the rest length'], ['收缩后的长度也加倍', 'The contracted length doubles too']],
    3: [['核对 γ', 'Check γ'], ['ℓ₀ / ℓ = γ', 'ℓ0 / ℓ = γ']],
    4: [['不是自身变短', 'Not shorter for itself'], ['变短的是相对运动中的长度', 'The shorter length is in the moving frame']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const w0 = step === 2 ? 160 : 120;
    const w = step === 0 || step === -1 ? w0 : step === 1 ? 70 : w0 * 0.72;
    let s = box(40, 48, w0, 16, { fill: PAPER, dash: '4 3', stroke: MUTED });
    s += text(40 + w0 / 2, 44, 'ℓ₀', { size: 11, fill: MUTED });
    s += box(40, 96, w, 18, { fill: PAPER });
    s += text(40 + w / 2, 128, 'ℓ', { size: 12 });
    return s;
  });
}

function drawLorentz(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['洛伦兹力', 'Lorentz force'], ['速度与磁场垂直', 'Velocity perpendicular to the field']],
    0: [['大小和方向', 'Size and sense'], ['F = |q| v B', 'F = |q| v B']],
    1: [['v 或 B 增大', 'Larger v or B'], ['力同比增大', 'The force scales']],
    2: [['电荷为负', 'Negative charge'], ['力反向', 'The force flips']],
    3: [['v 或 B 为零', 'v or B is zero'], ['力为 0', 'The force is 0']],
    4: [['只此垂直情形', 'This perpendicular case'], ['公式假定 v 与 B 垂直', 'The formula assumes v perpendicular to B']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = crosses(150, 40, 120, 80, step === 1 ? 12 : 18);
    s += arrow(40, 86, step === 3 ? 70 : 130, 86, SEC, 1.7);
    s += text(70, 76, 'v', { size: 12, fill: SEC });
    if (step !== 3) {
      const dir = step === 2 ? 1 : -1;
      const len = step === 1 ? 40 : 24;
      s += arrow(120, 86, 120, 86 + dir * len, RAY, 1.8);
      s += text(132, 86 + dir * len, 'F', { anchor: 'start', size: 12, fill: RAY });
    }
    return s;
  });
}

function drawMalus(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['马吕斯', 'Malus'], ['起偏器与检偏器', 'Polariser and analyser']],
    0: [['夹角为 0', 'Angle 0'], ['I = I₀', 'I = I0']],
    1: [['夹角 90°', 'Angle 90°'], ['I = 0', 'I = 0']],
    2: [['夹角 60°', 'Angle 60°'], ['I = I₀/4', 'I = I0/4']],
    3: [['入射变强', 'Brighter input'], ['各角度同比增大', 'Every angle scales']],
    4: [['按平方下降', 'Falls as a square'], ['是 cos²θ，不是 cosθ', 'It is cos²θ, not cos θ']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const ang = step === 1 ? 90 : step === 2 ? 60 : 0;
    const rad = (ang * Math.PI) / 180;
    let s = line(70, 40, 70, 120, INK, 2);
    s += line(150, 80 - Math.cos(rad) * 40, 150, 80 + Math.sin(rad) * 0 + 40, SEC, 2);
    s += line(150 - Math.sin(rad) * 36, 80 - Math.cos(rad) * 36, 150 + Math.sin(rad) * 36, 80 + Math.cos(rad) * 36, SEC, 2);
    s += ray(30, 80, 70, 80, RAY);
    if (step !== 1) s += ray(150, 80, 230, 80, RAY);
    s += text(250, 84, step === 1 ? '0' : 'I', { anchor: 'start', size: 14, fill: RAY });
    return s;
  });
}

function drawMassEnergy(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['质能', 'Mass–energy'], ['静止能量与质量成正比', 'Rest energy is proportional to mass']],
    0: [['读出 E', 'Read E'], ['记下质量 m', 'Note the mass m']],
    1: [['关系', 'Relation'], ['E = m c²', 'E = m c²']],
    2: [['质量加倍', 'Double the mass'], ['能量加倍', 'Energy doubles']],
    3: [['两端都看', 'Both ends of the range'], ['仍正比于 m', 'Still proportional to m']],
    4: [['不要另造量', 'No extra quantity'], ['画面没有功率或密度', 'The screen has no power or density']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const m = step === 2 ? 2 : 1;
    let s = block(40, 70, 36 * m, 28, { fill: PAPER });
    s += text(40 + 18 * m, 88, 'm', { size: 13 });
    s += arrow(40 + 36 * m + 10, 84, 150, 84, INK, 1.5);
    s += text(190, 90, step === 2 ? '2E' : 'E', { size: 20, fill: RAY });
    s += text(190, 112, 'mc²', { size: 12, fill: SEC });
    return s;
  });
}

function drawMaxwellSpeed(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['速率分布', 'Speed distribution'], ['一条有峰值的曲线', 'A curve with one peak']],
    0: [['三个速率', 'Three speeds'], ['vmp < 平均 < vrms', 'vmp < mean < vrms']],
    1: [['温度升高', 'Higher temperature'], ['变宽，峰值移向高速', 'Wider, peak moves faster']],
    2: [['质量增大', 'Larger mass'], ['变窄，峰值移向低速', 'Narrower, peak moves slower']],
    3: [['拖动标记', 'Drag the marker'], ['最可几速率决定于 T/m', 'The most probable speed sets T/m']],
    4: [['直方条数', 'Number of bins'], ['条更细或更粗，曲线不变', 'Bins change; the curve does not']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const x0 = 40;
    const y0 = 120;
    let s = axes(x0, 40, 220, 80);
    s += axisLabels(x0, 40, 210, 80, 'v', 'f');
    const shift = step === 1 ? 1.3 : step === 2 ? 0.6 : 1;
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const x = (i / 40) * 3;
      const u = x / shift;
      const y = u * u * Math.exp(-u * u);
      pts.push([x0 + i * 5, y0 - y * 90]);
    }
    s += polyLine(pts, INK, 1.7);
    if (step === 4) {
      for (let i = 0; i < 8; i++) s += line(x0 + i * 22, y0, x0 + i * 22, y0 - 20 - (i % 3) * 10, MUTED, 1);
    }
    return s;
  });
}

function drawMaxwellWave(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['麦克斯韦波', 'Maxwell wave'], ['E 与 B 同相垂直', 'E and B in phase and perpendicular']],
    0: [['波速', 'Speed'], ['c = fλ，c 来自 μ₀、ε₀', 'c = fλ, with c from μ0 and ε0']],
    1: [['频率升高', 'Higher frequency'], ['λ 变短，仍同相', 'λ shortens; still in phase']],
    2: [['振幅', 'Amplitude'], ['|B| = |E|/c', '|B| = |E|/c']],
    3: [['位移电流', 'Displacement current'], ['过零附近 ∂E/∂t 大', '∂E/∂t is large near a zero']],
    4: [['不是传导电流', 'Not a conduction current'], ['也不据此设计天线', 'And not a plan for an antenna']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const cyc = step === 1 ? 3 : 1.5;
    let s = polyLine(sinePts(30, 80, 240, 20, cyc), RAY, 1.6);
    s += polyLine(sinePts(30, 112, 240, 12, cyc), SEC, 1.4);
    if (step === 3) s += circ(30 + 240 / cyc / 2, 80, 5, { fill: 'none', stroke: RAY, w: 1.4 });
    return s;
  });
}

function drawMembrane(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['矩形膜', 'Rectangular membrane'], ['四边固定', 'Fixed on all four edges']],
    0: [['基模', 'Fundamental'], ['m=n=1，没有内部节线', 'm=n=1, no interior node line']],
    1: [['沿 a 的节线', 'Node along a'], ['m=2，n=1', 'm=2, n=1']],
    2: [['频率公式', 'Frequency formula'], ['ω = πc √((m/a)²+(n/b)²)', 'ω = πc √((m/a)²+(n/b)²)']],
    3: [['边长变大', 'Longer side'], ['同一模的频率下降', 'The same mode drops in frequency']],
    4: [['交换 m、n', 'Swap m and n'], ['a≠b 时频率不同', 'If a ≠ b the frequency differs']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const w = step === 3 ? 150 : 110;
    let s = box(50, 48, w, 70, { fill: PAPER });
    if (step === 1 || step === 4) s += dash(50 + w / 2, 48, 50 + w / 2, 118, RAY, 1.3);
    s += text(50 + w / 2, 140, step === 0 ? '1,1' : 'm,n', { size: 12, fill: SEC });
    return s;
  });
}

function drawModes(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['双质点', 'Two masses'], ['三根弹簧串在一直线上', 'Three springs on one line']],
    0: [['对称模', 'Symmetric mode'], ['同向运动，频率 √(k/m)', 'Same sense, frequency √(k/m)']],
    1: [['反对称模', 'Antisymmetric mode'], ['反向运动，频率 √(3k/m)', 'Opposite sense, frequency √(3k/m)']],
    2: [['叠加', 'Superposition'], ['两个频率都在', 'Both frequencies are present']],
    3: [['劲度变大', 'Larger k'], ['两个频率都升高', 'Both frequencies rise']],
    4: [['质量变大', 'Larger mass'], ['两个频率都降低，比仍是 √3', 'Both fall; the ratio stays √3']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = springV(70, 70, 90, 0, 1);
    s += line(40, 80, 70, 80, INK, 1.4);
    s += path('M 70 80 Q 90 68 110 80', { w: 1.4 });
    s += block(110, 68, 28, 24);
    s += path('M 138 80 Q 160 68 182 80', { w: 1.4 });
    s += block(182, 68, 28, 24);
    s += path('M 210 80 Q 232 68 254 80', { w: 1.4 });
    s += line(254, 80, 290, 80, INK, 1.4);
    const dir = step === 1 ? -1 : 1;
    s += arrow(124, 60, 124 + 16, 60, RAY, 1.3);
    s += arrow(196, 60, 196 + dir * 16, 60, SEC, 1.3);
    return s;
  });
}

function drawOscillator(lang, step) {
  return shown(lang, step, {
    '-1': [['弹簧振子', 'Oscillator'], ['质量、弹簧、平衡位置', 'Mass, spring, equilibrium']],
    0: [['能量守恒', 'Energy stays'], ['H 几乎等于 ½kA²', 'H is about ½kA²']],
    1: [['最大位移', 'Greatest displacement'], ['动能为 0，势能最大', 'Kinetic energy 0, potential largest']],
    2: [['平衡位置', 'Equilibrium'], ['势能为 0，动能最大', 'Potential 0, kinetic largest']],
    3: [['周期', 'Period'], ['m 大或 k 小则周期变长', 'Larger m or smaller k, longer period']],
    4: [['振幅', 'Amplitude'], ['能量按 A² 增大', 'Energy grows with A²']],
  }, () => {
    const x = step === 1 || step === 4 ? 138 : step === 2 ? 64 : 100;
    const z = 44;
    let s = tableBoard(220, 72);
    s += standPost(44, z, 56);
    s += oblLine([44, 56, z], [x, 42, z], INK, 1.4);
    const coilPts = [];
    for (let i = 0; i <= 6; i++) {
      coilPts.push([52 + i * ((x - 52) / 6), 52 - (i % 2 ? 6 : -6), z]);
    }
    s += oblPathPts(coilPts, { w: 1.5 });
    s += block3d(x - 14, z - 6, 28, 18, 16, { y0: 0, label: 'm' });
    s += oblLine([112, 0, z], [112, 36, z], MUTED, 1, '4 3');
    if (step === 0 || step === 4) {
      s += text(...obl(188, 28, z), 'H', { size: 11, fill: RAY });
    }
    return s;
  });
}

function drawPendulum(lang, step) {
  return shown(lang, step, {
    '-1': [['两个单摆', 'Two pendulums'], ['比较小角和初值敏感', 'Small angle, and sensitivity to the start']],
    0: [['小角度', 'Small angle'], ['周期大约 2π√(L/g)', 'Period about 2π√(L/g)']],
    1: [['大角度', 'Large angle'], ['周期变长', 'The period grows']],
    2: [['能量', 'Energy'], ['单位质量能量大致守恒', 'Energy per mass stays about steady']],
    3: [['初值差', 'A small difference'], ['两摆很快分开', 'The two swings soon separate']],
    4: [['摆长或 g', 'Length or g'], ['L 大或 g 小则变慢', 'Larger L or smaller g, slower']],
  }, () => {
    const a = step === 1 ? 48 : 16;
    const len = step === 4 ? 52 : 40;
    const z = 44;
    const pend3d = (cx, ang) => {
      const rad = (ang * Math.PI) / 180;
      const bx = cx + Math.sin(rad) * len;
      const by = 52 + Math.cos(rad) * len;
      let ps = standPost(cx, z, 52);
      const [sx, sy] = obl(cx, 52, z);
      const [ex, ey] = obl(bx, by, z);
      ps += line(sx, sy, ex, ey, INK, 1.4);
      ps += circ(ex, ey, 7, { fill: PAPER, w: 1.3 });
      return ps;
    };
    let s = tableBoard(220, 72);
    s += pend3d(80, a);
    s += pend3d(168, step === 3 ? a + 20 : a);
    return s;
  });
}

function drawPhoto(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['光电效应', 'Photoelectric effect'], ['光打在金属表面上', 'Light on a metal surface']],
    0: [['低于阈频', 'Below threshold'], ['不出射', 'No electrons leave']],
    1: [['刚超过', 'Just above'], ['开始出射，Kmax 接近 0', 'Emission starts, Kmax near 0']],
    2: [['频率继续增大', 'Frequency keeps rising'], ['Kmax 线性增加，斜率对应 h', 'Kmax rises linearly, slope is h']],
    3: [['逸出功变大', 'Larger work function'], ['阈频升高', 'The threshold frequency rises']],
    4: [['截止关系', 'Cutoff'], ['h f₀ = W', 'h f0 = W']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = box(36, 70, 16, 50, { fill: PAPER });
    s += text(44, 100, 'M', { size: 11 });
    if (step !== 0) s += ray(20, 60, 44, 78, RAY);
    if (step === 1 || step === 2) s += arrow(52, 86, 80, 70, SEC, 1.4);
    s += axes(140, 48, 140, 70);
    const x0 = step === 3 ? 190 : 160;
    s += polyLine([[x0, 112], [270, step === 1 ? 100 : 60]], INK, 1.6);
    s += text(250, 44, 'K', { size: 11, fill: SEC });
    return s;
  });
}

function drawPointField(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['点电荷的场', 'Field of a point charge'], ['放射状的电场线', 'Radial field lines']],
    0: [['随距离', 'With distance'], ['E = k|q|/r²', 'E = k|q|/r²']],
    1: [['距离加倍', 'Double r'], ['场强约为 1/4', 'The field is about 1/4']],
    2: [['电荷更大', 'Larger |q|'], ['E 同比增大', 'E scales']],
    3: [['改为负电荷', 'Change to negative'], ['箭头反向，大小不变', 'Arrows flip, size unchanged']],
    4: [['不是一次方', 'Not a first power'], ['加倍 r 最容易看出平方', 'Doubling r shows the square']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const inward = step === 3;
    const n = step === 2 ? 8 : 6;
    let s = chargeBall(160, 86, inward ? '−' : '+', step === 2 ? 18 : 14);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r1 = 28;
      const r2 = step === 1 ? 70 : 52;
      const x1 = 160 + Math.cos(a) * r1;
      const y1 = 86 + Math.sin(a) * r1;
      const x2 = 160 + Math.cos(a) * r2;
      const y2 = 86 + Math.sin(a) * r2;
      s += inward ? arrow(x2, y2, x1, y1, SEC, 1.2) : arrow(x1, y1, x2, y2, SEC, 1.2);
    }
    return s;
  });
}

function drawResistivity(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['电阻定律', 'Resistivity'], ['一段均匀导线', 'A uniform wire']],
    0: [['读电阻', 'Read R'], ['R = ρL/A', 'R = ρ L / A']],
    1: [['长度加倍', 'Double L'], ['R 加倍', 'R doubles']],
    2: [['截面积加倍', 'Double A'], ['R 减半', 'R halves']],
    3: [['材料', 'Material'], ['ρ 加倍则 R 加倍', 'Double ρ and R doubles']],
    4: [['L 与 A 同倍', 'L and A together'], ['R 不变', 'R unchanged']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const len = step === 1 || step === 4 ? 180 : 120;
    const thick = step === 2 || step === 4 ? 16 : 8;
    let s = box(40, 84 - thick / 2, len, thick, { fill: step === 3 ? 'rgba(196,73,29,0.15)' : PAPER });
    s += hDim(40, 40 + len, 120, 'L', SEC);
    s += text(40 + len + 12, 88, 'A', { anchor: 'start', size: 12 });
    return s;
  });
}

function drawDisk(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['圆盘', 'Disk'], ['切向力使它转动', 'A tangential force turns it']],
    0: [['力垂直于半径', 'Force perpendicular to the radius'], ['读 τ、I、α', 'Read τ, I, α']],
    1: [['关系', 'Relations'], ['τ = RF，I = ½MR²', 'τ = RF, I = ½ M R²']],
    2: [['力指向圆心', 'Force toward the centre'], ['力矩和角加速度为 0', 'Torque and angular acceleration are 0']],
    3: [['力更大', 'Larger force'], ['α 同比增大', 'α scales']],
    4: [['质量或半径', 'Mass or radius'], ['M 大则 α 变小', 'Larger M, smaller α']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const rad = step === 4 ? 40 : 32;
    let s = circ(140, 86, rad, { fill: PAPER });
    s += circ(140, 86, 3, { fill: INK, stroke: 'none' });
    if (step === 2) s += arrow(140 + rad, 86, 140 + rad + 28, 86, RAY, 1.6);
    else s += arrow(140 + rad, 86, 140 + rad, 86 - (step === 3 ? 40 : 24), RAY, 1.6);
    s += text(140, 86 + rad + 16, 'R', { size: 12, fill: SEC });
    return s;
  });
}

function drawRuler(lang, step) {
  return shown(lang, step, {
    '-1': [['刻度尺', 'Ruler'], ['先看分度值', 'Start with the division']],
    0: [['读长度', 'Read a length'], ['对齐零刻度，读末端', 'Match the zero, read the end']],
    1: [['正中', 'Halfway'], ['估计位约为 5', 'The estimate digit is about 5']],
    2: [['刚过刻度', 'Just past a mark'], ['估计位接近 0 或 1', 'The estimate is near 0 or 1']],
    3: [['更小分度', 'Finer division'], ['估计位的数位前移', 'The estimate digit moves left']],
    4: [['不要停在整格', 'Do not stop on a whole mark'], ['除非边缘正好压在线上', 'Unless the edge sits on a line']],
  }, () => {
    const z = 44;
    const len = step === 3 ? 150 : 170;
    let s = tableBoard(220, 72);
    s += ruler3d(32, z, len);
    const div = step === 3 ? 10 : 20;
    const end = step === 1 ? 32 + div * 4 + div / 2 : step === 2 ? 32 + div * 4 + 2 : 32 + div * 5;
    const [e1x, e1y] = obl(32, 18, z);
    const [e2x, e2y] = obl(32, 6, z);
    s += line(e1x, e1y, e2x, e2y, SEC, 1.3);
    const [r1x, r1y] = obl(end, 18, z);
    const [r2x, r2y] = obl(end, 4, z);
    s += line(r1x, r1y, r2x, r2y, RAY, 1.5);
    return s;
  });
}

function drawScales(lang, step) {
  return shown(lang, step, {
    '-1': [['数量级', 'Orders of size'], ['一条对数梯子', 'A logarithmic ladder']],
    0: [['1 m', '1 m'], ['log₁₀(L) = 0，靠近人', 'log10(L) = 0, nearest a person']],
    1: [['原子', 'Atom'], ['约 10⁻¹⁰ m', 'About 10⁻¹⁰ m']],
    2: [['原子核', 'Nucleus'], ['约 10⁻¹⁵ m', 'About 10⁻¹⁵ m']],
    3: [['地球与天文单位', 'Earth and 1 AU'], ['约 10⁷ m 和 10¹¹ m', 'About 10⁷ m and 10¹¹ m']],
    4: [['两级正中', 'Halfway between rungs'], ['看最近的一级如何切换', 'See which rung is nearest']],
  }, () => {
    const z = 44;
    let s = tableBoard(220, 72);
    s += oblLine([110, 4, z], [110, 48, z], INK, 2);
    const labels = [
      [44, '10¹¹'],
      [38, '10⁷'],
      [30, '1 m'],
      [22, '10⁻¹⁰'],
      [16, '10⁻¹⁵'],
    ];
    labels.forEach(([yy, lab], i) => {
      const on = (step === 0 && i === 2) || (step === 1 && i === 3) || (step === 2 && i === 4) || (step === 3 && (i === 0 || i === 1));
      s += oblLine([106, yy, z], [114, yy, z], on ? RAY : MUTED, on ? 2 : 1.2);
      s += text(...obl(122, yy, z), lab, { anchor: 'start', size: 11, fill: on ? RAY : INK });
    });
    s += block3d(40, z - 8, 20, 26, 16, { y0: 0, label: L(lang, '人', 'person') });
    return s;
  });
}

function drawSimul(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['同时性', 'Simultaneity'], ['杆两端的闪光', 'Flashes at the two ends of a rod']],
    0: [['β 很小', 'Small β'], ['两个闪光几乎同时', 'The flashes are almost simultaneous']],
    1: [['β 变大', 'Larger β'], ['Δt = γ β L₀ / c', 'Δt = γ β L0 / c']],
    2: [['L₀ 加倍', 'Double L0'], ['同一 β 下 Δt 加倍', 'At the same β, Δt doubles']],
    3: [['同时线', 'Line of simultaneity'], ['斜率对照 β/c', 'The slope follows β/c']],
    4: [['杆的静止描述', 'The rod at rest'], ['那里两端仍然同时', 'There the ends are still simultaneous']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = axes(50, 40, 200, 80);
    s += axisLabels(50, 40, 190, 80, 'x', 't');
    const tilt = step === 0 || step === 4 || step === -1 ? 0 : step === 1 ? 28 : 18;
    s += line(80, 100 - tilt, step === 2 ? 230 : 180, 100 + tilt, SEC, 1.6);
    s += circ(80, 100 - tilt, 3, { fill: RAY, stroke: 'none' });
    s += circ(step === 2 ? 230 : 180, 100 + tilt, 3, { fill: RAY, stroke: 'none' });
    return s;
  });
}

function drawSingleSlit(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['单缝', 'Single slit'], ['中央亮纹和两侧暗纹', 'Central bright fringe and dark fringes']],
    0: [['第一暗纹', 'First dark fringe'], ['y ≈ λL/a', 'y ≈ λ L / a']],
    1: [['更高级次', 'Higher orders'], ['位置近似按级次成倍外移', 'Positions move out with the order']],
    2: [['缝更窄', 'Narrower slit'], ['暗纹远离中心', 'Dark fringes move out']],
    3: [['λ 或 L', 'λ or L'], ['暗纹同样外移', 'Dark fringes move out as well']],
    4: [['小角近似', 'Small-angle estimate'], ['级次太高时只作估计', 'High orders are only an estimate']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const y1 = step === 2 || step === 3 ? 36 : 52;
    let s = box(60, 70, 8, 40, { fill: INK, stroke: 'none' });
    s += box(60, 84, 8, 8, { fill: PAPER, stroke: 'none' });
    s += line(220, 90, 250, 90, RAY, 4);
    s += line(220, 90 - y1, 246, 90 - y1, SEC, 1.6);
    s += line(220, 90 + y1, 246, 90 + y1, SEC, 1.6);
    if (step === 1) {
      s += line(220, 90 - y1 * 2, 240, 90 - y1 * 2, MUTED, 1.3);
      s += line(220, 90 + y1 * 2, 240, 90 + y1 * 2, MUTED, 1.3);
    }
    return s;
  });
}

function drawAbsorb(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['声的吸收', 'Sound absorption'], ['屏障挡住一部分', 'A barrier takes part of it']],
    0: [['没有损失', 'No loss'], ['R = 0 且 d = 0 时 I = I₀', 'R = 0 and d = 0, so I = I0']],
    1: [['反射', 'Reflection'], ['透过按 (1−R) 下降', 'Transmission falls as (1−R)']],
    2: [['吸收', 'Absorption'], ['剩下的按 e^(−αd) 衰减', 'The rest falls as e^(−αd)']],
    3: [['厚度加倍', 'Double the thickness'], ['再乘一个 e^(−αd)', 'Multiply by another e^(−αd)']],
    4: [['入射变强', 'Stronger input'], ['I 同比增大', 'I scales']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const thick = step === 3 ? 36 : 16;
    let s = ray(20, 80, 90, 80, RAY);
    s += box(100, 56, thick, 48, { fill: MUTED, op: 0.15 });
    if (step !== 0) s += ray(100, 70, 70, 48, SEC);
    s += ray(100 + thick, 80, 250, 80, step === 0 ? RAY : SEC);
    return s;
  });
}

function drawSpecific(lang, step) {
  return shown(lang, step, {
    '-1': [['比热', 'Specific heat'], ['两份样品同一加热', 'Two samples, the same heating']],
    0: [['不同比热', 'Different specific heats'], ['c 大的升温少', 'Larger c, smaller rise']],
    1: [['热量相同', 'Same heat'], ['升温与 c 成反比', 'The rise is inverse to c']],
    2: [['质量加倍', 'Double one mass'], ['样品 1 升温减半', 'Sample 1 rises half as much']],
    3: [['功率增大', 'Larger power'], ['两份都升温更多', 'Both rise more']],
    4: [['回算 c', 'Recover c'], ['用 ΔT = Q/(cm)', 'From ΔT = Q/(c m)']],
  }, () => {
    const z = 44;
    let s = tableBoard(220, 72);
    s += candle3d(52, z, { h: 22, lit: true, thin: true });
    s += beaker3d(58, z, 28, 52, step === 2 ? 32 : 38);
    s += beaker3d(152, z, 28, 52, step === 3 ? 48 : 40);
    s += text(...obl(90, 36, z), step === 2 ? '2m' : 'ΔT₁', { size: 11, fill: RAY });
    s += text(...obl(184, 44, z), 'ΔT₂', { size: 11, fill: SEC });
    return s;
  });
}

function drawStern(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['自旋测量', 'Spin measurement'], ['准备沿 +z，沿角 θ 测量', 'Prepared on +z, measured at angle θ']],
    0: [['θ = 0', 'θ = 0'], ['P(+) = 1，全是加', 'P(+) = 1, all plus']],
    1: [['θ = 180°', 'θ = 180°'], ['P(+) = 0，全是减', 'P(+) = 0, all minus']],
    2: [['θ = 90°', 'θ = 90°'], ['两个概率都是 1/2', 'Both probabilities are 1/2']],
    3: [['θ = 60°', 'θ = 60°'], ['P(+) 约为 0.75', 'P(+) is about 0.75']],
    4: [['概率之和', 'The probabilities add'], ['和为 1，公式是 cos²(θ/2)', 'They sum to 1; the factor is cos²(θ/2)']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const p = step === 0 ? 1 : step === 1 ? 0 : step === 2 ? 0.5 : step === 3 ? 0.75 : 0.6;
    const deg = step === 0 ? 0 : step === 1 ? 180 : step === 2 ? 90 : step === 3 ? 60 : 40;
    const rad = (deg * Math.PI) / 180;
    let s = line(30, 100, 120, 100, MUTED, 1.2);
    s += arrow(70, 100, 70 + Math.cos(rad) * 42, 100 - Math.sin(rad) * 42, RAY, 1.6);
    s += box(180, 110 - p * 60, 28, p * 60, { fill: RAY, op: 0.3 });
    s += box(220, 110 - (1 - p) * 60, 28, (1 - p) * 60, { fill: SEC, op: 0.3 });
    s += text(194, 126, '+', { size: 12, fill: RAY });
    s += text(234, 126, '−', { size: 12, fill: SEC });
    return s;
  });
}

function drawWatch(lang, step) {
  return shown(lang, step, {
    '-1': [['秒表', 'Stopwatch'], ['一圈 60 秒', 'One turn is 60 seconds']],
    0: [['12 点', 'At 12'], ['读数是 0 或 60 秒', 'The reading is 0 or 60 s']],
    1: [['3 点', 'At 3'], ['15 s', '15 s']],
    2: [['6 点与 9 点', 'At 6 and at 9'], ['30 s 与 45 s', '30 s and 45 s']],
    3: [['两格之间', 'Between marks'], ['估计到 0.1 s 量级', 'Estimate to about 0.1 s']],
    4: [['用角度回算', 'From the angle'], ['t = (角度/2π)×60', 't = (angle/2π)×60']],
  }, () => {
    const z = 44;
    let s = tableBoard(220, 72);
    const [cx, cy] = obl(118, 26, z);
    s += oblPoly3([[108, 0, z - 10], [128, 0, z - 10], [128, 6, z - 10], [108, 6, z - 10]], { fill: '#ddd8ce', w: 1.2 });
    s += circ(cx, cy, 34, { fill: PAPER, w: 1.4 });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      s += line(cx + Math.cos(a) * 28, cy + Math.sin(a) * 28, cx + Math.cos(a) * 33, cy + Math.sin(a) * 33, INK, 1.2);
    }
    const frac = step === 1 ? 0.25 : step === 2 ? 0.5 : step === 3 ? 0.62 : step === 4 ? 0.75 : 0;
    const a = frac * Math.PI * 2 - Math.PI / 2;
    s += line(cx, cy, cx + Math.cos(a) * 24, cy + Math.sin(a) * 24, RAY, 1.8);
    return s;
  });
}

function drawTelescope(lang, step) {
  const titles = {
    '-1': [['望远镜', 'Telescope'], ['物镜与目镜', 'Objective and eyepiece']],
    0: [['读放大率', 'Read the magnification'], ['记下两个焦距和镜筒长', 'Note both focal lengths and the tube']],
    1: [['公式', 'Formulas'], ['M ≈ −f物/f目', 'M ≈ −f obj / f eye']],
    2: [['物镜更长', 'Longer objective'], ['|M| 变大，镜筒变长', '|M| grows, the tube lengthens']],
    3: [['目镜更长', 'Longer eyepiece'], ['|M| 变小，镜筒变长', '|M| shrinks, the tube lengthens']],
    4: [['倒立', 'Inverted'], ['M 为负，镜筒长不是放大率', 'M is negative; tube length is not M']],
  };
  const [title, cap] = titles[step];
  const z = 42;
  const fo = step === 2 ? 88 : 62;
  const fe = step === 3 ? 36 : 22;
  const objX = 28;
  const lens1 = 52;
  const lens2 = lens1 + fo + 14;
  const eyeX = lens2 + fe + 10;
  let body = tableBoard(220, 72);
  body += oblPoly3([[14, 2, z - 5], [200, 2, z - 5], [200, 2, z + 5], [14, 2, z + 5]], { fill: '#d8d2c6', w: 1.2 });
  body += candle3d(objX, z, { h: 20, lit: true, label: L(lang, '物', 'Obj') });
  body += lensOnStand(lens1, z, Math.min(52, fo / 2 + 28));
  body += lensOnStand(lens2, z, Math.min(44, fe / 2 + 24));
  body += screenOnStand(eyeX, z, 40);
  body += dimFront(lens1, lens2, 'f_o', SEC, z + 6);
  body += dimFront(lens2, eyeX, 'f_e', RAY, z + 6);
  if (step === 4) {
    const [ax, ay] = obl(eyeX + 6, 38, z);
    body += arrow(ax, ay + 10, ax, ay - 8, SEC, 1.4);
    body += text(ax + 10, ay, L(lang, '倒', 'inv'), { anchor: 'start', size: 11, fill: SEC });
  }
  return panel(lang, title[0], title[1], cap[0], cap[1], body, H3);
}

function drawThermo(lang, step) {
  return shown(lang, step, {
    '-1': [['温度计', 'Thermometer'], ['液柱对着刻度', 'A liquid column against a scale']],
    0: [['两端', 'The ends'], ['Tmin 在底，Tmax 在顶', 'Tmin at the bottom, Tmax at the top']],
    1: [['量程中点', 'Mid-range'], ['液柱约在一半高度', 'The column is about halfway']],
    2: [['改变量程', 'Change the range'], ['同一 T，液柱高度改变', 'Same T, the column height changes']],
    3: [['估读', 'Estimate a digit'], ['刻度之间再读一位', 'One more digit between marks']],
    4: [['线性回算', 'Linear reading'], ['T = Tmin + 分数×(Tmax−Tmin)', 'T = Tmin + fraction×(Tmax−Tmin)']],
  }, () => {
    const frac = step === 0 ? 0.95 : step === 1 ? 0.5 : step === 2 ? 0.3 : 0.62;
    const z = 44;
    let s = tableBoard(220, 72);
    s += thermometer3d(116, z, frac);
    s += beaker3d(168, z, 28, 48, frac * 38);
    return s;
  });
}

function drawFilm(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['薄膜', 'Thin film'], ['前后两个反射面', 'Two reflecting faces']],
    0: [['反射', 'Reflection'], ['对照 2nt 与 (m+½)λ', 'Compare 2 n t with (m+½)λ']],
    1: [['调到亮纹', 'Tune a bright fringe'], ['两边相等', 'The two sides match']],
    2: [['改成透射', 'Switch to transmission'], ['条件变成 2nt = mλ', 'The condition becomes 2 n t = m λ']],
    3: [['折射率变大', 'Larger n'], ['光程变大', 'The optical path grows']],
    4: [['下一级', 'Next order'], ['m 增加 1', 'm increases by 1']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = line(40, 50, 120, 110, RAY, 1.4);
    s += box(120, 48, step === 3 ? 28 : 16, 70, { fill: SEC, op: 0.12 });
    s += ray(40, 70, 120, 70, RAY);
    s += ray(120, 70, 70, 40, SEC);
    if (step !== 2) s += ray(136, 78, 200, 50, MUTED);
    else s += ray(140, 86, 240, 86, SEC);
    return s;
  });
}

function drawDilation(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['光钟', 'Light clock'], ['一束光在两面镜子间来回', 'A light pulse between two mirrors']],
    0: [['很慢', 'Slow'], ['Δt 几乎等于 Δτ', 'Δt is almost Δτ']],
    1: [['速度增大', 'Larger speed'], ['坐标时间长于固有时', 'Coordinate time exceeds proper time']],
    2: [['固有时加倍', 'Double Δτ'], ['Δt 加倍，γ 不变', 'Δt doubles, γ does not']],
    3: [['核对 γ', 'Check γ'], ['Δt / Δτ = γ', 'Δt / Δτ = γ']],
    4: [['运动钟更慢', 'The moving clock records less'], ['它记下的是更短的 Δτ', 'What it records is the shorter Δτ']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const shift = step === 0 || step === -1 ? 0 : 50;
    let s = line(80, 50, 80, 120, INK, 1.6);
    s += line(80 + shift, 50, 80 + shift, 120, INK, 1.6);
    s += ray(80, 110, 80 + shift, 60, RAY);
    s += ray(80 + shift, 60, 80 + shift * 2, 110, RAY);
    s += text(200, 80, step === 1 ? 'γ>1' : 'Δτ', { size: 13, fill: SEC });
    return s;
  });
}

function drawTransformer(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['变压器', 'Transformer'], ['同一铁芯上的两个线圈', 'Two coils on one core']],
    0: [['匝数相等', 'Equal turns'], ['电压相等，电流相等', 'Equal voltage, equal current']],
    1: [['升压', 'Step up'], ['n₂ > n₁，U₂ > U₁', 'n2 > n1, U2 > U1']],
    2: [['降压', 'Step down'], ['电压下降', 'Voltage falls']],
    3: [['功率', 'Power'], ['U₁I₁ = U₂I₂', 'U1 I1 = U2 I2']],
    4: [['输入电压', 'Input voltage'], ['U₂ 同比增大', 'U2 scales']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const n2 = step === 1 ? 6 : step === 2 ? 2 : 4;
    let s = path('M 90 40 L 90 120 L 200 120 L 200 40', { w: 2 });
    for (let i = 0; i < 4; i++) s += path(`M 90 ${r(52 + i * 16)} q -16 6 0 12`, { w: 1.3 });
    for (let i = 0; i < n2; i++) s += path(`M 200 ${r(48 + i * (64 / n2))} q 16 4 0 8`, { w: 1.3 });
    s += text(60, 80, 'n₁', { size: 12 });
    s += text(240, 80, 'n₂', { size: 12, fill: RAY });
    return s;
  });
}

function drawTline(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['传输线', 'Transmission line'], ['单位长度的 L′ 和 C′', 'Inductance and capacitance per length']],
    0: [['读 Z₀ 与 v', 'Read Z0 and v'], ['由 L′、C′ 决定', 'Set by L′ and C′']],
    1: [['公式', 'Formulas'], ['Z₀ = √(L′/C′)', 'Z0 = √(L′/C′)']],
    2: [['C′ 增大', 'Larger C′'], ['Z₀ 和 v 都下降', 'Both Z0 and v fall']],
    3: [['L′ 增大', 'Larger L′'], ['Z₀ 上升，v 下降', 'Z0 rises, v falls']],
    4: [['同比增大', 'Same factor'], ['Z₀ 不变，v 下降', 'Z0 stays, v falls']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    let s = line(30, 60, 290, 60, INK, 1.6);
    s += line(30, 110, 290, 110, INK, 1.6);
    s += path('M 80 60 Q 90 80 80 100 Q 70 110 80 110', { w: 1.3 });
    s += line(140, 60, 140, 78, SEC, 1.3);
    s += line(160, 92, 160, 110, SEC, 1.3);
    s += text(150, 88, 'C′', { size: 12, fill: SEC });
    s += text(90, 130, 'L′', { size: 12, fill: RAY });
    return s;
  });
}

function drawTwoForce(lang, step) {
  return shown(lang, step, {
    '-1': [['二力平衡', 'Two-force balance'], ['同一物体、同一直线', 'Same body, same line']],
    0: [['平衡', 'Balanced'], ['F₂ = −F₁，加速度为 0', 'F2 = −F1, acceleration is 0']],
    1: [['不再抵消', 'No longer cancel'], ['a = Fnet / m', 'a = Fnet / m']],
    2: [['不在一条直线', 'Not collinear'], ['大小相反也不算平衡', 'Opposite sizes are not enough']],
    3: [['不是同一物体', 'Not the same body'], ['那是相互作用', 'Those are an interaction pair']],
    4: [['改变质量', 'Change the mass'], ['平衡时 a 仍为 0', 'If it balances, a stays 0']],
  }, () => {
    const z = 46;
    if (step === 3) {
      let s = tableBoard(220, 72);
      s += block3d(48, z - 6, 40, 18, 22, { y0: 0 });
      s += block3d(158, z - 6, 40, 18, 22, { y0: 0 });
      s += oblArrow3d(88, 14, z, 138, 14, z, RAY, 1.5);
      s += oblArrow3d(158, 14, z, 108, 14, z, SEC, 1.5);
      return s;
    }
    let s = tableBoard(220, 72);
    s += block3d(102, z - 8, 48, 20, 28, { y0: 0 });
    const ang = step === 2 ? 40 : 0;
    const rad = (ang * Math.PI) / 180;
    s += oblArrow3d(102, 16, z, 58, 16, z, RAY, 1.7);
    s += oblArrow3d(150, 16, z, 150 + Math.cos(rad) * 48, 16 + Math.sin(rad) * 48, z, SEC, 1.7);
    return s;
  });
}

function drawPacket(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['波包', 'Wave packet'], ['一群波叠成一个包', 'A group of waves in one packet']],
    0: [['中心移动', 'The centre moves'], ['速度对应 ℏk₀/m', 'The speed follows ℏ k0 / m']],
    1: [['k₀ 增大', 'Larger k0'], ['中心跑得更快', 'The centre runs faster']],
    2: [['宽度随时间', 'Width with time'], ['σ(t) 变大', 'σ(t) grows']],
    3: [['起始更窄', 'Narrower start'], ['稍后散得更快', 'Later it spreads faster']],
    4: [['k₀ = 0', 'k0 = 0'], ['中心不动，宽度仍增加', 'The centre stays; the width still grows']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const cx = step === 1 ? 210 : step === 4 ? 120 : 160;
    const sig = step === 3 ? 18 : step === 2 ? 48 : 30;
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const x = 30 + i * 3.2;
      const g = Math.exp(-((x - cx) ** 2) / (2 * sig * sig));
      const y = 90 - g * 36 * Math.cos((x - cx) / 4);
      pts.push([x, y]);
    }
    return polyLine(pts, SEC, 1.5);
  });
}

function drawGuide(lang, step) {
  return obliqueShown(lang, step, {
    '-1': [['波导宽度', 'Guide width'], ['截止频率 fc = c/(2a)', 'Cutoff fc = c/(2a)']],
    0: [['读 fc', 'Read fc'], ['由宽度 a 决定', 'Set by the width a']],
    1: [['低于截止', 'Below cutoff'], ['标明不传播', 'Marked as not propagating']],
    2: [['高于截止', 'Above cutoff'], ['可以传播', 'It can propagate']],
    3: [['加宽', 'Wider guide'], ['fc 下降', 'fc falls']],
    4: [['截止以下', 'Below cutoff'], ['不要画成行波', 'Do not draw a travelling wave']],
  }, (M) => {
    const { line, dash, arrow, ray, text, box, circ, poly, polyLine, path, axes, axisLabels, hDim, vDim, ground, crosses, hatchesH, hatchesV, chargeBall, sinePts, block, beaker, cylinder, springV, pendulum, magnetBar, convexLens, concaveLens, screenPlate, piston } = M;
    const a = step === 3 ? 70 : 46;
    const y = 80;
    let s = line(40, y - a / 2, 280, y - a / 2, INK, 1.6);
    s += line(40, y + a / 2, 280, y + a / 2, INK, 1.6);
    s += vDim(28, y - a / 2, y + a / 2, 'a', SEC);
    if (step === 1 || step === 4) {
      const pts = [];
      for (let i = 0; i <= 30; i++) pts.push([60 + i * 6, y - Math.sin(i / 2) * 8 * Math.exp(-i / 8)]);
      s += polyLine(pts, RAY, 1.5);
    } else {
      s += polyLine(sinePts(60, y, 200, 10, 3), RAY, 1.5);
    }
    return s;
  });
}

function drawWork(lang, step) {
  return shown(lang, step, {
    '-1': [['功', 'Work'], ['力与位移的夹角', 'The angle between force and displacement']],
    0: [['夹角为 0', 'Angle 0'], ['W = Fs', 'W = F s']],
    1: [['夹角 90°', 'Angle 90°'], ['功为 0', 'Work is 0']],
    2: [['夹角 180°', 'Angle 180°'], ['功为负', 'Work is negative']],
    3: [['功率', 'Power'], ['时间加倍，平均功率减半', 'Double the time, average power halves']],
    4: [['夹角 60°', 'Angle 60°'], ['功是 Fs 的一半', 'Work is half of F s']],
  }, () => {
    const ang = step === 1 ? 90 : step === 2 ? 180 : step === 4 ? 60 : 0;
    const rad = (ang * Math.PI) / 180;
    const z = 46;
    let s = tableBoard(220, 72);
    s += block3d(80, z - 8, 44, 14, 26, { y0: 0 });
    s += oblArrow3d(52, 16, z, 168, 16, z, INK, 1.6);
    s += text(...obl(110, 32, z), 's', { size: 12 });
    const fx = 86 + Math.cos(rad) * 40;
    const fy = 16 + Math.sin(rad) * 40;
    s += oblArrow3d(86, 16, z, fx, fy, z, RAY, 1.8);
    s += text(...obl(fx + 6, fy + 4, z), 'F', { anchor: 'start', size: 13, fill: RAY });
    if (step === 3) s += text(...obl(196, 40, z), 't↑', { anchor: 'start', size: 14, fill: SEC });
    return s;
  });
}

const DRAW = {
  'ac-rms': [drawAc, 5],
  'ampere-force': [drawAmpere, 5],
  archimedes: [drawArchimedes, 5],
  atmosphere: [drawAtmosphere, 5],
  'atom-levels': [drawLevels, 5],
  balance: [drawBalance, 5],
  'bar-magnet': [drawMagnet, 5],
  'barrier-tunnel': [drawTunnel, 5],
  beats: [drawBeats, 5],
  'bell-singlet': [drawBell, 5],
  bernoulli: [drawBernoulli, 5],
  boiling: [drawBoiling, 5],
  'buoyancy-origin': [drawBuoyOrigin, 5],
  'buoyancy-weigh': [drawBuoyWeigh, 5],
  capacitance: [drawCapacitance, 5],
  carnot: [drawCarnot, 5],
  'central-orbit': [drawOrbit, 5],
  charges: [drawCharges, 5],
  circuit: [drawCircuit, 5],
  circular: [drawCircular, 5],
  collide: [drawCollide, 5],
  'convex-lens': [drawConvex, 6],
  'coupled-pendula': [drawCoupled, 5],
  current: [drawCurrent, 5],
  cyclotron: [drawCyclotron, 5],
  density: [drawDensity, 5],
  'density-lab': [drawDensityLab, 5],
  'dipole-radiation': [drawDipole, 5],
  dispersion: [drawDispersion, 5],
  doppler: [drawDoppler, 5],
  'double-slit': [drawDoubleSlit, 5],
  'echo-range': [drawEcho, 5],
  efficiency: [drawEfficiency, 5],
  'em-wave': [drawEmWave, 5],
  energy: [drawEnergy, 5],
  'energy-share': [drawShare, 5],
  'field-potential': [drawPotential, 5],
  'finite-well': [drawFinite, 5],
  'float-sink': [drawFloat, 5],
  'force-compose': [drawCompose, 5],
  'force-elements': [drawTorque, 5],
  'fourier-square': [drawFourier, 5],
  frames: [drawFrames, 5],
  friction: [drawFriction, 5],
  gravity: [drawGravity, 5],
  'half-life': [drawHalf, 5],
  'heat-engine': [drawEngine, 5],
  'hydrogen-radial': [drawHydrogen, 5],
  'ideal-gas': [drawIdeal, 5],
  'image-charge': [drawImageCharge, 5],
  induction: [drawInduction, 5],
  inertia: [drawInertia, 5],
  'infinite-well': [drawInfinite, 5],
  'internal-energy': [drawInternal, 5],
  ising: [drawIsing, 5],
  'kinetic-gas': [drawKinetic, 5],
  'laser-cavity': [drawLaser, 5],
  'length-contraction': [drawContract, 5],
  lever: [drawLever, 5],
  'liquid-pressure': [drawLiquidP, 5],
  lorentz: [drawLorentz, 5],
  malus: [drawMalus, 5],
  'mass-energy': [drawMassEnergy, 5],
  'maxwell-speed': [drawMaxwellSpeed, 5],
  'maxwell-wave': [drawMaxwellWave, 5],
  melting: [drawMelting, 5],
  membrane: [drawMembrane, 5],
  'normal-modes': [drawModes, 5],
  oscillator: [drawOscillator, 5],
  'pendulum-pair': [drawPendulum, 5],
  photoelectric: [drawPhoto, 5],
  pinhole: [drawPinhole, 5],
  'plane-mirror': [drawPlaneMirror, 5],
  'point-field': [drawPointField, 5],
  projectile: [drawProjectile, 5],
  pulley: [drawPulley, 5],
  reflection: [drawReflection, 5],
  refraction: [drawRefraction, 5],
  resistivity: [drawResistivity, 5],
  'rigid-disk': [drawDisk, 5],
  ruler: [drawRuler, 5],
  scales: [drawScales, 5],
  simultaneity: [drawSimul, 5],
  'single-slit': [drawSingleSlit, 5],
  solenoid: [drawSolenoid, 5],
  'solid-pressure': [drawSolidP, 5],
  'sound-absorb': [drawAbsorb, 5],
  'sound-wave': [drawSound, 5],
  'specific-heat': [drawSpecific, 5],
  'spring-scale': [drawSpring, 5],
  'st-graph': [drawSt, 5],
  'stern-gerlach': [drawStern, 5],
  stopwatch: [drawWatch, 5],
  sublimation: [drawSublimation, 5],
  telescope: [drawTelescope, 5],
  thermometer: [drawThermo, 5],
  'thin-film': [drawFilm, 5],
  'time-dilation': [drawDilation, 5],
  transformer: [drawTransformer, 5],
  'transmission-line': [drawTline, 5],
  'two-force': [drawTwoForce, 5],
  vision: [drawVision, 5],
  'vt-area': [drawVt, 5],
  'wave-packet': [drawPacket, 5],
  waveguide: [drawGuide, 5],
  work: [drawWork, 5],
};

export function labFigureSvg(simId, section, index, lang) {
  const spec = DRAW[simId];
  if (!spec) return null;
  if (section !== 'prepare' && section !== 'steps' && section !== 'conclude') return null;
  if (!Number.isInteger(index) || index < 0) return null;
  const langKey = lang === 'en' ? 'en' : 'zh';
  const [draw, nSteps] = spec;
  if (section === 'prepare') return index === 0 ? draw(langKey, -1) : null;
  if (section === 'steps') return index < nSteps ? draw(langKey, index) : null;
  return null;
}

export function labFigureCount(simId) {
  const spec = DRAW[simId];
  return spec ? spec[1] : 0;
}

export const LAB_FIGURE_SIMS = Object.keys(DRAW);
