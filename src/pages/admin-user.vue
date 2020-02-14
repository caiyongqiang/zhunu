<template>
  <div class="all">
    <div>管理用户信息</div>
    <!-- <div class="table">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="name" label="昵称" align="center" min-width="120px"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" align="center" min-width="150px"></el-table-column>
        <el-table-column prop="sex" align="center" label="性别"></el-table-column>
        <el-table-column prop="date" align="center" label="出生年月日" min-width="150px"></el-table-column>
        <el-table-column prop="address" label="所在城市" align="center" min-width="100px"></el-table-column>
        <el-table-column prop="user" align="center" label="拉黑用户" min-width="200px"></el-table-column>
        <el-table-column prop align="center" label="操作" min-width="200px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelet(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <!--  <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>-->
    <data-table :columns="columns" :form="form" :pageing="pageing"  :FromPath="FromPath" ref="table" >
      <template slot="btnList">
        <el-table-column label="操作" align="center" min-width="200px">
          <template slot-scope="scope">
            <template v-for="(item,index) in handleArr">
              <el-button :type="item.type" @click="handleCommand(item.name,scope.row)">{{item.name}}</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </data-table>
     <el-dialog title="编辑用户信息" :visible.sync="dialogTableVisible" width="450px" center :before-close="handleClose" :show-close="false">
       <el-form ref="form_edit" :rules="rules" :model="form_edit" :inline="true" label-position="right" class="demo-ruleForm">
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
import dataTable from "@/components/_table.vue";
import { getProductList } from "@/api";
export default {
  components: {
    dataTable
  },
  name: "HelloWorld",
  computed: {
    ...mapState({
      userInfo: state => state.store.userInfo
    })
  },
  data() {
    return {
      dialogTableVisible:false,
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
      FromPath:'admin_user',
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
      handleArr: [
        { name: "编辑", type: "primary" },
        { name: "删除", type: "danger" },
      ],
      form_edit:{}, 
     rules: {
        name: [
          { required: true, message: '请输入代理商名称', trigger: 'blur' },
        ],
        Phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
        ],
        sex: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        city: [
          {  required: true, message: '请选择所在地区', trigger: 'blur' }
        ],
        baduser: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        birth: [
          {  required: true, message: '请选择所在地区', trigger: 'blur' }
        ]
      },
    };
  },
  mounted() {
    console.log(this.userInfo, "userInfo");
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
      this.dialogTableVisible=true
     this.form_edit=JSON.parse(JSON.stringify(data))
      this.$refs.table.getList();
    },
    // 删除
    DeleteAway() {
      console.log("删除");
  //  this.tableData.splice(index, 1);
     this.changeUserInfo({name: 'changeUserInfo'})
      this.$confirm('确认关闭？')
          .then(_ => {
           this.changeUserData([{ "PKID":'0',"name":"王阿丽","Phone":"13697418595","sex":"女","birth":'1990-12-12',"city":'广东省广州市',"baduser":"小刘：120000"}])
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
// .el-form-item{
//   display: flex;
//   // justify-content: center
// }
</style>
