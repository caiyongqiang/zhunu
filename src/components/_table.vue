<template>
  <div class="table" >
    <el-table v-loading="loading"  :data="dataList"  ref="multipleTable" :header-cell-style="{background:'#F3F5F9'}"  
    style="width: 100%"
     height="350"
    stripe
    border
    :span-method="objectSpanMethod" 
      @header-click="renderHeader">
      <!-- 配置是否多选 -->
      <!-- <el-table-column v-if="isShowCheck" type="selection" width="80" > </el-table-column> -->
      <!-- 数据列 -->
      <template v-for='(item,index) in columns' v-if='!item.hidden'>
        <!-- :width="item.width ||'auto'" -->
        <template v-if="item.title=='推广链接'">
           <slot name="btnList_link"></slot>
        </template>
        <template v-if="item.title!='推广链接'">
           <el-table-column :key='index' :prop="item.field|formatTrim" :label="item.title" :align='item.align||"center"' :sortable="item.sortable" :formatter="item.formatter" min-width="120px" >
        </el-table-column>
        </template>
      </template>
      <slot name="PullblackList"></slot>
      <slot name="TagsList"></slot>
      <slot name="btnList"></slot>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination v-if="isShowPageing" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageing.offset" :page-sizes="[1,5, 10, 20, 30,50,100]" :page-size="pageing.limit" layout="total, sizes, prev, pager, next, jumper" :total="pageing.total">
    </el-pagination>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import eventBus from "@/utils/eventBus";
import { UrlUser,UrlLabel,UrltextStock,UrlChannel } from "@/api";
export default {
     props: {
    // 数据列
    columns: {
      type: Array,
      default: function () {
        return [];
      }
    },
    // 查询表单
    form: {
      type: Object,
      default: function () {
        return {};
      }
    },
    // 对接接口的时候要删掉
    FromPath:{
       type: String,
    },
    // 是否显示分页
    isShowPageing: {
      type: Boolean,
      default: true
    },
    // 分页控制器
    pageing: {
      type: Object,
      default: {}
    },
    // 是否显示多选
    isShowCheck: {
      type: Boolean,
      default: false
    },
    objectSpanMethod: {
      type: Function,
      default: function () {
      }
    },
    renderHeader: {
      type: Function,
      default: function () {

      }
    }
  },
    computed: {
    ...mapState({
      userData: state => state.store.userData,  //用户信息数据
      extensionData: state => state.store.extensionData,  //数据
      labelData: state => state.store.labelData,  //标签数据
      materialData: state => state.store.materialData // 素材管理
    })
  },
  data () {
    return {
      // 数据内容，页面初始化完成自动加载
      dataList: [],
      loading:true,
      tagsList:[],
      passForm:{},
    };
  },
  methods: {
    // 处理页面间消息传输
    procBus() {
      // 从弹出新增/编辑框传出的 更新列表事件    从列表页面传过来的搜索事件
      eventBus.$on("updateList",()=>{ this.getList()});
    },
    getPassform(){
        var pageing={limit:this.pageing.limit,offset:this.pageing.offset}
        var json={}
       for (let key in this.form){
          if(this.form[key]!='') {
                json[key]=this.form[key]
          }
      }
      if(JSON.stringify(json)==="{}"){
        var form= pageing
      }else{
      var form= JSON.parse((JSON.stringify(pageing) + JSON.stringify(json)).replace(/}{/, ','));
      }
      return form
    },
    getList() {
     var form=this.getPassform()
      // 下面是几个页面的判读；
      if(this.FromPath=="admin_user"){  //用户表的页面
             UrlUser(form).then(res => {
              this.pageing.total = res.count
                 this.dataList=res.rows
             })
              console.log("获取",this.dataList)
      }
      else if(this.FromPath=="admin-extension"){  //推广的页面
          UrlChannel(form).then(res => {
              this.pageing.total = res.count
                 this.dataList=res.rows
             })
         
      }
      else if (this.FromPath == 'admin_material') {  //素材管理的页面
        this.getlabeldata()
      } 
      else{  //素材管理的页面
        var json={}
        this.form.content?(json={limit:this.pageing.limit,offset:this.pageing.offset,content:this.form.content}):(json={limit:this.pageing.limit,offset:this.pageing.offset})
          UrlLabel(json).then(res => {
              this.pageing.total = res.count
                 this.dataList=res.rows
             })
      }
        this.loading=false
    },
        getlabeldata(data_arr) {
          var form=this.getPassform()
           UrlLabel({ limit: 20, offset: 1 }).then(res => {
            this.tagsList = res.rows;
             UrltextStock(form).then(res => {
              this.pageing.total = res.count
            for(var i=0;i<res.rows.length;i++){
                res.rows[i].repalceArr=[];
                res.rows[i].repalceArr=res.rows[i].tagIds.split(',')
                for(var k=0;k<res.rows[i].repalceArr.length;k++){
                  for(var j=0;j<this.tagsList.length;j++){
                   if(parseInt(this.tagsList[j].id)==parseInt(res.rows[i].repalceArr[k])){
                           res.rows[i].repalceArr[k]=this.tagsList[j].content
                  }
                  }
                }
            }
                this.dataList=res.rows
             })
            });
    },
    // 以多少页分页
    handleSizeChange (val) {
      this.pageing.limit = val;
      this.getList();
    },
    // 分页
    handleCurrentChange (val) {
      this.pageing.offset = val;
      this.getList();
    },
  },

  created() {
    this.getList();
    this.procBus();
  },
  filters: {
    formatTrim(val) {
      return val.trim();
    }
  }
};
</script>
<style scoped>
.pagination {
  text-align: center;
  margin-top: 1rem;
}
</style>