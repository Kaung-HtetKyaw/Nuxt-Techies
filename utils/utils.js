export const uniqueId = () => {
  return `${Math.random()
    .toString(36)
    .substr(2, 9)}-${Math.random()
    .toString(36)
    .substr(2, 9)}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
};

export function noop() {}

export function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

// This grabs the file contents when the file changes
export function previewImg(file, callback) {
  let previewUrl;
  var reader = new FileReader();
  reader.onload = function() {
    previewUrl = reader.result;
    callback(previewUrl);
  };
  reader.readAsDataURL(file);
}

export function timeAgo(time) {
  const between = (Date.now() - Number(time)) / 1000;
  if (between < 3600) {
    return pluralize(between / 60, "minute");
  } else if (between < 86400) {
    return pluralize(between / 3600, "hour");
  } else if (between > 86400) {
    return pluralize(between / 86400, "day");
  }
}

function pluralize(time, label) {
  const roundedTime = Math.round(time);
  if (roundedTime === 1) {
    return `${roundedTime} ${label}`;
  }
  return `${roundedTime} ${label}s`;
}

export function replaceByID(array, item, type = "id") {
  const index = array.findIndex(el => {
    if (isPlainObject(el) && isPlainObject(item)) {
      return el[type] === item[type];
    }
    return el === item;
  });
  return array.splice(index, 1, item);
}

export function removeByID(array, id, type = "id") {
  const index = array.findIndex(el => {
    if (isPlainObject(el)) {
      return el[type] === id;
    }
    return el === id;
  });
  return array.splice(index, 1);
}

export function isLiked(array, id) {
  return array.includes(id);
}

export function isPlainObject(obj) {
  return obj.toString() === "[object Object]";
}

export function isEmptyObj(obj) {
  return Object.keys(obj).length === 0;
}

export function isFile(obj) {
  return obj.toString() === "[object File]";
}

export function isSaved(array, id) {
  return array.includes(id);
}

export function includes(array, id) {
  return array.includes(id);
}

export function excludeItems(items, itemsToExclude) {
  let result = items;
  let normalizedItemsToExclude = Array.isArray(itemsToExclude)
    ? itemsToExclude
    : [itemsToExclude];
  normalizedItemsToExclude.forEach(el => {
    result = result.filter(item => item.id !== el.id);
  });
  return result;
}

export function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomItems([...arr], n = 1) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    const temp = arr[i];
    arr[i] = arr[m];
    arr[m] = temp;
  }
  return arr.slice(0, n);
}

export function getArticleCoversID(articles) {
  let cover_id;
  if (Array.isArray(articles)) {
    articles.forEach(article => {
      if (article.photo.url) {
        cover_id.push(article.photo.id);
      }
    });
  } else {
    cover_id = articles.photo.url ? articles.photo.id : "";
  }
  return cover_id;
}

export function isDriver(user) {
  return user.claims.d ? true : user.claims.a ? true : false;
}

export function isAdmin(user) {
  return user.claims.a ? true : false;
}

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
    console.log(report);
    let result = {};
    result.id = report.id;
    result.by = report.by;
    result.reported_type = report.reported_item.type;
    result.reported_item = report.reported_item.id;
    result.timestamp = `${timeAgo(report.timestamp)} ago`;
    return result;
  });
}

export function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
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

export function getUserType(user) {
  let claim;
  switch (Object.keys(user.claims)[0]) {
    case "d":
      claim = { d: true, type: "driver" };
      break;
    case "a":
      claim = { a: true, type: "admin" };
      break;
    default:
      claim = { c: true, type: "customer" };
      break;
  }
  return claim;
}

export function typeToClaim(type) {
  let claim;
  switch (type) {
    case "driver":
      claim = { d: true, type: "driver" };
      break;
    case "admin":
      claim = { a: true, type: "admin" };
      break;
    default:
      claim = { c: true, type: "customer" };
      break;
  }
  return claim;
}
