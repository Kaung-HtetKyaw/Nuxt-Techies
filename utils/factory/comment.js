import { defaultCommentObjFB } from "@/utils/constants";

let defaultComment = defaultCommentObjFB();

class CommentFactory {
  constructor() {
    this.commentClass = FireBase;
  }
  createComment(options) {
    switch (options.type) {
      case "firebase":
        this.commentClass = FireBase;
        break;
    }
    return new this.commentClass(options.data);
  }
}

class FireBase {
  constructor(data) {
    this.id = data.id;

    if (typeof data.data === "function") {
      this.normalizeComment(data.data());
    } else {
      this.normalizeComment(data);
    }
  }
  normalizeComment(data) {
    const keys = Object.keys(data);
    for (const key in defaultComment) {
      if (keys.includes(key)) {
        this[key] = data[key];
      } else {
        this[key] = defaultComment[key];
      }
    }
  }
}

export default new CommentFactory();
