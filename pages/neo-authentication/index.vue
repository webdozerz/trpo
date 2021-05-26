<template>
  <cr-container>
    <div class="auth">
      <button
        class="auth__btn"
        @click="show"
      >
        Modal test
      </button>
    </div>
  </cr-container>
</template>
<script>
import modals from '@/store/modals/modals';

export default {
  methods: {
    show() {
      this.OpenModal({ key: modals.signIn });
    },
  },
};
</script>
<style lang="scss" scoped>
.auth {
  @include container;
  margin: 40px 0;
  &__btn {
    //background: ;
    @include btn-filter;
    height: 40px;
    width: 200px;
    background: $color-primary;
  }
}
</style>
