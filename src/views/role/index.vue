<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理 -->
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <!-- 表格组件 -->
      <el-table :data="tableDate" border style="width: 100%;">
        <el-table-column prop="id" width="50" label="序号" />
        <el-table-column prop="name" width="200" label="角色" />
        <el-table-column prop="state" width="200" label="启用" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" />
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" style="height: 80px;" align="middle">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      page: 1, // 当前页码数
      pagesize: 10, // 当前页面需要的数据条数
      tableDate: [] // 角色列表数据
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 调用角色列表数据
    async getRoleList() {
      const result = await getRoleList()
      console.log(result)
      this.tableDate = result.rows
    }
  }

}
</script>

<style lang="scss" scoped>
.app-container{
  padding: 20px;
  .role-operate {
    margin-bottom: 10px;
  }
}
</style>
