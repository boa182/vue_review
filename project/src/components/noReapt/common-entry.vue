<template>
  <div class="common-entry">
    常用组件
    <span>{{count}}{{count1}}{{count2}}</span>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'common-entry',
  computed: mapState(['count', 'count1', 'count2'])
}
</script>
<style lang="less" scoped>
</style>
