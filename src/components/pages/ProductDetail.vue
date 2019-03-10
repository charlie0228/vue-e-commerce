<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-light h6">
          <li class="breadcrumb-item" aria-current="page">
            <router-link to="/product/all">產品</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link :to="`/product/${product.category}`">{{ product.category }}</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-4 d-flex flex-column justify-content-end align-items-left">
        <h2>{{ product.title }}</h2>
          <blockquote class="blockquote px-1 pt-3">
            特價：{{ product.price | currency }} <br />
            <br />
            {{ product.content }}
            <footer class="blockquote-footer text-right">
              {{ product.description }}
            </footer>
          </blockquote>
          <div class="input-group">
            <select name="" class="custom-select" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
            <div class="input-group-append">
              <button class="btn btn-success" type="button"
                @click.prevent="addtoCart">加入購物車</button>
            </div>
          </div>
      </div>
      <div class="col-8">
        <img class="img-fluid" :src="product.imageUrl" alt="" />
      </div>
    </div>
    <div class="row">
      <div class="col" style="margin-bottom:58px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product_id: this.$route.params.id,
      product: {},
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${this.$route.params.id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res.data);
        vm.product = res.data.product;
        vm.product.num = 1;
        vm.isLoading = false;
      });
    },
    addtoCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      const cart = {
        product_id: vm.product_id,
        qty: vm.product.num,
      };
      this.$http.post(api, { data: cart }).then((res) => {
        console.log(res.data);
        vm.$bus.$emit('cart:reolad');
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>

</style>
