<template>
  <div class="all">
    <div>视频管理</div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="mobile"
          label="用户手机号"
          align='center'
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="name"
          label="视频描述"
          align='center'
          min-width="150px">
        </el-table-column>
        <el-table-column
          prop="sex"
          align='center'
          min-width="400px"
          label="视频">
          <template slot-scope="scope">
            <div @click="playVideo(scope.row.video, scope.row.name)">
              <video width="300px" object-fit='contain' :src="scope.row.video"></video>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          align='center'
          label="操作"
          min-width="150px">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">删除</el-button>
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    <!-- <div class="video-mask">
      <div class="video-content">
        <div></div>
        <video src=""></video>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getProductList } from '@/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      tableData: [{
          date: '2019-03-23',
          name: '王小虎',
          mobile: '13660000000',
          address: '广东-广州',
          user: '13000000009',
          sex: '男',
          video: 'https://vdept.bdstatic.com/33333534434851637837727376746368/5278336d716b6b71/6b34da218bfb75135381ec24fe5e9f4a552c7e4dd6690cc030c42ac225ef0924285fc1b99033fd181d9d3cb3a3879b15.mp4?auth_key=1581516022-0-0-b084093c73b45c4d27124f465b2d8916'
        }, {
          date: '2019-03-23',
          name: '王小虎',
          mobile: '13660000000',
          address: '广东-广州',
          user: '13000000009',
          sex: '男',
          video: 'https://vdept.bdstatic.com/33333534434851637837727376746368/5278336d716b6b71/6b34da218bfb75135381ec24fe5e9f4a552c7e4dd6690cc030c42ac225ef0924285fc1b99033fd181d9d3cb3a3879b15.mp4?auth_key=1581516022-0-0-b084093c73b45c4d27124f465b2d8916'
        },{
          date: '2019-03-23',
          name: '王小虎',
          mobile: '13660000000',
          address: '广东-广州',
          user: '13000000009',
          sex: '男',
          video: 'https://vdept.bdstatic.com/33333534434851637837727376746368/5278336d716b6b71/6b34da218bfb75135381ec24fe5e9f4a552c7e4dd6690cc030c42ac225ef0924285fc1b99033fd181d9d3cb3a3879b15.mp4?auth_key=1581516022-0-0-b084093c73b45c4d27124f465b2d8916'
        },{
          date: '2019-03-23',
          name: '王小虎',
          mobile: '13660000000',
          address: '广东-广州',
          user: '13000000009',
          sex: '男',
          video: 'https://vdept.bdstatic.com/33333534434851637837727376746368/5278336d716b6b71/6b34da218bfb75135381ec24fe5e9f4a552c7e4dd6690cc030c42ac225ef0924285fc1b99033fd181d9d3cb3a3879b15.mp4?auth_key=1581516022-0-0-b084093c73b45c4d27124f465b2d8916'
        }]
    }
  },
  mounted() {
    // getProductList({}).then(res => {
    //   console.log(res, 'getBannerList')
    // })
  },
  methods: {
    playVideo (url, name) {
      this.$alert(`
      <video width='350px' id='videoId' controls="controls" object-fit='contain' src=${url}></video>
      `,
       name, {
          dangerouslyUseHTMLString: true,
          center: true
        }).then(res => {
          var video = document.getElementById('videoId');
          video.src = '';
        }).catch(err => {
          var video = document.getElementById('videoId');
          video.src = '';
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.all{
  padding-top: 1rem;
}
.table{
  max-width: 100rem;
  margin-top: 2rem;
}
.pagination{
  text-align: center;
  margin-top: 1rem;
  padding-bottom: 3rem
}
</style>
