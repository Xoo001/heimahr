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
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" placeholder="1-100个字符" rows="4" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" @click="addDept">确认</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartment, getUserSimple, addDepartment, getDepartmentDetail } from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 点击的id
    currentNodeId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      managerList: [], // 负责人列表数据
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
          { min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            // 自定义校验
            validator: async(rule, value, callback) => {
              // value就是编码
              // 获取组织架构数据
              let result = await getDepartment()
              // 判断是否是编辑模式
              if (this.formData.id) {
                // 排除自身
                result = result.filter(ele => ele.id !== this.formData.id)
              }
              if (result.some(ele => ele.code === value)) {
                callback(new Error('编码不能重复'))
              } else {
                callback()
              }
            }
          }
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
          { min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            // 自定义校验
            validator: async(rule, value, callback) => {
              let result = await getDepartment()
              // 判断是否是编辑模式
              if (this.formData.id) {
                // 排除自身
                result = result.filter(ele => ele.id !== this.formData.id)
              }
              if (result.some(ele => ele.name === value)) {
                callback(new Error('名称不能重复'))
              } else {
                callback()
              }
            }
          }

        ]
      }
    }
  },

  created() {
    this.getUserSimple()
  },

  methods: {
    closeDialog() {
      // 重置表单
      this.$refs.addDept.resetFields()
      // 改变父级组件的数据
      this.$emit('update:show-dialog', false)
    },
    // 显示负责人数据
    async getUserSimple() {
      // 调用接口
      const result = await getUserSimple()
      this.managerList = result
    },
    // 表单验证
    addDept() {
      this.$refs.addDept.validate(async flag => {
        // console.log(flag)
        // console.log(this.currentNodeId)
        if (flag) {
          this.formData.pid = this.currentNodeId
          // 表单验证成功，调用接口传入表单信息
          await addDepartment(this.formData)
          // 通知父组件更新
          this.$emit('updateDepartment')
          // 提示信息重置表单关闭弹窗
          this.$message.success('新增部门成功')
          this.closeDialog()
        }
      })
    },
    // 获取组织详情
    async getDepartmentDetail() {
      // 调用接口
      this.formData = await getDepartmentDetail(this.currentNodeId)
      // console.log(res)
      // 信息赋值给表单信息
    }
  }
}
</script>

<style>

</style>
