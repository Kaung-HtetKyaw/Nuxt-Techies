import {
  fetchArticlesByType,
  normalizeArticles,
  createArticle,
  updateArticle,
  fetchArticle,
  deleteArticle
} from "@/services/article";
import { replaceByID, removeByID } from "@/utils/utils";
export const state = () => {
  return { articles: [], article: {}, lastVisible: null };
};
export const mutations = {
  SET_ARTICLES(state, { articles, lazy }) {
    if (lazy) {
      state.articles = state.articles.concat(articles);
    } else {
      state.articles = articles;
    }
  },
  SET_ARTICLE(state, { article }) {
    state.article = article;
  },
  ADD_ARTICLE(state, { article }) {
    state.articles.push(article);
  },
  UPDATE_ARTICLE(state, { article }) {
    replaceByID(state.articles, article);
  },
  DELETE_ARTICLE(state, { id }) {
    removeByID(state.articles, id);
    state.article = {};
  },
  SET_LAST_VISIBLE(state, lastVisible) {
    state.lastVisible = lastVisible;
  }
};
export const actions = {
  getArticles({ commit, state }, { lazy, params }) {
    if (!lazy) {
      commit("SET_LAST_VISIBLE", null);
    }
    const lvState = state.lastVisible;
    return fetchArticlesByType({ params, lvState })
      .then(response => {
        const articles = normalizeArticles(response.docs);
        //referencing querysnapshot has circular references so it wont work
        //instead get the data by timestamp
        if (articles.length > 0) {
          commit("SET_LAST_VISIBLE", articles[articles.length - 1].timestamp);

          commit("SET_ARTICLES", { articles, lazy });
        }
        return articles;
      })
      .catch(e => console.log(e));
  },
  fetchArticle({ commit, getters }, { id }) {
    let article;
    article = getters.getArticleByID(id);
    if (article) {
      commit("SET_ARTICLE", { article });
      return article;
    }
    //fetch id is not in the stored articles
    return fetchArticle(id).then(res => {
      article = normalizeArticles(res);
      commit("SET_ARTICLE", { article });
      commit("SET_ARTICLES", { articles: [article], lazy: true });
      return article;
    });
  },
  createArticle({ commit }, params) {
    return createArticle(params).then(res => {
      const article = normalizeArticles({ id: res.id, ...params.data });
      commit("ADD_ARTICLE", { article });
      return article;
    });
  },
  updateArticle({ commit }, params) {
    return updateArticle(params).then(res => {
      commit("UPDATE_ARTICLE", { article: { ...params.data } });
      return params.data;
    });
  },
  deleteArticle({ commit }, params) {
    return deleteArticle(params.id).then(() => {
      commit("DELETE_ARTICLE", { id: params.id });
    });
  }
};
export const getters = {
  getArticleByID: state => id => {
    return state.articles.find(el => el.id === id);
  }
};
