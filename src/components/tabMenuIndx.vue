<template>
  <div class="elRow">
    <el-menu
      :default-active="activerouter"
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
        @select="handleSelect"
    >
       <sidebar-item v-for="route in OtherRouter" :key="route.path" :item="route"  />
    </el-menu>
  </div>
</template>

<script>
import OtherRouter from "@/router/router_data";
import SidebarItem from './tabMenu.vue';
export default {
  components: { SidebarItem},
  data() {
    return {
      //当前选定路由
      activerouter: "",
      OtherRouter: OtherRouter.children
    };
  },
  mounted() {
    console.log("我要获取路由数量数量", OtherRouter);
    this.activerouter = this.$route.path;
    console.log("??????",this.$route.path)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath){
  this.activerouter = key
    }
  }
};
</script>

<style lang="scss" scoped>
.elRow {
  width: 10rem;
}
.el-menu-vertical-demo {
  height: 100%;
  min-height: 100vh;
  text-align: center;
}
</style>