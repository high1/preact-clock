(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const _ of document.querySelectorAll('link[rel="modulepreload"]'))o(_);new MutationObserver(_=>{for(const r of _)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function n(_){const r={};return _.integrity&&(r.integrity=_.integrity),_.referrerpolicy&&(r.referrerPolicy=_.referrerpolicy),_.crossorigin==="use-credentials"?r.credentials="include":_.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(_){if(_.ep)return;_.ep=!0;const r=n(_);fetch(_.href,r)}})();var J,u,we,F,ue,B={},Se=[],Re=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function S(e,t){for(var n in t)e[n]=t[n];return e}function xe(e){var t=e.parentNode;t&&t.removeChild(e)}function ze(e,t,n){var o,_,r,f={};for(r in t)r=="key"?o=t[r]:r=="ref"?_=t[r]:f[r]=t[r];if(arguments.length>2&&(f.children=arguments.length>3?J.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)f[r]===void 0&&(f[r]=e.defaultProps[r]);return W(e,f,o,_,null)}function W(e,t,n,o,_){var r={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:_==null?++we:_};return _==null&&u.vnode!=null&&u.vnode(r),r}function D(e){return e.children}function T(e,t){this.props=e,this.context=t}function E(e,t){if(t==null)return e.__?E(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?E(e):null}function Ne(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=e.__c.base=n.__e;break}return Ne(e)}}function le(e){(!e.__d&&(e.__d=!0)&&F.push(e)&&!R.__r++||ue!==u.debounceRendering)&&((ue=u.debounceRendering)||setTimeout)(R)}function R(){for(var e;R.__r=F.length;)e=F.sort(function(t,n){return t.__v.__b-n.__v.__b}),F=[],e.some(function(t){var n,o,_,r,f,l;t.__d&&(f=(r=(n=t).__v).__e,(l=n.__P)&&(o=[],(_=S({},r)).__v=r.__v+1,oe(l,r,_,n.__n,l.ownerSVGElement!==void 0,r.__h!=null?[f]:null,o,f==null?E(r):f,r.__h),Ue(o,r),r.__e!=f&&Ne(r)))})}function He(e,t,n,o,_,r,f,l,c,v){var i,d,a,s,h,N,p,m=o&&o.__k||Se,w=m.length;for(n.__k=[],i=0;i<t.length;i++)if((s=n.__k[i]=(s=t[i])==null||typeof s=="boolean"?null:typeof s=="string"||typeof s=="number"||typeof s=="bigint"?W(null,s,null,null,s):Array.isArray(s)?W(D,{children:s},null,null,null):s.__b>0?W(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):s)!=null){if(s.__=n,s.__b=n.__b+1,(a=m[i])===null||a&&s.key==a.key&&s.type===a.type)m[i]=void 0;else for(d=0;d<w;d++){if((a=m[d])&&s.key==a.key&&s.type===a.type){m[d]=void 0;break}a=null}oe(e,s,a=a||B,_,r,f,l,c,v),h=s.__e,(d=s.ref)&&a.ref!=d&&(p||(p=[]),a.ref&&p.push(a.ref,null,s),p.push(d,s.__c||h,s)),h!=null?(N==null&&(N=h),typeof s.type=="function"&&s.__k===a.__k?s.__d=c=Ee(s,c,e):c=Ae(e,s,a,m,h,c),typeof n.type=="function"&&(n.__d=c)):c&&a.__e==c&&c.parentNode!=e&&(c=E(a))}for(n.__e=N,i=w;i--;)m[i]!=null&&(typeof n.type=="function"&&m[i].__e!=null&&m[i].__e==n.__d&&(n.__d=E(o,i+1)),Pe(m[i],m[i]));if(p)for(i=0;i<p.length;i++)Ce(p[i],p[++i],p[++i])}function Ee(e,t,n){for(var o,_=e.__k,r=0;_&&r<_.length;r++)(o=_[r])&&(o.__=e,t=typeof o.type=="function"?Ee(o,t,n):Ae(n,o,o,_,o.__e,t));return t}function Ae(e,t,n,o,_,r){var f,l,c;if(t.__d!==void 0)f=t.__d,t.__d=void 0;else if(n==null||_!=r||_.parentNode==null)e:if(r==null||r.parentNode!==e)e.appendChild(_),f=null;else{for(l=r,c=0;(l=l.nextSibling)&&c<o.length;c+=2)if(l==_)break e;e.insertBefore(_,r),f=r}return f!==void 0?f:_.nextSibling}function Ge(e,t,n,o,_){var r;for(r in n)r==="children"||r==="key"||r in t||z(e,r,null,n[r],o);for(r in t)_&&typeof t[r]!="function"||r==="children"||r==="key"||r==="value"||r==="checked"||n[r]===t[r]||z(e,r,t[r],n[r],o)}function ae(e,t,n){t[0]==="-"?e.setProperty(t,n):e[t]=n==null?"":typeof n!="number"||Re.test(t)?n:n+"px"}function z(e,t,n,o,_){var r;e:if(t==="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||ae(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||ae(e.style,t,n[t])}else if(t[0]==="o"&&t[1]==="n")r=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+r]=n,n?o||e.addEventListener(t,r?he:ce,r):e.removeEventListener(t,r?he:ce,r);else if(t!=="dangerouslySetInnerHTML"){if(_)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!=="href"&&t!=="list"&&t!=="form"&&t!=="tabIndex"&&t!=="download"&&t in e)try{e[t]=n==null?"":n;break e}catch{}typeof n=="function"||(n!=null&&(n!==!1||t[0]==="a"&&t[1]==="r")?e.setAttribute(t,n):e.removeAttribute(t))}}function ce(e){this.l[e.type+!1](u.event?u.event(e):e)}function he(e){this.l[e.type+!0](u.event?u.event(e):e)}function oe(e,t,n,o,_,r,f,l,c){var v,i,d,a,s,h,N,p,m,w,U,se,M,b=t.type;if(t.constructor!==void 0)return null;n.__h!=null&&(c=n.__h,l=t.__e=n.__e,t.__h=null,r=[l]),(v=u.__b)&&v(t);try{e:if(typeof b=="function"){if(p=t.props,m=(v=b.contextType)&&o[v.__c],w=v?m?m.props.value:v.__:o,n.__c?N=(i=t.__c=n.__c).__=i.__E:("prototype"in b&&b.prototype.render?t.__c=i=new b(p,w):(t.__c=i=new T(p,w),i.constructor=b,i.render=Je),m&&m.sub(i),i.props=p,i.state||(i.state={}),i.context=w,i.__n=o,d=i.__d=!0,i.__h=[]),i.__s==null&&(i.__s=i.state),b.getDerivedStateFromProps!=null&&(i.__s==i.state&&(i.__s=S({},i.__s)),S(i.__s,b.getDerivedStateFromProps(p,i.__s))),a=i.props,s=i.state,d)b.getDerivedStateFromProps==null&&i.componentWillMount!=null&&i.componentWillMount(),i.componentDidMount!=null&&i.__h.push(i.componentDidMount);else{if(b.getDerivedStateFromProps==null&&p!==a&&i.componentWillReceiveProps!=null&&i.componentWillReceiveProps(p,w),!i.__e&&i.shouldComponentUpdate!=null&&i.shouldComponentUpdate(p,i.__s,w)===!1||t.__v===n.__v){i.props=p,i.state=i.__s,t.__v!==n.__v&&(i.__d=!1),i.__v=t,t.__e=n.__e,t.__k=n.__k,t.__k.forEach(function(V){V&&(V.__=t)}),i.__h.length&&f.push(i);break e}i.componentWillUpdate!=null&&i.componentWillUpdate(p,i.__s,w),i.componentDidUpdate!=null&&i.__h.push(function(){i.componentDidUpdate(a,s,h)})}if(i.context=w,i.props=p,i.__v=t,i.__P=e,U=u.__r,se=0,"prototype"in b&&b.prototype.render)i.state=i.__s,i.__d=!1,U&&U(t),v=i.render(i.props,i.state,i.context);else do i.__d=!1,U&&U(t),v=i.render(i.props,i.state,i.context),i.state=i.__s;while(i.__d&&++se<25);i.state=i.__s,i.getChildContext!=null&&(o=S(S({},o),i.getChildContext())),d||i.getSnapshotBeforeUpdate==null||(h=i.getSnapshotBeforeUpdate(a,s)),M=v!=null&&v.type===D&&v.key==null?v.props.children:v,He(e,Array.isArray(M)?M:[M],t,n,o,_,r,f,l,c),i.base=t.__e,t.__h=null,i.__h.length&&f.push(i),N&&(i.__E=i.__=null),i.__e=!1}else r==null&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=Ke(n.__e,t,n,o,_,r,f,c);(v=u.diffed)&&v(t)}catch(V){t.__v=null,(c||r!=null)&&(t.__e=l,t.__h=!!c,r[r.indexOf(l)]=null),u.__e(V,t,n)}}function Ue(e,t){u.__c&&u.__c(t,e),e.some(function(n){try{e=n.__h,n.__h=[],e.some(function(o){o.call(n)})}catch(o){u.__e(o,n.__v)}})}function Ke(e,t,n,o,_,r,f,l){var c,v,i,d=n.props,a=t.props,s=t.type,h=0;if(s==="svg"&&(_=!0),r!=null){for(;h<r.length;h++)if((c=r[h])&&"setAttribute"in c==!!s&&(s?c.localName===s:c.nodeType===3)){e=c,r[h]=null;break}}if(e==null){if(s===null)return document.createTextNode(a);e=_?document.createElementNS("http://www.w3.org/2000/svg",s):document.createElement(s,a.is&&a),r=null,l=!1}if(s===null)d===a||l&&e.data===a||(e.data=a);else{if(r=r&&J.call(e.childNodes),v=(d=n.props||B).dangerouslySetInnerHTML,i=a.dangerouslySetInnerHTML,!l){if(r!=null)for(d={},h=0;h<e.attributes.length;h++)d[e.attributes[h].name]=e.attributes[h].value;(i||v)&&(i&&(v&&i.__html==v.__html||i.__html===e.innerHTML)||(e.innerHTML=i&&i.__html||""))}if(Ge(e,a,d,_,l),i)t.__k=[];else if(h=t.props.children,He(e,Array.isArray(h)?h:[h],t,n,o,_&&s!=="foreignObject",r,f,r?r[0]:n.__k&&E(n,0),l),r!=null)for(h=r.length;h--;)r[h]!=null&&xe(r[h]);l||("value"in a&&(h=a.value)!==void 0&&(h!==e.value||s==="progress"&&!h||s==="option"&&h!==d.value)&&z(e,"value",h,d.value,!1),"checked"in a&&(h=a.checked)!==void 0&&h!==e.checked&&z(e,"checked",h,d.checked,!1))}return e}function Ce(e,t,n){try{typeof e=="function"?e(t):e.current=t}catch(o){u.__e(o,n)}}function Pe(e,t,n){var o,_;if(u.unmount&&u.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||Ce(o,null,t)),(o=e.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(r){u.__e(r,t)}o.base=o.__P=null,e.__c=void 0}if(o=e.__k)for(_=0;_<o.length;_++)o[_]&&Pe(o[_],t,typeof e.type!="function");n||e.__e==null||xe(e.__e),e.__=e.__e=e.__d=void 0}function Je(e,t,n){return this.constructor(e,n)}function Qe(e,t,n){var o,_,r;u.__&&u.__(e,t),_=(o=typeof n=="function")?null:n&&n.__k||t.__k,r=[],oe(t,e=(!o&&n||t).__k=ze(D,null,[e]),_||B,B,t.ownerSVGElement!==void 0,!o&&n?[n]:_?null:t.firstChild?J.call(t.childNodes):null,r,!o&&n?n:_?_.__e:t.firstChild,o),Ue(r,e)}J=Se.slice,u={__e:function(e,t,n,o){for(var _,r,f;t=t.__;)if((_=t.__c)&&!_.__)try{if((r=_.constructor)&&r.getDerivedStateFromError!=null&&(_.setState(r.getDerivedStateFromError(e)),f=_.__d),_.componentDidCatch!=null&&(_.componentDidCatch(e,o||{}),f=_.__d),f)return _.__E=_}catch(l){e=l}throw e}},we=0,T.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=S({},this.state),typeof e=="function"&&(e=e(S({},n),this.props)),e&&S(n,e),e!=null&&this.__v&&(t&&this.__h.push(t),le(this))},T.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),le(this))},T.prototype.render=D,F=[],R.__r=0;var ie,k,Z,ve,te=0,Fe=[],j=[],de=u.__b,pe=u.__r,ye=u.diffed,me=u.__c,ge=u.unmount;function Te(e,t){u.__h&&u.__h(k,e,te||t),te=0;var n=k.__H||(k.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({__V:j}),n.__[e]}function Xe(e,t){var n=Te(ie++,3);!u.__s&&Le(n.__H,t)&&(n.__=e,n.i=t,k.__H.__h.push(n))}function Ye(e){return te=5,Q(function(){return{current:e}},[])}function Q(e,t){var n=Te(ie++,7);return Le(n.__H,t)?(n.__V=e(),n.i=t,n.__h=e,n.__V):n.__}function Ze(){for(var e;e=Fe.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(I),e.__H.__h.forEach(ne),e.__H.__h=[]}catch(t){e.__H.__h=[],u.__e(t,e.__v)}}u.__b=function(e){typeof e.type!="function"||e.o||e.type===D?e.o||(e.o=e.__&&e.__.o?e.__.o:""):e.o=(e.__&&e.__.o?e.__.o:"")+(e.__&&e.__.__k?e.__.__k.indexOf(e):0),k=null,de&&de(e)},u.__r=function(e){pe&&pe(e),ie=0;var t=(k=e.__c).__H;t&&(Z===k?(t.__h=[],k.__h=[],t.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=j,n.__N=n.i=void 0})):(t.__h.forEach(I),t.__h.forEach(ne),t.__h=[])),Z=k},u.diffed=function(e){ye&&ye(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Fe.push(t)!==1&&ve===u.requestAnimationFrame||((ve=u.requestAnimationFrame)||et)(Ze)),t.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==j&&(n.__=n.__V),n.i=void 0,n.__V=j})),Z=k=null},u.__c=function(e,t){t.some(function(n){try{n.__h.forEach(I),n.__h=n.__h.filter(function(o){return!o.__||ne(o)})}catch(o){t.some(function(_){_.__h&&(_.__h=[])}),t=[],u.__e(o,n.__v)}}),me&&me(e,t)},u.unmount=function(e){ge&&ge(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(o){try{I(o)}catch(_){t=_}}),n.__H=void 0,t&&u.__e(t,n.__v))};var ke=typeof requestAnimationFrame=="function";function et(e){var t,n=function(){clearTimeout(o),ke&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);ke&&(t=requestAnimationFrame(n))}function I(e){var t=k,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),k=t}function ne(e){var t=k;e.__c=e.__(),k=t}function Le(e,t){return!e||e.length!==t.length||t.some(function(n,o){return n!==e[o]})}function X(){throw new Error("Cycle detected")}function _e(){if(H>1)H--;else{for(var e,t=!1;L!==void 0;){var n=L;for(L=void 0,re++;n!==void 0;){var o=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&4&n.f)try{n.c()}catch(_){t||(e=_,t=!0)}n=o}}if(re=0,H--,t)throw e}}var y=void 0,L=void 0,H=0,re=0,G=0;function De(e){if(y!==void 0){var t=e.n;if(t===void 0||t.t!==y)return y.s=t={f:0,i:0,S:e,p:void 0,n:y.s,t:y,e:void 0,x:void 0,r:t},e.n=t,32&y.f&&e.S(t),t;if(1&t.f){t.f&=-2;var n=y.s;if(t!==n){var o=t.p,_=t.n;o!==void 0&&(o.n=_),_!==void 0&&(_.p=o),n!==void 0&&(n.p=t),t.p=void 0,t.n=n,y.s=t}return t}}}function g(e){this.v=e,this.i=0,this.n=void 0,this.t=void 0}g.prototype.h=function(){return!0};g.prototype.S=function(e){2&e.f||(e.f|=2,e.x=this.t,this.t!==void 0&&(this.t.e=e),this.t=e)};g.prototype.U=function(e){if(2&e.f){e.f&=-3;var t=e.e,n=e.x;t!==void 0&&(t.x=n,e.e=void 0),n!==void 0&&(n.e=t,e.x=void 0),e===this.t&&(this.t=n)}};g.prototype.subscribe=function(e){var t=this;return fe(function(){var n=t.value,o=32&this.f;this.f&=-33;try{e(n)}finally{this.f|=o}})};g.prototype.valueOf=function(){return this.value};g.prototype.toString=function(){return this.value+""};g.prototype.peek=function(){return this.v};Object.defineProperty(g.prototype,"value",{get:function(){var e=De(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){re>100&&X(),this.v=e,this.i++,G++,H++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{_e()}}}});function Oe(e){return new g(e)}function Me(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;n!==void 0&&(t.r=n),t.S.n=t,t.f|=1}}function Ve(e){for(var t=e.s,n=void 0;t!==void 0;){var o=t.n;1&t.f?(t.S.U(t),t.n=void 0):(n!==void 0&&(n.p=t),t.p=void 0,t.n=n,n=t),t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=o}e.s=n}function x(e){g.call(this,void 0),this.x=e,this.s=void 0,this.g=G-1,this.f=4}(x.prototype=new g).h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===G))return!0;if(this.g=G,this.f|=1,this.i>0){for(var e=this.s;e!==void 0&&!(!e.S.h()||e.S.i!==e.i);)e=e.n;if(e===void 0)return this.f&=-2,!0}var t=y;try{Me(this),y=this;var n=this.x();(16&this.f||this.v!==n||this.i===0)&&(this.v=n,this.f&=-17,this.i++)}catch(o){this.v=o,this.f|=16,this.i++}return y=t,Ve(this),this.f&=-2,!0};x.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}g.prototype.S.call(this,e)};x.prototype.U=function(e){if(g.prototype.U.call(this,e),this.t===void 0){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}};x.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}};x.prototype.peek=function(){if(this.h()||X(),16&this.f)throw this.v;return this.v};Object.defineProperty(x.prototype,"value",{get:function(){1&this.f&&X();var e=De(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function qe(e){return new x(e)}function We(e){var t=e.u;if(e.u=void 0,typeof t=="function"){H++;var n=y;y=void 0;try{t()}catch(o){throw e.f&=-2,o}finally{y=n,_e()}}}function je(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.s=void 0,We(e)}function tt(e){if(y!==this)throw new Error("Out-of-order effect");Ve(this),y=e,this.f&=-2,8&this.f&&je(this),_e()}function O(e){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=36}O.prototype.c=function(){var e=this.S();try{8&this.f||(this.u=this.x())}finally{e()}};O.prototype.S=function(){1&this.f&&X(),this.f|=1,this.f&=-9,Me(this),We(this),H++,this.f&=-5;var e=y;return y=this,tt.bind(this,e)};O.prototype.N=function(){2&this.f||(this.f|=6,this.o=L,L=this)};O.prototype.d=function(){this.f|=8,1&this.f||je(this)};function fe(e){var t=new O(e);return t.c(),t.d.bind(t)}var Y,ee;function A(e,t){u[e]=t.bind(null,u[e]||function(){})}function K(e){ee&&ee(),ee=e&&e.S()}function Ie(e){var t=this,n=e.data,o=Be(n);o.value=n;var _=Q(function(){for(var r=t.__v;r=r.__;)if(r.__c){r.__c.__$f|=4;break}return t.__$u.c=function(){t.base.data=_.peek()},qe(function(){var f=o.value.value;return f===0?0:f===!0?"":f||""})},[]);return _.value}Ie.displayName="_st";Object.defineProperties(g.prototype,{constructor:{configurable:!0},type:{configurable:!0,value:Ie},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});A("__b",function(e,t){if(typeof t.type=="string"){var n,o=t.props;for(var _ in o)if(_!=="children"){var r=o[_];r instanceof g&&(n||(t.__np=n={}),n[_]=r,o[_]=r.peek())}}e(t)});A("__r",function(e,t){K();var n,o=t.__c;o&&(o.__$f&=-2,(n=o.__$u)===void 0&&(o.__$u=n=function(_){var r;return fe(function(){r=this}),r.c=function(){o.__$f|=1,o.setState({})},r}())),Y=o,K(n),e(t)});A("__e",function(e,t,n,o){K(),Y=void 0,e(t,n,o)});A("diffed",function(e,t){K(),Y=void 0;var n;if(typeof t.type=="string"&&(n=t.__e)){var o=t.__np,_=t.props;if(o){var r=n.U;if(r)for(var f in r){var l=r[f];l!==void 0&&!(f in o)&&(l.d(),r[f]=void 0)}else n.U=r={};for(var c in o){var v=r[c],i=o[c];v===void 0?(v=nt(n,c,i,_),r[c]=v):v.o(i,_)}}}e(t)});function nt(e,t,n,o){var _=t in e&&e.ownerSVGElement===void 0,r=Oe(n);return{o:function(f,l){r.value=f,o=l},d:fe(function(){var f=r.value.value;o[t]!==f&&(o[t]=f,_?e[t]=f:f?e.setAttribute(t,f):e.removeAttribute(t))})}}A("unmount",function(e,t){var n=t.__c,o=n&&n.__$u;if(o&&o.d(),typeof t.type=="string"){var _=t.__e,r=_.U;if(r){_.U=null;for(var f in r){var l=r[f];l&&l.d()}}}e(t)});A("__h",function(e,t,n,o){o<3&&(t.__$f|=2),e(t,n,o)});T.prototype.shouldComponentUpdate=function(e,t){var n=this.__$u;if(!(n&&n.s!==void 0||4&this.__$f)||3&this.__$f)return!0;for(var o in t)return!0;for(var _ in e)if(_!=="__source"&&e[_]!==this.props[_])return!0;for(var r in this.props)if(!(r in e))return!0;return!1};function Be(e){return Q(function(){return Oe(e)},[])}function q(e){var t=Ye(e);return t.current=e,Y.__$f|=4,Q(function(){return qe(function(){return t.current()})},[])}var rt=0;function $(e,t,n,o,_){var r,f,l={};for(f in t)f=="ref"?r=t[f]:l[f]=t[f];var c={type:e,props:l,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--rt,__source:_,__self:o};if(typeof e=="function"&&(r=e.defaultProps))for(f in r)l[f]===void 0&&(l[f]=r[f]);return u.vnode&&u.vnode(c),c}const C=({className:e="",length:t=0,limit:n=94,stationary:o,transform:_,...r})=>$("line",{className:`stroke-cap-round ${e}`,transform:_,y1:o?t-n:void 0,y2:-(o?n:t),...r}),be=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3,P=(e,t=1)=>`rotate(${(e*360).toFixed(t)})`,ot=()=>{const e=Be(be()),t=q(()=>P(e.value%1,0)),n=q(()=>P(e.value%60/60)),o=q(()=>P(e.value/60%60/60)),_=q(()=>P(e.value/60/60%12/12));return Xe(()=>{let r=requestAnimationFrame(function f(){e.value=be(),r=requestAnimationFrame(f)});return()=>cancelAnimationFrame(r)},[e]),$("div",{className:"flex items-center justify-center h-full @dark:bg-neutral-700",children:$("svg",{viewBox:"0 0 200 200",className:"h-95vmin",children:[$("g",{className:"translate-100px",children:[$("circle",{className:"stroke-neutral-900 @dark:stroke-neutral-100 fill-none",r:"99"}),Array.from({length:60},(r,f)=>({isHour:f%5===0})).map(({isHour:r},f,{length:l})=>$(C,{transform:P(f/l,0),className:r?"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-2":"stroke-neutral-400 @dark:stroke-neutral-600",length:r?7:3,stationary:!0},f))]}),$("g",{className:"translate-100px",children:[$(C,{transform:t,className:"stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5 will-change-transform",length:83}),$(C,{transform:_,className:"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4",length:50}),$(C,{transform:o,className:"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3",length:70}),$(C,{transform:n,className:"stroke-red-500 stroke-width-2",length:77})]})]})})},$e=document.querySelector("#root");if($e)Qe($(ot,{}),$e);else throw new Error("#root element not found!");
