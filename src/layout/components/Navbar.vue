<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="name-icon">{{ name?.charAt(0) }}</span>
          <!-- 名称 -->
          <span class="name">{{ name }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/Xoo001/heimahr">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!-- 用prevent组织默认时间 -->
          <a @click.prevent="uploadPassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- native事件的修饰符：注册组件的根元素的原生时间 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- dialog  sync可以接收子组件传过来的事件和值 -->
    <el-dialog append-to-body width="500px" title="修改密码" :visible.sync="showDialog" @close="cancelForm">
      <!-- form表单 -->
      <el-form ref="passwordForm" :model="passwordForm" :rules="rules" label-width="120px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="重置密码" prop="twicePassword">
          <el-input v-model="passwordForm.twicePassword" show-password size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm">确认修改</el-button>
          <el-button size="mini" @click="cancelForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { uploadPassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const theSame = (rule, value, callback) => {
      // 自定义规则：两次密码相同
      value === this.passwordForm.newPassword ? callback() : callback(new Error('两次密码不一致'))
    }
    return {
      showDialog: false,
      // 重置密码表单
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        twicePassword: ''
      },
      // 表单验证规则
      rules: {
        oldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位之间', trigger: 'blur' }
        ],
        twicePassword: [
          { required: true, message: '重置密码不能为空', trigger: 'blur' },
          { validator: theSame, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    async logout() {
      // 调用退出登录action
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },

    // 重置密码
    uploadPassword() {
      this.showDialog = true
    },

    // 提交重置密码
    submitForm() {
      this.$refs.passwordForm.validate(async isOk => {
        // console.log(isOk)
        // 表单验证通过：提交调用接口
        if (isOk) {
          // 调用接口
          await uploadPassword(this.passwordForm)
          // 修改成功
          this.$message.success('密码修改成功')
          // 调用取消重置
          this.cancelForm()
        }
      })
    },

    // 取消重置密码
    cancelForm() {
      this.$refs.passwordForm.resetFields() // 重置表单
      this.showDialog = false // 关闭盒子
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .name-icon {
          cursor: pointer;
          color: #fff;
          width: 30px;
          height: 30px;
          text-align: center;
          background: green;
          line-height: 30px;
          border-radius: 50%;
        }

        .name {
          margin-right: 10px;
          font-size: 14px;
        }

        .el-icon-setting {
          cursor: pointer;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
