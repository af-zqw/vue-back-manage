<template>
  <div class="table-index">
    <div class="af-search">
      <div class="search-left">
          <label>设备类型:</label>
          <el-radio-group v-model="deviceType" @change="queryDevice(deviceType)">
            <el-radio-button label="电动"></el-radio-button>
            <el-radio-button label="汽油"></el-radio-button>
          </el-radio-group>
      </div>
      <div class="search-right">
        <el-button icon="el-icon-circle-plus-outline"
                   type="primary"
                   @click="editOrAdd('add')">
                   添加设备
        </el-button>
      </div>
    </div>
    <af-table :cols="cols" :data="queryData">
      <template slot-scope="scope" slot="alert">
        <i class="alert-icon" v-if="scope.scope.row.alert"></i>
        <i class="alert-icon close" v-else></i>
      </template>
      <template slot-scope="scope" slot="seeEchart">
        <el-button type="text"
                   style="text-decoration:underline;"
                   @click="openEchart(scope.scope.$index)">
                   查看图表
        </el-button>
      </template>
      <template slot-scope="scope" slot="opt">
        <el-button type="primary"
                   @click="editOrAdd('edit',scope.scope.$index)">
                   编辑
        </el-button>
        <el-button @click="delRow(scope.scope.$index)">删除</el-button>
      </template>
    </af-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageset.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageset.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="temporary.length"
      background>
    </el-pagination>
  </div>
</template>

<script>
import {getDeviceData} from '@/api/commonly'
export default {
  props: {
    transmitData: {
      type: Array
    }
  },
  data () {
    return {
      deviceType: '电动',
      cols: [
        {prop: 'name', label: '设备名称'},
        {prop: 'date', label: '上线日期'},
        {prop: 'adress', label: '地址'},
        {prop: 'type', label: '设备类型'},
        {label: '是否开启报警', slot: 'alert', width: 100},
        {label: '查看图表', slot: 'seeEchart'},
        {label: '操作', slot: 'opt'}
      ],
      allDeviceList: [],
      queryData: [],
      temporary: [],
      pageset: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  name: 'DeviceTable',
  watch: {
    // 在弹窗的submit提交表单方法后，将表单的数据传给main.vue，再由main.vue传给子组件，在这个组件上接收
    transmitData () {
      const data = this.transmitData[1]
      const index = this.transmitData[2]
      if (this.transmitData[0]) {
        this.queryData.splice(index, 1, data)
        this.$message.success('编辑成功')
      } else {
        this.allDeviceList.push(data)
        this.$message.success('添加成功')
        this.queryDevice(this.deviceType)
      }
    }
  },
  methods: {
    openEchart (index) {
      const row = this.queryData[index]
      let title = '' + row.name + '2018年图表'
      const id = `popus_${+new Date()}`
      this.$store.dispatch('addPopups', {
        id,
        url: '/commonly/Device/popups/echart.vue',
        title,
        noTip: true
      })
    },
    editOrAdd (todo, index) {
      new Promise((resolve) => {
        let row = {},
          title = '新增设备'
        if (todo == 'edit') {
          row = this.queryData[index]
          title = '编辑设备'
        }
        const id = `popus_${+new Date()}`
        this.$store.dispatch('addPopups', {
          id,
          url: '/commonly/Device/popups/editOrAdd.vue',
          params: {
            data: JSON.parse(JSON.stringify(row)),
            todo,
            callback: resolve, // 当别的地方执行这个callback方法后，才会触发下面的.then方法，因为这里都是假数据
            index: index // ，每次执行queryDevice方法，数据都会重置，所以这里的.then方法并无意义
          },
          title
        })
      }).then(() => {
        this.queryDevice(this.deviceType)
      })
    },
    delRow (index) {
      const row = this.queryData[index]
      this.$alertMsgBox(`<p>该设备类型为: ${row.type}</p><p>所在位置在: ${row.adress}</p>`)
        .then(() => {
          this.$alertMsgBox(`确认删除：${row.name} ?`)
            .then(() => {
              this.queryData.splice(index, 1)
              this.$message.success('删除成功')
            }).catch(() => {})
        }).catch(() => {})
    },
    // 实现分组分页的方法，先从axios那里获取全部的数据allDeviceList，进行遍历，根据单选按钮组的类型进行筛选，
    // queryData为真正渲染表格的数据，然后根据分页的数据进行截取数组，因为改变到queryData，所以总数无法正常计算
    // 所以需要一个临时数组来储存获取到的数据，就是temporary
    queryDevice (deviceType) {
      this.queryData = []
      this.allDeviceList.forEach(item => {
        if (item.type == deviceType) {
          this.queryData.push(item)
        }
      })
      this.temporary = this.queryData
      this.queryData = this.queryData.slice((this.pageset.pageNum - 1) * 10, this.pageset.pageNum * this.pageset.pageSize)
    },
    // 分页器的绑定数据为pageset,但分页器进行选择的时候，pageset的数据并不会改变，所以需要手动改变一次，再执行分组分页的方法
    handleSizeChange (val) {
      this.pageset.pageSize = val
      this.queryDevice(this.deviceType)
    },
    handleCurrentChange (val) {
      this.pageset.pageNum = val
      this.queryDevice(this.deviceType)
    }
  },
  created () {
    getDeviceData({testParams: true})
      .then((res) => {
        let data = res.data
        if (data.ret) {
          this.allDeviceList = data.data.deviceList
        }
      }).then(() => {
        this.queryDevice(this.deviceType)
      })
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/table.styl';
</style>
