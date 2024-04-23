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
        <el-table-column prop="state" width="200" label="启用">
          <!-- 自定义插槽 -->
          <template v-slot="{row}">
            <span>{{ row.state === 1 ? '已启用' : '未启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template v-slot="">
            <el-button type="text">分配权限</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" style="height: 80px;" align="middle">
        <el-pagination
          :page-size="pagesize"
          :current-page="page"
          layout="prev, pager, next"
          :total="total"
          @current-change="changePage"
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
      tableDate: [], // 角色列表数据
      total: 0 // 总数
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 调用角色列表数据
    async getRoleList() {
      const result = await getRoleList(this.page, this.pagesize)
      console.log(result)
      this.tableDate = result.rows
      this.total = result.total
    },
    // 切换分页请求新的数据
    changePage(newPage) {
      this.page = newPage
      this.getRoleList()
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
