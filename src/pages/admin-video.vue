<template>
  <div class="all">
    <div  class="headerClass">视频管理</div>
      <div class="handle-box">
      <el-form ref="form" :model="form" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="昵称：" class="Form-lable">
              <el-input v-model="form.userName" placeholder="请输入用户昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" class="Form-lable">
              <el-input v-model="form.mobilePhone" placeholder="请输入用户电话"></el-input>
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
    <div class="table">
      <el-table
        :data="tableData"
        border
        height="70vh"
        stripe
        :header-cell-style="{background:'#F3F5F9'}"
        style="width: 100%">
        <el-table-column
          prop=""
          label="序号"
          align='center'
          min-width="120px">
          <template slot-scope="scope">
              {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="mobilePhone"
          label="用户手机号"
          align='center'
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="昵称"
          align='center'
          min-width="150px">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="视频描述"
          align='center'
          min-width="150px">
            <template slot-scope="scope">
              <div>
                <div v-for="item in scope.row.videos" :key="item.id" class="videoContent">
                  <div>{{item.content}}</div>
                </div>
              </div>
            </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          align='center'
          min-width="400px"
          label="视频">
          <template slot-scope="scope">
            <div>
              <div v-for="item in scope.row.videos" :key="item.id" class="videoList">
                <video
                  width="100%"
                  height="200"
                  object-fit='contain'
                  :src="videoUrl + item.filename"
                  @click="playVideo(videoUrl + item.filename, '')"></video>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          align='center'
          label="操作"
          min-width="150px">
          <template slot-scope="scope">
            <div v-for="item in scope.row.videos" :key="item.id" class="videobut">
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
              <el-button
                size="mini"
                type="primary"
                @click="handleDownload(scope.$index, videoUrl + item.filename)">下载</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="currentChange"
        @next-click='currentChange'
        :page-size='10'
        :total="total">
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
import { videoList, configQuery, UrltextStock } from '@/api'
import listMixins from '@/utils/listMixins.js'
export default {
  name: 'HelloWorld',
    mixins: [listMixins],
  data () {
    return {
      tableData: [{
          id: 1,
          date: '2019-03-23',
          name: '王小虎',
          mobile: '13660000000',
          address: '广东-广州',
          user: '13000000009',
          sex: '男',
          video: 'https://api.i-top.cn/files/file/20191127/201911271645156344.mp4'
        }],
      form: {
        userName: "",
        mobilePhone: "",
      },
      videoUrl: '',
      total: 0
    }
  },
  mounted() {
    this.getconfigQuery()
    this.getList()
  },
  methods: {
    // 视频描述
    async getUrltextStock (tableData) {
      // let tableData = this.tableData
      for (let i = 0; i < tableData.length; i++) {
        let videos = tableData[i].videos
        if (videos.length && videos.length > 0) {
          for(let a = 0; a < videos.length; a++) {
            let data = await UrltextStock({id: videos[a].id})
            tableData[i].videos[a]['content'] = (data.rows&&data.rows[0]) ? data.rows[0].content : ''
          }
        }
      }
      this.tableData = tableData
    },
    // 视频列表
    getList (index) {
      let params = {limit: 10, offset: index||1}
      if (index) {
        if (this.form.mobilePhone) params.mobilePhone = this.form.mobilePhone
        if (this.form.userName) params.userName = this.form.userName
      }
      videoList(params).then(res => {
        // this.tableData = res.rows
        if (!res.rows) return this.$message.error('请求失败');
        this.total = res.count
        this.getUrltextStock(res.rows)
      })
    },
    // 视频地址拼接
    getconfigQuery () {
      configQuery({}).then(res => {
        if (res) {
          this.videoUrl = 'https://api.chinamall66.com' + res.videoUrl
        }
      })
    },
    // 查询
    search () {
      this.getList(1)
    },
    // 重置
    clearForm () {
      this.form = {
        userName: "",
        mobilePhone: "",
      }
      this.getList()
    },
    // 页数改变
    currentChange (e) {
      this.getList(e)
    },
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
    },
    handleDelete (index, item) {
      this.$confirm('你确定要删除？')
          .then(_ => {
           this.tableData.splice(index, 1)
          })
      .catch(_ => {});
    },
    handleDownload (index, url) {
      console.log(url, 'url')
      // window.location.href = url
      window.open(url)

    }
  }
}
</script>

<style lang="scss" scoped>
.all{
  padding-top: 1rem;
}
.table{
  max-width: 105rem;
  // min-width: 50rem;
  margin-top: 2rem;
}
.pagination{
  text-align: center;
  margin-top: 1rem;
  padding-bottom: 3rem
}
.table{
  max-height: 78vh;
  overflow: auto;
}
.videoContent{
  height: 200px;
  line-height: 200px;
  background: #f4f4f4;
  margin-bottom: 10px;
}
.videoList{
  width: 100%;
  height: 200px;
  background: #ccc;
  margin-bottom: 10px;
}
.videobut{
  height: 200px;
  line-height: 200px;
}
</style>
