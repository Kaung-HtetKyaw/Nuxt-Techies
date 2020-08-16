import Vue from "vue";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  deleteComments
} from "@/services/Firebase/comment";
import { removeByID, replaceByID } from "@/utils/utils";

export const strict = false;
export const state = () => {
  return {
    comments: []
  };
};

export const mutations = {
  SET_COMMENTS(state, { comments }) {
    comments.forEach(comment => state.comments.push(comment));
  },
  CREATE_COMMENT(state, { comment }) {
    state.comments.push(comment);
  },
  UPDATE_COMMENT(state, { comment }) {
    replaceByID(state.comments, comment);
  },
  DELETE_COMMENT(state, { id }) {
    removeByID(state.comments, id);
  },
  CLEAR_COMMENTS(state) {
    state.comments = [];
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
      const parent = { ...params.parent };
      parent.kids.push(comment.id);
      commit("CREATE_COMMENT", { comment });
      //add the comment id to the parent's kids based on the parent type
      if (params.parent.type === "article") {
        //update the parent
        return dispatch(
          "article/updateArticle",
          { id: parent.id, data: parent },
          { root: true }
        );
      } else if (params.parent.type === "comment") {
        //update the parent
        return dispatch("updateComment", { id: parent.id, data: parent });
      }
    });
  },
  updateComment({ commit }, params) {
    return updateComment(params)
      .then(comment => {
        commit("UPDATE_COMMENT", { comment });
        return comment;
      })
      .catch(e => console.log(e));
  },
  deleteComment({ commit, state, dispatch, getters }, params) {
    return deleteComment(params.id).then(() => {
      const parent = state.comments.find(el => el.kids.includes(params.id));
      const self = getters.getCommentByID(params.id);
      //remove self from the parent
      if (parent) {
        dispatch("removeReplyFromComment", {
          id: params.id
        });
      } else {
        dispatch(
          "article/removeCommentFromArticle",
          { id: params.id },
          { root: true }
        );
      }
      //delete self from the store
      commit("DELETE_COMMENT", { id: self.id });
      //delete the kids
      self.kids.forEach(kid => commit("DELETE_COMMENT", { id: kid }));
      return deleteComments(self.kids || []);
    });
  },
  removeReplyFromComment({ dispatch, state, getters }, { id }) {
    const parent = state.comments.find(el => el.kids.includes(id));
    //remove reply from parent comment
    removeByID(parent.kids, id);
    //update the parent comment
    dispatch("updateComment", { id: parent.id, data: parent });
  },
  clearComment({ commit }) {
    commit("CLEAR_COMMENTS");
  }
};

export const getters = {
  getCommentByID: state => id => {
    return state.comments.find(el => el.id === id);
  }
};
