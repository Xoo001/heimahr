<template>
  <div class="container">
    <div class="app-container">
      <!-- v-slot只能给template使用 -->
      <el-tree :data="depts" :props="defaultProps" default-expand-all :expand-on-click-node="false">
        <template v-slot="{data}">
          <!-- 节点结构 -->
          <el-row style="width: 100%; height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="6">
              <span class="tree-manger">{{ data.managerName }}</span>
              <!-- 下拉菜单 -->
              <el-dropdown @command="operateDept($event,data.id)">
                <span>
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 弹出层Dialog -->
    <AddDept ref="addDept" :current-node-id="currentNodeId" :show-dialog.sync="showDialog" @updateDepartment="getDepartment" />
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'

export default {
  name: 'Department',

  components: { AddDept },

  data() {
    return {
      currentNodeId: null, // 点击的ID
      departmentName: '',
      depts: [], // 数据属性
      defaultProps: {
        label: 'name', // 要显示的字段名
        children: 'children'
      },
      showDialog: false
    }
  },

  created() {
    this.getDepartment()
  },

  methods: {
    // 获取数据
    async getDepartment() {
      const res = await getDepartment()
      // this.depts = res
      // console.log(res)
      // 树形结构 递归
      this.depts = transListToTreeData(res, 0)
    },

    // 操作部门的方法
    operateDept(type, id) {
      // console.log(type)
      // console.log(id)
      // 添加子部门
      if (type === 'add') {
        this.currentNodeId = id
        this.showDialog = true
      } else if (type === 'edit') {
        this.currentNodeId = id
        this.showDialog = true
        // 回显数据 注意：直接调用组件方法是同步的方法，数据赋值是异步动作
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail() // 等同于子组件的this
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;

  & .tree-manger {
    width: 100px;
    display: inline-block;
    margin: 10px;
  }
}
</style>
