<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理 -->
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <!-- 表格组件 -->
      <el-table border style="width: 100%;">
        <el-table-column width="50" label="序号" />
        <el-table-column width="200" label="角色" />
        <el-table-column width="200" label="启用" />
        <el-table-column label="描述" />
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
export default {
  name: 'Role'

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
