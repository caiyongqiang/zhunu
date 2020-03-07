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
      loading:loading
    }
  },
  methods: {
    search(){
        console.log("搜索接口",this.form)
      },
      clearForm(){
         console.log("重置",this.form)
          for (let key in this.form) {
            this.form[key] = '';
        }
      },
  },
  created () {
    // this.procBus();
  }
};
