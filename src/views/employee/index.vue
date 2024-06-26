<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom:10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
          @input="changeValue"
        />
        <!-- 树形组件 -->
        <el-tree
          ref="depts"
          node-key="id"
          :data="treeData"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          @node-click="selectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog = true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column type="selection" />
          <el-table-column label="头像" align="center">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :size="30" :src="row.staffPhoto" />
              <el-avatar v-else :size="30" class="username">{{ row.username.charAt(0) }}</el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" sortable prop="mobile" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式">
            <template v-slot="{ row }">
              {{ row.formOfEmployment === 1 ? '正式':'非正式' }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="timeOfEntry" />
          <el-table-column label="操作" width="180px">
            <template>
              <el-button type="text">查看</el-button>
              <el-button type="text">角色</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px;" type="flex" justify="end" align="middle">
          <el-pagination
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="pageJump"
          />
        </el-row>
      </div>
    </div>
    <!-- 对话框 -->
    <ImportExcelVue :show-excel-dialog.sync="showExcelDialog" @updataList="updataList" />
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { getEmployeeList, exportEmployee } from '@/api/employee'
import { transListToTreeData } from '@/utils'
import FileSaver from 'file-saver'
import ImportExcelVue from './component/import-excel.vue'
export default {
  name: 'Employee',
  components: {
    ImportExcelVue
  },
  data() {
    return {
      treeData: [], // 树形数据
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      queryParams: {
        keyword: '', // 根据名字模糊查询
        departmentId: null, // 部门id,根据部门查询当前部门及子部门的用户
        page: 1, // 当前页码数
        pagesize: 10 // 当前页面需要的数据条数
      },
      list: [], // 员工列表数据
      total: 0, // 记录员工的总数
      showExcelDialog: false // 对话框显示隐藏
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取树形结构数据
    async getDepartment() {
      const result = await getDepartment()
      this.treeData = transListToTreeData(result, 0)
      this.queryParams.departmentId = this.treeData[0].id
      // 默认选中第一个传旨教育
      // 树组件的渲染是异步的
      this.$nextTick(() => {
        // 树的渲染完毕之后选中
        this.$refs.depts.setCurrentKey(this.queryParams.departmentId)
      })
      // 请求参数有值 请求方法
      this.getEmployeeList()
    },
    // 选中节点触发的事件
    selectNode(node) {
      // console.log(node.id)
      // 记录点击的组织部门
      this.queryParams.departmentId = node.id // 记录部门id
      this.queryParams.page = 1 // 设置第一页
      this.getEmployeeList()
    },
    // 获取员工列表数据
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.queryParams)
      this.list = rows
      this.total = total
      // console.log(rows)
    },
    // 分页跳转
    pageJump(newPage) {
      // console.log(newPage)
      this.queryParams.page = newPage
      this.getEmployeeList()
    },
    // 模糊搜索
    changeValue() {
      // 单位时间之内只执行最后一次
      // this的实例上赋值一个timer属性
      // 防抖
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployeeList()
      }, 300)
    },
    // 导出表格
    async exportEmployee() {
      // console.log('导出')
      const res = await exportEmployee()
      console.log(res)
      // 使用一个npm包，直接将blob文件下载到本地 file-saver
      // FileSaver.saveAs(blob,文件格式)
      FileSaver.saveAs(res, '员工信息表.xlsx')// 导出表格
    },
    // 更新数据
    updataList() {
      this.getEmployeeList()
    }
  }

}
</script>

<style lang="scss" scoped>
  .app-container {
    background: #fff;
    display: flex;
    .left {
      width: 280px;
      padding: 20px;
      border-right: 1px solid #eaeef4;
    }
    .right {
      flex: 1;
      padding: 20px;
      .opeate-tools {
        margin:10px ;
      }
      .username {
        height: 30px;
        width: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        background: #04C9BE;
        font-size: 12px;
        display:inline-block;
      }
    }
  }
</style>
