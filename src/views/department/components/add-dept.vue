<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="closeDialog">
    <!-- 表单结构 -->
    <el-form ref="addDept" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width: 80%;" size="mini">
          <el-option label="123" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" placeholder="1-100个字符" rows="4" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary">确认</el-button>
            <el-button>取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
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
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人名字
        name: '', // 部门名称
        pid: '' // 部门父级部门id
      },
      rules: {
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍的长度为1-100个字符', trigger: 'blur' }
        ],
        managerId: [
          { required: true, message: '请选择部门负责人', trigger: 'change' }
        ],
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    closeDialog() {
      // 改变父级组件的数据
      this.$emit('update:show-dialog', false)
    }
  }
}
</script>

<style>

</style>
