<template>
  <div>
    <Navbar :signStatus="signStatus" />
    <FileFormat />
    <div class="container-fluid">
      <div class="row">
        <Sidebar :signStatus="signStatus" />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbars/Navbar";
import Sidebar from "./Navbars/Sidebar";
import FileFormat from "./Alerts/FileFormat";

export default {
  components: {
    Navbar,
    Sidebar,
    FileFormat,
  },
  data() {
    return {
      signStatus: "",
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

      // 取得並儲存登入狀態的資料
      const signStatus = await vm.getSignStatus().then((response) => response);
      vm.signStatus = await signStatus.success;
    },

    //  -------------------------------------------------------------------------
    //  取得登入狀態
    //  -------------------------------------------------------------------------
    getSignStatus() {
      return new Promise((resolve, reject) => {
        // 宣告常數
        const vm = this;
        const api = `${process.env.APIPATH}/api/user/check`;

        // 取得資料
        resolve(vm.$http.post(api).then((response) => response.data));
      });
    },
  },
};
</script>
