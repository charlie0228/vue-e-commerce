import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// Message
// @/components/AlertMessage.vue
// vm.$bus.$emit('message:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式
