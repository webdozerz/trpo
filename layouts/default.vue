<template>
  <div class="main">
    <div class="main__head">
      <div class="main__container">
        <div class="main__body">
          <div class="head__links">
            <n-link
              class="head__link"
              to="/guest"
            >
              Гости
            </n-link>
            <n-link
              class="head__link"
              to="/rooms"
            >
              Номера
            </n-link>
          </div>
        </div>
      </div>
    </div>
    <div class="main__container">
      <div class="main__body main__body_content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main  {
  display: grid;
  grid-template-rows: 60px 1fr;
  width: 100%;
  &__body {
    display: flex;
    max-width: 1180px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    &_content {
      padding-top: 20px;
      min-height: calc(100vh - 60px);
    }
  }
  &__container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  &__head {
    display: grid;
    grid-gap: 10px;
    width: 100%;
    height: 60px;
    align-items: center;
    box-shadow: 0 0 6px rgba(0, 0, 0, .5);
    padding: 0 20px;
   }
}
.head {
  &__links {
     display: flex;
     align-items: center;
    grid-template-columns: repeat(3, auto);
    grid-gap: 20px;
  }
  &__link {
     text-decoration: none;
     color: black;
   }
}
</style>
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
