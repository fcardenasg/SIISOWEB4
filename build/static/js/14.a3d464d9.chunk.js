(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[14],{1041:function(e,t,n){"use strict";var r=n(4),a=n(45),c=n.n(a),i=n(66),o=n(10),s=n(0),l=n(32),d=n(24),u=n(33),b=n(605),j=n(61),m=n(638),x=n(163),h=n(339),p=n(99),O=n(237),f=n(639),v=n(630),g=n(642),y=n(631),w=n(564),k=n(147),C=n(824),z=n(690),S=n(869),M=n(75),R=n(103),I=n(857),B=n(907),D=n(128),V=n(908),E=n(864),P=n.n(E),A=n(868),F=n.n(A),H=n(1);t.a=function(e){var t=Object.assign({},e),n=Object(u.a)(),a=Object(I.a)(),E=Object(b.a)(n.breakpoints.down("md")),A=Object(d.d)((function(e){return e.customization})),L=Object(s.useState)(!1),W=Object(o.a)(L,2),_=W[0],G=W[1],N=Object(s.useState)(!0),q=Object(o.a)(N,2),T=q[0],J=q[1],U=Object(s.useState)(0),Y=Object(o.a)(U,2),Z=Y[0],$=Y[1],K=Object(s.useState)(),Q=Object(o.a)(K,2),X=Q[0],ee=Q[1],te=Object(R.a)(),ne=te.firebaseRegister,re=te.firebaseGoogleSignIn,ae=function(){var e=Object(i.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,re();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.error(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}(),ce=function(){G(!_)},ie=function(e){e.preventDefault()},oe=function(e){var t=Object(V.b)(e);$(t),ee(Object(V.a)(t))};return Object(s.useEffect)((function(){oe("123456")}),[]),Object(H.jsxs)(H.Fragment,{children:[Object(H.jsxs)(j.a,{container:!0,direction:"column",justifyContent:"center",spacing:2,children:[Object(H.jsx)(j.a,{item:!0,xs:12,children:Object(H.jsx)(D.a,{children:Object(H.jsxs)(m.a,{variant:"outlined",fullWidth:!0,onClick:ae,size:"large",sx:{color:"grey.700",backgroundColor:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],borderColor:"dark"===n.palette.mode?n.palette.dark.light+20:n.palette.grey[100]},children:[Object(H.jsx)(x.a,{sx:{mr:{xs:1,sm:2,width:20}},children:Object(H.jsx)("img",{src:B.a,alt:"google",width:16,height:16,style:{marginRight:E?8:16}})}),"Registrarme con Google"]})})}),Object(H.jsx)(j.a,{item:!0,xs:12,children:Object(H.jsxs)(x.a,{sx:{alignItems:"center",display:"flex"},children:[Object(H.jsx)(h.a,{sx:{flexGrow:1},orientation:"horizontal"}),Object(H.jsx)(m.a,{variant:"outlined",sx:{cursor:"unset",m:.5,py:.5,px:5,borderColor:"dark"===n.palette.mode?"".concat(n.palette.dark.light+20," !important"):"".concat(n.palette.grey[100]," !important"),color:"".concat(n.palette.grey[900],"!important"),fontWeight:500,borderRadius:"".concat(A.borderRadius,"px")},disableRipple:!0,disabled:!0,children:"O"}),Object(H.jsx)(h.a,{sx:{flexGrow:1},orientation:"horizontal"})]})}),Object(H.jsx)(j.a,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:Object(H.jsx)(x.a,{sx:{mb:2},children:Object(H.jsx)(p.a,{variant:"subtitle1",children:"Registrarme con la direcci\xf3n de correo electr\xf3nico"})})})]}),Object(H.jsx)(S.b,{initialValues:{email:"",password:"",submit:null},validationSchema:z.b().shape({email:z.d().email("Must be a valid email").max(255).required("Email is required"),password:z.d().max(255).required("Password is required")}),onSubmit:function(){var e=Object(i.a)(c.a.mark((function e(t,n){var r,i,o,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.setErrors,i=n.setStatus,o=n.setSubmitting,e.prev=1,e.next=4,ne(t.email,t.password).then((function(e){return e}),(function(e){a.current&&(i({success:!1}),r({submit:e.message}),o(!1))}));case 4:s=e.sent,"visitante",M.a.firestore().doc("Usuarios/".concat(s.user.uid)).set({correo:t.email,rol:"visitante"}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),console.error(e.t0),a.current&&(i({success:!1}),r({submit:e.t0.message}),o(!1));case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var a=e.errors,c=e.handleBlur,i=e.handleChange,o=e.handleSubmit,s=e.isSubmitting,d=e.touched,u=e.values;return Object(H.jsxs)("form",Object(r.a)(Object(r.a)({noValidate:!0,onSubmit:o},t),{},{children:[Object(H.jsxs)(O.a,{fullWidth:!0,error:Boolean(d.email&&a.email),sx:Object(r.a)({},n.typography.customInput),children:[Object(H.jsx)(f.a,{htmlFor:"outlined-adornment-email-register",children:"Direcci\xf3n de Correo Electr\xf3nico / Usuario"}),Object(H.jsx)(v.a,{id:"outlined-adornment-email-register",type:"email",value:u.email,name:"email",onBlur:c,onChange:i,inputProps:{}}),d.email&&a.email&&Object(H.jsx)(g.a,{error:!0,id:"standard-weight-helper-text--register",children:a.email})]}),Object(H.jsxs)(O.a,{fullWidth:!0,error:Boolean(d.password&&a.password),sx:Object(r.a)({},n.typography.customInput),children:[Object(H.jsx)(f.a,{htmlFor:"outlined-adornment-password-register",children:"Contrase\xf1a"}),Object(H.jsx)(v.a,{id:"outlined-adornment-password-register",type:_?"text":"password",value:u.password,name:"password",label:"Contrase\xf1a",onBlur:c,onChange:function(e){i(e),oe(e.target.value)},endAdornment:Object(H.jsx)(y.a,{position:"end",children:Object(H.jsx)(w.a,{"aria-label":"toggle password visibility",onClick:ce,onMouseDown:ie,edge:"end",size:"large",children:_?Object(H.jsx)(P.a,{}):Object(H.jsx)(F.a,{})})}),inputProps:{}}),d.password&&a.password&&Object(H.jsx)(g.a,{error:!0,id:"standard-weight-helper-text-password-register",children:a.password})]}),0!==Z&&Object(H.jsx)(O.a,{fullWidth:!0,children:Object(H.jsx)(x.a,{sx:{mb:2},children:Object(H.jsxs)(j.a,{container:!0,spacing:2,alignItems:"center",children:[Object(H.jsx)(j.a,{item:!0,children:Object(H.jsx)(x.a,{style:{backgroundColor:null===X||void 0===X?void 0:X.color},sx:{width:85,height:8,borderRadius:"7px"}})}),Object(H.jsx)(j.a,{item:!0,children:Object(H.jsx)(p.a,{variant:"subtitle1",fontSize:"0.75rem",children:null===X||void 0===X?void 0:X.label})})]})})}),Object(H.jsx)(j.a,{container:!0,alignItems:"center",justifyContent:"space-between",children:Object(H.jsx)(j.a,{item:!0,children:Object(H.jsx)(k.a,{control:Object(H.jsx)(C.a,{checked:T,onChange:function(e){return J(e.target.checked)},name:"checked",color:"primary"}),label:Object(H.jsxs)(p.a,{variant:"subtitle1",children:["Acepto los \xa0",Object(H.jsx)(p.a,{variant:"subtitle1",component:l.b,to:"#",children:"Terminos & Codiciones."})]})})})}),a.submit&&Object(H.jsx)(x.a,{sx:{mt:3},children:Object(H.jsx)(g.a,{error:!0,children:a.submit})}),Object(H.jsx)(x.a,{sx:{mt:2},children:Object(H.jsx)(D.a,{children:Object(H.jsx)(m.a,{disableElevation:!0,disabled:s,fullWidth:!0,size:"large",type:"submit",variant:"contained",sx:{background:"#E31937"},children:"Registrarme"})})})]}))}})]})}},1683:function(e,t,n){"use strict";n.r(t);var r=n(32),a=n(33),c=n(605),i=n(61),o=n(552),s=n(99),l=n(339),d=n(856),u=n(832),b=n(170),j=n(1041),m=n(858),x=n(103),h=n(335),p=n(1),O=Object(h.a)({palette:{primary:{main:"#E31937"}}});t.default=function(){var e=Object(a.a)(),t=Object(x.a)().isLoggedIn,n=Object(c.a)(e.breakpoints.down("md"));return Object(p.jsx)(d.a,{children:Object(p.jsxs)(i.a,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[Object(p.jsx)(i.a,{item:!0,xs:12,children:Object(p.jsx)(i.a,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:Object(p.jsx)(i.a,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:Object(p.jsx)(u.a,{children:Object(p.jsxs)(i.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[Object(p.jsx)(i.a,{item:!0,sx:{mb:.5},children:Object(p.jsx)(r.b,{to:"#",children:Object(p.jsx)(b.a,{})})}),Object(p.jsx)(i.a,{item:!0,xs:12,children:Object(p.jsx)(i.a,{container:!0,direction:n?"column-reverse":"row",alignItems:"center",justifyContent:"center",children:Object(p.jsx)(i.a,{item:!0,children:Object(p.jsxs)(o.a,{alignItems:"center",justifyContent:"center",spacing:1,children:[Object(p.jsx)(s.a,{color:O.palette.primary.main,gutterBottom:!0,variant:n?"h3":"h2",children:"Registrarme"}),Object(p.jsx)(s.a,{variant:"caption",fontSize:"16px",textAlign:n?"center":"inherit",children:"Ingrese sus credenciales para continuar"})]})})})}),Object(p.jsx)(i.a,{item:!0,xs:12,children:Object(p.jsx)(j.a,{})}),Object(p.jsx)(i.a,{item:!0,xs:12,children:Object(p.jsx)(l.a,{})}),Object(p.jsx)(i.a,{item:!0,xs:12,children:Object(p.jsx)(i.a,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:Object(p.jsx)(s.a,{component:r.b,to:t?"/pages/login/login3":"/login",variant:"subtitle1",sx:{textDecoration:"none"},children:"\xbfYa tienes una cuenta?"})})})]})})})})}),Object(p.jsx)(i.a,{item:!0,xs:12,sx:{m:3,mt:1},children:Object(p.jsx)(m.a,{})})]})})}},824:function(e,t,n){"use strict";var r=n(5),a=n(7),c=n(3),i=n(0),o=n(115),s=n(98),l=n(169),d=n(35),u=n(1),b=Object(d.a)(Object(u.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),j=Object(d.a)(Object(u.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),m=Object(d.a)(Object(u.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),x=n(9),h=n(11),p=n(6),O=n(85),f=n(92);function v(e){return Object(O.a)("MuiCheckbox",e)}var g=Object(f.a)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),y=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],w=Object(p.a)(l.a,{shouldForwardProp:function(e){return Object(p.b)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.indeterminate&&t.indeterminate,"default"!==n.color&&t["color".concat(Object(x.a)(n.color))]]}})((function(e){var t,n=e.theme,a=e.ownerState;return Object(c.a)({color:n.palette.text.secondary},!a.disableRipple&&{"&:hover":{backgroundColor:Object(s.a)("default"===a.color?n.palette.action.active:n.palette[a.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==a.color&&(t={},Object(r.a)(t,"&.".concat(g.checked,", &.").concat(g.indeterminate),{color:n.palette[a.color].main}),Object(r.a)(t,"&.".concat(g.disabled),{color:n.palette.action.disabled}),t))})),k=Object(u.jsx)(j,{}),C=Object(u.jsx)(b,{}),z=Object(u.jsx)(m,{}),S=i.forwardRef((function(e,t){var n,r,s=Object(h.a)({props:e,name:"MuiCheckbox"}),l=s.checkedIcon,d=void 0===l?k:l,b=s.color,j=void 0===b?"primary":b,m=s.icon,p=void 0===m?C:m,O=s.indeterminate,f=void 0!==O&&O,g=s.indeterminateIcon,S=void 0===g?z:g,M=s.inputProps,R=s.size,I=void 0===R?"medium":R,B=Object(a.a)(s,y),D=f?S:p,V=f?S:d,E=Object(c.a)({},s,{color:j,indeterminate:f,size:I}),P=function(e){var t=e.classes,n=e.indeterminate,r=e.color,a={root:["root",n&&"indeterminate","color".concat(Object(x.a)(r))]},i=Object(o.a)(a,v,t);return Object(c.a)({},t,i)}(E);return Object(u.jsx)(w,Object(c.a)({type:"checkbox",inputProps:Object(c.a)({"data-indeterminate":f},M),icon:i.cloneElement(D,{fontSize:null!=(n=D.props.fontSize)?n:I}),checkedIcon:i.cloneElement(V,{fontSize:null!=(r=V.props.fontSize)?r:I}),ownerState:E,ref:t},B,{classes:P}))}));t.a=S},832:function(e,t,n){"use strict";var r=n(4),a=n(101),c=n(163),i=n(102),o=n(1),s=["children"];t.a=function(e){var t=e.children,n=Object(a.a)(e,s);return Object(o.jsx)(i.a,Object(r.a)(Object(r.a)({sx:{maxWidth:{xs:400,lg:500},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1},n),{},{children:Object(o.jsx)(c.a,{sx:{p:{xs:2,sm:3,xl:5}},children:t})}))}},856:function(e,t,n){"use strict";var r=n(6),a=Object(r.a)("div")((function(e){var t=e.theme;return{backgroundColor:"dark"===t.palette.mode?t.palette.background.default:t.palette.grey[300],minHeight:"100vh"}}));t.a=a},857:function(e,t,n){"use strict";var r=n(0);t.a=function(){var e=Object(r.useRef)(!0);return Object(r.useEffect)((function(){return function(){e.current=!1}}),[]),e}},858:function(e,t,n){"use strict";var r=n(552),a=n(99),c=n(872),i=n(1);t.a=function(){return Object(i.jsxs)(r.a,{direction:"row",justifyContent:"space-between",children:[Object(i.jsx)(a.a,{variant:"subtitle2",component:c.a,href:"https://www.drummondltd.com/",target:"_blank",underline:"hover",children:"www.drummondltd.com"}),Object(i.jsx)(a.a,{variant:"subtitle2",component:c.a,href:"https://www.drummondltd.com/",target:"_blank",underline:"hover",children:"\xa9\ufe0f Copyright 2022 Drummond Ltd. Colombia - V 4.0 \xa9\ufe0f 2024"})]})}},864:function(e,t,n){"use strict";var r=n(100);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(127)),c=n(1),i=(0,a.default)((0,c.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.default=i},868:function(e,t,n){"use strict";var r=n(100);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(127)),c=n(1),i=(0,a.default)((0,c.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.default=i},872:function(e,t,n){"use strict";var r=n(18),a=n(10),c=n(5),i=n(7),o=n(3),s=n(0),l=n(8),d=n(115),u=n(16),b=n(98),j=n(9),m=n(6),x=n(11),h=n(133),p=n(23),O=n(99),f=n(85),v=n(92);function g(e){return Object(f.a)("MuiLink",e)}var y=Object(v.a)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),w=n(1),k=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],C={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},z=Object(m.a)(O.a,{name:"MuiLink",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["underline".concat(Object(j.a)(n.underline))],"button"===n.component&&t.button]}})((function(e){var t=e.theme,n=e.ownerState,r=Object(u.b)(t,"palette.".concat(function(e){return C[e]||e}(n.color)))||n.color;return Object(o.a)({},"none"===n.underline&&{textDecoration:"none"},"hover"===n.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===n.underline&&{textDecoration:"underline",textDecorationColor:"inherit"!==r?Object(b.a)(r,.4):void 0,"&:hover":{textDecorationColor:"inherit"}},"button"===n.component&&Object(c.a)({position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"}},"&.".concat(y.focusVisible),{outline:"auto"}))})),S=s.forwardRef((function(e,t){var n=Object(x.a)({props:e,name:"MuiLink"}),c=n.className,u=n.color,b=void 0===u?"primary":u,m=n.component,O=void 0===m?"a":m,f=n.onBlur,v=n.onFocus,y=n.TypographyClasses,S=n.underline,M=void 0===S?"always":S,R=n.variant,I=void 0===R?"inherit":R,B=n.sx,D=Object(i.a)(n,k),V=Object(h.a)(),E=V.isFocusVisibleRef,P=V.onBlur,A=V.onFocus,F=V.ref,H=s.useState(!1),L=Object(a.a)(H,2),W=L[0],_=L[1],G=Object(p.a)(t,F),N=Object(o.a)({},n,{color:b,component:O,focusVisible:W,underline:M,variant:I}),q=function(e){var t=e.classes,n=e.component,r=e.focusVisible,a=e.underline,c={root:["root","underline".concat(Object(j.a)(a)),"button"===n&&"button",r&&"focusVisible"]};return Object(d.a)(c,g,t)}(N);return Object(w.jsx)(z,Object(o.a)({color:b,className:Object(l.a)(q.root,c),classes:y,component:O,onBlur:function(e){P(e),!1===E.current&&_(!1),f&&f(e)},onFocus:function(e){A(e),!0===E.current&&_(!0),v&&v(e)},ref:G,ownerState:N,variant:I,sx:[].concat(Object(r.a)(Object.keys(C).includes(b)?[]:[{color:b}]),Object(r.a)(Array.isArray(B)?B:[B]))},D))}));t.a=S},907:function(e,t,n){"use strict";t.a=n.p+"static/media/social-google.a57081bd.svg"},908:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return i}));var r=n(31),a=n.n(r),c=function(e){return e<2?{label:"Deficiente",color:a.a.errorMain}:e<3?{label:"D\xe9bil",color:a.a.warningDark}:e<4?{label:"Normal",color:a.a.orangeMain}:e<5?{label:"Buena",color:a.a.successMain}:e<6?{label:"Fuerte",color:a.a.successDark}:{label:"Deficiente",color:a.a.errorMain}},i=function(e){var t=0;return e.length>5&&(t+=1),e.length>7&&(t+=1),function(e){return new RegExp(/[0-9]/).test(e)}(e)&&(t+=1),function(e){return new RegExp(/[!#@$%^&*)(+=._-]/).test(e)}(e)&&(t+=1),function(e){return new RegExp(/[a-z]/).test(e)&&new RegExp(/[A-Z]/).test(e)}(e)&&(t+=1),t}}}]);
//# sourceMappingURL=14.a3d464d9.chunk.js.map