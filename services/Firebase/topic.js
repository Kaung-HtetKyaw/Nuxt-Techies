import * as firebase from "firebase/app";
import "firebase/firestore";
import topicFactory from "@/utils/factory/topic";

export function fetchAllTopics() {
  return firebase
    .firestore()
    .collection("topics")
    .get()
    .then(response => {
      const topics = normalizeTopics(response.docs);
      return topics;
    });
}

export function createTopic(params) {
  return firebase
    .firestore()
    .collection("topics")
    .add({ ...params.data })
    .then(res => {
      const topic = normalizeTopics({ id: res.id, ...params.data });
      return topic;
    });
}

export function normalizeTopics(topics) {
  if (Array.isArray(topics)) {
    let arr = [];
    topics.forEach(topic => {
      let topic_obj = topicFactory.createTopic({ data: topic });
      arr.push({ ...topic_obj });
    });
    return arr;
  }

  const topic = topicFactory.createTopic({ data: topics });
  return topic;
}
