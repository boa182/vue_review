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
    <group :title="'3、this.$set()的使用'">
      <div
        class="cell-box"
        v-for="(item,index) of list"
        :key="index">
        <cell
          isLink
          @click.native="showDatelist(item)"
          :arrow-direction="item.isShow ? 'up' : 'down'"
          :title="item.label">
        </cell>
        <div class="transition-fade" :style="{maxHeight: item.isShow ? (item.props.length*24) + 'px':0}">
          <p
            v-for="(p,i) in item.props"
            :key="i">
            {{p.name}}
          </p>
        </div>
      </div>
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
  data () {
    return {
      list: [
        {
          label: '列表一',
          props: [
            {name: 123},
            {name: 132}
          ]
        },
        {
          label: '列表二',
          props: [
            {name: 123},
            {name: 132}
          ]
        },
        {
          label: '列表三',
          props: [
            {name: 123},
            {name: 132}
          ]
        }
      ]
    }
  },
  methods: {
    cut () {
      this.$store.commit('reduce')
    },
    add () {
      this.$store.commit('increment')
    },
    showDatelist (item) {
      if (item.isShow === true) {
        item.isShow = false
      } else {
        item.isShow = true
      }
    }
  },
  created () {
    this.list.forEach((item) => {
      this.$set(item, 'isShow', false)
    })
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
  .cell-box{
    p{
      padding:5px 10px;
      color:#999;
      font-size: 12px;
    }
  }
  .transition-fade{
    transition: max-height 0.5s linear;
    overflow: hidden;
    max-height: 0;
  }
}
</style>
