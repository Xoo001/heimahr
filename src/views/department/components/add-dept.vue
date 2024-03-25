<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="closeDialog">
    123
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
