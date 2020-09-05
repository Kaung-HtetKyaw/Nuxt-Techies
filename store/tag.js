import { fetchAllTags, fetchTagsByType } from "@/services/Firebase/tag";

export const strict = false;
export const state = () => {
  return {
    tags: [],
    lastVisible: null
  };
};

export const mutations = {
  SET_TAGS(state, { tags, lazy }) {
    if (lazy) {
      state.tags = state.tags.concat(tags);
    } else {
      state.tags = tags;
    }
  },
  SET_LAST_VISIBLE(state, lvState) {
    state.lastVisible = lvState;
  }
};
export const actions = {
  getTags({ commit, state }, { lazy, params }) {
    if (!lazy) {
      commit("SET_LAST_VISIBLE", null);
    }
    const lvState = state.lastVisible;
    return fetchTagsByType({ params, lvState })
      .then(tags => {
        //referencing querysnapshot has circular references so it wont work
        //instead get the data by timestamp
        if (tags.length > 0) {
          commit("SET_LAST_VISIBLE", tags[tags.length - 1].timestamp);
        }
        commit("SET_TAGS", { tags, lazy });

        return tags;
      })
      .catch(e => console.log(e));
  },
  fetchAllTags({ commit }) {
    return fetchAllTags().then(tags => {
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
