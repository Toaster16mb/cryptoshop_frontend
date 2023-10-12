<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="product.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="price">Price(GWei)</label>
        <input
          type="number"
          min="0"
          class="form-control"
          id="price"
          v-model="product.price"
        />
      </div>
      <div class="form-group">
        <label for="priceEth">Price(ETH)</label>
        <input
          type="number"
          min="0"
          class="form-control"
          id="priceEth"
          :value="getPriceEth(product.price)"
          @change="setPriceEth"
        />
      </div>

      <button @click="saveProduct" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProduct">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductDataService from "@/services/ProductService";
import Product from "@/types/Product";
import ResponseData from "@/types/ResponseData";
import { ethToGWei, gweiToEth } from "@/utils/converter";
import store from "@/store";

export default defineComponent({
  name: "add-product",
  data() {
    return {
      product: {
        id: null,
        name: "",
        price: 0,
      } as Product,
      submitted: false,
    };
  },
  methods: {
    setPriceEth(event: InputEvent) {
      const inputElement = event.target as HTMLInputElement;
      this.product.price = ethToGWei(Number(inputElement.value));
    },
    getPriceEth(gwei: string | number | null) {
      gwei = Number(gwei);
      return gweiToEth(gwei);
    },
    saveProduct() {
      let data = {
        name: this.product.name,
        price: this.product.price,
      };
      console.log(store.getters.getToken);
      ProductDataService.create(data)
        .then((response: ResponseData) => {
          this.product.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          this.$router.push("/auth");
          console.log(e);
        });
    },

    newProduct() {
      this.submitted = false;
      this.product = {} as Product;
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
