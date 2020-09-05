import { timeAgo } from "@/utils/utils";

export function dataItemArticles(items) {
  let articles = Array.isArray(items) ? [...items] : [{ ...items }];
  return articles.map(article => {
    let result = {};
    result.id = article.id;
    result.by = article.by;
    result.title = article.title;
    result.kids = article.kids.length;
    result.created = `${timeAgo(article.timestamp)} ago`;
    return result;
  });
}

export function dataItemUsers(items) {
  let users = Array.isArray(items) ? [...items] : [{ ...items }];
  return users.map(user => {
    let result = {};
    result.uid = user.uid;
    result.displayName = user.displayName;
    result.followers = user.followers.length;
    result.following = user.following.length;
    result.joined_at = `${timeAgo(user.joined_at)} ago`;
    return result;
  });
}

export function dataItemComments(items) {
  let comments = Array.isArray(items) ? [...items] : [{ ...items }];

  return comments.map(comment => {
    let result = {};
    result.id = comment.id;
    result.by = comment.by;
    result.kids = comment.kids.length;
    result.likes = comment.likes.length;
    result.created = `${timeAgo(comment.timestamp)} ago`;
    return result;
  });
}

export function dataItemReports(items) {
  let reports = Array.isArray(items) ? [...items] : [{ ...items }];
  return reports.map(report => {
    let result = {};
    result.id = report.id;
    result.by = report.by;
    result.reported_type = report.reported_item.type;
    result.reported_item = report.reported_item.id;
    result.timestamp = `${timeAgo(report.timestamp)} ago`;
    return result;
  });
}

export function dataItemTags(items) {
  let tags = Array.isArray(items) ? [...items] : [{ ...items }];
  return tags.map(tag => {
    let result = {};
    result.id = tag.id;
    result.by = tag.name;
    result.text_color = tag.text_color;
    result.bg_color = tag.bg_color;

    return result;
  });
}
export function dataItemTopics(items) {
  let topics = Array.isArray(items) ? [...items] : [{ ...items }];
  return topics.map(topic => {
    let result = {};
    result.id = topic.id;
    result.name = topic.name;
    result.by = topic.about.by;
    result.created = topic.about.timestamp;
    result.members = topic.members.length;
    result.articles = topic.kids.length;
    return result;
  });
}
