<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container-fluid bg-light sticky-top">
      <nav class="navbar navbar-expand navbar-light bg-light" style="height: 85px;">
        <router-link class="navbar-brand bg-light shadow-none h3" to="/">
          <img src="@/assets/logo.png" width="45" height="45" class="d-inline-block" />
          <span class="h3 align-middle">AzureBlue Grocery Store</span>
        </router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto h5">
            <li class="nav-item">
              <router-link class="nav-link" to="/product/all">Product</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">Cart</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About Me</a>
            </li>
          </ul>
          <!-- <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search"
              placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
          </form> -->

          <!-- Cart -->
          <div class="dropdown pl-3">
            <button class="btn btn-primary h3 m-0 pr-4"
              type="button" id="dropdownMenuButton" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-shopping-bag"></i>
              <span class="badge badge-danger cart-badge position-relative" v-if="cart.carts">
                {{ cart.carts.length }}
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-right mt-2"
              aria-labelledby="dropdownMenuButton">
              <ul class="list-group-flush cart-list">
                <div v-if="cart.carts.length">
                  <li class="list-group-item d-flex justify-content-between align-items-center"
                    v-for="item in cart.carts" :key="item.id">
                    <button type="button" class="btn btn-outline-danger btn-sm mr-4"
                      @click="removeCartItem(item.id)">
                      <i class="far fa-trash-alt"></i>
                    </button>
                    <span class="flex-fill">{{ item.product.title }}</span>
                    <span class="d-flex justify-content-between align-items-center">
                      <span class="ml-4">
                        {{ item.product.price | currency }}
                      </span>
                      <span class="badge badge-primary badge-pill ml-4"
                        style="min-width:50px;">
                        {{ item.qty }} {{ item.product.unit }}
                      </span>
                    </span>
                  </li>
                  <li class="list-group-item d-flex justify-content-end">
                    <button class="btn btn-danger d-flex align-items-center">
                      <i class="fas fa-shopping-cart align-bottom"></i>
                      <span class="pl-2">結帳去</span>
                    </button>
                  </li>
                </div>
                <div v-else>
                  <router-link
                    class="list-group-item list-group-item-action text-success"
                    to="/product">
                    您的購物車是空的，快去商品區選購吧！
                  </router-link>
                </div>
              </ul>
            </div>
          </div>

          <!-- Login -->
          <a class="nav-link" href="#" @click.prevent="signout" v-if="isLogin">
            Sign Out <i class="fas fa-sign-out-alt"></i>
          </a>
          <router-link class="nav-link" to="/login" v-else>
            Sign In <i class="fas fa-sign-in-alt"></i>
          </router-link>
        </div>
      </nav>
      <div class="row">
      </div>
    </div>

    <router-view :cartRenew="cartRenew"></router-view>

    <footer class="footer mt-auto py-3">
      <div class="container">
        <span class="text-muted">Design by AzureBlue</span>
        <br />
        <span class="text-muted">
          僅為作品使用
          <router-link to="/admin">Admin</router-link>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cart: {
        carts: [],
      },
      isLoading: false,
      isLogin: false,
      cartRenew: false,
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res.data);
        vm.cart = res.data.data;
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      vm.cartRenew = true;
      this.$http.delete(api).then((res) => {
        console.log(res.data);
        this.getCart();
        vm.isLoading = false;
        vm.cartRenew = false;
      });
    },
    loginChecker() {
      const api = `${process.env.APIPATH}/api/user/check`;
      const vm = this;
      this.$http.post(api).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          vm.isLogin = true;
        } else {
          vm.isLogin = false;
        }
      });
    },
    signout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((res) => {
        console.log(res.data);
        vm.isLogin = false;
      });
    },
  },
  created() {
    this.loginChecker();
    this.getCart();
    const vm = this;
    // 註冊全域 EventBus 事件
    // 自定義名稱 'cart:reolad'
    vm.$bus.$on('cart:reolad', () => {
      vm.getCart();
    });
  },
};
</script>

<style lang='scss' scoped>
  .bg-light {
      a {
        background-color: transparent !important;
        :hover {
          background-color: transparent !important;
        }
      }
  }
  .cart-badge {
    top: -5px;
    // left: -2px;
    margin-right: -17px;
  }
  .cart-list {
    min-width: 400px;
    padding: 0;
    margin: 0;
  }
</style>
