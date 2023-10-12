import { createStore } from "vuex";
import userModule from "@/store/modules/user.module";
import orderModule from "@/store/modules/order.module";
import VuexPersist from "vuex-persist";
const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
});

const store = createStore({
  modules: {
    user: userModule,
    order: orderModule,
  },
  plugins: [vuexLocalStorage.plugin],
});

export default store;
