import { defaultUserObjFB } from "@/utils/constants";

const defaultUser = new Object(defaultUserObjFB);

class UserFactory {
  constructor() {
    this.userClass = FireBase;
  }
  createUser(options) {
    switch (options.type) {
      case "firebase":
        this.userClass = FireBase;
        break;
    }
    return new this.userClass(options.data);
  }
}

class FireBase {
  constructor(data) {
    if (typeof data.data === "function") {
      this.normalizeUser(data.data());
    } else {
      this.normalizeUser(data);
    }

    this.photo.url = this.photo.url ? this.photo.url : data.photoURL;
    this.joined_at = this.joined_at
      ? this.joined_at
      : data.metadata.creationTime;
  }
  normalizeUser(data) {
    const keys = Object.keys(data);
    for (const key in defaultUser) {
      if (keys.includes(key)) {
        this[key] = data[key];
      } else {
        this[key] = defaultUser[key];
      }
    }
  }
}

export default new UserFactory();
