<template>
  <div class="mt-4">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary" @click="openAddProductModal(true)">建立產品</button>
    </div>
    <table class="table mt-4">
      <!-- 標題 -->
      <thead>
        <tr>
          <th width="90">分類</th>
          <th>品名</th>
          <th width="100" class="text-right">庫存數量</th>
          <th width="100" class="text-right">原價</th>
          <th width="100" class="text-right">售價</th>
          <th width="80" class="text-right">啟用狀態</th>
          <th width="80" class="text-right">編輯</th>
          <th width="80" class="text-right">刪除</th>
        </tr>
      </thead>
      <!-- 欄位 -->
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <!-- 分類 -->
          <td>
            <span v-if="!product.category" class="text-danger">待輸入</span>
            <span v-else>{{ product.category }}</span>
          </td>
          <!-- 品名 -->
          <td>
            <span v-if="!product.title" class="text-danger">待輸入</span>
            <span v-else>{{ product.title }}</span>
          </td>
          <!-- 庫存數量 -->
          <td class="text-right">
            <span
              v-if="product.stock <= 5"
              class="text-danger"
            >{{ product.stock | stock }} {{ product.unit }}</span>
            <span v-else>{{ product.stock | stock }} {{ product.unit }}</span>
          </td>
          <!-- 原價 -->
          <td class="text-right">
            <span v-if="!product.origin_price" class="text-danger">待輸入</span>
            <span v-else>{{ product.origin_price | currency }}</span>
          </td>
          <!-- 售價 -->
          <td class="text-right">
            <span v-if="!product.price" class="text-danger">無</span>
            <span v-else>{{ product.price | currency }}</span>
          </td>
          <!-- 啟用狀態 -->
          <td class="text-right">
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <!-- 編輯 -->
          <td class="text-right">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openAddProductModal(false, product)"
            >編輯</button>
          </td>
          <!-- 刪除 -->
          <td class="text-right">
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteProductModal(product)"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁按鈕 -->
    <Pagination
      class="mt-4"
      :pagination="pagination"
      @getProducts="getProducts"
      v-if="products.length !== 0"
    />
    <h3 class="mt-4 text-center" v-else>目前暫無產品</h3>

    <!-- 新增產品視窗 -->
    <div
      class="modal fade"
      id="addProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    v-model="tempProduct.imageUrl"
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i v-if="status.isFileUploading" class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  :src="tempProduct.imageUrl"
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      v-model="tempProduct.unit"
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      v-model="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      v-model="tempProduct.price"
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">庫存數量</label>
                    <input
                      v-model="tempProduct.stock"
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入庫存數量"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button @click="updateProduct" type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 確認刪除產品視窗 -->
    <div
      class="modal fade"
      id="deleteProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

import Pagination from "./Widgets/Pagination";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      // 產品資料
      products: [],
      // 產品資料 - 新增
      tempProduct: {},
      // 分頁
      pagination: {},
      // 判斷產品是新增或已新增
      isNew: false,
      // 判斷全畫面讀取
      isLoading: false,
      // 判斷個別物件讀取
      status: {
        isFileUploading: false,
      },
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    //  -------------------------------------------------------------------------
    //  取得產品資料
    //  -------------------------------------------------------------------------
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.products = res.data.products;
          vm.isLoading = false;
          vm.pagination = res.data.pagination;
        }
      });

      vm.isLoading = false;
    },

    //  -------------------------------------------------------------------------
    //  判斷產品是新增或已新增 > 開啟新增產品視窗
    //  -------------------------------------------------------------------------
    openAddProductModal(isNew, product) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, product);
        this.isNew = false;
      }

      $("#addProductModal").modal("show");
    },

    //  -------------------------------------------------------------------------
    //  上傳照片檔案
    //  -------------------------------------------------------------------------
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      vm.status.isFileUploading = true;
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          vm.status.isFileUploading = false;

          if (res.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", res.data.imageUrl);
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
    },

    //  -------------------------------------------------------------------------
    //  判斷產品是新增或已新增 > 更新產品列表
    //  -------------------------------------------------------------------------
    updateProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = "post";
      const vm = this;

      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: vm.tempProduct }).then((res) => {
        if (res.data.success) {
          $("#addProductModal").modal("hide");

          vm.getProducts(vm.pagination.current_page);
        } else {
          $("#addProductModal").modal("hide");
        }
      });
    },

    //  -------------------------------------------------------------------------
    //  開啟刪除產品視窗
    //  -------------------------------------------------------------------------
    openDeleteProductModal(product) {
      this.tempProduct = Object.assign({}, product);
      $("#deleteProductModal").modal("show");
    },

    //  -------------------------------------------------------------------------
    //  確定刪除產品
    //  -------------------------------------------------------------------------
    deleteProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`;

      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          console.log("刪除成功");
        } else {
          console.log("刪除失敗");
        }

        this.getProducts();
        $("#deleteProductModal").modal("hide");
      });
    },
  },
};
</script>
