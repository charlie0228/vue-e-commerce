<template>
  <div>
    <Jumbotron
      :height="'50'"
      :className="'text-white font-weight-bold'"
      :bg="'./static/vitor-santos-62290-unsplash.jpg'">
      <div slot="title">開學季</div>
      <div slot="footer">文具用品大特惠</div>
      <div slot="btn">
        <router-link class="btn btn-danger" to="/product/文具">現在就去搶購</router-link>
      </div>
    </Jumbotron>
    <Jumbotron
      :height="'50vh'"
      :className="'text-white font-weight-bold align-self-end'"
      :bg="'./static/jc-gellidon-715597-unsplash.jpg'">
      <div slot="title">旅遊季</div>
      <div slot="footer">多久，沒有一個人漫步旅行了呢？</div>
      <div slot="btn">
        <router-link class="btn btn-danger" to="/product/旅遊">現在就去搶購</router-link>
      </div>
    </Jumbotron>
  </div>
</template>

<script>
import Jumbotron from '@/components/Jumbotron';

export default {
  components: {
    Jumbotron,
  },
};
</script>

<style lang="scss" scoped>

</style>
