<template>
  <div v-if="currentProduct.id" class="edit-form">
    <h4>Product</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentProduct.name"
        />
      </div>
      <div class="form-group">
        <label for="price">Price(GWei)</label>
        <input
          type="number"
          min="0"
          class="form-control"
          id="price"
          v-model="currentProduct.price"
        />
      </div>
      <div class="form-group">
        <label for="priceEth">Price(ETH)</label>
        <input
          type="number"
          min="0"
          class="form-control"
          id="priceEth"
          :value="getPriceEth(currentProduct.price)"
          @change="setPriceEth"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteProduct">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateProduct">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Product...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductDataService from "@/services/ProductService";
import Product from "@/types/Product";
import ResponseData from "@/types/ResponseData";
import { ethToGWei, gweiToEth } from "@/utils/converter";

export default defineComponent({
  name: "product",
  data() {
    return {
      currentProduct: {} as Product,
      message: "",
    };
  },
  methods: {
    setPriceEth(event: InputEvent) {
      const inputElement = event.target as HTMLInputElement;
      this.currentProduct.price = ethToGWei(Number(inputElement.value));
    },
    getPriceEth(gwei: string | number | null) {
      gwei = Number(gwei);
      return gweiToEth(gwei);
    },
    getProduct(id: string | number) {
      ProductDataService.get(id)
        .then((response: ResponseData) => {
          this.currentProduct = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateProduct() {
      ProductDataService.update(this.currentProduct.id, this.currentProduct)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "products" });
        })
        .catch((e: Error) => {
          this.$router.push("/auth");
          console.log(e);
        });
    },

    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "products" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getProduct(Number(this.$route.params.id));
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
