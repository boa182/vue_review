<template>
  <div class="common-entry">
     <x-header
        :left-options="{backText:'', showBack: false}">
        常用组件
    </x-header>
    <span>{{count}}{{count1}}{{count2}}</span>
    <div>{{$store.getters.total()}}</div>
    <div>{{$store.getters.total('￥')}}</div>
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
