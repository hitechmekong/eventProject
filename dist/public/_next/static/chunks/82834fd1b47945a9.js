(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,81740,e=>{"use strict";let t=(0,e.i(96472).default)("qr-code",[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1",key:"1tu5fj"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1",key:"1v8r4q"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1",key:"1x03jg"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3",key:"177gqh"}],["path",{d:"M21 21v.01",key:"ents32"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7",key:"8crl2c"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M12 3h.01",key:"n36tog"}],["path",{d:"M12 16v.01",key:"133mhm"}],["path",{d:"M16 12h1",key:"1slzba"}],["path",{d:"M21 12v.01",key:"1lwtk9"}],["path",{d:"M12 21v-1",key:"1880an"}]]);e.s(["QrCode",()=>t],81740)},3177,e=>{"use strict";let t,r;var a,n=e.i(4974);let i={data:""},s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",n="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?c(s,i):i+"{"+c(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=c(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=c.p?c.p(i,s):i+":"+s+";")}return r+(t&&n?t+"{"+n+"}":n)+a},d={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function f(e){let t,r,a=this||{},n=e.call?e(a.p):e;return((e,t,r,a,n)=>{var i;let f=u(e),m=d[f]||(d[f]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(f));if(!d[m]){let t=f!==e?e:(e=>{let t,r,a=[{}];for(;t=s.exec(e.replace(o,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);d[m]=c(n?{["@keyframes "+m]:t}:t,r?"":"."+m)}let p=r&&d.g?d.g:null;return r&&(d.g=d[m]),i=d[m],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(n.unshift?n.raw?(t=[].slice.call(arguments,1),r=a.p,n.reduce((e,a,n)=>{let i=t[n];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):n.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):n,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}f.bind({g:1});let m,p,h,g=f.bind({k:1});function y(e,t){let r=this||{};return function(){let a=arguments;function n(i,s){let o=Object.assign({},i),l=o.className||n.className;r.p=Object.assign({theme:p&&p()},o),r.o=/ *go\d+/.test(l),o.className=f.apply(r,a)+(l?" "+l:""),t&&(o.ref=s);let c=e;return e[0]&&(c=o.as||e,delete o.as),h&&c[0]&&h(o),m(c,o)}return t?t(n):n}}var x=(e,t)=>"function"==typeof e?e(t):e,b=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},w="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:n}=t;return{...e,toasts:e.toasts.map(e=>e.id===n||void 0===n?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},k=[],E={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},N={},_=(e,t=w)=>{N[t]=j(N[t]||E,e),k.forEach(([e,r])=>{e===t&&r(N[t])})},T=e=>Object.keys(N).forEach(t=>_(e,t)),C=(e=w)=>t=>{_(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let a,n=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||b()}))(t,e,r);return C(n.toasterId||(a=n.id,Object.keys(N).find(e=>N[e].toasts.some(e=>e.id===a))))({type:2,toast:n}),n.id},R=(e,t)=>O("blank")(e,t);R.error=O("error"),R.success=O("success"),R.loading=O("loading"),R.custom=O("custom"),R.dismiss=(e,t)=>{let r={type:3,toastId:e};t?C(t)(r):T(r)},R.dismissAll=e=>R.dismiss(void 0,e),R.remove=(e,t)=>{let r={type:4,toastId:e};t?C(t)(r):T(r)},R.removeAll=e=>R.remove(void 0,e),R.promise=(e,t,r)=>{let a=R.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let n=t.success?x(t.success,e):void 0;return n?R.success(n,{id:a,...r,...null==r?void 0:r.success}):R.dismiss(a),e}).catch(e=>{let n=t.error?x(t.error,e):void 0;n?R.error(n,{id:a,...r,...null==r?void 0:r.error}):R.dismiss(a)}),e};var M=1e3,D=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,V=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,$=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,A=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${V} 0.15s ease-out forwards;
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
    animation: ${$} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,L=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,I=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,P=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,z=g`
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
}`,q=y("div")`
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
    animation: ${z} 0.2s ease-out forwards;
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
`,F=y("div")`
  position: absolute;
`,U=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=g`
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
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(H,null,t):t:"blank"===r?null:n.createElement(U,null,n.createElement(I,{...a}),"loading"!==r&&n.createElement(F,null,"error"===r?n.createElement(A,{...a}):n.createElement(q,{...a})))},Q=y("div")`
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
`,K=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,J=n.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,n]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},s=n.createElement(W,{toast:e}),o=n.createElement(K,{...e.ariaProps},x(e.message,e));return n.createElement(Q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:s,message:o}):n.createElement(n.Fragment,null,s,o))});a=n.createElement,c.p=void 0,m=a,p=void 0,h=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let s=n.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return n.createElement("div",{ref:s,className:t,style:r},i)},Z=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,G=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:s,containerStyle:o,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=w)=>{let[r,a]=(0,n.useState)(N[t]||E),i=(0,n.useRef)(N[t]);(0,n.useEffect)(()=>(i.current!==N[t]&&a(N[t]),k.push([t,a]),()=>{let e=k.findIndex(([e])=>e===t);e>-1&&k.splice(e,1)}),[t]);let s=r.toasts.map(t=>{var r,a,n;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(n=e[t.type])?void 0:n.style,...t.style}}});return{...r,toasts:s}})(e,t),i=(0,n.useRef)(new Map).current,s=(0,n.useCallback)((e,t=M)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,n.useEffect)(()=>{if(a)return;let e=Date.now(),n=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&R.dismiss(r.id);return}return setTimeout(()=>R.dismiss(r.id,t),a)});return()=>{n.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let o=(0,n.useCallback)(C(t),[t]),l=(0,n.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),c=(0,n.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),d=(0,n.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:n=8,defaultPosition:i}=t||{},s=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<o&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+n,0)},[r]);return(0,n.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}})(r,s);return n.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let s,o,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(s=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...o});return n.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?Z:"",style:u},"custom"===r.type?x(r.message,r):i?i(r):n.createElement(J,{toast:r,position:l}))}))};e.s(["Toaster",()=>G,"toast",()=>R],3177)},55489,(e,t,r)=>{"use strict";var a=e.r(4974),n="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},i=a.useState,s=a.useEffect,o=a.useLayoutEffect,l=a.useDebugValue;function c(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!n(e,r)}catch(e){return!0}}var d="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),a=i({inst:{value:r,getSnapshot:t}}),n=a[0].inst,d=a[1];return o(function(){n.value=r,n.getSnapshot=t,c(n)&&d({inst:n})},[e,r,t]),s(function(){return c(n)&&d({inst:n}),e(function(){c(n)&&d({inst:n})})},[e]),l(r),r};r.useSyncExternalStore=void 0!==a.useSyncExternalStore?a.useSyncExternalStore:d},95869,(e,t,r)=>{"use strict";t.exports=e.r(55489)},54789,e=>{"use strict";let t;var r=e.i(4974),a=e.i(95869);e.s(["ERROR_REVALIDATE_EVENT",()=>3,"FOCUS_EVENT",()=>0,"MUTATE_EVENT",()=>2,"RECONNECT_EVENT",()=>1],3697);var n=Object.prototype.hasOwnProperty;let i=new WeakMap,s=()=>{},o=s(),l=Object,c=e=>e===o,d=(e,t)=>({...e,...t}),u={},f={},m="undefined",p=typeof window!=m,h=typeof document!=m,g=p&&"Deno"in window,y=(e,t)=>{let r=i.get(e);return[()=>!c(t)&&e.get(t)||u,a=>{if(!c(t)){let n=e.get(t);t in f||(f[t]=n),r[5](t,d(n,a),n||u)}},r[6],()=>!c(t)&&t in f?f[t]:!c(t)&&e.get(t)||u]},x=!0,[b,v]=p&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[s,s],w={initFocus:e=>(h&&document.addEventListener("visibilitychange",e),b("focus",e),()=>{h&&document.removeEventListener("visibilitychange",e),v("focus",e)}),initReconnect:e=>{let t=()=>{x=!0,e()},r=()=>{x=!1};return b("online",t),b("offline",r),()=>{v("online",t),v("offline",r)}}},j=!r.default.useId,k=!p||g,E=k?r.useEffect:r.useLayoutEffect,N="undefined"!=typeof navigator&&navigator.connection,_=!k&&N&&(["slow-2g","2g"].includes(N.effectiveType)||N.saveData),T=new WeakMap,C=(e,t)=>e===`[object ${t}]`,S=0,O=e=>{let t,r,a=typeof e,n=l.prototype.toString.call(e),i=C(n,"Date"),s=C(n,"RegExp"),o=C(n,"Object");if(l(e)!==e||i||s)t=i?e.toJSON():"symbol"==a?e.toString():"string"==a?JSON.stringify(e):""+e;else{if(t=T.get(e))return t;if(t=++S+"~",T.set(e,t),Array.isArray(e)){for(r=0,t="@";r<e.length;r++)t+=O(e[r])+",";T.set(e,t)}if(o){t="#";let a=l.keys(e).sort();for(;!c(r=a.pop());)c(e[r])||(t+=r+":"+O(e[r])+",");T.set(e,t)}}return t},R=e=>{if("function"==typeof e)try{e=e()}catch(t){e=""}let t=e;return[e="string"==typeof e?e:(Array.isArray(e)?e.length:e)?O(e):"",t]},M=0,D=()=>++M;async function V(...e){let[t,r,a,n]=e,s=d({populateCache:!0,throwOnError:!0},"boolean"==typeof n?{revalidate:n}:n||{}),l=s.populateCache,u=s.rollbackOnError,f=s.optimisticData,m=s.throwOnError;if("function"==typeof r){let e=[];for(let a of t.keys())!/^\$(inf|sub)\$/.test(a)&&r(t.get(a)._k)&&e.push(a);return Promise.all(e.map(p))}return p(r);async function p(r){let n,[d]=R(r);if(!d)return;let[p,h]=y(t,d),[g,x,b,v]=i.get(t),w=()=>{let e=g[d];return("function"==typeof s.revalidate?s.revalidate(p().data,r):!1!==s.revalidate)&&(delete b[d],delete v[d],e&&e[0])?e[0](2).then(()=>p().data):p().data};if(e.length<3)return w();let j=a,k=!1,E=D();x[d]=[E,0];let N=!c(f),_=p(),T=_.data,C=_._c,S=c(C)?T:C;if(N&&h({data:f="function"==typeof f?f(S,T):f,_c:S}),"function"==typeof j)try{j=j(S)}catch(e){n=e,k=!0}if(j&&"function"==typeof j.then){let e;if(j=await j.catch(e=>{n=e,k=!0}),E!==x[d][0]){if(k)throw n;return j}k&&N&&(e=n,"function"==typeof u?u(e):!1!==u)&&(l=!0,h({data:S,_c:o}))}if(l&&!k&&("function"==typeof l?h({data:l(j,S),error:o,_c:o}):h({data:j,error:o,_c:o})),x[d][1]=D(),Promise.resolve(w()).then(()=>{h({_c:o})}),k){if(m)throw n;return}return j}}let $=(e,t)=>{for(let r in e)e[r][0]&&e[r][0](t)},A=(e,t)=>{if(!i.has(e)){let r=d(w,t),a=Object.create(null),n=V.bind(o,e),l=s,c=Object.create(null),u=(e,t)=>{let r=c[e]||[];return c[e]=r,r.push(t),()=>r.splice(r.indexOf(t),1)},f=(t,r,a)=>{e.set(t,r);let n=c[t];if(n)for(let e of n)e(r,a)},m=()=>{if(!i.has(e)&&(i.set(e,[a,Object.create(null),Object.create(null),Object.create(null),n,f,u]),!k)){let t=r.initFocus(setTimeout.bind(o,$.bind(o,a,0))),n=r.initReconnect(setTimeout.bind(o,$.bind(o,a,1)));l=()=>{t&&t(),n&&n(),i.delete(e)}}};return m(),[e,n,m,l]}return[e,i.get(e)[4]]},[L,I]=A(new Map),P=d({onLoadingSlow:s,onSuccess:s,onError:s,onErrorRetry:(e,t,r,a,n)=>{let i=r.errorRetryCount,s=n.retryCount,o=~~((Math.random()+.5)*(1<<(s<8?s:8)))*r.errorRetryInterval;(c(i)||!(s>i))&&setTimeout(a,o,n)},onDiscarded:s,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:_?1e4:5e3,focusThrottleInterval:5e3,dedupingInterval:2e3,loadingTimeout:_?5e3:3e3,compare:function e(t,r){var a,i;if(t===r)return!0;if(t&&r&&(a=t.constructor)===r.constructor){if(a===Date)return t.getTime()===r.getTime();if(a===RegExp)return t.toString()===r.toString();if(a===Array){if((i=t.length)===r.length)for(;i--&&e(t[i],r[i]););return -1===i}if(!a||"object"==typeof t){for(a in i=0,t)if(n.call(t,a)&&++i&&!n.call(r,a)||!(a in r)||!e(t[a],r[a]))return!1;return Object.keys(r).length===i}}return t!=t&&r!=r},isPaused:()=>!1,cache:L,mutate:I,fallback:{}},{isOnline:()=>x,isVisible:()=>{let e=h&&document.visibilityState;return c(e)||"hidden"!==e}}),z=(e,t)=>{let r=d(e,t);if(t){let{use:a,fallback:n}=e,{use:i,fallback:s}=t;a&&i&&(r.use=a.concat(i)),n&&s&&(r.fallback=d(n,s))}return r},q=(0,r.createContext)({});var F=e.i(3697);let U=p&&window.__SWR_DEVTOOLS_USE__,B=(U?window.__SWR_DEVTOOLS_USE__:[]).concat(e=>(t,r,a)=>{let n=r&&((...e)=>{let[a]=R(t),[,,,n]=i.get(L);if(a.startsWith("$inf$"))return r(...e);let s=n[a];return c(s)?r(...e):(delete n[a],s)});return e(t,n,a)});U&&(window.__SWR_DEVTOOLS_REACT__=r.default);let H=()=>{},W=H(),Q=(new WeakMap,r.default.use||(e=>{switch(e.status){case"pending":throw e;case"fulfilled":return e.value;case"rejected":throw e.reason;default:throw e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e}})),K={dedupe:!0},J=Promise.resolve(o);l.defineProperty(e=>{let{value:t}=e,a=(0,r.useContext)(q),n="function"==typeof t,i=(0,r.useMemo)(()=>n?t(a):t,[n,a,t]),s=(0,r.useMemo)(()=>n?i:z(a,i),[n,a,i]),l=i&&i.provider,c=(0,r.useRef)(o);l&&!c.current&&(c.current=A(l(s.cache||L),i));let u=c.current;return u&&(s.cache=u[0],s.mutate=u[1]),E(()=>{if(u)return u[2]&&u[2](),u[3]},[]),(0,r.createElement)(q.Provider,d(e,{value:s}))},"defaultValue",{value:P});let Y=(t=(e,t,n)=>{let{cache:l,compare:u,suspense:f,fallbackData:h,revalidateOnMount:g,revalidateIfStale:x,refreshInterval:b,refreshWhenHidden:v,refreshWhenOffline:w,keepPreviousData:N,strictServerPrefetchWarning:_}=n,[T,C,S,O]=i.get(l),[M,$]=R(e),A=(0,r.useRef)(!1),L=(0,r.useRef)(!1),I=(0,r.useRef)(M),P=(0,r.useRef)(t),z=(0,r.useRef)(n),q=()=>z.current.isVisible()&&z.current.isOnline(),[U,B,H,W]=y(l,M),Y=(0,r.useRef)({}).current,Z=c(h)?c(n.fallback)?o:n.fallback[M]:h,G=(e,t)=>{for(let r in Y)if("data"===r){if(!u(e[r],t[r])&&(!c(e[r])||!u(eo,t[r])))return!1}else if(t[r]!==e[r])return!1;return!0},X=(0,r.useMemo)(()=>{let e=!!M&&!!t&&(c(g)?!z.current.isPaused()&&!f&&!1!==x:g),r=t=>{let r=d(t);return(delete r._k,e)?{isValidating:!0,isLoading:!0,...r}:r},a=U(),n=W(),i=r(a),s=a===n?i:r(n),o=i;return[()=>{let e=r(U());return G(e,o)?(o.data=e.data,o.isLoading=e.isLoading,o.isValidating=e.isValidating,o.error=e.error,o):(o=e,e)},()=>s]},[l,M]),ee=(0,a.useSyncExternalStore)((0,r.useCallback)(e=>H(M,(t,r)=>{G(r,t)||e()}),[l,M]),X[0],X[1]),et=!A.current,er=T[M]&&T[M].length>0,ea=ee.data,en=c(ea)?Z&&"function"==typeof Z.then?Q(Z):Z:ea,ei=ee.error,es=(0,r.useRef)(en),eo=N?c(ea)?c(es.current)?en:es.current:ea:en,el=M&&c(en),ec=!k&&(0,a.useSyncExternalStore)(()=>s,()=>!1,()=>!0);_&&ec&&!f&&el&&console.warn(`Missing pre-initiated data for serialized key "${M}" during server-side rendering. Data fethcing should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);let ed=(!er||!!c(ei))&&(et&&!c(g)?g:!z.current.isPaused()&&(f?!c(en)&&x:c(en)||x)),eu=!!(M&&t&&et&&ed),ef=c(ee.isValidating)?eu:ee.isValidating,em=c(ee.isLoading)?eu:ee.isLoading,ep=(0,r.useCallback)(async e=>{let t,r,a=P.current;if(!M||!a||L.current||z.current.isPaused())return!1;let i=!0,s=e||{},l=!S[M]||!s.dedupe,d=()=>j?!L.current&&M===I.current&&A.current:M===I.current,f={isValidating:!1,isLoading:!1},m=()=>{B(f)},p=()=>{let e=S[M];e&&e[1]===r&&delete S[M]},h={isValidating:!0};c(U().data)&&(h.isLoading=!0);try{if(l&&(B(h),n.loadingTimeout&&c(U().data)&&setTimeout(()=>{i&&d()&&z.current.onLoadingSlow(M,n)},n.loadingTimeout),S[M]=[a($),D()]),[t,r]=S[M],t=await t,l&&setTimeout(p,n.dedupingInterval),!S[M]||S[M][1]!==r)return l&&d()&&z.current.onDiscarded(M),!1;f.error=o;let e=C[M];if(!c(e)&&(r<=e[0]||r<=e[1]||0===e[1]))return m(),l&&d()&&z.current.onDiscarded(M),!1;let s=U().data;f.data=u(s,t)?s:t,l&&d()&&z.current.onSuccess(t,M,n)}catch(r){p();let e=z.current,{shouldRetryOnError:t}=e;!e.isPaused()&&(f.error=r,l&&d())&&(e.onError(r,M,e),(!0===t||"function"==typeof t&&t(r))&&(!z.current.revalidateOnFocus||!z.current.revalidateOnReconnect||q())&&e.onErrorRetry(r,M,e,e=>{let t=T[M];t&&t[0]&&t[0](F.ERROR_REVALIDATE_EVENT,e)},{retryCount:(s.retryCount||0)+1,dedupe:!0}))}return i=!1,m(),!0},[M,l]),eh=(0,r.useCallback)((...e)=>V(l,I.current,...e),[]);if(E(()=>{P.current=t,z.current=n,c(ea)||(es.current=ea)}),E(()=>{var e;let t;if(!M)return;let r=ep.bind(o,K),a=0;z.current.revalidateOnFocus&&(a=Date.now()+z.current.focusThrottleInterval);let n=(e=(e,t={})=>{if(e==F.FOCUS_EVENT){let e=Date.now();z.current.revalidateOnFocus&&e>a&&q()&&(a=e+z.current.focusThrottleInterval,r())}else if(e==F.RECONNECT_EVENT)z.current.revalidateOnReconnect&&q()&&r();else if(e==F.MUTATE_EVENT)return ep();else if(e==F.ERROR_REVALIDATE_EVENT)return ep(t)},(t=T[M]||(T[M]=[])).push(e),()=>{let r=t.indexOf(e);r>=0&&(t[r]=t[t.length-1],t.pop())});if(L.current=!1,I.current=M,A.current=!0,B({_k:$}),ed&&!S[M])if(c(en)||k)r();else p&&typeof window.requestAnimationFrame!=m?window.requestAnimationFrame(r):setTimeout(r,1);return()=>{L.current=!0,n()}},[M]),E(()=>{let e;function t(){let t="function"==typeof b?b(U().data):b;t&&-1!==e&&(e=setTimeout(r,t))}function r(){!U().error&&(v||z.current.isVisible())&&(w||z.current.isOnline())?ep(K).then(t):t()}return t(),()=>{e&&(clearTimeout(e),e=-1)}},[b,v,w,M]),(0,r.useDebugValue)(eo),f){if(!j&&k&&el)throw Error("Fallback data is required when using Suspense in SSR.");el&&(P.current=t,z.current=n,L.current=!1);let e=O[M];if(Q(!c(e)&&el?eh(e):J),!c(ei)&&el)throw ei;let r=el?ep(K):J;!c(eo)&&el&&(r.status="fulfilled",r.value=!0),Q(r)}return{mutate:eh,get data(){return Y.data=!0,eo},get error(){return Y.error=!0,ei},get isValidating(){return Y.isValidating=!0,ef},get isLoading(){return Y.isLoading=!0,em}}},function(...e){let a,n=(a=(0,r.useContext)(q),(0,r.useMemo)(()=>d(P,a),[a])),[i,s,o]="function"==typeof e[1]?[e[0],e[1],e[2]||{}]:[e[0],null,(null===e[1]?e[2]:e[1])||{}],l=z(n,o),c=t,{use:u}=l,f=(u||[]).concat(B);for(let e=f.length;e--;)c=f[e](c);return c(i,s||l.fetcher||null,l)});e.s(["default",()=>Y],54789)},88754,48972,88,e=>{"use strict";var t=e.i(96472);let r=(0,t.default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",()=>r],88754);let a=(0,t.default)("pen",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]);e.s(["Edit2",()=>a],48972);let n=(0,t.default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",()=>n],88)},36500,e=>{"use strict";e.i(26401);var t=e.i(8452),r=e.i(4974),a=e.i(54789),n=e.i(94511),i=e.i(3177),s=e.i(88754),o=e.i(48972),l=e.i(88),c=e.i(66115),d=e.i(22830);let u=(0,e.i(96472).default)("table-2",[["path",{d:"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",key:"gugj83"}]]);var f=e.i(81740);let m="https://aqua-rabbit-826508.hostingersite.com",p=e=>{let t=localStorage.getItem("token");return n.default.get(e,{headers:{Authorization:`Bearer ${t}`}}).then(e=>e.data)};e.s(["default",0,()=>{let{data:e,error:h,mutate:g}=(0,a.default)(`${m}/api/events`,p),[y,x]=(0,r.useState)(!1),[b,v]=(0,r.useState)(null),[w,j]=(0,r.useState)({name:"",description:"",time:"",location:"",max_guests:100,table_count:10,checkin_mechanism:"organizer_scan"}),k=e?.data||[],E=async e=>{e.preventDefault();let t=localStorage.getItem("token"),r={Authorization:`Bearer ${t}`};try{b?(await n.default.put(`${m}/api/events/${b._id}`,w,{headers:r}),i.toast.success("Cập nhật sự kiện thành công!")):(await n.default.post(`${m}/api/events`,w,{headers:r}),i.toast.success("Tạo sự kiện thành công!")),x(!1),g()}catch(e){i.toast.error(e.response?.data?.message||"Có lỗi xảy ra")}},N=async e=>{if(!confirm("Bạn có chắc muốn xóa sự kiện này?"))return;let t=localStorage.getItem("token");try{await n.default.delete(`${m}/api/events/${e}`,{headers:{Authorization:`Bearer ${t}`}}),i.toast.success("Đã xóa sự kiện"),g()}catch(e){i.toast.error(e.response?.data?.message||"Không thể xóa")}};return h?(0,t.jsx)("div",{className:"text-red-500",children:"Không thể tải dữ liệu"}):e?(0,t.jsxs)("div",{children:[(0,t.jsx)(i.Toaster,{}),(0,t.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-gray-900",children:"Quản lý Sự kiện"}),(0,t.jsx)("p",{className:"text-gray-500 mt-1",children:"Tạo và quản lý các sự kiện check-in"})]}),(0,t.jsxs)("button",{onClick:()=>{v(null),j({name:"",description:"",time:"",location:"",max_guests:100,table_count:10,checkin_mechanism:"organizer_scan"}),x(!0)},className:"bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition",children:[(0,t.jsx)(s.Plus,{className:"w-5 h-5"}),"Tạo sự kiện"]})]}),(0,t.jsxs)("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-3",children:[k.map(e=>(0,t.jsxs)("div",{className:"bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition",children:[(0,t.jsx)("div",{className:"h-32 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center",children:(0,t.jsx)(c.Calendar,{className:"w-12 h-12 text-white/80"})}),(0,t.jsxs)("div",{className:"p-5",children:[(0,t.jsxs)("div",{className:"flex justify-between items-start mb-3",children:[(0,t.jsx)("h3",{className:"font-bold text-lg text-gray-900",children:e.name}),(0,t.jsx)("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${e.is_checkin_open?"bg-green-100 text-green-700":"bg-gray-100 text-gray-600"}`,children:e.is_checkin_open?"Đang mở":"Đã đóng"})]}),(0,t.jsx)("p",{className:"text-gray-500 text-sm mb-4 line-clamp-2",children:e.description||"Chưa có mô tả"}),(0,t.jsxs)("div",{className:"space-y-2 text-sm text-gray-600",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(c.Calendar,{className:"w-4 h-4"}),(0,t.jsx)("span",{children:e.time?new Date(e.time).toLocaleDateString("vi-VN"):"Chưa đặt"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(d.Users,{className:"w-4 h-4"}),(0,t.jsxs)("span",{children:["Tối đa ",e.max_guests," khách"]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(u,{className:"w-4 h-4"}),(0,t.jsxs)("span",{children:[e.table_count," bàn"]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(f.QrCode,{className:"w-4 h-4"}),(0,t.jsx)("span",{children:"organizer_scan"===e.checkin_mechanism?"BTC quét QR":"Khách quét QR"})]})]}),(0,t.jsxs)("div",{className:"flex gap-2 mt-4 pt-4 border-t border-gray-100",children:[(0,t.jsxs)("button",{onClick:()=>{v(e),j({name:e.name,description:e.description||"",time:e.time?new Date(e.time).toISOString().slice(0,16):"",location:e.location,max_guests:e.max_guests,table_count:e.table_count,checkin_mechanism:e.checkin_mechanism}),x(!0)},className:"flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition",children:[(0,t.jsx)(o.Edit2,{className:"w-4 h-4"}),"Sửa"]}),(0,t.jsx)("button",{onClick:()=>N(e._id),className:"flex items-center justify-center px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition",children:(0,t.jsx)(l.Trash2,{className:"w-4 h-4"})})]})]})]},e._id)),0===k.length&&(0,t.jsx)("div",{className:"col-span-full text-center py-12 text-gray-500",children:'Chưa có sự kiện nào. Bấm "Tạo sự kiện" để bắt đầu.'})]}),y&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",children:(0,t.jsxs)("div",{className:"bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto",children:[(0,t.jsx)("div",{className:"p-6 border-b border-gray-100",children:(0,t.jsx)("h3",{className:"text-xl font-bold",children:b?"Chỉnh sửa sự kiện":"Tạo sự kiện mới"})}),(0,t.jsxs)("form",{onSubmit:E,className:"p-6 space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Tên sự kiện *"}),(0,t.jsx)("input",{type:"text",value:w.name,onChange:e=>j({...w,name:e.target.value}),className:"w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none",required:!0})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Mô tả"}),(0,t.jsx)("textarea",{value:w.description,onChange:e=>j({...w,description:e.target.value}),className:"w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none",rows:3})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Thời gian *"}),(0,t.jsx)("input",{type:"datetime-local",value:w.time,onChange:e=>j({...w,time:e.target.value}),className:"w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none",required:!0})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Địa điểm *"}),(0,t.jsx)("input",{type:"text",value:w.location,onChange:e=>j({...w,location:e.target.value}),className:"w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none",required:!0})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Số khách tối đa"}),(0,t.jsx)("input",{type:"number",value:w.max_guests,onChange:e=>j({...w,max_guests:parseInt(e.target.value)||0}),className:"w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none",min:1})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Số bàn"}),(0,t.jsx)("input",{type:"number",value:w.table_count,onChange:e=>j({...w,table_count:parseInt(e.target.value)||0}),className:"w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none",min:1})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Cơ chế Check-in"}),(0,t.jsxs)("select",{value:w.checkin_mechanism,onChange:e=>j({...w,checkin_mechanism:e.target.value}),className:"w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none",children:[(0,t.jsx)("option",{value:"organizer_scan",children:"BTC quét QR khách mời"}),(0,t.jsx)("option",{value:"guest_scan",children:"Khách quét QR sự kiện"})]})]}),(0,t.jsxs)("div",{className:"flex gap-3 pt-4",children:[(0,t.jsx)("button",{type:"button",onClick:()=>x(!1),className:"flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition",children:"Hủy"}),(0,t.jsx)("button",{type:"submit",className:"flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition",children:b?"Cập nhật":"Tạo mới"})]})]})]})})]}):(0,t.jsx)("div",{className:"animate-pulse",children:"Đang tải..."})}],36500)}]);