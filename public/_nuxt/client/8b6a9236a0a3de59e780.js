(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{398:function(t,e,r){"use strict";r(50);var n=r(16),o=r(19),c=r(112),l={props:{collection:{type:String,required:!0},type:{type:String,required:!0,validator:function(t){return-1!==["update","create","delete"].indexOf(t)}},params:{type:Object,required:!0}},mixins:[c.a],data:function(){return{data:{},loading:!1}},created:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.params.id||!t.params.fetch){e.next=4;break}return t.loading=!0,e.next=4,t.$store.dispatch("".concat(t.collection,"/fetch").concat(Object(o.a)(t.collection)),{id:t.params.id}).then((function(data){t.data=data,t.$emit("dataReady",t.data),t.loading=!1}));case 4:case"end":return e.stop()}}),e)})))()},methods:{writeFB:function(){var t=this;if(this.user){this.loading=!0;"".concat(this.collection,"s");var e="".concat(this.type).concat(Object(o.a)(this.collection));return this.$store.dispatch("".concat(this.collection,"/").concat(e),this.params).then((function(e){return t.loading=!1,e})).catch((function(t){return console.log(t)}))}}},render:function(){return this.$scopedSlots.default({writeFB:this.writeFB,data:this.data,loading:this.loading})}},d=r(22),component=Object(d.a)(l,void 0,void 0,!1,null,null,null);e.a=component.exports},399:function(t,e,r){"use strict";r(10),r(8),r(5),r(3),r(6);var n=r(1),o=r(78);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={props:{tag:{type:String,required:!0}},computed:l(l({},Object(o.b)({getTagByID:"tag/getTagByID"})),{},{tagObject:function(){return this.getTagByID(this.tag)}})},f=r(22),h=Object(f.a)(d,(function(){var t=this.$createElement,e=this._self._c||t;return e("nuxt-link",{attrs:{to:{name:"t-tag",params:{tag:this.tag}}}},[e("span",{staticClass:"hover-blue rounded px-2 py-1 font-weight-medium",style:{backgroundColor:""+this.tagObject.bg_color,color:""+this.tagObject.text_color}},[this._v(this._s(this.tagObject.name))])])}),[],!1,null,null,null).exports,m={props:{tags:{type:Array,required:!0}},components:{"base-tag":h}},v=r(29),y=r.n(v),O=r(443),j=r(455),x=Object(f.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-slide-group",{attrs:{multiple:"",mobile:""}},t._l(t.tags,(function(e){return r("v-slide-item",{key:e,attrs:{"active-class":"primary--text"},scopedSlots:t._u([{key:"default",fn:function(t){return[[r("div",[r("base-tag",{staticClass:"pr-2 py-1",attrs:{tag:e}})],1)]]}}],null,!0)})})),1)}),[],!1,null,null,null);e.a=x.exports;y()(x,{VSlideGroup:O.b,VSlideItem:j.a})},401:function(t,e,r){"use strict";r.d(e,"b",(function(){return c})),r.d(e,"a",(function(){return l}));var n=r(19),o=r(7);r(414);function c(t){var e=t.file,r=t.id,c=t.folder,l=t.progress,progress=void 0===l?n.h:l,d=t.error,f=void 0===d?n.h:d,h=t.success,m=void 0===h?n.h:h;console.log(r);var v=o.storage().ref("".concat(c,"/")+r).put(e);v.on("state_changed",progress,f,(function(){v.snapshot.ref.getDownloadURL().then((function(t){m(t)}))}))}function l(t){var e=t.folder,r=t.id;return o.storage().ref("".concat(e,"/")+r).delete()}},402:function(t,e,r){"use strict";r(50);var n=r(16),o=r(34),c={props:{id:{type:[String,Array],required:!0}},data:function(){return{data:null,loading:!1}},fetch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,r=Array.isArray(t.id)?t.id:[t.id],[],e.abrupt("return",Object(o.c)(r).then((function(e){t.data=Array.isArray(t.id)?e:e[0],t.loading=!1})).catch((function(){t.loading=!1})));case 4:case"end":return e.stop()}}),e)})))()},render:function(){return this.$scopedSlots.default({data:this.data,loading:this.loading})}},l=r(22),component=Object(l.a)(c,void 0,void 0,!1,null,null,null);e.a=component.exports},404:function(t,e,r){var content=r(420);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(15).default)("cd45976e",content,!0,{sourceMap:!1})},405:function(t,e,r){var content=r(424);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(15).default)("59f4d549",content,!0,{sourceMap:!1})},408:function(t,e,r){"use strict";var n=r(427),o=r.n(n),c=r(428),l=r.n(c),d=(r(415),r(429),{props:{content:{type:String,required:!0}},data:function(){return{md:""}},mounted:function(){o.a.setOptions({highlight:function(code){return l.a.highlightAuto(code).value}}),this.md=o()(this.content)},watch:{content:function(t){this.md=o()(t)}}}),f=r(22),h=r(29),m=r.n(h),v=r(395),y=r(397),O=r(416),component=Object(f.a)(d,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("v-container",[e("v-row",{attrs:{dense:""}},[e("v-col",{attrs:{"aria-colspan":"12",sm:"12"}},[e("div",{domProps:{innerHTML:this._s(this.md)}})])],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;m()(component,{VCol:v.a,VContainer:y.a,VRow:O.a})},419:function(t,e,r){"use strict";var n=r(404);r.n(n).a},420:function(t,e,r){(e=r(14)(!1)).push([t.i,".box-shadow{box-shadow:4px 4px 0 #111;border:2px solid #111}",""]),t.exports=e},423:function(t,e,r){"use strict";var n=r(405);r.n(n).a},424:function(t,e,r){(e=r(14)(!1)).push([t.i,".v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)>.v-input__control>.v-input__slot{box-shadow:none!important;padding:auto 0}",""]),t.exports=e},432:function(t,e,r){"use strict";r(10),r(8),r(5),r(3),r(6);var n=r(1),o=r(53),c=r(78);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var d={props:{article_tags:{type:Array,required:!0}},data:function(){return{selected:[]}},created:function(){this.selected=Object(o.a)(this.article_tags)},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.c)({tags:function(t){return t.tag.tags}})),methods:{remove:function(t){var e=this.selected.indexOf(t.id);e>=0&&(this.selected.splice(e,1),this.$emit("input",this.selected))}}},f=(r(419),r(22)),h=r(29),m=r.n(h),v=r(706),y=r(438),O=r(36),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-autocomplete",{staticClass:"text-subtitle-2 text-md-h6",attrs:{items:t.tags,solo:"",chips:"","deletable-chips":"",color:"grey lighten-1",label:"Add up to 4 tags","item-value":"id","item-text":"name",multiple:"",height:"50px"},on:{change:function(e){return t.$emit("input",t.selected)}},scopedSlots:t._u([{key:"selection",fn:function(data){return[r("v-chip",t._b({style:{backgroundColor:""+data.item.bg_color,color:""+data.item.text_color},attrs:{"input-value":data.selected,close:""},on:{click:data.select,"click:close":function(e){return t.remove(data.item)}}},"v-chip",data.attrs,!1),[t._v(t._s(data.item.name))])]}},{key:"item",fn:function(data){return["object"!=typeof data.item?[r("v-list-item-content",{domProps:{textContent:t._s(data.item)}})]:[r("v-list-item-content",{staticClass:"bs-border",style:{backgroundColor:""+data.item.bg_color,color:""+data.item.text_color}},[r("v-list-item-title",{staticClass:"d-flex justify-center align-center",domProps:{innerHTML:t._s(data.item.name)}})],1)]]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})}),[],!1,null,null,null),j=component.exports;m()(component,{VAutocomplete:v.a,VChip:y.a,VListItemContent:O.a,VListItemTitle:O.b});var x=r(19);function w(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?w(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):w(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var P={components:{"autocomplete-tag":j},middleware:["auth"],mixins:[{data:function(){return{nameRules:[function(t){return!!t||"Name is required"},function(t){return t&&t.length<=20||"Name must be less than 20 characters"}],emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+\..+/.test(t)||"E-mail must be valid"}],passwordRules:[function(t){return!!t||"Password is required"},function(t){return t&&t.length<=20||"Password must be less than 20 characters"}],selectRules:[function(t){return!!t||"Item is required"}],tagsRules:[function(t){return!!t||"Item is required"},function(t){return t&&t.length<=4||"You can only select maximum 5 categories for post"}],checkRules:[function(t){return!!t||"You must agree to continue!"}],titleRules:[function(t){return!!t||"Title is required"},function(t){return t&&t.length<=80||"Title must be less than 80 characters"}],descriptionRules:[function(t){return!!t||"Description is required"},function(t){return t&&t.length<=300||"Description must be less than 300 characters"}],textRules:[function(t){return!!t||"This field is required"}],fileRules:[function(t){return!!t||"Please choose a thumbnail for your post"}],bioRules:[function(t){return!!t||"Please describe yourself"},function(t){return t&&t.length<=200||"Bio must be less than 200 characters"}]}}}],props:{article:{type:Object,required:!0},file:{required:!0,validator:function(t){return!0}}},data:function(){return{clonedFile:{},tags:[],clonedArticle:{}}},watch:{"clonedArticle.tags":{deep:!0,handler:function(t,e){this.$emit("articleChanged",this.clonedArticle)}}},created:function(){this.clonedArticle=_({},this.article),this.clonedFile=this.file},methods:{emitArticle:function(){this.$emit("articleChanged",this.clonedArticle)},emitFile:function(t){this.previewImg(t),this.$emit("fileChaged",this.clonedFile)},previewImg:function(t){if(t){var e=this;console.log("vm file",this.clonedFile),Object(x.i)(t,(function(t){e.clonedArticle.photo.url=t}))}}},computed:_({},Object(c.c)({user:function(t){return t.user.user}}))},k=(r(423),r(185)),C=r(446),A=r(458),D=r(406),S=r(442),R=Object(f.a)(P,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-form",{ref:"form"},[r("div",{staticClass:"d-flex align-center px-2 mb-8"},[r("v-btn",{staticClass:"white--text",attrs:{elevation:"0",color:"grey lighten-1",ripple:!1}},[r("v-file-input",{staticClass:"pa-0 ma-0 white--text",attrs:{"show-size":"",value:"any",label:"Choose a file","hide-input":"",rules:t.fileRules},on:{change:t.emitFile},model:{value:t.clonedFile,callback:function(e){t.clonedFile=e},expression:"clonedFile"}})],1),t._v(" "),r("span",{staticClass:"text-sm-subtitle-2 text-md-h6 grey--text lighten-1 ml-3"},[t._v("Add a Cover image")])],1),t._v(" "),r("img",{attrs:{src:t.clonedArticle.photo.url}}),t._v(" "),r("div",[r("v-text-field",{staticClass:"text-h5 text-md-h4 font-weight-medium grey--text darken-2",attrs:{label:"Solo",placeholder:"Article title here...",solo:"",rules:t.titleRules},on:{change:t.emitArticle},model:{value:t.clonedArticle.title,callback:function(e){t.$set(t.clonedArticle,"title",e)},expression:"clonedArticle.title"}})],1),t._v(" "),r("div",[r("autocomplete-tag",{attrs:{article_tags:t.clonedArticle.tags},model:{value:t.clonedArticle.tags,callback:function(e){t.$set(t.clonedArticle,"tags",e)},expression:"clonedArticle.tags"}})],1),t._v(" "),r("div",[r("v-textarea",{staticClass:"text-subtitle-1 font-weight-medium grey--text darken-2",attrs:{label:"Solo",placeholder:"Describe your article in short here...",solo:"","auto-grow":"",rules:t.descriptionRules},on:{change:t.emitArticle},model:{value:t.clonedArticle.description,callback:function(e){t.$set(t.clonedArticle,"description",e)},expression:"clonedArticle.description"}})],1),t._v(" "),r("div",[r("v-textarea",{staticClass:"text-subtitle-1 font-weight-medium grey--text darken-1",attrs:{label:"Solo",placeholder:"Write your article here...",solo:"","auto-grow":"",rules:t.textRules},on:{change:t.emitArticle},model:{value:t.clonedArticle.content,callback:function(e){t.$set(t.clonedArticle,"content",e)},expression:"clonedArticle.content"}})],1)])],1)}),[],!1,null,null,null);e.a=R.exports;m()(R,{VBtn:k.a,VFileInput:C.a,VForm:A.a,VTextField:D.a,VTextarea:S.a})},433:function(t,e,r){"use strict";r(10),r(8),r(5),r(3),r(6);var n=r(1),o=r(408),c=r(399),l=r(402),d=r(19),f=r(78);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var m={components:{"vue-markdown":o.a,"tag-slider":c.a,"author-profile":l.a},props:{article:{type:Object,required:!0}},created:function(){console.log("PREVIEW",this.article)},methods:{timeAgo:function(time){return Object(d.m)(time)}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(f.b)({getTagByID:"tag/getTagByID"}))},v=r(22),y=r(29),O=r.n(y),j=r(47),component=Object(v.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"white pa-sm-6 pa-md-12 rounded-xl article-view bs-border"},[r("div",{staticClass:"pa-4"},[r("h1",{staticClass:"text-center text-sm-h6 text-md-h3 font-weight-medium",style:[t.article.tags.length>0?{textShadow:"-4px -1px 0 "+t.getTagByID(t.article.tags[0]).bg_color}:null]},[t._v(t._s(t.article.title))]),t._v(" "),r("h3",{staticClass:"text-center opacity-7 text-sm-subtitle-2 text-md-h5 font-weight-medium font-italic"},[t._v(t._s(t.article.description))])]),t._v(" "),t.article.tags.length>0?r("div",{staticClass:"my-4 text-center d-flex justify-center align-center"},[r("tag-slider",{attrs:{tags:t.article.tags}})],1):t._e(),t._v(" "),r("div",[r("author-profile",{staticClass:"my-3",attrs:{id:t.article.by},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.data,o=e.loading;return[r("div",[r("transition",{attrs:{name:"fade",mode:"out-in"}},[o?t._e():r("div",{staticClass:"d-flex flex-column justify-space-between align-center font-italic text-subtitle-1"},[r("nuxt-link",{attrs:{to:{name:"by",params:{by:n.uid}}}},[r("p",{staticClass:"purple--text"},[t._v(t._s(n.displayName))])]),t._v(" "),r("p",[t._v(t._s(t.timeAgo(t.article.timestamp))+" ago")])],1)])],1)]}}])}),t._v(" "),t.article.photo.url?r("v-sheet",{staticClass:"mb-6",style:{backgroundImage:"url("+t.article.photo.url+")",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"},attrs:{height:"400px"}}):t._e()],1),t._v(" "),r("vue-markdown",{attrs:{content:t.article.content}})],1)])}),[],!1,null,null,null);e.a=component.exports;O()(component,{VSheet:j.a})},447:function(t,e,r){var content=r(673);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(15).default)("7fbd87a3",content,!0,{sourceMap:!1})},672:function(t,e,r){"use strict";var n=r(447);r.n(n).a},673:function(t,e,r){(e=r(14)(!1)).push([t.i,".basil{background-color:#fffbe6!important}.basil--text{color:#356859!important}",""]),t.exports=e},707:function(t,e,r){"use strict";r.r(e);r(10),r(8),r(5),r(3),r(6);var n=r(1),o=r(398),c=r(432),l=r(433),d=r(49),f=r(19),h=r(401),m=r(78);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var O={layout:"form",components:{articleForm:c.a,articlePreview:l.a,"create-article":o.a},middleware:["auth"],data:function(){return{tab:null,article:y({},Object(d.a)()),file:{},tabItems:[{title:"Write",component:"articleForm"},{title:"Preview",component:"articlePreview"}]}},methods:{changeArticle:function(article){this.article=article},changeFile:function(t){this.file=t},createArticle:function(t){var e=this;this.updating=!0,Object(f.e)(this.file)?Object(h.b)({folder:"articles",file:this.file,id:this.article.photo.id,success:function(r){console.log(r),e.article.photo.url=r,e.updating=!1,console.log(e.article),t()}}):(console.log(this.file),t())},cancelArticle:function(){this.$router.push("/")}},created:function(){this.article.by=this.by},computed:y({},Object(m.c)({by:function(t){return t.user.user.uid}}))},j=(r(672),r(22)),x=r(29),w=r.n(x),_=r(185),P=r(378),k=r(395),C=r(397),A=r(416),D=r(694),S=r(726),R=r(725),V=r(692),component=Object(j.a)(O,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-container",[r("v-row",{attrs:{dense:""}},[r("v-col",{staticClass:"white bs-border",attrs:{cols:"12",sm:"12",md:"9"}},[r("v-card",{attrs:{color:"white",elevation:"0"}},[r("v-tabs",{attrs:{"background-color":"transparent",color:"purple",grow:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.tabItems,(function(e){return r("v-tab",{key:e.title},[t._v(t._s(e.title))])})),1),t._v(" "),r("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.tabItems,(function(e){return r("v-tab-item",{key:e.title},[r("div",[r("v-container",[r("v-row",{attrs:{dense:""}},[r("v-col",{staticClass:"pa-sm-3 pa-md-6",attrs:{cols:"12",sm:"12"}},[r(e.component,{tag:"component",attrs:{article:t.article,file:t.file},on:{articleChanged:t.changeArticle,fileChaged:t.changeFile}})],1)],1)],1)],1)])})),1)],1)],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"12",md:"3"}})],1),t._v(" "),r("v-row",{staticClass:"my-2 my-md-4",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"9"}},[r("create-article",{attrs:{collection:"article",type:"create",params:{data:t.article}},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.writeFB,o=e.loading;return[r("div",[r("v-btn",{staticClass:"white--text",attrs:{color:"purple",depressed:"",loading:o},on:{click:function(e){return t.createArticle(n)}}},[t._v("Publish")]),t._v(" "),r("v-btn",{staticClass:"white--text",attrs:{depressed:"",color:"indigo lighten-4"},on:{click:t.cancelArticle}},[t._v("Cancel")])],1)]}}])})],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;w()(component,{VBtn:_.a,VCard:P.a,VCol:k.a,VContainer:C.a,VRow:A.a,VTab:D.a,VTabItem:S.a,VTabs:R.a,VTabsItems:V.a})}}]);