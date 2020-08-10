<template>
  <div class="latestProducts">
    <h3>最近上市</h3>
    <div class="latestProductsContainer" v-for="product in productTwelve" :key="product.id">
      <div class="product">
        <!-- 特價標籤 -->
        <div
          class="saleTag"
          v-if="product.origin_price !== product.price"
        >{{Math.floor((product.price / product.origin_price) * 100) / 10}} 折</div>
        <!-- 最近上市標籤 -->
        <div class="newTag" v-else>NEW</div>
        <!-- 產品圖片 -->
        <div
          class="productPic"
          :style="{ backgroundImage: `url(${product.imageUrl})` }"
          @click="openProductSingle(product.id)"
        ></div>
        <!-- 產品標題 -->
        <div class="productTitle" @click="openProductSingle(product.id)">
          <p>{{ product.title }}</p>
        </div>
        <!-- 價格 -->
        <div class="productPrice">
          <!-- 沒有特價時使用 -->
          <div v-if="product.price === product.origin_price">
            <span>
              {{ (product.origin_price * currencyStatus.exchange) | currency }}
              <b>{{ currencyStatus.currency }}</b>
            </span>
          </div>
          <!-- 有特價時使用 -->
          <div v-else>
            <del v-if="product.price">
              {{ (product.origin_price * currencyStatus.exchange) | currency }}
              <b>{{ currencyStatus.currency }}</b>
            </del>
            <span>
              {{ (product.price * currencyStatus.exchange) | currency }}
              <b>{{ currencyStatus.currency }}</b>
            </span>
          </div>
        </div>
        <!-- 售罄標籤 -->
        <div v-if="product.stock == 0" class="soldOut">SOLD OUT</div>
      </div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
import $ from "jquery";

import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    // 執行初始
    this.customerGetProductTwelve();
  },
  computed: {
    ...mapGetters(["currencyStatus", "productTwelve"]),
  },
  methods: {
    ...mapActions(["customerGetProductTwelve"]),

    //  -------------------------------------------------------------------------
    //  開啟產品資料視窗 - 單一
    //  -------------------------------------------------------------------------
    openProductSingle(id) {
      this.$store.dispatch("customerGetProductSingle", id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/variables.scss";

.latestProducts {
  h3 {
    text-align: center;
    padding: 40px 0 10px 0;
  }

  .latestProductsContainer {
    width: 100%;

    .product {
      margin-top: 30px;
      width: 16.6666667%;
      height: 300px;
      float: left;
      position: relative;
      text-align: center;

      .newTag {
        position: absolute;
        top: 3%;
        left: 10%;
        width: 40px;
        height: 20px;
        background-color: black;
        z-index: 5;
        color: white;
        font-size: 12px;
        line-height: 20px;
      }

      .saleTag {
        position: absolute;
        top: 3%;
        left: 10%;
        width: 40px;
        height: 20px;
        background-color: red;
        z-index: 5;
        color: white;
        font-size: 12px;
        line-height: 20px;
      }

      .productPic,
      .productTitle,
      .productPrice,
      .soldOut {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      .productPic,
      .productTitle {
        cursor: pointer;
      }

      .productPic {
        width: 70%;
        height: 70%;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }

      .productTitle,
      .productPrice {
        width: 80%;
      }

      .productTitle {
        font-size: 12px;
        bottom: 30px;

        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
        }
      }

      .productPrice {
        bottom: 0;

        del,
        span {
          display: block;

          b {
            font-size: 12px;
          }
        }

        del {
          color: gray;
          font-size: 12px;
        }
      }

      .soldOut {
        width: 100%;
        font-size: 12px;
        font-weight: 600;
        bottom: -15px;
      }
    }
  }

  @include pad() {
    .latestProductsContainer {
      .product {
        height: 250px;
        width: 25%;

        .productTitle,
        .productPrice {
          width: 95%;
        }
      }
    }
  }

  @include mobile() {
    h3 {
      text-align: center;
      padding: 20px 0 0 0;
    }

    .latestProductsContainer {
      .product {
        height: 200px;
        width: 33.3333333%;
      }
    }
  }
}
</style>
