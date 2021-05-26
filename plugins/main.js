import Vue from 'vue';

Vue.mixin({
  computed: {
    CurrentTheme() {
      return this.$colorMode.preference;
    },
  },
  methods: {
    ChangeTheme(value) {
      this.$colorMode.preference = value;
    },
    CloseModal() {
      this.$store.dispatch('modals/hide');
    },
    OpenModal(options) {
      this.$store.dispatch('modals/show', options);
    },
  },
});
