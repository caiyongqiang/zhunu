/**
 * 代码混入，页面上面如果写了一样的，会取用页面的，所有需要覆写，页面直接定义一样的就可以
 */
import eventBus from './eventBus';
import { Loading } from 'element-ui'
var  loading = {close() {return }}
console.log(loading.close())
export default {
  data () {
    return {
      loading:loading,
      dataList:[]
    };
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
  handleClose() {},
  cancle() {
    for (let key in this.form_edit){
        this.form_edit[key]=''
    }
    this.dialogTableVisible = false;
  },
  
  },
  created () {
    // this.procBus();
  }
};
