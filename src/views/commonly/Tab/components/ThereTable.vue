<template>
  <div>
    <af-table :cols="cols" :data="data">
      <template slot-scope="scope" slot="opt">
        <el-select v-model="scope.scope.row.selValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </af-table>
  </div>
</template>

<script>
export default {
  name:'ThereTable',
  data() {
    return {
      options:[
        {value:'1',label:'良好'},
        {value:'2',label:'正常'},
        {value:'3',label:'需要维修'},
        {value:'4',label:'报废'}
      ],
      cols:[
        {prop:'name',label:'设备名'},
        {prop:'date',label:'日期'},
        {prop:'adress',label:'地址'},
        {label:'设备状态',slot:'opt'}
      ],
      data:[
        {name:'设备一',date:'2017-12-23',adress:'上海',selValue:'1'},
        {name:'设备一',date:'2017-12-23',adress:'上海',selValue:'2'},
        {name:'设备一',date:'2017-12-23',adress:'上海',selValue:'3'},
        {name:'设备一',date:'2017-12-23',adress:'上海',selValue:'4'}
      ]
    }
  }
}
</script>
