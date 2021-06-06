<template>
  <div class="main">
    <div class="guest">
      <div class="guest__actions">
        <b-btn
          v-b-modal.modal-add
          variant="outline-primary"
        >
          Оформить договор
        </b-btn>
      </div>
      <div class="guest__items">
        <div
          v-for="(item, i) in guests"
          :key="i"
          class="guest__item"
          @click="showInfo(item)"
        >
          <div class="guest__text">
            ФИО: {{ item.data.profile.fio }}
          </div>
          <div
            v-if="item.data.rooms.number"
            class="guest__text"
          >
            Комната:
            <span class="guest__text guest__text_red">
              {{ item.data.rooms.number }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-add"
      centered
      title="Оформление нового договора"
      @ok="addGuest()"
    >
      <b-card no-body>
        <b-tabs
          v-model="tabIndex"
          card
          content-class="mt-3"
          fill
        >
          <b-tab
            no-body
            title="Новый гость"
          >
            <div class="info__body">
              <div class="info__items">
                Профиль
                <b-form-input
                  v-model="model.profile.fio"
                  placeholder="Введите ФИО"
                />
                <b-form-input
                  v-model="model.profile.phone"
                  placeholder="Введите телефон"
                />
                <b-form-input
                  v-model="model.profile.passportDetails"
                  placeholder="Введите пасспотные данные (серия, номер)"
                />
                <b-form-input
                  v-model="model.profile.placeOfRegistration"
                  placeholder="Введите данные места регистрации"
                />
                <div>
                  Дневные сервисы:
                  <b-form-checkbox
                    id="breakfast"
                    v-model="model.invoice.dailyServices.breakfast"
                    class="mt-2"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >
                    Завтрак
                  </b-form-checkbox>
                  <b-form-checkbox
                    id="dinner"
                    v-model="model.invoice.dailyServices.dinner"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >
                    Обед
                  </b-form-checkbox>
                  <b-form-checkbox
                    id="lunch"
                    v-model="model.invoice.dailyServices.lunch"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >
                    Ужин
                  </b-form-checkbox>
                  <b-form-checkbox
                    id="cleaning"
                    v-model="model.invoice.dailyServices.cleaning"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >
                    Уборка
                  </b-form-checkbox>
                </div>
                <div>
                  Выбор номера:
                  <b-form-select
                    v-model="model.rooms.current"
                    class="mt-2"
                    :options="formattedRoomsList"
                  >
                    <b-form-select-option
                      :value="null"
                      disabled
                    >
                      Выберите номер из списка
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <b-form-input
                  v-model="model.rooms.days"
                  placeholder="Введите количество дней"
                />
              </div>
            </div>
          </b-tab>
          <b-tab
            no-body
            title="Старый гость"
          >
            <div class="info__body">
              <div class="mb-4">
                Выберите гостя:
                <b-form-select
                  v-model="selectedGuest"
                  class="mt-2"
                  :options="formattedGuestsList"
                >
                  <b-form-select-option
                    :value="null"
                    disabled
                  >
                    Выберите гостя из списка
                  </b-form-select-option>
                </b-form-select>
              </div>
              Дневные сервисы:
              <b-form-checkbox
                id="breakfast"
                v-model="model.invoice.dailyServices.breakfast"
                class="mt-2"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                Завтрак
              </b-form-checkbox>
              <b-form-checkbox
                id="dinner"
                v-model="model.invoice.dailyServices.dinner"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                Обед
              </b-form-checkbox>
              <b-form-checkbox
                id="lunch"
                v-model="model.invoice.dailyServices.lunch"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                Ужин
              </b-form-checkbox>
              <b-form-checkbox
                id="cleaning"
                v-model="model.invoice.dailyServices.cleaning"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                Уборка
              </b-form-checkbox>
              <div class="mt-3">
                Выбор номера:
                <b-form-select
                  v-model="model.rooms.current"
                  class="mt-2"
                  :options="formattedRoomsList"
                >
                  <b-form-select-option
                    :value="null"
                    disabled
                  >
                    Выберите номер из списка
                  </b-form-select-option>
                </b-form-select>
              </div>
              <b-form-input
                v-model="model.rooms.days"
                class="mt-3"
                placeholder="Введите количество дней"
              />
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Guest',
  data: () => ({
    guests: [],
    rooms: [],
    tabIndex: 0,
    selectedGuest: null,
    model: {
      profile: {
        fio: '',
        passportDetails: '',
        placeOfRegistration: '',
        phone: '',
      },
      invoice: {
        additionalServices: [],
        dailyServices: {
          breakfast: false,
          cleaning: false,
          dinner: false,
          lunch: false,
        },
      },
      rooms: {
        current: null,
        number: null,
        days: null,
      },
    },
  }),
  computed: {
    formattedRoomsList() {
      const result = [];
      this.rooms.forEach((item) => {
        if (item.data.status === 0) {
          result.push({ text: item.data.number, value: item.id, id: item.id });
        }
      });
      return result;
    },
    formattedGuestsList() {
      const result = [];
      this.guests.forEach((item) => {
        result.push({
          text: item.data.profile.fio, value: item.id, id: item.id, profile: item.data.profile,
        });
      });
      return result;
    },
  },
  watch: {
    tabIndex: {
      immediate: true,
      handler(value) {
        if (value) {
          this.reset();
        }
      },
    },
    selectedGuest: {
      immediate: true,
      handler() {
        this.formattedGuestsList.forEach((item) => {
          if (this.selectedGuest === item.id) {
            this.model.profile = item.profile;
          }
        });
      },
    },
  },
  async created() {
    await this.getGuestsList();
    await this.getRoomsList();
  },
  methods: {
    reset() {
      this.selectedGuest = null;
      this.model = {
        profile: {
          fio: '',
          passportDetails: '',
          placeOfRegistration: '',
          phone: '',
        },
        invoice: {
          additionalServices: [],
          dailyServices: {
            breakfast: false,
            cleaning: false,
            dinner: false,
            lunch: false,
          },
        },
        rooms: {
          current: null,
          number: null,
        },
      };
    },
    async getGuestsList() {
      const ref = await this.$fire.firestore.collection('guest');
      try {
        ref.onSnapshot((doc) => {
          const docs = [];
          doc.forEach((item) => {
            const result = {
              id: item.id,
              data: item.data(),
            };
            docs.push(result);
          });
          this.guests = JSON.parse(JSON.stringify(docs));
        });
      } catch (e) {
        this.showToast(e, 'Ошибка');
      }
    },
    async getRoomsList() {
      const ref = await this.$fire.firestore.collection('rooms');
      try {
        ref.onSnapshot((doc) => {
          const docs = [];
          doc.forEach((item) => {
            const result = {
              id: item.id,
              data: item.data(),
            };
            docs.push(result);
          });
          this.rooms = JSON.parse(JSON.stringify(docs));
        });
      } catch (e) {
        console.log(e);
      }
    },
    async deleteGuest(id) {
      const ref = await this.$fire.firestore.collection('guest').doc(id);
      try {
        ref.delete();
      } catch (e) {
        console.log(e);
        this.showToast(e.message, 'Ошибка');
      }
    },
    async addGuest() {
      const ref = await this.$fire.firestore.collection('guest');
      let roomsNumber = null;
      this.formattedRoomsList.forEach((item) => {
        if (this.model.rooms.current === item.id) {
          roomsNumber = item.text;
        }
      });
      this.model.rooms.number = roomsNumber;
      try {
        const response = await ref.add(this.model);
        await this.bookingRoom(this.model.rooms.current, response.id);
        if (this.tabIndex === 1 && this.selectedGuest) {
          await this.deleteGuest(this.selectedGuest);
        }
        this.showToast('Запись успешно добавлена', 'Успех');
        this.reset();
      } catch (e) {
        console.log(e);
        this.showToast(e.message, 'Ошибка');
      }
    },
    async bookingRoom(room, user) {
      const ref = await this.$fire.firestore.collection('rooms').doc(room);
      try {
        ref.update({
          guestId: user,
          status: 1,
        });
        this.showToast('Номер успешно забронирован', 'Успех');
      } catch (e) {
        console.log(e);
        this.showToast(e.message, 'Ошибка');
      }
    },
    showInfo(item) {
      this.$router.push(`/info/${item.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.guest {
  width: 100%;
  height: 100%;
  &__actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    margin-bottom: 20px;
    align-items: center;
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
  }
  &__item {
    width: 100%;
    height: 150px;
    box-shadow: 0 4px 9px 0 #cacaca;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    align-items: center;
    padding: 20px;
    cursor: pointer;
  }
  &__text {
    &_green {
      color: green;
    }
    &_red {
      color: red;
    }
  }
}
.info {
  width: 100%;
  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
  }
  &__items {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  &__body {
    padding: 10px;
  }
}
</style>
