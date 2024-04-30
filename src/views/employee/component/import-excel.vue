<template>
  <el-dialog
    width="500px"
    title="员工导入"
    :visible="showExcelDialog"
    @close="$emit('update:showExcelDialog', false)"
  >
    <el-row type="flex" justify="center">
      <div class="upload-excel">
        <input
          ref="excel-upload-input"
          class="excel-upload-input"
          type="file"
          accept=".xlsx, .xls"
          @change="uploadChange"
        >
        <div class="drop">
          <i class="el-icon-upload" />
          <el-button type="text" @click="downloadExcel">下载导入模板</el-button>
          <span>将文件拖到此处或
            <el-button type="text" @click="handleUpload">点击上传</el-button>
          </span>
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <!-- update:props属性名，值 直接修改 .sync修饰符的属性值 -->
      <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog', false)">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { downloadExcel, updateExcel } from '@/api/employee'
import FileSaver from 'file-saver'
export default {
  props: {
    showExcelDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 下载Excel模版
    async downloadExcel() {
      const result = await downloadExcel()
      // console.log(result)
      FileSaver.saveAs(result, '员工信息模版.xlsx')
    },
    // 弹出文本选择器上传文件
    handleUpload() {
      // 弹出文本选择框
      this.$refs['excel-upload-input'].click()
    },
    // 监听输入框改变事件
    async uploadChange(e) {
      const files = e.target.files
      // 如果大于0说明有数据需要上传
      if (files.length > 0) {
        const data = new FormData()
        data.append('file', files[0])
        try {
          // 参数是formdata类型 需要参数加入formdata类型中 file:file
          await updateExcel(data)
          // 成功导入数据
          this.$message.success('批量导入员工成功')
          // 通知父组件更新数据
          this.$emit('updataList')
          // 关闭弹窗
          this.$emit('update:showExcelDialog', false)
        } catch (error) {
          // 失败捕捉
          // this.$refs['excel-upload-input'].value = ''
          // console.log(this.$refs['excel-upload-input'].value)
        } finally {
          // 无论成功失败都会执行此代码
          // 成功/失败清除选择器选择的内容方便重新选择
          this.$refs['excel-upload-input'].value = ''
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .upload-excel {
    display: flex;
    justify-content: center;
    margin: 20px;
    width: 360px;
    height: 180px;
    align-items: center;
    color: #697086;
    .excel-upload-input {
        display: none;
        z-index: -9999;
    }
    .btn-upload,
    .drop {
        border: 1px dashed #dcdfe6;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 160px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .drop {
        line-height: 40px;
        color: #bbb;
        i {
        font-size: 60px;
        display: block;
        color: #c0c4cc;
        }
    }
    }
</style>
