<template>
  <div class="home">
    <Slider />
    <LatestProducts />

    <LatestCategory />
  </div>
</template>

<script>
import Slider from "./Widgets/Slider";
import LatestProducts from "./Widgets/LatestProducts";
import LatestCategory from "./Widgets/LatestCategory";

export default {
  components: {
    Slider,
    LatestProducts,
    LatestCategory,
  },
};
</script>
