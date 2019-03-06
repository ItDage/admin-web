<template>
  <el-dialog title="个人信息" :visible.sync="dialogUserInfoVisible" :before-close="refreshTab">
    <img :src="avatar" class="layui-circle" style="width: 60px; height: 60px;">
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.region" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogUserInfoVisible: {
      type: Boolean,
      default: true
    }
  },
  created() {
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        email: this.$store.state.user.email,
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      avatar: this.$store.state.user.avatar,
      formLabelWidth: '80px'
    };
  },
  methods: {
    refreshTab () {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false)
    }
  }
};
</script>
