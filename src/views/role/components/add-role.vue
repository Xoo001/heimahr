/<template>
  <el-dialog title="添加角色" :visible="showDialog" width="500px" @close="closeDialog">
    <!-- 表单结构 -->
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" size="mini" type="text" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="启用" prop="state">
        <el-switch v-model="formData.state" :active-value="1" :inactive-value="0" size="mini" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="formData.description" size="mini" type="textarea" :rows="4" style="width: 300px;" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="addRole">确认</el-button>
            <el-button size="mini" @click="closeDialog()">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addRole } from '@/api/role'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: '',
        state: 0
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 关闭对话框
    closeDialog() {
      this.$refs.form.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 添加角色
    addRole() {
      this.$refs.form.validate(async isok => {
        if (isok) {
          // 调用添加角色接口
          await addRole(this.formData)
          // 添加提示
          this.$message.success('添加角色成功')
          // 通知父组件更新页面
          this.$emit('updateRole')
          // 重制表单关闭弹窗
          this.closeDialog()
        }
      })
    }
  }
}
</script>

<style>

</style>
