<template>
  <div class="all">
    <div  class="headerClass">推广管理信息</div>
      <div class="handle-box">
      <el-form ref="form" :model="form" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="标签：" class="Form-lable">
              <el-input v-model="form.content" placeholder="请输入标签"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row class="AddClass">
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary" @click="AddTap">新增</el-button>
          </el-form-item>
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
     <el-dialog :title="titleName" :visible.sync="dialogTableVisible" width="450px" center :before-close="handleClose" :show-close="false">
       <el-form ref="form_edit" :rules="rules" :model="form_edit" :inline="true" label-position="right" class="demo-ruleForm">
            <el-form-item label="标签名：" prop="content">
                <el-input v-model="form_edit.content" placeholder="请输入标签名"></el-input>
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
import { getProductList,UrlLabel,UrlLabelEdit,UrlLabelAdd } from "@/api";
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
        { field: "id", title: "序号" },
        { field: "content", title: "标签" },
      ],
      FromPath:'admin_label',
      form: {
        content:''
        },
      form_edit:{content:''},
      titleName:'',
       rules: {
        content: [
          { required: true, message: '请输入标签名', trigger: 'blur' },
        ],
        numb: [
          { required: true, message: '请输入标签名', trigger: 'blur' },
        ]
      },
      // 分页、排序 控制器
      pageing: {
        // url: "ApiUrl.PList",
        total: 0,
        offset: 1,
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
    search(){
        this.$refs.table.getList();
    },
    clearForm(){
      this.form.content=""
        this.$refs.table.getList();
    },
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
    // 新增
    AddTap(){
          this.dialogTableVisible=true
           this.titleName="新增标签"
    },
    // 编辑
    EditAway(data) {
      this.dialogTableVisible=true
      this.titleName="编辑标签"
      this.form_edit=JSON.parse(JSON.stringify(data))
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
         for (let key in this.form_edit){
          this.form_edit[key]=''
      }
       this.dialogTableVisible=false
    },
    confirm(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            // 这个是新增
            if(this.titleName=="新增标签"){
           UrlLabelAdd({content:this.form_edit.content}).then(res => {
              this.dialogTableVisible=false
              this.$refs.table.getList();
             })
            }else{
           // 这个是编辑
            UrlLabelEdit(this.form_edit).then(res => {
              this.dialogTableVisible=false
              this.$refs.table.getList();
             })
            }
          
          //  
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
.AddClass {
  display: flex;
  justify-content: flex-end;
}
// .el-form-item{
//   display: flex;
//   // justify-content: center
// }
</style>

  