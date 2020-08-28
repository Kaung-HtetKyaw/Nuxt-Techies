import { fetchAllTopics, normalizeTopics } from "@/services/Firebase/topic";

export const strict = false;
export const state = () => {
  return {
    topics: []
  };
};

export const mutations = {
  SET_TOPICS(state, { topics }) {
    state.topics = topics;
  }
};
export const actions = {
  fetchAllTopics({ commit }) {
    return fetchAllTopics().then(topics => {
      commit("SET_TOPICS", { topics });
      return topics;
    });
  }
};

export const getters = {
  getTopicByID: state => id => {
    return state.topics.find(topic => topic.id === id);
  }
};
