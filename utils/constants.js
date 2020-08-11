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
    by: ""
  };
}

export const defaultUserObjFB = {
  displayName: "",
  bio: "",
  claims: { c: true },
  photo: { id: "", url: "" },
  followers: [],
  following: [],
  saved: [],
  topics: [],
  uid: "",
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
  name: "No Tag"
};
