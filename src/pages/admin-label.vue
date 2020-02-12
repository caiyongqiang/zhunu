<template>
  <div class="hello">
    标签管理（我自己新增的测试的东西））
  </div>
</template>

<script>
import { getProductList } from '@/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  mounted() {
    // getProductList({}).then(res => {
    //   console.log(res, 'getBannerList')
    // })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
