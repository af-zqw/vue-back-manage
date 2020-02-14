<template>
  <div>
    <af-table :cols="cols" :data="data">
      <template slot-scope="scope" slot="opt">
        <el-switch
          v-model="scope.scope.row.value"
          @change="hanldChange(scope.scope.row)"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
    </af-table>
  </div>
</template>

<script>
export default {
  name:'TwoTable',
  data() {
    return {
      cols:[
        { prop:'name', label:'设备名'},
        { prop:'adress', label:'地址'},
        { prop:'date', label:'日期' },
        { label:'开启报警',slot: 'opt' }
      ],
      data:[
        {name:'设备一',adress:'上海',date:'2018-12-23',value:true},
        {name:'设备二',adress:'上海',date:'2018-12-23',value:true},
        {name:'设备三',adress:'上海',date:'2018-12-23',value:true},
        {name:'设备四',adress:'上海',date:'2018-12-23',value:true}
      ]
    }
  },
  methods:{
    hanldChange(row) {
      if(row.value){
        this.$message.success('成功开启')
      }
      if(!row.value) {
        row.value = true
        this.$alertMsgBox(`确定要关闭:${row.name}的报警吗?`)
          .then(()=>{
            this.$message.warning('取消该设备报警')
            row.value = false
          }).catch(() => {
          })
      }
    }
  }
}
</script>
