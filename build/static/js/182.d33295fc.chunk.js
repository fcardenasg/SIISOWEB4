(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[182],{1601:function(e,t,n){"use strict";n.r(t);var c=n(45),a=n.n(c),r=n(66),i=n(10),o=n(4),s=n(0),l=n(25),u=n(24),d=n(33),j=n(763),b=n(764),p=n(887),x=n(824),h=n(796),O=n(163),f=n(99),v=n(634),g=n(562),m=n(564),k=n(345),y=n(61),C=n(560),w=n(631),S=n(638),A=n(761),z=n(762),E=n(765),P=n(1709),T=n(614),M=n(649),H=n(648),R=n(15),I=n(102),D=n(831),F=n(713),U=n.n(F),_=n(738),B=n.n(_),L=n(759),V=n.n(L),q=n(670),J=n.n(q),G=n(741),N=n.n(G),W=n(756),K=n.n(W),Q=n(13),X=n(1),Y=K.a.ExcelFile,Z=K.a.ExcelFile.ExcelSheet,$=K.a.ExcelFile.ExcelColumn;function ee(e,t,n){return t[n]<e[n]?-1:t[n]>e[n]?1:0}var te=function(e,t){return"desc"===e?function(e,n){return ee(e,n,t)}:function(e,n){return-ee(e,n,t)}};function ne(e,t){var n=e.map((function(e,t){return[e,t]}));return n.sort((function(e,n){var c=t(e[0],n[0]);return 0!==c?c:e[1]-n[1]})),n.map((function(e){return e[0]}))}var ce=[{id:"id",numeric:!1,label:"ID",align:"center"},{id:"documento",numeric:!1,label:"Documento",align:"left"},{id:"fecha",numeric:!1,label:"Fecha",align:"left"},{id:"usuarioRegistro",numeric:!1,label:"Usuario",align:"left"},{id:"motivo",numeric:!1,label:"Motivo",align:"left"},{id:"idTipoAtencion",numeric:!1,label:"Tipo Atencion",align:"left"},{id:"idEstadoCaso",numeric:!1,label:"Estado Caso",align:"left"}];function ae(e){var t=e.onClick,n=e.onSelectAllClick,c=e.order,a=e.orderBy,r=e.numSelected,i=e.rowCount,o=e.onRequestSort,s=e.theme,l=e.selected;return Object(X.jsx)(j.a,{children:Object(X.jsxs)(b.a,{children:[Object(X.jsx)(p.a,{padding:"checkbox",sx:{pl:3},children:Object(X.jsx)(x.a,{color:"primary",indeterminate:r>0&&r<i,checked:i>0&&r===i,onChange:n,inputProps:{"aria-label":"select all desserts"}})}),r>0&&Object(X.jsx)(p.a,{padding:"none",colSpan:8,children:Object(X.jsx)(re,{numSelected:l.length,onClick:t})}),r<=0&&ce.map((function(e){return Object(X.jsx)(p.a,{align:e.align,padding:e.disablePadding?"none":"normal",sortDirection:a===e.id&&c,children:Object(X.jsxs)(h.a,{active:a===e.id,direction:a===e.id?c:"asc",onClick:(t=e.id,function(e){o(e,t)}),children:[e.label,a===e.id?Object(X.jsx)(O.a,{component:"span",sx:T.a,children:"desc"===c?"sorted descending":"sorted ascending"}):null]})},e.id);var t})),r<=0&&Object(X.jsx)(p.a,{sortDirection:!1,align:"center",sx:{pr:3},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===s.palette.mode?"grey.600":"grey.900"},children:"Acci\xf3n"})})]})})}var re=function(e){var t=e.numSelected,n=e.onClick;return Object(X.jsxs)(v.a,{sx:Object(o.a)({p:0,pl:1,pr:1},t>0&&{color:function(e){return e.palette.secondary.main}}),children:[t>0?Object(X.jsxs)(f.a,{color:"inherit",variant:"h4",children:[t," ",H.e.Seleccionadas]}):Object(X.jsx)(f.a,{variant:"h6",id:"tableTitle",children:"Nutrici\xf3n"}),Object(X.jsx)(O.a,{sx:{flexGrow:1}}),t>0&&Object(X.jsx)(g.a,{title:H.e.Eliminar,onClick:n,children:Object(X.jsx)(m.a,{size:"large",children:Object(X.jsx)(B.a,{fontSize:"small"})})})]})};t.default=function(){var e=Object(u.c)(),t=Object(l.e)(),n=Object(s.useState)(""),c=Object(i.a)(n,2),o=c[0],j=c[1],h=Object(s.useState)([]),O=Object(i.a)(h,2),v=O[0],T=O[1],F=Object(d.a)(),_=Object(s.useState)("asc"),B=Object(i.a)(_,2),L=B[0],q=B[1],G=Object(s.useState)("calories"),W=Object(i.a)(G,2),K=W[0],ee=W[1],ce=Object(s.useState)([]),re=Object(i.a)(ce,2),ie=re[0],oe=re[1],se=Object(s.useState)(0),le=Object(i.a)(se,2),ue=le[0],de=le[1],je=Object(s.useState)(5),be=Object(i.a)(je,2),pe=be[0],xe=be[1],he=Object(s.useState)(""),Oe=Object(i.a)(he,2),fe=Oe[0],ve=Oe[1],ge=Object(s.useState)([]),me=Object(i.a)(ge,2),ke=me[0],ye=me[1];function Ce(){return we.apply(this,arguments)}function we(){return(we=Object(r.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(D.b)(0,0);case 3:t=e.sent,T(t.data.entities),ye(t.data.entities),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}Object(s.useEffect)((function(){Ce()}),[]);var Se=function(e,t){j(t);var n=ie.indexOf(t),c=[];-1===n?c=c.concat(ie,t):0===n?c=c.concat(ie.slice(1)):n===ie.length-1?c=c.concat(ie.slice(0,-1)):n>0&&(c=c.concat(ie.slice(0,n),ie.slice(n+1))),oe(c)},Ae=function(){var t=Object(r.a)(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(D.a)(o);case 3:200===t.sent.status&&e({type:R.H,open:!0,message:"".concat(H.d.Eliminar),variant:"alert",alertSeverity:"error",close:!1,transition:"SlideUp"}),oe([]),Ce(),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(){return t.apply(this,arguments)}}(),ze=ue>0?Math.max(0,(1+ue)*pe-v.length):0;return Object(X.jsxs)(I.a,{title:"Lista de Pacientes",content:!1,children:[Object(X.jsx)(k.a,{children:Object(X.jsxs)(y.a,{container:!0,justifyContent:"space-between",alignItems:"center",spacing:2,children:[Object(X.jsx)(y.a,{item:!0,xs:12,sm:6,children:Object(X.jsx)(C.a,{InputProps:{startAdornment:Object(X.jsx)(w.a,{position:"start",children:Object(X.jsx)(J.a,{fontSize:"small"})})},onChange:function(e){var t=null===e||void 0===e?void 0:e.target.value;if(ve(t||""),t){var n=ke.filter((function(e){var n=!0,c=!1;return["id","documento","fecha","usuarioRegistro","motivo","idTipoAtencion","idEstadoCaso"].forEach((function(n){e[n].toString().toLowerCase().includes(t.toString().toLowerCase())&&(c=!0)})),c||(n=!1),n}));T(n)}else T(ke)},placeholder:"Buscar",value:fe,size:"small"})}),Object(X.jsxs)(y.a,{item:!0,xs:12,sm:6,sx:{textAlign:"right"},children:[Object(X.jsx)(Y,{element:Object(X.jsx)(g.a,{title:"Exportar",children:Object(X.jsx)(m.a,{size:"large",children:Object(X.jsx)(Q.R,{})})}),filename:"Asesor\xeda M\xe9dica",children:Object(X.jsxs)(Z,{data:v,name:"Asesor\xeda M\xe9dica",children:[Object(X.jsx)($,{label:"Id",value:"id"}),Object(X.jsx)($,{label:"Documento",value:"documento"}),Object(X.jsx)($,{label:"Fecha",value:"fecha"}),Object(X.jsx)($,{label:"Tipo Atenci\xf3n",value:"idTipoAtencion"}),Object(X.jsx)($,{label:"Sede",value:"idSede"}),Object(X.jsx)($,{label:"Contingencia",value:"idContingencia"}),Object(X.jsx)($,{label:"Estado del Caso",value:"idEstadoCaso"}),Object(X.jsx)($,{label:"Turno",value:"idTurno"}),Object(X.jsx)($,{label:"D\xeda del Turno",value:"idDiaTurno"}),Object(X.jsx)($,{label:"Tipo Asesor\xeda",value:"idTipoAsesoria"}),Object(X.jsx)($,{label:"Motivo",value:"idMotivo"}),Object(X.jsx)($,{label:"Causa",value:"idCausa"}),Object(X.jsx)($,{label:"Descripci\xf3n",value:"motivo"}),Object(X.jsx)($,{label:"Recomendaciones",value:"recomdaciones"}),Object(X.jsx)($,{label:"Pautas",value:"pautas"}),Object(X.jsx)($,{label:"Estado Asesor\xeda",value:"idEstadoAsesoria"}),Object(X.jsx)($,{label:"Usuario",value:"usuario"}),Object(X.jsx)($,{label:"Fecha Registro",value:"fechaRegistro"}),Object(X.jsx)($,{label:"Usuario Modifica",value:"usuarioModifica"}),Object(X.jsx)($,{label:"Fecha de Actualizaci\xf3n",value:"fechaActualizacion"})]})}),Object(X.jsx)(g.a,{title:"Impresi\xf3n",onClick:function(){return t("/psychologicalcounseling/report")},children:Object(X.jsx)(m.a,{size:"large",children:Object(X.jsx)(V.a,{})})}),Object(X.jsx)(S.a,{variant:"contained",size:"large",startIcon:Object(X.jsx)(U.a,{}),onClick:function(){return t("/psychologicalcounseling/add")},children:H.e.Agregar})]})]})}),Object(X.jsx)(A.a,{children:Object(X.jsxs)(z.a,{sx:{minWidth:750},"aria-labelledby":"tableTitle",children:[Object(X.jsx)(ae,{numSelected:ie.length,order:L,orderBy:K,onSelectAllClick:function(e){if(e.target.checked){var t=v.map((function(e){return e.id}));oe(t)}else oe([])},onRequestSort:function(e,t){q(K===t&&"asc"===L?"desc":"asc"),ee(t)},rowCount:v.length,theme:F,selected:ie,onClick:Ae}),Object(X.jsxs)(E.a,{children:[ne(v,te(L,K)).slice(ue*pe,ue*pe+pe).map((function(e,n){if("string"===typeof e)return null;var c,a=(c=e.id,-1!==ie.indexOf(c)),r="enhanced-table-checkbox-".concat(n);return Object(X.jsxs)(b.a,{hover:!0,role:"checkbox","aria-checked":a,tabIndex:-1,selected:a,children:[Object(X.jsx)(p.a,{padding:"checkbox",sx:{pl:3},onClick:function(t){return Se(0,e.id)},children:Object(X.jsx)(x.a,{color:"primary",checked:a,inputProps:{"aria-labelledby":r}})}),Object(X.jsx)(p.a,{component:"th",id:r,scope:"row",onClick:function(t){return Se(0,e.id)},sx:{cursor:"pointer"},align:"center",children:e.id}),Object(X.jsx)(p.a,{component:"th",id:r,scope:"row",onClick:function(t){return Se(0,e.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===F.palette.mode?"grey.600":"grey.900"},children:e.documento})}),Object(X.jsx)(p.a,{component:"th",id:r,scope:"row",onClick:function(t){return Se(0,e.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===F.palette.mode?"grey.600":"grey.900"},children:Object(M.b)(e.fecha)})}),Object(X.jsx)(p.a,{component:"th",id:r,scope:"row",onClick:function(t){return Se(0,e.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===F.palette.mode?"grey.600":"grey.900"},children:e.usuarioRegistro})}),Object(X.jsx)(p.a,{component:"th",id:r,scope:"row",onClick:function(t){return Se(0,e.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===F.palette.mode?"grey.600":"grey.900"},children:e.motivo})}),Object(X.jsx)(p.a,{component:"th",id:r,scope:"row",onClick:function(t){return Se(0,e.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===F.palette.mode?"grey.600":"grey.900"},children:e.idTipoAtencion})}),Object(X.jsx)(p.a,{component:"th",id:r,scope:"row",onClick:function(t){return Se(0,e.id)},sx:{cursor:"pointer"},children:Object(X.jsx)(f.a,{variant:"subtitle1",sx:{color:"dark"===F.palette.mode?"grey.600":"grey.900"},children:e.idEstadoCaso})}),Object(X.jsx)(p.a,{align:"center",sx:{pr:3},children:Object(X.jsx)(g.a,{title:"Actualizar",onClick:function(){return t("/psychologicalcounseling/update/".concat(e.id))},children:Object(X.jsx)(m.a,{size:"large",children:Object(X.jsx)(N.a,{sx:{fontSize:"1.3rem"}})})})})]},n)})),ze>0&&Object(X.jsx)(b.a,{style:{height:53*ze},children:Object(X.jsx)(p.a,{colSpan:6})})]})]})}),Object(X.jsx)(P.a,{rowsPerPageOptions:[5,10,25],component:"div",count:v.length,rowsPerPage:pe,page:ue,onPageChange:function(e,t){de(t)},onRowsPerPageChange:function(e){(null===e||void 0===e?void 0:e.target.value)&&xe(parseInt(null===e||void 0===e?void 0:e.target.value,10)),de(0)}})]})}},713:function(e,t,n){"use strict";var c=n(100);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n(127)),r=n(1),i=(0,a.default)((0,r.jsx)("path",{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"AddCircleOutlineOutlined");t.default=i},759:function(e,t,n){"use strict";var c=n(100);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n(127)),r=n(1),i=(0,a.default)([(0,r.jsx)("path",{d:"M8 5h8v3H8z",opacity:".3"},"0"),(0,r.jsx)("circle",{cx:"18",cy:"11.5",r:"1"},"1"),(0,r.jsx)("path",{d:"M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm4-4h-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4z"},"2"),(0,r.jsx)("path",{d:"M6 13h12v2h2v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4h2v-2zm12-2.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z",opacity:".3"},"3")],"PrintTwoTone");t.default=i},831:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return l})),n.d(t,"d",(function(){return u})),n.d(t,"e",(function(){return d})),n.d(t,"a",(function(){return j}));var c=n(45),a=n.n(c),r=n(66),i=n(645),o=n(646),s=function(){var e=Object(r.a)(a.a.mark((function e(t,n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.b)(i.a.Asesorias,{page:t,pageSize:n});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),l=function(){var e=Object(r.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.b)(i.a.AsesoriasId,{id:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(r.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.c)(i.a.Asesorias,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(r.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.d)(i.a.Asesorias,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j=function(){var e=Object(r.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)(i.a.Asesorias,{idAsesorias:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}}]);
//# sourceMappingURL=182.d33295fc.chunk.js.map