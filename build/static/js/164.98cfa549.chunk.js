(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[164],{1039:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return l})),n.d(t,"d",(function(){return u})),n.d(t,"a",(function(){return d}));var r=n(45),c=n.n(r),a=n(66),i=n(645),o=n(646),s=function(){var e=Object(a.a)(c.a.mark((function e(t,n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.b)(i.a.Ordenes,{page:t,pageSize:n});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),l=function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.b)(i.a.OrdenesId,{id:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.c)(i.a.Ordenes,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)(i.a.Ordenes,{idOrdenes:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},1650:function(e,t,n){"use strict";n.r(t);var r=n(45),c=n.n(r),a=n(66),i=n(10),o=n(4),s=n(0),l=n(25),u=n(33),d=n(763),j=n(764),b=n(887),h=n(824),p=n(796),x=n(163),f=n(99),O=n(634),v=n(562),m=n(564),g=n(345),C=n(61),y=n(560),k=n(631),w=n(638),S=n(761),z=n(762),T=n(765),H=n(1709),E=n(614),P=n(648),M=n(736),A=n.n(M),I=n(656),D=n(102),V=n(713),R=n.n(V),_=n(738),L=n.n(_),B=n(759),q=n.n(B),F=n(923),G=n.n(F),J=n(670),N=n.n(J),Q=n(741),U=n.n(Q),W=n(649),K=n(1039),X=n(1);function Y(e,t,n){return t[n]<e[n]?-1:t[n]>e[n]?1:0}var Z=function(e,t){return"desc"===e?function(e,n){return Y(e,n,t)}:function(e,n){return-Y(e,n,t)}};function $(e,t){var n=e.map((function(e,t){return[e,t]}));return n.sort((function(e,n){var r=t(e[0],n[0]);return 0!==r?r:e[1]-n[1]})),n.map((function(e){return e[0]}))}var ee=[{id:"documento",numeric:!1,label:"Documento",align:"center"},{id:"nameEmpleado",numeric:!1,label:"Empleado",align:"left"},{id:"fecha",numeric:!1,label:"Fecha",align:"left"},{id:"idTipoExamen",numeric:!1,label:"Tipo de Examen",align:"left"},{id:"nameSede",numeric:!1,label:"Sede",align:"left"},{id:"usuarioCreacion",numeric:!1,label:"Usuario Que Atiende",align:"left"}];function te(e){var t=e.onClick,n=e.onSelectAllClick,r=e.order,c=e.orderBy,a=e.numSelected,i=e.rowCount,o=e.onRequestSort,s=e.theme,l=e.selected;return Object(X.jsx)(d.a,{children:Object(X.jsxs)(j.a,{children:[Object(X.jsx)(b.a,{padding:"checkbox",sx:{pl:3},children:Object(X.jsx)(h.a,{color:"primary",indeterminate:a>0&&a<i,checked:i>0&&a===i,onChange:n,inputProps:{"aria-label":"select all desserts"}})}),a>0&&Object(X.jsx)(b.a,{padding:"none",colSpan:8,children:Object(X.jsx)(ne,{numSelected:l.length,onClick:t})}),a<=0&&ee.map((function(e){return Object(X.jsx)(b.a,{align:e.align,padding:e.disablePadding?"none":"normal",sortDirection:c===e.id&&r,children:Object(X.jsxs)(p.a,{active:c===e.id,direction:c===e.id?r:"asc",onClick:(t=e.id,function(e){o(e,t)}),children:[e.label,c===e.id?Object(X.jsx)(x.a,{component:"span",sx:E.a,children:"desc"===r?"sorted descending":"sorted ascending"}):null]})},e.id);var t})),a<=0&&Object(X.jsx)(b.a,{sortDirection:!1,align:"center",sx:{pr:3},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===s.palette.mode?"grey.600":"grey.900"},children:"Acci\xf3n"})})]})})}var ne=function(e){var t=e.numSelected,n=e.onClick;return Object(X.jsxs)(O.a,{sx:Object(o.a)({p:0,pl:1,pr:1},t>0&&{color:function(e){return e.palette.secondary.main}}),children:[t>0?Object(X.jsxs)(f.a,{color:"inherit",variant:"h4",children:[t," ",P.e.Seleccionadas]}):Object(X.jsx)(f.a,{variant:"h6",id:"tableTitle",children:"Nutrici\xf3n"}),Object(X.jsx)(x.a,{sx:{flexGrow:1}}),t>0&&Object(X.jsx)(v.a,{title:P.e.Eliminar,onClick:n,children:Object(X.jsx)(m.a,{size:"large",children:Object(X.jsx)(L.a,{fontSize:"small"})})})]})};t.default=function(){var e=Object(l.e)(),t=Object(s.useState)(""),n=Object(i.a)(t,2),r=n[0],o=n[1],d=Object(s.useState)(!1),p=Object(i.a)(d,2),x=p[0],O=p[1],E=Object(s.useState)([]),M=Object(i.a)(E,2),V=M[0],_=M[1],L=Object(u.a)(),B=Object(s.useState)("asc"),F=Object(i.a)(B,2),J=F[0],Q=F[1],Y=Object(s.useState)("fechaRegistro"),ee=Object(i.a)(Y,2),ne=ee[0],re=ee[1],ce=Object(s.useState)([]),ae=Object(i.a)(ce,2),ie=ae[0],oe=ae[1],se=Object(s.useState)(0),le=Object(i.a)(se,2),ue=le[0],de=le[1],je=Object(s.useState)(5),be=Object(i.a)(je,2),he=be[0],pe=be[1],xe=Object(s.useState)(""),fe=Object(i.a)(xe,2),Oe=fe[0],ve=fe[1],me=Object(s.useState)([]),ge=Object(i.a)(me,2),Ce=ge[0],ye=ge[1];function ke(){return we.apply(this,arguments)}function we(){return(we=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(K.b)(0,0);case 3:t=e.sent,_(t.data.entities),ye(t.data.entities),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}Object(s.useEffect)((function(){ke()}),[]);var Se=function(e,t){o(t);var n=ie.indexOf(t),r=[];-1===n?r=r.concat(ie,t):0===n?r=r.concat(ie.slice(1)):n===ie.length-1?r=r.concat(ie.slice(0,-1)):n>0&&(r=r.concat(ie.slice(0,n),ie.slice(n+1))),oe(r)},ze=function(){var e=Object(a.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{A()(I.f).then(function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=9;break}return e.next=3,Object(K.a)(r);case 3:200===e.sent.status&&O(!0),oe([]),ke(),e.next=10;break;case 9:oe([]);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}catch(t){console.log(t)}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Te=ue>0?Math.max(0,(1+ue)*he-V.length):0;return Object(X.jsxs)(D.a,{title:"Lista de Ordenes Individuales",content:!1,children:[Object(X.jsx)(I.a,{open:x,onClose:function(){return O(!1)}}),Object(X.jsx)(g.a,{children:Object(X.jsxs)(C.a,{container:!0,justifyContent:"space-between",alignItems:"center",spacing:2,children:[Object(X.jsx)(C.a,{item:!0,xs:12,sm:6,children:Object(X.jsx)(y.a,{InputProps:{startAdornment:Object(X.jsx)(k.a,{position:"start",children:Object(X.jsx)(N.a,{fontSize:"small"})})},onChange:function(e){var t=null===e||void 0===e?void 0:e.target.value;if(ve(t||""),t){var n=Ce.filter((function(e){var n=!0,r=!1;return["documento","nameEmpleado","fecha","idTipoExamen","nameSede","usuarioCreacion"].forEach((function(n){e[n].toString().toLowerCase().includes(t.toString().toLowerCase())&&(r=!0)})),r||(n=!1),n}));_(n)}else _(Ce)},placeholder:"Buscar",value:Oe,size:"small"})}),Object(X.jsxs)(C.a,{item:!0,xs:12,sm:6,sx:{textAlign:"right"},children:[Object(X.jsx)(v.a,{title:"Copiar",children:Object(X.jsx)(m.a,{size:"large",children:Object(X.jsx)(G.a,{})})}),Object(X.jsx)(v.a,{title:"Impresi\xf3n",onClick:function(){return e("/occupational-examination/report/".concat(r))},children:Object(X.jsx)(m.a,{size:"large",children:Object(X.jsx)(q.a,{})})}),Object(X.jsx)(w.a,{variant:"contained",size:"large",startIcon:Object(X.jsx)(R.a,{}),onClick:function(){return e("/orders-individual/add")},children:P.e.Agregar})]})]})}),Object(X.jsx)(S.a,{children:Object(X.jsxs)(z.a,{sx:{minWidth:750},"aria-labelledby":"tableTitle",children:[Object(X.jsx)(te,{numSelected:ie.length,order:J,orderBy:ne,onSelectAllClick:function(e){if(e.target.checked){var t=V.map((function(e){return e.id}));oe(t)}else oe([])},onRequestSort:function(e,t){Q(ne===t&&"asc"===J?"desc":"asc"),re(t)},rowCount:V.length,theme:L,selected:ie,onClick:ze}),Object(X.jsxs)(T.a,{children:[$(V,Z(J,ne)).slice(ue*he,ue*he+he).map((function(t,n){if("string"===typeof t)return null;var r,c=(r=t.id,-1!==ie.indexOf(r)),a="enhanced-table-checkbox-".concat(n);return Object(X.jsxs)(j.a,{hover:!0,role:"checkbox","aria-checked":c,tabIndex:-1,selected:c,children:[Object(X.jsx)(b.a,{padding:"checkbox",sx:{pl:3},onClick:function(e){return Se(0,t.id)},children:Object(X.jsx)(h.a,{color:"primary",checked:c,inputProps:{"aria-labelledby":a}})}),Object(X.jsx)(b.a,{component:"th",id:a,scope:"row",onClick:function(e){return Se(0,t.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===L.palette.mode?"grey.600":"grey.900"},children:t.documento})}),Object(X.jsx)(b.a,{component:"th",id:a,scope:"row",onClick:function(e){return Se(0,t.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===L.palette.mode?"grey.600":"grey.900"},children:t.nameEmpleado})}),Object(X.jsx)(b.a,{component:"th",id:a,scope:"row",onClick:function(e){return Se(0,t.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===L.palette.mode?"grey.600":"grey.900"},children:Object(W.k)(t.fecha)})}),Object(X.jsx)(b.a,{component:"th",id:a,scope:"row",onClick:function(e){return Se(0,t.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===L.palette.mode?"grey.600":"grey.900"},children:t.nameTipoExamen})}),Object(X.jsx)(b.a,{component:"th",id:a,scope:"row",onClick:function(e){return Se(0,t.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===L.palette.mode?"grey.600":"grey.900"},children:t.sedeEmpleado})}),Object(X.jsx)(b.a,{component:"th",id:a,scope:"row",onClick:function(e){return Se(0,t.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===L.palette.mode?"grey.600":"grey.900"},children:t.usuarioRegistro})}),Object(X.jsx)(b.a,{align:"center",sx:{pr:3},children:Object(X.jsx)(v.a,{title:"Actualizar",onClick:function(){return e("/orders-individual/update/".concat(t.id))},children:Object(X.jsx)(m.a,{size:"large",children:Object(X.jsx)(U.a,{sx:{fontSize:"1.3rem"}})})})})]},n)})),Te>0&&Object(X.jsx)(j.a,{style:{height:53*Te},children:Object(X.jsx)(b.a,{colSpan:6})})]})]})}),Object(X.jsx)(H.a,{rowsPerPageOptions:[5,10,25],component:"div",count:V.length,rowsPerPage:he,page:ue,onPageChange:function(e,t){de(t)},onRowsPerPageChange:function(e){(null===e||void 0===e?void 0:e.target.value)&&pe(parseInt(null===e||void 0===e?void 0:e.target.value,10)),de(0)}})]})}},656:function(e,t,n){"use strict";n.d(t,"f",(function(){return d})),n.d(t,"e",(function(){return j})),n.d(t,"g",(function(){return b})),n.d(t,"c",(function(){return x})),n.d(t,"d",(function(){return f})),n.d(t,"a",(function(){return O})),n.d(t,"b",(function(){return v}));var r=n(4),c=n(0),a=n.n(c),i=n(548),o=n(619),s=n(648),l=n(624),u=n(1),d={title:"".concat(s.d.TituloEliminar),text:"".concat(s.d.TextoEliminar),icon:"error",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}},j={title:"".concat(s.d.TituloCerrarCaso),text:"".concat(s.d.TextoCerrarCaso),icon:"warning",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}},b={title:"".concat(s.d.TituloCargar),text:"".concat(s.d.TextoCargar),icon:"warning",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}};function h(e){return Object(u.jsx)(i.a,Object(r.a)(Object(r.a)({},e),{},{direction:"up"}))}var p=a.a.forwardRef((function(e,t){return Object(u.jsx)(o.a,Object(r.a)({elevation:6,ref:t,variant:"filled"},e))})),x=function(e){var t=e.open,n=e.onClose;return Object(u.jsx)(l.a,{TransitionComponent:h,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:t,autoHideDuration:2500,onClose:n,children:Object(u.jsx)(p,{severity:"success",sx:{width:"100%"},children:s.d.Guardar})},"alert")},f=function(e){var t=e.open,n=e.onClose;return Object(u.jsx)(l.a,{TransitionComponent:h,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:t,autoHideDuration:2500,onClose:n,children:Object(u.jsx)(p,{severity:"success",sx:{width:"100%"},children:s.d.Actualizar})},"alert")},O=function(e){var t=e.open,n=e.onClose;return Object(u.jsx)(l.a,{TransitionComponent:h,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:t,autoHideDuration:2500,onClose:n,children:Object(u.jsx)(p,{severity:"error",sx:{width:"100%"},children:s.d.Eliminar})},"alert")},v=function(e){var t=e.open,n=e.onClose,r=e.error;return Object(u.jsx)(l.a,{TransitionComponent:h,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:t,autoHideDuration:2e3,onClose:n,children:Object(u.jsx)(p,{severity:"error",sx:{width:"100%"},children:r})},"alert")}},713:function(e,t,n){"use strict";var r=n(100);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=r(n(127)),a=n(1),i=(0,c.default)((0,a.jsx)("path",{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"AddCircleOutlineOutlined");t.default=i},759:function(e,t,n){"use strict";var r=n(100);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=r(n(127)),a=n(1),i=(0,c.default)([(0,a.jsx)("path",{d:"M8 5h8v3H8z",opacity:".3"},"0"),(0,a.jsx)("circle",{cx:"18",cy:"11.5",r:"1"},"1"),(0,a.jsx)("path",{d:"M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm4-4h-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4z"},"2"),(0,a.jsx)("path",{d:"M6 13h12v2h2v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4h2v-2zm12-2.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z",opacity:".3"},"3")],"PrintTwoTone");t.default=i},923:function(e,t,n){"use strict";var r=n(100);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=r(n(127)),a=n(1),i=(0,c.default)([(0,a.jsx)("path",{d:"M14 7H8v14h11v-9h-5z",opacity:".3"},"0"),(0,a.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zm4 16H8V7h6v5h5v9z"},"1")],"FileCopyTwoTone");t.default=i}}]);
//# sourceMappingURL=164.98cfa549.chunk.js.map