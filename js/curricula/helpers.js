import { LAB_BY_SIM } from './lab-procedures.js';

export function ready(id, sim, zh, en, introZh, introEn, preset, exam = false, procedure = null) {
  const lesson = {
    id, sim, status: 'ready', exam,
    title: { zh, en },
    intro: { zh: introZh, en: introEn },
    preset,
  };
  const lab = procedure || LAB_BY_SIM[sim] || null;
  if (lab) lesson.procedure = lab;
  return lesson;
}

/** Explicit convex-lens override used by PEP / Huke exam lessons (same as LAB_BY_SIM entry). */
export const CONVEX_LENS_LAB = LAB_BY_SIM['convex-lens'];

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
