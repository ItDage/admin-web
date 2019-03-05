<template>
  <div>
    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="18">
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="17">&nbsp;</el-col>
              <el-col :span="7">
                <div style="margin-top: 15px;">
                  <el-input placeholder="请输入内容" v-model="title" clearable class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                  </el-input>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <span v-if="type != '1004'">
                <div v-for="(article, index) in data" :key="article" class="text item">
                <el-card class="box-card3" shadow="hover">
                  <el-row>
                  <el-col :span="15">
                  <router-link target="_blank" :to="{path: '/info', query:{id: article.id}}">{{index + 1}} 、 {{ article.title }}</router-link>
                  </el-col>
                  <el-col :span="9" style="text-align: right">{{ article.publishDate }}</el-col>
                  </el-row>
                </el-card>
                </div>
              </span>
              <span v-if="type === '1004'">
                <div v-for="(file, index) in data" :key="file.id" class="text item">
                <el-card class="box-card3" shadow="hover">
                 <el-row>
                  <el-col :span="15">
                  <a href="javascript:void(0);" @click="download2(file.id)">{{index + 1}} : {{ file.name }}</a>
                  </el-col>
                  <el-col :span="9">{{ file.uploadDate }}</el-col>
                  </el-row>
                </el-card>
                </div>
              </span>
            </el-row>
            <el-row>
              <el-col style="text-align: right">
                <el-pagination
                @current-change="handleCurrentChange"
                background
                layout="total, prev, pager, next"
                :page-size="pageSize"
                :total="total">
              </el-pagination>
              </el-col>
            </el-row>
          </el-main>
          <el-footer>
            <Footer ref="Footer"> </Footer>
          </el-footer>
        </el-container>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
import {getArticle, getFile, download} from '@/api/article'
import Footer from '@/components/footer'

export default {
  props: {
    type: {
      type: String,
      request: true,
      default: '0'
    }
  },
  components: { Footer },
  data () {
    return {
      test: 'test',
      activeIndex2: '1',
      currentPage: 1,
      pageSize: 20,
      data: [],
      total: 0,
      title: null
    }
  },
  beforeCreate () {
    // document.querySelector('body').setAttribute('style', 'background-color:#F0F0F0;')
  },
  created () {
    if (this.type === '1004') {
      this.loadFileList()
    } else {
      this.loadArticleList()
    }
  },
  watch: {
    type: function (newVal ,oldVal) {
      this.type = newVal
      if (this.type === '1004') {
        this.loadFileList()
      } else {
        this.loadArticleList()
      }
    }
  },
  mounted () {
  },
  methods: {
    info () {
      this.$router.push({name: 'info'})
    },
    loadArticleList () {
      const param = {
        'currentPage': this.currentPage,
        'pageSize': this.pageSize,
        'type': this.type,
        'title': this.title
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
    loadFileList () {
      const param = {
        'currentPage': this.currentPage,
        'pageSize': this.pageSize,
        'name': this.title
      }
      getFile(param).then(response => {
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
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.type === '1004') {
        this.loadFileList()
      } else {
        this.loadArticleList()
      }
    },
    search () {
      if (this.type === '1004') {
        this.loadFileList()
      } else {
        this.loadArticleList()
      }
    },
    download2 (id) {
      const param = {
        'id': id
      }
      download(JSON.stringify(param)).then(response => {
        if (response.data.code === 200) {
          window.open(response.data.data)
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
  a:hover{
    color: red;
    text-decoration: underline;
  }
  a {
    text-decoration: none;
  }

  /*ul li{*/
    /*list-style:disc inside;*/
  /*}*/

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
  .box-card3 {
    height: 40px;
  }

</style>
