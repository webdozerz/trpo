<template>
  <transition name="fade">
    <div
      v-if="isShow"
      class="cr-modal"
      @click.self="backgroundClick"
    >
      <cr-modal-box
        v-if="currentModalKey === modals.signIn"
        :title="'Sign in'"
      >
        <div class="cry-modal__content auth__content">
          {{ options.text }}
          <div class="field__items">
            <div class="field__item">
              <div class="field__label">
                l  abel
              </div>
              <div class="field__body">
                <input type="text">
              </div>
            </div>
          </div>
        </div>
      </cr-modal-box>
      <cr-modal-box
        v-if="currentModalKey === modals.default"
        :title="options.title || 'Default'"
      >
        <div class="cry-modal__content">
          {{ options.text }}
        </div>
      </cr-modal-box>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import modals from '@/store/modals/modals';

export default {
  components: {
  },
  data: () => ({
    modals,
    input: '',
  }),
  computed: {
    ...mapGetters({
      isShow: 'modals/getIsShow',
      currentModalKey: 'modals/getCurrentModalKey',
      options: 'modals/getOptions',
    }),
  },
  methods: {
    backgroundClick() {
      if (!this.options.isUnclosable) {
        this.close();
      }
    },
    close() {
      this.CloseModal();
    },
  },
};
</script>
<style lang="scss" scoped>
.cr-modal {
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1400;
  text-align: center;
  &:after {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 100%;
    content: "";
  }
  &::v-deep {
    .cr-modal {
      @include modal;
    }
  }
}
</style>
