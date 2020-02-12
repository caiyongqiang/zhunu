<template>
  <div>
    <div class="space-bteewn">
      <div class="sider-menu">
        <TabMenu></TabMenu>
      </div>
      <div class="roter-page">
        <keep-alive v-if="!$route.meta.notKeepAlive">
            <router-view></router-view>
        </keep-alive>
        <router-view v-if="$route.meta.notKeepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TabMenu from '@/components/tabMenu'

export default {
  name: 'adminCenter',
  components: {
    TabMenu
  },
  data () {
    return {}
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .space-bteewn{
    display: flex;
    justify-content: flex-start;
  }
  .roter-page{
    padding-left: 2rem;
  }
</style>