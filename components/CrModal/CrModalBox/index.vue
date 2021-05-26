<template>
  <div class="cr-modal__box">
    <div class="cr-modal__body">
      <div class="cr-modal__header">
        <div class="cr-modal__title">
          {{ options.title || title }}
        </div>
        <button
          v-if="!options.isUnclosable && !isUnclosable"
          class="cr-modal__x"
          @click="close()"
        >
          x
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    isUnclosable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
  },
  methods: {
    close() {
      this.CloseModal();
    },
  },
};
</script>
<style lang="scss" scoped>
//
</style>
