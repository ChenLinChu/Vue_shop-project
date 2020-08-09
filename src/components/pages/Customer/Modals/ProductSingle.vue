<template>
  <!-- 登入視窗 -->
  <div
    id="productSingleModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <!-- 產品標題 -->
          <h6 class="productTitle">{{ productSingle.title }}</h6>
          <!-- 產品圖片 -->
          <div class="productPic" :style="{ backgroundImage: `url(${productSingle.imageUrl})` }"></div>
          <!-- 價格 -->
          <div class="productPrice">
            <!-- 沒有特價時使用 -->
            <div v-if="productSingle.price === productSingle.origin_price">
              <span>
                {{
                (productSingle.origin_price * currencyStatus.exchange)
                | currency
                }}
                <b>{{ currencyStatus.currency }}</b>
              </span>
            </div>
            <!-- 有特價時使用 -->
            <div v-else>
              <del v-if="productSingle.price">
                {{
                (productSingle.origin_price * currencyStatus.exchange)
                | currency
                }}
                <b>{{ currencyStatus.currency }}</b>
              </del>
              <span>
                {{ (productSingle.price * currencyStatus.exchange) | currency }}
                <b>{{ currencyStatus.currency }}</b>
              </span>
            </div>
          </div>
          <!-- 售罄標籤 -->
          <div class="soldOut" v-if="productSingle.stock == 0">SOLD OUT</div>
          <!-- 連結購物車按鈕 -->
          <div class="cart" v-if="productSingle.stock > 0">
            <select class="custom-select" v-model="numSelected">
              <option
                v-for="num in productSingle.stock"
                :key="productSingle.title + num"
                :value="num"
              >選購 {{ num }} {{ productSingle.unit }}</option>
            </select>
            <!-- 按鈕 -->
            <div class="button">
              <button
                class="cartBtn"
                type="button"
                @click="openCheckPurchaseModal(numSelected)"
              >加入購物車</button>
              <button class="purchaseBtn" type="button" @click="openCheckPurchaseModal(1)">直接購買</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      numSelected: 1,
    };
  },
  computed: {
    ...mapGetters(["productSingle", "currencyStatus"]),
  },
  methods: {
    //  -------------------------------------------------------------------------
    //  開啟確認購買視窗
    //  -------------------------------------------------------------------------
    openCheckPurchaseModal(num) {
      this.$store.dispatch("customerUpdateSelectedNum", num);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-body {
  margin: 0 2%;

  .productTitle {
  }

  .productPic {
    margin: 30px 0;
    width: 100%;
    height: 25vh;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .productPrice,
  .soldOut {
    margin-bottom: 10px;
  }

  .cart {
    .custom-select {
      margin-bottom: 10px;
    }

    .button {
      text-align: right;

      .cartBtn {
        text-decoration: none;
        background-color: white;
        border: 1px solid;
        border-color: rgb(22, 22, 22);
        color: rgb(22, 22, 22);
        padding: 5px 13px;
        transition: 0.25s;

        &:hover,
        &:focus {
          border-color: gray;
          background-color: white;
          color: gray;
          box-shadow: 0 0.5em 0.5em -0.4em gray;
          transform: translateY(-0.3em);
        }
      }

      .purchaseBtn {
        text-decoration: none;
        background-color: rgb(22, 22, 22);
        border: 1px solid;
        border-color: rgb(22, 22, 22);
        color: white;
        padding: 5px 20px;
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
}
</style>
