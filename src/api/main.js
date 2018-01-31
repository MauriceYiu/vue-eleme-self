import axios from 'axios';
import {
  ERR_OK
} from './config';

export const getClass = (geohash,group_type=1,flags='F') => {
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