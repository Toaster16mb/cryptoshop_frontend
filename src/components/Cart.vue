<template>
  <div class="cart-list row">
    <div class="col-md-6">
      <h4>Cart</h4>
      <table>
        <tr>
          <th>Product name</th>
          <th>Product price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
        <tr v-bind:key="product.id" v-for="product in order.products">
          <td>
            {{ getProductName(product.id) }}
          </td>
          <td>
            {{ getProductPrice(product.id) }}
          </td>
          <td class="text-right">
            {{ product.quantity }}
          </td>
          <td class="text-right">
            {{ getProductSum(product.id, product.quantity) }}
          </td>
        </tr>
        <tr>
          <th class="text-right" colspan="3">Total:</th>
          <th class="text-right">
            {{ sum }}
          </th>
        </tr>
      </table>

      <button class="m-3 btn btn-sm btn-info" @click="checkout">
        Checkout
      </button>
      <button class="m-3 btn btn-sm btn-danger" @click="clearCart">
        Clear cart
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import $store from "@/store";
import Product from "@/types/Product";
import { gweiToEth } from "@/utils/converter";
import ProductCartDTO from "@/types/ProductCartDTO";

export default defineComponent({
  name: "products-list",
  data() {
    return {};
  },
  computed: {
    ...mapState(["order"]),
    sum(this: any): number {
      return this.order.products.reduce(
        (sum: number, product: ProductCartDTO) =>
          sum + this.getProductSum(product.id, product.quantity),
        0
      );
    },
  },
  methods: {
    checkout() {
      this.$emit("checkout");
    },
    clearCart() {
      $store.dispatch("clearCart");
    },
    getProductInfo(id: number): Product | undefined {
      return this.productList.find((product: Product) => product.id === id);
    },
    getProductName(id: number): string {
      return this.getProductInfo(id)?.name || "";
    },
    getProductPrice(id: number): number {
      return gweiToEth(this.getProductInfo(id)?.price || 0);
    },
    getProductSum(id: number, quantity: number) {
      return this.getProductPrice(id) * quantity;
    },
  },
  props: {
    productList: {
      default: () => [],
    },
  },
});
</script>
<style scoped lang="scss">
.cart-list {
  white-space: nowrap;
  table {
    border-collapse: collapse;
    td,
    th {
      padding: 5px;
      border: 1px solid #ddd;
    }
  }
}
</style>
