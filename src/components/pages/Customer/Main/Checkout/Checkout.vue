<template>
  <div>
    <form class="checkout-form" @submit.prevent="payOrder">
      <table class="checkout-table">
        <thead>
          <tr>
            <th width="100">品名</th>
            <th width="100" class="text-right">數量</th>
            <th width="100" class="text-right">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in orderData.products" :key="product.id">
            <!-- 品名 -->
            <td>
              {{ product.product.title }}
              <div class="text-primary" v-if="product.coupon">已套用優惠券</div>
            </td>
            <!-- 數量 -->
            <td class="text-right">{{ product.qty }} {{ product.product.unit }}</td>
            <!-- 單價 -->
            <td class="text-right">
              <!-- 無特價 -->
              <div v-if="product.product.origin_price === product.product.price">
                <!-- 無優惠券 -->
                <div v-if="!product.coupon">
                  <span>{{ (product.product.origin_price * currencyStatus.exchange) | currency }}</span>
                  <b>{{ currencyStatus.currency }}</b>
                </div>
                <!-- 有優惠券 -->
                <div v-else>
                  <span>{{ (product.product.origin_price * currencyStatus.exchange) | currency }}</span>
                  <b>{{ currencyStatus.currency }}</b>
                  <span
                    class="text-primary"
                  >{{ (product.product.origin_price * product.coupon.percent / 100 * currencyStatus.exchange) | currency }}</span>
                  <b class="text-primary">{{ currencyStatus.currency }}</b>
                </div>
              </div>
              <!-- 有特價 -->
              <div v-else>
                <!-- 無優惠券 -->
                <div v-if="!product.coupon">
                  <span>{{ (product.product.price * currencyStatus.exchange) | currency }}</span>
                  <b>{{ currencyStatus.currency }}</b>
                </div>
                <!-- 有優惠券 -->
                <div v-else>
                  <span>{{ (product.product.price * currencyStatus.exchange) | currency }}</span>
                  <b>{{ currencyStatus.currency }}</b>
                  <span
                    class="text-primary"
                  >{{ (product.product.price * product.coupon.percent / 100 * currencyStatus.exchange) | currency }}</span>
                  <b class="text-primary">{{ currencyStatus.currency }}</b>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td class="text-right">總金額</td>
            <td class="text-right text-primary">
              {{ (orderData.total * currencyStatus.exchange) | currency }}
              <b>{{ currencyStatus.currency }}</b>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table class="mt-5">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ orderUser.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ orderUser.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ orderUser.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ orderUser.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!orderData.is_paid">尚未付款</span>
              <span v-else class="text-primary">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="orderData.is_paid === false">
        <button class="pay-order" type="submit">確認付款</button>
      </div>
      <div class="back-to-homePage text-right" v-else>
        <router-link to="/customer/home">回到首頁</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    this.getOrder();
  },
  computed: {
    ...mapGetters(["orderData", "orderID", "orderUser", "currencyStatus"]),
  },
  methods: {
    //  -------------------------------------------------------------------------
    //  取得訂單資料
    //  -------------------------------------------------------------------------
    getOrder() {
      this.$store.dispatch("getOrder", this.$route.path.split("/")[3]);
    },

    //  -------------------------------------------------------------------------
    //  送出訂單資料
    //  -------------------------------------------------------------------------
    payOrder() {
      this.$store.dispatch("payOrder", this.$route.path.split("/")[3]);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkout-form {
  margin: 10%;

  .checkout-table {
    width: 100%;

    tr {
      width: 100%;

      b {
        font-size: 12px;
      }

      th {
        margin: 0 1%;
        width: 31.3333333%;
      }
    }
  }
  .pay-order,
  .back-to-homePage {
    margin-top: 30px;
    margin-right: 5%;
  }

  .pay-order {
    background-color: white;
    border: 1px solid;
    border-color: red;
    color: red;
    padding: 10px 50px;
    transition: 0.25s;

    &:hover,
    &:focus {
      border-color: #007bff;
      color: #007bff;
      box-shadow: 0 0.5em 0.5em -0.4em #007bff;
      transform: translateY(-0.25em);
    }
  }

  .back-to-homePage {
    a {
      text-decoration: none;
      background-color: rgb(22, 22, 22);
      border: 1px solid;
      border-color: rgb(22, 22, 22);
      color: white;
      padding: 10px 50px;
      transition: 0.25s;

      &:hover,
      &:focus {
        border-color: gray;
        background-color: gray;
        color: white;
        box-shadow: 0 0.5em 0.5em -0.4em gray;
        transform: translateY(-0.3em);
      }
    }
  }
}
</style>
