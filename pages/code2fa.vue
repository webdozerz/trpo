<template>
  <div class="container">
    <div class="two-factor">
      <TwoFactor
        ref="twofa"
        v-model="code2fa"
        :count="6"
      />
      <button
        @click="resend"
      >
        Resend
      </button>
      {{ code2fa }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code2fa: '',
    };
  },
  methods: {
    async resend() {
      await this.$refs.twofa.clearCode();
      // do resend
    },
  },
};
</script>

<style lang="scss" scoped>
.two-factor {
  display: flex;
}
</style>
