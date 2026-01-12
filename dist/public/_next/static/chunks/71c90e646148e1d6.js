(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,3177,e=>{"use strict";let t,r;var a,s=e.i(4974);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":a+="f"==i[1]?c(n,i):i+"{"+c(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=c(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=c.p?c.p(i,n):i+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+a},d={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function f(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let f=u(e),p=d[f]||(d[f]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(f));if(!d[p]){let t=f!==e?e:(e=>{let t,r,a=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);d[p]=c(s?{["@keyframes "+p]:t}:t,r?"":"."+p)}let m=r&&d.g?d.g:null;return r&&(d.g=d[p]),i=d[p],m?t.data=t.data.replace(m,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),p})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}f.bind({g:1});let p,m,g,h=f.bind({k:1});function y(e,t){let r=this||{};return function(){let a=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;r.p=Object.assign({theme:m&&m()},o),r.o=/ *go\d+/.test(l),o.className=f.apply(r,a)+(l?" "+l:""),t&&(o.ref=n);let c=e;return e[0]&&(c=o.as||e,delete o.as),g&&c[0]&&g(o),p(c,o)}return t?t(s):s}}var x=(e,t)=>"function"==typeof e?e(t):e,b=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},w="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},E=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},_=(e,t=w)=>{k[t]=j(k[t]||N,e),E.forEach(([e,r])=>{e===t&&r(k[t])})},S=e=>Object.keys(k).forEach(t=>_(e,t)),O=(e=w)=>t=>{_(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},C=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||b()}))(t,e,r);return O(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},R=(e,t)=>C("blank")(e,t);R.error=C("error"),R.success=C("success"),R.loading=C("loading"),R.custom=C("custom"),R.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):S(r)},R.dismissAll=e=>R.dismiss(void 0,e),R.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):S(r)},R.removeAll=e=>R.remove(void 0,e),R.promise=(e,t,r)=>{let a=R.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?x(t.success,e):void 0;return s?R.success(s,{id:a,...r,...null==r?void 0:r.success}):R.dismiss(a),e}).catch(e=>{let s=t.error?x(t.error,e):void 0;s?R.error(s,{id:a,...r,...null==r?void 0:r.error}):R.dismiss(a)}),e};var L=1e3,A=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,$=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${A} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${V} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,I=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,P=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,z=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,U=y("div")`
  position: absolute;
`,q=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,G=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(H,null,t):t:"blank"===r?null:s.createElement(q,null,s.createElement(M,{...a}),"loading"!==r&&s.createElement(U,null,"error"===r?s.createElement($,{...a}):s.createElement(z,{...a})))},B=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,J=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,K=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=s.createElement(G,{toast:e}),o=s.createElement(J,{...e.ariaProps},x(e.message,e));return s.createElement(B,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:n,message:o}):s.createElement(s.Fragment,null,n,o))});a=s.createElement,c.p=void 0,p=a,m=void 0,g=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let n=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:n,className:t,style:r},i)},Z=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Q=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=w)=>{let[r,a]=(0,s.useState)(k[t]||N),i=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(i.current!==k[t]&&a(k[t]),E.push([t,a]),()=>{let e=E.findIndex(([e])=>e===t);e>-1&&E.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,s.useRef)(new Map).current,n=(0,s.useCallback)((e,t=L)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&R.dismiss(r.id);return}return setTimeout(()=>R.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let o=(0,s.useCallback)(O(t),[t]),l=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),c=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),d=(0,s.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}})(r,n);return s.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let n,o,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(n=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return s.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?Z:"",style:u},"custom"===r.type?x(r.message,r):i?i(r):s.createElement(K,{toast:r,position:l}))}))};e.s(["Toaster",()=>Q,"toast",()=>R],3177)},55489,(e,t,r)=>{"use strict";var a=e.r(4974),s="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},i=a.useState,n=a.useEffect,o=a.useLayoutEffect,l=a.useDebugValue;function c(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!s(e,r)}catch(e){return!0}}var d="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),a=i({inst:{value:r,getSnapshot:t}}),s=a[0].inst,d=a[1];return o(function(){s.value=r,s.getSnapshot=t,c(s)&&d({inst:s})},[e,r,t]),n(function(){return c(s)&&d({inst:s}),e(function(){c(s)&&d({inst:s})})},[e]),l(r),r};r.useSyncExternalStore=void 0!==a.useSyncExternalStore?a.useSyncExternalStore:d},95869,(e,t,r)=>{"use strict";t.exports=e.r(55489)},54789,e=>{"use strict";let t;var r=e.i(4974),a=e.i(95869);e.s(["ERROR_REVALIDATE_EVENT",()=>3,"FOCUS_EVENT",()=>0,"MUTATE_EVENT",()=>2,"RECONNECT_EVENT",()=>1],3697);var s=Object.prototype.hasOwnProperty;let i=new WeakMap,n=()=>{},o=n(),l=Object,c=e=>e===o,d=(e,t)=>({...e,...t}),u={},f={},p="undefined",m=typeof window!=p,g=typeof document!=p,h=m&&"Deno"in window,y=(e,t)=>{let r=i.get(e);return[()=>!c(t)&&e.get(t)||u,a=>{if(!c(t)){let s=e.get(t);t in f||(f[t]=s),r[5](t,d(s,a),s||u)}},r[6],()=>!c(t)&&t in f?f[t]:!c(t)&&e.get(t)||u]},x=!0,[b,v]=m&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[n,n],w={initFocus:e=>(g&&document.addEventListener("visibilitychange",e),b("focus",e),()=>{g&&document.removeEventListener("visibilitychange",e),v("focus",e)}),initReconnect:e=>{let t=()=>{x=!0,e()},r=()=>{x=!1};return b("online",t),b("offline",r),()=>{v("online",t),v("offline",r)}}},j=!r.default.useId,E=!m||h,N=E?r.useEffect:r.useLayoutEffect,k="undefined"!=typeof navigator&&navigator.connection,_=!E&&k&&(["slow-2g","2g"].includes(k.effectiveType)||k.saveData),S=new WeakMap,O=(e,t)=>e===`[object ${t}]`,T=0,C=e=>{let t,r,a=typeof e,s=l.prototype.toString.call(e),i=O(s,"Date"),n=O(s,"RegExp"),o=O(s,"Object");if(l(e)!==e||i||n)t=i?e.toJSON():"symbol"==a?e.toString():"string"==a?JSON.stringify(e):""+e;else{if(t=S.get(e))return t;if(t=++T+"~",S.set(e,t),Array.isArray(e)){for(r=0,t="@";r<e.length;r++)t+=C(e[r])+",";S.set(e,t)}if(o){t="#";let a=l.keys(e).sort();for(;!c(r=a.pop());)c(e[r])||(t+=r+":"+C(e[r])+",");S.set(e,t)}}return t},R=e=>{if("function"==typeof e)try{e=e()}catch(t){e=""}let t=e;return[e="string"==typeof e?e:(Array.isArray(e)?e.length:e)?C(e):"",t]},L=0,A=()=>++L;async function D(...e){let[t,r,a,s]=e,n=d({populateCache:!0,throwOnError:!0},"boolean"==typeof s?{revalidate:s}:s||{}),l=n.populateCache,u=n.rollbackOnError,f=n.optimisticData,p=n.throwOnError;if("function"==typeof r){let e=[];for(let a of t.keys())!/^\$(inf|sub)\$/.test(a)&&r(t.get(a)._k)&&e.push(a);return Promise.all(e.map(m))}return m(r);async function m(r){let s,[d]=R(r);if(!d)return;let[m,g]=y(t,d),[h,x,b,v]=i.get(t),w=()=>{let e=h[d];return("function"==typeof n.revalidate?n.revalidate(m().data,r):!1!==n.revalidate)&&(delete b[d],delete v[d],e&&e[0])?e[0](2).then(()=>m().data):m().data};if(e.length<3)return w();let j=a,E=!1,N=A();x[d]=[N,0];let k=!c(f),_=m(),S=_.data,O=_._c,T=c(O)?S:O;if(k&&g({data:f="function"==typeof f?f(T,S):f,_c:T}),"function"==typeof j)try{j=j(T)}catch(e){s=e,E=!0}if(j&&"function"==typeof j.then){let e;if(j=await j.catch(e=>{s=e,E=!0}),N!==x[d][0]){if(E)throw s;return j}E&&k&&(e=s,"function"==typeof u?u(e):!1!==u)&&(l=!0,g({data:T,_c:o}))}if(l&&!E&&("function"==typeof l?g({data:l(j,T),error:o,_c:o}):g({data:j,error:o,_c:o})),x[d][1]=A(),Promise.resolve(w()).then(()=>{g({_c:o})}),E){if(p)throw s;return}return j}}let V=(e,t)=>{for(let r in e)e[r][0]&&e[r][0](t)},$=(e,t)=>{if(!i.has(e)){let r=d(w,t),a=Object.create(null),s=D.bind(o,e),l=n,c=Object.create(null),u=(e,t)=>{let r=c[e]||[];return c[e]=r,r.push(t),()=>r.splice(r.indexOf(t),1)},f=(t,r,a)=>{e.set(t,r);let s=c[t];if(s)for(let e of s)e(r,a)},p=()=>{if(!i.has(e)&&(i.set(e,[a,Object.create(null),Object.create(null),Object.create(null),s,f,u]),!E)){let t=r.initFocus(setTimeout.bind(o,V.bind(o,a,0))),s=r.initReconnect(setTimeout.bind(o,V.bind(o,a,1)));l=()=>{t&&t(),s&&s(),i.delete(e)}}};return p(),[e,s,p,l]}return[e,i.get(e)[4]]},[I,M]=$(new Map),P=d({onLoadingSlow:n,onSuccess:n,onError:n,onErrorRetry:(e,t,r,a,s)=>{let i=r.errorRetryCount,n=s.retryCount,o=~~((Math.random()+.5)*(1<<(n<8?n:8)))*r.errorRetryInterval;(c(i)||!(n>i))&&setTimeout(a,o,s)},onDiscarded:n,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:_?1e4:5e3,focusThrottleInterval:5e3,dedupingInterval:2e3,loadingTimeout:_?5e3:3e3,compare:function e(t,r){var a,i;if(t===r)return!0;if(t&&r&&(a=t.constructor)===r.constructor){if(a===Date)return t.getTime()===r.getTime();if(a===RegExp)return t.toString()===r.toString();if(a===Array){if((i=t.length)===r.length)for(;i--&&e(t[i],r[i]););return -1===i}if(!a||"object"==typeof t){for(a in i=0,t)if(s.call(t,a)&&++i&&!s.call(r,a)||!(a in r)||!e(t[a],r[a]))return!1;return Object.keys(r).length===i}}return t!=t&&r!=r},isPaused:()=>!1,cache:I,mutate:M,fallback:{}},{isOnline:()=>x,isVisible:()=>{let e=g&&document.visibilityState;return c(e)||"hidden"!==e}}),F=(e,t)=>{let r=d(e,t);if(t){let{use:a,fallback:s}=e,{use:i,fallback:n}=t;a&&i&&(r.use=a.concat(i)),s&&n&&(r.fallback=d(s,n))}return r},z=(0,r.createContext)({});var U=e.i(3697);let q=m&&window.__SWR_DEVTOOLS_USE__,W=(q?window.__SWR_DEVTOOLS_USE__:[]).concat(e=>(t,r,a)=>{let s=r&&((...e)=>{let[a]=R(t),[,,,s]=i.get(I);if(a.startsWith("$inf$"))return r(...e);let n=s[a];return c(n)?r(...e):(delete s[a],n)});return e(t,s,a)});q&&(window.__SWR_DEVTOOLS_REACT__=r.default);let H=()=>{},G=H(),B=(new WeakMap,r.default.use||(e=>{switch(e.status){case"pending":throw e;case"fulfilled":return e.value;case"rejected":throw e.reason;default:throw e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e}})),J={dedupe:!0},K=Promise.resolve(o);l.defineProperty(e=>{let{value:t}=e,a=(0,r.useContext)(z),s="function"==typeof t,i=(0,r.useMemo)(()=>s?t(a):t,[s,a,t]),n=(0,r.useMemo)(()=>s?i:F(a,i),[s,a,i]),l=i&&i.provider,c=(0,r.useRef)(o);l&&!c.current&&(c.current=$(l(n.cache||I),i));let u=c.current;return u&&(n.cache=u[0],n.mutate=u[1]),N(()=>{if(u)return u[2]&&u[2](),u[3]},[]),(0,r.createElement)(z.Provider,d(e,{value:n}))},"defaultValue",{value:P});let Y=(t=(e,t,s)=>{let{cache:l,compare:u,suspense:f,fallbackData:g,revalidateOnMount:h,revalidateIfStale:x,refreshInterval:b,refreshWhenHidden:v,refreshWhenOffline:w,keepPreviousData:k,strictServerPrefetchWarning:_}=s,[S,O,T,C]=i.get(l),[L,V]=R(e),$=(0,r.useRef)(!1),I=(0,r.useRef)(!1),M=(0,r.useRef)(L),P=(0,r.useRef)(t),F=(0,r.useRef)(s),z=()=>F.current.isVisible()&&F.current.isOnline(),[q,W,H,G]=y(l,L),Y=(0,r.useRef)({}).current,Z=c(g)?c(s.fallback)?o:s.fallback[L]:g,Q=(e,t)=>{for(let r in Y)if("data"===r){if(!u(e[r],t[r])&&(!c(e[r])||!u(eo,t[r])))return!1}else if(t[r]!==e[r])return!1;return!0},X=(0,r.useMemo)(()=>{let e=!!L&&!!t&&(c(h)?!F.current.isPaused()&&!f&&!1!==x:h),r=t=>{let r=d(t);return(delete r._k,e)?{isValidating:!0,isLoading:!0,...r}:r},a=q(),s=G(),i=r(a),n=a===s?i:r(s),o=i;return[()=>{let e=r(q());return Q(e,o)?(o.data=e.data,o.isLoading=e.isLoading,o.isValidating=e.isValidating,o.error=e.error,o):(o=e,e)},()=>n]},[l,L]),ee=(0,a.useSyncExternalStore)((0,r.useCallback)(e=>H(L,(t,r)=>{Q(r,t)||e()}),[l,L]),X[0],X[1]),et=!$.current,er=S[L]&&S[L].length>0,ea=ee.data,es=c(ea)?Z&&"function"==typeof Z.then?B(Z):Z:ea,ei=ee.error,en=(0,r.useRef)(es),eo=k?c(ea)?c(en.current)?es:en.current:ea:es,el=L&&c(es),ec=!E&&(0,a.useSyncExternalStore)(()=>n,()=>!1,()=>!0);_&&ec&&!f&&el&&console.warn(`Missing pre-initiated data for serialized key "${L}" during server-side rendering. Data fethcing should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);let ed=(!er||!!c(ei))&&(et&&!c(h)?h:!F.current.isPaused()&&(f?!c(es)&&x:c(es)||x)),eu=!!(L&&t&&et&&ed),ef=c(ee.isValidating)?eu:ee.isValidating,ep=c(ee.isLoading)?eu:ee.isLoading,em=(0,r.useCallback)(async e=>{let t,r,a=P.current;if(!L||!a||I.current||F.current.isPaused())return!1;let i=!0,n=e||{},l=!T[L]||!n.dedupe,d=()=>j?!I.current&&L===M.current&&$.current:L===M.current,f={isValidating:!1,isLoading:!1},p=()=>{W(f)},m=()=>{let e=T[L];e&&e[1]===r&&delete T[L]},g={isValidating:!0};c(q().data)&&(g.isLoading=!0);try{if(l&&(W(g),s.loadingTimeout&&c(q().data)&&setTimeout(()=>{i&&d()&&F.current.onLoadingSlow(L,s)},s.loadingTimeout),T[L]=[a(V),A()]),[t,r]=T[L],t=await t,l&&setTimeout(m,s.dedupingInterval),!T[L]||T[L][1]!==r)return l&&d()&&F.current.onDiscarded(L),!1;f.error=o;let e=O[L];if(!c(e)&&(r<=e[0]||r<=e[1]||0===e[1]))return p(),l&&d()&&F.current.onDiscarded(L),!1;let n=q().data;f.data=u(n,t)?n:t,l&&d()&&F.current.onSuccess(t,L,s)}catch(r){m();let e=F.current,{shouldRetryOnError:t}=e;!e.isPaused()&&(f.error=r,l&&d())&&(e.onError(r,L,e),(!0===t||"function"==typeof t&&t(r))&&(!F.current.revalidateOnFocus||!F.current.revalidateOnReconnect||z())&&e.onErrorRetry(r,L,e,e=>{let t=S[L];t&&t[0]&&t[0](U.ERROR_REVALIDATE_EVENT,e)},{retryCount:(n.retryCount||0)+1,dedupe:!0}))}return i=!1,p(),!0},[L,l]),eg=(0,r.useCallback)((...e)=>D(l,M.current,...e),[]);if(N(()=>{P.current=t,F.current=s,c(ea)||(en.current=ea)}),N(()=>{var e;let t;if(!L)return;let r=em.bind(o,J),a=0;F.current.revalidateOnFocus&&(a=Date.now()+F.current.focusThrottleInterval);let s=(e=(e,t={})=>{if(e==U.FOCUS_EVENT){let e=Date.now();F.current.revalidateOnFocus&&e>a&&z()&&(a=e+F.current.focusThrottleInterval,r())}else if(e==U.RECONNECT_EVENT)F.current.revalidateOnReconnect&&z()&&r();else if(e==U.MUTATE_EVENT)return em();else if(e==U.ERROR_REVALIDATE_EVENT)return em(t)},(t=S[L]||(S[L]=[])).push(e),()=>{let r=t.indexOf(e);r>=0&&(t[r]=t[t.length-1],t.pop())});if(I.current=!1,M.current=L,$.current=!0,W({_k:V}),ed&&!T[L])if(c(es)||E)r();else m&&typeof window.requestAnimationFrame!=p?window.requestAnimationFrame(r):setTimeout(r,1);return()=>{I.current=!0,s()}},[L]),N(()=>{let e;function t(){let t="function"==typeof b?b(q().data):b;t&&-1!==e&&(e=setTimeout(r,t))}function r(){!q().error&&(v||F.current.isVisible())&&(w||F.current.isOnline())?em(J).then(t):t()}return t(),()=>{e&&(clearTimeout(e),e=-1)}},[b,v,w,L]),(0,r.useDebugValue)(eo),f){if(!j&&E&&el)throw Error("Fallback data is required when using Suspense in SSR.");el&&(P.current=t,F.current=s,I.current=!1);let e=C[L];if(B(!c(e)&&el?eg(e):K),!c(ei)&&el)throw ei;let r=el?em(J):K;!c(eo)&&el&&(r.status="fulfilled",r.value=!0),B(r)}return{mutate:eg,get data(){return Y.data=!0,eo},get error(){return Y.error=!0,ei},get isValidating(){return Y.isValidating=!0,ef},get isLoading(){return Y.isLoading=!0,ep}}},function(...e){let a,s=(a=(0,r.useContext)(z),(0,r.useMemo)(()=>d(P,a),[a])),[i,n,o]="function"==typeof e[1]?[e[0],e[1],e[2]||{}]:[e[0],null,(null===e[1]?e[2]:e[1])||{}],l=F(s,o),c=t,{use:u}=l,f=(u||[]).concat(W);for(let e=f.length;e--;)c=f[e](c);return c(i,n||l.fetcher||null,l)});e.s(["default",()=>Y],54789)},39867,e=>{"use strict";let t=(0,e.i(96472).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",()=>t],39867)},24031,e=>{"use strict";e.i(26401);var t=e.i(8452),r=e.i(4974),a=e.i(54789),s=e.i(94511),i=e.i(3177),n=e.i(96472);let o=(0,n.default)("user-plus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]),l=(0,n.default)("refresh-ccw",[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]]);var c=e.i(39867);let d=e=>s.default.get(e).then(e=>e.data);e.s(["default",0,()=>{let e="https://aqua-rabbit-826508.hostingersite.com",{data:n,error:u,mutate:f}=(0,a.default)(`${e}/api/guests`,d,{refreshInterval:5e3}),[p,m]=(0,r.useState)(""),[g,h]=(0,r.useState)(!1),[y,x]=(0,r.useState)({name:"",ticket_code:"",seat_location:"",company:"",status:"active"}),b=n?.data||[],v=n?.stats||{total:0,checkedIn:0,pending:0},w=b.filter(e=>e.name.toLowerCase().includes(p.toLowerCase())||e.ticket_code.toLowerCase().includes(p.toLowerCase())),j=async()=>{try{await s.default.post(`${e}/api/guests`,{...y,event_id:"654321"}),x({name:"",ticket_code:"",company:"",seat_location:"",status:"active"}),h(!1),f(),i.toast.success("Guest added")}catch(e){i.toast.error("Failed to add guest")}},E=async t=>{try{await s.default.post(`${e}/api/guests/${t}/reset`),f(),i.toast.success("Check-in reset")}catch(e){i.toast.error("Failed to reset")}};return u?(0,t.jsx)("div",{className:"text-red-500 p-8",children:"Failed to load data"}):n?(0,t.jsxs)("div",{className:"min-h-screen bg-gray-50 text-gray-900 font-sans",children:[(0,t.jsx)(i.Toaster,{}),(0,t.jsxs)("nav",{className:"bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold",children:"A"}),(0,t.jsx)("span",{className:"font-semibold text-lg",children:"EMS Admin"})]}),(0,t.jsxs)("button",{onClick:()=>h(!g),className:"bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm",children:[(0,t.jsx)(o,{className:"w-4 h-4"})," Add Guest"]})]}),(0,t.jsxs)("main",{className:"max-w-7xl mx-auto p-8",children:[(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",children:[(0,t.jsxs)("div",{className:"bg-white p-6 rounded-xl border border-gray-100 shadow-sm",children:[(0,t.jsx)("p",{className:"text-gray-500 text-sm font-medium uppercase",children:"Total Guests"}),(0,t.jsx)("p",{className:"text-4xl font-bold mt-2",children:v.total})]}),(0,t.jsxs)("div",{className:"bg-white p-6 rounded-xl border border-gray-100 shadow-sm",children:[(0,t.jsx)("p",{className:"text-green-600 text-sm font-medium uppercase",children:"Checked In"}),(0,t.jsx)("p",{className:"text-4xl font-bold mt-2 text-green-700",children:v.checkedIn})]}),(0,t.jsxs)("div",{className:"bg-white p-6 rounded-xl border border-gray-100 shadow-sm",children:[(0,t.jsx)("p",{className:"text-orange-500 text-sm font-medium uppercase",children:"Pending"}),(0,t.jsx)("p",{className:"text-4xl font-bold mt-2 text-orange-600",children:v.pending})]})]}),g&&(0,t.jsx)("div",{className:"bg-white p-6 rounded-xl border border-indigo-100 shadow-lg mb-8 animate-in slide-in-from-top-4",children:(0,t.jsxs)("form",{onSubmit:j,className:"grid grid-cols-1 md:grid-cols-4 gap-4 items-end",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold uppercase text-gray-500 mb-1",children:"Name"}),(0,t.jsx)("input",{className:"w-full border rounded-lg p-2",value:y.name,onChange:e=>x({...y,name:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold uppercase text-gray-500 mb-1",children:"Ticket Code"}),(0,t.jsx)("input",{className:"w-full border rounded-lg p-2",value:y.ticket_code,onChange:e=>x({...y,ticket_code:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold uppercase text-gray-500 mb-1",children:"Seat"}),(0,t.jsx)("input",{className:"w-full border rounded-lg p-2",value:y.seat_location,onChange:e=>x({...y,seat_location:e.target.value})})]}),(0,t.jsx)("button",{type:"submit",className:"bg-gray-900 text-white p-2 rounded-lg hover:bg-black font-medium",children:"Save Guest"})]})}),(0,t.jsx)("div",{className:"flex gap-4 mb-6",children:(0,t.jsxs)("div",{className:"relative flex-1",children:[(0,t.jsx)(c.Search,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}),(0,t.jsx)("input",{type:"text",placeholder:"Search guests...",className:"w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",value:p,onChange:e=>m(e.target.value)})]})}),(0,t.jsx)("div",{className:"bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",children:(0,t.jsxs)("table",{className:"w-full text-left",children:[(0,t.jsx)("thead",{className:"bg-gray-50 border-b border-gray-100",children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{className:"px-6 py-4 text-xs font-semibold text-gray-500 uppercase",children:"Guest"}),(0,t.jsx)("th",{className:"px-6 py-4 text-xs font-semibold text-gray-500 uppercase",children:"Ticket"}),(0,t.jsx)("th",{className:"px-6 py-4 text-xs font-semibold text-gray-500 uppercase",children:"Seat"}),(0,t.jsx)("th",{className:"px-6 py-4 text-xs font-semibold text-gray-500 uppercase",children:"Status"}),(0,t.jsx)("th",{className:"px-6 py-4 text-end text-xs font-semibold text-gray-500 uppercase",children:"Actions"})]})}),(0,t.jsxs)("tbody",{className:"divide-y divide-gray-100",children:[w.map(e=>(0,t.jsxs)("tr",{className:"hover:bg-gray-50/50",children:[(0,t.jsxs)("td",{className:"px-6 py-4",children:[(0,t.jsx)("div",{className:"font-medium text-gray-900",children:e.name}),(0,t.jsx)("div",{className:"text-xs text-gray-500",children:e.company})]}),(0,t.jsx)("td",{className:"px-6 py-4 font-mono text-sm text-gray-600",children:e.ticket_code}),(0,t.jsx)("td",{className:"px-6 py-4 text-sm",children:e.seat_location||"-"}),(0,t.jsx)("td",{className:"px-6 py-4",children:(0,t.jsx)("span",{className:`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${"checked_in"===e.checkin_status?"bg-green-100 text-green-800":"bg-gray-100 text-gray-800"}`,children:e.checkin_status})}),(0,t.jsx)("td",{className:"px-6 py-4 text-end",children:(0,t.jsx)("button",{onClick:()=>E(e._id),className:"text-gray-400 hover:text-red-600 p-1 rounded transition-colors",title:"Reset Check-in",children:(0,t.jsx)(l,{className:"w-4 h-4"})})})]},e._id)),0===w.length&&(0,t.jsx)("tr",{children:(0,t.jsx)("td",{colSpan:5,className:"px-6 py-8 text-center text-gray-400",children:"No guests found"})})]})]})})]})]}):(0,t.jsx)("div",{className:"text-white p-8",children:"Loading dashboard..."})}],24031)}]);