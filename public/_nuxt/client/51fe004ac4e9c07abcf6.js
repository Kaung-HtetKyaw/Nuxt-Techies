(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{439:function(t,e,r){"use strict";r(10),r(8),r(5),r(3),r(6);var n=r(1),c=(r(50),r(16)),o=r(78),l=r(34),v=r(19),d=r(49),f=r(112),m=r(409),y=r(399),O=r(410);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function j(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _={props:{article:{type:Object,required:!0}},components:{"like-btn":m.a,"tag-slider":y.a,"save-btn":O.a},mixins:[f.a],data:function(){return{author:{},defaultUserObjFB:d.e}},fetch:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(l.b)(t.article.by).then((function(e){t.author=e})).catch((function(t){return console.log(t)})));case 1:case"end":return e.stop()}}),e)})))()},computed:j(j({},Object(o.b)({getTagByID:"tag/getTagByID"})),{},{isEmptyObj:function(){return Object(v.d)(this.author)},timeAgo:function(){return Object(v.m)(this.article.timestamp)}})},w=r(22),k=r(29),x=r.n(k),C=r(185),P=r(378),V=r(238),D=r(169),component=Object(w.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"article-card-block bs-border my-2",attrs:{outlined:""}},[r("div",{staticClass:"px-6 py-3"},[r("v-card-text",[r("div",[t.isEmptyObj?r("div",[r("transition",{attrs:{name:"fade",mode:"out-in"}},[r("div",{staticClass:"mb-2 d-flex flex-row"},[r("div",{staticClass:"d-flex flex-column justify-center px-4 opacity-7"},[r("div",{staticClass:"hover-blue"},[t._v("Loading...")]),t._v(" "),r("div",{staticClass:"caption py-1"})])])])],1):r("div",[r("transition",{attrs:{name:"fade",mode:"out-in"}},[r("nuxt-link",{attrs:{to:{name:"by",params:{by:t.article.by}}}},[r("div",{staticClass:"mb-2 d-flex flex-row"},[r("div",{staticClass:"d-flex flex-column justify-center opacity-7"},[r("div",{staticClass:"hover-blue font-weight-medium"},[t._v(t._s(t.author.displayName))]),t._v(" "),r("div",{staticClass:"caption py-1 black--text"},[r("span",[t._v("("+t._s(t.timeAgo)+" ago)")])])])])])],1)],1)]),t._v(" "),r("div",{staticClass:"my-4"},[r("tag-slider",{attrs:{tags:t.article.tags}})],1),t._v(" "),r("nuxt-link",{attrs:{to:{name:"by-id",params:{by:t.article.by,id:t.article.id}}}},[r("h3",{staticClass:"mb-2 text-h6"},[t._v(t._s(t.article.title))])])],1),t._v(" "),t.user?r("v-card-actions",[r("like-btn",{attrs:{data:t.article,type:"article",user:t.user},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.like,c=e.isLiked;return[r("v-btn",{staticClass:"opacity-7",attrs:{ripple:!1,text:""},on:{click:n}},[c?r("v-icon",{attrs:{color:"red",left:""}},[t._v("mdi-heart")]):r("v-icon",{attrs:{left:""}},[t._v("mdi-heart-outline")]),t._v(" "),r("span",[t._v(t._s(t.article.likesNo))])],1)]}}],null,!1,3234126026)}),t._v(" "),r("v-btn",{staticClass:"opacity-7",attrs:{text:""}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-comment-outline")]),t._v(" "),r("span",[t._v(t._s(t.article.kids.length))])],1),t._v(" "),r("save-btn",{attrs:{id:t.article.id},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.save,c=e.isSaved;return[r("v-btn",{staticClass:"opacity-7",attrs:{depressed:"",color:"white",ripple:!1},on:{click:n}},[c?r("v-icon",{attrs:{color:"blue",left:""}},[t._v("mdi-bookmark-check")]):r("v-icon",{attrs:{left:""}},[t._v("mdi-bookmark")])],1)]}}],null,!1,897060658)})],1):t._e()],1)])}),[],!1,null,null,null);e.a=component.exports;x()(component,{VBtn:C.a,VCard:P.a,VCardActions:V.a,VCardText:V.b,VIcon:D.a})},716:function(t,e,r){"use strict";r.r(e);r(10),r(8),r(5),r(3),r(6);var n=r(1),c=(r(50),r(16)),o=r(439),l=r(460),article=r(46),v=r(78);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var f={middleware:["auth"],components:{"article-card":o.a,"tag-group":l.a},fetch:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(article.e)(t.user.saved);case 2:r=e.sent,console.log(r),t.articles=r;case 5:case"end":return e.stop()}}),e)})))()},data:function(){return{articles:[]}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(v.c)({user:function(t){return t.user.user}}))},m=r(22),y=r(29),O=r.n(y),h=r(185),j=r(395),_=r(397),w=r(169),k=r(146),x=r(416),component=Object(m.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.$fetchState.pending?r("h1",[t._v("#Loading.....")]):r("div",[0===t.articles.length?r("div",[r("v-container",{staticClass:"white bs-border pa-4"},[r("v-row",{attrs:{dense:""}},[r("v-col",{staticClass:"d-flex justify-center align-center",attrs:{cols:"12",sm:"12",md:"4"}},[r("v-img",{attrs:{"max-width":"150",src:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0LTsIqEjovrNZIj70z7b4kRbM5pO-8dxoyg&usqp=CAU"}})],1),t._v(" "),r("v-col",{staticClass:"d-flex flex-column justify-center align-center align-md-start",attrs:{cols:"12",sm:"12",md:"8"}},[r("div",{staticClass:"opacity7 subtitle-1"},[r("p",[t._v("You haven't save anything yet.")]),t._v(" "),r("p",[t._v("\n                Tap\n                "),r("v-icon",[t._v("mdi-bookmark-outline")]),t._v("icon on posts to save\n                them for later.\n              ")],1)]),t._v(" "),r("div",{staticClass:"my-4 d-flex justify-sm-center justify-md-start"},[r("router-link",{staticClass:"router-link",attrs:{to:{name:"postsfeed"}}},[r("v-btn",{attrs:{small:"",elevation:"0",color:"info"}},[t._v("Posts worth saving")])],1)],1)])],1)],1)],1):r("div",[r("v-container",[r("v-row",{attrs:{dense:""}},[r("v-col",{staticClass:"pa-4",attrs:{cols:"12",sm:"0",md:"9"}},[r("div",[r("h1",[t._v("Reading Lists ("+t._s(t.articles.length)+")")])]),t._v(" "),t._l(t.articles,(function(article){return r("article-card",{key:article.id,attrs:{article:article}})}))],2),t._v(" "),r("v-col",{staticClass:"pa-4",attrs:{cols:"12",sm:"0",md:"3"}})],1)],1)],1)])])}),[],!1,null,null,null);e.default=component.exports;O()(component,{VBtn:h.a,VCol:j.a,VContainer:_.a,VIcon:w.a,VImg:k.a,VRow:x.a})}}]);