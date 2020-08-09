<template>
  <header class="sticky-top">
    <FirstNav />
    <SecondNav />
    <Advertisement />
  </header>
</template>

<script>
import FirstNav from "./Navbars/FirstNav";
import SecondNav from "./Navbars/SecondNav";
import Advertisement from "./Advertisement/Advertisement";

export default {
  components: {
    FirstNav,
    SecondNav,
    Advertisement,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
