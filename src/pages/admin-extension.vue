<template>
  <div class="all">
    <div  class="headerClass">推广管理信息</div>
     <div class="handle-box">
      <el-form ref="form" :model="form" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="昵称：" class="Form-lable">
              <el-input v-model="form.name" placeholder="请输入用户昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" class="Form-lable">
              <el-input v-model="form.Phone" placeholder="请输入用户电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search"  class="SeachClass">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="clearForm">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <data-table :columns="columns" :form="form" :pageing="pageing"  :FromPath="FromPath"  ref="table" >
        <template slot="btnList_link">
       <el-table-column label="访问链接" align="center" min-width="200px">
          <template slot-scope="scope">
              <a :href="scope.row.extention_url" class="hreLinkClass">{{scope.row.extention_url}}</a>
          </template>
        </el-table-column>
        </template>
      <template slot="btnList">
        <el-table-column label="操作" align="center" min-width="200px">
          <template slot-scope="scope">
            <template v-for="(item,index) in handleArr">
              <el-button :type="item.type" :key="index" @click="handleCommand(item.name,scope.row)">{{item.name}}</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </data-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import dataTable from "@/components/_table.vue";
import { getProductList } from "@/api";
import listMixins from '@/utils/listMixins.js';
export default {
  components: {
    dataTable
  },
    mixins: [listMixins],
  name: "HelloWorld",
  computed: {
    ...mapState({
      extensionData: state => state.store.extensionData
    })
  },
  data() {
    return {
      dialogTableVisible:false,
      columns: [
         { field: "numb", title: "序号"},
        { field: "name", title: "推广姓名" },
        { field: "extention_url", title: "推广链接" },
        { field: "extention_visit", title: "访问量" },
        { field: "extention_Down", title: "下载量" },
      ],
      FromPath:'admin-extension',
      form:{},
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
      handleArr: [
           { name: "删除", type: "danger" },
      ],
    };
  },
  mounted() {
    console.log(this.extensionData, "extensionData");
  },
  methods: {
     ...mapActions(["changeextensionData"]),
    handleCommand(title, data) {
      switch (title) {
        case "删除":
          this.DeleteAway(data);
          break;
      }
    },
      // 删除
    DeleteAway(data) {
      this.$confirm('确认关闭？')
          .then(_ => {
          this.extensionData.splice(data.PKID,1)
           this.changeextensionData(this.extensionData)
            setTimeout(()=>{
           this.$refs.table.getList();
      },1000)
            done();
          })
      .catch(_ => {});
    },
  }
};
</script>

<style lang="scss" scoped>
.all {
  padding-top: 1rem;
}
.table {
  max-width: 100rem;
  margin-top: 2rem;
}
.pagination {
  text-align: center;
  margin-top: 1rem;
}
.el-form--inline .el-form-item__content{
  width: 270px;
}
.footerConent{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.hreLinkClass:hover{
  color: green
}
</style>
