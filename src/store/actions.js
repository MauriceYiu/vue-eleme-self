import * as types from './mutationTypes';
export default {
  saveCityId({
    commit
  }, city_id) {
    commit(types.SAVE_CITY_ID, city_id);
  },
  saveGeohash({
    commit
  }, geohash) {
    commit(types.SAVE_GEO_HASH, geohash);
  }
}
