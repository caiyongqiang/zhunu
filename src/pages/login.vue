<template>
  <div class="login">
    <div class="login-block">
      <el-input v-model="mobile" class="inputs" placeholder="请输入内容"></el-input>
      <el-input v-model="password" class="inputs password" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="singup" class="signup">登录</el-button>
  </div>
  </div>
</template>

<script>
import { getProductList } from '@/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      mobile: '',
      password: ''
    }
  },
  mounted() {

  },
  methods: {
    singup () {
      if(!this.mobile){
        this.$message({
          showClose: true,
          message: '请输入账号',
          type: 'warning'
        });
      }else if(!this.password){
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'warning'
        });
      }else{
      this.$router.push({path: '/adminUser'})

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  background: url('../../static/back.jpg');
   max-width: 200rem;
  min-height: 100vh;
  height: 55rem;
  background-repeat: no-repeat;
  background-size: 100% 100%
}
.login-block{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 20rem;
  height: 10rem;
  margin:auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  padding: 2rem 0;
  .inputs{
    width: 18rem;
    text-align: center;
}
  .password{
    margin-top: 1rem;
}
  .signup{
    width: 15rem;
    margin-top: 2rem;
}
}
</style>
