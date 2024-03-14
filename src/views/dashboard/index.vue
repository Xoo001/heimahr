<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- 使用svg-icon组件 -->
    <!-- 设置一个iconClass的属性 = 文件名《注意：没有后缀》 -->
    <svg-icon icon-class="link" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
  // created() {
  //   // 调用vuex中的action
  //   this.$store.dispatch('user/getUserInfo')
  // }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
