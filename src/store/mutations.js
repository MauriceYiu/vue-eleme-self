import * as types from './mutationTypes';
export default {
  [types.SAVE_CITY_ID](state, city_id) {
    state.city_id = city_id;
  }
}
