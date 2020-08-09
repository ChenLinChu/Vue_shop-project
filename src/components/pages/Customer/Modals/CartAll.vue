<template>
  <!-- 查看購物車 -->
  <div
    class="modal fade"
    id="cartsModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-body">
          <!-- 購物車內容 -->
          <table class="table">
            <thead>
              <tr>
                <th width="10"></th>
                <th width="280">品名</th>
                <th width="160" class="text-right">數量</th>
                <th width="130" class="text-right">單價</th>
                <th width="100" class="text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cart in cartAll" :key="cart.id">
                <td>
                  <div
                    class="productPic"
                    :style="{
                      backgroundImage: `url(${cart.product.imageUrl})`,
                    }"
                  ></div>
                </td>
                <td>
                  <span class="text-overflow-cart productTitle">
                    {{
                    cart.product.title
                    }}
                  </span>
                  <div class="text-primary" v-if="cart.coupon">已套用優惠券</div>
                </td>
                <td class="text-right">
                  {{ cart.qty }}
                  {{ cart.product.unit }}
                </td>

                <td v-if="cart.product.price === ''" class="text-right">
                  <span>
                    {{
                    (cart.product.origin_price * currencyStatus.exchange)
                    | currency
                    }}
                    <b>{{ currencyStatus.currency }}</b>
                  </span>
                  <div v-if="cart.coupon" class="text-primary">
                    {{
                    (((cart.product.origin_price * cart.coupon.percent) /
                    100) *
                    currencyStatus.exchange)
                    | currency
                    }}
                    <b>{{ currencyStatus.currency }}</b>
                  </div>
                </td>
                <td v-else class="text-right">
                  <span>
                    {{
                    (cart.product.price * currencyStatus.exchange) | currency
                    }}
                    <b>{{ currencyStatus.currency }}</b>
                  </span>
                  <div v-if="cart.coupon" class="text-primary">
                    {{
                    (((cart.product.price * cart.coupon.percent) / 100) *
                    currencyStatus.exchange)
                    | currency
                    }}
                    <b>{{ currencyStatus.currency }}</b>
                  </div>
                </td>
                <td class="text-right">
                  <a class="remove" @click.prevent="customerRemoveProductFromCarts(cart)">刪除</a>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td class="text-right">總金額</td>
                <td class="text-right">
                  {{ (cartTotal * currencyStatus.exchange) | currency }}
                  <b>{{ currencyStatus.currency }}</b>
                </td>
                <td></td>
              </tr>
              <tr v-if="cartFinalTotal !== cartTotal">
                <td></td>
                <td></td>
                <td class="text-right">折扣後</td>
                <td class="text-right text-primary">
                  {{ (cartFinalTotal * currencyStatus.exchange) | currency }}
                  <b>{{ currencyStatus.currency }}</b>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <!-- 套用優惠券 -->
          <div class="input-group mt-4 input-group-sm">
            <input
              v-model="ticket_code"
              type="text"
              class="form-control text-primary"
              placeholder="請輸入優惠碼(共四碼)"
            />
            <div class="input-group-append">
              <button
                @click="customerAddTicketToCarts(ticket_code)"
                class="btn btn-outline-secondary"
                type="button"
              >套用優惠碼</button>
            </div>
          </div>
          <!-- 個人資料 -->
          <div class="mt-4">
            <ValidationObserver v-slot="{ invalid }">
              <form @submit.prevent="createOrder(form)">
                <!-- email -->
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                  <div class="form-group">
                    <label for="email">email</label>
                    <input
                      :class="{ 'is-invalid': errors[0] }"
                      type="email"
                      class="form-control"
                      name="email"
                      v-model="form.user.email"
                      placeholder="請輸入 Email"
                      required
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <!-- 姓名 -->
                <ValidationProvider name="姓名" rules="required" v-slot="{ errors }">
                  <div class="form-group">
                    <label for="name">姓名</label>
                    <input
                      :class="{ 'is-invalid': errors[0] }"
                      type="text"
                      class="form-control"
                      name="name"
                      v-model="form.user.name"
                      placeholder="輸入姓名"
                      required
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <!-- 電話 -->
                <ValidationProvider name="電話" rules="required" v-slot="{ errors }">
                  <div class="form-group">
                    <label for="tel">電話</label>
                    <input
                      :class="{ 'is-invalid': errors[0] }"
                      type="tel"
                      class="form-control"
                      name="tel"
                      v-model="form.user.tel"
                      placeholder="請輸入電話"
                      required
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <!-- 地址 -->
                <ValidationProvider name="地址" rules="required" v-slot="{ errors }">
                  <div class="form-group">
                    <label for="address">地址</label>
                    <input
                      :class="{ 'is-invalid': errors[0] }"
                      type="text"
                      class="form-control"
                      name="address"
                      v-model="form.user.address"
                      placeholder="請輸入地址"
                      required
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <!-- 留言 -->
                <div class="form-group">
                  <textarea name class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>
                <!-- 去買單 -->
                <div class="text-right">
                  <button :disabled="invalid" type="submit" class="createBtn">去買單</button>
                </div>
              </form>
            </ValidationObserver>
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
      ticket_code: "",
      form: {
        user: {},
      },
    };
  },
  created() {
    this.customerGetCartAll();
  },
  computed: {
    ...mapGetters(["currencyStatus", "cartAll", "cartTotal", "cartFinalTotal"]),
  },
  methods: {
    ...mapActions([
      "customerGetCartAll",
      "customerRemoveProductFromCarts",
      "customerAddTicketToCarts",
    ]),

    createOrder(form) {
      this.$store.dispatch("createOrder", form);
    },
  },
};
</script>

<style lang="scss" scoped>
b {
  font-size: 12px;
}

.productPic {
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: contain;
}

.productTitle {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.remove {
  cursor: pointer;

  &:hover {
    color: red;
  }
}

.createBtn {
  cursor: pointer;
  text-decoration: none;
  background-color: rgb(22, 22, 22);
  border: 2px solid;
  border-color: rgb(22, 22, 22);
  color: white;
  padding: 5px 50px;
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
</style>
