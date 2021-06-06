<template>
  <div class="rooms">
    <div class="rooms__title">
      Номера
    </div>
    <div class="rooms__main">
      <div
        v-if="rooms.length"
        class="rooms__body"
      >
        <div class="rooms__items">
          <div
            v-for="(item, i) in rooms"
            :key="i"
            class="rooms__item"
            @click="showInfo(item)"
          >
            <div class="rooms__text">
              Комната #{{ item.data.number }}
            </div>
            <div class="rooms__text">
              Статус:
              <span
                v-if="item.data.status === 0"
                class="rooms__text rooms__text_green"
              >
                Свободна
              </span>
              <span
                v-else-if="item.data.status === 1"
                class="rooms__text rooms__text_red"
              >
                Занята
              </span>
            </div>
            <div class="rooms__text">
              Цена: {{ item.data.cost }}
            </div>
            <div class="rooms__text">
              Тип:
              <span v-if="item.data.type === 0">
                Одноместная (стандарт)
              </span>
              <span v-else-if="item.data.type === 1">
                Одноместная (люкс)
              </span>
              <span v-else-if="item.data.type === 2">
                Двуместный (стандарт)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rooms',
  data: () => ({
    rooms: [],
  }),
  async created() {
    await this.getRoomsList();
  },
  methods: {
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
    showInfo(room) {
      if (room.data.status === 1 && room.data.guestId) {
        this.$router.push(`/info/${room.data.guestId}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rooms {
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 30px;
  &__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
  }
  &__item {
    width: 100%;
    height: 250px;
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
</style>
