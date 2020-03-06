<template>
  <div class="all">
    <div class="headerClass">推广管理信息</div>
    <div class="handle-box">
      <el-form ref="form" :model="form" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="渠道名称：" class="Form-lable">
              <el-input v-model="form.name" placeholder="请输入渠道名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="独立访客量：" class="Form-lable">
              <el-input v-model="form.pv" placeholder="请输入独立访客量"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="点击量：" class="Form-lable">
              <el-input v-model="form.uv" placeholder="请输入点击量"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="ios安装量：" class="Form-lable">
              <el-input v-model="form.iosInstallCount" placeholder="请输入ios安装量"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="安卓安装量：" class="Form-lable">
              <el-input v-model="form.androidInstallCount" placeholder="请输入安卓安装量"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册量：" class="Form-lable">
              <el-input v-model="form.registerCount" placeholder="请输入注册量"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="进件量：" class="Form-lable">
              <el-input v-model="form.inputCount" placeholder="请输入进件量"></el-input>
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
            <el-button type="primary" icon="el-icon-search" @click="search" class="SeachClass">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="clearForm">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <data-table :columns="columns" :form="form" :pageing="pageing" :FromPath="FromPath" ref="table">
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
      :title="titleName"
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
        <el-form-item label="渠道名称：" prop="name">
          <el-input v-model="form_edit.name" placeholder="请输入渠道名称"></el-input>
        </el-form-item>
        <el-form-item label="独立访客量：" prop="pv">
          <el-input v-model="form_edit.pv" placeholder="请输入独立访客量"></el-input>
        </el-form-item>
        <el-form-item label="点击量：" prop="uv">
          <el-input v-model="form_edit.uv" placeholder="请输入点击量"></el-input>
        </el-form-item>
        <el-form-item label="ios安装量：" prop="iosInstallCount">
          <el-input v-model="form_edit.iosInstallCount" placeholder="请输入os安装量"></el-input>
        </el-form-item>
        <el-form-item label="安卓安装量：" prop="androidInstallCount">
          <el-input v-model="form_edit.androidInstallCount" placeholder="请输入安卓安装量"></el-input>
        </el-form-item>
        <el-form-item label="注册量：" prop="registerCount">
          <el-input v-model="form_edit.registerCount" placeholder="请输入注册量"></el-input>
        </el-form-item>
        <el-form-item label="进件量：" prop="inputCount">
          <el-input v-model="form_edit.inputCount" placeholder="请输入进件量"></el-input>
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
import { getProductList, UrlChannelEdit, UrlChannelAdd } from "@/api";
import listMixins from "@/utils/listMixins.js";
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
      dialogTableVisible: false,
      columns: [
        { field: "id", title: "序号" },
        { field: "name", title: "渠道名称" }, // 推广姓名
        { field: "pv", title: "独立访客量" },
        { field: "uv", title: "点击量" },
        { field: "iosInstallCount", title: "ios安装量" }, // 推广姓名
        { field: "androidInstallCount", title: "安卓安装量" },
        { field: "registerCount", title: "注册量" },
        { field: "inputCount", title: "进件量 " }
        // { field: "extention_url", title: "推广链接" },
        // { field: "extention_visit", title: "访问量" },
        // { field: "extention_Down", title: "下载量" },
      ],
      rules: {
        name: [{ required: true, message: "请输入渠道名称", trigger: "blur" }],
        pv: [{ required: true, message: "请输入独立访客量", trigger: "blur" }],
        uv: [{ required: true, message: "请输入点击量", trigger: "blur" }],
        iosInstallCount: [
          { required: true, message: "请输入ios安装量", trigger: "blur" }
        ],
        androidInstallCount: [
          { required: true, message: "请输入安卓安装量", trigger: "blur" }
        ],
        registerCount: [
          { required: true, message: "请输入注册量", trigger: "blur" }
        ],
        inputCount: [
          { required: true, message: "请输入进件量", trigger: "blur" }
        ]
      },
      titleName:'',
      FromPath: "admin-extension",
      form: {
          name: "",
        pv: "",
        uv: "",
        iosInstallCount: "",
        androidInstallCount: "",
        registerCount: "",
        inputCount: ""
      },
      form_edit: {
        name: "",
        pv: "",
        uv: "",
        iosInstallCount: "",
        androidInstallCount: "",
        registerCount: "",
        inputCount: ""
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
        { name: "删除", type: "danger" }
      ]
    };
  },
  mounted() {
    console.log(this.extensionData, "extensionData");
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
    // 新增
    AddTap() {
      this.dialogTableVisible = true;
      this.titleName = "新增推广管理";
    },
    // 编辑
    EditAway(data) {
      this.dialogTableVisible = true;
      this.titleName = "编辑推广管理";
      this.form_edit = JSON.parse(JSON.stringify(data));
    },
    handleClose() {},
    cancle() {
      for (let key in this.form_edit){
          this.form_edit[key]=''
      }
      this.dialogTableVisible = false;
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 这个是新增
          if (this.titleName == "新增推广管理") {
            UrlLabelAdd({ content: this.form_edit.content }).then(res => {
              this.dialogTableVisible = false;
              this.$refs.table.getList();
            });
          } else {
            // 这个是编辑
            UrlChannelEdit(this.form_edit).then(res => {
              this.dialogTableVisible = false;
              this.$refs.table.getList();
            });
          }

          //
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ...mapActions(["changeextensionData"]),
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
    // 删除
    DeleteAway(data) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.extensionData.splice(data.PKID, 1);
          this.changeextensionData(this.extensionData);
          setTimeout(() => {
            this.$refs.table.getList();
          }, 1000);
          done();
        })
        .catch(_ => {});
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
.hreLinkClass:hover {
  color: green;
}
.AddClass {
  display: flex;
  justify-content: flex-end;
}
</style>
