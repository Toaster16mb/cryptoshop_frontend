import { createApp } from "vue";
import App from "@/App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "@/router";
import store from "@/store"; // Это ваше хранилище Vuex

createApp(App).use(store).use(router).mount("#app");
