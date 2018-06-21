<template>
  <div class="home">
    <router-view></router-view>
    <c-foot :data = footList></c-foot>
  </div>
</template>
<script>
export default {
  name: 'home',
  computed: {
  },
  data () {
    return {
      footList: [
        {
          label: '组件',
          name: 'common'
        }, {
          label: '代码段',
          name: 'block'
        }, {
          label: '技术栈',
          name: 'technology'
        }
      ]
    }
  },
  created () {
    // 通过store.commit方法触发状态改变
    // this.$store.commit('increment')
    // 通过store.state来获取状态对象
    // console.log(this.$store.state.count)
  }
}
</script>
<style>
.home{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
