let defaultArticle = {
  bg_color: "#333",
  text_color: "#eee",
  kids: [],
  name: "No Tag"
};

class ArticleFactory {
  constructor() {
    this.articleClass = FireBase;
  }
  createArticle(options) {
    switch (options.type) {
      case "firebase":
        this.articleClass = FireBase;
        break;
    }
    return new this.articleClass(options.data);
  }
}

class FireBase {
  constructor(data) {
    this.id = data.id;
    if (typeof data.data === "function") {
      this.normalizeArticle(data.data());
    } else {
      this.normalizeArticle(data);
    }
  }
  normalizeArticle(data) {
    const keys = Object.keys(data);
    for (const key in defaultArticle) {
      if (keys.includes(key)) {
        this[key] = data[key];
      } else {
        this[key] = defaultArticle[key];
      }
    }
  }
}

export default new ArticleFactory();
