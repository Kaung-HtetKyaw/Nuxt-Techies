import { defaultTagObj } from "@/utils/constants";
let defaultTag = defaultTagObj;

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
    this.id = data.id;
    if (typeof data.data === "function") {
      this.normalizeTag(data.data());
    } else {
      this.normalizeTag(data);
    }
  }
  normalizeTag(data) {
    const keys = Object.keys(data);
    for (const key in defaultTagObj) {
      if (keys.includes(key)) {
        this[key] = data[key];
      } else {
        this[key] = defaultTagObj[key];
      }
    }
  }
}

export default new TagFactory();
