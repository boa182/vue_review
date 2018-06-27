<template>
  <div class="technology-entry">
    <x-header
      :left-options="{backText:'', showBack: false}">
      新get技能
    </x-header>
    <group :title="'1、vuex的简单使用'">
      <p class="count">count: {{count}}</p>
      <p class="count-btn">
        <span @click="cut()">减</span>
        <span @click="add()">加</span>
      </p>
    </group>
    <group :title="'2、getter的简单使用'" class="getters">
      <p>price: <span>{{$store.getters.total()}}</span></p>
      <p>price: <span>{{$store.getters.total('￥')}}</span></p>
      <p>name: <span>{{$store.getters.filtration(1).name}}</span></p>
    </group>
  </div>
</template>
<script>
export default {
  name: 'technology-entry',
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    cut () {
      this.$store.commit('reduce')
    },
    add () {
      this.$store.commit('increment')
    }
  }
}
</script>

<style lang="less" scoped>
.technology-entry{
  height: 100%;
  background: #f4f4f4;
  .count{
    padding: 10px 20px;
  }
  .count-btn{
    padding: 0 0px 10px 10px;
    span{
      display: inline-block;
      text-align: center;
      height: 25px;
      width: 100px;
      background: skyblue;
      color: #fff;
    }
  }
  .getters{
    p{
      padding: 5px;
    }
  }
}
</style>
