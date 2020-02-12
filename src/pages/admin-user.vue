<template>
  <div class="all">
    <div>管理用户信息</div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="昵称"
          align='center'
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          align='center'
          min-width="150px">
        </el-table-column>
        <el-table-column
          prop="sex"
          align='center'
          label="性别">
        </el-table-column>
        <el-table-column
          prop="date"
          align='center'
          label="出生年月日"
          min-width="150px">
        </el-table-column>
        <el-table-column
          prop="address"
          label="所在城市"
          align='center'
          min-width="100px">
        </el-table-column>
        <el-table-column
          prop="user"
          align='center'
          label="拉黑用户"
          min-width="200px">
        </el-table-column>
        <el-table-column
          prop=""
          align='center'
          label="操作"
          min-width="120px">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleDelet(scope.$index, scope.row)">删除</el-button>
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
import { getProductList } from "@/api";
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

  },
  methods: {
    handleDelet () {

    }
  }
};
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
