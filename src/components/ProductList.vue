<template>
  <div class="list row">
    <div class="col-md-4">
      <h4>Products List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(product, index) in products"
          :key="index"
          @click="setActiveProduct(product, index)"
        >
          {{ product.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-4">
      <div v-if="currentProduct.id">
        <h4>Product</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentProduct.name }}
        </div>
        <div>
          <label><strong>Price(ETH):</strong></label>
          {{ weiToEth(currentProduct.price) }}
        </div>

        <router-link
          v-if="isAuthenticated"
          :to="'/products/' + currentProduct.id"
          class="badge badge-warning"
        >
          Edit
        </router-link>
        <input
          v-model="cartQuantity"
          type="number"
          min="1"
          step="1"
          placeholder="Quantity"
        />
        <a href="#" @click.prevent="addToCart()" class="badge badge-success">
          Add to cart
        </a>
        <a
          href="#"
          @click.prevent="removeFromCart()"
          class="badge badge-danger"
        >
          Remove from cart
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Product...</p>
      </div>
    </div>
    <div class="col-md-4">
      <cart
        @checkout="checkoutModalActive = true"
        :product-list="products"
      ></cart>
    </div>
    <checkout-modal
      @checkout="checkout"
      v-if="checkoutModalActive"
      @close="checkoutModalActive = false"
      class="show"
    ></checkout-modal>
    <payment-modal
      :order="customerOrder"
      v-if="paymentModalActive"
      @close="paymentModalActive = false"
      class="show"
    ></payment-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductDataService from "@/services/ProductService";
import Product from "@/types/Product";
import ResponseData from "@/types/ResponseData";
import { gweiToEth } from "@/utils/converter";
import ProductCartDTO from "@/types/ProductCartDTO";
import { mapGetters, mapState } from "vuex";
import $store from "@/store";
import Cart from "@/components/Cart.vue";
import CheckoutModal from "@/components/CheckoutModal.vue";
import OrderService from "@/services/OrderService";
import CheckoutOrderDTO from "@/types/CheckoutOrderDTO";
import PaymentModal from "@/components/PaymentModal.vue";
import Order from "@/types/Order";

export default defineComponent({
  name: "products-list",
  data() {
    return {
      customerOrder: {} as Order,
      products: [] as Product[],
      currentProduct: {} as Product,
      currentIndex: -1,
      cartQuantity: 1,
      checkoutModalActive: false,
      paymentModalActive: false,
    };
  },
  components: {
    PaymentModal,
    CheckoutModal,
    Cart,
  },
  computed: {
    ...mapState(["order"]),
    ...mapGetters("user", ["getToken", "isAuthenticated"]),
  },
  methods: {
    checkout(email: string) {
      const order = {
        products: this.order.products as ProductCartDTO[],
        email,
      } as CheckoutOrderDTO;
      OrderService.checkout(order)
        .then((response: ResponseData) => {
          this.checkoutModalActive = false;
          const { orderId } = response.data;
          this.$router.push({
            name: "order",
            params: { orderId },
          });
          OrderService.getOrder(orderId).then((response: ResponseData) => {
            this.customerOrder = response.data as Order;
            this.paymentModalActive = true;
          });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    addToCart() {
      const dto = {
        id: this.currentProduct.id,
        quantity: this.cartQuantity,
      } as ProductCartDTO;
      $store.dispatch("setCartQuantity", dto);
    },
    removeFromCart() {
      const dto = {
        id: this.currentProduct.id,
        quantity: 0,
      } as ProductCartDTO;
      $store.dispatch("setCartQuantity", dto);
    },
    weiToEth(wei: string | number) {
      wei = Number(wei);
      return gweiToEth(wei);
    },
    retrieveProducts() {
      ProductDataService.getAll()
        .then((response: ResponseData) => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProduct = {} as Product;
      this.currentIndex = -1;
    },

    setActiveProduct(product: Product, index = -1) {
      this.currentProduct = product;
      this.currentIndex = index;
      this.cartQuantity = 1;
    },

    removeAllProducts() {
      ProductDataService.deleteAll()
        .then((response: ResponseData) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveProducts();
    if (this.$route.params.orderId) {
      OrderService.getOrder(Number(this.$route.params.orderId)).then(
        (response: ResponseData) => {
          this.customerOrder = response.data as Order;
          this.paymentModalActive = true;
        }
      );
    }
  },
});
</script>
