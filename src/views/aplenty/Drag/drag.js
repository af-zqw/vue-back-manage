/**
  首先鼠标按下（onmousedown）

  记录目标元素当前的 left和top 值

  鼠标移动（onmousemove）

  计算每次移动的横向距离 （disX） 和纵向距离 （disY）
  并改变元素的left（left = left + disX）和top（top = top + disY）值

  鼠标松开（onmouseup）

  完成一次拖拽，做一些收尾工作

  left 和 top 值容易获取，关键是 disX 和 disY 怎么计算呢？
  容我先普及一哈：

  clientX ：表示鼠标当前的 X 坐标

  clientY ：表示鼠标当前的 Y 坐标

  那么伪代码就是：

  disX = 鼠标按下时的 clientX - 鼠标松开时的 clientX

  disY = 鼠标按下时的 clientY - 鼠标松开时的 clientY
 */

// 这个助手方法下面会用到，用来获取 css 相关属性值
const getAttr = (obj, key) => (
  obj.currentStyle
    ? obj.currentStyle[key]
    : window.getComputedStyle(obj, false)[key]
)

export const vDrag = {
  inserted (el) {
    /**
     * 这里是跟据 dialog 组件的 dom 结构来写的
     * target: dialog 组件的容器元素
     * header：dialog 组件的头部区域，也是就是拖拽的区域
     */
    const target = el.children[0]
    const header = target.children[0]

    // 鼠标手型
    target.style.position = 'relative'
    header.style.cursor = 'move'
    header.onmousedown = (e) => {
      // 记录按下时鼠标的坐标和目标元素的 left、top 值
      const currentX = e.clientX
      const currentY = e.clientY
      const left = parseInt(getAttr(target, 'left'))
      const top = parseInt(getAttr(target, 'top'))

      const leftWidth = target.offsetLeft // 元素距离左边的距离
      const bodyWidth = parseInt(getAttr(document.body, 'width')) // 屏幕的宽度
      const elWidth = parseInt(getAttr(target, 'width')) // 元素的宽度
      const rightWidth = bodyWidth - leftWidth - elWidth // 元素距离右边的距离
      const topWidth = target.offsetTop // 元素距离上边的距离
      const bodyHeight = parseInt(getAttr(document.body, 'height')) // 屏幕的高度
      const elHeight = parseInt(getAttr(target, 'height')) // 元素的高度
      const bottomWidth = bodyHeight - elHeight - topWidth
      document.onmousemove = (event) => {
        // 鼠标移动时计算每次移动的距离，并改变拖拽元素的定位
        let disX = event.clientX - currentX
        let disY = event.clientY - currentY
        if (disX < 0) { // 向左移动
          if ((disX + leftWidth) <= 0) {
            disX = -leftWidth
          }
        } else { // 向右移动
          if (disX >= rightWidth) {
            disX = rightWidth
          }
        }
        if (disY < 0) { // 向上移动
          if ((disY + topWidth) <= 0) {
            disY = -topWidth
          }
        } else {
          if (disY >= bottomWidth) {
            disY = bottomWidth
          }
        }
        target.style.left = `${left + disX}px`
        target.style.top = `${top + disY}px`

        // 阻止事件的默认行为，可以解决选中文本的时候拖不动
        return false
      }

      // 鼠标松开时，拖拽结束
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    var borderTop = document.createElement('div')
    borderTop.style.position = 'absolute'
    borderTop.style.height = '1px'
    borderTop.style.left = borderTop.style.top = borderTop.style.right = 0
    borderTop.style.cursor = 'ns-resize'
    target.appendChild(borderTop)
  },

  // 每次重新打开 dialog 时，要将其还原
  update (el) {
    const target = el.children[0]
    target.style.left = ''
    target.style.top = ''
  },

  // 最后卸载时，清除事件绑定
  unbind (el) {
    const header = el.children[0].children[0]
    header.onmousedown = null
  }
}
