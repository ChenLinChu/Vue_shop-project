<template>
  <div class="my-5 row justify-content-center">
    <loading :active.sync="isLoading"></loading>
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>品名</th>
          <th width="60" class="text-right">數量</th>
          <th class="text-right">單價</th>
        </thead>
        <tbody>
          <tr v-for="product in order.products" :key="product.id">
            <td class="align-middle">{{ product.product.title }}</td>
            <td class="align-middle text-right">x{{ product.qty }}</td>
            <td
              class="align-middle text-right"
            >{{ product.product.price * product.coupon.percent / 100 | currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total | currency }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 訂單ID
      orderId: "",
      // 訂單資料
      order: {
        user: {},
      },
      // 判斷全畫面讀取
      isLoading: true,
    };
  },
  created() {
    this.init();
  },
  methods: {
    //  -------------------------------------------------------------------------
    //  初始
    //  -------------------------------------------------------------------------
    async init() {
      // 宣告常數
      const vm = this;

      // 取得訂單ID並儲存
      vm.orderId = vm.$route.params.orderId;

      // 取得訂單資料
      vm.order = await vm.getOrder().then((response) => response.order);

      // 關閉全畫面讀取
      vm.isLoading = false;
    },

    //  -------------------------------------------------------------------------
    //  取得訂單資料
    //  -------------------------------------------------------------------------
    getOrder() {
      return new Promise((resolve, reject) => {
        // 宣告常數
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;

        // 取得資料
        resolve(vm.$http.get(api).then((response) => response.data));
      });
    },

    //  -------------------------------------------------------------------------
    //  送出訂單資料
    //  -------------------------------------------------------------------------
    sendOrder() {
      return new Promise((resolve, reject) => {
        // 宣告常數
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;

        // 送出資料
        resolve(vm.$http.post(api).then((response) => response.data));
      });
    },

    //  -------------------------------------------------------------------------
    //  訂單結帳
    //  -------------------------------------------------------------------------
    async payOrder() {
      // 宣告常數
      const vm = this;

      // 開啟全畫面讀取
      vm.isLoading = true;

      // 送出訂單資料
      await vm.sendOrder().then((response) => response);

      // 重新取得訂單資料
      vm.order = await vm.getOrder().then((response) => response.order);

      // 關閉全畫面讀取
      vm.isLoading = false;
    },
  },
};
</script>