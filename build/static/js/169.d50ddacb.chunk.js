(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[169],{1073:function(e,t,n){"use strict";var r=n(4),a=n(10),o=n(0),i=n(32),c=n(33),s=n(1147),d=n(633),u=n(1571),l=n(634),b=n(99),j=n(552),p=n(638),x=n(872),m=n(163),O=n(564),h=n(561),f=n(632),v=n(607),g=n(609),y=n(608),k=n(13),w=n(1074),S=n.n(w),W=n(1);function C(e){var t=e.children,n=e.window,r=Object(c.a)(),a=Object(s.a)({disableHysteresis:!0,threshold:0,target:n}),i="dark"===r.palette.mode?r.palette.dark.dark:r.palette.grey[200];return Object(o.cloneElement)(t,{elevation:a?2:0,style:{backgroundColor:r.palette.background.default,borderBottom:a?"none":"1px solid",borderColor:a?"":i,color:r.palette.text.dark}})}t.a=function(e){var t=Object.assign({},e),n=Object(o.useState)(!1),c=Object(a.a)(n,2),s=c[0],w=c[1],D=function(e){return function(t){("keydown"!==t.type||"Tab"!==t.key&&"Shift"!==t.key)&&w(e)}};return Object(W.jsx)(C,Object(r.a)(Object(r.a)({},t),{},{children:Object(W.jsx)(d.a,{children:Object(W.jsx)(u.a,{children:Object(W.jsxs)(l.a,{children:[Object(W.jsx)(b.a,{component:"div",sx:{flexGrow:1,textAlign:"left"}}),Object(W.jsxs)(j.a,{direction:"row",sx:{display:{xs:"none",sm:"block"}},spacing:2,children:[Object(W.jsx)(p.a,{color:"inherit",component:x.a,href:"#",target:"_blank",children:"Home"}),Object(W.jsx)(p.a,{color:"inherit",component:i.b,to:"login",target:"_blank",children:"Iniciar Sesi\xf3n"})]}),Object(W.jsxs)(m.a,{sx:{display:{xs:"block",sm:"none"}},children:[Object(W.jsx)(O.a,{color:"inherit",onClick:D(!0),size:"large",children:Object(W.jsx)(S.a,{})}),Object(W.jsx)(h.a,{anchor:"top",open:s,onClose:D(!1),children:Object(W.jsx)(m.a,{sx:{width:"auto"},role:"presentation",onClick:D(!1),onKeyDown:D(!1),children:Object(W.jsxs)(f.a,{children:[Object(W.jsx)(x.a,{style:{textDecoration:"none"},href:"#",target:"_blank",children:Object(W.jsxs)(v.a,{component:"a",children:[Object(W.jsx)(g.a,{children:Object(W.jsx)(k.Z,{})}),Object(W.jsx)(y.a,{primary:"Home"})]})}),Object(W.jsx)(x.a,{style:{textDecoration:"none"},href:"/login",target:"_blank",children:Object(W.jsxs)(v.a,{component:"a",children:[Object(W.jsx)(g.a,{children:Object(W.jsx)(k.E,{})}),Object(W.jsx)(y.a,{primary:"Dashboard"})]})}),Object(W.jsx)(x.a,{style:{textDecoration:"none"},href:"https://codedthemes.gitbook.io/berry",target:"_blank",children:Object(W.jsxs)(v.a,{component:"a",children:[Object(W.jsx)(g.a,{children:Object(W.jsx)(k.g,{})}),Object(W.jsx)(y.a,{primary:"Documentation"})]})}),Object(W.jsx)(x.a,{style:{textDecoration:"none"},href:"https://material-ui.com/store/items/berry-react-material-admin/",target:"_blank",children:Object(W.jsxs)(v.a,{component:"a",children:[Object(W.jsx)(g.a,{children:Object(W.jsx)(k.D,{})}),Object(W.jsx)(y.a,{primary:"Purchase Now"})]})})]})})})]})]})})})}))}},1074:function(e,t,n){"use strict";var r=n(100);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(127)),o=n(1),i=(0,a.default)((0,o.jsx)("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu");t.default=i},1147:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(10),a=n(3),o=n(7),i=n(0),c=["getTrigger","target"];function s(e,t){var n=t.disableHysteresis,r=void 0!==n&&n,a=t.threshold,o=void 0===a?100:a,i=t.target,c=e.current;return i&&(e.current=void 0!==i.pageYOffset?i.pageYOffset:i.scrollTop),!(!r&&void 0!==c&&e.current<c)&&e.current>o}var d="undefined"!==typeof window?window:null;function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.getTrigger,n=void 0===t?s:t,u=e.target,l=void 0===u?d:u,b=Object(o.a)(e,c),j=i.useRef(),p=i.useState((function(){return n(j,b)})),x=Object(r.a)(p,2),m=x[0],O=x[1];return i.useEffect((function(){var e=function(){O(n(j,Object(a.a)({target:l},b)))};return e(),l.addEventListener("scroll",e),function(){l.removeEventListener("scroll",e)}}),[l,n,JSON.stringify(b)]),m}},1571:function(e,t,n){"use strict";var r=n(5),a=n(7),o=n(3),i=n(0),c=n(8),s=n(337),d=n(85),u=n(115),l=n(537),b=n(231),j=Object(b.a)(),p=n(556),x=n(1),m=["className","component","disableGutters","fixed","maxWidth","classes"],O=Object(p.a)(),h=j("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat(Object(s.a)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),f=function(e){return Object(l.a)({props:e,name:"MuiContainer",defaultTheme:O})},v=function(e,t){var n=e.classes,r=e.fixed,a=e.disableGutters,o=e.maxWidth,i={root:["root",o&&"maxWidth".concat(Object(s.a)(String(o))),r&&"fixed",a&&"disableGutters"]};return Object(u.a)(i,(function(e){return Object(d.a)(t,e)}),n)};var g=n(9),y=n(6),k=n(11),w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,n=void 0===t?h:t,s=e.useThemeProps,d=void 0===s?f:s,u=e.componentName,l=void 0===u?"MuiContainer":u,b=n((function(e){var t=e.theme,n=e.ownerState;return Object(o.a)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!n.disableGutters&&Object(r.a)({paddingLeft:t.spacing(2),paddingRight:t.spacing(2)},t.breakpoints.up("sm"),{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}))}),(function(e){var t=e.theme;return e.ownerState.fixed&&Object.keys(t.breakpoints.values).reduce((function(e,n){var r=n,a=t.breakpoints.values[r];return 0!==a&&(e[t.breakpoints.up(r)]={maxWidth:"".concat(a).concat(t.breakpoints.unit)}),e}),{})}),(function(e){var t=e.theme,n=e.ownerState;return Object(o.a)({},"xs"===n.maxWidth&&Object(r.a)({},t.breakpoints.up("xs"),{maxWidth:Math.max(t.breakpoints.values.xs,444)}),n.maxWidth&&"xs"!==n.maxWidth&&Object(r.a)({},t.breakpoints.up(n.maxWidth),{maxWidth:"".concat(t.breakpoints.values[n.maxWidth]).concat(t.breakpoints.unit)}))})),j=i.forwardRef((function(e,t){var n=d(e),r=n.className,i=n.component,s=void 0===i?"div":i,u=n.disableGutters,j=void 0!==u&&u,p=n.fixed,O=void 0!==p&&p,h=n.maxWidth,f=void 0===h?"lg":h,g=Object(a.a)(n,m),y=Object(o.a)({},n,{component:s,disableGutters:j,fixed:O,maxWidth:f}),k=v(y,l);return Object(x.jsx)(b,Object(o.a)({as:s,ownerState:y,className:Object(c.a)(k.root,r),ref:t},g))}));return j}({createStyledComponent:Object(y.a)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat(Object(g.a)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:function(e){return Object(k.a)({props:e,name:"MuiContainer"})}});t.a=w},1713:function(e,t,n){"use strict";n.r(t);var r=n(5),a=n(6),o=n(1),i=function(){return Object(o.jsx)(o.Fragment,{})},c=n(1073),s=n.p+"static/media/header-bg.07dde975.jpg",d=Object(a.a)("div")((function(e){var t=e.theme;return Object(r.a)({backgroundImage:"url(".concat(s,")"),backgroundSize:"cover",backgroundAttachment:"fixed",textAlign:"center",paddingTop:30},t.breakpoints.down("md"),{paddingTop:0})}));t.default=function(){return Object(o.jsxs)(d,{children:[Object(o.jsx)(c.a,{}),Object(o.jsx)(i,{})]})}},872:function(e,t,n){"use strict";var r=n(18),a=n(10),o=n(5),i=n(7),c=n(3),s=n(0),d=n(8),u=n(115),l=n(16),b=n(98),j=n(9),p=n(6),x=n(11),m=n(133),O=n(23),h=n(99),f=n(85),v=n(92);function g(e){return Object(f.a)("MuiLink",e)}var y=Object(v.a)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),k=n(1),w=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],S={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},W=Object(p.a)(h.a,{name:"MuiLink",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["underline".concat(Object(j.a)(n.underline))],"button"===n.component&&t.button]}})((function(e){var t=e.theme,n=e.ownerState,r=Object(l.b)(t,"palette.".concat(function(e){return S[e]||e}(n.color)))||n.color;return Object(c.a)({},"none"===n.underline&&{textDecoration:"none"},"hover"===n.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===n.underline&&{textDecoration:"underline",textDecorationColor:"inherit"!==r?Object(b.a)(r,.4):void 0,"&:hover":{textDecorationColor:"inherit"}},"button"===n.component&&Object(o.a)({position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"}},"&.".concat(y.focusVisible),{outline:"auto"}))})),C=s.forwardRef((function(e,t){var n=Object(x.a)({props:e,name:"MuiLink"}),o=n.className,l=n.color,b=void 0===l?"primary":l,p=n.component,h=void 0===p?"a":p,f=n.onBlur,v=n.onFocus,y=n.TypographyClasses,C=n.underline,D=void 0===C?"always":C,M=n.variant,R=void 0===M?"inherit":M,T=n.sx,G=Object(i.a)(n,w),N=Object(m.a)(),A=N.isFocusVisibleRef,H=N.onBlur,L=N.onFocus,z=N.ref,_=s.useState(!1),V=Object(a.a)(_,2),F=V[0],B=V[1],E=Object(O.a)(t,z),P=Object(c.a)({},n,{color:b,component:h,focusVisible:F,underline:D,variant:R}),J=function(e){var t=e.classes,n=e.component,r=e.focusVisible,a=e.underline,o={root:["root","underline".concat(Object(j.a)(a)),"button"===n&&"button",r&&"focusVisible"]};return Object(u.a)(o,g,t)}(P);return Object(k.jsx)(W,Object(c.a)({color:b,className:Object(d.a)(J.root,o),classes:y,component:h,onBlur:function(e){H(e),!1===A.current&&B(!1),f&&f(e)},onFocus:function(e){L(e),!0===A.current&&B(!0),v&&v(e)},ref:E,ownerState:P,variant:R,sx:[].concat(Object(r.a)(Object.keys(S).includes(b)?[]:[{color:b}]),Object(r.a)(Array.isArray(T)?T:[T]))},G))}));t.a=C}}]);
//# sourceMappingURL=169.d50ddacb.chunk.js.map