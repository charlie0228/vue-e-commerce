import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import CustomerOrder from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import LandingPage from '@/components/pages/LandingPage';
import MainProducts from '@/components/pages/MainProducts';
import ProductDetail from '@/components/pages/ProductDetail';
import Cart from '@/components/pages/Cart';
import Checkout from '@/components/pages/Checkout';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          name: 'Home',
          component: LandingPage,
        },
        {
          path: '/product/:category',
          name: 'Product',
          component: MainProducts,
        },
        {
          path: '/product/detail/:id',
          name: 'ProductDetail',
          component: ProductDetail,
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart,
        },
        {
          path: 'checkout/:orderId',
          name: 'Checkout',
          component: Checkout,
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },
      ],
    },
  ],
});

