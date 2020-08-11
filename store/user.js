import { fetchUser } from "@/services/Firebase/userAuth";

export const state = () => {
  return { user: null };
};
export const mutations = {
  SET_AUTH_USER(state, user) {
    state.user = user;
  }
};
export const actions = {
  signIn({ commit }, { user, type }) {
    return;
  },
  createUser({ commit }, { user }) {}
};
