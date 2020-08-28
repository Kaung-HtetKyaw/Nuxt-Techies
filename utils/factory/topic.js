import { defaultTopicObjFB } from "@/utils/constants";
let defaultTopic = defaultTopicObjFB();

class TopicFactory {
  constructor() {
    this.topicClass = FireBase;
  }
  createTopic(options) {
    switch (options.type) {
      case "firebase":
        this.topicClass = FireBase;
        break;
    }
    return new this.topicClass(options.data);
  }
}

class FireBase {
  constructor(data) {
    this.id = data.id;
    if (typeof data.data === "function") {
      this.normalizeTopic(data.data());
    } else {
      this.normalizeTopic(data);
    }
  }
  normalizeTopic(data) {
    const keys = Object.keys(data);
    for (const key in defaultTopic) {
      if (keys.includes(key)) {
        this[key] = data[key];
      } else {
        this[key] = defaultTopic[key];
      }
    }
  }
}

export default new TopicFactory();
