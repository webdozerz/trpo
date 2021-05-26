/* eslint-disable no-param-reassign */

// temp

export default function ({
  $axios, store, redirect, app,
}) {
  $axios.onRequest((config) => {
    if (store.getters['user/isAuth']) {
      if (config.url.split('/').pop() === 'refresh-token') {
        config.headers.authorization = `Bearer ${store.getters['user/refreshToken']}`;
      } else {
        config.headers.authorization = `Bearer ${store.getters['user/accessToken']}`;
      }
    }
  });

  $axios.onError(async (error) => {
    const originalRequest = error.config;

    if (app.$cookies.get('refresh')) {
      if ((error.response.status === 401 && originalRequest.url.split('/').pop() === 'refresh-token')) {
        store.commit('user/logOut');
        redirect('/sign-in');
        throw error;
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        await store.dispatch('user/refreshTokens'); // свой action для refrash token'а
        return $axios(originalRequest);
      }
    }

    if (!originalRequest._retry) {
      if (process.client && error.response.data && error.response.data.msg !== 'Totp required') {
        app.$notify({ // возможно нужно убрать
          type: 'error',
          text: error.response.data.msg,
          closeOnClick: true,
        });
      }
    }
    throw error;
  });

  const access = app.$cookies.get('access');
  const refresh = app.$cookies.get('refresh');
  const status = app.$cookies.get('status');

  if (access && refresh) {
    store.commit('user/setOldTokens', { access, refresh, status });
  }

  if (store.getters['user/accessToken']) {
    store.dispatch('user/authRequest');
  }
}
