<template>
  <tabbar class="c-foot" v-model="activeIndex">
    <tabbar-item
      active-class="active"
      v-for="(item,index) in data"
      :sleected="index === activeIndex"
      @on-item-click="onItemClick(item)"
      :key="index">
     <span slot="label">{{item.label}}</span>
    </tabbar-item>
  </tabbar>
</template>
<script>
import {Tabbar, TabbarItem} from 'vux'
export default {
  name: 'c-foot',
  props: {
    data: Array
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  methods: {
    onItemClick (item) {
      this.$router.replace({
        name: item.name
      })
    }
  }
}
</script>
<style lang="less" scoped>
.active p{
  background: rgb(61, 165, 254);
}
</style>
