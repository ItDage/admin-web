<template>
  <el-dialog :visible.sync="dialogFormVisible" :title.sync="title" :before-close="refreshTab" width="30%" top="30vh">
    <el-form :model="form" :rules="loginRules" ref="form">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" name="username" placeholder="请输入用户名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
      <el-input v-model="form.password" name="password" placeholder="请输入密码" autocomplete="off"></el-input>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="login">登 录</el-button>
    </div>
  </el-dialog>

</template>

<script>
import { isvalidUsername } from '@/util/validate'
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '登录'
    }
  },
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码至少六位数'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      formLabelWidth: '80px',
      loading: false,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  methods: {
    refreshTab () {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false)
      this.$emit('closeMain', true)
    },
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.form).then(() => {
            this.loading = false
            // 拉取用户信息
            this.$store.dispatch('GetUserInfo').then(res => { // 拉取user_info
              // const roles = res.data.data.roles // note: roles must be a array! such as: ['editor','develop']

              // store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
              //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              // })
              this.$emit('update:visible', false)
              // this.$router.push({path: '/', query: {'time': new Date()}});
            }).catch((err) => {
              store.dispatch('FedLogOut').then(() => {
                this.$message.error(err || 'Verification failed, please login again')
                next({ path: '/' })
              })
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
