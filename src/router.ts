import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/products",
    name: "products",
    component: () => import("./components/ProductList.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("./components/Auth.vue"),
  },
  {
    path: "/order/:orderId",
    name: "order",
    component: () => import("./components/ProductList.vue"),
  },
  {
    path: "/products/:id",
    name: "product-details",
    component: () => import("./components/ProductDetails.vue"),
  },
  {
    path: "/product/add",
    name: "product-add",
    component: () => import("./components/AddProduct.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
