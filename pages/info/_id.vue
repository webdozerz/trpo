<template>
  <div
    v-if="info"
    class="content"
  >
    <div class="info">
      <div class="info__actions">
        <b-btn
          v-if="info.rooms.number"
          variant="outline-danger"
          @click="createInvoice()"
        >
          Выставить счет
        </b-btn>
        <b-btn
          v-if="info.rooms.number"
          v-b-modal.modal-off-contract
          variant="outline-danger"
        >
          Завершить договор
        </b-btn>
        <b-btn
          v-if="info.rooms.number"
          variant="outline-info"
          @click="printContract()"
        >
          Распечатать договор
        </b-btn>
        <b-button
          v-if="info.rooms.number"
          v-b-modal.modal-add
          variant="outline-info"
        >
          Добавить доп. сервис
        </b-button>
      </div>
      <div class="info__items">
        <div class="info__item">
          ФИО: {{ info.profile.fio }}
        </div>
        <div
          v-if="info.rooms.number"
          class="info__item"
        >
          Номер: {{ info.rooms.number }}
        </div>
        <div
          v-if="info.rooms.days"
          class="info__item"
        >
          Количество дней: {{ info.rooms.days }}
        </div>
        <div class="info__item">
          Телефон: {{ info.profile.phone }}
        </div>
        <div class="info__item">
          Пасспортные данные: {{ info.profile.passportDetails }}
        </div>
        <div class="info__item">
          Место регистрации: {{ info.profile.placeOfRegistration }}
        </div>
        <div
          v-if="info.invoice.dailyServices && info.rooms.number"
          class="info__item"
        >
          Дневные сервисы:
          <ul>
            <li>
              Завтрак:
              <span v-if="info.invoice.dailyServices.breakfast">
                Да
              </span>
              <span v-else>
                Нет
              </span>
            </li>
            <li>
              Обед:
              <span v-if="info.invoice.dailyServices.lunch">
                Да
              </span>
              <span v-else>
                Нет
              </span>
            </li>
            <li>
              Ужин:
              <span v-if="info.invoice.dailyServices.dinner">
                Да
              </span>
              <span v-else>
                Нет
              </span>
            </li>
            <li>
              Уборка:
              <span v-if="info.invoice.dailyServices.cleaning">
                Да
              </span>
              <span v-else>
                Нет
              </span>
            </li>
          </ul>
        </div>
        <div
          v-if="info.rooms.number"
          class="info__item"
        >
          <div class="info__actions">
            <span>
              Дополнительные сервисы:
            </span>
          </div>
          <b-table
            :fields="fields"
            :items="info.invoice.additionalServices"
          />
        </div>
        <div
          v-if="info.invoice.additionalServices.length"
          class="info__item"
        >
          Итого: {{ totalSum(info.invoice.additionalServices) }}
        </div>
      </div>
    </div>
    <b-modal
      id="modal-add"
      centered
      title="Добавить дополнительный сервис"
      @ok="addAdditionalService"
    >
      <div>
        <div class="info__items">
          <b-form-input
            v-model="additional.name"
            placeholder="Введите наименовение"
          />
          <b-form-input
            v-model="additional.count"
            type="number"
            placeholder="Введите количество"
          />
          <b-form-input
            v-model="additional.cost"
            type="number"
            placeholder="Введите стоимость"
          />
        </div>
      </div>
    </b-modal>
    <b-modal
      id="modal-off-contract"
      centered
      title="Подтвердите действие"
      @ok="disableContract()"
    >
      Вы уверены ?
    </b-modal>
  </div>
</template>
<script>
import firebase from 'firebase/app';

export default {
  name: 'Info',
  data: () => ({
    info: null,
    additional: {
      name: '',
      count: null,
      cost: null,
    },
  }),
  async fetch() {
    await this.getUserInfo();
  },
  computed: {
    summary() {
      return +this.additional.count * +this.additional.cost;
    },
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
  methods: {
    createInvoice() {
      this.$router.push(`/invoice/${this.$route.params.id}`);
    },
    async disableContract() {
      const ref = await this.$fire.firestore.collection('guest').doc(this.$route.params.id);
      try {
        ref.update({
          'invoice.dailyServices': {
            breakfast: false,
            cleaning: false,
            dinner: false,
            lunch: false,
          },
          rooms: {
            current: null,
            number: null,
            days: null,
          },
          'invoice.additionalServices': [],
        });
        await this.getUserInfo();
      } catch (e) {
        this.showToast(e, 'Ошибка');
      }
    },
    printContract() {
      const wnd = window.open('/Dogovor-o-predostavlenii-gostinichnyh-uslug.pdf');
      wnd.print();
    },
    async addAdditionalService() {
      const docData = this.additional;
      docData.sum = this.summary;
      const ref = await this.$fire.firestore.collection('guest').doc(this.$route.params.id);
      try {
        ref.update({
          'invoice.additionalServices': firebase.firestore.FieldValue.arrayUnion(docData),
        });
        await this.getUserInfo();
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
    async getUserInfo() {
      const ref = await this.$fire.firestore.collection('guest').doc(this.$route.params.id);
      try {
        const refDoc = await ref.get();
        this.info = refDoc.data();
        ref.onSnapshot((doc) => {
          this.info = doc.data();
        });
      } catch (e) {
        this.showToast(e, 'Ошибка');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
}
.info {
  width: 100%;
  &__actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    align-items: center;
    margin: 20px 0;
  }
  &__items {
     display: grid;
     grid-template-columns: 1fr;
     grid-gap: 20px;
  }
}
</style>
