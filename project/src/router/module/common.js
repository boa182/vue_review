export const Common = [
  {
    path: '/home/common',
    name: 'common',
    component: () => import('components/noReapt/common-entry.vue')
  }
]

export default [
  ...Common
]
