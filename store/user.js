import {
  fetchUser,
  createUser,
  updateUser,
  updateUsers
} from "@/services/Firebase/userAuth";

import userFactory from "@/utils/factory/user";
import { removeByID } from "~/utils/utils";

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
  },
  FOLLOW_USER(state, { user }) {
    state.user = user;
  },
  UNFOLLOW_USER(state, { user }) {
    state.user = user;
  },
  FOLLOW_TOPIC(state, { user }) {
    state.user = user;
  },
  UNFOLLOW_TOPIC(state, { user }) {
    state.user = user;
  }
};
export const actions = {
  signIn({ commit }, { user }) {
    return fetchUser(user.uid).then(response => {
      if (!!response) {
        commit("SET_AUTH_USER", { ...response });
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
    return fetchUser(id).then(user => {
      commit("FETCH_USER", user);
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
  },
  followUser({ commit, state }, { object }) {
    const subject = { ...state.user };
    object.followers.push(subject.uid);
    subject.following.push(object.uid);
    return updateUsers([subject, object]).then(() => {
      commit("FOLLOW_USER", { user: subject });
    });
  },
  unfollowUser({ commit, state }, { object }) {
    const subject = { ...state.user };
    removeByID(object.followers, subject.uid, "uid");
    removeByID(subject.following, object.uid, "uid");
    return updateUsers([subject, object]).then(() => {
      commit("UNFOLLOW_USER", { user: subject });
    });
  },
  followTopic({ commit, state, dispatch }, { topic }) {
    const user = { ...state.user };
    console.log(user);
    topic.members.push(user.uid);
    user.topics.push(topic.id);
    //update user
    return updateUser(user).then(() => {
      commit("FOLLOW_TOPIC", { user });
      //update topic
      return dispatch(
        "topic/updateTopic",
        { data: topic, id: topic.id },
        { root: true }
      );
    });
  },
  unfollowTopic({ commit, state, dispatch }, { topic }) {
    const user = { ...state.user };
    removeByID(topic.members, user.uid);
    removeByID(user.topics, topic.id);
    return updateUser(user).then(() => {
      commit("UNFOLLOW_TOPIC", { user });
      return dispatch(
        "topic/updateTopic",
        { data: topic, id: topic.id },
        { root: true }
      );
    });
  }
};
