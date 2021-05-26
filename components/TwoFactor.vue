<template>
  <div class="cs-twofa">
    <div class="cs-twofa__hide-result">
      {{ code }}
    </div>
    <input
      v-if="count >= 1"
      ref="input0"
      v-model="input0"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(0)"
      @keydown.delete="handleDelete(0, $event)"
      @input="handleInput(0)"
    >
    <input
      v-if="count >= 2"
      ref="input1"
      v-model="input1"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(1)"
      @keydown.delete="handleDelete(1, $event)"
      @input="handleInput(1)"
    >
    <input
      v-if="count >= 3"
      ref="input2"
      v-model="input2"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(2)"
      @keydown.delete="handleDelete(2, $event)"
      @input="handleInput(2)"
    >
    <input
      v-if="count >= 4"
      ref="input3"
      v-model="input3"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(3)"
      @keydown.delete="handleDelete(3, $event)"
      @input="handleInput(3)"
    >
    <input
      v-if="count >= 5"
      ref="input4"
      v-model="input4"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(4)"
      @keydown.delete="handleDelete(4, $event)"
      @input="handleInput(4)"
    >
    <input
      v-if="count >= 6"
      ref="input5"
      v-model="input5"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(5)"
      @keydown.delete="handleDelete(5, $event)"
      @input="handleInput(5)"
    >
    <input
      v-if="count >= 7"
      ref="input6"
      v-model="input6"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(6)"
      @keydown.delete="handleDelete(6, $event)"
      @input="handleInput(6)"
    >
    <input
      v-if="count >= 8"
      ref="input7"
      v-model="input7"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(7)"
      @keydown.delete="handleDelete(7, $event)"
      @input="handleInput(7)"
    >
    <input
      v-if="count >= 9"
      ref="input8"
      v-model="input8"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(8)"
      @keydown.delete="handleDelete(8, $event)"
      @input="handleInput(8)"
    >
    <input
      v-if="count >= 10"
      ref="input9"
      v-model="input9"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(9)"
      @keydown.delete="handleDelete(9, $event)"
      @input="handleInput(9)"
    >
    <input
      v-if="count >= 11"
      ref="input10"
      v-model="input10"
      v-mask="'#'"
      class="cs-twofa__input"
      type="text"
      autocomplete="off"
      @focus="handleFocus(10)"
      @keydown.delete="handleDelete(10, $event)"
      @input="handleInput(10)"
    >
  </div>
</template>

<script>
export default {
  props: {
    // Количество полей для цифр (максимум 11, но можно добавить еще)
    count: {
      type: Number,
      default: 7,
    },
  },
  data() {
    return {
      // Не массив, потому что input'ы не меняются при изменении массива
      // И потому что у меня не получилось передать в ref значение из props
      // TODO if you want how
      input0: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      input10: '',
    };
  },
  computed: {
    code() {
      const inputs = [
        this.input0,
        this.input1,
        this.input2,
        this.input3,
        this.input4,
        this.input5,
        this.input6,
        this.input7,
        this.input8,
        this.input9,
        this.input10,
      ];
      this.$emit('input', inputs.join(''));
      return inputs.join('');
    },
  },
  methods: {
    // This monster created by Novikov D.E.
    handleDelete(el, event) {
      event.preventDefault();
      if (!this.$refs[`input${el + 1}`]) {
        if (this[`input${el}`] === '') {
          this[`input${el - 1}`] = '';
          this.$refs[`input${el - 1}`].focus();
        } else {
          this[`input${el}`] = '';
        }
      } else if (this.$refs[`input${el - 1}`]) {
        this[`input${el - 1}`] = '';
        this.$refs[`input${el - 1}`].focus();
      }
    },
    handleFocus(el) {
      if (this.$refs[`input${el - 1}`] && !this[`input${el - 1}`]) this.$refs[`input${el - 1}`].focus();
      if (this.$refs[`input${el + 1}`] && this[`input${el}`]) this.$refs[`input${el + 1}`].focus();
    },
    handleInput(el) {
      // eslint-disable-next-line
      if (isNaN(this[`input${el}`])) this[`input${el}`] = '';
      if (this[`input${el}`] !== '') {
        if (this.$refs[`input${el + 1}`]) {
          this.$refs[`input${el + 1}`].focus();
        }
      }
    },
    clearCode() {
      this.input0 = '';
      this.input1 = '';
      this.input2 = '';
      this.input3 = '';
      this.input4 = '';
      this.input5 = '';
      this.input6 = '';
      this.input7 = '';
      this.input8 = '';
      this.input9 = '';
      this.input10 = '';

      return 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.cs-twofa {
  display: flex;
  justify-content: space-between;
  &__hide-result {
    display: none;
  }
  &__input {
    margin: 0 10px;
    height: 47px;
    border: 1px solid grey;
    border-radius: 1px;
    width: 100%;
    font-weight: 300;
    font-size: 20px;
    text-align: center;
    transition: .3s;
    max-width: 45px;
    &:focus {
      border-color: black;
    }
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
