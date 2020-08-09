<template>
  <div class="mt-4">
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <!-- 標題 -->
      <thead>
        <tr>
          <th width="100">購買時間</th>
          <th>Email</th>
          <th>購買品項</th>
          <th width="100" class="text-right">應付總金額</th>
          <th width="100" class="text-right">付款狀態</th>
        </tr>
      </thead>
      <!-- 欄位 -->
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <!-- 購買時間 -->
          <td>{{ order.create_at | timeStamp }}</td>
          <!-- Email -->
          <td>{{ order.user.email }}</td>
          <!-- 購買品項 -->
          <td>
            <table class="table">
              <thead>
                <tr>
                  <th class="minTable"></th>
                  <th width="50" class="minTable"></th>
                  <th width="30" class="minTable"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in order.products" :key="product.id">
                  <td class="minTable text-overflow">{{ product.product.title }}</td>
                  <td class="minTable text-right">
                    <!-- 有優惠券 -->
                    <div v-if="product.coupon">
                      <!-- 有產品折扣 -->
                      <div v-if="product.product.origin_price !== product.product.price">
                        <div>{{ product.product.price * product.coupon.percent / 100 | currency }}</div>
                        <div class="text-success" v-if="product.coupon">優惠券</div>
                      </div>

                      <!-- 無產品折扣 -->
                      <div v-else>
                        <div>{{ product.product.origin_price * product.coupon.percent / 100 | currency }}</div>
                        <div class="text-success" v-if="product.coupon">優惠券</div>
                      </div>
                    </div>
                    <!-- 無優惠券 -->
                    <div v-else>
                      <!-- 有產品折扣 -->
                      <div v-if="product.product.origin_price !== product.product.price">
                        <div>{{ product.product.price | currency }}</div>
                      </div>
                      <!-- 無產品折扣 -->
                      <div v-else>
                        <div>{{ product.product.origin_price | currency }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="minTable text-right">x{{ product.qty }}</td>
                </tr>
              </tbody>
            </table>
          </td>

          <!-- 應付金額 -->
          <td class="text-right">{{ order.total | currency }}</td>
          <!-- 付款狀態 -->
          <td class="text-right">
            <span v-if="order.is_paid" class="text-success">已付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁按鈕 -->
    <Pagination
      class="mt-4"
      :pagination="pagination"
      @getProducts="switchPage"
      v-if="orders.length !== 0"
    />
  </div>
</template>

<script>
import $ from "jquery";

import Pagination from "./Widgets/Pagination";

export default {
  components: { Pagination },
  data() {
    return {
      // 訂單資料
      orders: [],
      // 分頁
      pagination: {},
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

      // 取得並儲存全部產品的資料
      const ordersData = await vm.getOrders().then((response) => response);
      vm.orders = await ordersData.orders;
      vm.pagination = await ordersData.pagination;

      // 關閉全畫面讀取
      vm.isLoading = false;
    },

    //  -------------------------------------------------------------------------
    //  取得訂單資料
    //  -------------------------------------------------------------------------
    getOrders(page = 1) {
      return new Promise((resolve, reject) => {
        // 宣告常數
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;

        // 取得訂單資料
        resolve(vm.$http.get(api).then((response) => response.data));
      });
    },

    //  -------------------------------------------------------------------------
    //  換頁事件
    //  -------------------------------------------------------------------------
    async switchPage(page) {
      // 宣告常數
      const vm = this;

      // 開啟全畫面讀取
      vm.isLoading = true;

      // 取得並儲存全部產品的資料
      const ordersData = await vm.getOrders(page).then((response) => response);
      vm.orders = ordersData.orders;
      vm.pagination = await ordersData.pagination;

      // 關閉全畫面讀取
      vm.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.minTable {
  border: 0px;
  padding: 0;
}

.text-overflow {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; // 想顯示的行數
  -webkit-box-orient: vertical;
  line-height: 20px; //解決firefox不支援-webkit-line-clamp的問題
  max-height: 20px * 2; //解決firefox不支援-webkit-line-clamp的問題
}
</style>