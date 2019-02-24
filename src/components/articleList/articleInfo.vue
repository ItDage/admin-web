<template>
  <div>
    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="18" style="background-color: white">
        <el-container>
          <el-header>
            <el-row>
              <span v-text="article.title" style="font-size: 18px; font-weight: bold;"></span>
            </el-row>
            <br>
            <el-row style="text-align: right">
              发表时间:{{article.publishDate}}
              <br>
            </el-row>
          </el-header>
          <el-main style="text-align: left">
            <span v-html="article.content"></span>
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
import { getArticleInfo } from '@/api/article'

export default {
  data () {
    return {
      article: {}
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background-color:#F0F0F0')
  },
  created () {
    this.loadArticleInfo()
  },
  mounted () {
    // alert(this.$route.query.id)
  },
  methods: {
    test2 () {
      alert(111)
    },
    loadArticleInfo () {
      const param = {
        'id': this.$route.query.id
      }
      getArticleInfo(JSON.stringify(param)).then(response => {
        if (response.data.code === 200) {
          this.article = response.data.data
          // alert(JSON.stringify(response.data))
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
