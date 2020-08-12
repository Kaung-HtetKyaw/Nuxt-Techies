import {
  fetchComments,
  createComment,
  updateComment
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
    state.comments = comments;
  }
};
export const actions = {
  fetchComment({ commit }, { ids }) {
    return fetchComments(ids).then(comments => {
      commit("SET_COMMENTS", { comments });
      console.log(comments);
      return comments;
    });
  }
};

export const getters = {};
