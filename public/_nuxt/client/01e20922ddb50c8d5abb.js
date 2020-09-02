(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{398:function(t,e,r){"use strict";r(50);var n=r(16),c=r(19),o=r(112),l={props:{collection:{type:String,required:!0},type:{type:String,required:!0,validator:function(t){return-1!==["update","create","delete"].indexOf(t)}},params:{type:Object,required:!0}},mixins:[o.a],data:function(){return{data:{},loading:!1}},created:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.params.id||!t.params.fetch){e.next=4;break}return t.loading=!0,e.next=4,t.$store.dispatch("".concat(t.collection,"/fetch").concat(Object(c.a)(t.collection)),{id:t.params.id}).then((function(data){t.data=data,t.$emit("dataReady",t.data),t.loading=!1}));case 4:case"end":return e.stop()}}),e)})))()},methods:{writeFB:function(){var t=this;if(this.user){this.loading=!0;"".concat(this.collection,"s");var e="".concat(this.type).concat(Object(c.a)(this.collection));return this.$store.dispatch("".concat(this.collection,"/").concat(e),this.params).then((function(e){return t.loading=!1,e})).catch((function(t){return console.log(t)}))}}},render:function(){return this.$scopedSlots.default({writeFB:this.writeFB,data:this.data,loading:this.loading})}},d=r(22),component=Object(d.a)(l,void 0,void 0,!1,null,null,null);e.a=component.exports},402:function(t,e,r){"use strict";r(50);var n=r(16),c=r(34),o={props:{id:{type:[String,Array],required:!0}},data:function(){return{data:null,loading:!1}},fetch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,r=Array.isArray(t.id)?t.id:[t.id],[],e.abrupt("return",Object(c.c)(r).then((function(e){t.data=Array.isArray(t.id)?e:e[0],t.loading=!1})).catch((function(){t.loading=!1})));case 4:case"end":return e.stop()}}),e)})))()},render:function(){return this.$scopedSlots.default({data:this.data,loading:this.loading})}},l=r(22),component=Object(l.a)(o,void 0,void 0,!1,null,null,null);e.a=component.exports},417:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r(23),r(24),r(46);function n(t,e){var r=[],n=t.filter((function(article){return e.includes(article.by)})),c=t.filter((function(article){return!e.includes(article.by)}));return r=r.concat(n,c)}},435:function(t,e,r){"use strict";r(10),r(8),r(5),r(3),r(6);var n=r(1),c=(r(50),r(16)),o=r(78),l=r(112),d=r(417);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={props:{lazy:{type:Boolean},params:{type:Object,required:!0,validator:function(t){return-1!==["all","user","tag","popular","topic"].indexOf(t.type)}}},mixins:[l.a],fetch:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("article/getArticles",{params:t.params,lazy:t.lazyLoad});case 2:e.sent.length>0?t.lazy&&(t.lazyLoad=t.lazy):(t.lazyLoad=!1,t.empty=!0),t.$emit("dataReady",t.articles);case 5:case"end":return e.stop()}}),e)})))()},data:function(){return{lazyLoad:!1,empty:!1}},methods:{lazyLoadArticles:function(t){!t||this.$fetchState.pending||this.empty||this.$fetch()}},watch:{params:function(){this.empty=!1,this.lazyLoad=!1,this.$fetch()}},computed:v(v({},Object(o.c)({storedArticles:function(t){return t.article.articles}})),{},{articles:function(){return this.user?Object(d.a)(this.storedArticles,this.user.following):this.storedArticles}}),render:function(){return this.$scopedSlots.default({loading:this.$fetchState.pending,articles:this.articles,lazyLoadArticles:this.lazyLoadArticles,empty:this.empty})}},y=r(22),component=Object(y.a)(m,void 0,void 0,!1,null,null,null);e.a=component.exports},451:function(t,e,r){"use strict";r(10),r(8),r(5),r(3),r(6);var n=r(1),c=(r(50),r(16)),o=r(78),l=r(34),d=r(19),f=r(49),v=r(112),m=r(409),y=r(399),h=r(410);function O(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function j(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?O(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):O(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _={props:{article:{type:Object,required:!0}},components:{"like-btn":m.a,"tag-slider":y.a,"save-btn":h.a},mixins:[v.a],data:function(){return{author:{},defaultUserObjFB:f.e}},fetch:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(l.b)(t.article.by).then((function(e){t.author=e})).catch((function(t){return console.log(t)})));case 1:case"end":return e.stop()}}),e)})))()},computed:j(j({},Object(o.b)({getTagByID:"tag/getTagByID"})),{},{isEmptyObj:function(){return Object(d.d)(this.author)},timeAgo:function(){return Object(d.m)(this.article.timestamp)}})},w=r(22),x=r(29),k=r.n(x),C=r(166),P=r(185),A=r(378),S=r(238),z=r(169),D=r(47),component=Object(w.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"article-card-block bs-border my-2",attrs:{outlined:""}},[r("nuxt-link",{attrs:{to:{name:"by-id",params:{by:t.article.by,id:t.article.id}}}},[r("v-sheet",{staticClass:"center-background-img",style:{backgroundImage:"url("+(t.article.photo.url?t.article.photo.url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png")+")"},attrs:{height:"200px"}})],1),t._v(" "),r("div",{staticClass:"px-6 py-3"},[r("v-card-text",{staticClass:"px-0"},[r("div",[t.isEmptyObj?r("div",[r("transition",{attrs:{name:"fade",mode:"out-in"}},[r("div",{staticClass:"mb-2 d-flex flex-row"},[r("v-avatar",{attrs:{size:"35"}},[r("img",{attrs:{src:t.defaultUserObjFB.photo.url,alt:t.defaultUserObjFB.displayName}})]),t._v(" "),r("div",{staticClass:"d-flex flex-column justify-center px-4 opacity-7"},[r("div",{staticClass:"hover-blue"},[t._v("Loading...")]),t._v(" "),r("div",{staticClass:"caption py-1"})])],1)])],1):r("div",[r("transition",{attrs:{name:"fade",mode:"out-in"}},[r("nuxt-link",{attrs:{to:{name:"by",params:{by:t.article.by}}}},[r("div",{staticClass:"mb-2 d-flex flex-row"},[r("v-avatar",{attrs:{size:"35"}},[r("img",{attrs:{src:t.author.photo.url,alt:t.author.displayName}})]),t._v(" "),r("div",{staticClass:"d-flex flex-column justify-center px-4 opacity-7"},[r("div",{staticClass:"hover-blue font-weight-medium"},[t._v(t._s(t.author.displayName))]),t._v(" "),r("div",{staticClass:"caption py-1 black--text"},[r("span",[t._v("("+t._s(t.timeAgo)+" ago)")])])])],1)])],1)],1)]),t._v(" "),r("div",{staticClass:"my-4"},[r("tag-slider",{attrs:{tags:t.article.tags}})],1),t._v(" "),r("nuxt-link",{attrs:{to:{name:"by-id",params:{by:t.article.by,id:t.article.id}}}},[r("h3",{staticClass:"mb-2 text-h6"},[t._v(t._s(t.article.title))]),t._v(" "),r("p",{staticClass:"mb-2 text-subtitle-2 font-italic opacity-7"},[t._v(t._s(t.article.description))])]),t._v(" "),t.user?r("v-card-actions",[r("like-btn",{attrs:{data:t.article,type:"article",user:t.user},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.like,c=e.isLiked;return[r("v-btn",{staticClass:"opacity-7",attrs:{ripple:!1,text:""},on:{click:n}},[c?r("v-icon",{attrs:{color:"red",left:""}},[t._v("mdi-heart")]):r("v-icon",{attrs:{left:""}},[t._v("mdi-heart-outline")]),t._v(" "),r("span",[t._v(t._s(t.article.likesNo))])],1)]}}],null,!1,3234126026)}),t._v(" "),r("v-btn",{staticClass:"opacity-7",attrs:{text:""}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-comment-outline")]),t._v(" "),r("span",[t._v(t._s(t.article.kids.length))])],1),t._v(" "),r("save-btn",{attrs:{id:t.article.id},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.save,c=e.isSaved;return[r("v-btn",{staticClass:"opacity-7",attrs:{depressed:"",color:"white",ripple:!1},on:{click:n}},[c?r("v-icon",{attrs:{color:"blue",left:""}},[t._v("mdi-bookmark-check")]):r("v-icon",{attrs:{left:""}},[t._v("mdi-bookmark")])],1)]}}],null,!1,897060658)})],1):t._e()],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;k()(component,{VAvatar:C.a,VBtn:P.a,VCard:A.a,VCardActions:S.a,VCardText:S.b,VIcon:z.a,VSheet:D.a})},714:function(t,e,r){"use strict";r.r(e);r(10),r(8),r(5),r(3),r(6);var n=r(1),c=r(435),o=r(451),l=r(173),d=r(398),f=r(409),v=r(402),m=r(460),y=r(228),h=r(227),O=r(78),j=r(112);r(417);function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var w={components:{"article-list-model":c.a,"article-card":o.a,"signin-btn-model":l.a,"write-fb":d.a,"like-btn":f.a,"user-model":v.a,"tag-group":m.a,"user-info":y.a,"user-avatar":h.a},mixins:[j.a],data:function(){return{isHydrated:!1}},methods:{listenArticlesState:function(){}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(O.c)({isAuthenticated:function(t){return t.user.isAuthenticated}}))},x=r(22),k=r(29),C=r.n(k),P=r(395),A=r(397),S=r(380),z=r(416),component=Object(x.a)(w,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-container",{staticClass:"px-0",attrs:{fluid:""}},[r("v-row",{attrs:{dense:""}},[r("v-col",{staticClass:"d-none d-md-block flex-column",attrs:{cols:"12",md:"3",sm:"0"}},[r("div",{staticClass:"py-4 white bs-border"},[t.user?r("div",[r("user-avatar",{attrs:{user:t.user}})],1):t._e(),t._v(" "),r("user-info"),t._v(" "),r("v-divider",{staticClass:"mt-4"}),t._v(" "),r("tag-group",{staticClass:"mt-4"})],1)]),t._v(" "),r("v-col",{staticClass:"pt-0",attrs:{cols:"12",md:"6",sm:"12"}},[r("v-container",{staticClass:"px-0 pt-0"},[r("v-row",{attrs:{dense:""}},[r("article-list-model",{attrs:{lazy:!0,params:{type:"all"}},on:{dataReady:t.listenArticlesState},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.articles,c=e.lazyLoadArticles,o=e.loading,l=e.empty;return[r("v-container",{staticClass:"px-0 pt-0"},[r("v-col",{staticClass:"pt-0",attrs:{cols:"12",sm:"12"}},[r("v-container",{staticClass:"px-0 pt-0"},[r("v-row",{attrs:{dense:""}},[r("transition-group",{staticClass:"full-width",attrs:{name:"vertical",tag:"div"}},t._l(n,(function(article,i){return r("v-col",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:i===n.length-1&&c,expression:"\n                            i === articles.length - 1\n                              ? lazyLoadArticles\n                              : false\n                          "}],key:article.id,staticClass:"pa-0",attrs:{cols:"12",sm:"12"}},[r("article-card",{attrs:{article:article}})],1)})),1)],1),t._v(" "),o?r("v-row",{attrs:{dense:""}},t._l(10,(function(i){return r("v-col",{key:i,attrs:{cols:"12",sm:"12"}},[r("content-placeholders",{attrs:{rounded:""}},[r("content-placeholders-img"),t._v(" "),r("content-placeholders-text",{attrs:{lines:3}})],1)],1)})),1):t._e(),t._v(" "),l?r("v-row",{attrs:{dense:""}},[r("h1",[t._v("#Empty.....")])]):t._e()],1)],1)],1)]}}])})],1)],1)],1),t._v(" "),r("v-col",{staticClass:"red d-none d-md-flex",attrs:{cols:"12",sm:"0",md:"3"}},[r("h1",[t._v("Posts")])])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;C()(component,{VCol:P.a,VContainer:A.a,VDivider:S.a,VRow:z.a})}}]);