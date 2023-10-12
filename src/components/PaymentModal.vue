<template>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Proceed to checkout</h5>
          <button
            @click="$emit('close')"
            type="button"
            class="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="text-center">Pay to: {{ order.wallet }}</p>
          <p class="text-center">
            <vue-qrcode :value="order.wallet" />
          </p>
          <p class="text-center">Sum: {{ gweiToEth(order.sum) }} ETH</p>
          <p class="text-center" v-if="!orderData.isPaid">
            Confirmation count:
            {{
              orderData.confirmationCount
                ? orderData.confirmationCount
                : orderData.isPaid
                ? "1"
                : "0"
            }}
          </p>
          <p class="text-center">
            Payment confirmed: {{ orderData.isPaid ? "yes" : "no" }}
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Proceed</button>
          <button
            @click="$emit('close')"
            type="button"
            class="btn btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { gweiToEth } from "@/utils/converter";
import Order from "@/types/Order";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import OrderService from "@/services/OrderService";

export default defineComponent({
  name: "payment-modal",
  data() {
    return {
      isConfirmed: false,
      orderData: {
        confirmationCount: 0,
        ethRecieved: 0,
        isPaid: false,
        isfinished: false,
      },
    };
  },
  components: {
    VueQrcode,
  },
  methods: {
    gweiToEth(sum: number) {
      return gweiToEth(sum);
    },
    checkOrderPaid() {
      if (!this.isConfirmed) {
        if (this.order) {
          console.log(this.order);
          OrderService.checkOrder(this.order.id).then((response) => {
            console.log(response.data);
            const ord = response.data;
            this.orderData.ethRecieved = ord.ethRecieved;

            if (ord.orderStatus == "confirming" || ord.status == "paid") {
              this.orderData.confirmationCount =
                ord.lastBlock - ord.orderAtBlock;
            }
            if (ord.orderStatus == "paid") {
              this.orderData.isPaid = true;
            } else {
              setTimeout(this.checkOrderPaid, 5000);
            }
          });
        }
      }
    },
  },
  props: {
    order: {
      type: Object as PropType<Order>,
    },
  },
  mounted() {
    setTimeout(this.checkOrderPaid, 5000);
  },
});
</script>
<style scoped lang="scss">
.show {
  display: block;
}
</style>
