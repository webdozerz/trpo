<template>
  <div class="dark-theme authentication authentication__container">
    <div class="theme-switcher">
      <button
        class="theme-switcher__btn"
        @click="changeTheme('dark')"
      >
        Dark
      </button>
      <button
        class="theme-switcher__btn"
        @click="changeTheme('system')"
      >
        System
      </button>
    </div>
    <ValidationObserver v-slot="{ invalid }">
      <b-modal
        id="modal-confirm-email"
        centered
        title="Confirm email"
      >
        <div class="authentication__field vField">
          <div class="vField__label">
            Code
          </div>
          <ValidationProvider
            v-slot="{ errors }"
            class="vField__input"
            mode="lazy"
            rules="required"
          >
            <b-form-input
              v-model="emailCode"
              placeholder="Enter code"
            />
            <span class="vField__er-box">
              <span v-if="errors[0]">{{ errors[0] }}</span>
            </span>
          </ValidationProvider>
        </div>
        <template v-slot:modal-footer>
          <b-button
            size="sm"
            variant="success"
            :disabled="invalid"
            @click="onConfirmCode"
          >
            OK
          </b-button>
        </template>
      </b-modal>
    </ValidationObserver>
    <div class="authentication__form">
      <div class="authentication__swither swither">
        <button
          class="swither__item"
          :class="{'swither__item_active': tab === 0}"
          @click="changeTab(0)"
        >
          Sign in
        </button>
        <button
          class="swither__item"
          :class="{'swither__item_active': tab === 1}"
          @click="changeTab(1)"
        >
          Sign up
        </button>
      </div>
      <div
        v-if="tab === 0"
        class="authentication__page"
      >
        <div class="authentication__title">
          Sign in
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <div class="authentication__fields">
            <div
              v-for="fieldItem in Object.keys(defaultSignInKeys())"
              :key="`authentication__field_sign-in-${fieldItem}`"
              class="authentication__field vField"
            >
              <div class="vField__label">
                {{ $t(`signIn.label-${fieldItem}`) }}
              </div>
              <ValidationProvider
                v-slot="{ errors }"
                class="vField__input"
                mode="lazy"
                :rules="signUpRules[fieldItem].veeValidate"
              >
                <b-form-input
                  v-model="signUp[fieldItem]"
                  :type="signUpRules[fieldItem].type || 'text'"
                  :placeholder="$t(`signIn.placeholder-${fieldItem}`)"
                />
                <span class="vField__er-box">
                  <span v-if="errors[0]">{{ errors[0] }}</span>
                  <span v-else>{{ serverErrorsSignIn[fieldItem] }}</span>
                </span>
              </ValidationProvider>
            </div>
          </div>
          <div class="authentication__bottom">
            <!--            <b-button-->
            <!--              size="lg"-->
            <!--              :disabled="invalid"-->
            <!--              class="authentication__btn"-->
            <!--              variant="primary"-->
            <!--              @click="onSignIn"-->
            <!--            >-->
            <!--              Sign in-->
            <!--            </b-button>-->
            <button
              :disabled="invalid"
              class="authentication__btn"
            >
              Sign in
            </button>
          </div>
        </ValidationObserver>
      </div>
      <div
        v-if="tab === 1"
        class="authentication__page"
      >
        <div class="authentication__title">
          Sign up
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <div class="authentication__fields">
            <div
              v-for="fieldItem in Object.keys(defaultSignUpKeys())"
              :key="`authentication__field_sign-up-${fieldItem}`"
              class="authentication__field vField"
            >
              <div class="vField__label">
                {{ $t(`signUp.label-${fieldItem}`) }}
              </div>
              <ValidationProvider
                v-slot="{ errors }"
                class="vField__input"
                mode="lazy"
                :rules="signUpRules[fieldItem].veeValidate"
              >
                <b-form-input
                  v-model="signUp[fieldItem]"
                  :type="signUpRules[fieldItem].type || 'text'"
                  :placeholder="$t(`signUp.placeholder-${fieldItem}`)"
                />
                <span class="vField__er-box">
                  <span v-if="errors[0]">{{ errors[0] }}</span>
                  <span v-else>{{ serverErrorsSignUp[fieldItem] }}</span>
                </span>
              </ValidationProvider>
            </div>
          </div>
          <div class="authentication__bottom">
            <b-button
              size="lg"
              :disabled="invalid"
              class="authentication__btn"
              variant="primary"
              @click="onSignUp"
            >
              Sign up
            </b-button>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data: () => ({
    tab: 0,
    emailCode: '',
    signIn: {},
    signUp: {},
    serverErrorsSignIn: {},
    serverErrorsSignUp: {},
    signInRules: {
      email: { veeValidate: 'email|required' },
      password: { veeValidate: 'required', type: 'password' },
    },
    signUpRules: {
      firstName: { veeValidate: 'required' },
      lastName: { veeValidate: 'required' },
      email: { veeValidate: 'email|required' },
      password: { veeValidate: 'required', type: 'password' },
      repeatPassword: { veeValidate: 'required', type: 'password' },
    },
  }),
  mounted() {
    this.resetForm();
    this.resetEr();
  },
  methods: {
    changeTheme(value) {
      this.$colorMode.preference = value;
    },
    changeTab(i) {
      this.resetForm();
      this.resetEr();
      this.tab = i;
    },
    resetForm() {
      this.signIn = this.defaultSignInKeys();
      this.signUp = this.defaultSignUpKeys();
    },
    resetEr() {
      this.serverErrorsSignIn = this.defaultSignInKeys();
      this.serverErrorsSignUp = this.defaultSignUpKeys();
    },
    defaultSignInKeys: () => ({
      email: '',
      password: '',
    }),
    defaultSignUpKeys: () => ({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    }),
    onConfirmCode() {
      this.$router.push('/hello');
      // this.$bvModal.hide('modal-confirm-email');
    },
    async onSignIn() {
      this.resetEr();
      const payload = {
        email: this.signUp.email,
        password: this.signUp.password,
      };
      try {
        await this.$store.dispatch('user/signIn', payload);
      } catch {
        this.serverErrorsSignIn = {
          email: 'Пример ошибки сервера',
          password: 'Пример ошибки сервера',
        };
      }
    },
    async onSignUp() {
      this.resetEr();
      const payload = {
        email: this.signUp.email,
        password: this.signUp.password,
      };
      try {
        await this.$store.dispatch('user/signUp', payload);
        this.$bvModal.show('modal-confirm-email');
      } catch {
        this.serverErrorsSignUp = {
          email: 'Пример ошибки сервера',
          password: 'Пример ошибки сервера',
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>

//.authentication__title {
//  background: $test;
//}

.vField {
  &__label {
    margin-bottom: 8px;
  }
  &__input {
    position: relative;
    display: flex;
    flex-direction: column;
    input {
      height: 46px;
    }
  }
  &__er-box {
    position: absolute;
    top: 100%;
    min-height: 13px;
    margin: 2px 0 0;
    font-size: 12px;
    color: #d52e2e;
    letter-spacing: .06em;
  }
}
.swither {
  display: flex;
  color: $color;
  &__item {
    outline: none;
    background: none;
    border: none;
    &:focus {
      outline: none!important;
    }
    width: 50%;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    padding-bottom: 5px;
    border-bottom: 2px solid transparent;
    &_active {
      border-color: #7cade2;
    }
  }
}
.theme-switcher {
  &__btn {
    @include btn-default;
    @include btn-filter;
    @include btn-blue;
    max-width: 50%;
  }
}
.authentication {
  font-style: Roboto;
  background-color: $bg;
  color: $color;
  &__btn {
    @include btn-default;
    @include btn-filter;
    @include btn-blue;
    max-width: 50%;
  }
  &__swither {
    margin-bottom: 30px;
  }
  &__container {
    padding: 40px 10px;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__form {
    padding: 30px;
    min-width: 600px;
    box-shadow: 0 0 50px rgba(123, 122, 119, 0.26);
  }
  &__title {
    font-style: normal;
    font-weight: 600;
    font-size: 35px;
    margin-bottom: 30px;
  }
  &__fields {
    margin-bottom: 30px;
  }
  &__field {
    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }
  &__bottom {
    justify-content: flex-end;
    display: flex;
  }
}
</style>
