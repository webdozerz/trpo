<template>
  <div class="prime-layout">
    <div class="prime-layout__template">
      <div class="prime-layout__menu menu">
        <div class="menu__right menu__logo">
          Frontend starter kit
        </div>
        <div class="menu__themes themes">
          <button
            class="themes__btn"
            :class="{'themes__btn_active': CurrentTheme === 'dark'}"
            @click="ChangeTheme('dark')"
          >
            Dark
          </button>
          <button
            class="themes__btn"
            :class="{'themes__btn_active': CurrentTheme === 'system'}"
            @click="ChangeTheme('system')"
          >
            Default
          </button>
        </div>
      </div>
      <div class="prime-layout__slot">
        <slot />
      </div>
    </div>
    <cr-modal />
  </div>
</template>
<script>
export default {
  methods: {

  },
};
</script>
<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  $height: 90px;
  height: $height;
  background: $bg;
  box-shadow: $shadow;
  &__logo {
    font-size: 26px;
    font-weight: 600;
  }
}
.themes {
  &__btn {
    @include btn-filter;
    height: 40px;
    color: #FFFFFF;
    width: 100px;
    background: #546980;
    &_active {
      background: $color-primary;
    }
  }
}
.prime-layout {
  background: $bg;
  height: 100vh;
  overflow-y: auto;
  &__slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 120;
  }
  &__template {
    min-height: 100vh;
    display: grid;
    grid-template-rows: min-content auto;
  }
}
</style>
