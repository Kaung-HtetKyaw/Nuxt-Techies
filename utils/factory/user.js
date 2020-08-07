class UserFactory {
  constructor() {
    this.userClass = FB;
  }
  createUser(options) {
    switch (options.type) {
      case "firebase":
        this.userClass = FB;
        break;
    }
    return new this.userClass(options.data);
  }
}

class FB {
  constructor(data) {
    this.displayName = data.displayName;
    this.photoURL = data.photoURL;
    this.bio = data.bio || "";
    this.claims = data.claims || { c: true };
    this.followers = data.followers || [];
    this.following = data.following || [];
    this.joined_at = data.metadata.creationTime;
    this.saved = data.saved || [];
    this.topics = data.topics || [];
  }
}

export default new UserFactory();
