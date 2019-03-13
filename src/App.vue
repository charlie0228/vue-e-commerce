<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoading']),
  },
};
</script>

<style lang="scss">
@import "./assets/all";
body {
  background: $gray-100;
}
</style>
