import { fetchAllTags, normalizeTag } from "@/services/Firebase/tag";

export const strict = false;
export const state = () => {
  return {
    tags: []
  };
};

export const mutations = {
  SET_TAGS(state, { tags }) {
    state.tags = tags;
  }
};
export const actions = {
  fetchAllTags({ commit }) {
    return fetchAllTags().then(res => {
      const tags = normalizeTag(res.docs);
      commit("SET_TAGS", { tags });

      return tags;
    });
  }
};

export const getters = {
  getTagByID: state => id => {
    return state.tags.find(tag => tag.id === id);
  }
};
