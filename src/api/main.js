import axios from 'axios';
import {
  ERR_OK
} from './config';

export const getClass = (geohash, group_type = 1, flags = 'F') => {
  return axios({
    url: '/v2/index_entry',
    method: 'GET',
    params: {
      'tgeohash': geohash,
      'group_type': group_type,
      'flags[]': flags
    }
  }).then((response) => {
    if (response.status == ERR_OK) {
      return Promise.resolve(response.data);
    }
  })
}

// 获取附近商家
export const getNearByStore = (latitude, longitude, extras='activities', keyword='', restaurant_category_id='', restaurant_category_ids='', order_by='', delivery_mode='') => {
  return axios({
    url: '/shopping/restaurants',
    method: 'GET',
    params: {
      "latitude": latitude,
      "longitude": longitude,
      "offset": 0,
      "limit": 20,
      "extras[]": extras,
      "keyword": keyword,
      "restaurant_category_id": restaurant_category_id,
      "restaurant_category_ids[]": restaurant_category_ids,
      "order_by": order_by,
      "delivery_mode[]":delivery_mode
    }
  }).then((response) => {
    if (response.status == ERR_OK) {
      return Promise.resolve(response.data);
    }
  })
}
