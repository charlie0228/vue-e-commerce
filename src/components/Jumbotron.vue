<template>
  <div class="jumbotron jumbotron-fluid m-0"
    :style="style">
    <div class="container d-flex flex-column justify-content-center">
      <div :class="className">
        <p class="display-3 h1">
          <slot name="title"></slot>
        </p>
        <p class="lead">
          <slot name="footer"></slot>
        </p>
        <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      style: {
        height: this.heightCalc(),
        background: `url(${this.bg}) center center`,
        backgroundSize: 'cover',
        minHeight: '250px',
      },
    };
  },
  props: {
    height: {
      default: 0,
    },
    bg: {
      type: String,
      default: "'./static/vitor-santos-62290-unsplash.jpg'",
    },
    className: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  methods: {
    heightCalc() {
      if (/\d*vh/.test(this.height)) {
        return this.height;
      } else if (this.height === 0) {
        return 0;
      }
      return `calc(${this.height}vh - 85px)`;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
