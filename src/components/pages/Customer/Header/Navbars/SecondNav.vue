<template>
  <nav class="second-nav hidden-sm hidden-xs">
    <!-- 左側欄位 -->
    <div class="left-area">
      <ul>
        <li>
          <router-link to="/customer/latestProducts">最近上市</router-link>
        </li>
        <li>
          <router-link to="/customer/allProducts">全部商品</router-link>
        </li>
        <li>
          <router-link to="/customer/discount">折扣專區</router-link>
        </li>
      </ul>
    </div>

    <!-- 右側欄位 -->
    <div class="right-area input-group input-group-sm">
      <input class="form-control" type="text" />
      <div class="input-group-append">
        <button class="btn btn-outline-dark">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "../../../../../assets/variables.scss";

.second-nav {
  width: 100vw;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-area {
    margin-left: 100px;

    ul {
      list-style: none;

      li {
        float: left;
        margin-right: 40px;

        a {
          color: black;
          text-decoration: none;

          &:hover {
            color: grey;
          }

          &.active {
            font-weight: 600;
            border-bottom: 1px solid #000;
          }
        }
      }
    }
  }

  .right-area {
    margin-right: 100px;
    width: 200px;
  }

  // 平板
  @include pad() {
    display: none;
  }

  // 手機
  @include mobile() {
    display: none;
  }
}
</style>
