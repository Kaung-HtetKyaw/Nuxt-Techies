import { fetchAllTopics, createTopic } from "@/services/Firebase/topic";

export const strict = false;
export const state = () => {
  return {
    topics: []
  };
};

export const mutations = {
  SET_TOPICS(state, { topics }) {
    state.topics = topics;
  },
  ADD_TOPIC(state, { topic }) {
    state.topics.push(topic);
  }
};
export const actions = {
  fetchAllTopics({ commit }) {
    return fetchAllTopics().then(topics => {
      commit("SET_TOPICS", { topics });
      return topics;
    });
  },
  createTopic({ commit }, params) {
    return createTopic(params).then(topic => {
      commit("ADD_TOPIC", { topic });
      return topic;
    });
  }
};

export const getters = {
  getTopicByID: state => id => {
    return state.topics.find(topic => topic.id === id);
  }
};
