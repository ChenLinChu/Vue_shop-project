<template>
  <!-- 登入視窗 -->
  <div
    id="signinModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <input
            class="email"
            :value="user.username"
            type="email"
            placeholder="請輸入帳號"
          />
          <input
            class="password"
            :value="user.password"
            type="password"
            placeholder="請輸入密碼"
          />
          <div @click.prevent="signin" class="signin">登入</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    //  -------------------------------------------------------------------------
    //  登入
    //  -------------------------------------------------------------------------
    signin() {
      this.$store.dispatch('signinUser', {
        username: 'chenlinchu637@gmail.com',
        password: 'billyjay159',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.email,
.password {
  border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 10px;
  width: 100%;
  height: 40px;
  padding-left: 20px;
  font-size: 17px;
  margin-bottom: 20px;
}

.signin {
  height: 40px;
  line-height: 40px;
  background-color: black;
  border-radius: 10px;
  color: white;
  text-align: center;
  cursor: pointer;
}
</style>
