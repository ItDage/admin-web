<template>
  <div>
    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="18">
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="15">
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item v-for="item in imgList" :key="item.id">
                    <el-row>
                      <el-col :span="24"><img ref="imgHeight" height="100%" width="100%" :src="item.idView"/></el-col>
                    </el-row>
                  </el-carousel-item>
                </el-carousel>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="8">
                <el-card class="box-card" shadow="always">
                  <div class="clearfix" slot="header">
                    <span>最新公告</span>
                  </div>
                  <div class="text item" v-for="(article, index) in gonggao" :key="article.id">
                    <router-link target="_blank" :to="{path: '/info', query:{id: article.id}}">
                    <span v-if="index === 0"><span class="layui-badge">{{index + 1}}</span></span>
                    <span v-else-if="index === 1"> <span class="layui-badge layui-bg-green">{{index + 1}}</span></span>
                    <span v-else-if="index === 2"><span class="layui-badge layui-bg-blue">{{index + 1}}</span></span>
                    <span v-else><span class="layui-badge layui-bg-gray">{{index + 1}}</span></span>
                    {{ article.title }}</router-link>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>&nbsp;</el-row>
            <el-row>
              <el-col :span="15">
                <div :key="o.id" class="text item" v-for="o in data">
                <el-card class="box-card2" shadow="hover">
                    <div>
                      <el-row>
                        <el-col :span="3">
                          <span v-if="o.type == 1000 || o.type == 1100">
                            <el-tag size="small">{{ o.typeName }}</el-tag>
                          </span>
                          <span v-if="o.type == 1001 || o.type == 1101">
                            <el-tag size="small" type="success">{{ o.typeName }}</el-tag>
                          </span>
                          <span v-if="o.type == 1002 || o.type == 1102">
                            <el-tag size="small" type="info">{{ o.typeName }}</el-tag>
                          </span>
                          <span v-if="o.type == 1003 || o.type == 1103">
                            <el-tag size="small" type="warning">{{ o.typeName }}</el-tag>
                          </span>
                        </el-col>
                        <el-col :span="10">
                          <router-link target="_blank" :to="{path: '/info', query:{id: o.id}}">{{ o.title }}</router-link>
                        </el-col>
                      </el-row>
                      <el-row>&nbsp;</el-row>
                      <el-row v-html="o.subContent" style="margin-right: 20px;"></el-row>
                    </div>
                </el-card>
                </div>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="8">
                <el-card class="box-card" shadow="always">
                  <div class="clearfix" slot="header">
                    <span>新闻</span>
                    <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                  </div>
                  <div class="text item" v-for="(article, index) in news" :key="article.id">
                    <el-row>
                      <el-col :span="24">
                      <router-link target="_blank" :to="{path: '/info', query:{id: article.id}}">
                        <span v-if="index === 0"><span class="layui-badge">{{index + 1}}</span></span>
                        <span v-else-if="index === 1"> <span class="layui-badge layui-bg-green">{{index + 1}}</span></span>
                        <span v-else-if="index === 2"><span class="layui-badge layui-bg-blue">{{index + 1}}</span></span>
                        <span v-else><span class="layui-badge layui-bg-gray">{{index + 1}}</span></span>
                        {{ article.title }}
                      </router-link>
                    </el-col></el-row>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
import {getArticle, getRecentArticle} from '@/api/article'
import Footer from '@/components/footer'
import Login from '@/components/login/index'

export default {
  components: { Footer, Login },
  props: {
    test: {
      type: String,
      request: false
    }
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 5,
      type: '00000',
      data: [],
      gonggao: [],
      news: [],
      dialogFormVisible: false,
      title: '登录',
      image: this.$store.state.user.avatar,
      imgList: [
        {id: 1, idView: '../../../static/images/1.jpg'},
        {id: 2, idView: '../../../static/images/2.jpg'},
        {id: 3, idView: '../../../static/images/3.jpg'},
        {id: 4, idView: '../../../static/images/4.jpg'}
      ]
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background-color:#F0F0F0')
  },
  created () {
    // this.loadArticleList()
    // this.type = '1000'
    // this.loadArticleList()
  },
  mounted () {
    this.loadRecentArticleList()
    if (window.sessionStorage.getItem('roles') === 'admin') {
      this.loadArticleList('1000')
      this.loadNewsArticleList('1001')
    } else {
      this.loadArticleList('1100')
      this.loadNewsArticleList('1101')
    }
  },
  methods: {
    loadArticleList (type) {
      const param = {
        'currentPage': this.currentPage,
        'pageSize': this.pageSize,
        'type': type
      }
      getArticle(param).then(response => {
        if (response.data.code === 200) {
          if (type === '00000') {
            this.data = response.data.tableData
          } else if (type === '1000' || type === '1100') {
            this.gonggao = response.data.tableData
          }
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loadNewsArticleList (type) {
      const param = {
        'currentPage': this.currentPage,
        'pageSize': this.pageSize,
        'type': type
      }
      getArticle(param).then(response => {
        if (response.data.code === 200) {
          if (type === '00000') {
            this.data = response.data.tableData
          } else if (type === '1001' || type === '1101') {
            this.news = response.data.tableData
          }
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loadRecentArticleList () {
      const param = {
        'currentPage': this.currentPage,
        'pageSize': this.pageSize
      }
      getRecentArticle(param).then(response => {
        if (response.data.code === 200) {
          this.data = response.data.tableData
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    parentFn () {
      console.log('test')
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 5px;
    text-align: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .box-card {
    height: 300px;
  }

  .box-card2 {
    height: 100px;
  }

</style>
