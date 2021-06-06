<template>
  <div
    v-if="guestInfo"
    class="invoice"
  >
    <div class="invoice__actions no-print">
      <b-btn
        variant="outline-info"
        @click="printInvoice()"
      >
        Печать
      </b-btn>
    </div>
    <div class="invoice__title">
      Счет №{{ Math.floor(Math.random() * 1000000) }} от договора №{{ Math.floor(Math.random() * 1000000) }}
    </div>
    <b-table
      :fields="fields"
      :items="guestInfo.invoice.additionalServices"
    />
    <div
      v-if="guestInfo.invoice.additionalServices.length"
      class="info__item"
    >
      Итого: {{ totalSum(guestInfo.invoice.additionalServices) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoicePage',
  data: () => ({
    guestInfo: null,
  }),
  computed: {
    fields() {
      return [
        {
          label: 'Наименование',
          key: 'name',
        },
        {
          label: 'Количество',
          key: 'count',
        },
        {
          label: 'Стоимость',
          key: 'cost',
        },
        {
          label: 'Сумма',
          key: 'sum',
        },
      ];
    },
  },
  async mounted() {
    await this.getUserInfo();
  },
  methods: {
    printInvoice() {
      window.print();
    },
    async getUserInfo() {
      const ref = await this.$fire.firestore.collection('guest').doc(this.$route.params.invoice);
      try {
        const refDoc = await ref.get();
        this.guestInfo = refDoc.data();
        ref.onSnapshot((doc) => {
          this.guestInfo = doc.data();
        });
      } catch (e) {
        this.showToast(e, 'Ошибка');
      }
    },
    totalSum(array) {
      let total = 0;
      if (array.length) {
        array.forEach((item) => {
          total += +item.sum;
        });
        return total;
      }
      return total;
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice {
  &__actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    margin: 20px 0;
  }
  &__title {
    margin-bottom: 20px;
  }
}
@media print {
  .no-print {
    visibility: hidden;
  }
}
</style>
