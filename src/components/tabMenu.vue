<template>
  <div class="elRow">
      <el-menu
        default-active="/adminUser"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/adminUser" route='/adminUser'>
          <!-- <i class="el-icon-menu"></i> -->
          <span slot="title">用户信息</span>
        </el-menu-item>
        <el-menu-item index="/adminMaterial">
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/adminVideo">
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">视频管理</span>
        </el-menu-item>
        <el-menu-item index="/adminExtension">
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">推广管理</span>
        </el-menu-item>
        <el-menu-item index="/adminLabel">
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">标签管理</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        //当前选定路由
        activerouter: ''
      }
    },
    mounted() {
      this.activerouter = this.$route.path;
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .elRow{
    width: 10rem;
  }
  .el-menu-vertical-demo{
    height: 100%;
    min-height: 100vh;
    text-align: center;
  }
</style>