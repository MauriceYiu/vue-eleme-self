// 存储localStorage
export const saveLocal = (name, val) => {
  window.localStorage.setItem(name, val);
}
// 获取localStorage
export const getLocal = (name) => {
  return window.localStorage.getItem(name);
}
// 删除localStorage
export const removeLocal = (name) => {
  window.localStorage.removeItem(name);
}
// 清空localStorage
export const clearLocal = () => {
  window.localStorage.clear();
}
