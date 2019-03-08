<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>Remove Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key"
          v-if="orders.length"
          :class="{'text-secondary': !item.is_paid}">
          <td>{{ $moment.unix(item.create_at).format('YYYY-MM-DD') }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未啟用</span>
          </td>
          <td>
            <a href="#" @click.prevent="removeOrderDetail(item.id)">清空訂購資料</a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>

  </div>
</template>

<script>
import Pagination from '../Pagination';

export default {
  data() {
    return {
      pagination: {},
      orders: [],
      isLoading: false,
      empty: {
        create_at: 0,
        is_paid: false,
        message: '',
        payment_method: '',
        products: [],
        total: 0,
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
      },
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res.data);
        vm.isLoading = false;
        vm.orders = res.data.orders;
        vm.pagination = res.data.pagination;
      });
    },
    removeOrderDetail(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.put(api, { data: vm.empty }).then((res) => {
        console.log(res.data);
        vm.isLoading = false;
        vm.getOrders();
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
