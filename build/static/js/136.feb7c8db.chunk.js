(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[136],{1115:function(e,t,r){"use strict";function n(e,t,r,n,a,c,i){return{nombre:e,codigo:t,idTipoCatalogo:r,usuarioRegistro:n,fechaRegistro:a,usuarioModifico:c,fechaModifico:i}}function a(e,t,r,n,a,c,i,o){return{idCatalogo:e,nombre:t,codigo:r,idTipoCatalogo:n,usuarioRegistro:a,fechaRegistro:c,usuarioModifico:i,fechaModifico:o}}r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return a}))},1581:function(e,t,r){"use strict";r.r(t);var n=r(4),a=r(45),c=r.n(a),i=r(66),o=r(10),s=r(0),u=r(33),l=r(605),d=r(61),b=r(638),p=r(25),f=r(690),j=r(647),O=r(668),m=r(649),v=r(103),h=r(656),g=r(663),x=r(884),y=r(1115),C=r(655),w=r(661),k=r(648),T=r(102),S=r(128),V=r(1),z=f.b().shape({nombre:f.d().required("".concat(k.f.Requerido)),codigo:f.d().required("".concat(k.f.Requerido)),idTipoCatalogo:f.d().required("".concat(k.f.Requerido))});t.default=function(){var e=Object(v.a)().user,t=Object(p.e)(),r=Object(u.a)(),a=Object(l.a)(r.breakpoints.down("md")),f=Object(s.useState)([]),M=Object(o.a)(f,2),R=M[0],I=M[1],G=Object(s.useState)(!1),q=Object(o.a)(G,2),W=q[0],D=q[1],N=Object(s.useState)(!1),B=Object(o.a)(N,2),E=B[0],H=B[1],P=Object(s.useState)(""),F=Object(o.a)(P,2),L=F[0],A=F[1],U=Object(j.f)({resolver:Object(O.a)(z)}),J=U.handleSubmit,K=U.errors,Q=U.reset;Object(s.useEffect)((function(){function e(){return(e=Object(i.a)(c.a.mark((function e(){var t,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(x.b)(0,0);case 3:t=e.sent,r=t.data.entities.map((function(e){return{value:e.id,label:e.nombre}})),I(r),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var X=function(){var t=Object(i.a)(c.a.mark((function t(r){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,n=Object(y.a)(r.nombre,r.codigo,r.idTipoCatalogo,e.email,Object(m.b)(new Date),"",Object(m.b)(new Date)),!Object.keys(0!==r.length)){t.next=7;break}return t.next=5,Object(g.f)(n);case 5:200===t.sent.status&&(D(!0),Q());case 7:t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),H(!0),A("Este c\xf3digo ya existe");case 13:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}();return Object(V.jsxs)(T.a,{title:"Registrar Cat\xe1logo",children:[Object(V.jsx)(h.c,{open:W,onClose:function(){return D(!1)}}),Object(V.jsx)(h.b,{error:L,open:E,onClose:function(){return H(!1)}}),Object(V.jsxs)("form",{onSubmit:J(X),children:[Object(V.jsxs)(d.a,{container:!0,spacing:2,children:[Object(V.jsx)(d.a,{item:!0,xs:12,md:6,children:Object(V.jsx)(j.b,Object(n.a)(Object(n.a)({},U),{},{children:Object(V.jsx)(w.a,{name:"idTipoCatalogo",label:"Tipo Catalogo",defaultValue:"",options:R,size:a?"small":"medium",bug:K})}))}),Object(V.jsx)(d.a,{item:!0,xs:12,md:6,children:Object(V.jsx)(j.b,Object(n.a)(Object(n.a)({},U),{},{children:Object(V.jsx)(C.a,{defaultValue:"",fullWidth:!0,name:"codigo",label:"C\xf3digo",size:a?"small":"medium",bug:K})}))}),Object(V.jsx)(d.a,{item:!0,xs:12,children:Object(V.jsx)(j.b,Object(n.a)(Object(n.a)({},U),{},{children:Object(V.jsx)(C.a,{defaultValue:"",fullWidth:!0,name:"nombre",label:"Nombre",size:a?"small":"medium",bug:K})}))})]}),Object(V.jsx)(d.a,{item:!0,xs:12,sx:{pt:4},children:Object(V.jsxs)(d.a,{container:!0,spacing:2,children:[Object(V.jsx)(d.a,{item:!0,xs:6,children:Object(V.jsx)(S.a,{children:Object(V.jsx)(b.a,{variant:"contained",fullWidth:!0,type:"submit",children:k.e.Guardar})})}),Object(V.jsx)(d.a,{item:!0,xs:6,children:Object(V.jsx)(S.a,{children:Object(V.jsx)(b.a,{variant:"outlined",fullWidth:!0,onClick:function(){return t("/catalog/list")},children:k.e.Cancelar})})})]})})]})]})}},655:function(e,t,r){"use strict";var n=r(4),a=r(101),c=r(647),i=r(560),o=r(61),s=r(642),u=r(1),l=["bug","defaultValue","label","size","fullWidth","name","required"];t.a=function(e){var t=e.bug,r=e.defaultValue,d=e.label,b=e.size,p=(e.fullWidth,e.name),f=e.required,j=Object(a.a)(e,l);return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(c.a,{name:p,defaultValue:r,render:function(e){var r=e.field;return Object(u.jsx)(i.a,Object(n.a)(Object(n.a)({},r),{},{label:d,size:b,InputLabelProps:{className:f?"required-label":"",required:f||!1},error:!!t,fullWidth:!0},j))}}),t&&Object(u.jsx)(o.a,{item:!0,xs:12,children:Object(u.jsx)(s.a,{error:!0,children:t})})]})}},656:function(e,t,r){"use strict";r.d(t,"f",(function(){return d})),r.d(t,"e",(function(){return b})),r.d(t,"g",(function(){return p})),r.d(t,"c",(function(){return O})),r.d(t,"d",(function(){return m})),r.d(t,"a",(function(){return v})),r.d(t,"b",(function(){return h}));var n=r(4),a=r(0),c=r.n(a),i=r(548),o=r(619),s=r(648),u=r(624),l=r(1),d={title:"".concat(s.d.TituloEliminar),text:"".concat(s.d.TextoEliminar),icon:"error",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}},b={title:"".concat(s.d.TituloCerrarCaso),text:"".concat(s.d.TextoCerrarCaso),icon:"warning",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}},p={title:"".concat(s.d.TituloCargar),text:"".concat(s.d.TextoCargar),icon:"warning",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}};function f(e){return Object(l.jsx)(i.a,Object(n.a)(Object(n.a)({},e),{},{direction:"up"}))}var j=c.a.forwardRef((function(e,t){return Object(l.jsx)(o.a,Object(n.a)({elevation:6,ref:t,variant:"filled"},e))})),O=function(e){var t=e.open,r=e.onClose;return Object(l.jsx)(u.a,{TransitionComponent:f,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:t,autoHideDuration:2500,onClose:r,children:Object(l.jsx)(j,{severity:"success",sx:{width:"100%"},children:s.d.Guardar})},"alert")},m=function(e){var t=e.open,r=e.onClose;return Object(l.jsx)(u.a,{TransitionComponent:f,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:t,autoHideDuration:2500,onClose:r,children:Object(l.jsx)(j,{severity:"success",sx:{width:"100%"},children:s.d.Actualizar})},"alert")},v=function(e){var t=e.open,r=e.onClose;return Object(l.jsx)(u.a,{TransitionComponent:f,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:t,autoHideDuration:2500,onClose:r,children:Object(l.jsx)(j,{severity:"error",sx:{width:"100%"},children:s.d.Eliminar})},"alert")},h=function(e){var t=e.open,r=e.onClose,n=e.error;return Object(l.jsx)(u.a,{TransitionComponent:f,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:t,autoHideDuration:2e3,onClose:r,children:Object(l.jsx)(j,{severity:"error",sx:{width:"100%"},children:n})},"alert")}},661:function(e,t,r){"use strict";var n=r(4),a=r(101),c=r(647),i=r(237),o=r(639),s=r(621),u=r(833),l=r(61),d=r(642),b=r(1),p=["bug","options","size","defaultValue","label","name"];t.a=function(e){var t=e.bug,r=e.options,f=e.size,j=e.defaultValue,O=e.label,m=e.name,v=Object(a.a)(e,p),h=!1,g="";return t&&Object.prototype.hasOwnProperty.call(t,m)&&(h=!0,g=t[m].message),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(c.a,{name:m,defaultValue:j,render:function(e){var t=e.field;return Object(b.jsxs)(i.a,{fullWidth:!0,error:h,children:[Object(b.jsx)(o.a,{htmlFor:"my-input",id:"demo-simple-select-label",children:O}),Object(b.jsx)(s.a,Object(n.a)(Object(n.a)(Object(n.a)({},t),{},{labelId:"demo-simple-select-label",id:"demo-simple-select",label:O},v),{},{fullWidth:!0,size:f,children:r.map((function(e){return Object(b.jsx)(u.a,{value:e.value,children:e.label},e.value)}))}))]})}}),g&&Object(b.jsx)(l.a,{item:!0,xs:12,children:Object(b.jsx)(d.a,{error:!0,children:g})})]})}},663:function(e,t,r){"use strict";r.d(t,"d",(function(){return s})),r.d(t,"e",(function(){return u})),r.d(t,"f",(function(){return l})),r.d(t,"g",(function(){return d})),r.d(t,"a",(function(){return b})),r.d(t,"c",(function(){return p})),r.d(t,"b",(function(){return f}));var n=r(45),a=r.n(n),c=r(66),i=r(645),o=r(646),s=function(){var e=Object(c.a)(a.a.mark((function e(t,r){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.b)(i.a.Catalogo,{page:t,pageSize:r});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),u=function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.b)(i.a.CatalogoId,{id:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.c)(i.a.Catalogo,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.d)(i.a.Catalogo,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)(i.a.Catalogo,{idCatalogo:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(c.a)(a.a.mark((function e(t,r,n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.b)(i.a.GetAllByTipoCatalogo,{page:t,pageSize:r,idTipoCatalogo:n});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,r,n){return e.apply(this,arguments)}}(),f=function(){var e=Object(c.a)(a.a.mark((function e(t,r,n,c){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.b)(i.a.GetAllBySubTipoCatalogo,{page:t,pageSize:r,codigo:n,substring:c});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,r,n,a){return e.apply(this,arguments)}}()},668:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(647),a=function(e,t,r){if(e&&"reportValidity"in e){var a=Object(n.d)(r,t);e.setCustomValidity(a&&a.message||""),e.reportValidity()}},c=function(e,t){var r=function(r){var n=t.fields[r];n&&n.ref&&"reportValidity"in n.ref?a(n.ref,r,e):n.refs&&n.refs.forEach((function(t){return a(t,r,e)}))};for(var n in t.fields)r(n)},i=function(e,t){t.shouldUseNativeValidation&&c(e,t);var r={};for(var a in e){var i=Object(n.d)(t.fields,a);Object(n.e)(r,a,Object.assign(e[a],{ref:i&&i.ref}))}return r},o=function(e,t,r){return void 0===t&&(t={}),void 0===r&&(r={}),function(a,o,s){try{return Promise.resolve(function(n,i){try{var u=(t.context,Promise.resolve(e["sync"===r.mode?"validateSync":"validate"](a,Object.assign({abortEarly:!1},t,{context:o}))).then((function(e){return s.shouldUseNativeValidation&&c({},s),{values:e,errors:{}}})))}catch(l){return i(l)}return u&&u.then?u.then(void 0,i):u}(0,(function(e){if(!e.inner)throw e;return{values:{},errors:i((t=e,r=!s.shouldUseNativeValidation&&"all"===s.criteriaMode,(t.inner||[]).reduce((function(e,t){if(e[t.path]||(e[t.path]={message:t.message,type:t.type}),r){var a=e[t.path].types,c=a&&a[t.type];e[t.path]=Object(n.c)(t.path,r,e,t.type,c?[].concat(c,t.message):t.message)}return e}),{})),s)};var t,r})))}catch(u){return Promise.reject(u)}}}},833:function(e,t,r){"use strict";var n=r(5),a=r(7),c=r(3),i=r(0),o=r(8),s=r(115),u=r(98),l=r(6),d=r(11),b=r(52),p=r(342),f=r(69),j=r(23),O=r(332),m=r(333),v=r(194),h=r(85),g=r(92);function x(e){return Object(h.a)("MuiMenuItem",e)}var y=Object(g.a)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),C=r(1),w=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],k=Object(l.a)(p.a,{shouldForwardProp:function(e){return Object(l.b)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,r.dense&&t.dense,r.divider&&t.divider,!r.disableGutters&&t.gutters]}})((function(e){var t,r=e.theme,a=e.ownerState;return Object(c.a)({},r.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:"1px solid ".concat((r.vars||r).palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:(r.vars||r).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},Object(n.a)(t,"&.".concat(y.selected),Object(n.a)({backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / ").concat(r.vars.palette.action.selectedOpacity,")"):Object(u.a)(r.palette.primary.main,r.palette.action.selectedOpacity)},"&.".concat(y.focusVisible),{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / calc(").concat(r.vars.palette.action.selectedOpacity," + ").concat(r.vars.palette.action.focusOpacity,"))"):Object(u.a)(r.palette.primary.main,r.palette.action.selectedOpacity+r.palette.action.focusOpacity)})),Object(n.a)(t,"&.".concat(y.selected,":hover"),{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / calc(").concat(r.vars.palette.action.selectedOpacity," + ").concat(r.vars.palette.action.hoverOpacity,"))"):Object(u.a)(r.palette.primary.main,r.palette.action.selectedOpacity+r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / ").concat(r.vars.palette.action.selectedOpacity,")"):Object(u.a)(r.palette.primary.main,r.palette.action.selectedOpacity)}}),Object(n.a)(t,"&.".concat(y.focusVisible),{backgroundColor:(r.vars||r).palette.action.focus}),Object(n.a)(t,"&.".concat(y.disabled),{opacity:(r.vars||r).palette.action.disabledOpacity}),Object(n.a)(t,"& + .".concat(O.a.root),{marginTop:r.spacing(1),marginBottom:r.spacing(1)}),Object(n.a)(t,"& + .".concat(O.a.inset),{marginLeft:52}),Object(n.a)(t,"& .".concat(v.a.root),{marginTop:0,marginBottom:0}),Object(n.a)(t,"& .".concat(v.a.inset),{paddingLeft:36}),Object(n.a)(t,"& .".concat(m.a.root),{minWidth:36}),t),!a.dense&&Object(n.a)({},r.breakpoints.up("sm"),{minHeight:"auto"}),a.dense&&Object(c.a)({minHeight:32,paddingTop:4,paddingBottom:4},r.typography.body2,Object(n.a)({},"& .".concat(m.a.root," svg"),{fontSize:"1.25rem"})))})),T=i.forwardRef((function(e,t){var r=Object(d.a)({props:e,name:"MuiMenuItem"}),n=r.autoFocus,u=void 0!==n&&n,l=r.component,p=void 0===l?"li":l,O=r.dense,m=void 0!==O&&O,v=r.divider,h=void 0!==v&&v,g=r.disableGutters,y=void 0!==g&&g,T=r.focusVisibleClassName,S=r.role,V=void 0===S?"menuitem":S,z=r.tabIndex,M=Object(a.a)(r,w),R=i.useContext(b.a),I={dense:m||R.dense||!1,disableGutters:y},G=i.useRef(null);Object(f.a)((function(){u&&G.current&&G.current.focus()}),[u]);var q,W=Object(c.a)({},r,{dense:I.dense,divider:h,disableGutters:y}),D=function(e){var t=e.disabled,r=e.dense,n=e.divider,a=e.disableGutters,i=e.selected,o=e.classes,u={root:["root",r&&"dense",t&&"disabled",!a&&"gutters",n&&"divider",i&&"selected"]},l=Object(s.a)(u,x,o);return Object(c.a)({},o,l)}(r),N=Object(j.a)(G,t);return r.disabled||(q=void 0!==z?z:-1),Object(C.jsx)(b.a.Provider,{value:I,children:Object(C.jsx)(k,Object(c.a)({ref:N,role:V,tabIndex:q,component:p,focusVisibleClassName:Object(o.a)(D.focusVisible,T)},M,{ownerState:W,classes:D}))})}));t.a=T},884:function(e,t,r){"use strict";r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return u})),r.d(t,"d",(function(){return l})),r.d(t,"e",(function(){return d})),r.d(t,"a",(function(){return b}));var n=r(45),a=r.n(n),c=r(66),i=r(645),o=r(646),s=function(){var e=Object(c.a)(a.a.mark((function e(t,r){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.b)(i.a.TipoCatalogo,{page:t,pageSize:r});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),u=function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.b)(i.a.TipoCatalogoId,{id:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.c)(i.a.TipoCatalogo,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.d)(i.a.TipoCatalogo,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)(i.a.TipoCatalogo,{idTipoCatalogo:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}}]);
//# sourceMappingURL=136.feb7c8db.chunk.js.map