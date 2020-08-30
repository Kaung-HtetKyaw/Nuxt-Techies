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
