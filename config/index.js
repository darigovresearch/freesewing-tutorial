import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'tutorial',
  version,
  design: 'darigovresearch',
  code: 'darigovresearch',
  department: 'accessories',
  type: 'pattern',
  difficulty: 3,
  tags: [
    'freesewing',
    'design',
    'diy',
    'fashion',
    'made to measure',
    'parametric design',
    'pattern',
    'sewing',
    'sewing pattern',
  ],
  optionGroups: {
    fit: ["neckRatio", "widthRatio", "lengthRatio"],
  },
  measurements: ["head"],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['bib'],
  options: {
    neckRatio: { pct: 80, min: 70, max: 90 },
    widthRatio: { pct: 45, min: 35, max: 55 },
    lengthRatio: { pct: 75, min: 55, max: 85 },
  }
}
