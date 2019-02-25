<template>
  <div>
    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="18">
        <el-container>
          <Header></Header>
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
                    <span>公告</span>
                    <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
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
                          <span v-if="o.type == 1000">
                            <el-tag size="small">{{ o.typeName }}</el-tag>
                          </span>
                          <span v-if="o.type == 1001">
                            <el-tag size="small" type="success">{{ o.typeName }}</el-tag>
                          </span>
                          <span v-if="o.type == 1002">
                            <el-tag size="small" type="info">{{ o.typeName }}</el-tag>
                          </span>
                          <span v-if="o.type == 1003">
                            <el-tag size="small" type="warning">{{ o.typeName }}</el-tag>
                          </span>
                        </el-col>
                        <el-col :span="10">
                          <router-link target="_blank" :to="{path: '/info', query:{id: o.id}}">{{ o.title }}</router-link>
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
                    <span>最新动态</span>
                    <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                  </div>
                  <div :key="o" class="text item" v-for="o in 4">
                    <el-row><el-col :span="24">{{ o }}</el-col></el-row>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
          <el-footer>
            <Footer ref="Footer" />
          </el-footer>
        </el-container>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
    </el-row>

    <login v-if="dialogFormVisible" ref="login" :visible.sync="dialogFormVisible" :title.sync="title" @closeMain="parentFn"></login>
  </div>
</template>

<script>
import {getArticle} from '@/api/article'
import Footer from '@/components/footer'
import Header from '@/components/header'
import login from '@/components/login/index'
export default {
  components: { Footer, login, Header },
  data () {
    return {
      test: 'test',
      activeIndex2: '1',
      currentPage: 1,
      pageSize: 5,
      type: '00000',
      data: [],
      dialogFormVisible: false,
      title: '登录',
      image: this.$store.state.user.avatar
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
      if (key === '0000') {
        this.$router.push({name: 'index'})
      } else if (key === '8') {
        this.dialogFormVisible = true
        // window.location.href = 'http://localhost:9527/#/'
        // return false
      } else {
        this.$router.push({name: 'list', params: { key: key }})
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
          this.total = response.data.total
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
