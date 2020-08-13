import Vue from "vue";
import {
  fetchComments,
  createComment,
  updateComment
} from "@/services/Firebase/comment";
import { removeByID, replaceByID } from "@/utils/utils";

export const strict = false;
export const state = () => {
  return {
    comments: {}
  };
};

export const mutations = {
  SET_COMMENTS(state, { comments }) {
    comments.forEach(comment => {
      if (comment) {
        Vue.set(state.comments, comment.id, comment);
      }
    });
  },
  CREATE_COMMENT(state, { comment }) {
    state.comments[comment.id] = comment;
  },
  UPDATE_COMMENT(state, { comment }) {
    state.comments[comment.id] = comment;
  },
  CLEAR_COMMENTS(state) {
    state.comments = {};
  }
};
export const actions = {
  fetchComment({ commit, dispatch }, ids) {
    if (ids.length === 0) {
      return;
    }
    return fetchComments(ids).then(comments => {
      commit("SET_COMMENTS", { comments });
      return Promise.all(
        comments.map(comment => dispatch("fetchComment", comment.kids))
      );
    });
  },
  createComment({ commit, dispatch }, params) {
    return createComment(params.data).then(comment => {
      commit("CREATE_COMMENT", { comment });
      //add the comment id to the parent's kids based on the parent type
      const parent = { ...params.parent };
      parent.kids.push(comment.id);
      if (params.parent.type === "article") {
        //update the parent
        dispatch(
          "article/updateArticle",
          { id: parent.id, data: parent },
          { root: true }
        );
      } else if (params.parent.type === "comment") {
        //update the parent
        dispatch("updateComment", { id: parent.id, data: parent });
      }
    });
  },
  updateComment({ commit }, params) {
    return updateComment(params).then(comment => {
      commit("UPDATE_COMMENT", { comment });
      return comment;
    });
  },
  clearComment({ commit }) {
    commit("CLEAR_COMMENTS");
  }
};

export const getters = {};
