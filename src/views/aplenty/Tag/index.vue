<template>
  <div class="tag-index">
    <div class="select-box" @mouseout="tagMouseout">
      <p v-show="!selectList.length">暂无筛选条件...</p>
      <div class="tag-row" v-show="selectList.length">
        <span v-for="(item,index) in selectList"
              :key="index"
              class="tag-item"
              @mouseover="tagMouseover(index)">
          {{item.name}}<i class="el-icon-circle-close"
                          v-show="currentIndex==index"
                          @click="delSelectTag(index)">
                      </i>
        </span>
      </div>
    </div>
    <div class="tag-box">
      <div class="tag-row"
            v-for="(item,index) in filterList"
            :key="index">
          <span>{{item.name}}:</span>
          <span class="tag-item"
                :class="{active:item.allChecked}"
                @click="selectAll(index)">
                全部
          </span>
          <span v-for="(innerItem,childrenIndex) in item.items"
                :key="childrenIndex"
                class="tag-item"
                :class="{active:innerItem.active}"
                @click="selectItem(index,childrenIndex)">
                {{innerItem.name}}
          </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectList: [],
      filterList: [
        {
          name: '出厂厂商',
          allChecked: false,
          items: [
            {name: '龙哥炒粉', active: false},
            {name: '章鱼小王子', active: false},
            {name: '肯德基', active: false},
            {name: '潮汕牛肉店', active: false}
          ]
        },
        {
          name: '生产日期',
          allChecked: false,
          items: [
            {name: '2016年', active: false},
            {name: '2017年', active: false},
            {name: '2018年', active: false},
            {name: '2019年', active: false}
          ]
        },
        {
          name: '使用地址',
          allChecked: false,
          items: [
            {name: '广东', active: false},
            {name: '上海', active: false},
            {name: '云南', active: false},
            {name: '浙江', active: false}
          ]
        },
        {
          name: '设备类型',
          allChecked: false,
          items: [
            {name: '电动', active: false},
            {name: '汽油', active: false},
            {name: '天然气', active: false},
            {name: '其他', active: false}
          ]
        }
      ],
      currentIndex: ''
    }
  },
  methods: {
    selectAll (index) {
      this.filterList[index].allChecked = !this.filterList[index].allChecked
      let currentItems = this.filterList[index].items
      if (this.filterList[index].allChecked) {
        currentItems.forEach((item) => {
          item.active = false
        })
        this.selectList = this.selectList.filter((item) => {
          return !currentItems.includes(item)
        })
        this.selectList = this.selectList.concat(currentItems)
      }
      if (!this.filterList[index].allChecked) {
        this.selectList = this.selectList.filter((item) => {
          return !currentItems.includes(item)
        })
      }
    },
    selectItem (index, childrenIndex) {
      let currentItems = this.filterList[index].items
      let item = currentItems[childrenIndex]
      item.active = !item.active
      if (item.active) {
        if (this.filterList[index].allChecked) {
          this.filterList[index].allChecked = false
          this.selectList = this.selectList.filter((item) => {
            return !currentItems.includes(item)
          })
          this.selectList.push(item)
        } else {
          this.selectList.push(item)
        }
      } else {
        let delIndex = this.selectList.findIndex((v) => {
          if (v.name === item.name) {
            return true
          }
        })
        this.selectList.splice(delIndex, 1)
      }
    },
    delSelectTag (index) {
      let selectItem = this.selectList[index]
      this.selectList.splice(index, 1)

      this.filterList.forEach((item, index) => {
        item.items.some((innerItem) => {
          if (innerItem.name === selectItem.name) {
            if (this.filterList[index].allChecked) {
              this.filterList[index].items.forEach((item) => {
                item.active = true
              })
              this.filterList[index].allChecked = false
              innerItem.active = false
              return true
            } else {
              innerItem.active = false
              return true
            }
          }
        })
      })
    },
    tagMouseover (index) {
      this.currentIndex = index
    },
    tagMouseout () {
      this.currentIndex = null
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
