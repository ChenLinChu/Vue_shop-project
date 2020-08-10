<template>
  <div class="home">
    <Slider />
    <LatestProducts />
  </div>
</template>

<script>
import Slider from "./Widgets/Slider";
import LatestProducts from "./Widgets/LatestProducts";

export default {
  components: {
    Slider,
    LatestProducts,
  },
};
</script>
