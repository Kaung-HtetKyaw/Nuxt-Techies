import {
  fetchUser,
  createUser,
  updateUser
} from "@/services/Firebase/userAuth";

import userFactory from "@/utils/factory/user";

export const state = () => {
  return { user: null, isAuthenticated: false, currentUser: null, users: [] };
};
export const mutations = {
  SET_AUTH_USER(state, user) {
    state.user = user;
  },
  FETCH_USER(state, user) {
    state.currentUser = user;
  },
  SET_AUTHENTICATION(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  UPDATE_USER(state, { user }) {
    state.user = user;
  },
  SAVE_ARTICLE(state, { user }) {
    state.user = user;
  },
  UNSAVE_ARTICLE(state, { user }) {
    state.user = user;
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
  },
  fetchUser({ commit }, { id }) {
    return fetchUser(id).then(res => {
      const user = userFactory.createUser({
        data: res.doc(),
        type: "firebase"
      });
      commit("FETCH_USER", user);
      console.log(user);
      return user;
    });
  },
  updateUser({ commit }, params) {
    return updateUser(params.data).then(() => {
      commit("UPDATE_USER", { user: params.data });
      return params.data;
    });
  },
  saveArticle({ commit, state }, { id }) {
    const user = { ...state.user };
    user.saved.push(id);
    return updateUser(user).then(() => {
      commit("SAVE_ARTICLE", { user });
    });
  },
  unsaveArticle({ commit, state }, { id }) {
    const user = { ...state.user };
    const index = user.saved.findIndex(el => el === id);
    user.saved.splice(index, 1);
    return updateUser(user).then(() => {
      commit("UNSAVE_ARTICLE", { user });
    });
  }
};
