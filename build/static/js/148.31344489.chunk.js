(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[148],{1637:function(e,a,t){"use strict";t.r(a);var r=t(45),i=t.n(r),o=t(66),n=t(10),c=t(4),s=t(0),l=t(25),u=t(24),O=t(33),d=t(763),p=t(764),A=t(887),E=t(824),C=t(796),b=t(163),I=t(99),j=t(634),g=t(562),R=t(564),_=t(345),h=t(61),m=t(560),P=t(631),v=t(638),T=t(761),S=t(762),f=t(765),N=t(563),x=t(1709),L=t(614),D=t(13),H=t(648),y=t(15),M=t(102),G=t(758),B=t(713),k=t.n(B),w=t(738),U=t.n(w),z=t(759),F=t.n(z),X=t(670),V=t.n(X),q=t(986),J=t.n(q),Q=t(741),W=t.n(Q),K=t(756),Z=t.n(K),Y=t(1),$=Z.a.ExcelFile,ee=Z.a.ExcelFile.ExcelSheet,ae=Z.a.ExcelFile.ExcelColumn;function te(e,a,t){return a[t]<e[t]?-1:a[t]>e[t]?1:0}var re=function(e,a){return"desc"===e?function(e,t){return te(e,t,a)}:function(e,t){return-te(e,t,a)}};function ie(e,a){var t=e.map((function(e,a){return[e,a]}));return t.sort((function(e,t){var r=a(e[0],t[0]);return 0!==r?r:e[1]-t[1]})),t.map((function(e){return e[0]}))}var oe=[{id:"documento",numeric:!1,label:"Documento",align:"center"},{id:"Fecha",numeric:!1,label:"fecha",align:"left"},{id:"atencion",numeric:!1,label:"Atenci\xf3n",align:"left"},{id:"motivo",numeric:!1,label:"Motivo",align:"left"},{id:"tipoProv",numeric:!1,label:"Tipo Proveedor",align:"left"}];function ne(e){var a=e.onClick,t=e.onSelectAllClick,r=e.order,i=e.orderBy,o=e.numSelected,n=e.rowCount,c=e.onRequestSort,s=e.theme,l=e.selected;return Object(Y.jsx)(d.a,{children:Object(Y.jsxs)(p.a,{children:[Object(Y.jsx)(A.a,{padding:"checkbox",sx:{pl:3},children:Object(Y.jsx)(E.a,{color:"primary",indeterminate:o>0&&o<n,checked:n>0&&o===n,onChange:t,inputProps:{"aria-label":"select all desserts"}})}),o>0&&Object(Y.jsx)(A.a,{padding:"none",colSpan:8,children:Object(Y.jsx)(ce,{numSelected:l.length,onClick:a})}),o<=0&&oe.map((function(e){return Object(Y.jsx)(A.a,{align:e.align,padding:e.disablePadding?"none":"normal",sortDirection:i===e.id&&r,children:Object(Y.jsxs)(C.a,{active:i===e.id,direction:i===e.id?r:"asc",onClick:(a=e.id,function(e){c(e,a)}),children:[e.label,i===e.id?Object(Y.jsx)(b.a,{component:"span",sx:L.a,children:"desc"===r?"sorted descending":"sorted ascending"}):null]})},e.id);var a})),o<=0&&Object(Y.jsx)(A.a,{sortDirection:!1,align:"center",sx:{pr:3},children:Object(Y.jsx)(I.a,{variant:"subtitle1",sx:{color:"dark"===s.palette.mode?"grey.600":"grey.900"},children:"Acci\xf3n"})})]})})}var ce=function(e){var a=e.numSelected,t=e.onClick;return Object(Y.jsxs)(j.a,{sx:Object(c.a)({p:0,pl:1,pr:1},a>0&&{color:function(e){return e.palette.secondary.main}}),children:[a>0?Object(Y.jsxs)(I.a,{color:"inherit",variant:"h4",children:[a," ",H.e.Seleccionadas]}):Object(Y.jsx)(I.a,{variant:"h6",id:"tableTitle",children:"Nutrici\xf3n"}),Object(Y.jsx)(b.a,{sx:{flexGrow:1}}),a>0&&Object(Y.jsx)(g.a,{title:H.e.Eliminar,onClick:t,children:Object(Y.jsx)(R.a,{size:"large",children:Object(Y.jsx)(U.a,{fontSize:"small"})})})]})};a.default=function(){var e=Object(u.c)(),a=Object(s.useState)([]),t=Object(n.a)(a,2),r=t[0],c=t[1],d=Object(O.a)(),C=Object(s.useState)("asc"),b=Object(n.a)(C,2),j=b[0],L=b[1],B=Object(s.useState)("calories"),w=Object(n.a)(B,2),U=w[0],z=w[1],X=Object(s.useState)([]),q=Object(n.a)(X,2),Q=q[0],K=q[1],Z=Object(s.useState)(0),te=Object(n.a)(Z,2),oe=te[0],ce=te[1],se=Object(s.useState)(5),le=Object(n.a)(se,2),ue=le[0],Oe=le[1],de=Object(s.useState)(""),pe=Object(n.a)(de,2),Ae=pe[0],Ee=pe[1],Ce=Object(s.useState)([]),be=Object(n.a)(Ce,2),Ie=be[0],je=be[1];function ge(){return Re.apply(this,arguments)}function Re(){return(Re=Object(o.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(G.b)(0,0);case 3:a=e.sent,c(a.data.entities),je(a.data.entities),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}Object(s.useEffect)((function(){ge()}),[]);var _e=function(e,a){ve(a);var t=Q.indexOf(a),r=[];-1===t?r=r.concat(Q,a):0===t?r=r.concat(Q.slice(1)):t===Q.length-1?r=r.concat(Q.slice(0,-1)):t>0&&(r=r.concat(Q.slice(0,t),Q.slice(t+1))),K(r)},he=Object(s.useState)(""),me=Object(n.a)(he,2),Pe=me[0],ve=me[1],Te=function(){var a=Object(o.a)(i.a.mark((function a(){return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(G.a)(Pe);case 3:200===a.sent.status&&e({type:y.H,open:!0,message:"".concat(H.d.Eliminar),variant:"alert",alertSeverity:"error",close:!1,transition:"SlideUp"}),K([]),ge(),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(0),console.log(a.t0);case 12:case"end":return a.stop()}}),a,null,[[0,9]])})));return function(){return a.apply(this,arguments)}}(),Se=Object(l.e)(),fe=oe>0?Math.max(0,(1+oe)*ue-r.length):0;return Object(Y.jsxs)(M.a,{title:"Lista de Proveedores",content:!1,children:[Object(Y.jsx)(_.a,{children:Object(Y.jsxs)(h.a,{container:!0,justifyContent:"space-between",alignItems:"center",spacing:2,children:[Object(Y.jsx)(h.a,{item:!0,xs:12,sm:6,children:Object(Y.jsx)(m.a,{InputProps:{startAdornment:Object(Y.jsx)(P.a,{position:"start",children:Object(Y.jsx)(V.a,{fontSize:"small"})})},onChange:function(e){var a=null===e||void 0===e?void 0:e.target.value;if(Ee(a||""),a){var t=Ie.filter((function(e){var t=!0,r=!1;return["codiProv","nombProv","teleProv","emaiProv","tipoProv"].forEach((function(t){e[t].toString().toLowerCase().includes(a.toString().toLowerCase())&&(r=!0)})),r||(t=!1),t}));c(t)}else c(Ie)},placeholder:"Buscar",value:Ae,size:"small"})}),Object(Y.jsxs)(h.a,{item:!0,xs:12,sm:6,sx:{textAlign:"right"},children:[Object(Y.jsx)($,{element:Object(Y.jsx)(g.a,{title:"Exportar",children:Object(Y.jsx)(R.a,{size:"large",children:Object(Y.jsx)(D.R,{})})}),filename:"Empresas",children:Object(Y.jsxs)(ee,{data:r,name:"Empresas",children:[Object(Y.jsx)(ae,{label:"C\xf3digo",value:"codiProv"}),Object(Y.jsx)(ae,{label:"Nombre",value:"nombProv"}),Object(Y.jsx)(ae,{label:"Tel\xe9fono",value:"teleProv"}),Object(Y.jsx)(ae,{label:"Correo Electronico",value:"emaiProv"}),Object(Y.jsx)(ae,{label:"Tipo de Proveedor",value:"nameTypeSupplier"})]})}),Object(Y.jsx)(g.a,{title:"Impresi\xf3n",onClick:function(){return Se("/occupational-health/report")},children:Object(Y.jsx)(R.a,{size:"large",children:Object(Y.jsx)(F.a,{})})}),Object(Y.jsx)(v.a,{variant:"contained",size:"large",startIcon:Object(Y.jsx)(k.a,{}),onClick:function(){return Se("/occupational-health/add")},children:H.e.Agregar})]})]})}),Object(Y.jsx)(T.a,{children:Object(Y.jsxs)(S.a,{sx:{minWidth:750},"aria-labelledby":"tableTitle",children:[Object(Y.jsx)(ne,{numSelected:Q.length,order:j,orderBy:U,onSelectAllClick:function(e){if(e.target.checked){var a=r.map((function(e){return e.codiProv}));K(a)}else K([])},onRequestSort:function(e,a){L(U===a&&"asc"===j?"desc":"asc"),z(a)},rowCount:r.length,theme:d,selected:Q,onClick:Te}),Object(Y.jsxs)(f.a,{children:[ie(r,re(j,U)).slice(oe*ue,oe*ue+ue).map((function(e,a){if("string"===typeof e)return null;var t,r=(t=e.codiProv,-1!==Q.indexOf(t)),i="enhanced-table-checkbox-".concat(a);return Object(Y.jsxs)(p.a,{hover:!0,role:"checkbox","aria-checked":r,tabIndex:-1,selected:r,children:[Object(Y.jsx)(A.a,{padding:"checkbox",sx:{pl:3},onClick:function(a){return _e(0,e.codiProv)},children:Object(Y.jsx)(E.a,{color:"primary",checked:r,inputProps:{"aria-labelledby":i}})}),Object(Y.jsx)(A.a,{component:"th",id:i,scope:"row",onClick:function(a){return _e(0,e.codiProv)},sx:{cursor:"pointer"},align:"center",children:Object(Y.jsxs)(I.a,{variant:"subtitle1",sx:{color:"dark"===d.palette.mode?"grey.600":"grey.900"},children:[" ","#",e.codiProv," "]})}),Object(Y.jsx)(A.a,{component:"th",id:i,scope:"row",onClick:function(a){return _e(0,e.codiProv)},sx:{cursor:"pointer"},children:Object(Y.jsxs)(I.a,{variant:"subtitle1",sx:{color:"dark"===d.palette.mode?"grey.600":"grey.900"},children:[" ",e.nombProv," "]})}),Object(Y.jsx)(A.a,{component:"th",id:i,scope:"row",onClick:function(a){return _e(0,e.codiProv)},sx:{cursor:"pointer"},children:Object(Y.jsxs)(I.a,{variant:"subtitle1",sx:{color:"dark"===d.palette.mode?"grey.600":"grey.900"},children:[" ",e.teleProv," "]})}),Object(Y.jsx)(A.a,{component:"th",id:i,scope:"row",onClick:function(a){return _e(0,e.codiProv)},sx:{cursor:"pointer"},children:Object(Y.jsxs)(I.a,{variant:"subtitle1",sx:{color:"dark"===d.palette.mode?"grey.600":"grey.900"},children:[" ",e.emaiProv," "]})}),Object(Y.jsx)(A.a,{component:"th",id:i,scope:"row",onClick:function(a){return _e(0,e.codiProv)},sx:{cursor:"pointer"},children:Object(Y.jsxs)(I.a,{variant:"subtitle1",sx:{color:"dark"===d.palette.mode?"grey.600":"grey.900"},children:[" ",e.tipoProv," "]})}),Object(Y.jsxs)(A.a,{align:"center",sx:{pr:3},children:[Object(Y.jsx)(R.a,{color:"primary",size:"large",children:Object(Y.jsx)(J.a,{sx:{fontSize:"1.3rem"}})}),Object(Y.jsx)(N.a,{size:"small",color:"info",sx:{boxShadow:"none",ml:1,width:32,height:32,minHeight:32},onClick:function(){return Se("/occupational-health/update/".concat(e.codiProv))},children:Object(Y.jsx)(R.a,{size:"large",children:Object(Y.jsx)(W.a,{sx:{fontSize:"1.3rem"}})})})]})]},a)})),fe>0&&Object(Y.jsx)(p.a,{style:{height:53*fe},children:Object(Y.jsx)(A.a,{colSpan:6})})]})]})}),Object(Y.jsx)(x.a,{rowsPerPageOptions:[5,10,25],component:"div",count:r.length,rowsPerPage:ue,page:oe,onPageChange:function(e,a){ce(a)},onRowsPerPageChange:function(e){(null===e||void 0===e?void 0:e.target.value)&&Oe(parseInt(null===e||void 0===e?void 0:e.target.value,10)),ce(0)}})]})}},645:function(e,a,t){"use strict";t.d(a,"a",(function(){return o}));var r,i=t(5),o=(r={Base:"https://siiso4.westus3.cloudapp.azure.com:44347/",TipoCatalogo:"api/TipoCatalogo",TipoCatalogoId:"api/TipoCatalogo/id",Catalogo:"api/Catalogo",CatalogoId:"api/Catalogo/id",GetAllByTipoCatalogo:"api/Catalogo/GetAllByTipoCatalogo",GetAllBySubTipoCatalogo:"api/Catalogo/GetAllBySubTipoCatalogo",Empleado:"api/Empleado",EmpleadoId:"api/Empleado/id",Reintegro:"api/Reintegro",ReintegroId:"api/Reintegro/id",ListaReintegro:"api/ListaReintegro",ListaReintegro_GetAllReintegro:"api/ListaReintegro/GetAllReintegro",ListaReintegroId:"api/ListaReintegro/id",Cargo:"api/Cargo",CargoId:"api/Cargo/id",Panorama:"api/Panoramariesgo",PanoramaGetAllByCharge:"api/Panoramariesgo/GetAllByCharge",PanoramaId:"api/Panoramariesgo/id",Recetario:"api/Recetario",RecetarioId:"api/Recetario/id",Medicamentos:"api/Medicamentos",MedicamentosId:"api/Medicamentos/id",PruebasAlcoholDroga:"api/PruebasAlcoholDroga",PruebasAlcoholDrogaId:"api/PruebasAlcoholDroga/id",Empresa:"api/Empresa",EmpresaId:"api/Empresa/id",SGSST:"api/SistemaGestion",SGSSTId:"api/SistemaGestion/id",RiesgoHistoriaLaboral:"api/RiesgoHistoriaLaboral",RiesgoHistoriaLaboralId:"api/RiesgoHistoriaLaboral/id",RHLByChargeHistorico:"api/RiesgoHistoriaLaboral/GetAllByChargeHistorico",RHLByHistorico:"api/RiesgoHistoriaLaboral/GetAllByHistorico",RHLByChargeAdvance:"api/RiesgoHistoriaLaboral/GetAllByChargeAdvance",RiesgoHistoriaLaboralEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas",RiesgoHistoriaLaboralIdEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/id",RHLByChargeHistoricoEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByChargeHistorico",RHLByHistoricoEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByHistorico",RHLByChargeAdvanceEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByChargeAdvance",Proveedor:"api/Proveedor",ProveedorId:"api/Proveedor/id",Usuarios:"api/Usuarios",UsuariosId:"api/Usuarios/id",UsuariosEmail:"api/Usuarios/email",RegistroAtencion:"api/RegistroAtencion",RegistroAtencio_GetAllAtencion:"api/RegistroAtencion/GetAllAtencion",RegistroAtencionId:"api/RegistroAtencion/id",Paraclinicos:"api/Paraclinicos",Paraclinicos_GetAllByTypeParaclinico:"api/Paraclinicos/GetAllByTipoParaclinico",ParaclinicosId:"api/Paraclinicos/id",Ordenes:"api/Ordenes",OrdenesId:"api/Ordenes/id",Asesorias:"api/Asesorias",AsesoriasId:"api/Asesorias/id",Accidentalidad:"api/Accidentalidad",AccidentalidadId:"api/Accidentalidad/id"},Object(i.a)(r,"RegistroAtencion","api/RegistroAtencion"),Object(i.a)(r,"RegistroAtencionId","api/RegistroAtencion/id"),Object(i.a)(r,"HistoriaLaboral","api/HistoriaLaboral"),Object(i.a)(r,"HistoriaLaboralGetAllByDocument","api/HistoriaLaboral/GetAllByDocument"),Object(i.a)(r,"HistoriaLaboralId","api/HistoriaLaboral/id"),Object(i.a)(r,"HistoriaLaboralOtrasEmpresas","api/HistoriaLaboralOtrasEmpresas"),Object(i.a)(r,"HistoriaLaboralOtrasEmpresasGetAllByDocument","api/HistoriaLaboralOtrasEmpresas/GetAllByDocument"),Object(i.a)(r,"HistoriaLaboralOtrasEmpresasId","api/HistoriaLaboralOtrasEmpresas/id"),Object(i.a)(r,"CIE11","api/CIE11"),Object(i.a)(r,"CIE11Id","api/CIE11/id"),Object(i.a)(r,"Plantilla","api/Plantilla"),Object(i.a)(r,"PlantillaId","api/Plantilla/id"),Object(i.a)(r,"Items","api/Item"),Object(i.a)(r,"ItemsId","api/Item/id"),Object(i.a)(r,"ItemsGetAllByAtencion","api/Item/GetAllByAtencion"),Object(i.a)(r,"SegmentoAgrupado","api/SegmentoAgrupado"),Object(i.a)(r,"SegmentoAfectado","api/SegmentoAfectado/GetAllBySegAgrupado"),Object(i.a)(r,"Subsegmento","api/Subsegmento/GetAllBySegAfectado"),Object(i.a)(r,"MetodoCie11","api/CIE11/GetAllBySubsegmento"),Object(i.a)(r,"SegAfectado","api/SegmentoAfectado"),Object(i.a)(r,"Subsegment","api/Subsegmento"),Object(i.a)(r,"HistoriaClinica","api/HistoriaClinica"),Object(i.a)(r,"HistoriaClinicaId","api/HistoriaClinica/id"),Object(i.a)(r,"NotaEvolucion","api/NotaEvolucion"),Object(i.a)(r,"NotaEvolucionId","api/NotaEvolucion/id"),Object(i.a)(r,"NotaEnfermeria","api/NotaEnfermeria"),Object(i.a)(r,"NotaEnfermeriaId","api/NotaEnfermeria/id"),Object(i.a)(r,"MedicinaLaboral","api/MedicinaLaboralX"),Object(i.a)(r,"MedicinaLaboralId","api/MedicinaLaboralX/id"),Object(i.a)(r,"AusentismoLaboral","api/AusentismoLaboral"),Object(i.a)(r,"AusentismoLaboralId","api/AusentismoLaboral/id"),Object(i.a)(r,"HistoriaClinicaOcupacional","api/HistoriaClinicaOcupacional"),Object(i.a)(r,"HCOGetAllByDocumento","api/HistoriaClinicaOcupacional/GetAllByDocumento"),Object(i.a)(r,"HistoriaClinicaOcupacionalId","api/HistoriaClinicaOcupacional/id"),Object(i.a)(r,"HistoriaClinicaOcupacionalReport","api/HistoriaClinicaOcupacional/GetById"),Object(i.a)(r,"GetLastRecordHisCliOcu","api/HistoriaClinicaOcupacional/GetLastRecord"),Object(i.a)(r,"TipoAtencion","api/TipoAtencion"),Object(i.a)(r,"AtencionGetAllByTipoAtencion","api/Atencion/GetAllByTipoAtencion"),Object(i.a)(r,"Atencion","api/Atencion"),Object(i.a)(r,"Cuestionario","api/CuestionarioPrevencion"),Object(i.a)(r,"CuestionarioSave","api/CuestionarioPrevencion/Save"),Object(i.a)(r,"CuestionarioId","api/CuestionarioPrevencion/id"),r)},646:function(e,a,t){"use strict";t.d(a,"c",(function(){return l})),t.d(a,"b",(function(){return O})),t.d(a,"d",(function(){return p})),t.d(a,"a",(function(){return E}));var r=t(45),i=t.n(r),o=t(66),n=t(645),c=t(200),s=t.n(c);function l(){return u.apply(this,arguments)}function u(){return u=Object(o.a)(i.a.mark((function e(){var a,t,r=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.length>0&&void 0!==r[0]?r[0]:"",t=r.length>1&&void 0!==r[1]?r[1]:{},!(r.length>2&&void 0!==r[2]&&r[2])){e.next=15;break}return e.prev=4,e.next=7,s()({method:"post",url:"".concat(n.a.Base).concat(a),data:t,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(4),console.log("catch post ",e.t0);case 13:e.next=24;break;case 15:return e.prev=15,e.next=18,s()({method:"post",url:"".concat(n.a.Base).concat(a),data:t}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 18:return e.abrupt("return",e.sent);case 21:e.prev=21,e.t1=e.catch(15),console.log("catch post ",e.t1);case 24:case"end":return e.stop()}}),e,null,[[4,10],[15,21]])}))),u.apply(this,arguments)}function O(){return d.apply(this,arguments)}function d(){return d=Object(o.a)(i.a.mark((function e(){var a,t,r,o=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=o.length>0&&void 0!==o[0]?o[0]:"",t=o.length>1&&void 0!==o[1]?o[1]:{},e.prev=2,r=new URL("".concat(n.a.Base).concat(a)),Object.keys(t).forEach((function(e){return r.searchParams.append(e,t[e])})),e.next=7,s.a.get(r).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(2),console.log("catch get ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])}))),d.apply(this,arguments)}function p(){return A.apply(this,arguments)}function A(){return A=Object(o.a)(i.a.mark((function e(){var a,t,r=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.length>0&&void 0!==r[0]?r[0]:"",t=r.length>1&&void 0!==r[1]?r[1]:{},e.prev=2,e.next=5,s()({method:"put",url:"".concat(n.a.Base).concat(a),data:t}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 5:return e.abrupt("return",e.sent);case 8:e.prev=8,e.t0=e.catch(2),console.log("catch put ",e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])}))),A.apply(this,arguments)}function E(){return C.apply(this,arguments)}function C(){return C=Object(o.a)(i.a.mark((function e(){var a,t,r,o=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=o.length>0&&void 0!==o[0]?o[0]:"",t=o.length>1&&void 0!==o[1]?o[1]:{},e.prev=2,r=new URL("".concat(n.a.Base).concat(a)),Object.keys(t).forEach((function(e){return r.searchParams.append(e,t[e])})),e.next=7,s.a.delete(r).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(2),console.log("catch delete ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])}))),C.apply(this,arguments)}},648:function(e,a,t){"use strict";t.d(a,"a",(function(){return o})),t.d(a,"b",(function(){return n})),t.d(a,"c",(function(){return c})),t.d(a,"e",(function(){return s})),t.d(a,"f",(function(){return l})),t.d(a,"d",(function(){return u}));var r,i=t(5),o=(r={Departamento:4,Sede:6,Escolaridad:2,Genero:1,EstadoCivil:3,TipoContrato:7,Rol:21,RosterPosition:14,GeneralPosition:15,DepartEmpresa:13,Area:16,SubArea:17,Grupo:12,Turno:11,Estado:18,Eps:9,Afp:8,Arl:10,Ges:20,Cesantias:19,AtencionEMO:138,TIPO_EXAMEN_PARACLINICOS:68,ESTUDIO_EXAMEN_PARACLINICOS:22,LABORATORIO_ORDENES_PARACLINICOS:30,TIPORNM_ORDENES_PARACLINICOS:114,TIPO_ATENCION:107,PANO_ANALISISRUIDO:8,PANO_ANALISISMPI:8,"PANO_EXPOSICI\xd3N":130,PANO_MEDIDASCONTROL:40,PANO_RIESGO:128,PANO_GRADO_CONSINEPP:131,PARACLINICO_LECTURA:168,PARACLINICO_CONTROL:169,PARACLINICO_TIPOEPP:1168,PARACLINICO_RESULTADO:1169,VACUNAS:154,HCO_FRECUENCIAS:32,HCO_REFUERZO:150,HC_DEPORTE:143,HC_TIFOBIA:39,HCO_PARENTES:123,HCO_GINECOMETO:8,HCO_GINECOCICLO:8,HCO_GINECORESULT:8,HCO_BIOTIPO:37,HCO_RESULTADO:140,HCO_CONCEP_APTI_PSICO_INGRESO:151,HCO_CONCEP_APTI_PSICO_CONTROL:152,HCO_CONCEP_APTI_PSICO_PROMO:153,HCO_CONCEPTO_APTI_MEDICA:42,OPT_SINO:8,HCO_NEADONDE:145,HCO_RIESGO_CLASIFICACION:127,HCO_SINTOMAS_RESPIRATORIO:146,HCO_DX_TENSION_ARTERIAL:110,HCO_ANTECEDENTE_CARDIOVASCULAR:111,HCO_FRAM_BEBIDAS:31,HCO_DX_METABOLICO:142,RECE_TIPORDEN:8,RECE_CONTINGENCIA:8,PAD_MOTIVO:50,PAD_MOTIVO_NO_ASIS:54,UNIDAD:36,PAD_MUESTRA_AD:115,PAD_MUESTRA_AL:117,PAD_RESULTADO:116,PAD_CONCEPTOA:147,ASME_TIPOASESORIA:119,TIPO_PROVEEDOR:22,ROL_USUARIO:157,ESPECIALIDAD_MEDICO:158,CIUDADES:5,CLASE_AT:98,CAUSA_AT:99,SUBTIPO_AT:100,ESTADO_AT:102,AHC_ATENCION_NOTA_ENFERMERIA:136,Contingencia:74,PROCEDIMIENTO_ENFERMERIA:156,DiaTurno:76,JornadaTurno:139,MotivoPsicologia:53,MotivoMedica:52,ESTADO_EMPLEADO:162,ESTADO_RESTRICCION:163,TIPO_RESTRICCION:164,ORDENADO_POR:94,CONCEPTO_APTITUD_REINTEGRO:95,ORDENADO_POR_HORARIO:167,ORIGEN_REINTEGRO:90,TipoAsesoria:119,CausaAsesoria:8,EstadoAsesoria:8,EstadoCaso:48,ESTADO_CASO:38,TipoAtencion:65,Desocupado_EraDe_Plantilla1:8,Desocupado_EraDe_Plantilla2:8,Desocupado_EraDe_Plantilla3:8,SaludOcupacional_Atencion:8,SaludOcupacional_Motivo:8,TipoAtencion_Item:8,AHC_ATENCION:135,Opciones_SINO:88,AHC_CONCEP_ACTITUD:43,AUSLAB_INC:8,AUSLAB_TIPOINCA:8,AUSLAB_CONT:8,AUSLAB_ESTCAS:8,MEDLAB_RECASO:8,MEDLAB_REGION:8,MEDLAB_LATERA:8,MEDLAB_ENMO_EN:8,MEDLAB_ENDON_EN:8,MEDLAB_ORIGEN_EPS:8,MEDLAB_ORI_CA_ARL:8,MEDLAB_INS_ORIGEN:8},Object(i.a)(r,"MEDLAB_INS_ORIGEN",8),Object(i.a)(r,"AUSLAB_TISOPOR",8),Object(i.a)(r,"AUSLAB_CATEGORIA",8),Object(i.a)(r,"AUSLAB_TIPOATEN",8),Object(i.a)(r,"AUSLAB_REDEXP",8),Object(i.a)(r,"LISTA_CHEKEO_REINTEGRO",159),r),n={SINREGISTRO_GLOBAL:1,AsesoriaPsicologica:3909,ASESORIA_MEDICA:3911,SinRegistro:1},c={SINREGISTRO_GLOBAL:1,SINREGISTRO_TEXTO:"REGISTRO NO APLICA",GeneroWomen:2,ATENCION_ATENDIDO:"ATENDIDO",PARACLINICO_RNM:"RNM",PARACLINICO_ELECTRO:"ELECTROCARDIOGRAMA",PARACLINICO_PSA:"PSA",PARACLINICO_RXTORAX:"RXTORAX",PARACLINICO_CITOLOGIA:"CITOLOGIA",PARACLINICO_VISIOMETRIA:"VISIOMETRIA",PARACLINICO_ESPIROMETRIA:"ESPIROMETRIA",TIPO_ORDEN_FORMULA:4023,TIPO_ORDEN_EXAMEN:4026,TIPO_ORDEN_IMAGEN:4025,TIPO_ORDEN_LABORATORIO:4024,TIPO_ATENCION_EMO:3900,ATENCION_PRUEBA_ALCOHOL:3908,ATENCION_ENFERMERIA:3907,TIPO_ATENCION_ASESORIAS:3899,TIPO_ATENCION_ASESORIAS_PSICO:3909,TIPO_ATENCION_ASESORIAS_MEDICA:3911,TIPO_ATENCION_ENFERMERIA:3898,TIPO_ATENCION_ATENCIONMEDICA:3897,TIPO_ATENCION_ATENCIONMEDICA_NUEVO:3931,TIPO_ATENCION_ATENCIONMEDICA_CONTROL:3932,EMO_ATENCION_INGRESO:3918,EMO_ATENCION_CONTRO:3921,EMO_ATENCION_PROMO:3922,ORDENES_LABORATORIO:3533,ORDENES_FECHA_EXAM_FISICO:3541,ORDENES_RNM:3537,CONCEPTO_PAD_APTO:4103,CONCEPTO_PAD_NOAPTO:4104,RESULTADO_PAD_POSITIVO:4097,TIP_AT_TRIAGE:3897,TIP_AT_ENFERME:3898,TIP_AT_ASESORIA:3899,TIP_AT_EMO:3900,AT_ENFERMERIA:3907,AT_PAD:3908,AT_PAD_MOTIVO:3802,AT_PSICO:3909,AT_ASESORIA_MEDICA:3911,RiesgoEnOtrasEmpresas:4067,RiesgoQuimico:3949,RiesgoQuimico_MPI_DLTD:3955,RiesgoQuimico_RUIDO_DLTD:3960,RiesgoFisico:3950,RiesgoPsicosocial:3952,RiesgoBiologico:3953,RiesgoErgonomicoCargaFisica_Postura:3954,RiesgoErgonomicoCargaFisica_Fuerza:4065,RiesgoErgonomicoCargaFisica_Movimiento:4066,Opcion_SI:4005,Opcion_NO:4006},s={Guardar:"Guardar",CerrarCaso:"Cerrar Caso",OrdenesMedicas:"Ordenes Medicas",SubirArchivo:"Subir Archivo",Programacion:"Programaci\xf3n",Imprimir:"Imprimir",Cancelar:"Cerrar",Cerrar:"Cancelar",Actualizar:"Actualizar",Eliminar:"Eliminar",Agregar:"Nuevo",Seleccionadas:"Seleccionadas",Regresar:"Regresar",RegresarACargos:"Regresar A Cargos"},l={Requerido:"Este campo es requerido"},u={Guardar:"Registro guardado con \xe9xito",RiesgoGuardado:"Riesgos Cargados",Actualizar:"Registro actualizado con \xe9xito",Eliminar:"Registro eliminado con \xe9xito",TituloEliminar:"\xbfEstas seguro?",TextoEliminar:"Este registro se eliminara, \xbfesta seguro de eliminarlo?",TituloCerrarCaso:"\xbfEstas seguro de Cerrar Caso?",TextoCerrarCaso:"Este caso ser\xe1 cerrado, \xbfesta seguro de hacerlo?",TituloCargar:"\xbfDesea cargar la exposici\xf3n ocupacional?",TextoCargar:"Se cargaran los riesgos, esto puede demorar un poco",NoEliminar:"No se pudo eliminar el registro",ErrorDocumento:"Por favor, ingrese un n\xfamero de documento",ErrorDeDatos:"Hubo un error al buscar los datos, vuelva a intentarlo",ErrorNoHayDatos:"No hay datos buscados, vuelva a intentarlo",CampoRequerido:"Este campo es requerido"}},713:function(e,a,t){"use strict";var r=t(100);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=r(t(127)),o=t(1),n=(0,i.default)((0,o.jsx)("path",{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"AddCircleOutlineOutlined");a.default=n},758:function(e,a,t){"use strict";t.d(a,"b",(function(){return s})),t.d(a,"c",(function(){return l})),t.d(a,"d",(function(){return u})),t.d(a,"e",(function(){return O})),t.d(a,"a",(function(){return d}));var r=t(45),i=t.n(r),o=t(66),n=t(645),c=t(646),s=function(){var e=Object(o.a)(i.a.mark((function e(a,t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.b)(n.a.Proveedor,{page:a,pageSize:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),l=function(){var e=Object(o.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.b)(n.a.ProveedorId,{id:a});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),u=function(){var e=Object(o.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.c)(n.a.Proveedor,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),O=function(){var e=Object(o.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.d)(n.a.Proveedor,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),d=function(){var e=Object(o.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.a)(n.a.Proveedor,{idProveedor:a});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()},759:function(e,a,t){"use strict";var r=t(100);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=r(t(127)),o=t(1),n=(0,i.default)([(0,o.jsx)("path",{d:"M8 5h8v3H8z",opacity:".3"},"0"),(0,o.jsx)("circle",{cx:"18",cy:"11.5",r:"1"},"1"),(0,o.jsx)("path",{d:"M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm4-4h-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4z"},"2"),(0,o.jsx)("path",{d:"M6 13h12v2h2v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4h2v-2zm12-2.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z",opacity:".3"},"3")],"PrintTwoTone");a.default=n},986:function(e,a,t){"use strict";var r=t(100);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=r(t(127)),o=t(1),n=(0,i.default)([(0,o.jsx)("path",{d:"M12 6c-3.79 0-7.17 2.13-8.82 5.5C4.83 14.87 8.21 17 12 17s7.17-2.13 8.82-5.5C19.17 8.13 15.79 6 12 6zm0 10c-2.48 0-4.5-2.02-4.5-4.5S9.52 7 12 7s4.5 2.02 4.5 4.5S14.48 16 12 16z",opacity:".3"},"0"),(0,o.jsx)("path",{d:"M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 13c-3.79 0-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6s7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17zm0-10c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7zm0 7c-1.38 0-2.5-1.12-2.5-2.5S10.62 9 12 9s2.5 1.12 2.5 2.5S13.38 14 12 14z"},"1")],"VisibilityTwoTone");a.default=n}}]);
//# sourceMappingURL=148.31344489.chunk.js.map