<template>
  <div class="swiper-index">
    <div>
      <!-- 使用el-upload组件上传文件后，文件的信息对象会拼接在url的后面传递给后端 -->
      <el-upload class="upload-demo"
                 action="http://localhost:3000/swiper/upload"
                 :on-success="uploadSuccess"
                 :show-file-list="false"
                 :on-progress = "uploadProgress"
                 :on-error = "uploadError">
        <el-button type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-table :data="swiperList" border stripe>
      <el-table-column type="index" align="center" label="序号"></el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt="" style="height:70px;">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {fetchList, del} from '@/api/miniprogram/swiper'
export default {
  data () {
    return {
      swiperList: [],
      onLoading: false
    }
  },
  methods: {
    onDel (row) {
      console.log(row)
      this.$alertMsgBox().then(() => {
        this.onLoading = true
        del(row).then((res) => {
          this.$message.success('删除成功')
          this.getList()
        })
      }).catch(() => {

      })
    },
    getList () {
      this.onLoading = true
      fetchList().then((res) => {
        this.swiperList = res.data.data
        this.onLoading = false
        console.log(this.swiperList)
      })
    },
    uploadSuccess (res) { // 上传成功
      if (res.data.length > 0) {
        this.$message.success('上传成功')
        this.getList()
      } else {
        this.$message.error('上传失败')
      }
      this.onLoading = false
    },
    uploadProgress () { // 上传中
      this.onLoading = true
    },
    uploadError () { // 上传失败
      this.onLoading = false
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="stylus" scoped>
.swiper-index
  padding 16px;
  background #fff
</style>
