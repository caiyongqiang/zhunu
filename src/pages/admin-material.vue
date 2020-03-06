<template>
  <div class="all">
    <div class="headerClass">素材管理信息</div>
    <div class="handle-box">
      <el-form ref="form" :model="form" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="权重：" class="Form-lable">
              <el-input v-model="form.weight" placeholder="请输入用户昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文字：" class="Form-lable">
              <el-input v-model="form.content" placeholder="请输入用户电话"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item label="视频最长认证时间：" class="Form-lable">
              <el-input v-model="form.timeOut" placeholder="请输入用户电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="clearForm">重置</el-button>
          </el-form-item>
        </el-row>
        <el-row class="AddClass">
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary" @click="AddTap">新增</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <data-table :columns="columns" :form="form" :pageing="pageing" :FromPath="FromPath" ref="table">
         <template slot="PullblackList">
        <el-table-column label="是否运行" align="center" min-width="200px">
          <template slot-scope="scope">
            <div  @click="SwitchTap(scope.row)">
                 <el-switch v-model="scope.row.isRun" active-text="是" inactive-text="否"></el-switch>
            </div>
          </template>
        </el-table-column>
      </template>
      <template slot="TagsList">
        <el-table-column label="标签" align="center" min-width="200px">
          <template slot-scope="scope">
            <template v-for="(item,index) in scope.row.repalceArr">
              <el-tag type="success">{{item}}</el-tag>
            </template>
          </template>
        </el-table-column>
      </template>
      <template slot="btnList">
        <el-table-column label="操作" align="center" min-width="200px">
          <template slot-scope="scope">
            <template v-for="(item,index) in handleArr">
              <el-button
                :type="item.type"
                :key="index"
                @click="handleCommand(item.name,scope.row)"
              >{{item.name}}</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </data-table>
    <el-dialog
      :title="TitleName"
      :visible.sync="dialogTableVisible"
      width="450px"
      center
      :before-close="handleClose"
      :show-close="false"
    >
      <el-form
        ref="form_edit"
        :rules="rules"
        :model="form_edit"
        :inline="true"
        label-position="right"
        class="demo-ruleForm"
      >
        <el-form-item label="权重值：" prop="weight">
          <el-input v-model="form_edit.weight" placeholder="请输入权重值"></el-input>
        </el-form-item>
        <el-form-item label="文字：" prop="content">
          <el-input v-model="form_edit.content" placeholder="请输入标文字"></el-input>
        </el-form-item>
        <el-form-item label="选择标签（至少三个）" prop="LabelSelectArr">
          <el-checkbox-group v-model="form_edit.LabelSelectArr">
            <template v-for="(item,index) in LabelList">
              <el-checkbox :label="item.id" name="type">{{item.content}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="运行：">
          <el-switch v-model="form_edit.isRun" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="视频最长认证时间：" prop="timeOut">
          <el-input v-model="form_edit.timeOut" placeholder="请输入视频最长认证时间"></el-input>秒
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
import {
  getProductList,
  UrltextStockEdit,
  UrlLabel,
  UrltextStockAdd
} from "@/api";
import listMixins from "@/utils/listMixins.js";

export default {
  components: {
    dataTable
  },
  mixins: [listMixins],
  name: "HelloWorld",
  computed: {
    // ...mapState({
    //   materialData: state => state.store.materialData
    // })
  },
  data() {
    var validateTotal = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("至少选择三个标签"));
      } else {
        callback();
      }
    };
    return {
      dialogTableVisible: false,
      columns: [
        { field: "id", title: "序号" },
        { field: "weight", title: "权重值" },
        { field: "content", title: "文字" },
        { field: "timeOut", title: "视频最长认证时间" },
      ],
      FromPath: "admin_material",
      form: {
         weight: "",
         content: "",
      },
      TitleName: "", //标题
      form_edit: {  //编辑，新增接受值
        weight: "",
        content: "",
        tagIds: "",
        LabelSelectArr: [],
        isRun: false,
        timeOut: ""
      },
      LabelList: [],
      // LabelSelectArr:[],
      rules: {
        content: [{ required: true, message: "请输入文字", trigger: "blur" }],
        weight: [{ required: true, message: "请输入权重值", trigger: "blur" }],
        timeOut: [
          { required: true, message: "请输入视频最长认证时间", trigger: "blur" }
        ],
        LabelSelectArr: [
          // { type: 'array', required: true, message: '请至少选择一标签', trigger: 'change' },
          { validator: validateTotal, trigger: "blur" }
        ]
      },
      // 分页、排序 控制器
      pageing: {
        url: "ApiUrl.PList",
        total: 0,
        // sort: "PKID",
        // order: "DESC",
        offset: 1,
        limit: 20
      },
      // 自定义按钮
      handleArr: [
        { name: "编辑", type: "primary" },
        { name: "删除", type: "danger" }
      ],
      
    };
  },
  mounted() {
    // console.log(this.materialData, "materialData");
  },
  created() {
    //  var arr= this.$refs.table.getList();
  },
  methods: {
      search(){
        this.$refs.table.getList();
    },
    clearForm(){
       for (let key in this.form){
          this.form[key]=''
      }
        this.$refs.table.getList();
    },
    SwitchTap(data){
     UrltextStockEdit({id:data.id,isRun:data.isRun}).then(res => {
            //  this.dialogTableVisible = false;
            //   this.loading.close();
              // this.$message({
              //   showClose: true,
              //   message: "修改成功",
              //   type: "success"
              // });
              // this.$refs.table.getList();
            });
    },
    AddTap() {
      this.dialogTableVisible = true;
      this.getlabeldata();
      this.TitleName = "新增素材";
    },
    // ...mapActions(["changelabelData"]),
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
      this.dialogTableVisible = true;
      this.TitleName = "编辑素材";
      this.form_edit.id =JSON.parse(JSON.stringify(data)).id
      this.form_edit.weight = JSON.parse(JSON.stringify(data)).weight;
      this.form_edit.content = JSON.parse(JSON.stringify(data)).content;
      this.form_edit.tagIds = JSON.parse(JSON.stringify(data)).tagIds;
      this.form_edit.LabelSelectArr = [];
      this.form_edit.isRun = JSON.parse(JSON.stringify(data)).isRun;
      this.form_edit.timeOut = JSON.parse(JSON.stringify(data)).timeOut;
      this.getlabeldata();
    },
    //获取标签的值
    getlabeldata() {
      UrlLabel({ limit: 20, offset: 1 }).then(res => {
        this.LabelList = res.rows;
        if (this.TitleName == "编辑素材") {
          if (this.form_edit.tagIds.indexOf(",") > 0) {
            var arr = this.form_edit.tagIds.split(",");
            arr.forEach(element => {
              this.form_edit.LabelSelectArr.push(parseInt(element));
            });
          } else {
            this.form_edit.LabelSelectArr = [parseInt(this.form_edit.tagIds)];
          }
        }
        console.log(">>>", this.form_edit.LabelSelectArr);
      });
    },
    // 删除
    DeleteAway(data) {
      this.$confirm("你确定要删除？")
        .then(_ => {
          // this.materialData.splice(data.PKID, 1);
          // this.changelabelData(this.materialData);
          setTimeout(() => {
            this.$refs.table.getList();
          }, 1000);
          done();
        })
        .catch(_ => {});
    },
    handleClose() {},
    cancle() {
      this.dialogTableVisible = false;
      for (let key in this.form_edit) {
        if (key == "LabelSelectArr") {
          this.form_edit[key] = [];
        } else {
          if (key == "isRun") {
            this.form_edit[key] = false;
          } else {
            this.form_edit[key] = "";
          }
        }
      }
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        debugger;
        if (valid) {
          if (this.TitleName == "新增素材") {
            for (
              var i = this.form_edit.LabelSelectArr.length - 1;
              i >= 0;
              i--
            ) {
              if (i != 0) {
                this.form_edit.tagIds += this.form_edit.LabelSelectArr[i] + ",";
              } else {
                this.form_edit.tagIds += this.form_edit.LabelSelectArr[i];
              }
            }
            UrltextStockAdd(this.form_edit).then(res => {
              this.dialogTableVisible = false;
              this.loading.close();
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.$refs.table.getList();
            });
          } else {
            UrltextStockEdit(this.form_edit).then(res => {
             this.dialogTableVisible = false;
              this.loading.close();
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.$refs.table.getList();
            });
          }
        } else {
          return false;
        }
      });
    }
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
.el-form--inline .el-form-item__content {
  width: 270px;
}
.footerConent {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.el-button--primary {
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

  