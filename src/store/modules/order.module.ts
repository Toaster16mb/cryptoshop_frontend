import { Module } from "vuex";
import { RootState } from "@/store/types";
import ProductCartDTO from "@/types/ProductCartDTO";

interface OrderState {
  products: ProductCartDTO[];
  email: string;
}

const orderModule: Module<OrderState, RootState> = {
  state: {
    products: [],
    email: "",
  },
  mutations: {
    setCartQuantity(state, productCartDTO: ProductCartDTO) {
      if (!state.products.find((product) => product.id === productCartDTO.id)) {
        state.products.push(productCartDTO);
      } else {
        state.products = state.products.map((product) => {
          if (product.id === productCartDTO.id) {
            product.quantity = productCartDTO.quantity;
          }
          return product;
        });
      }
      state.products = state.products.filter((product) => product.quantity > 0);
    },
    clearCart(state) {
      state.products = [];
    },
  },
  actions: {
    setCartQuantity({ commit }, productCartDTO: ProductCartDTO) {
      commit("setCartQuantity", productCartDTO);
    },
    clearCart({ commit }) {
      commit("clearCart");
    },
  },
  getters: {
    getCart: (state) => state.products,
  },
};

export default orderModule;
