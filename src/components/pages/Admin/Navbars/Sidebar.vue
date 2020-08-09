<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="sidebar-sticky">
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1 text-muted"
      >
        <span>管理功能 - 需驗證</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item active">
          <router-link to="/admin/products" class="nav-link">
            <i class="fas fa-box mr-2"></i>產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/orders" class="nav-link">
            <i class="fas fa-list-ul mr-2"></i>訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/tickets" class="nav-link">
            <i class="fas fa-ticket-alt mr-2"></i>優惠券
          </router-link>
        </li>
      </ul>

      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>登入狀態：</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <p v-if="signStatus" class="nav-link">登入中</p>
          <p v-else class="nav-link text-danger">未登入</p>
          <router-link class="nav-link" to="/customer/home">進入前台</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["signStatus"],
};
</script>
