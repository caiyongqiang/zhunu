<template>
  <div class="all">
    <div>推广管理信息</div>
    <data-table :columns="columns" :form="form" :pageing="pageing" :FromPath="FromPath"  ref="table" >
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
     <el-dialog title="编辑用户信息" :visible.sync="dialogTableVisible" width="450px" center :before-close="handleClose" :show-close="false">
       <el-form ref="form_edit" :rules="rules" :model="form_edit" :inline="true" label-position="right" class="demo-ruleForm">
            <el-form-item label="标签名：" prop="name">
                <el-input v-model="form_edit.name" placeholder="请输入标签名"></el-input>
            </el-form-item>
            <el-form-item class="footerConent">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="confirm">保存</el-button>
            </el-form-item>
        </el-form>
        
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import dataTable from "@/components/_table.vue";
import { getProductList } from "@/api";
export default {
  components: {
    dataTable
  },
  name: "HelloWorld",
  computed: {
    ...mapState({
      labelData: state => state.store.labelData
    })
  },
  data() {
    return {
      dialogTableVisible:false,
      columns: [
        { field: "PKID", title: "隐藏主键", hidden: true },
        { field: "numb", title: "序号" },
        { field: "name", title: "标签" },
      ],
      FromPath:'admin_label',
      form: {
        
        },
      form_edit:{name:''},
       rules: {
        name: [
          { required: true, message: '请输入标签名', trigger: 'blur' },
        ]
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
      handleArr: [
        { name: "编辑", type: "primary" },
        { name: "删除", type: "danger" },
      ],
    };
  },
  mounted() {
    console.log(this.labelData, "labelData");
  },
  methods: {
    ...mapActions(["changelabelData"]),
    handleCommand(title, data) {
      switch (title) {
        case "编辑":
          this.EditAway(data);
          break;
        case "删除":
          this.DeleteAway(data);
          break;
      }
    },
    // 编辑
    EditAway(data) {
      this.dialogTableVisible=true
      this.form_edit=JSON.parse(JSON.stringify(data))
      this.$refs.table.getList();
    },
    // 删除
    DeleteAway(data) {
      this.$confirm('确认关闭？')
          .then(_ => {
           this.labelData.splice(data.PKID,1)
           this.changelabelData(this.labelData)
            setTimeout(()=>{
           this.$refs.table.getList();
      },1000)
            done();
          })
      .catch(_ => {});
    },
    handleClose(){
    },
    cancle(){
       this.dialogTableVisible=false
    },
    confirm(){
       this.dialogTableVisible=false
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
.el-button--primary{
  margin-right: 50px;
}
// .el-form-item{
//   display: flex;
//   // justify-content: center
// }
</style>

  