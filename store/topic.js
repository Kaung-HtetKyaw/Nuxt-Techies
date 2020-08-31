import {
  fetchAllTopics,
  createTopic,
  updateTopic
} from "@/services/Firebase/topic";
import { replaceByID, removeByID } from "@/utils/utils";
import { updateUser } from "~/services/Firebase/userAuth";

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
  },
  UPDATE_TOPIC(state, { topic }) {
    replaceByID(state.topics, topic);
  }
};
export const actions = {
  fetchAllTopics({ commit }) {
    return fetchAllTopics().then(topics => {
      commit("SET_TOPICS", { topics });
      return topics;
    });
  },
  createTopic({ commit, rootState, dispatch }, params) {
    const user = { ...rootState.user.user };
    params.data.members.push(user.uid);

    return createTopic(params).then(topic => {
      user.topics.push(topic.id);
      commit("ADD_TOPIC", { topic });
      dispatch("user/updateUser", { data: user }, { root: true });
      return topic;
    });
  },
  updateTopic({ commit }, params) {
    return updateTopic(params).then(() => {
      commit("UPDATE_TOPIC", { topic: { ...params.data } });
      return { ...params.data };
    });
  },
  deleteTopic() {},
  removeArticleFromTopic({ dispatch, getters }, { articleID, topicID }) {
    const topic = { ...getters.getTopicByID(topicID) };
    removeByID(topic.kids, articleID);
    dispatch("updateTopic", { data: topic, id: topic.id });
  }
};

export const getters = {
  getTopicByID: state => id => {
    return state.topics.find(topic => topic.id === id);
  }
};
