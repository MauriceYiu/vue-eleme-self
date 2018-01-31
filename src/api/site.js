import axios from 'axios';
import {
  ERR_OK
} from './config'
// 获取当前城市

export const getNowSite = () => {
  return axios({
    url: '/v1/cities',
    method: 'GET',
    params: {
      type: 'guess'
    }
  }).then((response) => {
    if (response.status == ERR_OK) {
      return Promise.resolve(response.data);
    }
  })
}

// 获取热门城市

export const getHotCities = () => {
  return axios({
    url: '/v1/cities',
    method: 'GET',
    params: {
      type: 'hot'
    }
  }).then((response) => {
    if (response.status == ERR_OK) {
      return Promise.resolve(response.data);
    }
  })
}

// 获取其他城市

export const getGroupCities = () => {
  return axios({
    url: '/v1/cities',
    method: 'GET',
    params: {
      type: 'group'
    }
  }).then((response) => {
    if (response.status == ERR_OK) {
      return Promise.resolve(response.data);
    }
  })
}

// 进入城市后,搜索地点
export const searchSite = (cityId, keyWord) => {
  return axios({
    url: '/v1/pois',
    method: 'GET',
    params: {
      type: 'search',
      city_id: cityId,
      keyword: keyWord
    }
  }).then(response => {
    return Promise.resolve(response.data);
  })
}
// 获取当前城市
export const getNowCity = (cityId) => {
  return axios({
    url: '/v1/cities/'+cityId,
    method: 'GET'
  }).then(response => {
    return Promise.resolve(response.data);
  })
}
