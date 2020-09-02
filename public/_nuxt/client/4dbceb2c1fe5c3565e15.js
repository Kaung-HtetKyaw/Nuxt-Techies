(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{398:function(t,e,n){"use strict";n(50);var r=n(16),o=n(19),c=n(112),l={props:{collection:{type:String,required:!0},type:{type:String,required:!0,validator:function(t){return-1!==["update","create","delete"].indexOf(t)}},params:{type:Object,required:!0}},mixins:[c.a],data:function(){return{data:{},loading:!1}},created:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.params.id||!t.params.fetch){e.next=4;break}return t.loading=!0,e.next=4,t.$store.dispatch("".concat(t.collection,"/fetch").concat(Object(o.a)(t.collection)),{id:t.params.id}).then((function(data){t.data=data,t.$emit("dataReady",t.data),t.loading=!1}));case 4:case"end":return e.stop()}}),e)})))()},methods:{writeFB:function(){var t=this;if(this.user){this.loading=!0;"".concat(this.collection,"s");var e="".concat(this.type).concat(Object(o.a)(this.collection));return this.$store.dispatch("".concat(this.collection,"/").concat(e),this.params).then((function(e){return t.loading=!1,e})).catch((function(t){return console.log(t)}))}}},render:function(){return this.$scopedSlots.default({writeFB:this.writeFB,data:this.data,loading:this.loading})}},d=n(22),component=Object(d.a)(l,void 0,void 0,!1,null,null,null);e.a=component.exports},401:function(t,e,n){"use strict";n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return l}));var r=n(19),o=n(7);n(414);function c(t){var e=t.file,n=t.id,c=t.folder,l=t.progress,progress=void 0===l?r.h:l,d=t.error,f=void 0===d?r.h:d,h=t.success,v=void 0===h?r.h:h;console.log(n);var m=o.storage().ref("".concat(c,"/")+n).put(e);m.on("state_changed",progress,f,(function(){m.snapshot.ref.getDownloadURL().then((function(t){v(t)}))}))}function l(t){var e=t.folder,n=t.id;return o.storage().ref("".concat(e,"/")+n).delete()}},709:function(t,e,n){"use strict";n.r(e);n(10),n(8),n(5),n(3),n(6);var r=n(1),o=n(398),c=n(49),l=n(19),d=n(401),f=n(78);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var v={middleware:["auth"],layout:"form",components:{"create-topic":o.a},data:function(){return{topic:Object(c.d)(),file:{},creating:!1}},created:function(){this.topic.about.by=this.user.uid},methods:{createTopic:function(t){var e=this;if(this.creating=!0,!Object(l.e)(this.file))return t().then((function(t){e.$router.push({name:"topics-id",params:{id:t.id}})})).catch((function(t){return console.log(t)}));console.log(this.file),Object(d.b)({folder:"topics",file:this.file,id:this.topic.cover.id,success:function(n){return e.topic.cover.url=n,e.creating=!1,t().then((function(t){e.$router.push({name:"topics-id",params:{id:t.id}})})).catch((function(t){return console.log(t)}))}})},previewImg:function(t){if(t){var e=this;Object(l.i)(t,(function(t){e.topic.cover.url=t}))}}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(f.c)({user:function(t){return t.user.user}}))},m=n(22),w=n(29),O=n.n(w),x=n(185),y=n(395),j=n(397),C=n(446),_=n(416),k=n(406),$=n(442),component=Object(m.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("create-topic",{attrs:{type:"create",collection:"topic",params:{data:t.topic}},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.writeFB;return[n("v-container",[n("v-row",{attrs:{dense:""}},[n("v-col",{staticClass:"white pa-1 pa-md-8 bs-border",attrs:{cols:"12",sm:"12",md:"8","offset-md":"2"}},[n("div",[n("div",{staticClass:"text-h6 text-md-h4 text-center font-weight-medium"},[n("span",[t._v("Create a Topic")])]),t._v(" "),n("div",{staticClass:"pa-4"},[n("div",[n("v-text-field",{attrs:{outlined:"",label:"Name"},model:{value:t.topic.name,callback:function(e){t.$set(t.topic,"name",e)},expression:"topic.name"}})],1),t._v(" "),n("div",[n("v-textarea",{attrs:{outlined:"",label:"Description"},model:{value:t.topic.about.description,callback:function(e){t.$set(t.topic.about,"description",e)},expression:"topic.about.description"}})],1),t._v(" "),n("div",[n("div",{staticClass:"d-flex align-center px-2 mb-8"},[n("v-btn",{staticClass:"white--text",attrs:{elevation:"0",color:"grey lighten-1",ripple:!1}},[n("v-file-input",{staticClass:"pa-0 ma-0 white--text",attrs:{"show-size":"",value:"any",label:"Choose a file","hide-input":""},on:{change:t.previewImg},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}})],1),t._v(" "),n("span",{staticClass:"text-sm-subtitle-2 text-md-h6 grey--text lighten-1 ml-3"},[t._v("Add a Cover image")])],1),t._v(" "),n("img",{attrs:{src:t.topic.cover.url,alt:t.topic.name}})])])])])],1),t._v(" "),n("v-row",{attrs:{dense:""}},[n("v-col",{staticClass:"white pa-4 pa-md-8 my-4 bs-border",attrs:{cols:"12",sm:"12",md:"8","offset-md":"2"}},[n("v-btn",{staticClass:"white--text",attrs:{depressed:"",color:"purple",loading:t.creating},on:{click:function(e){return t.createTopic(r)}}},[t._v("Create a Topic")])],1)],1)],1)]}}])})],1)}),[],!1,null,null,null);e.default=component.exports;O()(component,{VBtn:x.a,VCol:y.a,VContainer:j.a,VFileInput:C.a,VRow:_.a,VTextField:k.a,VTextarea:$.a})}}]);