<template>
  <div class="hello">
    <!-- 管理用户信息 -->
    <data-table :columns="columns" :form="form" :pageing="pageing" ref="table">
      <template slot="btnList">
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <template v-for="(item,index) in handleArr">
              <el-button type="text" @click="handleCommand(item,scope.row)">{{item}}</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </data-table>
  </div>
</template>
<script>
import dataTable from "@/components/_table.vue";
import { getProductList } from "@/api";
export default {
  components: {
    dataTable
  },
  name: "admin-user",
  data() {
    return {
      columns: [
        { field: "PKID", title: "隐藏主键", hidden: true },
        { field: "name", title: "昵称" },
        { field: "Phone", title: "联系电话" },
        { field: "sex", title: "性别" },
        { field: "birth", title: "出生日期" },
        { field: "city", title: "所在城市" },
        { field: "baduser", title: "拉黑用户" }
      ],
      // 页面有筛选时用到 查询表单
      form: {
        DistributorName: "",
        FKGradeID: "",
        CurrentStatus: "",
        AuthStartTime: "",
        AuthEndTime: "",
        ExamineStatus: 2
      },
      // 分页、排序 控制器
      pageing: {
        url: "ApiUrl.PList",
        total: 0,
        sort: "PKID",
        order: "DESC",
        page: 1,
        limit: 20
      },
      // 自定义按钮
      handleArr: ["编辑", "启用", "删除"]
    };
  },
  mounted() {},
  methods: {
    defuClick() {
      this.$refs.table.getList();
    },
    handleCommand(title, data) {
      switch (title) {
        case "编辑":
          this.EditAway(data);
          break;
        case "删除":
          this.DeleteAway(data);
          break;
        case "启用":
          this.StartAway(data);
          break;
      }
    },
    // 编辑
    EditAway(data) {
      this.$refs.table.getList();
    },
    // 删除
    DeleteAway() {
      console.log("删除");
    },
    // 启用
    StartAway() {
      console.log("启用");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
