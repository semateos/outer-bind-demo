!function(t,e){function i(t,i,r){var a=e.createEvent("CustomEvent");return a.initCustomEvent(t,!1,!0,i),r.dispatchEvent(a)}function r(e){var r=u.parseUrl(t.location.href,e.getAttribute("mode")),n={path:r.path};if(i("state-change",n,e)){for(var s=e.firstElementChild;s;){if("APP-ROUTE"===s.tagName&&u.testRoute(s.getAttribute("path"),r.path,e.getAttribute("trailingSlash"),s.hasAttribute("regex")))return a(e,s,r),void 0;s=s.nextSibling}i("not-found",n,e)}}function a(t,r,a){if(r.hasAttribute("redirect"))return t.go(r.getAttribute("redirect"),{replace:!0}),void 0;var s={path:a.path,route:r,oldRoute:t.activeRoute};i("activate-route-start",s,t)&&i("activate-route-start",s,r)&&(t.activeRoute.removeAttribute("active"),r.setAttribute("active","active"),t.activeRoute=r,r.hasAttribute("import")?n(t,r.getAttribute("import"),r,a,s):r.hasAttribute("element")?h(t,r.getAttribute("element"),r,a,s):r.firstElementChild&&"TEMPLATE"===r.firstElementChild.tagName&&o(t,e.importNode(r.firstElementChild.content,!0),s))}function n(t,i,r,a,n){function h(){s(t,o,i,r,a,n)}var o;l.hasOwnProperty(i)?(o=e.querySelector('link[href="'+i+'"]'),o.import?h():o.addEventListener("load",h)):(l[i]=!0,o=e.createElement("link"),o.setAttribute("rel","import"),o.setAttribute("href",i),o.addEventListener("load",h),e.head.appendChild(o))}function s(t,i,r,a,n,s){a.hasAttribute("active")&&(a.hasAttribute("template")?o(t,e.importNode(i.import.querySelector("template").content,!0),s):h(t,a.getAttribute("element")||r.split("/").slice(-1)[0].replace(".html",""),a,n,s))}function h(t,i,r,a,n){var s=e.createElement(i),h=u.routeArguments(r.getAttribute("path"),a.path,a.search,r.hasAttribute("regex"));for(var l in h)h.hasOwnProperty(l)&&(s[l]=h[l]);o(t,s,n)}function o(t,e,r){for(;t.activeRouteContent.firstChild;)t.activeRouteContent.removeChild(t.activeRouteContent.firstChild);t.activeRouteContent.appendChild(e),i("activate-route-end",r,t),i("activate-route-end",r,r.route)}var u={},l={},c="ActiveXObject"in t,p=Object.create(HTMLElement.prototype);p.util=u,e.registerElement("app-route",{prototype:Object.create(HTMLElement.prototype)}),e.registerElement("active-route",{prototype:Object.create(HTMLElement.prototype)}),p.attachedCallback=function(){"manual"!==this.getAttribute("init")&&this.init()},p.init=function(){this.isInitialized||(this.isInitialized=!0,this.hasAttribute("trailingSlash")||this.setAttribute("trailingSlash","strict"),this.hasAttribute("mode")||this.setAttribute("mode","auto"),this.stateChangeHandler=r.bind(null,this),t.addEventListener("popstate",this.stateChangeHandler,!1),c&&t.addEventListener("hashchange",this.stateChangeHandler,!1),this.activeRouteContent=e.createElement("active-route"),this.appendChild(this.activeRouteContent),this.hasAttribute("shadow")&&(this.activeRouteContent=this.activeRouteContent.createShadowRoot()),this.activeRoute=e.createElement("app-route"),r(this))},p.detachedCallback=function(){t.removeEventListener("popstate",this.stateChangeHandler,!1),c&&t.removeEventListener("hashchange",this.stateChangeHandler,!1)},p.go=function(e,i){"pushstate"!==this.getAttribute("mode")&&(e="#"+e),i&&i.replace!==!0?t.history.pushState(null,null,e):t.history.replaceState(null,null,e),r(this)},u.parseUrl=function(t,e){var i=new URL(t),r={path:i.pathname,hash:i.hash,search:i.search,isHashPath:"hash"===e};if("pushstate"!==e&&("#/"===r.hash.substring(0,2)?(r.isHashPath=!0,r.path=r.hash.substring(1)):"#!/"===r.hash.substring(0,3)?(r.isHashPath=!0,r.path=r.hash.substring(2)):r.isHashPath&&(r.path=0===r.hash.length?"/":r.hash.substring(1)),r.isHashPath)){var a=r.path.indexOf("?");-1!==a&&(r.search=r.path.substring(a),r.path=r.path.substring(0,a))}return r},u.testRoute=function(t,e,i,r){if("ignore"===i&&("/"===e.slice(-1)&&(e=e.slice(0,-1)),"/"!==t.slice(-1)||r||(t=t.slice(0,-1))),r)return u.testRegExString(t,e);if(t===e||"*"===t)return!0;if(-1===t.indexOf("*")&&-1===t.indexOf(":"))return!1;var a=e.split("/"),n=t.split("/");if(a.length!==n.length)return!1;for(var s=0;s<n.length;s++){var h=n[s];if(h!==a[s]&&"*"!==h&&":"!==h.charAt(0))return!1}return!0},u.routeArguments=function(t,e,i,r){var a={};if(!r)for(var n=e.split("/"),s=t.split("/"),h=0;h<s.length;h++){var o=s[h];":"===o.charAt(0)&&(a[o.substring(1)]=n[h])}var l=i.substring(1).split("&");1===l.length&&""===l[0]&&(l=[]);for(var c=0;c<l.length;c++){var p=l[c],v=p.split("=");a[v[0]]=v.splice(1,v.length-1).join("=")}for(var d in a)a[d]=u.typecast(a[d]);return a},u.typecast=function(t){return"true"===t?!0:"false"===t?!1:isNaN(t)||""===t||"0"===t.charAt(0)?decodeURIComponent(t):+t},u.testRegExString=function(t,e){if("/"!==t.charAt(0))return!1;t=t.slice(1);var i="";if("/"===t.slice(-1))t=t.slice(0,-1);else{if("/i"!==t.slice(-2))return!1;t=t.slice(0,-2),i="i"}return new RegExp(t,i).test(e)},e.registerElement("app-router",{prototype:p})}(window,document);