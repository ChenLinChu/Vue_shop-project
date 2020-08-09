<template>
  <div class="mt-4">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary" @click="openAddTicketModal(true)">建立優惠券</button>
    </div>
    <table class="table mt-4">
      <!-- 標題 -->
      <thead>
        <tr>
          <th>名稱</th>
          <th>優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th class="text-right">啟用狀態</th>
          <th class="text-right">編輯</th>
          <th class="text-right">刪除</th>
        </tr>
      </thead>
      <!-- 欄位 -->
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <!-- 名稱 -->
          <td>
            <span v-if="!ticket.title" class="text-danger">待輸入</span>
            <span v-else>{{ ticket.title }}</span>
          </td>
          <!-- 優惠碼 -->
          <td>
            <span v-if="!ticket.code" class="text-danger">待輸入</span>
            <span v-else>{{ ticket.code }}</span>
          </td>
          <!-- 折扣百分比 -->
          <td>
            <span v-if="ticket.percent === 100" class="text-danger">待輸入</span>
            <span v-else>{{ ticket.percent + '%' }}</span>
          </td>
          <!-- 到期日 -->
          <td>
            <span v-if="!ticket.due_date" class="text-danger">待輸入</span>
            <span v-else>{{ ticket.due_date | date }}</span>
          </td>
          <!-- 啟用狀態 -->
          <td class="text-right">
            <span v-if="ticket.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <!-- 編輯 -->
          <td class="text-right">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openAddTicketModal(false, ticket)"
            >編輯</button>
          </td>
          <!-- 刪除 -->
          <td class="text-right">
            <button class="btn btn-outline-danger btn-sm" @click="openDeleteTicketModal(ticket)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁按鈕 -->
    <Pagination
      class="mt-4"
      :pagination="pagination"
      @getTickets="getTickets"
      v-if="tickets.length !== 0"
    />
    <h3 class="mt-4 text-center" v-else>目前暫無優惠券</h3>

    <!-- 新增優惠券視窗 -->
    <div
      class="modal fade"
      id="addTicketModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">名稱</label>
                  <input
                    v-model="tempTicket.title"
                    type="text"
                    class="form-control"
                    id="ticketTitle"
                    placeholder="請輸入名稱"
                  />
                </div>

                <div class="form-group">
                  <label for="title">優惠碼</label>
                  <input
                    v-model="tempTicket.code"
                    type="text"
                    class="form-control"
                    id="ticketCode"
                    placeholder="請輸入優惠碼"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">折扣百分比</label>
                    <input
                      v-model="tempTicket.percent"
                      type="number"
                      class="form-control"
                      id="category"
                      placeholder="請輸入折扣百分比"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">到期日</label>
                    <input
                      v-model="tempTicket.due_date"
                      type="date"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入到期日"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      v-model="tempTicket.is_enabled"
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
            <button @click="updateTicket" type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 確認刪除優惠券視窗 -->
    <div
      class="modal fade"
      id="deleteTicketModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempTicket.title }}</strong>
            優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteTicket">確認刪除</button>
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
      // 優惠券資料
      tickets: [],
      // 優惠券資料 - 新增
      tempTicket: {},
      // 分頁
      pagination: {},
      // 判斷優惠券是新增或已新增
      isNew: false,
      // 判斷全畫面讀取
      isLoading: false,
    };
  },
  created() {
    this.getTickets();
  },
  methods: {
    //  -------------------------------------------------------------------------
    //  取得優惠券資料
    //  -------------------------------------------------------------------------
    getTickets(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.tickets = res.data.coupons;
          vm.isLoading = false;
          vm.pagination = res.data.pagination;
        }
      });
    },

    //  -------------------------------------------------------------------------
    //  判斷優惠券是新增或已新增 > 開啟新增優惠券視窗
    //  -------------------------------------------------------------------------
    openAddTicketModal(isNew, ticket) {
      if (isNew) {
        this.tempTicket = {};
        this.isNew = true;
      } else {
        this.tempTicket = Object.assign({}, ticket);
        this.isNew = false;
      }

      $("#addTicketModal").modal("show");
    },

    //  -------------------------------------------------------------------------
    //  判斷優惠券是新增或已新增 > 更新優惠券列表
    //  -------------------------------------------------------------------------
    updateTicket() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = "post";
      const vm = this;

      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempTicket.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: vm.tempTicket }).then((res) => {
        if (res.data.success) {
          $("#addTicketModal").modal("hide");

          vm.getTickets(vm.pagination.current_page);
        } else {
          $("#addTicketModal").modal("hide");
          console.log("更新失敗");
        }
      });
    },

    //  -------------------------------------------------------------------------
    //  開啟刪除優惠券視窗
    //  -------------------------------------------------------------------------
    openDeleteTicketModal(ticket) {
      this.tempTicket = Object.assign({}, ticket);
      $("#deleteTicketModal").modal("show");
    },

    //  -------------------------------------------------------------------------
    //  確定刪除優惠券
    //  -------------------------------------------------------------------------
    deleteTicket() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.tempTicket.id}`;

      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          console.log("刪除成功");
        } else {
          console.log("刪除失敗");
        }

        this.getTickets();
        $("#deleteTicketModal").modal("hide");
      });
    },
  },
};
</script>