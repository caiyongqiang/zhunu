<template>
  <div class="all">
    <div class="headerClass">管理用户信息</div>
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
            <el-button type="primary" icon="el-icon-search" @click="search" class="SeachClass">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="clearForm">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <data-table :columns="columns" :form="form" :pageing="pageing" :FromPath="FromPath" ref="table">
      <template slot="PullblackList">
        <el-table-column label="拉黑用户" align="center" min-width="200px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.startBol" active-text="是" inactive-text="否">></el-switch>
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
      title="编辑用户信息"
      :visible.sync="dialogTableVisible"
      width="500px"
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
        <el-form-item label="昵称：" prop="name">
          <el-input v-model="form_edit.name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="Phone" maxlength="11">
          <el-input v-model.number="form_edit.Phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-input v-model="form_edit.sex" placeholder="请输入性别"></el-input>
        </el-form-item>
        <el-form-item label="出生日期：" prop="birth" maxlength="11">
          <el-input v-model="form_edit.birth" placeholder="请选择出生日期"></el-input>
        </el-form-item>
        <el-form-item label="所在城市：" prop="city">
          <el-input v-model="form_edit.city" placeholder="请选择输入城市"></el-input>
        </el-form-item>
        <el-form-item label="拉黑用户：" prop="baduser" maxlength="11">
          <el-input v-model="form_edit.baduser" placeholder="请输入拉黑用户手机号码"></el-input>
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
import listMixins from '@/utils/listMixins.js';
import dataTable from "@/components/_table.vue";
import { getProductList } from "@/api";
export default {
  components: {
    dataTable
  },
  mixins: [listMixins],
  name: "HelloWorld",
  computed: {
    ...mapState({
      userData: state => state.store.userData
    }),
    changeUserData(){
      return JSON.stringify(this.userData)
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      tableData: [
        {
          date: "2019-03-23",
          name: "王小虎",
          mobile: "13660000000",
          address: "广东-广州",
          user: "13000000009、13593993939",
          sex: "男"
        },
        {
          date: "2019-03-23",
          name: "王小虎",
          mobile: "13660000000",
          address: "广东-广州",
          user: "13000000009",
          sex: "男"
        },
        {
          date: "2019-03-23",
          name: "王小虎",
          mobile: "13660000000",
          address: "广东-广州",
          user: "13000000009",
          sex: "男"
        },
        {
          date: "2019-03-23",
          name: "王小虎",
          mobile: "13660000000",
          address: "广东-广州",
          user: "13000000009",
          sex: "男"
        }
      ],
      FromPath: "admin_user",
      columns: [
        { field: "PKID", title: "隐藏主键", hidden: true },
        { field: "numb", title: "序号" },
        { field: "name", title: "昵称" },
        { field: "Phone", title: "联系电话" },
        { field: "sex", title: "性别" },
        { field: "birth", title: "出生日期" },
        { field: "city", title: "所在城市" }
        // { field: "baduser", title: "拉黑用户" }
      ],
      // 页面有筛选时用到 查询表单
      form: {
       numb: "",
        Phone: "",
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
      ],
      form_edit: {},
      rules: {
        name: [
          { required: true, message: "请输入代理商名称", trigger: "blur" }
        ],
        Phone: [{ required: true, message: "请输入手机号", trigger: "change" }],
        sex: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
        city: [{ required: true, message: "请选择所在地区", trigger: "blur" }],
        baduser: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        birth: [{ required: true, message: "请选择所在地区", trigger: "blur" }]
      }
    };
  },
 watch: {
 'changeUserData':{
      handler: function (value, oldValue) { 
            let obj = JSON.parse(value);
            let obj2 = JSON.parse(oldValue);
            console.log(obj, obj2)
            for(let i=0;i<obj.length;i++){
              if(obj2[i].startBol!=obj[i].startBol){
                    console.log(obj[i].PKID)
                    console.log("在此处请求接口")  
              }
            }
            },
      deep: true
    }
},
  mounted() {
    console.log(this.userData, "userData");
  },
  methods: {
    ...mapActions(["changeUserInfo"]),
    ...mapActions(["changeUserData"]),
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
      this.dialogTableVisible = true;
      this.form_edit = JSON.parse(JSON.stringify(data));
      this.$refs.table.getList();
    },
    // 删除
    DeleteAway(data) {
      console.log("删除");
      this.changeUserInfo({ name: "changeUserInfo" });
      this.$confirm("确认关闭？")
        .then(_ => {
          this.userData.splice(data.PKID, 1);
          this.changeUserData(this.userData);
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
    },
    confirm() {
      this.dialogTableVisible = false;
    },
  
  }
};
</script>

<style lang="scss" scoped>
.all {
  padding-top: 1rem;
}
.table {
  max-width: 105rem;
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

</style>
