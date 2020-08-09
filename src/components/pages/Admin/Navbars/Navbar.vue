<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#"
      >Company name</a
    >
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" @click.prevent="checkSignStatus">
          <span v-if="signStatus">登出</span>
          <span v-else>登入</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['signStatus'],
  methods: {
    checkSignStatus() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;

      vm.$http.post(api).then((res) => {
        if (res.data.success) {
          vm.$router.push('/signin');
        }
      });
    },
  },
};
</script>
