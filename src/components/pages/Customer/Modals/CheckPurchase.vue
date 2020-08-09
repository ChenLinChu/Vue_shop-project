<template>
  <div
    class="modal fade"
    id="checkPurchaseModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body ml-2">
          <div class="paragraph1 mb-2">
            是否將
            <strong>{{ productSingle.title }}</strong>
          </div>
          <div class="paragraph2 mb-2">
            共
            <strong>{{ selectedNum }}</strong>
            {{ productSingle.unit }} 加入購物車？
          </div>
        </div>
        <div class="modal-footer mr-2">
          <button class="cancelBtn" type="button" data-dismiss="modal">取消</button>
          <button class="addBtn" type="button" @click="customerAddProductToCarts">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["productSingle", "selectedNum"]),
  },
  methods: {
    ...mapActions(["customerAddProductToCarts"]),
  },
};
</script>

<style lang="scss" scoped>
.cancelBtn {
  text-decoration: none;
  background-color: white;
  border: 1px solid;
  border-color: rgb(22, 22, 22);
  color: rgb(22, 22, 22);
  padding: 5px 30px;
  transition: 0.25s;

  &:hover,
  &:focus {
    border-color: gray;
    background-color: white;
    color: gray;
    box-shadow: 0 0.5em 0.5em -0.4em gray;
    transform: translateY(-0.3em);
  }
}

.addBtn {
  background-color: rgb(22, 22, 22);
  border: 1px solid;
  border-color: rgb(22, 22, 22);
  color: white;
  padding: 5px 30px;
  transition: 0.25s;

  &:hover,
  &:focus {
    border-color: gray;
    background-color: gray;
    color: white;
    box-shadow: 0 0.5em 0.5em -0.4em gray;
    transform: translateY(-0.3em);
  }
}
</style>