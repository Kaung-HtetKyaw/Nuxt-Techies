import { uniqueId } from "@/utils/utils";

export function defaultArticleObjFB() {
  const id = uniqueId();
  const timestamp = Date.now();
  return {
    likes: [],

    photo: {
      url: "",
      id
    },
    timestamp,
    kids: [],
    tags: [],
    description: "",
    likesNo: 0,
    title: "",
    topics: [],
    by: "",
    content: "",
    type: "article"
  };
}

export const defaultUserObjFB = {
  displayName: "Unknown",
  bio: "",
  claims: { c: true },
  photo: {
    id: "",
    url:
      "https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown2-512.png"
  },
  followers: [],
  following: [],
  saved: [],
  topics: [],
  uid: "",
  type: "user",
  profile_url: {
    facebook: "",
    github: "",
    stackoverflow: "",
    twitter: "",
    instagram: ""
  }
};

export const defaultTagObj = {
  bg_color: "#333",
  text_color: "#eee",
  kids: [],
  name: "No Tag",
  type: "tag",
  description: "",
  logo: ""
};

export function defaultCommentObjFB() {
  const timestamp = Date.now();
  return {
    kids: [],
    timestamp,
    likes: [],
    message: "",
    type: "comment",
    by: ""
  };
}
