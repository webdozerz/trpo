export default {

  async show({ commit }, value) {
    commit('setIsShow', true);
    commit('setCurrentModalKey', value.key);
    commit('setOptions', value);
  },
  async hide({ commit }) {
    commit('setIsShow', false);
    commit('setCurrentModalKey', '');
    commit('setOptions', {});
  },
};
