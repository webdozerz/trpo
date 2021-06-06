import Vue from 'vue';

Vue.mixin({
  methods: {
    showToast(message, title) {
      this.$bvToast.toast(message, {
        title,
        toaster: 'b-toaster-bottom-right',
        appendToast: true,
      });
    },
  },
});
