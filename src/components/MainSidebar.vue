<template>
  <div class="list-group sticky-top">
    <router-link to="/" class="list-group-item list-group-item-action">
      所有商品
    </router-link>
    <a href="#" class="list-group-item list-group-item-action"
      v-for="(item, index) in category" :key="index">
      {{ item }}
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      category: [],
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      const category = new Set();
      this.$http.get(api).then((res) => {
        console.log(res.data);
        vm.products = res.data.products;
        vm.products.forEach((item) => {
          category.add(item.category);
        });
        vm.category = [...category];
        console.log(vm);
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
