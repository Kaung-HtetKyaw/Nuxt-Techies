import userFactory from "@/utils/factory/user";
import { currentUserFB } from "@/services/Firebase/userAuth";
export const strict = false;
export const state = () => {
  return {
    isAuthenticated: false,
    shit: null
  };
};

export const mutations = {
  SET_AUTHENTICATION(state, status) {
    state.isAuthenticated = status;
  },
  SET_AUTH_USER(state, user) {
    state.user.user = user;
  }
};
export const actions = {
  //auth state change listener
  async nuxtServerInit({ dispatch }) {},
  async authStateListener({ commit, dispatch }, user) {
    if (user.authUser) {
      let userFB = userFactory.createUser({
        data: { ...user.authUser },
        type: "firebase"
      });
      commit("SET_AUTH_USER", { ...userFB });
      commit("SET_AUTHENTICATION", true);
    } else {
      commit("SET_AUTH_USER", null);
      commit("SET_AUTHENTICATION", false);
    }
    dispatch("tag/fetchAllTags", { root: true });
  }
};
