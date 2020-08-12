import userFactory from "@/utils/factory/user";
import { currentUserFB } from "@/services/Firebase/userAuth";
export const strict = false;
export const state = () => {
  return {
    isAuthenticated: false,
    shit: null
  };
};

export const mutations = {};
export const actions = {
  //auth state change listener
  async nuxtServerInit({ dispatch }) {
    dispatch("tag/fetchAllTags", { root: true });
  },
  async authStateListener({ dispatch }, user) {
    if (user.authUser) {
      let userFB = userFactory.createUser({
        data: { ...user.authUser },
        type: "firebase"
      });
      dispatch("user/signIn", { user: userFB });
    } else {
      dispatch("user/signOut");
    }
  }
};
