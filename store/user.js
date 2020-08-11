import { fetchUser, createUser } from "@/services/Firebase/userAuth";
export const state = () => {
  return { user: null, isAuthenticated: false };
};
export const mutations = {
  SET_AUTH_USER(state, user) {
    state.user = user;
  },
  SET_AUTHENTICATION(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  }
};
export const actions = {
  signIn({ commit }, { user }) {
    return fetchUser(user.uid).then(doc => {
      if (doc.exists) {
        commit("SET_AUTH_USER", { ...doc.data() });
        commit("SET_AUTHENTICATION", true);
      } else {
        return createUser({ ...user }).then(() => {
          commit("SET_AUTH_USER", { ...user });
          commit("SET_AUTHENTICATION", true);
        });
      }
    });
  },
  signOut({ commit }) {
    commit("SET_AUTH_USER", null);
    commit("SET_AUTHENTICATION", false);
  }
};
