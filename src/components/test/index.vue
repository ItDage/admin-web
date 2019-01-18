<template>
  <div>
    {{test}} sss
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
export default {
  data () {
    return {
      test: 'test'
    }
  },
  created () {
    getArticle().then(response => {
      if (response.data.code === 200) {
        // alert(JSON.stringify(response.data))
        this.test = JSON.stringify(response.data)
      } else {
        this.$message.error(response.data.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
