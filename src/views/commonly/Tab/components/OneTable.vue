<template>
  <div>
    <af-table :cols="cols" :data="data">
      <template slot-scope="scope" slot="tag">
        <el-tag
          :type="scope.scope.row.tag === '运行' ? 'primary' : 'danger'"
          disable-transitions>{{scope.scope.row.tag}}
        </el-tag>
      </template>
    </af-table>
  </div>
</template>

<script>
export default {
  name: 'OneTable',
  data () {
    return {
      cols: [
        {prop: 'name', label: '设备名称'},
        {prop: 'date', label: '日期'},
        {prop: 'adress', label: '地址'},
        {label: '标签',
          slot: 'tag',
          filters: [{text: '运行', value: '运行'}, {text: '停止', value: '停止'}]}
      ],
      data: [
        {name: '设备一', date: '2016-03-12', adress: '上海', tag: '运行'},
        {name: '设备二', date: '2016-03-12', adress: '南京', tag: '停止'},
        {name: '设备三', date: '2016-03-12', adress: '深圳', tag: '运行'},
        {name: '设备四', date: '2016-03-12', adress: '北京', tag: '停止'}
      ]
    }
  }
}
</script>
