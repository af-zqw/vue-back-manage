/*
加载地图
*/
function remoteLoad (url) {
  return createScript(url)
  
  function createScript (url) {
    let scriptElement = document.createElement('script')
    document.body.appendChild(scriptElement)
    let promise = new Promise((resolve, reject) => {
      scriptElement.addEventListener('load', e => {
        removeScript(scriptElement)
        resolve(e)
      }, false)

      scriptElement.addEventListener('error', e => {
        removeScript(scriptElement)
        reject(e)
      }, false)
    })

    scriptElement.src = url

    return promise
  }

  /**
   * 移除script标签
   * @param scriptElement script dom
   */
  function removeScript (scriptElement) {
    document.body.removeChild(scriptElement)
  }
}
export{
  remoteLoad
}