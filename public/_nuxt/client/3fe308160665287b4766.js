/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{414:function(e,t,r){"use strict";r.r(t);var n=r(11),o=r.n(n);function l(e,t,r,n){return new(r||(r=Promise))((function(o,l){function c(e){try{f(n.next(e))}catch(e){l(e)}}function h(e){try{f(n.throw(e))}catch(e){l(e)}}function f(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(c,h)}f((n=n.apply(e,t||[])).next())}))}function c(e,body){var t,r,n,g,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return g={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function l(l){return function(c){return function(l){if(t)throw new TypeError("Generator is already executing.");for(;o;)try{if(t=1,r&&(n=2&l[0]?r.return:l[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,l[1])).done)return n;switch(r=0,n&&(l=[2&l[0],n.value]),l[0]){case 0:case 1:n=l;break;case 4:return o.label++,{value:l[1],done:!1};case 5:o.label++,r=l[1],l=[0];continue;case 7:l=o.ops.pop(),o.trys.pop();continue;default:if(!(n=o.trys,(n=n.length>0&&n[n.length-1])||6!==l[0]&&2!==l[0])){o=0;continue}if(3===l[0]&&(!n||l[1]>n[0]&&l[1]<n[3])){o.label=l[1];break}if(6===l[0]&&o.label<n[1]){o.label=n[1],n=l;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(l);break}n[2]&&o.ops.pop(),o.trys.pop();continue}l=body.call(e,o)}catch(e){l=[6,e],r=0}finally{t=n=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,c])}}}function h(){for(var s=0,i=0,e=arguments.length;i<e;i++)s+=arguments[i].length;var t=Array(s),r=0;for(i=0;i<e;i++)for(var a=arguments[i],n=0,o=a.length;n<o;n++,r++)t[r]=a[n];return t}var f=r(179),d=function(){function e(code,e){this.code_=L(code),this.message_="Firebase Storage: "+e,this.serverResponse_=null,this.name_="FirebaseError"}return e.prototype.codeProp=function(){return this.code},e.prototype.codeEquals=function(code){return L(code)===this.codeProp()},e.prototype.serverResponseProp=function(){return this.serverResponse_},e.prototype.setServerResponseProp=function(e){this.serverResponse_=e},Object.defineProperty(e.prototype,"name",{get:function(){return this.name_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"code",{get:function(){return this.code_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"message",{get:function(){return this.message_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"serverResponse",{get:function(){return this.serverResponse_},enumerable:!0,configurable:!0}),e}(),_="unknown",v="object-not-found",m="quota-exceeded",y="unauthenticated",w="unauthorized",R="retry-limit-exceeded",k="canceled",T="invalid-url",x="invalid-default-bucket",U="cannot-slice-blob",S="server-file-wrong-size",E="no-download-url",O="invalid-argument",P="invalid-argument-count",A="app-deleted",C="invalid-root-operation",M="invalid-format",W="internal-error";function L(code){return"storage/"+code}function I(){return new d(_,"An unknown error occurred, please check the error payload for server response.")}function j(){return new d(k,"User canceled the upload/download.")}function B(){return new d(U,"Cannot slice blob for upload. Please retry the upload.")}function N(){return new d(E,"The given file does not have any download URLs.")}function H(e,t,r){return new d(O,"Invalid argument in `"+t+"` at index "+e+": "+r)}function z(){return new d(A,"The Firebase app was deleted.")}function D(e,t){return new d(M,"String does not match format '"+e+"': "+t)}function F(e){throw new d(W,"Internal error: "+e)}var G={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};function X(e){switch(e){case G.RAW:case G.BASE64:case G.BASE64URL:case G.DATA_URL:return;default:throw"Expected one of the event types: ["+G.RAW+", "+G.BASE64+", "+G.BASE64URL+", "+G.DATA_URL+"]."}}var K=function(data,e){this.data=data,this.contentType=e||null};function Z(e,t){switch(e){case G.RAW:return new K(J(t));case G.BASE64:case G.BASE64URL:return new K(V(e,t));case G.DATA_URL:return new K((r=new $(t)).base64?V(G.BASE64,r.rest):function(e){var t;try{t=decodeURIComponent(e)}catch(e){throw D(G.DATA_URL,"Malformed data URL.")}return J(t)}(r.rest),function(e){return new $(e).contentType}(t))}var r;throw I()}function J(e){for(var b=[],i=0;i<e.length;i++){var t=e.charCodeAt(i);if(t<=127)b.push(t);else if(t<=2047)b.push(192|t>>6,128|63&t);else if(55296==(64512&t))if(i<e.length-1&&56320==(64512&e.charCodeAt(i+1)))t=65536|(1023&t)<<10|1023&e.charCodeAt(++i),b.push(240|t>>18,128|t>>12&63,128|t>>6&63,128|63&t);else b.push(239,191,189);else 56320==(64512&t)?b.push(239,191,189):b.push(224|t>>12,128|t>>6&63,128|63&t)}return new Uint8Array(b)}function V(e,t){switch(e){case G.BASE64:var r=-1!==t.indexOf("-"),n=-1!==t.indexOf("_");if(r||n)throw D(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break;case G.BASE64URL:var o=-1!==t.indexOf("+"),l=-1!==t.indexOf("/");if(o||l)throw D(e,"Invalid character '"+(o?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}var c;try{c=atob(t)}catch(t){throw D(e,"Invalid character found")}for(var h=new Uint8Array(c.length),i=0;i<c.length;i++)h[i]=c.charCodeAt(i);return h}var $=function(e){this.base64=!1,this.contentType=null;var t=e.match(/^data:([^,]+)?,/);if(null===t)throw D(G.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var r=t[1]||null;null!=r&&(this.base64=(s=r,n=";base64",s.length>=n.length&&s.substring(s.length-n.length)===n),this.contentType=this.base64?r.substring(0,r.length-";base64".length):r),this.rest=e.substring(e.indexOf(",")+1);var s,n};var Q,Y={STATE_CHANGED:"state_changed"},ee="running",te="pausing",re="paused",ne="success",oe="canceling",ie="canceled",ae="error",se={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function ue(e){switch(e){case ee:case te:case oe:return se.RUNNING;case re:return se.PAUSED;case ne:return se.SUCCESS;case ie:return se.CANCELED;case ae:default:return se.ERROR}}function le(p){return null!=p}function ce(p){return void 0!==p}function pe(p){return"function"==typeof p}function he(p){return"object"==typeof p}function fe(p){return he(p)&&null!==p}function de(p){return"string"==typeof p||p instanceof String}function _e(p){return ve(p)&&Number.isInteger(p)}function ve(p){return"number"==typeof p||p instanceof Number}function me(p){return ge()&&p instanceof Blob}function ge(){return"undefined"!=typeof Blob}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(Q||(Q={}));var be=function(){function e(){var e=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=Q.NO_ERROR,this.sendPromise_=new Promise((function(t){e.xhr_.addEventListener("abort",(function(){e.errorCode_=Q.ABORT,t(e)})),e.xhr_.addEventListener("error",(function(){e.errorCode_=Q.NETWORK_ERROR,t(e)})),e.xhr_.addEventListener("load",(function(){t(e)}))}))}return e.prototype.send=function(e,t,body,r){if(this.sent_)throw F("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),le(r))for(var n in r)r.hasOwnProperty(n)&&this.xhr_.setRequestHeader(n,r[n].toString());return le(body)?this.xhr_.send(body):this.xhr_.send(),this.sendPromise_},e.prototype.getErrorCode=function(){if(!this.sent_)throw F("cannot .getErrorCode() before sending");return this.errorCode_},e.prototype.getStatus=function(){if(!this.sent_)throw F("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}},e.prototype.getResponseText=function(){if(!this.sent_)throw F("cannot .getResponseText() before sending");return this.xhr_.responseText},e.prototype.abort=function(){this.xhr_.abort()},e.prototype.getResponseHeader=function(header){return this.xhr_.getResponseHeader(header)},e.prototype.addUploadProgressListener=function(e){le(this.xhr_.upload)&&this.xhr_.upload.addEventListener("progress",e)},e.prototype.removeUploadProgressListener=function(e){le(this.xhr_.upload)&&this.xhr_.upload.removeEventListener("progress",e)},e}(),ye=function(){function e(){}return e.prototype.createXhrIo=function(){return new be},e}();function we(){return"undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function Re(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=we();if(void 0!==r){for(var n=new r,i=0;i<e.length;i++)n.append(e[i]);return n.getBlob()}if(ge())return new Blob(e);throw Error("This browser doesn't seem to support creating Blobs")}var ke=function(){function e(data,e){var t=0,r="";me(data)?(this.data_=data,t=data.size,r=data.type):data instanceof ArrayBuffer?(e?this.data_=new Uint8Array(data):(this.data_=new Uint8Array(data.byteLength),this.data_.set(new Uint8Array(data))),t=this.data_.length):data instanceof Uint8Array&&(e?this.data_=data:(this.data_=new Uint8Array(data.length),this.data_.set(data)),t=data.length),this.size_=t,this.type_=r}return e.prototype.size=function(){return this.size_},e.prototype.type=function(){return this.type_},e.prototype.slice=function(t,r){if(me(this.data_)){var n=function(e,t,r){return e.webkitSlice?e.webkitSlice(t,r):e.mozSlice?e.mozSlice(t,r):e.slice?e.slice(t,r):null}(this.data_,t,r);return null===n?null:new e(n)}return new e(new Uint8Array(this.data_.buffer,t,r-t),!0)},e.getBlob=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];if(ge()){var n=t.map((function(t){return t instanceof e?t.data_:t}));return new e(Re.apply(null,n))}var o=t.map((function(e){return de(e)?Z(G.RAW,e).data:e.data_})),l=0;o.forEach((function(e){l+=e.byteLength}));var c=new Uint8Array(l),h=0;return o.forEach((function(e){for(var i=0;i<e.length;i++)c[h++]=e[i]})),new e(c,!0)},e.prototype.uploadData=function(){return this.data_},e}(),Te=function(){function e(e,path){this.bucket=e,this.path_=path}return Object.defineProperty(e.prototype,"path",{get:function(){return this.path_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isRoot",{get:function(){return 0===this.path.length},enumerable:!0,configurable:!0}),e.prototype.fullServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)},e.prototype.bucketOnlyServerUrl=function(){return"/b/"+encodeURIComponent(this.bucket)+"/o"},e.makeFromBucketSpec=function(t){var r;try{r=e.makeFromUrl(t)}catch(r){return new e(t,"")}if(""===r.path)return r;throw new d(x,"Invalid default bucket '"+t+"'.")},e.makeFromUrl=function(t){var r=null;var n=new RegExp("^gs://([A-Za-z0-9.\\-_]+)(/(.*))?$","i");function o(e){e.path_=decodeURIComponent(e.path)}for(var l="firebasestorage.googleapis.com".replace(/[.]/g,"\\."),c=[{regex:n,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp("^https?://"+l+"/v[A-Za-z0-9_]+/b/([A-Za-z0-9.\\-_]+)/o(/([^?#]*).*)?$","i"),indices:{bucket:1,path:3},postModify:o},{regex:new RegExp("^https?://(?:storage.googleapis.com|storage.cloud.google.com)/([A-Za-z0-9.\\-_]+)/([^?#]*)","i"),indices:{bucket:1,path:2},postModify:o}],i=0;i<c.length;i++){var h=c[i],f=h.regex.exec(t);if(f){var _=f[h.indices.bucket],v=f[h.indices.path];v||(v=""),r=new e(_,v),h.postModify(r);break}}if(null==r)throw function(e){return new d(T,"Invalid URL '"+e+"'.")}(t);return r},e}();function xe(s){var e,p;try{e=JSON.parse(s)}catch(e){return null}return he(p=e)&&!Array.isArray(p)?e:null}function Ue(path,e){var t=e.split("/").filter((function(component){return component.length>0})).join("/");return 0===path.length?t:path+"/"+t}function Se(path){var e=path.lastIndexOf("/",path.length-2);return-1===e?path:path.slice(e+1)}function Ee(e){return"https://firebasestorage.googleapis.com/v0"+e}function Oe(e){var t=encodeURIComponent,r="?";for(var n in e){if(e.hasOwnProperty(n))r=r+(t(n)+"="+t(e[n]))+"&"}return r=r.slice(0,-1)}function Pe(e,t){return t}var Ae=function(e,t,r,n){this.server=e,this.local=t||e,this.writable=!!r,this.xform=n||Pe},Ce=null;function Me(){if(Ce)return Ce;var e=[];e.push(new Ae("bucket")),e.push(new Ae("generation")),e.push(new Ae("metageneration")),e.push(new Ae("name","fullPath",!0));var t=new Ae("name");t.xform=function(e,t){return function(e){return!de(e)||e.length<2?e:Se(e)}(t)},e.push(t);var r=new Ae("size");return r.xform=function(e,t){return le(t)?Number(t):t},e.push(r),e.push(new Ae("timeCreated")),e.push(new Ae("updated")),e.push(new Ae("md5Hash",null,!0)),e.push(new Ae("cacheControl",null,!0)),e.push(new Ae("contentDisposition",null,!0)),e.push(new Ae("contentEncoding",null,!0)),e.push(new Ae("contentLanguage",null,!0)),e.push(new Ae("contentType",null,!0)),e.push(new Ae("metadata","customMetadata",!0)),Ce=e}function We(e,t,r){for(var n={type:"file"},o=r.length,i=0;i<o;i++){var l=r[i];n[l.local]=l.xform(n,t[l.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){var r=e.bucket,path=e.fullPath,n=new Te(r,path);return t.makeStorageReference(n)}})}(n,e),n}function Le(e,t,r){var n=xe(t);return null===n?null:We(e,n,r)}function Ie(e,t){for(var r={},n=t.length,i=0;i<n;i++){var o=t[i];o.writable&&(r[o.server]=e[o.local])}return JSON.stringify(r)}function je(p){if(!he(p)||!p)throw"Expected Metadata object.";for(var e in p)if(p.hasOwnProperty(e)){var t=p[e];if("customMetadata"===e){if(!he(t))throw"Expected object for 'customMetadata' mapping."}else if(fe(t))throw"Mapping for '"+e+"' cannot be an object."}}function qe(e,t,r){var n=xe(r);return null===n?null:function(e,t,r){var n={prefixes:[],items:[],nextPageToken:r.nextPageToken};if(r.prefixes)for(var o=0,l=r.prefixes;o<l.length;o++){var c=l[o].replace(/\/$/,""),h=e.makeStorageReference(new Te(t,c));n.prefixes.push(h)}if(r.items)for(var f=0,d=r.items;f<d.length;f++){var _=d[f];h=e.makeStorageReference(new Te(t,_.name));n.items.push(h)}return n}(e,t,n)}function Be(p){if(!he(p)||!p)throw"Expected ListOptions object.";for(var e in p)if("maxResults"===e){if(!_e(p.maxResults)||p.maxResults<=0)throw"Expected maxResults to be a positive number.";if(p.maxResults>1e3)throw"Expected maxResults to be less than or equal to 1000."}else{if("pageToken"!==e)throw"Unknown option: "+e;if(p.pageToken&&!de(p.pageToken))throw"Expected pageToken to be string."}}var Ne=function(e,t,r,n){this.url=e,this.method=t,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]};function He(e){if(!e)throw I()}function ze(e,t){return function(r,text){var n=Le(e,text,t);return He(null!==n),n}}function De(e,t){return function(r,text){var n=Le(e,text,t);return He(null!==n),function(e,t){var r=xe(t);if(null===r)return null;if(!de(r.downloadTokens))return null;var n=r.downloadTokens;if(0===n.length)return null;var o=encodeURIComponent;return n.split(",").map((function(t){var r=e.bucket,path=e.fullPath;return Ee("/b/"+o(r)+"/o/"+o(path))+Oe({alt:"media",token:t})}))[0]}(n,text)}}function Fe(e){return function(t,r){var n,path,o;return 401===t.getStatus()?n=new d(y,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(o=e.bucket,n=new d(m,"Quota for bucket '"+o+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(path=e.path,n=new d(w,"User does not have permission to access '"+path+"'.")):n=r,n.setServerResponseProp(r.serverResponseProp()),n}}function Ge(e){var t=Fe(e);return function(r,n){var path,o=t(r,n);return 404===r.getStatus()&&(path=e.path,o=new d(v,"Object '"+path+"' does not exist.")),o.setServerResponseProp(n.serverResponseProp()),o}}function Xe(e,t,r){var n=Ee(t.fullServerUrl()),o=e.maxOperationRetryTime(),l=new Ne(n,"GET",ze(e,r),o);return l.errorHandler=Ge(t),l}function Ke(e,t,r,n,o){var l={};t.isRoot?l.prefix="":l.prefix=t.path+"/",r&&r.length>0&&(l.delimiter=r),n&&(l.pageToken=n),o&&(l.maxResults=o);var c=Ee(t.bucketOnlyServerUrl()),h=e.maxOperationRetryTime(),f=new Ne(c,"GET",function(e,t){return function(r,text){var n=qe(e,t,text);return He(null!==n),n}}(e,t.bucket),h);return f.urlParams=l,f.errorHandler=Fe(t),f}function Ze(e,t,r){var n=Ee(t.fullServerUrl()),o=e.maxOperationRetryTime(),l=new Ne(n,"GET",De(e,r),o);return l.errorHandler=Ge(t),l}function Je(e,t,r,n){var o=Ee(t.fullServerUrl()),body=Ie(r,n),l=e.maxOperationRetryTime(),c=new Ne(o,"PATCH",ze(e,n),l);return c.headers={"Content-Type":"application/json; charset=utf-8"},c.body=body,c.errorHandler=Ge(t),c}function Ve(e,t){var r=Ee(t.fullServerUrl()),n=e.maxOperationRetryTime();var o=new Ne(r,"DELETE",(function(e,t){}),n);return o.successCodes=[200,204],o.errorHandler=Ge(t),o}function $e(e,t,r){var n=Object.assign({},r);return n.fullPath=e.path,n.size=t.size(),n.contentType||(n.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),n}var Qe=function(e,t,r,n){this.current=e,this.total=t,this.finalized=!!r,this.metadata=n||null};function Ye(e,t){var r=null;try{r=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){He(!1)}return He(!!r&&-1!==(t||["active"]).indexOf(r)),r}function et(e,t,r,n,o,l,c,h){var f=new Qe(0,0);if(c?(f.current=c.current,f.total=c.total):(f.current=0,f.total=n.size()),n.size()!==f.total)throw new d(S,"Server recorded incorrect upload file size, please retry the upload.");var _=f.total-f.current,v=_;o>0&&(v=Math.min(v,o));var m=f.current,y=m+v,w={"X-Goog-Upload-Command":v===_?"upload, finalize":"upload","X-Goog-Upload-Offset":f.current},body=n.slice(m,y);if(null===body)throw B();var R=t.maxUploadRetryTime(),k=new Ne(r,"POST",(function(e,text){var r,o=Ye(e,["active","final"]),c=f.current+v,h=n.size();return r="final"===o?ze(t,l)(e,text):null,new Qe(c,h,"final"===o,r)}),R);return k.headers=w,k.body=body.uploadData(),k.progressCallback=h||null,k.errorHandler=Fe(e),k}var tt=function(e,t,r){if(pe(e)||le(t)||le(r))this.next=e,this.error=t||null,this.complete=r||null;else{var n=e;this.next=n.next||null,this.error=n.error||null,this.complete=n.complete||null}},nt=function(e,t,r,n,o,l){this.bytesTransferred=e,this.totalBytes=t,this.state=r,this.metadata=n,this.task=o,this.ref=l};function ot(e,t,r){for(var n=t.length,o=t.length,i=0;i<t.length;i++)if(t[i].optional){n=i;break}var l,c,h,f,_,v;if(!(n<=r.length&&r.length<=o))throw l=n,c=o,h=e,f=r.length,l===c?(_=l,v=1===l?"argument":"arguments"):(_="between "+l+" and "+c,v="arguments"),new d(P,"Invalid argument count in `"+h+"`: Expected "+_+" "+v+", received "+f+".");for(i=0;i<r.length;i++)try{t[i].validator(r[i])}catch(t){throw t instanceof Error?H(i,e,t.message):H(i,e,t)}}var it=function(e,t){var r=this;this.validator=function(p){r.optional&&!ce(p)||e(p)},this.optional=!!t};function at(e,t){function r(p){if(!de(p))throw"Expected string."}var n,o,l;return e?(o=r,l=e,n=function(p){o(p),l(p)}):n=r,new it(n,t)}function st(){return new it((function(p){if(!(p instanceof Uint8Array||p instanceof ArrayBuffer||ge()&&p instanceof Blob))throw"Expected Blob or File."}))}function ut(e){return new it(je,e)}function lt(e){return new it(Be,e)}function ct(){return new it((function(p){if(!(ve(p)&&p>=0))throw"Expected a number 0 or greater."}))}function pt(e,t){return new it((function(p){if(!(null===p||le(p)&&p instanceof Object))throw"Expected an Object.";null!=e&&e(p)}),t)}function ht(e){return new it((function(p){if(!(null===p||pe(p)))throw"Expected a Function."}),e)}function ft(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];Promise.resolve().then((function(){return e.apply(void 0,t)}))}}var _t=function(){function e(e,t,r,n,o,l){var c=this;void 0===l&&(l=null),this.transferred_=0,this.needToFetchStatus_=!1,this.needToFetchMetadata_=!1,this.observers_=[],this.error_=null,this.uploadUrl_=null,this.request_=null,this.chunkMultiplier_=1,this.resolve_=null,this.reject_=null,this.ref_=e,this.authWrapper_=t,this.location_=r,this.blob_=o,this.metadata_=l,this.mappings_=n,this.resumable_=this.shouldDoResumable_(this.blob_),this.state_=ee,this.errorHandler_=function(e){c.request_=null,c.chunkMultiplier_=1,e.codeEquals(k)?(c.needToFetchStatus_=!0,c.completeTransitions_()):(c.error_=e,c.transition_(ae))},this.metadataErrorHandler_=function(e){c.request_=null,e.codeEquals(k)?c.completeTransitions_():(c.error_=e,c.transition_(ae))},this.promise_=new Promise((function(e,t){c.resolve_=e,c.reject_=t,c.start_()})),this.promise_.then(null,(function(){}))}return e.prototype.makeProgressCallback_=function(){var e=this,t=this.transferred_;return function(r){return e.updateProgress_(t+r)}},e.prototype.shouldDoResumable_=function(e){return e.size()>262144},e.prototype.start_=function(){this.state_===ee&&null===this.request_&&(this.resumable_?null===this.uploadUrl_?this.createResumable_():this.needToFetchStatus_?this.fetchStatus_():this.needToFetchMetadata_?this.fetchMetadata_():this.continueUpload_():this.oneShotUpload_())},e.prototype.resolveToken_=function(e){var t=this;this.authWrapper_.getAuthToken().then((function(r){switch(t.state_){case ee:e(r);break;case oe:t.transition_(ie);break;case te:t.transition_(re)}}))},e.prototype.createResumable_=function(){var e=this;this.resolveToken_((function(t){var r=function(e,t,r,n,o){var l=t.bucketOnlyServerUrl(),c=$e(t,n,o),h={name:c.fullPath},f=Ee(l),d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":n.size(),"X-Goog-Upload-Header-Content-Type":c.contentType,"Content-Type":"application/json; charset=utf-8"},body=Ie(c,r),_=e.maxUploadRetryTime(),v=new Ne(f,"POST",(function(e){var t;Ye(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){He(!1)}return He(de(t)),t}),_);return v.urlParams=h,v.headers=d,v.body=body,v.errorHandler=Fe(t),v}(e.authWrapper_,e.location_,e.mappings_,e.blob_,e.metadata_),n=e.authWrapper_.makeRequest(r,t);e.request_=n,n.getPromise().then((function(t){e.request_=null,e.uploadUrl_=t,e.needToFetchStatus_=!1,e.completeTransitions_()}),e.errorHandler_)}))},e.prototype.fetchStatus_=function(){var e=this,t=this.uploadUrl_;this.resolveToken_((function(r){var n=function(e,t,r,n){var o=e.maxUploadRetryTime(),l=new Ne(r,"POST",(function(e){var t=Ye(e,["active","final"]),r=null;try{r=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){He(!1)}r||He(!1);var o=Number(r);return He(!isNaN(o)),new Qe(o,n.size(),"final"===t)}),o);return l.headers={"X-Goog-Upload-Command":"query"},l.errorHandler=Fe(t),l}(e.authWrapper_,e.location_,t,e.blob_),o=e.authWrapper_.makeRequest(n,r);e.request_=o,o.getPromise().then((function(t){t=t,e.request_=null,e.updateProgress_(t.current),e.needToFetchStatus_=!1,t.finalized&&(e.needToFetchMetadata_=!0),e.completeTransitions_()}),e.errorHandler_)}))},e.prototype.continueUpload_=function(){var e=this,t=262144*this.chunkMultiplier_,r=new Qe(this.transferred_,this.blob_.size()),n=this.uploadUrl_;this.resolveToken_((function(o){var l;try{l=et(e.location_,e.authWrapper_,n,e.blob_,t,e.mappings_,r,e.makeProgressCallback_())}catch(t){return e.error_=t,void e.transition_(ae)}var c=e.authWrapper_.makeRequest(l,o);e.request_=c,c.getPromise().then((function(t){e.increaseMultiplier_(),e.request_=null,e.updateProgress_(t.current),t.finalized?(e.metadata_=t.metadata,e.transition_(ne)):e.completeTransitions_()}),e.errorHandler_)}))},e.prototype.increaseMultiplier_=function(){262144*this.chunkMultiplier_<33554432&&(this.chunkMultiplier_*=2)},e.prototype.fetchMetadata_=function(){var e=this;this.resolveToken_((function(t){var r=Xe(e.authWrapper_,e.location_,e.mappings_),n=e.authWrapper_.makeRequest(r,t);e.request_=n,n.getPromise().then((function(t){e.request_=null,e.metadata_=t,e.transition_(ne)}),e.metadataErrorHandler_)}))},e.prototype.oneShotUpload_=function(){var e=this;this.resolveToken_((function(t){var r=function(e,t,r,n,o){var l=t.bucketOnlyServerUrl(),c={"X-Goog-Upload-Protocol":"multipart"},h=function(){for(var e="",i=0;i<2;i++)e+=Math.random().toString().slice(2);return e}();c["Content-Type"]="multipart/related; boundary="+h;var f=$e(t,n,o),d="--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+Ie(f,r)+"\r\n--"+h+"\r\nContent-Type: "+f.contentType+"\r\n\r\n",_="\r\n--"+h+"--",body=ke.getBlob(d,n,_);if(null===body)throw B();var v={name:f.fullPath},m=Ee(l),y=e.maxUploadRetryTime(),w=new Ne(m,"POST",ze(e,r),y);return w.urlParams=v,w.headers=c,w.body=body.uploadData(),w.errorHandler=Fe(t),w}(e.authWrapper_,e.location_,e.mappings_,e.blob_,e.metadata_),n=e.authWrapper_.makeRequest(r,t);e.request_=n,n.getPromise().then((function(t){e.request_=null,e.metadata_=t,e.updateProgress_(e.blob_.size()),e.transition_(ne)}),e.errorHandler_)}))},e.prototype.updateProgress_=function(e){var t=this.transferred_;this.transferred_=e,this.transferred_!==t&&this.notifyObservers_()},e.prototype.transition_=function(e){if(this.state_!==e)switch(e){case oe:case te:this.state_=e,null!==this.request_&&this.request_.cancel();break;case ee:var t=this.state_===re;this.state_=e,t&&(this.notifyObservers_(),this.start_());break;case re:this.state_=e,this.notifyObservers_();break;case ie:this.error_=j(),this.state_=e,this.notifyObservers_();break;case ae:case ne:this.state_=e,this.notifyObservers_()}},e.prototype.completeTransitions_=function(){switch(this.state_){case te:this.transition_(re);break;case oe:this.transition_(ie);break;case ee:this.start_()}},Object.defineProperty(e.prototype,"snapshot",{get:function(){var e=ue(this.state_);return new nt(this.transferred_,this.blob_.size(),e,this.metadata_,this,this.ref_)},enumerable:!0,configurable:!0}),e.prototype.on=function(e,t,r,n){function o(){if(e!==Y.STATE_CHANGED)throw"Expected one of the event types: ["+Y.STATE_CHANGED+"]."}var l="Expected a function or an Object with one of `next`, `error`, `complete` properties.",c=ht(!0).validator,h=pt(null,!0).validator;function f(p){try{return void c(p)}catch(e){}try{if(h(p),!(ce(p.next)||ce(p.error)||ce(p.complete)))throw"";return}catch(e){throw l}}var d=[at(o),pt(f,!0),ht(!0),ht(!0)];ot("on",d,arguments);var _=this;function v(e){return function(t,r,o){null!==e&&ot("on",e,arguments);var l=new tt(t,r,n);return _.addObserver_(l),function(){_.removeObserver_(l)}}}function m(p){if(null===p)throw l;f(p)}var y=[pt(m),ht(!0),ht(!0)],w=!(ce(t)||ce(r)||ce(n));return w?v(y):v(null)(t,r,n)},e.prototype.then=function(e,t){return this.promise_.then(e,t)},e.prototype.catch=function(e){return this.then(null,e)},e.prototype.addObserver_=function(e){this.observers_.push(e),this.notifyObserver_(e)},e.prototype.removeObserver_=function(e){var i=this.observers_.indexOf(e);-1!==i&&this.observers_.splice(i,1)},e.prototype.notifyObservers_=function(){var e=this;this.finishPromise_(),this.observers_.slice().forEach((function(t){e.notifyObserver_(t)}))},e.prototype.finishPromise_=function(){if(null!==this.resolve_){var e=!0;switch(ue(this.state_)){case se.SUCCESS:ft(this.resolve_.bind(null,this.snapshot))();break;case se.CANCELED:case se.ERROR:ft(this.reject_.bind(null,this.error_))();break;default:e=!1}e&&(this.resolve_=null,this.reject_=null)}},e.prototype.notifyObserver_=function(e){switch(ue(this.state_)){case se.RUNNING:case se.PAUSED:e.next&&ft(e.next.bind(e,this.snapshot))();break;case se.SUCCESS:e.complete&&ft(e.complete.bind(e))();break;case se.CANCELED:case se.ERROR:e.error&&ft(e.error.bind(e,this.error_))();break;default:e.error&&ft(e.error.bind(e,this.error_))()}},e.prototype.resume=function(){ot("resume",[],arguments);var e=this.state_===re||this.state_===te;return e&&this.transition_(ee),e},e.prototype.pause=function(){ot("pause",[],arguments);var e=this.state_===ee;return e&&this.transition_(te),e},e.prototype.cancel=function(){ot("cancel",[],arguments);var e=this.state_===ee||this.state_===te;return e&&this.transition_(oe),e},e}(),vt=function(){function e(e,t){this.authWrapper=e,this.location=t instanceof Te?t:Te.makeFromUrl(t)}return e.prototype.toString=function(){return ot("toString",[],arguments),"gs://"+this.location.bucket+"/"+this.location.path},e.prototype.newRef=function(t,r){return new e(t,r)},e.prototype.mappings=function(){return Me()},e.prototype.child=function(e){ot("child",[at()],arguments);var t=Ue(this.location.path,e),r=new Te(this.location.bucket,t);return this.newRef(this.authWrapper,r)},Object.defineProperty(e.prototype,"parent",{get:function(){var e=function(path){if(0===path.length)return null;var e=path.lastIndexOf("/");return-1===e?"":path.slice(0,e)}(this.location.path);if(null===e)return null;var t=new Te(this.location.bucket,e);return this.newRef(this.authWrapper,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"root",{get:function(){var e=new Te(this.location.bucket,"");return this.newRef(this.authWrapper,e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this.location.bucket},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this.location.path},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return Se(this.location.path)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"storage",{get:function(){return this.authWrapper.service()},enumerable:!0,configurable:!0}),e.prototype.put=function(data,e){return void 0===e&&(e=null),ot("put",[st(),ut(!0)],arguments),this.throwIfRoot_("put"),new _t(this,this.authWrapper,this.location,this.mappings(),new ke(data),e)},e.prototype.putString=function(e,t,r){void 0===t&&(t=G.RAW),ot("putString",[at(),at(X,!0),ut(!0)],arguments),this.throwIfRoot_("putString");var data=Z(t,e),n=Object.assign({},r);return!le(n.contentType)&&le(data.contentType)&&(n.contentType=data.contentType),new _t(this,this.authWrapper,this.location,this.mappings(),new ke(data.data,!0),n)},e.prototype.delete=function(){var e=this;return ot("delete",[],arguments),this.throwIfRoot_("delete"),this.authWrapper.getAuthToken().then((function(t){var r=Ve(e.authWrapper,e.location);return e.authWrapper.makeRequest(r,t).getPromise()}))},e.prototype.listAll=function(){ot("listAll",[],arguments);var e={prefixes:[],items:[]};return this.listAllHelper(e).then((function(){return e}))},e.prototype.listAllHelper=function(e,t){return l(this,void 0,void 0,(function(){var r,n,o,l;return c(this,(function(c){switch(c.label){case 0:return r={pageToken:t},[4,this.list(r)];case 1:return n=c.sent(),(o=e.prefixes).push.apply(o,n.prefixes),(l=e.items).push.apply(l,n.items),null==n.nextPageToken?[3,3]:[4,this.listAllHelper(e,n.nextPageToken)];case 2:c.sent(),c.label=3;case 3:return[2]}}))}))},e.prototype.list=function(e){ot("list",[lt(!0)],arguments);var t=this;return this.authWrapper.getAuthToken().then((function(r){var n=e||{},o=Ke(t.authWrapper,t.location,"/",n.pageToken,n.maxResults);return t.authWrapper.makeRequest(o,r).getPromise()}))},e.prototype.getMetadata=function(){var e=this;return ot("getMetadata",[],arguments),this.throwIfRoot_("getMetadata"),this.authWrapper.getAuthToken().then((function(t){var r=Xe(e.authWrapper,e.location,e.mappings());return e.authWrapper.makeRequest(r,t).getPromise()}))},e.prototype.updateMetadata=function(e){var t=this;return ot("updateMetadata",[ut()],arguments),this.throwIfRoot_("updateMetadata"),this.authWrapper.getAuthToken().then((function(r){var n=Je(t.authWrapper,t.location,e,t.mappings());return t.authWrapper.makeRequest(n,r).getPromise()}))},e.prototype.getDownloadURL=function(){var e=this;return ot("getDownloadURL",[],arguments),this.throwIfRoot_("getDownloadURL"),this.authWrapper.getAuthToken().then((function(t){var r=Ze(e.authWrapper,e.location,e.mappings());return e.authWrapper.makeRequest(r,t).getPromise().then((function(e){if(null===e)throw N();return e}))}))},e.prototype.throwIfRoot_=function(e){if(""===this.location.path)throw function(e){return new d(C,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)},e}(),mt=function(){function e(e){this.promise_=Promise.reject(e)}return e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){},e}(),gt=function(){function e(){this.map=new Map,this.id=-9007199254740991}return e.prototype.addRequest=function(e){var t=this,r=this.id;this.id++,this.map.set(r,e),e.getPromise().then((function(){return t.map.delete(r)}),(function(){return t.map.delete(r)}))},e.prototype.clear=function(){this.map.forEach((function(e){e&&e.cancel(!0)})),this.map.clear()},e}(),bt=function(){function e(t,r,n,o,l,c){var h;if(this.bucket_=null,this.appId_=null,this.deleted_=!1,this.app_=t,null!==this.app_){var f=this.app_.options;le(f)&&(this.bucket_=e.extractBucket_(f),this.appId_=null!==(h=f.appId)&&void 0!==h?h:null)}this.authProvider_=r,this.storageRefMaker_=n,this.requestMaker_=o,this.pool_=c,this.service_=l,this.maxOperationRetryTime_=12e4,this.maxUploadRetryTime_=6e5,this.requestMap_=new gt}return e.extractBucket_=function(e){var t=e.storageBucket||null;return null==t?null:Te.makeFromBucketSpec(t).bucket},e.prototype.getAuthToken=function(){var e=this.authProvider_.getImmediate({optional:!0});return e?e.getToken().then((function(e){return null!==e?e.accessToken:null}),(function(){return null})):Promise.resolve(null)},e.prototype.bucket=function(){if(this.deleted_)throw z();return this.bucket_},e.prototype.service=function(){return this.service_},e.prototype.makeStorageReference=function(e){return this.storageRefMaker_(this,e)},e.prototype.makeRequest=function(e,t){if(this.deleted_)return new mt(z());var r=this.requestMaker_(e,this.appId_,t,this.pool_);return this.requestMap_.addRequest(r),r},e.prototype.deleteApp=function(){this.deleted_=!0,this.app_=null,this.requestMap_.clear()},e.prototype.maxUploadRetryTime=function(){return this.maxUploadRetryTime_},e.prototype.setMaxUploadRetryTime=function(time){this.maxUploadRetryTime_=time},e.prototype.maxOperationRetryTime=function(){return this.maxOperationRetryTime_},e.prototype.setMaxOperationRetryTime=function(time){this.maxOperationRetryTime_=time},e}();var yt=function(){function e(e,t,r,body,n,o,l,c,h,f,d){var _=this;this.pendingXhr_=null,this.backoffId_=null,this.resolve_=null,this.reject_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=t,this.headers_=r,this.body_=body,this.successCodes_=n.slice(),this.additionalRetryCodes_=o.slice(),this.callback_=l,this.errorCallback_=c,this.progressCallback_=f,this.timeout_=h,this.pool_=d,this.promise_=new Promise((function(e,t){_.resolve_=e,_.reject_=t,_.start_()}))}return e.prototype.start_=function(){var e=this;function t(t,r){var n,o=e.resolve_,l=e.reject_,c=r.xhr;if(r.wasSuccessCode)try{var h=e.callback_(c,c.getResponseText());ce(h)?o(h):o()}catch(e){l(e)}else null!==c?((n=I()).setServerResponseProp(c.getResponseText()),e.errorCallback_?l(e.errorCallback_(c,n)):l(n)):r.canceled?l(n=e.appDelete_?z():j()):l(n=new d(R,"Max retry time for operation exceeded, please try again."))}this.canceled_?t(0,new wt(!1,null,!0)):this.backoffId_=function(e,t,r){var n=1,o=null,l=!1,c=0;function f(){return 2===c}var d=!1;function _(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];d||(d=!0,t.apply(null,e))}function v(t){o=setTimeout((function(){o=null,e(m,f())}),t)}function m(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(!d)if(e)_.call.apply(_,h([null,e],t));else{var o,m=f()||l;if(m)_.call.apply(_,h([null,e],t));else n<64&&(n*=2),1===c?(c=2,o=0):o=1e3*(n+Math.random()),v(o)}}var y=!1;function w(e){y||(y=!0,d||(null!==o?(e||(c=2),clearTimeout(o),v(0)):e||(c=1)))}return v(0),setTimeout((function(){l=!0,w(!0)}),r),w}((function(t,r){if(r)t(!1,new wt(!1,null,!0));else{var n=e.pool_.createXhrIo();e.pendingXhr_=n,null!==e.progressCallback_&&n.addUploadProgressListener(o),n.send(e.url_,e.method_,e.body_,e.headers_).then((function(r){null!==e.progressCallback_&&r.removeUploadProgressListener(o),e.pendingXhr_=null;var n=(r=r).getErrorCode()===Q.NO_ERROR,l=r.getStatus();if(n&&!e.isRetryStatusCode_(l)){var c=-1!==e.successCodes_.indexOf(l);t(!0,new wt(c,r))}else{var h=r.getErrorCode()===Q.ABORT;t(!1,new wt(!1,null,h))}}))}function o(t){var r=t.loaded,n=t.lengthComputable?t.total:-1;null!==e.progressCallback_&&e.progressCallback_(r,n)}}),t,this.timeout_)},e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingXhr_&&this.pendingXhr_.abort()},e.prototype.isRetryStatusCode_=function(e){var t=e>=500&&e<600,r=-1!==[408,429].indexOf(e),n=-1!==this.additionalRetryCodes_.indexOf(e);return t||r||n},e}(),wt=function(e,t,r){this.wasSuccessCode=e,this.xhr=t,this.canceled=!!r};function Rt(e,t,r,n){var l=Oe(e.urlParams),c=e.url+l,h=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(h,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(h,r),function(e){var t=void 0!==o.a?o.a.SDK_VERSION:"AppManager";e["X-Firebase-Storage-Version"]="webjs/"+t}(h),new yt(c,e.method,h,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,n)}var kt,Tt,xt=function(){function e(e,t,r,n){if(this.bucket_=null,this.authWrapper_=new bt(e,t,(function(e,t){return new vt(e,t)}),Rt,this,r),this.app_=e,null!=n)this.bucket_=Te.makeFromBucketSpec(n);else{var o=this.authWrapper_.bucket();null!=o&&(this.bucket_=new Te(o,""))}this.internals_=new Ut(this)}return e.prototype.ref=function(path){function e(path){if("string"!=typeof path)throw"Path is not a string.";if(/^[A-Za-z]+:\/\//.test(path))throw"Expected child path but got a URL, use refFromURL instead."}if(ot("ref",[at(e,!0)],arguments),null==this.bucket_)throw new Error("No Storage Bucket defined in Firebase Options.");var t=new vt(this.authWrapper_,this.bucket_);return null!=path?t.child(path):t},e.prototype.refFromURL=function(e){function t(p){if("string"!=typeof p)throw"Path is not a string.";if(!/^[A-Za-z]+:\/\//.test(p))throw"Expected full URL but got a child path, use ref instead.";try{Te.makeFromUrl(p)}catch(e){throw"Expected valid full URL but got an invalid one."}}return ot("refFromURL",[at(t,!1)],arguments),new vt(this.authWrapper_,e)},Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this.authWrapper_.maxUploadRetryTime()},enumerable:!0,configurable:!0}),e.prototype.setMaxUploadRetryTime=function(time){ot("setMaxUploadRetryTime",[ct()],arguments),this.authWrapper_.setMaxUploadRetryTime(time)},e.prototype.setMaxOperationRetryTime=function(time){ot("setMaxOperationRetryTime",[ct()],arguments),this.authWrapper_.setMaxOperationRetryTime(time)},Object.defineProperty(e.prototype,"app",{get:function(){return this.app_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"INTERNAL",{get:function(){return this.internals_},enumerable:!0,configurable:!0}),e}(),Ut=function(){function e(e){this.service_=e}return e.prototype.delete=function(){return this.service_.authWrapper_.deleteApp(),Promise.resolve()},e}();function St(e,t){var r=e.getProvider("app").getImmediate(),n=e.getProvider("auth-internal");return new xt(r,n,new ye,t)}kt=o.a,Tt={TaskState:se,TaskEvent:Y,StringFormat:G,Storage:xt,Reference:vt},kt.INTERNAL.registerComponent(new f.Component("storage",St,"PUBLIC").setServiceProps(Tt).setMultipleInstances(!0)),kt.registerVersion("@firebase/storage","0.3.35")}}]);