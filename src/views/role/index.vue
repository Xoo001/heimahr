<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理 -->
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showDialog = true">添加角色</el-button>
      </div>
      <!-- 表格组件 -->
      <el-table :data="tableDate" border style="width: 100%;">
        <el-table-column prop="id" width="50" label="序号" />
        <el-table-column prop="name" width="200" label="角色">
          <template v-slot="{row}">
            <!-- 条件判断 -->
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" width="200" label="启用">
          <!-- 自定义插槽 -->
          <template v-slot="{row}">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
            <span v-else>{{ row.state === 1 ? '已启用' : '未启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini" @click="btnChangeRow(row)">确认</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text">分配权限</el-button>
              <el-button type="text" @click="btnEditRow(row)">编辑</el-button>
              <!-- 气泡框 -->
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" type="text" style="margin-left: 10px;">删除</el-button>
              </el-popconfirm>
            </template>
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
    <!-- 弹出层 -->
    <addRole :show-dialog.sync="showDialog" @updateRole="getRoleList()" />
  </div>
</template>

<script>
import { editRole, getRoleList, delRole } from '@/api/role'
import addRole from './components/add-role.vue'
export default {
  name: 'Role',
  components: {
    addRole
  },
  data() {
    return {
      page: 1, // 当前页码数
      pagesize: 5, // 当前页面需要的数据条数
      tableDate: [], // 角色列表数据
      total: 0, // 总数
      showDialog: false // 对话框显示隐藏
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 调用角色列表数据
    async getRoleList() {
      const result = await getRoleList(this.page, this.pagesize)
      // console.log(result)
      this.tableDate = result.rows
      this.total = result.total
      // 针对每一行数据添加一个标记
      this.tableDate.forEach(item => {
        // item.isEdit = false // 添加一个属性 初始值为false
        // 数据响应式的问题 数据变化 试图更新
        // 添加的动态属性 不具备响应式的特点
        // this.$set(目标对象，属性名称，初始值)可以针对目标对象 添加的属性 添加响应式
        this.$set(item, 'isEdit', false)
        // 缓存数据
        this.$set(item, 'editRow', {
          name: item.name,
          description: item.description,
          state: item.state,
          id: item.id
        })
      })
    },
    // 切换分页请求新的数据
    changePage(newPage) {
      this.page = newPage
      this.getRoleList()
    },
    // 编辑方法
    btnEditRow(row) {
      // console.log(row)
      // 显示编辑内容
      row.isEdit = true
      // 更新缓存数据
      row.editRow.name = row.name
      row.editRow.description = row.description
      row.editRow.state = row.state
    },
    // 确认编辑调用接口
    async btnChangeRow(row) {
      // 检查是否必填 -- 更新接口 -- 退出编辑
      if (row.editRow.name && row.editRow.description) {
        await editRole(row.editRow)
        this.$message.success('角色修改成功')
        // row.name = row.editRow.name
        // row.isEdit = false // eslint的校验 误判
        // Object.assign(target,source)原来的对象和需要修改的值
        Object.assign(row, {
          ...row.editRow,
          isEdit: false
        })
      } else {
        this.$message.warning('内容不能为空')
      }
    },
    // 删除数据
    async confirmDel(id) {
      await delRole(id)
      this.$message.success('恭喜你，删除成功')
      // 更新视图：区分删除的数据是不是最后一个，如果是渲染前一页
      if (this.tableDate.length === 1) {
        this.page--
      }
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
