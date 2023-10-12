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
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter your email"
              v-model="email"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click.prevent="submitCheckout"
            type="button"
            class="btn btn-primary"
          >
            Proceed
          </button>
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
import { defineComponent } from "vue";
import { mapState } from "vuex";
import ProductCartDTO from "@/types/ProductCartDTO";

export default defineComponent({
  name: "checkout-modal",
  data() {
    return {
      email: "",
    };
  },
  computed: {
    ...mapState(["order"]),
    /* eslint-disable-next-line */
    sum(this: any): number {
      return this.order.products.reduce(
        (sum: number, product: ProductCartDTO) =>
          sum + this.getProductSum(product.id, product.quantity),
        0
      );
    },
  },
  methods: {
    submitCheckout() {
      this.$emit("checkout", this.email);
    },
  },
});
</script>
<style scoped lang="scss">
.show {
  display: block;
}
</style>
