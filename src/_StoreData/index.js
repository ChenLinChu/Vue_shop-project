import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import axios from 'axios';
import router from '.././components/router';

import $ from 'jquery';

Vue.use(Vuex);

export default new Vuex.Store({
  // 嚴謹模式
  strict: true,

  state: {
    // -------------------------------------------------------------------------
    // 共用
    // -------------------------------------------------------------------------

    // 全畫面讀取
    isLoading: false,

    // 幣別
    currencyStatus: { currency: 'TWD', exchange: 1 },

    // 帳號
    user: {
      username: 'chenlinchu637@gmail.com',
      password: 'billyjay159',
    },
    // 登入狀態
    signinStatus: false,

    // -------------------------------------------------------------------------
    // 前台
    // -------------------------------------------------------------------------

    // 產品資料
    productData: {
      customer: {
        // 產品資料 - 全部
        productAll: [],
        // 產品資料 - 十二筆
        productTwelve: [],
        // 產品資料 - 篩選
        productFiltered: [],
        // 產品資料 - 個別
        productSingle: {},
        // 產品資料 - 分類
        productCategory: [],
        // 產品選取數量
        selectedNum: 1,
      },
    },
    // 購物車資料
    cartData: {
      customer: {
        // 購物車資料 - 全部
        cartAll: {},
        // 購物車資料 - 個別
        cartSingle: {},
        // 購物車總金額 - 前台 - 全部
        cartTotal: 0,
        // 購物車總金額 - 前台 - 全部 - 折後
        cartFinalTotal: 0,
      },
    },

    // 訂單資料
    orderData: {},
    // 訂單ID
    orderID: '',
    // 訂單聯絡人資料
    orderUser: {},
  },

  actions: {
    // -------------------------------------------------------------------------
    // 共用
    // -------------------------------------------------------------------------

    // -------- 讀取 --------
    updateLoading(context, payload) {
      context.commit('ISLOADING', payload);
    },

    // -------- 幣別 --------
    updateCurrency(context, payload) {
      context.commit('CURRENCYSTATUS', payload);
    },

    // -------- 帳號 --------
    // 登入帳號
    signinUser(context, payload) {
      const api = `${process.env.APIPATH}/admin/signin`;

      context.commit('ISLOADING', true);

      axios.post(api, payload).then((response) => {
        if (response.data.success) {
          context.commit('SIGNINSTATUS', true);
          alert('登入成功！');
        } else {
          alert('登入失敗，請重新登入。');
          context.commit('SIGNINSTATUS', false);
        }

        $('#signinModal').modal('hide');
        context.commit('ISLOADING', false);
      });
    },
    // 登出帳號
    signoutUser(context) {
      const api = `${process.env.APIPATH}/logout`;

      context.commit('ISLOADING', true);

      axios.post(api).then((response) => {
        if (response.data.success) {
          context.commit('SIGNINSTATUS', false);
          alert('登出成功！');
        } else {
          alert('登出失敗，請重新登入。');
          context.commit('SIGNINSTATUS', true);
        }

        context.commit('ISLOADING', false);
      });
    },
    // 取得登入狀態
    getSigninStatus(context) {
      const api = `${process.env.APIPATH}/api/user/check`;

      context.commit('ISLOADING', true);

      axios.post(api).then((response) => {
        context.commit('SIGNINSTATUS', response.data.success);

        context.commit('ISLOADING', false);
      });
    },

    // -------------------------------------------------------------------------
    // 前台
    // -------------------------------------------------------------------------

    // 取得所有資料 - 產品 + 購物車
    customerGetAllData(context) {
      context.dispatch('customerGetProductAll');
      context.dispatch('customerGetProductTwelve');
      context.dispatch('customerGetCartAll');
    },

    // 取得產品資料 - 全部
    customerGetProductAll(context) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;

      context.commit('ISLOADING', true);

      axios.get(api).then((response) => {
        const products = response.data.products.reverse();

        context.commit('CUSTOMER_GETPRODUCTALL', products);

        context.commit('ISLOADING', false);
      });
    },
    // 取得產品資料 - 十二筆
    customerGetProductTwelve(context) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;

      context.commit('ISLOADING', true);

      axios.get(api).then((response) => {
        context.commit(
          'CUSTOMER_GETPRODUCTTWELVE',
          response.data.products.reverse().filter((item, index) => index < 12)
        );

        context.commit('ISLOADING', false);
      });
    },
    // 取得產品資料 - 篩選 - 最近上市
    customerGetProductRecent(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;

      context.commit('ISLOADING', true);

      axios.get(api).then((response) => {
        const products = response.data.products
          .reverse()
          .filter((item, index) => index < 24);
        const categorys = products.map((item) => item.category);
        const newCategorys = categorys.filter(
          (item, index) => categorys.indexOf(item) === index
        );

        context.commit('CUSTOMER_GETPRODUCTCATEGORY', newCategorys);

        if (payload === '全部') {
          context.commit('CUSTOMER_GETPRODUCTFILTERED', products);
        } else {
          context.commit(
            'CUSTOMER_GETPRODUCTFILTERED',
            products.filter((item) => item.category === payload)
          );
        }

        context.commit('ISLOADING', false);
      });
    },
    // 取得產品資料 - 篩選 - 全部 + 分類
    customerGetProductFiltered(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;

      context.commit('ISLOADING', true);

      axios.get(api).then((response) => {
        const products = response.data.products.reverse();
        const categorys = products.map((item) => item.category);
        const newCategorys = categorys.filter(
          (item, index) => categorys.indexOf(item) === index
        );

        context.commit('CUSTOMER_GETPRODUCTCATEGORY', newCategorys);

        if (payload === '全部') {
          context.commit('CUSTOMER_GETPRODUCTFILTERED', products);
        } else {
          context.commit(
            'CUSTOMER_GETPRODUCTFILTERED',
            products.filter((item) => item.category === payload)
          );
        }

        context.commit('ISLOADING', false);
      });
    },
    // 取得產品資料 - 篩選 - 折扣
    customerGetProductDiscount(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;

      context.commit('ISLOADING', true);

      axios.get(api).then((response) => {
        const products = response.data.products
          .reverse()
          .filter((item) => item.origin_price !== item.price);
        const categorys = products.map((item) => item.category);
        const newCategorys = categorys.filter(
          (item, index) => categorys.indexOf(item) === index
        );

        context.commit('CUSTOMER_GETPRODUCTCATEGORY', newCategorys);

        if (payload === '全部') {
          context.commit('CUSTOMER_GETPRODUCTFILTERED', products);
        } else {
          context.commit(
            'CUSTOMER_GETPRODUCTFILTERED',
            products.filter((item) => item.category === payload)
          );
        }

        context.commit('ISLOADING', false);
      });
    },
    // 取得產品資料 - 個別 - 開啟單一產品使用
    customerGetProductSingle(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${payload}`;

      context.commit('ISLOADING', true);

      axios.get(api).then((response) => {
        response.data.product.stock = parseInt(response.data.product.stock);

        context.commit('CUSTOMER_GETPRODUCTSINGLE', response.data.product);

        context.commit('ISLOADING', false);

        $('#productSingleModal').modal('show');
      });
    },
    // 取得產品資料 - 個別 - 購物車刪除單一產品使用
    customerGetProductSingleForCart(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${payload}`;

      axios.get(api).then((response) => {
        response.data.product.stock = parseInt(response.data.product.stock);

        context.commit('CUSTOMER_GETPRODUCTSINGLE', response.data.product);
      });
    },
    // 更新產品資料 - 個別
    customerUpdateProductSingle(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${payload.id}`;

      axios.put(api, { data: payload }).then((response) => {
        context.dispatch('customerGetAllData');
      });
    },
    // 產品選取數量
    customerUpdateSelectedNum(context, payload) {
      context.commit('SELECTEDNUMSTATUS', payload);

      $('#productSingleModal').modal('hide');

      $('#checkPurchaseModal').modal('show');
    },
    // 產品加入購物車
    customerAddProductToCarts(context) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const product = this.state.productData.customer.productSingle;
      const qty = this.state.productData.customer.selectedNum;
      const cart = {
        product_id: product.id,
        qty,
      };

      context.commit('ISLOADING', true);

      axios.post(api, { data: cart }).then((response) => {
        context.commit('REDUCEPRODUCTSTOCK', qty);

        context.dispatch('customerUpdateProductSingle', product);

        $('#checkPurchaseModal').modal('hide');
        context.commit('ISLOADING', false);
      });
    },
    // 產品移出購物車
    customerRemoveProductFromCarts(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${payload.id}`;

      context.commit('ISLOADING', true);

      context.dispatch('customerGetProductSingleForCart', payload.product_id);

      axios.delete(api).then((response) => {
        if (response.data.success) {
          context.commit('ADDPRODUCTSTOCK', payload.qty);

          context.dispatch(
            'customerUpdateProductSingle',
            this.state.productData.customer.productSingle
          );

          context.commit('ISLOADING', false);
        }
      });
    },

    // 取得購物車資料 - 全部
    customerGetCartAll(context) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      context.commit('ISLOADING', true);

      axios.get(api).then((response) => {
        context.commit('CUSTOMER_GETCARTALL', response.data.data.carts);

        context.commit('CUSTOMER_CARTTOTAL', response.data.data.total);
        context.commit(
          'CUSTOMER_CARTFINALTOTAL',
          response.data.data.final_total
        );
      });

      context.commit('ISLOADING', false);
    },
    // 將優惠券加入購物車
    customerAddTicketToCarts(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const ticket = {
        code: payload,
      };

      context.commit('ISLOADING', true);

      axios.post(api, { data: ticket }).then((response) => {
        context.dispatch('customerGetCartAll');

        context.commit('ISLOADING', false);
      });
    },

    // 建立訂單
    createOrder(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = payload;

      context.commit('ISLOADING', true);

      axios.post(api, { data: order }).then((response) => {
        $('#cartsModal').modal('hide');

        context.dispatch('customerGetAllData');

        router.push(`checkout/${response.data.orderId}`);
      });

      context.commit('ISLOADING', false);
    },
    // 取得訂單
    getOrder(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${payload}`;

      context.commit('ISLOADING', true);

      axios.get(api).then((response) => {
        context.commit('CUSTOMER_UPDATEORDER', response.data.order);
        context.commit('CUSTOMER_UPDATEORDERID', response.data.order.id);
        context.commit('CUSTOMER_UPDATEORDERUSER', response.data.order.user);
      });
    },
    // 訂單付款
    payOrder(context, payload) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${payload}`;

      context.commit('ISLOADING', true);

      axios.post(api).then((response) => {
        context.dispatch('getOrder', payload);

        context.commit('ISLOADING', false);
      });
    },
  },

  mutations: {
    // -------------------------------------------------------------------------
    // 共用
    // -------------------------------------------------------------------------

    // 讀取
    ISLOADING(state, payload) {
      state.isLoading = payload;
    },
    // 幣別
    CURRENCYSTATUS(state, payload) {
      state.currencyStatus = payload;
    },

    // 登入狀態
    SIGNINSTATUS(state, payload) {
      state.signinStatus = payload;
    },

    // -------------------------------------------------------------------------
    // 前台
    // -------------------------------------------------------------------------

    // 產品資料 - 全部
    CUSTOMER_GETPRODUCTALL(state, payload) {
      state.productData.customer.productAll = payload;
    },
    // 產品資料 - 十二筆
    CUSTOMER_GETPRODUCTTWELVE(state, payload) {
      state.productData.customer.productTwelve = payload;
    },
    // 產品資料 - 篩選
    CUSTOMER_GETPRODUCTFILTERED(state, payload) {
      state.productData.customer.productFiltered = payload;
    },
    // 產品資料 - 個別
    CUSTOMER_GETPRODUCTSINGLE(state, payload) {
      state.productData.customer.productSingle = payload;
    },
    // 產品資料 - 分類
    CUSTOMER_GETPRODUCTCATEGORY(state, payload) {
      state.productData.customer.productCategory = payload;
    },
    // 產品選取數量
    SELECTEDNUMSTATUS(state, payload) {
      state.productData.customer.selectedNum = payload;
    },
    // 產品新增庫存數量
    ADDPRODUCTSTOCK(state, payload) {
      state.productData.customer.productSingle.stock += payload;
    },
    // 產品移除庫存數量
    REDUCEPRODUCTSTOCK(state, payload) {
      state.productData.customer.productSingle.stock -= payload;
    },

    // 購物車資料 - 全部
    CUSTOMER_GETCARTALL(state, payload) {
      state.cartData.customer.cartAll = payload;
    },
    // 購物車總金額 - 全部
    CUSTOMER_CARTTOTAL(state, payload) {
      state.cartData.customer.cartTotal = payload;
    },
    // 購物車總金額 - 全部 - 折後
    CUSTOMER_CARTFINALTOTAL(state, payload) {
      state.cartData.customer.cartFinalTotal = payload;
    },

    // 更新訂單資料
    CUSTOMER_UPDATEORDER(state, payload) {
      state.orderData = payload;
    },
    // 更新訂單ID
    CUSTOMER_UPDATEORDERID(state, payload) {
      state.orderID = payload;
    },
    // 更新訂單聯絡人資料
    CUSTOMER_UPDATEORDERUSER(state, payload) {
      state.orderUser = payload;
    },
  },

  getters: {
    signinStatus: (state) => state.signinStatus,
    user: (state) => state.user,
    currencyStatus: (state) => state.currencyStatus,
    productAll: (state) => state.productData.customer.productAll,
    productTwelve: (state) => state.productData.customer.productTwelve,
    productFiltered: (state) => state.productData.customer.productFiltered,
    productSingle: (state) => state.productData.customer.productSingle,
    productCategory: (state) => state.productData.customer.productCategory,
    selectedNum: (state) => state.productData.customer.selectedNum,
    cartAll: (state) => state.cartData.customer.cartAll,
    cartTotal: (state) => state.cartData.customer.cartTotal,
    cartFinalTotal: (state) => state.cartData.customer.cartFinalTotal,
    orderData: (state) => state.orderData,
    orderID: (state) => state.orderID,
    orderUser: (state) => state.orderUser,
  },
});
