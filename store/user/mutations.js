/* eslint-disable no-param-reassign */

export default {
  setOldTokens(state, { access, refresh, status }) {
    state.tokens.access = access;
    state.tokens.refresh = refresh;
    state.status = status;
  },
  setNewTokens(state, { access, refresh, status }) {
    state.tokens.access = access;
    state.tokens.refresh = refresh;
    state.status = status;

    window.$cookies.set('access', access, { path: '/' });
    window.$cookies.set('refresh', refresh, { path: '/' });

    if (status) {
      window.$cookies.set('status', status, { path: '/' });
    }
  },
  logOut(state) {
    window.$cookies.remove('access');
    window.$cookies.remove('refresh');
    window.$cookies.remove('status');

    state.id = '';
    state.profile = {};
    state.wallets = [];
    state.tokens.access = '';
    state.tokens.refresh = '';
    state.status = 0;
  },
  setUserInfo(state, user) {
    state.profile = {
      email: user.email,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    };

    state.id = user.id;
    state.wallets = user.wallets;
    state.status = user.status;
  },
  changeUserStatus(state, status) {
    state.status = status;
    window.$cookies.set('status', status, { path: '/' });
  },
};
