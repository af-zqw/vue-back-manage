<template>
  <div class="algorithm-index">
    <div class="algorithm-box">
      <p class="box-title">反转一个整数 支持负数</p>
      <p>
        -123：
        {{reverseInteger(-123)}}
      </p>
      <pre>
      reverseInteger (number) {
        var str = String(number)
        if (str.length > 9) return 0
        if (str.charAt(0) === '-') { // charAt(0)获取字符串第一个字符
          var str2 = str.substring(1, str.length)
          return parseInt('-' + str2.split('').reverse().join(''))
        }
        return parseInt(str.split('').reverse().join(''))
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">实现阶乘</p>
      <p>
        5：
        {{factorialize(5)}}
      </p>
      <pre>
      factorialize (num) {
        if (num < 0) {
          return -1
        } else if (num === 0) {
          return 0
        } else if (num === 1) {
          return 1
        } else {
          return (num * this.factorialize(num - 1))
        }
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">回文 - 正念反念都一样</p>
      <p>
        wa 12 21 aw：
        {{palindrome('wa 12 21 aw')}}
      </p>
      <pre>
      palindrome (str) {
        var newStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split('')
        return newStr.join('') === newStr.reverse().join('') ? 'true' : 'false'
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title"> string 里的每个单词首字母大写</p>
      <p>
        wwwwww sadasdasd ww：
        {{titleCase('wwwwww sadasdasd ww')}}
      </p>
      <pre>
      titleCase (str) {
        return str.toLowerCase().split(' ').map((item) => {
          return item.replace(item.charAt(0), item[0].toUpperCase())
        }).join(' ')
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">返回每个数组中最大的数</p>
      <p>
        [[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]：
        {{largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]])}}
      </p>
      <pre>
      largestOfFour (arr) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
          arr[i].sort(function (a, b) {
            return b - a
          })
          newArr.push(arr[i][0])
        }
        return newArr
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">判断字符串是否是指定字符结尾</p>
      <p>
        "He has to give me a new name", "name"：
        {{confirmEnding("He has to give me a new name", "name")}}
      </p>
      <pre>
      confirmEnding (str, target) {
        return str.substr(-target.length) === target ? 'true' : 'false'
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">指定数目，分割数组</p>
      <p>
        ['a','b','c','d','e','f','g','h'],2：
        {{chunk(['a','b','c','d','e','f','g','h'],2)}}
      </p>
      <pre>
      chunk (arr, size) {
        var newArr = []
        for (var i = 0; i < arr.length; i += size) {
          newArr.push(arr.slice(i, i + size))
        }
        return newArr
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">比较字符串 后者是不是前者的子集</p>
      <p>
        'hello','heo'：
        {{mutation('hello','heo')}}
      </p>
      <pre>
      mutation (str1, str2) {
        var arr1 = str1.split('')
        var arr2 = str2.split('')
        for (var i = 0; i < arr2.length; i++) {
          if (arr1.indexOf(str2[i]) === -1) {
            return 'false'
          }
        }
        return 'true'
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">数组去重</p>
      <p>
        [11,11,23,23,44,44,56,56,77,55,56]：
        {{unique([11,11,23,23,44,44,56,56,77,55,56])}}
      </p>
      <pre>
      unique (arr) {
        let hashTable = {}
        let data = []
        for (let i = 0; i < arr.length; i++) {
          if (!hashTable[arr[i]]) {
            hashTable[arr[i]] = true
            data.push(arr[i])
          }
        }
        return data
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">分隔符写法变小驼峰写法</p>
      <p>
        'Hello-wOrLd-mY-name-iS-wuyanzu'：
        {{getCamelCase('Hello-wOrLd-mY-name-iS-wuyanzu')}}
      </p>
      <pre>
      getCamelCase (str) {
        let arr = str.split('-')
        return arr.map((item, index) => {
          item = item.toLowerCase()
          if (index === 0) {
            return item
          } else {
            return item.charAt(0).toUpperCase() + item.slice(1)
          }
        }).join('')
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">修改数组中对象的属性名</p>
      <p>
        '[{group:1},{group:2},{group:3}]'：
        {{changeAttribute([{group:1},{group:2},{group:3}])}}
      </p>
      <pre>
      changeAttribute (arr) {
        for (let i in arr) {
          for (let j in arr[i]) {
            if (j === 'group') {
              arr[i]['group' + (Number(i) + Number(1))] = arr[i][j]
              delete arr[i]['group']
            }
          }
        }
        return arr
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">修改对象的属性名</p>
      <p>
        '[{label: '1', children: [{label: '2'}, {label: '3'}]}]'：
        {{replaceAttribute()}}
      </p>
      <pre>
      replaceAttribute () {
        let arr = [{label: '1', children: [{label: '2'}, {label: '3'}]}]
        let jsonStr = JSON.stringify(arr)
        jsonStr = jsonStr.replace(new RegExp('label', 'g'), 'title')
        arr = JSON.parse(jsonStr)
        return arr
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">数组随机排序</p>
      <p>
        '[0,1,2,3,4,5]'：
        {{randomSortArray([0,1,2,3,4,5])}}
      </p>
      <pre>
      randomSortArray (arr) {
        const length = arr.length
        for (let i = 0; i < length; i++) {
          const x = Math.floor(Math.random() * length)
          const y = Math.floor(Math.random() * length)
          const temp = arr[x]
          arr[x] = arr[y]
          arr[y] = temp
        }
        return arr
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">转化单位并指定保留几位小数</p>
      <p>
        2324234：
        {{unitTransformation(2324234,2)}}
      </p>
      <pre>
      unitTransformation (num, point) {
        let numStr = num.toString().split('.')[0]
        if (numStr.length < 5) {
          return numStr
        } else if (numStr.length >= 5 && numStr.length <= 8) {
          let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
          return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
        } else if (numStr.length > 8) {
          let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
          return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
        }
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">两个对象数组按某个字段去重</p>
      <p>
        arr1,arr2:
        {{objUnique()}}
      </p>
      <pre>
      objUnique () {
        let arr1 = [
          {id: 1},
          {id: 2},
          {id: 3},
          {id: 4}
        ]
        let arr2 = [
          {id: 5},
          {id: 6},
          {id: 3},
          {id: 4}
        ]
        let arr = arr1.concat(arr2)
        let hashTable = {}
        let data = []
        for (let i = 0; i < arr.length; i++) {
          if (!hashTable[arr[i].id]) {
            hashTable[arr[i].id] = true
            data.push(arr[i])
          }
        }
        return data
      }
      </pre>
    </div>
    <div class="algorithm-box">
      <p class="box-title">使用filter数组去重</p>
      <p>
        [1, 2, 2, 3, 4, 5, 5, 6, 6, 6, 7]:
        {{filterUnique([1, 2, 2, 3, 4, 5, 5, 6, 6, 6, 7])}}
      </p>
      <pre>
      filterUnique (arr) {
        return arr.filter((x, index, self) => self.indexOf(x) === index)
      }
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    reverseInteger (number) {
      var str = String(number)
      if (str.length > 9) return 0
      if (str.charAt(0) === '-') { // charAt(0)获取字符串第一个字符
        var str2 = str.substring(1, str.length)
        return parseInt('-' + str2.split('').reverse().join(''))
      }
      return parseInt(str.split('').reverse().join(''))
    },
    factorialize (num) {
      if (num < 0) {
        return -1
      } else if (num === 0) {
        return 0
      } else if (num === 1) {
        return 1
      } else {
        return (num * this.factorialize(num - 1))
      }
    },
    palindrome (str) {
      // 不是字母和数字的删掉str.replace(/[^a-zA-Z0-9]/g, '')
      var newStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split('')
      return newStr.join('') === newStr.reverse().join('') ? 'true' : 'false'
    },
    titleCase (str) {
      // toLowerCase变小写
      return str.toLowerCase().split(' ').map((item) => {
        return item.replace(item.charAt(0), item[0].toUpperCase())
      }).join(' ')
    },
    largestOfFour (arr) {
      var newArr = []
      for (var i = 0; i < arr.length; i++) {
        arr[i].sort(function (a, b) {
          return b - a
        })
        newArr.push(arr[i][0])
      }
      return newArr
    },
    confirmEnding (str, target) {
      // 字符串的substr方法如果是负数的话就是从后面倒数开始截取
      return str.substr(-target.length) === target ? 'true' : 'false'
    },
    chunk (arr, size) {
      var newArr = []
      for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size))
      }
      return newArr
    },
    mutation (str1, str2) {
      var arr1 = str1.split('')
      var arr2 = str2.split('')
      for (var i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(str2[i]) === -1) {
          return 'false'
        }
      }
      return 'true'
    },
    unique (arr) {
      let hashTable = {}
      let data = []
      for (let i = 0; i < arr.length; i++) {
        if (!hashTable[arr[i]]) {
          hashTable[arr[i]] = true
          data.push(arr[i])
        }
      }
      return data
    },
    getCamelCase (str) {
      let arr = str.split('-')
      return arr.map((item, index) => {
        item = item.toLowerCase()
        if (index === 0) {
          return item
        } else {
          return item.charAt(0).toUpperCase() + item.slice(1)
        }
      }).join('')
    },
    changeAttribute (arr) {
      for (let i in arr) { // arr是数组，i是数字
        for (let j in arr[i]) { // arr[i]是对象，j是key
          if (j === 'group') {
            arr[i]['group' + (Number(i) + Number(1))] = arr[i][j]
            delete arr[i]['group']
          }
        }
      }
      return arr
    },
    replaceAttribute () {
      let arr = [{label: '1', children: [{label: '2'}, {label: '3'}]}]
      let jsonStr = JSON.stringify(arr)
      jsonStr = jsonStr.replace(new RegExp('label', 'g'), 'title')
      // jsonStr = jsonStr.replace(/label/g, 'title')
      arr = JSON.parse(jsonStr)
      return arr
    },
    randomSortArray (arr) {
      const length = arr.length
      for (let i = 0; i < length; i++) {
        const x = Math.floor(Math.random() * length)
        const y = Math.floor(Math.random() * length)
        const temp = arr[x]
        arr[x] = arr[y]
        arr[y] = temp
      }
      return arr
    },
    unitTransformation (num, point) {
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 5) {
        return numStr
      } else if (numStr.length >= 5 && numStr.length <= 8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
      } else if (numStr.length > 8) {
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
    },
    objUnique () {
      let arr1 = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
      ]
      let arr2 = [
        {id: 5},
        {id: 6},
        {id: 3},
        {id: 4}
      ]
      let arr = arr1.concat(arr2)
      let hashTable = {}
      let data = []
      for (let i = 0; i < arr.length; i++) {
        if (!hashTable[arr[i].id]) {
          hashTable[arr[i].id] = true
          data.push(arr[i])
        }
      }
      return data
    },
    filterUnique (arr) {
      return arr.filter((x, index, self) => self.indexOf(x) === index)
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
