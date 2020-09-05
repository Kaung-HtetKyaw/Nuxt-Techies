import articleFactory from "@/utils/factory/articles";
import userFactory from "@/utils/factory/user";
import tagFactory from "@/utils/factory/tag";
import topicFactory from "@/utils/factory/topic";
import commentFactory from "@/utils/factory/comment";
import reportFactory from "@/utils/factory/report";
import { capitalize } from "@/utils/utils";

function getFactoryByType(type) {
  let factory;
  switch (type) {
    case "article":
      factory = articleFactory;
      break;
    case "user":
      factory = userFactory;
      break;
    case "topic":
      factory = topicFactory;
      break;
    case "comment":
      factory = commentFactory;
      break;
    case "tag":
      factory = tagFactory;
      break;
    case "report":
      factory = reportFactory;
      break;
  }
  return factory;
}
export function normalizeDataFB(items, type) {
  let factory = getFactoryByType(type);
  if (Array.isArray(items)) {
    let arr = [];
    items.forEach(item => {
      let item_obj = factory[`create${capitalize(type)}`]({ data: item });
      arr.push({ ...item_obj });
    });
    return arr;
  }
  const item = factory[`create${capitalize(type)}`]({ data: items });
  return item;
}

export function normalizeFetchFB(
  { params, lvState },
  fetchMethods,
  type,
  limit = 10
) {
  if (lvState) {
    return fetchMethods[params.type]({ param: params.param })
      .startAfter(lvState)
      .limit(limit)
      .get()
      .then(response => {
        const items = normalizeDataFB(response.docs, type);
        return items;
      });
  }
  return fetchMethods[params.type]({ param: params.param })
    .limit(limit)
    .get()
    .then(response => {
      const items = normalizeDataFB(response.docs, type);
      return items;
    });
}
