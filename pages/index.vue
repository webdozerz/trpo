<template>
  <div class="main">
    Main
  </div>
</template>

<script>
export default {
  name: 'Index',
  mounted() {
    this.$router.push('/rooms');
  },
};
</script>
