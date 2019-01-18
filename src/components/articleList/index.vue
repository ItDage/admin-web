<template>
  <div>
    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="18">
        <el-container>
          <el-header>
            <el-menu
              :default-active="activeIndex2"
              @select="handleSelect"
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-demo"
              mode="horizontal"
              text-color="#fff">
              <el-menu-item index="1">首页</el-menu-item>
              <el-menu-item index="gonggao">公告</el-menu-item>
              <el-menu-item index="3">新闻</el-menu-item>
              <el-menu-item index="4">法律法规</el-menu-item>
              <el-menu-item index="5">其他</el-menu-item>
              <el-menu-item index="6">关于我们</el-menu-item>
              <el-menu-item index="7">联系我们</el-menu-item>
              <el-menu-item index="8">登录</el-menu-item>
            </el-menu>
          </el-header>
          <el-main>
            <el-row>
              <el-col :span="17">&nbsp;</el-col>
              <el-col :span="7">搜索</el-col>
            </el-row>
            <el-row>
              <ul>
                  <a href="#">
                    <li v-for="o in 20" style="text-align: left; margin-top: 10px">
                      <el-row>
                        <el-col :span="15">{{'title ' + o }}</el-col>
                        <el-col :span="9">{{new Date()}}</el-col>
                      </el-row>
                    </li>
                  </a>
              </ul>
            </el-row>
          </el-main>
          <el-footer>
            footer
          </el-footer>
        </el-container>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
import {getArticle} from '@/api/article'

export default {
  data () {
    return {
      test: 'test',
      activeIndex2: '1'
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background-color:#F0F0F0')
  },
  created () {
    getArticle().then(response => {
      if (response.data.code === 200) {
        this.test = JSON.stringify(response.data)
      } else {
        this.$message.error(response.data.message)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  mounted () {
    alert(this.$route.params.key)
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push({name: 'index'})
      } else {
        alert(key)
      }
    },
    test2 () {
      alert(111)
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
