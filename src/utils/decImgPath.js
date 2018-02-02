//传递过来的图片地址需要处理后才能正常使用
export const getImgPath = (path) => {
  let suffix;
  if (!path) {
    return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
  }
  if (path.indexOf('jpeg') !== -1) {
    suffix = '.jpeg'
  } else {
    suffix = '.png'
  }
  let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
  return 'https://fuss10.elemecdn.com' + url
}
