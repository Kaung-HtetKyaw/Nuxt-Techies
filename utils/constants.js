import { uniqueId } from "@/utils/utils";
export function defaultArticleObj() {
  const id = uniqueId();
  const timestamp = Date.now();
  return {
    likes: [],
    cover: "",
    kids: [],
    timestamp,
    tags: [],
    description: "No Description",
    likesNo: 0,
    title: "No title",
    by: "unknown"
  };
}
