<template>
  <div class="home">
    <router-view></router-view>
    <c-foot :data = footList></c-foot>
  </div>
</template>
<script>
export default {
  name: 'home',
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
