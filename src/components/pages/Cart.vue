<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex flex-column justify-content-center"
        style="height: calc(100vh - 155px)" v-if="!cart.carts.length">
        <div class="h2 text-center text-muted">
          您的購物車是空的，快去商品區選購吧！<br />
          <br />
          <router-link class="display-3" to="/product/all">
            <i class="fas fa-cart-plus"></i>
          </router-link>
        </div>
      </div>
      <table class="table" v-else>
        <thead>
          <th></th>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle">
              <button type="button" class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">
                已套用優惠券
              </div>
            </td>
            <td class="align-middle">{{ item.qty }} / {{ item.product.unit }}</td>
            <td class="align-middle">{{ item.final_total}}</td>
          </tr>
        </tbody>
        <tfoot class="h5">
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="row" v-if="cart.carts.length">
      <div class="col-6"></div>
      <div class="col-6">
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-success" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col" v-if="cart.carts.length">
        <div class="my-5 row justify-content-center">
          <form class="col-md-6" @submit.prevent="createOrder">
            <div class="form-group">
              <label for="useremail">Email <span class="text-warning">*</span></label>
              <input type="email" class="form-control" name="email" id="useremail"
                :class="{'is-invalid': errors.has('email')}"
                v-validate="'required|email'"
                v-model="form.user.email" placeholder="請輸入 Email">
              <span class="text-danger" v-if="errors.has('email')">
                {{ errors.first('email') }}
              </span>
            </div>

            <div class="form-group">
              <label for="username">收件人姓名 <span class="text-warning">*</span></label>
              <input type="text" class="form-control" name="name" id="username"
                :class="{'is-invalid': errors.has('name')}"
                v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
              <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
            </div>

            <div class="form-group">
              <label for="usertel">收件人電話 <span class="text-warning">*</span></label>
              <input type="tel" class="form-control" name="tel" id="usertel"
                :class="{'is-invalid': errors.has('tel')}"
                v-model="form.user.tel" v-validate="'required'" placeholder="請輸入電話">
                <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
            </div>

            <div class="form-group">
              <label for="useraddress">收件人地址 <span class="text-warning">*</span></label>
              <input type="address" class="form-control" name="address" id="useraddress"
                :class="{'is-invalid': errors.has('address')}"
                v-model="form.user.address" v-validate="'required'" placeholder="請輸入地址">
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="useraddress">留言</label>
              <textarea name="" id="" class="form-control" cols="30" rows="10"
                v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      coupon_code: '',
    };
  },
  methods: {
    ...mapActions('cartModules', ['removeCartItem', 'getCart']),
    addCouponCode() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$store.dispatch('updateLoading', true);
      this.$http.post(api, { data: coupon }).then((res) => {
        console.log(res.data);
        vm.cart = res.data.data;
        vm.getCart();
        vm.$store.dispatch('updateLoading', false);
      });
    },
    createOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      this.$validator.validate().then((result) => {
        if (result) {
          vm.$store.dispatch('updateLoading', true);
          this.$http.post(api, { data: order }).then((res) => {
            console.log('成功送出', res.data);
            if (res.data.success) {
              vm.$router.push(`/checkout/${res.data.orderId}`);
            }
            vm.$store.dispatch('updateLoading', false);
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
  },
  computed: {
    ...mapGetters('cartModules', ['cart']),
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>

</style>
