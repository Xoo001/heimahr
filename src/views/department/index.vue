<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="depts" :props="defaultProps" default-expand-all />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [
        {
          label: '传智教育',
          children: [
            { label: '总裁办' },
            { label: '行政部', children: [{ label: '行政部子部门' }] }
          ]
        }
      ], // 数据属性
      defaultProps: {
        label: 'label', // 要显示的字段名
        children: 'children'
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
