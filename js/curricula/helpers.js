export function ready(id, sim, zh, en, introZh, introEn, preset, exam = false, procedure = null) {
  const lesson = {
    id, sim, status: 'ready', exam,
    title: { zh, en },
    intro: { zh: introZh, en: introEn },
    preset,
  };
  if (procedure) lesson.procedure = procedure;
  return lesson;
}

/** Textbook lab procedure for junior convex-lens imaging (PEP / Huke). */
export const CONVEX_LENS_LAB = {
  zh: [
    '把点燃的蜡烛、凸透镜和光屏依次放在光具座上，调节烛焰中心、透镜光心与光屏中心大致在同一高度，使三者共轴。',
    '测出（或记下）凸透镜的焦距 f。先把蜡烛放在较远处，使物距 u > 2f；左右移动光屏，直到屏上出现清晰的像。记下物距 u、像距 v，并观察像是倒立还是正立、放大还是缩小。',
    '逐渐减小物距：依次取 u = 2f 以及 f < u < 2f。每改变一次蜡烛位置，都重新移动光屏找清晰像，并记录 u、v 与像的特征。',
    '把蜡烛移到焦点附近（u ≈ f）：在透镜另一侧的光屏上找不到清晰的实像。',
    '继续减小物距到 u < f：光屏上仍无实像；从另一侧透过凸透镜观察，可以看到正立、放大的虚像。',
    '整理多组 u、v 数据，用 1/u + 1/v = 1/f 检验，并归纳物距变化时像的倒正、大小与虚实规律。在本课中拖动蜡烛与光屏，对照上述步骤完成探究。',
  ],
  en: [
    'Place a lit candle, a converging lens, and a screen on the optical bench. Adjust heights so the flame centre, lens centre, and screen centre are roughly collinear (coaxial).',
    'Measure or note the focal length f. Start with the candle far away so the object distance u > 2f. Move the screen until a sharp image appears. Record u and the image distance v, and note whether the image is inverted or erect, magnified or diminished.',
    'Reduce u step by step: take u = 2f and then f < u < 2f. Each time, move the screen to a sharp image and record u, v, and the image character.',
    'Move the candle near the focus (u ≈ f): no sharp real image can be caught on the screen beyond the lens.',
    'Reduce further to u < f: still no real image on the screen; looking through the lens from the other side shows an erect, magnified virtual image.',
    'Check the recorded pairs with 1/u + 1/v = 1/f and summarise how image orientation, size, and real/virtual nature change with u. In this lesson, drag the candle and screen to follow those steps.',
  ],
};

export function queued(id, zh, en, intentZh, intentEn) {
  return {
    id, sim: null, status: 'queued',
    title: { zh, en },
    intent: { zh: intentZh, en: intentEn },
  };
}

export function section(id, zh, en, lessons) {
  return { id, title: { zh, en }, lessons };
}

export function chapter(id, volume, zh, en, sections, priority = false) {
  return { id, volume, priority, title: { zh, en }, sections };
}
