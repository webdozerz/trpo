export default {
  async  authRequest({ dispatch }) {
    await dispatch('getUserData');

    // if (state.status) {
    //   await dispatch(GET_2FA_STATUS);
    //   // ---
    // }
  },
  async signUp({ commit }, user) {
    const resp = await this.$axios.$post('/auth/register', user);
    commit('setNewTokens', resp.result);
  },
  async validateEmail({ dispatch }, code) {
    await this.$axios.$post('/auth/validate-email', code);
    await dispatch('authRequest');
  },
  async signIn({ commit }, user) {
    const resp = await this.$axios.$post('/auth/login', user);
    commit('setNewTokens', resp.result);

    return resp.result;
  },
  async getUserData({ commit }) {
    const resp = await this.$axios.$get('/profile/me');
    commit('setUserInfo', resp.result);
  },
  async refreshTokens({ commit }) {
    const resp = await this.$axios.$post('/auth/refresh-token');
    commit('setNewTokens', resp.result);
  },
};
