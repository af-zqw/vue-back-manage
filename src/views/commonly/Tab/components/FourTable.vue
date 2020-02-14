<template>
  <div>
    <el-table border stripe :data="data" @filter-change="filterChange">
      <el-table-column type="index" label="序号" align='center'></el-table-column>
      <el-table-column label="名称" prop="name" align='center'></el-table-column>
      <el-table-column label="日期" prop="date" align='center' sortable></el-table-column>
      <!-- 要进行筛选的列就算是用插槽显示也要设置prop -->
      <el-table-column label="标签"
                      prop="tag"
                      align='center'
                      column-key="tag"
                      filter-placement="bottom-end"
                      :filter-method="filterTag"
                      :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }, { text: '未知', value: '未知' }]">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag === '男' ? 'primary' : 'success'"
                  disable-transitions>
                  {{scope.row.tag}}
          </el-tag>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'FourTable',
  data () {
    return {
      data: [
        { name: '老王', date: '2016-05-02', tag: '男' },
        { name: '老李', date: '2016-09-02', tag: '女' },
        { name: '老曾', date: '2016-07-02', tag: '未知' },
        { name: '老黄', date: '2016-08-02', tag: '男' }
      ]
    }
  },
  methods: {
    // 这个筛选的方法是把每一条数据都去筛选一遍，所以会执行很多次，不适合来调用接口
    filterTag (value, row) {
      console.log(value)
      return row.tag === value
    },
    /*
      点击筛选后触发的事件，参数filterObj为一个对象,key为有筛选的那一列(column的标识),
      可以用column-key设置，在上面列上面设置，
      value为一个数组，数组项就是上面筛选列设置的filters选中的value，也就是下面的男、女,
      filters格式:[{ text: '男', value: '男' }, { text: '女', value: '女' },...]
    */
    filterChange (filterObj) { // 这个方法只会执行一次，适合用来调接口
      console.log(filterObj) // 是个数组，tag为设置的column-key，数组项就是选中的筛选选项的value
      let str = filterObj.tag.length ? filterObj.tag.join(',') : '全部'
      this.$alert(`选择了 ${str} `, '提示', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>
