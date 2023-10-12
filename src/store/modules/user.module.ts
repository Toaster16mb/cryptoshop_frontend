import { Module } from "vuex";
import { RootState } from "@/store/types";

interface UserState {
  token: string | null;
}

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    clearToken({ commit }) {
      commit("clearToken");
    },
  },
  getters: {
    getToken: (state) => state.token,
    isAuthenticated: (state) => !!state.token,
  },
};

export default userModule;
