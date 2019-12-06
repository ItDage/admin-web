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
              <el-menu-item><img src="../../../static/images/logo.png" width="80" height="40"></el-menu-item>
              <el-menu-item index="0000">首页</el-menu-item>
              <!--超管公告-->
              <el-menu-item index="1000" v-if="currentRole('admin')">公告</el-menu-item>
              <!--社管公告-->
              <el-menu-item index="1100" v-if="currentRole('corporation_admin,corporation_common')">公告</el-menu-item>
              <!--超管新闻 -->
              <el-menu-item index="1001" v-if="currentRole('admin')">新闻</el-menu-item>
              <!--社管新闻-->
              <el-menu-item index="1101" v-if="currentRole('corporation_admin,corporation_common')">新闻</el-menu-item>
              <!--社管活动-->
              <el-menu-item index="1102" v-if="currentRole('corporation_admin,corporation_common')">活动</el-menu-item>
              <!--社管新闻-->
              <el-menu-item index="1103" v-if="currentRole('corporation_admin,corporation_common')">章程</el-menu-item>
              <!--超管法律法规-->
              <el-menu-item index="1002" v-if="currentRole('admin')">法律法规</el-menu-item>
              <!--超管其他-->
              <!--<el-menu-item index="1003" v-if="currentRole('admin')">其他</el-menu-item>-->
              <!--下载专区-->
              <el-menu-item index="1004">下载专区</el-menu-item>
              <!--<el-menu-item index="6">关于我们</el-menu-item>-->
              <!--<el-menu-item index="7" v-if="currentRole('admin')">联系我们</el-menu-item>-->
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
      <el-main>
        <!--首页-->
        <Home v-if="home"></Home>
        <!--文章列表页-->
        <ArticleList v-if="!home" :type="type"></ArticleList>
        <el-row>
          <el-col :span="3">&nbsp;</el-col>
            <Footer ref="Footer"> </Footer>
          <el-col :span="3">&nbsp;</el-col>
        </el-row>
      </el-main>
    </el-row>

    <login v-if="dialogFormVisible" ref="login" :visible.sync="dialogFormVisible" :title.sync="title" @closeMain="closeMain"></login>
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
      activeIndex2: '0000',
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
  inject: ['reload'],
  computed: {
  },
  created () {
    this.loadArticleList()
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '0000') {
        this.home = true
      } else if (key === '8') {
        // 登录
        this.dialogFormVisible = true
      } else if (key === '9999') {
        // 退出
        this.$store.dispatch('LogOut').then(() => {
          this.reload()
        })
      } else if (key === '2-1') {
        // 个人信息
        this.dialogFormVisible = false
        this.dialogUserInfoVisible = true
      } else {
        this.type = key
        this.home = false
      }
    },
    test2 () {
      this.data.dialogFormVisible = true
    },
    loadArticleList () {
      const param = {
        'currentPage': this.currentPage,
        'pageSize': this.pageSize,
        'type': this.type
      }
      getArticle(param).then(response => {
        if (response.data.code === 200) {
          // this.$data.data = response.data.tableData
          this.data.splice(0)
          this.data.push(response.data.tableData)
          console.log('内部数据' + JSON.stringify(this.data))
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    closeMain () {
      console.log('关闭登录框的调用sssss')
      // 社管首页
      this.reload()
    },
    currentRole (role) {
      var roles = window.sessionStorage.getItem('roles')
      if (roles == null || roles === '') {
        roles = ['admin']
        window.sessionStorage.setItem('roles', 'admin')
      } else {
        roles = window.sessionStorage.getItem('roles').split(',')
      }
      console.log(JSON.stringify(roles))
      var currentRole = role.trim().split(',')
      for (var i = 0; i < roles.length; i++) {
        for (var j = 0; j < currentRole.length; j++) {
          if (currentRole[j] === roles[i]) {
            return true
          }
        }
      }
      return false
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
