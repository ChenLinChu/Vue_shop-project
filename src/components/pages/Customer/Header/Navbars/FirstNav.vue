<template>
  <fragment>
    <nav class="first-nav hidden-sm hidden-xs">
      <!-- 左側欄位 -->
      <div class="left-area">
        <select v-model="currencySelected" @change="updateCurrency">
          <option
            v-for="currency in currencys"
            :value="currency.currency"
            :key="currency.currency"
          >{{ currency.currency }}</option>
        </select>
      </div>

      <!-- 中間欄位 -->
      <div class="middle-area">
        <router-link to="/customer/home">
          <h1>Stærk</h1>
        </router-link>
      </div>

      <!-- 右側欄位 -->
      <div class="right-area">
        <a class="signin" @click.prevent="openSigninModal" v-if="!signinStatus">登入</a>
        <a class="signin" @click.prevent="signoutUser" v-else>登出</a>
        <router-link class="admin" to="/admin/products">進入後台</router-link>
        <button class="cart btn" @click="openCartModal">
          <div class="count">{{ cartAll.length }}</div>
          <i class="fas fa-shopping-cart"></i>
        </button>
        <button class="menu btn" @click="status.firstMenu = !status.firstMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- 下拉式選單 - 第一層 -->
      <div
        class="dropdownFirst"
        v-if="status.fullwidth < 768"
        :style="{ display: status.firstMenu ? 'block' : 'none' }"
      >
        <ul>
          <li>
            <div class="input-group input-group-sm">
              <input class="form-control" type="text" />
              <div class="input-group-append">
                <button class="btn btn-outline-dark">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </li>
          <li>
            <router-link to="/customer/latestProducts">最近上市</router-link>
          </li>
          <li>
            <router-link to="/customer/allProducts">全部商品</router-link>
          </li>
          <li>
            <router-link to="/customer/discount">折扣專區</router-link>
          </li>
          <li class="mt-5">
            <a v-if="!signinStatus" class="signin" @click.prevent="openSigninModal">登入</a>
            <a v-else class="signin" @click.prevent="signoutUser">登出</a>
          </li>
          <li>
            <router-link to="/admin/products">進入後台</router-link>
          </li>
          <li>
            <select v-model="currencySelected" @change="updateCurrency">
              <option
                v-for="currency in currencys"
                :value="currency.currency"
                :key="currency.currency"
              >{{ currency.currency }}</option>
            </select>
          </li>
        </ul>
      </div>
    </nav>
  </fragment>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import $ from "jquery";

export default {
  data() {
    return {
      // 被選定的幣種
      currencySelected: "TWD",
      // 幣種
      currencys: [
        { currency: "TWD", exchange: 1 },
        { currency: "USD", exchange: 0.034 },
        { currency: "EUR", exchange: 0.029 },
        { currency: "CAD", exchange: 0.045 },
        { currency: "AUD", exchange: 0.047 },
        { currency: "GBP", exchange: 0.026 },
        { currency: "HKD", exchange: 0.26 },
      ],
      status: {
        // 當前瀏覽器寬度
        fullwidth: "",
        // 平板以下使用選單
        firstMenu: false,
      },
    };
  },
  mounted() {
    // 儲存瀏覽器寬度資料
    this.status.fullwidth = window.innerWidth;

    // 當瀏覽器寬度變更時，即時儲存資料
    window.onresize = () => {
      this.status.fullwidth = window.innerWidth;
    };
  },
  created() {
    this.getSigninStatus();
  },
  computed: {
    ...mapGetters(["signinStatus", "cartAll"]),
  },
  methods: {
    ...mapActions(["getSigninStatus", "signoutUser"]),

    //  -------------------------------------------------------------------------
    //  更新匯率與幣別
    //  -------------------------------------------------------------------------
    updateCurrency() {
      this.$store.dispatch(
        "updateCurrency",
        this.currencys.filter(
          (item) => item.currency === this.currencySelected
        )[0]
      );
    },

    //  -------------------------------------------------------------------------
    //  開啟登入視窗
    //  -------------------------------------------------------------------------
    openSigninModal() {
      $("#signinModal").modal("show");
    },

    //  -------------------------------------------------------------------------
    //  開啟購物車視窗
    //  -------------------------------------------------------------------------
    openCartModal() {
      $("#cartsModal").modal("show");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../../assets/variables.scss";

.first-nav {
  width: 100vw;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-area,
  .middle-area,
  .right-area {
    display: inline-block;
    transition: 0.5s;
  }

  .left-area {
    margin-left: 100px;
  }

  .middle-area {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 50px;

    h1 {
      background-image: url("../../../../../assets/pics/logo.png");
      background-repeat: no-repeat;
      background-position: center center;
      width: 200px;
      height: 50px;
      text-indent: 101%;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .right-area {
    margin-right: 100px;
    line-height: 50px;

    .signin,
    .admin,
    .cart,
    .menu {
      &:hover {
        color: grey;
      }
    }

    .signin,
    .admin {
      cursor: pointer;
      color: black;
      margin-right: 10px;
      text-decoration: none;
    }

    .cart {
      font-size: 20px;
      position: relative;

      .count {
        width: 18px;
        height: 18px;
        position: absolute;
        right: 0;
        top: 0;
        background-color: rgba(255, 0, 0, 0.9);
        border-radius: 50%;
        line-height: 18px;
        font-size: 12px;
        font-weight: 600;
        color: white;
      }
    }

    .menu {
      display: none;
      font-size: 20px;
    }
  }

  .dropdownFirst {
    position: absolute;
    right: 0;
    top: 50px;
    height: 100vh;
    width: 70vw;
    background-color: #fff;
    animation: animate 1s linear;

    ul {
      list-style: none;

      li {
        text-align: right;
        font-size: 20px;
        margin-bottom: 10px;
        padding: 20px 20px 0 50px;
        cursor: pointer;

        a {
          color: black;
          text-decoration: none;

          &:hover {
            color: gray;
          }

          &.active {
            font-weight: 600;
            border-bottom: 1px solid #000;
          }
        }
      }
    }
  }

  @keyframes animate {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  // 平板
  @include pad() {
    .left-area {
      display: none;
      margin-left: 10px;
    }

    .middle-area {
      position: unset;
      transform: translateX(0);
    }

    .right-area {
      margin-right: 10px;

      .signin,
      .admin {
        display: none;
      }

      .menu {
        display: inline;
      }
    }
  }

  // 手機
  @include mobile() {
  }
}
</style>
