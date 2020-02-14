<template>
    <div class="table-main">
        <div class="af-search" @keyup.enter="search">
            <div class="search-left">
                <label>名字</label>
                <el-input v-model="queryForm.name" clearable></el-input>
                <label>公司</label>
                <el-input v-model="queryForm.company" clearable></el-input>
                <el-button type="primary"
                           icon="el-icon-search"
                           @click="search">
                           搜索
                </el-button>
                <el-button type="primary"
                           :icon="showMore?'el-icon-caret-top':'el-icon-caret-bottom'"
                           @click="showMore=!showMore">
                           高级搜索
                </el-button>
            </div>
            <div class="search-right">
                <el-button icon="el-icon-circle-plus-outline"
                           type="primary"
                           @click="editOrAdd('add')">
                           添加客户
                </el-button>
            </div>
        </div>
        <div class="af-search" v-if="showMore" @keyup.enter="search">
            <div class="search-left">
                <label>邮箱</label>
                <el-input v-model="queryForm.email" clearable></el-input>
                <label>电话</label>
                <el-input v-model="queryForm.phone" clearable></el-input>
            </div>
        </div>
        <af-table :data="data" :cols="cols" :loading="onLoading" :settings="{showIndex:true}">
            <template slot-scope="scope" slot="opt">
                <el-button @click="editOrAdd('edit',scope.scope.$index)"
                           type="primary"
                           icon="el-icon-edit-outline">
                           编辑
                </el-button>
                <el-button @click="delRow(scope.scope.$index)" icon="el-icon-delete">删除</el-button>
            </template>
        </af-table>
    </div>
</template>

<script type="text/javascript">
import { getTableData } from '@/api/commonly';
export default{
  props: {
    transmitData: {
      type: Array
    }
  },
  data () {
    return {
      onLoading: false,
      cols: [
        {prop: 'name', label: '名字'},
        {prop: 'company', label: '公司'},
        {prop: 'email', label: '邮箱'},
        {prop: 'phone', label: '电话'},
        {label: '操作', slot: 'opt'}
      ],
      data: [], // 真正展示的数据
      temporaryData: [], // 存放全部数据
      showMore: false,
      queryForm: { // 查询参数对象
        name: '',
        company: '',
        email: '',
        phone: ''
      }
    }
  },
  watch: {
    transmitData () {
      const data = this.transmitData[1]
      const index = this.transmitData[2]
      if (this.transmitData[0]) {
        this.data.splice(index, 1, data)
        this.$message.success('编辑成功')
      } else {
        this.data.push(data)
        this.$message.success('添加成功')
      }
    }
  },
  methods: {
    editOrAdd (todo, index) {
      let row = {},
        title = '新增客户'
      if (todo == 'edit') {
        row = this.data[index]
        title = '编辑客户'
      }
      const id = `popus_${+new Date()}`
      this.$store.dispatch('addPopups', {
        id,
        url: '/commonly/Table/popups/editOrAdd.vue',
        params: {
          data: JSON.parse(JSON.stringify(row)),
          todo: todo,
          index: index
        },
        title
      })
    },
    delRow (index) {
      const row = this.data[index]
      this.$alertMsgBox(`确认要删除客户：${row.name}`)
        .then(() => {
          this.data.splice(index, 1)
          this.$message.success('删除成功')
        }).catch(() => {
        })
    },
    queryData () {
      this.onLoading = true
      this.data = []
      let queryForm = this.queryForm
      getTableData().then((res) => {
        let data = res.data.data.tableData
        data.forEach((item) => {
          if (item.name.indexOf(queryForm.name) > -1 &&
              item.company.indexOf(queryForm.company) > -1 &&
              item.email.indexOf(queryForm.email) > -1 &&
              item.phone.indexOf(queryForm.phone) > -1) {
            this.data.push(item)
          }
        })
      }).then(() => {
        this.onLoading = false
      })
    },
    search () {
      this.queryData()
    }
  },
  created () {
    this.queryData()
  }
}
</script>

<style type="text/css" scoped>
.table-main{
    background:#fff;
    padding:15px;
}
</style>
