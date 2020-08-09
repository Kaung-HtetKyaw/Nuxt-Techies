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
  const between = Date.now / 100 - Number(time);
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

export function replaceByID(array, item) {
  const index = array.findIndex(el => el.id === item.id);
  return array.splice(index, 1, item);
}

export function removeByID(array, id) {
  const index = array.findIndex(el => el.id === id);
  return array.splice(index, 1);
}
