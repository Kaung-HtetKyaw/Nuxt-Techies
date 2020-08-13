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
    console.log("before update", state.comments[comment.id]);
    state.comments[comment.id] = comment;
    console.log("after update", state.comments[comment.id]);
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
      const parent = { ...params.parent };
      console.log("before parent", parent);
      parent.kids.push(comment.id);
      console.log("after parent", parent);
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
  clearComment({ commit }) {
    commit("CLEAR_COMMENTS");
  }
};

export const getters = {
  getCommentByID: state => id => {
    return state.comments[id];
  }
};
