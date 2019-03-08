<template>
<div>
  <Jumbotron
    :className="'text-white font-weight-bold'"
    :height="'30'">
    <div slot="title">眾多商品特惠中！</div>
    <div slot="footer">搶購倒數，把握機會，要買要快！</div>
  </Jumbotron>
  <div class="container">
    <div class="row">
      <loading :active.sync="isLoading"></loading>
      <div class="col-3">
        <div class="list-group sticky-top pt-4 mb-5">
          <router-link class="list-group-item list-group-item-action"
            to="/product/all">
            所有商品
          </router-link>
          <!-- <a href="#" class="list-group-item list-group-item-action"
            :class="{'active': !filter_category}"
            @click.prevent="filterProdcuts()">
            所有商品
          </a> -->
          <router-link class="list-group-item list-group-item-action"
            :to="`/product/${item}`"
            v-for="(item, index) in category" :key="index">
            {{ item }}
          </router-link>

          <!-- <a href="#" class="list-group-item list-group-item-action"
            :class="{'active': filter_category === item}"
            @click.prevent="filterProdcuts(item)"
            v-for="(item, index) in category" :key="index">
            {{ item }}
          </a> -->
        </div>
      </div>
      <div class="col-9">
        <div class="my-4 h4 text-danger" v-if="filter_product === null">
          選取的商品分類不存在，請重新點選左側選單！
        </div>
        <div class="card-columns my-3" style="column-count: 2;" v-else>
          <div class="card border-1 shadow-sm h-100 bg-light my-2"
            v-for="item in filter_product" :key="item.id">
            <div class="card-body">
              <img :src="item.imageUrl" class="card-img-top" alt="...">
              <h4 class="card-text bg-light text-black opacity-75 card-hover-title">
                {{ item.title }}
              </h4>
              <blockquote class="blockquote px-1 pt-1">
                {{ item.content }}
                <footer class="blockquote-footer text-right">
                  {{ item.description }}
                </footer>
              </blockquote>
              <div class="card-footer bg-light border-0 px-1">
                <div class="row align-items-center">
                  <div class="col h5">特價：{{ item.price | currency }}</div>
                  <div class="w-100"></div>
                  <div class="col"></div>
                  <div class="col-10 text-right">
                    <div class="btn-group">
                      <router-link class="btn btn-outline-primary"
                        :to="`/product/detail/${item.id}`" >
                        產品細節
                      </router-link>
                      <a href="#" class="btn btn-danger"
                        @click.prevent="addtoCart(item.id)">
                        加入購物車
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

</template>

<script>
import Jumbotron from '@/components/Jumbotron';

export default {
  data() {
    return {
      products: [],
      category: [],
      filter_product: [],
      isLoading: false,
    };
  },
  components: {
    Jumbotron,
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      const category = new Set();
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res.data);
        vm.products = res.data.products;
        vm.products.forEach((item) => {
          if (item.is_enabled) {
            category.add(item.category);
          }
        });
        vm.category = [...category];
        vm.isLoading = false;
      });
    },
    filterProdcuts(cat) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res.data);
        if (cat === 'all') {
          vm.filter_product = res.data.products.filter(item => (item.is_enabled));
        } else {
          vm.filter_product = res.data.products.filter(item => (item.category === cat));
        }
        if (vm.filter_product.length === 0) {
          vm.filter_product = null;
        }
        vm.isLoading = false;
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((res) => {
        console.log(res.data);
        vm.$bus.$emit('cart:reolad');
      });
    },
  },
  created() {
    this.getProducts();
    this.filterProdcuts(this.$route.params.category);
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.category': function (val) {
      this.filterProdcuts(val);
    },
  },
};
</script>

<style lang="scss" scoped>
  .opacity-75 {
    opacity: 0.75;
  }
  .card-hover-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.25rem;
    margin: 1.25rem;
  }
  .sticky-top {
    top: 70px;
  }
</style>

