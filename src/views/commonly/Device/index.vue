<template>
  <div>
    <device-table :transmitData="transmitData"></device-table>
  </div>
</template>

<script>
import DeviceTable from './components/DeviceTable.vue'
export default {
  props: {
    transmitData: {
      type: Array
    }
  },
  components: {
    DeviceTable
  }
}
</script>
