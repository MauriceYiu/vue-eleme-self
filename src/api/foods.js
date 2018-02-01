import axios from 'axios';
import {
  ERR_OK
} from './config';

export const getCategory = (latitude, longitude) => {
  return axios({
    url: '/shopping/v2/restaurant/category',
    method: 'GET',
    params: {
      'latitude': latitude,
      'longitude': longitude,
    }
  }).then((response) => {
    if (response.status == ERR_OK) {
      return Promise.resolve(response.data);
    }
  })
}