import { normalizeArticles } from "~/services/Firebase/article";
import { shuffle } from "@/utils/utils";

export const date_sort_asc = function(date1, date2) {
  // This is a comparison function that will result in dates being sorted in
  // ASCENDING order. As you can see, JavaScript's native comparison operators
  // can be used to compare dates. This was news to me.
  if (date1 > date2) return 1;
  if (date1 < date2) return -1;
  return 0;
};

export const date_sort_desc = function(date1, date2) {
  // This is a comparison function that will result in dates being sorted in
  // DESCENDING order.
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
};

export function priortizeFollowingArticles(articles, followingID, userID) {
  let result = [];
  let followingArticles = articles.filter(article => {
    return followingID.includes(article.by);
  });

  const normalArticles = articles.filter(article => {
    return !followingID.includes(article.by);
  });

  result = result.concat(followingArticles, normalArticles);
  return result;
}
