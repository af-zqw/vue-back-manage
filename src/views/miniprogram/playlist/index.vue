<template>
  <div class="playlist-index" ref="scrollDom">
    <el-table :data="playlist" border stripe>
      <el-table-column type="index" align="center" lael="序号"></el-table-column>
      <el-table-column label="封面" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt="" style="height:50px;">
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="描述" prop="copywriter" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="onEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import {fetchList, del} from '@/api/miniprogram/playlist'
export default {
  data () {
    return {
      playlist: [],
      count: 10,
      onLoading: false,
      total: 0,
      pageNum: 1,
      pageSize: 5
    }
  },
  methods: {
    handleSizeChange (val) { // 每页条数改变
      this.pageSize = val
      this.pageNum = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getList()
    },
    onEdit (row) {
      this.$router.push(`/miniprogram/playlist/edit/${row._id}`)
    },
    onDel (row) {
      this.$alertMsgBox().then(() => {
        del({id: row._id}).then((res) => {
          if (res.data.code === 20000) {
            this.$message.success('删除成功')
            this.getList()
          }
        })
      }).catch(() => {
      })
    },
    getList () {
      this.onLoading = true
      fetchList({
        start: (this.pageNum - 1) * this.pageSize,
        count: this.pageSize
      }).then((res) => {
        if (res.data.code === 20000) {
          console.log(res.data)
          this.playlist = res.data.data.list
          this.total = res.data.data.total
        }
        this.onLoading = false
      }).catch(() => {
        this.$message.error('系统错误，请联系管理员')
        this.onLoading = false
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="stylus" scoped>
.playlist-index
  padding 16px;
  background  #fff
</style>
