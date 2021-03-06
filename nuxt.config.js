export default {
  ssr: true,
  target: 'static',
  head: {
    title: 'ТРПО',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;800&display=swap' },
    ],
  },
  css: [],
  plugins: [
    {
      src: '@plugins/main.js',
    },
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
  ],
  build: {
    babel: {
      compact: false,
    },
  },
  styleResources: {
    scss: ['./assets/scss/main.scss'],
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
    'cookie-universal-nuxt',
    '@nuxtjs/firebase',
  ],
  firebase: {
    config: {
      apiKey: 'AIzaSyCBY9PLdSLEVbwcbc_xjAPxrEHA0Bs3OeY',
      authDomain: 'trpo-1efe3.firebaseapp.com',
      projectId: 'trpo-1efe3',
      storageBucket: 'trpo-1efe3.appspot.com',
      messagingSenderId: '467557696',
      appId: '1:467557696:web:8e4c92d0c81147846beea5',
    },
    services: {
      firestore: true,
      functions: true,
      database: true,
    },
  },
  firestore: {
    enablePersistence: true,
    emulatorPort: 8080,
    emulatorHost: 'localhost',
  },
  axios: {
    baseURL: process.env.BASE_URL,
  },
};
