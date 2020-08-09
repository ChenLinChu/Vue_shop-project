<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li :class="{'disabled': !pagination.has_pre}" class="page-item">
        <a
          @click.prevent="childGetProducts(pagination.current_page - 1)"
          class="page-link"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{'active': pagination.current_page === page }"
        class="page-item"
      >
        <a @click.prevent="childGetProducts(page)" class="page-link" href="#">{{page}}</a>
      </li>
      <li :class="{'disabled': !pagination.has_next}" class="page-item">
        <a
          @click.prevent="childGetProducts(pagination.current_page + 1)"
          class="page-link"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["pagination"],
  methods: {
    childGetProducts(page) {
      this.$emit("getProducts", page);
    },
  },
};
</script>