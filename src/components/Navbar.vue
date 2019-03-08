<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0 text-center" to="/">
        <img src="@/assets/logo.png" width="30" height="30" class="d-inline-block align-center" />
        <span class="h5 align-middle">AzureBlue Grocery Store</span>
      </router-link>
      <input class="form-control form-control-dark w-100" type="text"
        placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout" v-if="isLogin">
            Sign Out <i class="fas fa-sign-out-alt"></i>
          </a>
          <router-link class="nav-link" to="/login" v-else>
            Sign In <i class="fas fa-sign-in-alt"></i>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
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
        if (res.data.success) {
          vm.$router.push('/');
        }
      });
    },
  },
  created() {
    this.loginChecker();
  },
};
</script>
