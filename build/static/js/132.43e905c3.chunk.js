(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[132],{1658:function(e,a,t){"use strict";t.r(a);var r=t(45),o=t.n(r),i=t(66),n=t(10),c=t(4),s=t(0),l=t(25),d=t(33),u=t(763),p=t(764),O=t(887),A=t(824),b=t(796),g=t(163),C=t(99),E=t(634),I=t(562),j=t(564),h=t(345),m=t(61),R=t(560),_=t(631),f=t(638),v=t(761),T=t(762),x=t(765),S=t(1709),N=t(614),P=t(13),L=t(736),y=t.n(L),D=t(694),k=t(656),M=t(648),H=t(102),G=t(713),B=t.n(G),w=t(738),U=t.n(w),z=t(759),F=t.n(z),X=t(670),V=t.n(X),q=t(741),J=t.n(q),Q=t(756),W=t.n(Q),K=t(830),Z=t(1),Y=W.a.ExcelFile,$=W.a.ExcelFile.ExcelSheet,ee=W.a.ExcelFile.ExcelColumn;function ae(e,a,t){return a[t]<e[t]?-1:a[t]>e[t]?1:0}var te=function(e,a){return"desc"===e?function(e,t){return ae(e,t,a)}:function(e,t){return-ae(e,t,a)}};function re(e,a){var t=e.map((function(e,a){return[e,a]}));return t.sort((function(e,t){var r=a(e[0],t[0]);return 0!==r?r:e[1]-t[1]})),t.map((function(e){return e[0]}))}var oe=[{id:"codigo",numeric:!1,label:"C\xf3digo",align:"center"},{id:"descripcion",numeric:!1,label:"Descripci\xf3n",align:"left"},{id:"cantidad",numeric:!1,label:"Cantidad",align:"left"},{id:"existencia",numeric:!1,label:"Existencia",align:"left"}];function ie(e){var a=e.onClick,t=e.onSelectAllClick,r=e.order,o=e.orderBy,i=e.numSelected,n=e.rowCount,c=e.onRequestSort,s=e.theme,l=e.selected;return Object(Z.jsx)(u.a,{children:Object(Z.jsxs)(p.a,{children:[Object(Z.jsx)(O.a,{padding:"checkbox",sx:{pl:3},children:Object(Z.jsx)(A.a,{color:"primary",indeterminate:i>0&&i<n,checked:n>0&&i===n,onChange:t,inputProps:{"aria-label":"select all desserts"}})}),i>0&&Object(Z.jsx)(O.a,{padding:"none",colSpan:8,children:Object(Z.jsx)(ne,{numSelected:l.length,onClick:a})}),i<=0&&oe.map((function(e){return Object(Z.jsx)(O.a,{align:e.align,padding:e.disablePadding?"none":"normal",sortDirection:o===e.id&&r,children:Object(Z.jsxs)(b.a,{active:o===e.id,direction:o===e.id?r:"asc",onClick:(a=e.id,function(e){c(e,a)}),children:[e.label,o===e.id?Object(Z.jsx)(g.a,{component:"span",sx:N.a,children:"desc"===r?"sorted descending":"sorted ascending"}):null]})},e.id);var a})),i<=0&&Object(Z.jsx)(O.a,{sortDirection:!1,align:"center",sx:{pr:3},children:Object(Z.jsx)(C.a,{variant:"subtitle1",sx:{color:"dark"===s.palette.mode?"grey.600":"grey.900"},children:"Acci\xf3n"})})]})})}var ne=function(e){var a=e.numSelected,t=e.onClick;return Object(Z.jsxs)(E.a,{sx:Object(c.a)({p:0,pl:1,pr:1},a>0&&{color:function(e){return e.palette.secondary.main}}),children:[a>0?Object(Z.jsxs)(C.a,{color:"inherit",variant:"h4",children:[a," ",M.e.Seleccionadas]}):Object(Z.jsx)(C.a,{variant:"h6",id:"tableTitle",children:"Nutrici\xf3n"}),Object(Z.jsx)(g.a,{sx:{flexGrow:1}}),a>0&&Object(Z.jsx)(I.a,{title:M.e.Eliminar,onClick:t,children:Object(Z.jsx)(j.a,{size:"large",children:Object(Z.jsx)(U.a,{fontSize:"small"})})})]})};a.default=function(){var e=Object(l.e)(),a=Object(s.useState)([]),t=Object(n.a)(a,2),r=t[0],c=t[1],u=Object(s.useState)(!1),b=Object(n.a)(u,2),g=b[0],E=b[1],N=Object(s.useState)(""),L=Object(n.a)(N,2),G=L[0],w=L[1],U=Object(d.a)(),z=Object(s.useState)("desc"),X=Object(n.a)(z,2),q=X[0],Q=X[1],W=Object(s.useState)("fechaRegistro"),ae=Object(n.a)(W,2),oe=ae[0],ne=ae[1],ce=Object(s.useState)([]),se=Object(n.a)(ce,2),le=se[0],de=se[1],ue=Object(s.useState)(0),pe=Object(n.a)(ue,2),Oe=pe[0],Ae=pe[1],be=Object(s.useState)(5),ge=Object(n.a)(be,2),Ce=ge[0],Ee=ge[1],Ie=Object(s.useState)(""),je=Object(n.a)(Ie,2),he=je[0],me=je[1],Re=Object(s.useState)([]),_e=Object(n.a)(Re,2),fe=_e[0],ve=_e[1];function Te(){return xe.apply(this,arguments)}function xe(){return(xe=Object(i.a)(o.a.mark((function e(){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(K.b)(0,0);case 3:200===(a=e.sent).status&&(c(a.data.entities),ve(a.data.entities)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}Object(s.useEffect)((function(){Te()}),[]);var Se=function(e,a){w(a);var t=le.indexOf(a),r=[];-1===t?r=r.concat(le,a):0===t?r=r.concat(le.slice(1)):t===le.length-1?r=r.concat(le.slice(0,-1)):t>0&&(r=r.concat(le.slice(0,t),le.slice(t+1))),de(r)},Ne=function(){var e=Object(i.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{y()(k.f).then(function(){var e=Object(i.a)(o.a.mark((function e(a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=10;break}return e.next=3,Object(K.a)(G);case 3:200===e.sent.status&&E(!0),me(""),de([]),Te(),e.next=11;break;case 10:de([]);case 11:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}())}catch(a){console.log(a)}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Pe=Oe>0?Math.max(0,(1+Oe)*Ce-r.length):0;return Object(Z.jsxs)(H.a,{title:"Lista de Medicamentos",content:!1,children:[Object(Z.jsx)(k.a,{open:g,onClose:function(){return E(!1)}}),Object(Z.jsx)(h.a,{children:Object(Z.jsxs)(m.a,{container:!0,justifyContent:"space-between",alignItems:"center",spacing:2,children:[Object(Z.jsx)(m.a,{item:!0,xs:12,sm:6,children:Object(Z.jsx)(R.a,{InputProps:{startAdornment:Object(Z.jsx)(_.a,{position:"start",children:Object(Z.jsx)(V.a,{fontSize:"small"})})},onChange:function(e){var a=null===e||void 0===e?void 0:e.target.value;if(me(a||""),a){var t=fe.filter((function(e){var t=!0,r=!1;return["codigo","descripcion","cantidad","existencia"].forEach((function(t){e[t].toString().toLowerCase().includes(a.toString().toLowerCase())&&(r=!0)})),r||(t=!1),t}));c(t)}else c(fe)},placeholder:"Buscar",value:he,size:"small"})}),Object(Z.jsxs)(m.a,{item:!0,xs:12,sm:6,sx:{textAlign:"right"},children:[Object(Z.jsx)(Y,{element:Object(Z.jsx)(I.a,{title:"Exportar",children:Object(Z.jsx)(j.a,{size:"large",children:Object(Z.jsx)(P.R,{})})}),filename:"Medicamentos",children:Object(Z.jsxs)($,{data:r,name:"Medicamentos",children:[Object(Z.jsx)(ee,{label:"ID",value:"id"}),Object(Z.jsx)(ee,{label:"C\xf3digo",value:"codigo"}),Object(Z.jsx)(ee,{label:"Descripci\xf3n",value:"descripci\xf3n"}),Object(Z.jsx)(ee,{label:"Unidad",value:"idUnidad"}),Object(Z.jsx)(ee,{label:"Cantidad",value:"cantidad"}),Object(Z.jsx)(ee,{label:"Existencia",value:"existencia"}),Object(Z.jsx)(ee,{label:"Usuario Registro",value:"usuarioRegistro"}),Object(Z.jsx)(ee,{label:"Fecha Registro",value:"fechaRegistro"}),Object(Z.jsx)(ee,{label:"Usuario Modifico",value:"usuarioModifico"}),Object(Z.jsx)(ee,{label:"Fecha Modifico",value:"fechaModifico"})]})}),Object(Z.jsx)(I.a,{title:"Impresi\xf3n",onClick:function(){return e("/medicines/report")},children:Object(Z.jsx)(j.a,{size:"large",children:Object(Z.jsx)(F.a,{})})}),Object(Z.jsx)(f.a,{variant:"contained",size:"large",startIcon:Object(Z.jsx)(B.a,{}),onClick:function(){return e("/medicines/add")},children:M.e.Agregar})]})]})}),Object(Z.jsx)(v.a,{children:Object(Z.jsxs)(T.a,{sx:{minWidth:750},"aria-labelledby":"tableTitle",children:[Object(Z.jsx)(ie,{numSelected:le.length,order:q,orderBy:oe,onSelectAllClick:function(e){if(e.target.checked){var a=r.map((function(e){return e.id}));de(a)}else de([])},onRequestSort:function(e,a){Q(oe===a&&"asc"===q?"desc":"asc"),ne(a)},rowCount:r.length,theme:U,selected:le,onClick:Ne}),Object(Z.jsxs)(x.a,{children:[re(r,te(q,oe)).slice(Oe*Ce,Oe*Ce+Ce).map((function(a,t){if("string"===typeof a)return null;var r,o=(r=a.id,-1!==le.indexOf(r)),i="enhanced-table-checkbox-".concat(t);return Object(Z.jsxs)(p.a,{hover:!0,role:"checkbox","aria-checked":o,tabIndex:-1,selected:o,children:[Object(Z.jsx)(O.a,{padding:"checkbox",sx:{pl:3},onClick:function(e){return Se(0,a.id)},children:Object(Z.jsx)(A.a,{color:"primary",checked:o,inputProps:{"aria-labelledby":i}})}),Object(Z.jsx)(O.a,{component:"th",id:i,scope:"row",onClick:function(e){return Se(0,a.id)},sx:{cursor:"pointer"},align:"center",children:Object(Z.jsxs)(C.a,{variant:"subtitle1",sx:{color:"dark"===U.palette.mode?"grey.600":"grey.900"},children:["#",a.codigo]})}),Object(Z.jsx)(O.a,{component:"th",id:i,scope:"row",onClick:function(e){return Se(0,a.id)},sx:{cursor:"pointer"},children:Object(Z.jsx)(C.a,{variant:"subtitle1",sx:{color:"dark"===U.palette.mode?"grey.600":"grey.900"},children:a.descripcion})}),Object(Z.jsx)(O.a,{component:"th",id:i,scope:"row",onClick:function(e){return Se(0,a.id)},sx:{cursor:"pointer"},children:Object(Z.jsx)(C.a,{variant:"subtitle1",sx:{color:"dark"===U.palette.mode?"grey.600":"grey.900"},children:a.cantidad})}),Object(Z.jsx)(O.a,{component:"th",id:i,scope:"row",onClick:function(e){return Se(0,a.id)},sx:{cursor:"pointer"},children:Object(Z.jsx)(C.a,{variant:"subtitle1",sx:{color:"dark"===U.palette.mode?"grey.600":"grey.900"},children:!0===a.existencia?Object(Z.jsx)(D.a,{label:"EXISTENCIA",size:"small",chipcolor:"success"}):Object(Z.jsx)(D.a,{label:"SIN EXISTENCIA",size:"small",chipcolor:"error"})})}),Object(Z.jsx)(O.a,{align:"center",sx:{pr:3},children:Object(Z.jsx)(I.a,{title:"Actualizar",onClick:function(){return e("/medicines/update/".concat(a.id))},children:Object(Z.jsx)(j.a,{size:"large",children:Object(Z.jsx)(J.a,{sx:{fontSize:"1.3rem"}})})})})]},t)})),Pe>0&&Object(Z.jsx)(p.a,{style:{height:53*Pe},children:Object(Z.jsx)(O.a,{colSpan:6})})]})]})}),Object(Z.jsx)(S.a,{rowsPerPageOptions:[5,10,25],component:"div",count:r.length,rowsPerPage:Ce,page:Oe,onPageChange:function(e,a){Ae(a)},onRowsPerPageChange:function(e){(null===e||void 0===e?void 0:e.target.value)&&Ee(parseInt(null===e||void 0===e?void 0:e.target.value,10)),Ae(0)}})]})}},645:function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var r,o=t(5),i=(r={Base:"https://siiso4.westus3.cloudapp.azure.com:44347/",TipoCatalogo:"api/TipoCatalogo",TipoCatalogoId:"api/TipoCatalogo/id",Catalogo:"api/Catalogo",CatalogoId:"api/Catalogo/id",GetAllByTipoCatalogo:"api/Catalogo/GetAllByTipoCatalogo",GetAllBySubTipoCatalogo:"api/Catalogo/GetAllBySubTipoCatalogo",Empleado:"api/Empleado",EmpleadoId:"api/Empleado/id",Reintegro:"api/Reintegro",ReintegroId:"api/Reintegro/id",ListaReintegro:"api/ListaReintegro",ListaReintegro_GetAllReintegro:"api/ListaReintegro/GetAllReintegro",ListaReintegroId:"api/ListaReintegro/id",Cargo:"api/Cargo",CargoId:"api/Cargo/id",Panorama:"api/Panoramariesgo",PanoramaGetAllByCharge:"api/Panoramariesgo/GetAllByCharge",PanoramaId:"api/Panoramariesgo/id",Recetario:"api/Recetario",RecetarioId:"api/Recetario/id",Medicamentos:"api/Medicamentos",MedicamentosId:"api/Medicamentos/id",PruebasAlcoholDroga:"api/PruebasAlcoholDroga",PruebasAlcoholDrogaId:"api/PruebasAlcoholDroga/id",Empresa:"api/Empresa",EmpresaId:"api/Empresa/id",SGSST:"api/SistemaGestion",SGSSTId:"api/SistemaGestion/id",RiesgoHistoriaLaboral:"api/RiesgoHistoriaLaboral",RiesgoHistoriaLaboralId:"api/RiesgoHistoriaLaboral/id",RHLByChargeHistorico:"api/RiesgoHistoriaLaboral/GetAllByChargeHistorico",RHLByHistorico:"api/RiesgoHistoriaLaboral/GetAllByHistorico",RHLByChargeAdvance:"api/RiesgoHistoriaLaboral/GetAllByChargeAdvance",RiesgoHistoriaLaboralEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas",RiesgoHistoriaLaboralIdEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/id",RHLByChargeHistoricoEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByChargeHistorico",RHLByHistoricoEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByHistorico",RHLByChargeAdvanceEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByChargeAdvance",Proveedor:"api/Proveedor",ProveedorId:"api/Proveedor/id",Usuarios:"api/Usuarios",UsuariosId:"api/Usuarios/id",UsuariosEmail:"api/Usuarios/email",RegistroAtencion:"api/RegistroAtencion",RegistroAtencio_GetAllAtencion:"api/RegistroAtencion/GetAllAtencion",RegistroAtencionId:"api/RegistroAtencion/id",Paraclinicos:"api/Paraclinicos",Paraclinicos_GetAllByTypeParaclinico:"api/Paraclinicos/GetAllByTipoParaclinico",ParaclinicosId:"api/Paraclinicos/id",Ordenes:"api/Ordenes",OrdenesId:"api/Ordenes/id",Asesorias:"api/Asesorias",AsesoriasId:"api/Asesorias/id",Accidentalidad:"api/Accidentalidad",AccidentalidadId:"api/Accidentalidad/id"},Object(o.a)(r,"RegistroAtencion","api/RegistroAtencion"),Object(o.a)(r,"RegistroAtencionId","api/RegistroAtencion/id"),Object(o.a)(r,"HistoriaLaboral","api/HistoriaLaboral"),Object(o.a)(r,"HistoriaLaboralGetAllByDocument","api/HistoriaLaboral/GetAllByDocument"),Object(o.a)(r,"HistoriaLaboralId","api/HistoriaLaboral/id"),Object(o.a)(r,"HistoriaLaboralOtrasEmpresas","api/HistoriaLaboralOtrasEmpresas"),Object(o.a)(r,"HistoriaLaboralOtrasEmpresasGetAllByDocument","api/HistoriaLaboralOtrasEmpresas/GetAllByDocument"),Object(o.a)(r,"HistoriaLaboralOtrasEmpresasId","api/HistoriaLaboralOtrasEmpresas/id"),Object(o.a)(r,"CIE11","api/CIE11"),Object(o.a)(r,"CIE11Id","api/CIE11/id"),Object(o.a)(r,"Plantilla","api/Plantilla"),Object(o.a)(r,"PlantillaId","api/Plantilla/id"),Object(o.a)(r,"Items","api/Item"),Object(o.a)(r,"ItemsId","api/Item/id"),Object(o.a)(r,"ItemsGetAllByAtencion","api/Item/GetAllByAtencion"),Object(o.a)(r,"SegmentoAgrupado","api/SegmentoAgrupado"),Object(o.a)(r,"SegmentoAfectado","api/SegmentoAfectado/GetAllBySegAgrupado"),Object(o.a)(r,"Subsegmento","api/Subsegmento/GetAllBySegAfectado"),Object(o.a)(r,"MetodoCie11","api/CIE11/GetAllBySubsegmento"),Object(o.a)(r,"SegAfectado","api/SegmentoAfectado"),Object(o.a)(r,"Subsegment","api/Subsegmento"),Object(o.a)(r,"HistoriaClinica","api/HistoriaClinica"),Object(o.a)(r,"HistoriaClinicaId","api/HistoriaClinica/id"),Object(o.a)(r,"NotaEvolucion","api/NotaEvolucion"),Object(o.a)(r,"NotaEvolucionId","api/NotaEvolucion/id"),Object(o.a)(r,"NotaEnfermeria","api/NotaEnfermeria"),Object(o.a)(r,"NotaEnfermeriaId","api/NotaEnfermeria/id"),Object(o.a)(r,"MedicinaLaboral","api/MedicinaLaboralX"),Object(o.a)(r,"MedicinaLaboralId","api/MedicinaLaboralX/id"),Object(o.a)(r,"AusentismoLaboral","api/AusentismoLaboral"),Object(o.a)(r,"AusentismoLaboralId","api/AusentismoLaboral/id"),Object(o.a)(r,"HistoriaClinicaOcupacional","api/HistoriaClinicaOcupacional"),Object(o.a)(r,"HCOGetAllByDocumento","api/HistoriaClinicaOcupacional/GetAllByDocumento"),Object(o.a)(r,"HistoriaClinicaOcupacionalId","api/HistoriaClinicaOcupacional/id"),Object(o.a)(r,"HistoriaClinicaOcupacionalReport","api/HistoriaClinicaOcupacional/GetById"),Object(o.a)(r,"GetLastRecordHisCliOcu","api/HistoriaClinicaOcupacional/GetLastRecord"),Object(o.a)(r,"TipoAtencion","api/TipoAtencion"),Object(o.a)(r,"AtencionGetAllByTipoAtencion","api/Atencion/GetAllByTipoAtencion"),Object(o.a)(r,"Atencion","api/Atencion"),Object(o.a)(r,"Cuestionario","api/CuestionarioPrevencion"),Object(o.a)(r,"CuestionarioSave","api/CuestionarioPrevencion/Save"),Object(o.a)(r,"CuestionarioId","api/CuestionarioPrevencion/id"),r)},646:function(e,a,t){"use strict";t.d(a,"c",(function(){return l})),t.d(a,"b",(function(){return u})),t.d(a,"d",(function(){return O})),t.d(a,"a",(function(){return b}));var r=t(45),o=t.n(r),i=t(66),n=t(645),c=t(200),s=t.n(c);function l(){return d.apply(this,arguments)}function d(){return d=Object(i.a)(o.a.mark((function e(){var a,t,r=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.length>0&&void 0!==r[0]?r[0]:"",t=r.length>1&&void 0!==r[1]?r[1]:{},!(r.length>2&&void 0!==r[2]&&r[2])){e.next=15;break}return e.prev=4,e.next=7,s()({method:"post",url:"".concat(n.a.Base).concat(a),data:t,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(4),console.log("catch post ",e.t0);case 13:e.next=24;break;case 15:return e.prev=15,e.next=18,s()({method:"post",url:"".concat(n.a.Base).concat(a),data:t}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 18:return e.abrupt("return",e.sent);case 21:e.prev=21,e.t1=e.catch(15),console.log("catch post ",e.t1);case 24:case"end":return e.stop()}}),e,null,[[4,10],[15,21]])}))),d.apply(this,arguments)}function u(){return p.apply(this,arguments)}function p(){return p=Object(i.a)(o.a.mark((function e(){var a,t,r,i=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=i.length>0&&void 0!==i[0]?i[0]:"",t=i.length>1&&void 0!==i[1]?i[1]:{},e.prev=2,r=new URL("".concat(n.a.Base).concat(a)),Object.keys(t).forEach((function(e){return r.searchParams.append(e,t[e])})),e.next=7,s.a.get(r).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(2),console.log("catch get ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])}))),p.apply(this,arguments)}function O(){return A.apply(this,arguments)}function A(){return A=Object(i.a)(o.a.mark((function e(){var a,t,r=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.length>0&&void 0!==r[0]?r[0]:"",t=r.length>1&&void 0!==r[1]?r[1]:{},e.prev=2,e.next=5,s()({method:"put",url:"".concat(n.a.Base).concat(a),data:t}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 5:return e.abrupt("return",e.sent);case 8:e.prev=8,e.t0=e.catch(2),console.log("catch put ",e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])}))),A.apply(this,arguments)}function b(){return g.apply(this,arguments)}function g(){return g=Object(i.a)(o.a.mark((function e(){var a,t,r,i=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=i.length>0&&void 0!==i[0]?i[0]:"",t=i.length>1&&void 0!==i[1]?i[1]:{},e.prev=2,r=new URL("".concat(n.a.Base).concat(a)),Object.keys(t).forEach((function(e){return r.searchParams.append(e,t[e])})),e.next=7,s.a.delete(r).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(2),console.log("catch delete ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])}))),g.apply(this,arguments)}},648:function(e,a,t){"use strict";t.d(a,"a",(function(){return i})),t.d(a,"b",(function(){return n})),t.d(a,"c",(function(){return c})),t.d(a,"e",(function(){return s})),t.d(a,"f",(function(){return l})),t.d(a,"d",(function(){return d}));var r,o=t(5),i=(r={Departamento:4,Sede:6,Escolaridad:2,Genero:1,EstadoCivil:3,TipoContrato:7,Rol:21,RosterPosition:14,GeneralPosition:15,DepartEmpresa:13,Area:16,SubArea:17,Grupo:12,Turno:11,Estado:18,Eps:9,Afp:8,Arl:10,Ges:20,Cesantias:19,AtencionEMO:138,TIPO_EXAMEN_PARACLINICOS:68,ESTUDIO_EXAMEN_PARACLINICOS:22,LABORATORIO_ORDENES_PARACLINICOS:30,TIPORNM_ORDENES_PARACLINICOS:114,TIPO_ATENCION:107,PANO_ANALISISRUIDO:8,PANO_ANALISISMPI:8,"PANO_EXPOSICI\xd3N":130,PANO_MEDIDASCONTROL:40,PANO_RIESGO:128,PANO_GRADO_CONSINEPP:131,PARACLINICO_LECTURA:168,PARACLINICO_CONTROL:169,PARACLINICO_TIPOEPP:1168,PARACLINICO_RESULTADO:1169,VACUNAS:154,HCO_FRECUENCIAS:32,HCO_REFUERZO:150,HC_DEPORTE:143,HC_TIFOBIA:39,HCO_PARENTES:123,HCO_GINECOMETO:8,HCO_GINECOCICLO:8,HCO_GINECORESULT:8,HCO_BIOTIPO:37,HCO_RESULTADO:140,HCO_CONCEP_APTI_PSICO_INGRESO:151,HCO_CONCEP_APTI_PSICO_CONTROL:152,HCO_CONCEP_APTI_PSICO_PROMO:153,HCO_CONCEPTO_APTI_MEDICA:42,OPT_SINO:8,HCO_NEADONDE:145,HCO_RIESGO_CLASIFICACION:127,HCO_SINTOMAS_RESPIRATORIO:146,HCO_DX_TENSION_ARTERIAL:110,HCO_ANTECEDENTE_CARDIOVASCULAR:111,HCO_FRAM_BEBIDAS:31,HCO_DX_METABOLICO:142,RECE_TIPORDEN:8,RECE_CONTINGENCIA:8,PAD_MOTIVO:50,PAD_MOTIVO_NO_ASIS:54,UNIDAD:36,PAD_MUESTRA_AD:115,PAD_MUESTRA_AL:117,PAD_RESULTADO:116,PAD_CONCEPTOA:147,ASME_TIPOASESORIA:119,TIPO_PROVEEDOR:22,ROL_USUARIO:157,ESPECIALIDAD_MEDICO:158,CIUDADES:5,CLASE_AT:98,CAUSA_AT:99,SUBTIPO_AT:100,ESTADO_AT:102,AHC_ATENCION_NOTA_ENFERMERIA:136,Contingencia:74,PROCEDIMIENTO_ENFERMERIA:156,DiaTurno:76,JornadaTurno:139,MotivoPsicologia:53,MotivoMedica:52,ESTADO_EMPLEADO:162,ESTADO_RESTRICCION:163,TIPO_RESTRICCION:164,ORDENADO_POR:94,CONCEPTO_APTITUD_REINTEGRO:95,ORDENADO_POR_HORARIO:167,ORIGEN_REINTEGRO:90,TipoAsesoria:119,CausaAsesoria:8,EstadoAsesoria:8,EstadoCaso:48,ESTADO_CASO:38,TipoAtencion:65,Desocupado_EraDe_Plantilla1:8,Desocupado_EraDe_Plantilla2:8,Desocupado_EraDe_Plantilla3:8,SaludOcupacional_Atencion:8,SaludOcupacional_Motivo:8,TipoAtencion_Item:8,AHC_ATENCION:135,Opciones_SINO:88,AHC_CONCEP_ACTITUD:43,AUSLAB_INC:8,AUSLAB_TIPOINCA:8,AUSLAB_CONT:8,AUSLAB_ESTCAS:8,MEDLAB_RECASO:8,MEDLAB_REGION:8,MEDLAB_LATERA:8,MEDLAB_ENMO_EN:8,MEDLAB_ENDON_EN:8,MEDLAB_ORIGEN_EPS:8,MEDLAB_ORI_CA_ARL:8,MEDLAB_INS_ORIGEN:8},Object(o.a)(r,"MEDLAB_INS_ORIGEN",8),Object(o.a)(r,"AUSLAB_TISOPOR",8),Object(o.a)(r,"AUSLAB_CATEGORIA",8),Object(o.a)(r,"AUSLAB_TIPOATEN",8),Object(o.a)(r,"AUSLAB_REDEXP",8),Object(o.a)(r,"LISTA_CHEKEO_REINTEGRO",159),r),n={SINREGISTRO_GLOBAL:1,AsesoriaPsicologica:3909,ASESORIA_MEDICA:3911,SinRegistro:1},c={SINREGISTRO_GLOBAL:1,SINREGISTRO_TEXTO:"REGISTRO NO APLICA",GeneroWomen:2,ATENCION_ATENDIDO:"ATENDIDO",PARACLINICO_RNM:"RNM",PARACLINICO_ELECTRO:"ELECTROCARDIOGRAMA",PARACLINICO_PSA:"PSA",PARACLINICO_RXTORAX:"RXTORAX",PARACLINICO_CITOLOGIA:"CITOLOGIA",PARACLINICO_VISIOMETRIA:"VISIOMETRIA",PARACLINICO_ESPIROMETRIA:"ESPIROMETRIA",TIPO_ORDEN_FORMULA:4023,TIPO_ORDEN_EXAMEN:4026,TIPO_ORDEN_IMAGEN:4025,TIPO_ORDEN_LABORATORIO:4024,TIPO_ATENCION_EMO:3900,ATENCION_PRUEBA_ALCOHOL:3908,ATENCION_ENFERMERIA:3907,TIPO_ATENCION_ASESORIAS:3899,TIPO_ATENCION_ASESORIAS_PSICO:3909,TIPO_ATENCION_ASESORIAS_MEDICA:3911,TIPO_ATENCION_ENFERMERIA:3898,TIPO_ATENCION_ATENCIONMEDICA:3897,TIPO_ATENCION_ATENCIONMEDICA_NUEVO:3931,TIPO_ATENCION_ATENCIONMEDICA_CONTROL:3932,EMO_ATENCION_INGRESO:3918,EMO_ATENCION_CONTRO:3921,EMO_ATENCION_PROMO:3922,ORDENES_LABORATORIO:3533,ORDENES_FECHA_EXAM_FISICO:3541,ORDENES_RNM:3537,CONCEPTO_PAD_APTO:4103,CONCEPTO_PAD_NOAPTO:4104,RESULTADO_PAD_POSITIVO:4097,TIP_AT_TRIAGE:3897,TIP_AT_ENFERME:3898,TIP_AT_ASESORIA:3899,TIP_AT_EMO:3900,AT_ENFERMERIA:3907,AT_PAD:3908,AT_PAD_MOTIVO:3802,AT_PSICO:3909,AT_ASESORIA_MEDICA:3911,RiesgoEnOtrasEmpresas:4067,RiesgoQuimico:3949,RiesgoQuimico_MPI_DLTD:3955,RiesgoQuimico_RUIDO_DLTD:3960,RiesgoFisico:3950,RiesgoPsicosocial:3952,RiesgoBiologico:3953,RiesgoErgonomicoCargaFisica_Postura:3954,RiesgoErgonomicoCargaFisica_Fuerza:4065,RiesgoErgonomicoCargaFisica_Movimiento:4066,Opcion_SI:4005,Opcion_NO:4006},s={Guardar:"Guardar",CerrarCaso:"Cerrar Caso",OrdenesMedicas:"Ordenes Medicas",SubirArchivo:"Subir Archivo",Programacion:"Programaci\xf3n",Imprimir:"Imprimir",Cancelar:"Cerrar",Cerrar:"Cancelar",Actualizar:"Actualizar",Eliminar:"Eliminar",Agregar:"Nuevo",Seleccionadas:"Seleccionadas",Regresar:"Regresar",RegresarACargos:"Regresar A Cargos"},l={Requerido:"Este campo es requerido"},d={Guardar:"Registro guardado con \xe9xito",RiesgoGuardado:"Riesgos Cargados",Actualizar:"Registro actualizado con \xe9xito",Eliminar:"Registro eliminado con \xe9xito",TituloEliminar:"\xbfEstas seguro?",TextoEliminar:"Este registro se eliminara, \xbfesta seguro de eliminarlo?",TituloCerrarCaso:"\xbfEstas seguro de Cerrar Caso?",TextoCerrarCaso:"Este caso ser\xe1 cerrado, \xbfesta seguro de hacerlo?",TituloCargar:"\xbfDesea cargar la exposici\xf3n ocupacional?",TextoCargar:"Se cargaran los riesgos, esto puede demorar un poco",NoEliminar:"No se pudo eliminar el registro",ErrorDocumento:"Por favor, ingrese un n\xfamero de documento",ErrorDeDatos:"Hubo un error al buscar los datos, vuelva a intentarlo",ErrorNoHayDatos:"No hay datos buscados, vuelva a intentarlo",CampoRequerido:"Este campo es requerido"}},656:function(e,a,t){"use strict";t.d(a,"f",(function(){return u})),t.d(a,"e",(function(){return p})),t.d(a,"g",(function(){return O})),t.d(a,"c",(function(){return g})),t.d(a,"d",(function(){return C})),t.d(a,"a",(function(){return E})),t.d(a,"b",(function(){return I}));var r=t(4),o=t(0),i=t.n(o),n=t(548),c=t(619),s=t(648),l=t(624),d=t(1),u={title:"".concat(s.d.TituloEliminar),text:"".concat(s.d.TextoEliminar),icon:"error",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}},p={title:"".concat(s.d.TituloCerrarCaso),text:"".concat(s.d.TextoCerrarCaso),icon:"warning",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}},O={title:"".concat(s.d.TituloCargar),text:"".concat(s.d.TextoCargar),icon:"warning",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}};function A(e){return Object(d.jsx)(n.a,Object(r.a)(Object(r.a)({},e),{},{direction:"up"}))}var b=i.a.forwardRef((function(e,a){return Object(d.jsx)(c.a,Object(r.a)({elevation:6,ref:a,variant:"filled"},e))})),g=function(e){var a=e.open,t=e.onClose;return Object(d.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2500,onClose:t,children:Object(d.jsx)(b,{severity:"success",sx:{width:"100%"},children:s.d.Guardar})},"alert")},C=function(e){var a=e.open,t=e.onClose;return Object(d.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2500,onClose:t,children:Object(d.jsx)(b,{severity:"success",sx:{width:"100%"},children:s.d.Actualizar})},"alert")},E=function(e){var a=e.open,t=e.onClose;return Object(d.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2500,onClose:t,children:Object(d.jsx)(b,{severity:"error",sx:{width:"100%"},children:s.d.Eliminar})},"alert")},I=function(e){var a=e.open,t=e.onClose,r=e.error;return Object(d.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2e3,onClose:t,children:Object(d.jsx)(b,{severity:"error",sx:{width:"100%"},children:r})},"alert")}},694:function(e,a,t){"use strict";var r=t(4),o=t(101),i=t(33),n=t(626),c=t(1),s=["chipcolor","disabled","variant","sx"];a.a=function(e){var a,t,l,d,u,p,O,A,b=e.chipcolor,g=e.disabled,C=e.variant,E=e.sx,I=void 0===E?{}:E,j=Object(o.a)(e,s),h=Object(i.a)(),m={color:"dark"===h.palette.mode?h.palette.primary.light:h.palette.primary.main,bgcolor:"dark"===h.palette.mode?h.palette.primary.main:h.palette.primary.light,":hover":{color:h.palette.primary.light,bgcolor:"dark"===h.palette.mode?h.palette.primary.dark+90:h.palette.primary.dark}},R={color:h.palette.primary.main,bgcolor:"transparent",border:"1px solid",borderColor:h.palette.primary.main,":hover":{color:(h.palette.mode,h.palette.primary.light),bgcolor:"dark"===h.palette.mode?h.palette.primary.main:h.palette.primary.dark}};switch(b){case"secondary":"outlined"===C?R={color:h.palette.secondary.main,bgcolor:"transparent",border:"1px solid",borderColor:h.palette.secondary.main,":hover":{color:"dark"===h.palette.mode?h.palette.secondary.light:h.palette.secondary.main,bgcolor:"dark"===h.palette.mode?h.palette.secondary.dark:h.palette.secondary.light}}:m={color:"dark"===h.palette.mode?h.palette.secondary.light:h.palette.secondary.main,bgcolor:"dark"===h.palette.mode?h.palette.secondary.dark:h.palette.secondary.light,":hover":{color:h.palette.secondary.light,bgcolor:"dark"===h.palette.mode?h.palette.secondary.dark+90:h.palette.secondary.main}};break;case"success":"outlined"===C?R={color:h.palette.success.dark,bgcolor:"transparent",border:"1px solid",borderColor:h.palette.success.dark,":hover":{color:"dark"===h.palette.mode?h.palette.success.light:h.palette.success.dark,bgcolor:"dark"===h.palette.mode?h.palette.success.dark:h.palette.success.light+60}}:m={color:"dark"===h.palette.mode?h.palette.success.light:h.palette.success.dark,bgcolor:"dark"===h.palette.mode?h.palette.success.dark:h.palette.success.light+60,":hover":{color:h.palette.success.light,bgcolor:"dark"===h.palette.mode?h.palette.success.dark+90:h.palette.success.dark}};break;case"error":"outlined"===C?R={color:h.palette.error.main,bgcolor:"transparent",border:"1px solid",borderColor:h.palette.error.main,":hover":{color:"dark"===h.palette.mode?h.palette.error.light:h.palette.error.dark,bgcolor:"dark"===h.palette.mode?h.palette.error.dark:h.palette.error.light}}:m={color:"dark"===h.palette.mode?h.palette.error.light:h.palette.error.dark,bgcolor:"dark"===h.palette.mode?h.palette.error.dark:h.palette.error.light+60,":hover":{color:h.palette.error.light,bgcolor:"dark"===h.palette.mode?h.palette.error.dark+90:h.palette.error.dark}};break;case"orange":"outlined"===C?R={color:null===(a=h.palette.orange)||void 0===a?void 0:a.dark,bgcolor:"transparent",border:"1px solid",borderColor:null===(t=h.palette.orange)||void 0===t?void 0:t.main,":hover":{color:null===(l=h.palette.orange)||void 0===l?void 0:l.dark,bgcolor:null===(d=h.palette.orange)||void 0===d?void 0:d.light}}:m={color:null===(u=h.palette.orange)||void 0===u?void 0:u.dark,bgcolor:null===(p=h.palette.orange)||void 0===p?void 0:p.light,":hover":{color:null===(O=h.palette.orange)||void 0===O?void 0:O.light,bgcolor:null===(A=h.palette.orange)||void 0===A?void 0:A.dark}};break;case"warning":"outlined"===C?R={color:h.palette.warning.dark,bgcolor:"transparent",border:"1px solid",borderColor:h.palette.warning.dark,":hover":{color:h.palette.warning.dark,bgcolor:h.palette.warning.light}}:m={color:h.palette.warning.dark,bgcolor:h.palette.warning.light,":hover":{color:h.palette.warning.light,bgcolor:"dark"===h.palette.mode?h.palette.warning.dark+90:h.palette.warning.dark}}}g&&("outlined"===C?R={color:h.palette.grey[500],bgcolor:"transparent",border:"1px solid",borderColor:h.palette.grey[500],":hover":{color:h.palette.grey[500],bgcolor:"transparent"}}:m={color:h.palette.grey[500],bgcolor:h.palette.grey[50],":hover":{color:h.palette.grey[500],bgcolor:h.palette.grey[50]}});var _=m;return"outlined"===C&&(_=R),_=Object(r.a)(Object(r.a)({},_),I),Object(c.jsx)(n.a,Object(r.a)(Object(r.a)({},j),{},{sx:_}))}},713:function(e,a,t){"use strict";var r=t(100);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=r(t(127)),i=t(1),n=(0,o.default)((0,i.jsx)("path",{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"AddCircleOutlineOutlined");a.default=n},759:function(e,a,t){"use strict";var r=t(100);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=r(t(127)),i=t(1),n=(0,o.default)([(0,i.jsx)("path",{d:"M8 5h8v3H8z",opacity:".3"},"0"),(0,i.jsx)("circle",{cx:"18",cy:"11.5",r:"1"},"1"),(0,i.jsx)("path",{d:"M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm4-4h-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4z"},"2"),(0,i.jsx)("path",{d:"M6 13h12v2h2v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4h2v-2zm12-2.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z",opacity:".3"},"3")],"PrintTwoTone");a.default=n},830:function(e,a,t){"use strict";t.d(a,"b",(function(){return s})),t.d(a,"c",(function(){return l})),t.d(a,"d",(function(){return d})),t.d(a,"e",(function(){return u})),t.d(a,"a",(function(){return p}));var r=t(45),o=t.n(r),i=t(66),n=t(645),c=t(646),s=function(){var e=Object(i.a)(o.a.mark((function e(a,t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.b)(n.a.Medicamentos,{page:a,pageSize:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),l=function(){var e=Object(i.a)(o.a.mark((function e(a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.b)(n.a.MedicamentosId,{id:a});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),d=function(){var e=Object(i.a)(o.a.mark((function e(a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.c)(n.a.Medicamentos,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),u=function(){var e=Object(i.a)(o.a.mark((function e(a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.d)(n.a.Medicamentos,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),p=function(){var e=Object(i.a)(o.a.mark((function e(a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.a)(n.a.Medicamentos,{idMedicines:a});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()}}]);
//# sourceMappingURL=132.43e905c3.chunk.js.map