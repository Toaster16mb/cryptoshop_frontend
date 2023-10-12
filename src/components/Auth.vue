<template>
  <div class="submit-form">
    <div>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          required
          v-model="username"
          name="username"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          class="form-control"
          id="password"
          type="password"
          required
          v-model="password"
          name="password"
        />
      </div>
      <p v-if="error" class="alert">
        {{ error }}
      </p>
      <button @click="auth" class="btn btn-success">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/AuthService";
import { AuthDataDTO } from "@/types/AuthDataDTO";
import store from "@/store";

export default defineComponent({
  name: "auth",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    auth() {
      AuthService.setAuth({
        username: this.username,
        password: this.password,
      } as AuthDataDTO)
        .then((response) => {
          store.dispatch("user/setToken", response.data.token);
          this.$router.push("/");
        })
        .catch(() => {
          this.error = "Wrong username or password";
          setTimeout(() => {
            this.error = "";
          }, 3000);
        });
    },
  },
  mounted() {
    store.dispatch("user/clearToken");
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
