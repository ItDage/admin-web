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
              <el-menu-item index="0000">首页</el-menu-item>
              <el-menu-item index="1000">公告</el-menu-item>
              <el-menu-item index="1001">新闻</el-menu-item>
              <el-menu-item index="1002">法律法规</el-menu-item>
              <el-menu-item index="1003">其他</el-menu-item>
              <el-menu-item index="6">关于我们</el-menu-item>
              <el-menu-item index="7">联系我们</el-menu-item>
              <el-menu-item index="8">登录</el-menu-item>
            </el-menu>
          </el-header>
          <el-main>
            <el-row>
              <el-col :span="15">
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item :key="item" v-for="item in 4">
                    <h3>{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="8">
                <el-card class="box-card" shadow="always">
                  <div class="clearfix" slot="header">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                  </div>
                  <div :key="o" class="text item" v-for="o in 4">
                    {{'列表内容 ' + o }}
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
                          <el-tag size="small" type="success">{{ o.typeName }}</el-tag>
                        </el-col>
                        <el-col :span="10">
                          <a href="#">{{ o.title }}</a>
                        </el-col>
                      </el-row>
                      <el-row v-html="o.subContent"></el-row>
                    </div>
                </el-card>
                </div>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="8">
                <el-card class="box-card" shadow="always">
                  <div class="clearfix" slot="header">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                  </div>
                  <div :key="o" class="text item" v-for="o in 4">
                    <el-row><el-col :span="24">{{ o }}</el-col></el-row>
                  </div>
                </el-card>
              </el-col>
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
      activeIndex2: '1',
      currentPage: 1,
      pageSize: 5,
      type: '00000',
      data: []
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background-color:#F0F0F0')
  },
  created () {
    this.loadArticleList()
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push({name: 'list', params: { key: key }})
    },
    test2 () {
      alert(111)
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
          console.log(JSON.stringify(this.data))
          this.total = response.data.total
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
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
