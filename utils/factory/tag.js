import { defaultTagObjFB } from "@/utils/constants";
let defaultTag = defaultTagObjFB();

class TagFactory {
  constructor() {
    this.tagClass = FireBase;
  }
  createTag(options) {
    switch (options.type) {
      case "firebase":
        this.tagClass = FireBase;
        break;
    }
    return new this.tagClass(options.data);
  }
}

class FireBase {
  constructor(data) {
    console.log(data);
    this.id = data.id;
    if (typeof data.data === "function") {
      this.normalizeTag(data.data());
    } else {
      this.normalizeTag(data);
    }
  }
  normalizeTag(data) {
    const keys = Object.keys(data);
    for (const key in defaultTag) {
      if (keys.includes(key)) {
        this[key] = data[key];
      } else {
        this[key] = defaultTag[key];
      }
    }
  }
}

export default new TagFactory();
