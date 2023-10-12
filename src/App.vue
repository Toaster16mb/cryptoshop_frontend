<template>
  <div class="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/products" class="nav-link">Products</router-link>
        </li>
        <li v-if="isAuthenticated" class="nav-item">
          <router-link to="/product/add" class="nav-link"
            >Add product</router-link
          >
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "App",
  computed: {
    ...mapGetters("user", ["getToken", "isAuthenticated"]),
  },
});
</script>
