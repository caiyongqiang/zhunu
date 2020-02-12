<template>
  <div class="all">
    <div>视频管理</div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="mobile"
          label="用户手机号"
          align='center'
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="name"
          label="视频描述"
          align='center'
          min-width="150px">
        </el-table-column>
        <el-table-column
          prop="sex"
          align='center'
          label="视频">
        </el-table-column>
        <el-table-column
          prop="date"
          align='center'
          label="操作"
          min-width="150px">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">删除</el-button>
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getProductList } from '@/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      tableData: [{
          date: '2019-03-23',
          name: '王小虎',
          mobile: '13660000000',
          address: '广东-广州',
          user: '13000000009',
          sex: '男'
        }, {
          date: '2019-03-23',
          name: '王小虎',
          mobile: '13660000000',
          address: '广东-广州',
          user: '13000000009',
          sex: '男'
        },{
          date: '2019-03-23',
          name: '王小虎',
          mobile: '13660000000',
          address: '广东-广州',
          user: '13000000009',
          sex: '男'
        },{
          date: '2019-03-23',
          name: '王小虎',
          mobile: '13660000000',
          address: '广东-广州',
          user: '13000000009',
          sex: '男'
        }]
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
.all{
  padding-top: 1rem;
}
.table{
  max-width: 100rem;
  margin-top: 2rem;
}
.pagination{
  text-align: center;
  margin-top: 1rem;
}
</style>
