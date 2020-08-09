import Vue from 'vue';
import Router from 'vue-router';

// 前台
import Customer from '@/components/pages/Customer/Customer';
import Home from '@/components/pages/Customer/Main/Home/Home';
import LatestProducts from '@/components/pages/Customer/Main/LatestProducts/LatestProducts';
import AllProducts from '@/components/pages/Customer/Main/AllProducts/AllProducts';
import Discount from '@/components/pages/Customer/Main/Discount/Discount';
import Checkout from '@/components/pages/Customer/Main/Checkout/Checkout';

// 後台
import Signin from '@/components/pages/Admin/Signin';
import Admin from '@/components/pages/Admin/Admin';
import Products from '@/components/pages/Admin/Main/Products';
import Orders from '@/components/pages/Admin/Main/Orders';
import Tickets from '@/components/pages/Admin/Main/Tickets';

Vue.use(Router);

export default new Router({
  routes: [
    // 禁止使用者轉至不知名路由，並導回登入頁面
    {
      path: '*',
      redirect: '/signin',
    },

    //  -------------------------------------------------------------------------
    //  前台
    //  -------------------------------------------------------------------------
    {
      path: '/customer',
      name: 'Customer',
      component: Customer,
      children: [
        // 首頁
        {
          path: 'home',
          name: 'Home',
          component: Home,
        },
        // 最新上市
        {
          path: 'latestProducts',
          name: 'LatestProducts',
          component: LatestProducts,
        },
        // 全部商品
        {
          path: 'allProducts',
          name: 'AllProducts',
          component: AllProducts,
        },
        // 折扣專區
        {
          path: 'discount',
          name: 'Discount',
          component: Discount,
        },
        // 結帳
        {
          path: 'checkout/:orderId',
          name: 'Checkout',
          component: Checkout,
        },
      ],
    },

    //  -------------------------------------------------------------------------
    //  後台
    //  -------------------------------------------------------------------------

    // 登入頁面
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
    // 管理功能 - 需驗證
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        // 產品列表
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        // 訂單列表
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
        // 優惠券
        {
          path: 'tickets',
          name: 'Tickets',
          component: Tickets,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
  // 點擊路由加入class名稱
  linkActiveClass: 'active',
});
