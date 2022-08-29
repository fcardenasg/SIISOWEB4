(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[16],{1040:function(e,t,n){"use strict";var r=n(4),a=n(45),o=n.n(a),c=n(66),i=n(10),s=n(101),l=n(0),d=n(24),u=n(32),b=n(25),j=n(33),m=n(605),p=n(61),x=n(638),h=n(163),O=n(339),f=n(99),v=n(237),g=n(639),w=n(630),y=n(642),k=n(631),C=n(564),S=n(552),z=n(147),I=n(824),M=n(690),B=n(869),R=n(75),P=n(103),E=n(857),V=n(128),D=n(864),A=n.n(D),H=n(868),F=n.n(H),L=n(907),W=n(1),N=["loginProp"];t.a=function(e){var t=e.loginProp,n=Object(s.a)(e,N),a=Object(j.a)(),D=Object(E.a)(),H=Object(m.a)(a.breakpoints.down("md")),G=Object(d.d)((function(e){return e.customization})),_=Object(l.useState)(!0),q=Object(i.a)(_,2),T=q[0],U=q[1],J=Object(b.e)(),K=Object(P.a)(),Q=K.firebaseEmailPasswordSignIn,X=K.firebaseGoogleSignIn,Y=function(){var e=Object(c.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,X();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.error(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}(),Z=Object(l.useState)(!1),$=Object(i.a)(Z,2),ee=$[0],te=$[1],ne=function(){te(!ee)},re=function(e){e.preventDefault()};return Object(W.jsxs)(W.Fragment,{children:[Object(W.jsxs)(p.a,{container:!0,direction:"column",justifyContent:"center",spacing:2,children:[Object(W.jsx)(p.a,{item:!0,xs:12,children:Object(W.jsx)(V.a,{children:Object(W.jsxs)(x.a,{disableElevation:!0,fullWidth:!0,onClick:Y,size:"large",variant:"outlined",sx:{color:"grey.700",backgroundColor:"dark"===a.palette.mode?a.palette.dark.main:a.palette.grey[50],borderColor:"dark"===a.palette.mode?a.palette.dark.light+20:a.palette.grey[100]},children:[Object(W.jsx)(h.a,{sx:{mr:{xs:1,sm:2,width:20}},children:Object(W.jsx)("img",{src:L.a,alt:"google",width:16,height:16,style:{marginRight:H?8:16}})}),"Inicia Sesi\xf3n Con Google"]})})}),Object(W.jsx)(p.a,{item:!0,xs:12,children:Object(W.jsxs)(h.a,{sx:{alignItems:"center",display:"flex"},children:[Object(W.jsx)(O.a,{sx:{flexGrow:1},orientation:"horizontal"}),Object(W.jsx)(x.a,{variant:"outlined",sx:{cursor:"unset",m:.5,py:.5,px:5,borderColor:"dark"===a.palette.mode?"".concat(a.palette.dark.light+20," !important"):"".concat(a.palette.grey[100]," !important"),color:"".concat(a.palette.grey[900],"!important"),fontWeight:500,borderRadius:"".concat(G.borderRadius,"px")},disableRipple:!0,disabled:!0,children:"O"}),Object(W.jsx)(O.a,{sx:{flexGrow:1},orientation:"horizontal"})]})}),Object(W.jsx)(p.a,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:Object(W.jsx)(h.a,{sx:{mb:2},children:Object(W.jsx)(f.a,{variant:"subtitle1",children:"Iniciar Sesi\xf3n con Direcci\xf3n de Correo Electr\xf3nico"})})})]}),Object(W.jsx)(B.b,{initialValues:{email:"correovisitante@gmail.com",password:"123456",submit:null},validationSchema:M.b().shape({email:M.d().email("Must be a valid email").max(255).required("Email is required"),password:M.d().max(255).required("Password is required")}),onSubmit:function(){var e=Object(c.a)(o.a.mark((function e(t,n){var r,a,c,i,s,l,d;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.setErrors,a=n.setStatus,c=n.setSubmitting,e.prev=1,e.next=4,Q(t.email,t.password).then((function(e){return e}),(function(e){D.current&&(a({success:!1}),r({submit:e.message}),c(!1))}));case 4:return i=e.sent,s=R.a.firestore().doc("Usuarios/".concat(i.user.uid)),e.next=8,s.get().then((function(e){if(e.exists)return e.data();console.log("No such document!")})).catch((function(e){console.log("Error getting document:",e)}));case 8:l=e.sent,"visitante"===(d={uid:i.user.uid,email:i.user.email,rol:l.rol}).rol?J("/dashboard/questionnaire",{replace:!0}):"admin"===d.rol&&J("/dashboard/select",{replace:!0}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),console.error(e.t0),D.current&&(a({success:!1}),r({submit:e.t0.message}),c(!1));case 17:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var o=e.errors,c=e.handleBlur,i=e.handleChange,s=e.handleSubmit,l=e.isSubmitting,d=e.touched,b=e.values;return Object(W.jsxs)("form",Object(r.a)(Object(r.a)({noValidate:!0,onSubmit:s},n),{},{children:[Object(W.jsxs)(v.a,{fullWidth:!0,error:Boolean(d.email&&o.email),sx:Object(r.a)({},a.typography.customInput),children:[Object(W.jsx)(g.a,{htmlFor:"outlined-adornment-email-login",children:"Email Address / Username"}),Object(W.jsx)(w.a,{id:"outlined-adornment-email-login",type:"email",value:b.email,name:"email",onBlur:c,onChange:i,label:"Email Address / Username",inputProps:{}}),d.email&&o.email&&Object(W.jsx)(y.a,{error:!0,id:"standard-weight-helper-text-email-login",children:o.email})]}),Object(W.jsxs)(v.a,{fullWidth:!0,error:Boolean(d.password&&o.password),sx:Object(r.a)({},a.typography.customInput),children:[Object(W.jsx)(g.a,{htmlFor:"outlined-adornment-password-login",children:"Password"}),Object(W.jsx)(w.a,{id:"outlined-adornment-password-login",type:ee?"text":"password",value:b.password,name:"password",onBlur:c,onChange:i,endAdornment:Object(W.jsx)(k.a,{position:"end",children:Object(W.jsx)(C.a,{"aria-label":"toggle password visibility",onClick:ne,onMouseDown:re,edge:"end",size:"large",children:ee?Object(W.jsx)(A.a,{}):Object(W.jsx)(F.a,{})})}),label:"Password",inputProps:{}}),d.password&&o.password&&Object(W.jsx)(y.a,{error:!0,id:"standard-weight-helper-text-password-login",children:o.password})]}),Object(W.jsxs)(S.a,{direction:"row",alignItems:"center",justifyContent:"space-between",spacing:1,children:[Object(W.jsx)(z.a,{control:Object(W.jsx)(I.a,{checked:T,onChange:function(e){return U(e.target.checked)},name:"checked",sx:{color:"#0072BC"}}),label:"Recu\xe9rdame"}),Object(W.jsx)(f.a,{variant:"subtitle1",component:u.b,to:t?"/pages/forgot-password/forgot-password".concat(t):"/pages/forgot-password/forgot-password3",sx:{textDecoration:"none",color:"#0072BC"},children:"\xbfHas olvidado tu contrase\xf1a?"})]}),o.submit&&Object(W.jsx)(h.a,{sx:{mt:3},children:Object(W.jsx)(y.a,{error:!0,children:o.submit})}),Object(W.jsx)(h.a,{sx:{mt:2},children:Object(W.jsx)(V.a,{children:Object(W.jsx)(x.a,{id:"buttonlogin",disableElevation:!0,disabled:l,fullWidth:!0,size:"large",type:"submit",variant:"contained",sx:{background:"#E31937"},children:"INGRESAR"})})})]}))}})]})}},1682:function(e,t,n){"use strict";n.r(t);var r=n(32),a=n(33),o=n(605),c=n(61),i=n(552),s=n(99),l=n(339),d=n(856),u=n(832),b=n(1040),j=n(170),m=n(858),p=n(103),x=n(335),h=n(1),O=Object(x.a)({palette:{primary:{main:"#E31937"}}});t.default=function(){var e=Object(a.a)(),t=Object(p.a)().isLoggedIn,n=Object(o.a)(e.breakpoints.down("md"));return Object(h.jsx)(d.a,{children:Object(h.jsxs)(c.a,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[Object(h.jsx)(c.a,{item:!0,xs:12,children:Object(h.jsx)(c.a,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:Object(h.jsx)(c.a,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:Object(h.jsx)(u.a,{children:Object(h.jsxs)(c.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[Object(h.jsx)(c.a,{item:!0,sx:{mb:.5},children:Object(h.jsx)(r.b,{to:"#",children:Object(h.jsx)(j.a,{})})}),Object(h.jsx)(c.a,{item:!0,xs:12,children:Object(h.jsx)(c.a,{container:!0,direction:n?"column-reverse":"row",alignItems:"center",justifyContent:"center",children:Object(h.jsx)(c.a,{item:!0,children:Object(h.jsxs)(i.a,{alignItems:"center",justifyContent:"center",spacing:1,children:[Object(h.jsx)(s.a,{color:O.palette.primary.main,gutterBottom:!0,variant:n?"h3":"h2",children:"\xa1Te damos la bienvenida a SIISO!"}),Object(h.jsx)(s.a,{variant:"caption",fontSize:"16px",textAlign:n?"center":"inherit",children:"Ingrese sus credenciales para continuar"})]})})})}),Object(h.jsx)(c.a,{item:!0,xs:12,children:Object(h.jsx)(b.a,{})}),Object(h.jsx)(c.a,{item:!0,xs:12,children:Object(h.jsx)(l.a,{})}),Object(h.jsx)(c.a,{item:!0,xs:12,children:Object(h.jsx)(c.a,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:Object(h.jsx)(s.a,{component:r.b,to:t?"/pages/register/register3":"/register",variant:"subtitle1",sx:{textDecoration:"none"},children:"\xbfNo tienes una cuenta?"})})})]})})})})}),Object(h.jsx)(c.a,{item:!0,xs:12,sx:{m:3,mt:1},children:Object(h.jsx)(m.a,{})})]})})}},824:function(e,t,n){"use strict";var r=n(5),a=n(7),o=n(3),c=n(0),i=n(115),s=n(98),l=n(169),d=n(35),u=n(1),b=Object(d.a)(Object(u.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),j=Object(d.a)(Object(u.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),m=Object(d.a)(Object(u.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),p=n(9),x=n(11),h=n(6),O=n(85),f=n(92);function v(e){return Object(O.a)("MuiCheckbox",e)}var g=Object(f.a)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),w=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],y=Object(h.a)(l.a,{shouldForwardProp:function(e){return Object(h.b)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.indeterminate&&t.indeterminate,"default"!==n.color&&t["color".concat(Object(p.a)(n.color))]]}})((function(e){var t,n=e.theme,a=e.ownerState;return Object(o.a)({color:n.palette.text.secondary},!a.disableRipple&&{"&:hover":{backgroundColor:Object(s.a)("default"===a.color?n.palette.action.active:n.palette[a.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==a.color&&(t={},Object(r.a)(t,"&.".concat(g.checked,", &.").concat(g.indeterminate),{color:n.palette[a.color].main}),Object(r.a)(t,"&.".concat(g.disabled),{color:n.palette.action.disabled}),t))})),k=Object(u.jsx)(j,{}),C=Object(u.jsx)(b,{}),S=Object(u.jsx)(m,{}),z=c.forwardRef((function(e,t){var n,r,s=Object(x.a)({props:e,name:"MuiCheckbox"}),l=s.checkedIcon,d=void 0===l?k:l,b=s.color,j=void 0===b?"primary":b,m=s.icon,h=void 0===m?C:m,O=s.indeterminate,f=void 0!==O&&O,g=s.indeterminateIcon,z=void 0===g?S:g,I=s.inputProps,M=s.size,B=void 0===M?"medium":M,R=Object(a.a)(s,w),P=f?z:h,E=f?z:d,V=Object(o.a)({},s,{color:j,indeterminate:f,size:B}),D=function(e){var t=e.classes,n=e.indeterminate,r=e.color,a={root:["root",n&&"indeterminate","color".concat(Object(p.a)(r))]},c=Object(i.a)(a,v,t);return Object(o.a)({},t,c)}(V);return Object(u.jsx)(y,Object(o.a)({type:"checkbox",inputProps:Object(o.a)({"data-indeterminate":f},I),icon:c.cloneElement(P,{fontSize:null!=(n=P.props.fontSize)?n:B}),checkedIcon:c.cloneElement(E,{fontSize:null!=(r=E.props.fontSize)?r:B}),ownerState:V,ref:t},R,{classes:D}))}));t.a=z},832:function(e,t,n){"use strict";var r=n(4),a=n(101),o=n(163),c=n(102),i=n(1),s=["children"];t.a=function(e){var t=e.children,n=Object(a.a)(e,s);return Object(i.jsx)(c.a,Object(r.a)(Object(r.a)({sx:{maxWidth:{xs:400,lg:500},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1},n),{},{children:Object(i.jsx)(o.a,{sx:{p:{xs:2,sm:3,xl:5}},children:t})}))}},856:function(e,t,n){"use strict";var r=n(6),a=Object(r.a)("div")((function(e){var t=e.theme;return{backgroundColor:"dark"===t.palette.mode?t.palette.background.default:t.palette.grey[300],minHeight:"100vh"}}));t.a=a},857:function(e,t,n){"use strict";var r=n(0);t.a=function(){var e=Object(r.useRef)(!0);return Object(r.useEffect)((function(){return function(){e.current=!1}}),[]),e}},858:function(e,t,n){"use strict";var r=n(552),a=n(99),o=n(872),c=n(1);t.a=function(){return Object(c.jsxs)(r.a,{direction:"row",justifyContent:"space-between",children:[Object(c.jsx)(a.a,{variant:"subtitle2",component:o.a,href:"https://www.drummondltd.com/",target:"_blank",underline:"hover",children:"www.drummondltd.com"}),Object(c.jsx)(a.a,{variant:"subtitle2",component:o.a,href:"https://www.drummondltd.com/",target:"_blank",underline:"hover",children:"\xa9\ufe0f Copyright 2022 Drummond Ltd. Colombia - V 4.0 \xa9\ufe0f 2024"})]})}},864:function(e,t,n){"use strict";var r=n(100);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(127)),o=n(1),c=(0,a.default)((0,o.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.default=c},868:function(e,t,n){"use strict";var r=n(100);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(127)),o=n(1),c=(0,a.default)((0,o.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.default=c},872:function(e,t,n){"use strict";var r=n(18),a=n(10),o=n(5),c=n(7),i=n(3),s=n(0),l=n(8),d=n(115),u=n(16),b=n(98),j=n(9),m=n(6),p=n(11),x=n(133),h=n(23),O=n(99),f=n(85),v=n(92);function g(e){return Object(f.a)("MuiLink",e)}var w=Object(v.a)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),y=n(1),k=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],C={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},S=Object(m.a)(O.a,{name:"MuiLink",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["underline".concat(Object(j.a)(n.underline))],"button"===n.component&&t.button]}})((function(e){var t=e.theme,n=e.ownerState,r=Object(u.b)(t,"palette.".concat(function(e){return C[e]||e}(n.color)))||n.color;return Object(i.a)({},"none"===n.underline&&{textDecoration:"none"},"hover"===n.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===n.underline&&{textDecoration:"underline",textDecorationColor:"inherit"!==r?Object(b.a)(r,.4):void 0,"&:hover":{textDecorationColor:"inherit"}},"button"===n.component&&Object(o.a)({position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"}},"&.".concat(w.focusVisible),{outline:"auto"}))})),z=s.forwardRef((function(e,t){var n=Object(p.a)({props:e,name:"MuiLink"}),o=n.className,u=n.color,b=void 0===u?"primary":u,m=n.component,O=void 0===m?"a":m,f=n.onBlur,v=n.onFocus,w=n.TypographyClasses,z=n.underline,I=void 0===z?"always":z,M=n.variant,B=void 0===M?"inherit":M,R=n.sx,P=Object(c.a)(n,k),E=Object(x.a)(),V=E.isFocusVisibleRef,D=E.onBlur,A=E.onFocus,H=E.ref,F=s.useState(!1),L=Object(a.a)(F,2),W=L[0],N=L[1],G=Object(h.a)(t,H),_=Object(i.a)({},n,{color:b,component:O,focusVisible:W,underline:I,variant:B}),q=function(e){var t=e.classes,n=e.component,r=e.focusVisible,a=e.underline,o={root:["root","underline".concat(Object(j.a)(a)),"button"===n&&"button",r&&"focusVisible"]};return Object(d.a)(o,g,t)}(_);return Object(y.jsx)(S,Object(i.a)({color:b,className:Object(l.a)(q.root,o),classes:w,component:O,onBlur:function(e){D(e),!1===V.current&&N(!1),f&&f(e)},onFocus:function(e){A(e),!0===V.current&&N(!0),v&&v(e)},ref:G,ownerState:_,variant:B,sx:[].concat(Object(r.a)(Object.keys(C).includes(b)?[]:[{color:b}]),Object(r.a)(Array.isArray(R)?R:[R]))},P))}));t.a=z},907:function(e,t,n){"use strict";t.a=n.p+"static/media/social-google.a57081bd.svg"}}]);
//# sourceMappingURL=16.5d156234.chunk.js.map