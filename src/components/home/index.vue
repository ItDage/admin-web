<template>
  <div>
    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <el-container>
        <el-col :span="24">
          <el-header>
            <el-menu
              :default-active="activeIndex2"
              @select="handleSelect"
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-demo"
              mode="horizontal"
              text-color="#fff">
              <el-menu-item index="1-0">首页</el-menu-item>
              <el-menu-item index="1000">公告</el-menu-item>
              <el-menu-item index="1001">新闻</el-menu-item>
              <el-menu-item index="1002">法律法规</el-menu-item>
              <el-menu-item index="1003">其他</el-menu-item>
              <el-menu-item index="1004">下载专区</el-menu-item>
              <el-menu-item index="6">关于我们</el-menu-item>
              <el-menu-item index="7">联系我们</el-menu-item>
              <el-menu-item index="8" v-if="this.$store.state.user.token === '' || this.$store.state.user.token === null">{{this.$store.state.user.token}}登录</el-menu-item>
              <el-submenu index="9" v-if="this.$store.state.user.token != '' && this.$store.state.user.token != null">
                <template slot="title"><!--<a href="javascript:;"><img :src="image" class="layui-nav-img" /></a>-->我的工作台</template>
                <el-menu-item index="2-1">个人信息</el-menu-item>
                <el-menu-item index="2-2">修改密码</el-menu-item>
                <el-menu-item index="9999">退出</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-header>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
      </el-container>
    </el-row>
    <!--首页-->
    <Home v-if="home"></Home>
    <!--文章列表页-->
    <ArticleList v-if="!home" :type="type"></ArticleList>

    <login v-if="dialogFormVisible" ref="login" :visible.sync="dialogFormVisible" :title.sync="title" @closeMain="parentFn"></login>
    <UserInfo v-if="dialogUserInfoVisible" ref="UserInfo" :visible.sync = "dialogUserInfoVisible"></UserInfo>
  </div>
</template>

<script>
import {getArticle} from '@/api/article'
import Footer from '@/components/footer'
import login from '@/components/login/index'
import Home from '@/components/index'
import ArticleList from '@/components/articleList/index'
import UserInfo from '@/components/user/index'

export default {
  components: { Footer, login, Home, ArticleList, UserInfo },
  data () {
    return {
      test: 'test',
      activeIndex2: '1-0',
      currentPage: 1,
      pageSize: 5,
      type: '00000',
      data: [],
      home: true,
      dialogFormVisible: false,
      dialogUserInfoVisible: false,
      title: '登录',
      image: this.$store.state.user.avatar
    }
  },
  computed: {
    // activeIndex2 () {
    //   return this.$route.path.replace('/','')
    // }
  },
  created () {
    this.loadArticleList()
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1-0') {
        this.home = true
      } else if (key === '8') {
        // 登录
        this.dialogFormVisible = true
      } else if (key === '9999') {
        // 退出
        this.$store.dispatch('LogOut').then(() => {})
      } else if (key === '2-1') {
        this.dialogFormVisible = false
        this.dialogUserInfoVisible = true
      } else {
        this.type = key
        this.home = false
      }
    },
    test2 () {
      this.data.dialogFormVisible = true
      alert(this.data.dialogFormVisible)
    },
    loadArticleList () {
      const param = {
        'currentPage': this.currentPage,
        'pageSize': this.pageSize,
        'type': this.type
      }
      getArticle(param).then(response => {
        if (response.data.code === 200) {
          this.data = response.data.tableData
          // this.total = response.data.total
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    parentFn () {
      // this.$router.push({path:"/", query:{'time': new Date()}})
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
