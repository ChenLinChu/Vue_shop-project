<template>
  <fragment>
    <!-- HEADER -->
    <Header />

    <!-- MAIN -->
    <router-view></router-view>

    <!-- FOOTER -->
    <Footer />

    <!-- MODAL -->
    <Signin />
    <ProductSingle />
    <CheckPurchase />
    <CartAll />
  </fragment>
</template>

<script>
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Signin from "./Modals/Signin";
import ProductSingle from "./Modals/ProductSingle";
import CheckPurchase from "./Modals/CheckPurchase";
import CartAll from "./Modals/CartAll";

export default {
  components: {
    Header,
    Footer,
    Signin,
    ProductSingle,
    CheckPurchase,
    CartAll,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
