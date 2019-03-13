import axios from 'axios';

export default {
  namespaced: true,
  state: {
    products: [],
    category: [],
    filter_product: [],
  },
  actions: {
    getProducts(context) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then((res) => {
        console.log('getProducts', res.data);
        context.commit('PRODUCTS', res.data.products);
        context.commit('CATEGORY', res.data.products);
        context.commit('LOADING', false, { root: true });
      });
    },
    filterProducts(context, cat) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then((res) => {
        console.log(res.data);
        context.commit('FILTER_PRODUCT', { products: res.data.products, cat });
        context.commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CATEGORY(state, payload) {
      const category = new Set();
      payload.forEach((item) => {
        if (item.is_enabled) {
          category.add(item.category);
        }
      });
      state.category = [...category];
    },
    FILTER_PRODUCT(state, { products, cat }) {
      if (cat === 'all') {
        state.filter_product = products.filter(item => (item.is_enabled));
      } else {
        state.filter_product = products.filter(item => (item.category === cat));
      }
      if (state.filter_product.length === 0) {
        state.filter_product = null;
      }
    },
  },
  getters: {
    products: state => state.products,
    category: state => state.category,
    filter_product: state => state.filter_product,
  },
};
