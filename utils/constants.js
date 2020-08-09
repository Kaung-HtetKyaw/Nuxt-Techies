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
  joined_at: "",
  saved: [],
  topics: []
};
