export const block = [
  {
    path: '/home/block',
    name: 'block',
    component: () => import('components/noReapt/block-entry.vue')
  }
]

export default [
  ...block
]
