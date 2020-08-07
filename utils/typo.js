export const text_ellipsis = (text, limit = 17) => {
  if (text.split(" ").length < limit) {
    return text;
  }
  return `${text
    .split(" ")
    .slice(0, 17)
    .join(" ")}......`;
};
