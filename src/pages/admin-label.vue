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
    <data-table :columns="columns" :form="form" :pageing="pageing" :FromPath="FromPath"  ref="table" >
      <template slot="btnList">
        <el-table-column label="操作" align="center" min-width="200px">
          <template slot-scope="scope">
            <template v-for="(item,index) in handleArr">
              <el-button :type="item.type" :key="index" @click="handleCommand(item.name,scope.row)" >{{item.name}}</el-button>
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
             <el-form-item label="标签名：" prop="numb">
                <el-input v-model="form_edit.numb" placeholder="请输入标签名"></el-input>
            </el-form-item>
            <el-form-item class="footerConent">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="confirm('form_edit')">保存</el-button>
            </el-form-item>
        </el-form>
        
    </el-dialog>
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
      labelData: state => state.store.labelData
    })
  },
  data() {
    return {
      dialogTableVisible:false,
      columns: [
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
        ],
        numb: [
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
    confirm(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
           this.dialogTableVisible=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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

  