<template>
  <div class="hello">
    视频管理
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
