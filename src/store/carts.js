import axios from 'axios';

export default {
  namespaced: true,
  state: {
    cart: {
      carts: [],
    },
  },
  actions: {
    getCart(context) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then((res) => {
        console.log('getCart', res.data);
        context.commit('CART', res.data.data);
        context.commit('LOADING', false, { root: true });
      });
    },
    removeCartItem(context, id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(api).then((res) => {
        console.log(res.data);
        context.dispatch('getCart');
        context.commit('LOADING', false, { root: true });
      });
    },
    addtoCart(context, { id, qty }) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(api, { data: cart }).then((res) => {
        console.log(res.data);
        context.dispatch('getCart');
      });
    },
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    cart: state => state.cart,
  },
};
