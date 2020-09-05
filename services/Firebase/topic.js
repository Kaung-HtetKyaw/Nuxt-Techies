import * as firebase from "firebase/app";
import "firebase/firestore";
import topicFactory from "@/utils/factory/topic";
import { normalizeDataFB, normalizeFetchFB } from "@/utils/fb";

export function fetchAllTopics() {
  return firebase
    .firestore()
    .collection("topics")
    .get()
    .then(response => {
      const topics = normalizeDataFB(response.docs, "topic");
      return topics;
    });
}

export function createTopic(params) {
  return firebase
    .firestore()
    .collection("topics")
    .add({ ...params.data })
    .then(res => {
      const topic = normalizeDataFB({ id: res.id, ...params.data }, "topic");
      return topic;
    });
}

export function updateTopic(params) {
  return firebase
    .firestore()
    .collection("topics")
    .doc(params.id)
    .set({ ...params.data });
}

export function deleteTopic(id) {
  return firebase
    .firestore()
    .collection("topics")
    .doc(id)
    .delete();
}
