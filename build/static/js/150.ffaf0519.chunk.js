(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[150],{1576:function(e,a,t){"use strict";t.r(a);var r=t(45),i=t.n(r),n=t(66),o=t(10),c=t(4),s=t(0),l=t(25),u=t(24),O=t(756),d=t.n(O),p=t(33),A=t(763),C=t(764),E=t(887),b=t(824),I=t(796),g=t(163),j=t(99),R=t(634),_=t(562),h=t(564),f=t(345),T=t(61),m=t(560),S=t(631),N=t(638),v=t(761),P=t(762),x=t(765),L=t(1709),D=t(614),H=t(13),M=t(736),y=t.n(M),G=t(656),B=t(648),w=t(15),k=t(102),U=t(884),z=t(713),F=t.n(z),X=t(738),V=t.n(X),q=t(759),J=t.n(q),Q=t(670),W=t.n(Q),K=t(741),Z=t.n(K),Y=t(1),$=d.a.ExcelFile,ee=d.a.ExcelFile.ExcelSheet,ae=d.a.ExcelFile.ExcelColumn;function te(e,a,t){return a[t]<e[t]?-1:a[t]>e[t]?1:0}var re=function(e,a){return"desc"===e?function(e,t){return te(e,t,a)}:function(e,t){return-te(e,t,a)}};function ie(e,a){var t=e.map((function(e,a){return[e,a]}));return t.sort((function(e,t){var r=a(e[0],t[0]);return 0!==r?r:e[1]-t[1]})),t.map((function(e){return e[0]}))}var ne=[{id:"id",numeric:!1,label:"ID",align:"center"},{id:"nombre",numeric:!1,label:"Nombre",align:"left"}];function oe(e){var a=e.onClick,t=e.onSelectAllClick,r=e.order,i=e.orderBy,n=e.numSelected,o=e.rowCount,c=e.onRequestSort,s=e.theme,l=e.selected;return Object(Y.jsx)(A.a,{children:Object(Y.jsxs)(C.a,{children:[Object(Y.jsx)(E.a,{padding:"checkbox",sx:{pl:3},children:Object(Y.jsx)(b.a,{color:"primary",indeterminate:n>0&&n<o,checked:o>0&&n===o,onChange:t,inputProps:{"aria-label":"select all desserts"}})}),n>0&&Object(Y.jsx)(E.a,{padding:"none",colSpan:8,children:Object(Y.jsx)(ce,{numSelected:l.length,onClick:a})}),n<=0&&ne.map((function(e){return Object(Y.jsx)(E.a,{align:e.align,padding:e.disablePadding?"none":"normal",sortDirection:i===e.id&&r,children:Object(Y.jsxs)(I.a,{active:i===e.id,direction:i===e.id?r:"asc",onClick:(a=e.id,function(e){c(e,a)}),children:[e.label,i===e.id?Object(Y.jsx)(g.a,{component:"span",sx:D.a,children:"desc"===r?"sorted descending":"sorted ascending"}):null]})},e.id);var a})),n<=0&&Object(Y.jsx)(E.a,{sortDirection:!1,align:"center",sx:{pr:3},children:Object(Y.jsx)(j.a,{variant:"subtitle1",sx:{color:"dark"===s.palette.mode?"grey.600":"grey.900"},children:"Acci\xf3n"})})]})})}var ce=function(e){var a=e.numSelected,t=e.onClick;return Object(Y.jsxs)(R.a,{sx:Object(c.a)({p:0,pl:1,pr:1},a>0&&{color:function(e){return e.palette.secondary.main}}),children:[a>0?Object(Y.jsxs)(j.a,{color:"inherit",variant:"h4",children:[a," ",B.e.Seleccionadas]}):Object(Y.jsx)(j.a,{variant:"h6",id:"tableTitle",children:"Nutrici\xf3n"}),Object(Y.jsx)(g.a,{sx:{flexGrow:1}}),a>0&&Object(Y.jsx)(_.a,{title:B.e.Eliminar,onClick:t,children:Object(Y.jsx)(h.a,{size:"large",children:Object(Y.jsx)(V.a,{fontSize:"small"})})})]})};a.default=function(){var e=Object(u.c)(),a=Object(l.e)(),t=Object(s.useState)([]),r=Object(o.a)(t,2),c=r[0],O=r[1],d=Object(s.useState)(!1),A=Object(o.a)(d,2),I=A[0],g=A[1],R=Object(s.useState)(""),D=Object(o.a)(R,2),M=D[0],z=D[1],X=Object(p.a)(),V=Object(s.useState)("asc"),q=Object(o.a)(V,2),Q=q[0],K=q[1],te=Object(s.useState)("calories"),ne=Object(o.a)(te,2),ce=ne[0],se=ne[1],le=Object(s.useState)([]),ue=Object(o.a)(le,2),Oe=ue[0],de=ue[1],pe=Object(s.useState)(0),Ae=Object(o.a)(pe,2),Ce=Ae[0],Ee=Ae[1],be=Object(s.useState)(5),Ie=Object(o.a)(be,2),ge=Ie[0],je=Ie[1],Re=Object(s.useState)(""),_e=Object(o.a)(Re,2),he=_e[0],fe=_e[1],Te=Object(s.useState)([]),me=Object(o.a)(Te,2),Se=me[0],Ne=me[1];function ve(){return Pe.apply(this,arguments)}function Pe(){return(Pe=Object(n.a)(i.a.mark((function a(){var t;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(U.b)(0,0);case 3:t=a.sent,O(t.data.entities),Ne(t.data.entities),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(0),e({type:w.H,open:!0,message:"".concat(a.t0),variant:"alert",alertSeverity:"error",close:!1,transition:"SlideUp"});case 11:case"end":return a.stop()}}),a,null,[[0,8]])})))).apply(this,arguments)}Object(s.useEffect)((function(){ve()}),[]);var xe=function(e,a){z(a);var t=Oe.indexOf(a),r=[];-1===t?r=r.concat(Oe,a):0===t?r=r.concat(Oe.slice(1)):t===Oe.length-1?r=r.concat(Oe.slice(0,-1)):t>0&&(r=r.concat(Oe.slice(0,t),Oe.slice(t+1))),de(r)},Le=function(){var e=Object(n.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{y()(G.f).then(function(){var e=Object(n.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=9;break}return e.next=3,Object(U.a)(M);case 3:200===e.sent.status&&g(!0),de([]),ve(),e.next=10;break;case 9:de([]);case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}())}catch(a){console.log(a)}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),De=Ce>0?Math.max(0,(1+Ce)*ge-c.length):0;return Object(Y.jsxs)(k.a,{title:"Lista de Tipo Cat\xe1logo",content:!1,children:[Object(Y.jsx)(G.a,{open:I,onClose:function(){return g(!1)}}),Object(Y.jsx)(f.a,{children:Object(Y.jsxs)(T.a,{container:!0,justifyContent:"space-between",alignItems:"center",spacing:2,children:[Object(Y.jsx)(T.a,{item:!0,xs:12,sm:6,children:Object(Y.jsx)(m.a,{InputProps:{startAdornment:Object(Y.jsx)(S.a,{position:"start",children:Object(Y.jsx)(W.a,{fontSize:"small"})})},onChange:function(e){var a=null===e||void 0===e?void 0:e.target.value;if(fe(a||""),a){var t=Se.filter((function(e){var t=!0,r=!1;return["nombre","id"].forEach((function(t){e[t].toString().toLowerCase().includes(a.toString().toLowerCase())&&(r=!0)})),r||(t=!1),t}));O(t)}else O(Se)},placeholder:"Buscar",value:he,size:"small"})}),Object(Y.jsxs)(T.a,{item:!0,xs:12,sm:6,sx:{textAlign:"right"},children:[Object(Y.jsx)($,{element:Object(Y.jsx)(_.a,{title:"Exportar",children:Object(Y.jsx)(h.a,{size:"large",children:Object(Y.jsx)(H.R,{})})}),filename:"Tipo Catatalogo",children:Object(Y.jsxs)(ee,{data:c,name:"Tipo Cat\xe1logo",children:[Object(Y.jsx)(ae,{label:"Id",value:"id"}),Object(Y.jsx)(ae,{label:"Nombre",value:"nombre"}),Object(Y.jsx)(ae,{label:"Usuario que Registro",value:"usuarioRegistro"}),Object(Y.jsx)(ae,{label:"Fecha de Registro",value:"fechaRegistro"}),Object(Y.jsx)(ae,{label:"Usuario Modifico",value:"usuarioModifico"}),Object(Y.jsx)(ae,{label:"Fecha Modifico",value:"fechaModifico"})]})}),Object(Y.jsx)(_.a,{title:"Impresi\xf3n",onClick:function(){return a("/typecatalog/report")},children:Object(Y.jsx)(h.a,{size:"large",children:Object(Y.jsx)(J.a,{})})}),Object(Y.jsx)(N.a,{variant:"contained",size:"large",startIcon:Object(Y.jsx)(F.a,{}),onClick:function(){return a("/typecatalog/add")},children:B.e.Agregar})]})]})}),Object(Y.jsx)(v.a,{children:Object(Y.jsxs)(P.a,{sx:{minWidth:750},"aria-labelledby":"tableTitle",children:[Object(Y.jsx)(oe,{numSelected:Oe.length,order:Q,orderBy:ce,onSelectAllClick:function(e){if(e.target.checked){var a=c.map((function(e){return e.id}));de(a)}else de([])},onRequestSort:function(e,a){K(ce===a&&"asc"===Q?"desc":"asc"),se(a)},rowCount:c.length,theme:X,selected:Oe,onClick:Le}),Object(Y.jsxs)(x.a,{children:[ie(c,re(Q,ce)).slice(Ce*ge,Ce*ge+ge).map((function(e,t){if("number"===typeof e)return null;var r,i=(r=e.id,-1!==Oe.indexOf(r)),n="enhanced-table-checkbox-".concat(t);return Object(Y.jsxs)(C.a,{hover:!0,role:"checkbox","aria-checked":i,tabIndex:-1,selected:i,children:[Object(Y.jsx)(E.a,{padding:"checkbox",sx:{pl:3},onClick:function(a){return xe(0,e.id)},children:Object(Y.jsx)(b.a,{color:"primary",checked:i,inputProps:{"aria-labelledby":n}})}),Object(Y.jsx)(E.a,{component:"th",id:n,scope:"row",onClick:function(a){return xe(0,e.id)},sx:{cursor:"pointer"},align:"center",children:Object(Y.jsxs)(j.a,{variant:"subtitle1",sx:{color:"dark"===X.palette.mode?"grey.600":"grey.900"},children:[" ","#",e.id," "]})}),Object(Y.jsx)(E.a,{component:"th",id:n,scope:"row",onClick:function(a){return xe(0,e.id)},sx:{cursor:"pointer"},children:Object(Y.jsxs)(j.a,{variant:"subtitle1",sx:{color:"dark"===X.palette.mode?"grey.600":"grey.900"},children:[" ",e.nombre," "]})}),Object(Y.jsx)(E.a,{align:"center",sx:{pr:3},children:Object(Y.jsx)(_.a,{title:"Actualizar",onClick:function(){return a("/typecatalog/update/".concat(e.id))},children:Object(Y.jsx)(h.a,{size:"large",children:Object(Y.jsx)(Z.a,{sx:{fontSize:"1.3rem"}})})})})]},t)})),De>0&&Object(Y.jsx)(C.a,{style:{height:53*De},children:Object(Y.jsx)(E.a,{colSpan:6})})]})]})}),Object(Y.jsx)(L.a,{rowsPerPageOptions:[5,10,25],component:"div",count:c.length,rowsPerPage:ge,page:Ce,onPageChange:function(e,a){Ee(a)},onRowsPerPageChange:function(e){(null===e||void 0===e?void 0:e.target.value)&&je(parseInt(null===e||void 0===e?void 0:e.target.value,10)),Ee(0)}})]})}},645:function(e,a,t){"use strict";t.d(a,"a",(function(){return n}));var r,i=t(5),n=(r={Base:"https://siiso4.westus3.cloudapp.azure.com:44347/",TipoCatalogo:"api/TipoCatalogo",TipoCatalogoId:"api/TipoCatalogo/id",Catalogo:"api/Catalogo",CatalogoId:"api/Catalogo/id",GetAllByTipoCatalogo:"api/Catalogo/GetAllByTipoCatalogo",GetAllBySubTipoCatalogo:"api/Catalogo/GetAllBySubTipoCatalogo",Empleado:"api/Empleado",EmpleadoId:"api/Empleado/id",Reintegro:"api/Reintegro",ReintegroId:"api/Reintegro/id",ListaReintegro:"api/ListaReintegro",ListaReintegro_GetAllReintegro:"api/ListaReintegro/GetAllReintegro",ListaReintegroId:"api/ListaReintegro/id",Cargo:"api/Cargo",CargoId:"api/Cargo/id",Panorama:"api/Panoramariesgo",PanoramaGetAllByCharge:"api/Panoramariesgo/GetAllByCharge",PanoramaId:"api/Panoramariesgo/id",Recetario:"api/Recetario",RecetarioId:"api/Recetario/id",Medicamentos:"api/Medicamentos",MedicamentosId:"api/Medicamentos/id",PruebasAlcoholDroga:"api/PruebasAlcoholDroga",PruebasAlcoholDrogaId:"api/PruebasAlcoholDroga/id",Empresa:"api/Empresa",EmpresaId:"api/Empresa/id",SGSST:"api/SistemaGestion",SGSSTId:"api/SistemaGestion/id",RiesgoHistoriaLaboral:"api/RiesgoHistoriaLaboral",RiesgoHistoriaLaboralId:"api/RiesgoHistoriaLaboral/id",RHLByChargeHistorico:"api/RiesgoHistoriaLaboral/GetAllByChargeHistorico",RHLByHistorico:"api/RiesgoHistoriaLaboral/GetAllByHistorico",RHLByChargeAdvance:"api/RiesgoHistoriaLaboral/GetAllByChargeAdvance",RiesgoHistoriaLaboralEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas",RiesgoHistoriaLaboralIdEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/id",RHLByChargeHistoricoEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByChargeHistorico",RHLByHistoricoEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByHistorico",RHLByChargeAdvanceEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByChargeAdvance",Proveedor:"api/Proveedor",ProveedorId:"api/Proveedor/id",Usuarios:"api/Usuarios",UsuariosId:"api/Usuarios/id",UsuariosEmail:"api/Usuarios/email",RegistroAtencion:"api/RegistroAtencion",RegistroAtencio_GetAllAtencion:"api/RegistroAtencion/GetAllAtencion",RegistroAtencionId:"api/RegistroAtencion/id",Paraclinicos:"api/Paraclinicos",Paraclinicos_GetAllByTypeParaclinico:"api/Paraclinicos/GetAllByTipoParaclinico",ParaclinicosId:"api/Paraclinicos/id",Ordenes:"api/Ordenes",OrdenesId:"api/Ordenes/id",Asesorias:"api/Asesorias",AsesoriasId:"api/Asesorias/id",Accidentalidad:"api/Accidentalidad",AccidentalidadId:"api/Accidentalidad/id"},Object(i.a)(r,"RegistroAtencion","api/RegistroAtencion"),Object(i.a)(r,"RegistroAtencionId","api/RegistroAtencion/id"),Object(i.a)(r,"HistoriaLaboral","api/HistoriaLaboral"),Object(i.a)(r,"HistoriaLaboralGetAllByDocument","api/HistoriaLaboral/GetAllByDocument"),Object(i.a)(r,"HistoriaLaboralId","api/HistoriaLaboral/id"),Object(i.a)(r,"HistoriaLaboralOtrasEmpresas","api/HistoriaLaboralOtrasEmpresas"),Object(i.a)(r,"HistoriaLaboralOtrasEmpresasGetAllByDocument","api/HistoriaLaboralOtrasEmpresas/GetAllByDocument"),Object(i.a)(r,"HistoriaLaboralOtrasEmpresasId","api/HistoriaLaboralOtrasEmpresas/id"),Object(i.a)(r,"CIE11","api/CIE11"),Object(i.a)(r,"CIE11Id","api/CIE11/id"),Object(i.a)(r,"Plantilla","api/Plantilla"),Object(i.a)(r,"PlantillaId","api/Plantilla/id"),Object(i.a)(r,"Items","api/Item"),Object(i.a)(r,"ItemsId","api/Item/id"),Object(i.a)(r,"ItemsGetAllByAtencion","api/Item/GetAllByAtencion"),Object(i.a)(r,"SegmentoAgrupado","api/SegmentoAgrupado"),Object(i.a)(r,"SegmentoAfectado","api/SegmentoAfectado/GetAllBySegAgrupado"),Object(i.a)(r,"Subsegmento","api/Subsegmento/GetAllBySegAfectado"),Object(i.a)(r,"MetodoCie11","api/CIE11/GetAllBySubsegmento"),Object(i.a)(r,"SegAfectado","api/SegmentoAfectado"),Object(i.a)(r,"Subsegment","api/Subsegmento"),Object(i.a)(r,"HistoriaClinica","api/HistoriaClinica"),Object(i.a)(r,"HistoriaClinicaId","api/HistoriaClinica/id"),Object(i.a)(r,"NotaEvolucion","api/NotaEvolucion"),Object(i.a)(r,"NotaEvolucionId","api/NotaEvolucion/id"),Object(i.a)(r,"NotaEnfermeria","api/NotaEnfermeria"),Object(i.a)(r,"NotaEnfermeriaId","api/NotaEnfermeria/id"),Object(i.a)(r,"MedicinaLaboral","api/MedicinaLaboralX"),Object(i.a)(r,"MedicinaLaboralId","api/MedicinaLaboralX/id"),Object(i.a)(r,"AusentismoLaboral","api/AusentismoLaboral"),Object(i.a)(r,"AusentismoLaboralId","api/AusentismoLaboral/id"),Object(i.a)(r,"HistoriaClinicaOcupacional","api/HistoriaClinicaOcupacional"),Object(i.a)(r,"HCOGetAllByDocumento","api/HistoriaClinicaOcupacional/GetAllByDocumento"),Object(i.a)(r,"HistoriaClinicaOcupacionalId","api/HistoriaClinicaOcupacional/id"),Object(i.a)(r,"HistoriaClinicaOcupacionalReport","api/HistoriaClinicaOcupacional/GetById"),Object(i.a)(r,"GetLastRecordHisCliOcu","api/HistoriaClinicaOcupacional/GetLastRecord"),Object(i.a)(r,"TipoAtencion","api/TipoAtencion"),Object(i.a)(r,"AtencionGetAllByTipoAtencion","api/Atencion/GetAllByTipoAtencion"),Object(i.a)(r,"Atencion","api/Atencion"),Object(i.a)(r,"Cuestionario","api/CuestionarioPrevencion"),Object(i.a)(r,"CuestionarioSave","api/CuestionarioPrevencion/Save"),Object(i.a)(r,"CuestionarioId","api/CuestionarioPrevencion/id"),r)},646:function(e,a,t){"use strict";t.d(a,"c",(function(){return l})),t.d(a,"b",(function(){return O})),t.d(a,"d",(function(){return p})),t.d(a,"a",(function(){return C}));var r=t(45),i=t.n(r),n=t(66),o=t(645),c=t(200),s=t.n(c);function l(){return u.apply(this,arguments)}function u(){return u=Object(n.a)(i.a.mark((function e(){var a,t,r=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.length>0&&void 0!==r[0]?r[0]:"",t=r.length>1&&void 0!==r[1]?r[1]:{},!(r.length>2&&void 0!==r[2]&&r[2])){e.next=15;break}return e.prev=4,e.next=7,s()({method:"post",url:"".concat(o.a.Base).concat(a),data:t,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(4),console.log("catch post ",e.t0);case 13:e.next=24;break;case 15:return e.prev=15,e.next=18,s()({method:"post",url:"".concat(o.a.Base).concat(a),data:t}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 18:return e.abrupt("return",e.sent);case 21:e.prev=21,e.t1=e.catch(15),console.log("catch post ",e.t1);case 24:case"end":return e.stop()}}),e,null,[[4,10],[15,21]])}))),u.apply(this,arguments)}function O(){return d.apply(this,arguments)}function d(){return d=Object(n.a)(i.a.mark((function e(){var a,t,r,n=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.length>0&&void 0!==n[0]?n[0]:"",t=n.length>1&&void 0!==n[1]?n[1]:{},e.prev=2,r=new URL("".concat(o.a.Base).concat(a)),Object.keys(t).forEach((function(e){return r.searchParams.append(e,t[e])})),e.next=7,s.a.get(r).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(2),console.log("catch get ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])}))),d.apply(this,arguments)}function p(){return A.apply(this,arguments)}function A(){return A=Object(n.a)(i.a.mark((function e(){var a,t,r=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.length>0&&void 0!==r[0]?r[0]:"",t=r.length>1&&void 0!==r[1]?r[1]:{},e.prev=2,e.next=5,s()({method:"put",url:"".concat(o.a.Base).concat(a),data:t}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 5:return e.abrupt("return",e.sent);case 8:e.prev=8,e.t0=e.catch(2),console.log("catch put ",e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])}))),A.apply(this,arguments)}function C(){return E.apply(this,arguments)}function E(){return E=Object(n.a)(i.a.mark((function e(){var a,t,r,n=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.length>0&&void 0!==n[0]?n[0]:"",t=n.length>1&&void 0!==n[1]?n[1]:{},e.prev=2,r=new URL("".concat(o.a.Base).concat(a)),Object.keys(t).forEach((function(e){return r.searchParams.append(e,t[e])})),e.next=7,s.a.delete(r).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(2),console.log("catch delete ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])}))),E.apply(this,arguments)}},648:function(e,a,t){"use strict";t.d(a,"a",(function(){return n})),t.d(a,"b",(function(){return o})),t.d(a,"c",(function(){return c})),t.d(a,"e",(function(){return s})),t.d(a,"f",(function(){return l})),t.d(a,"d",(function(){return u}));var r,i=t(5),n=(r={Departamento:4,Sede:6,Escolaridad:2,Genero:1,EstadoCivil:3,TipoContrato:7,Rol:21,RosterPosition:14,GeneralPosition:15,DepartEmpresa:13,Area:16,SubArea:17,Grupo:12,Turno:11,Estado:18,Eps:9,Afp:8,Arl:10,Ges:20,Cesantias:19,AtencionEMO:138,TIPO_EXAMEN_PARACLINICOS:68,ESTUDIO_EXAMEN_PARACLINICOS:22,LABORATORIO_ORDENES_PARACLINICOS:30,TIPORNM_ORDENES_PARACLINICOS:114,TIPO_ATENCION:107,PANO_ANALISISRUIDO:8,PANO_ANALISISMPI:8,"PANO_EXPOSICI\xd3N":130,PANO_MEDIDASCONTROL:40,PANO_RIESGO:128,PANO_GRADO_CONSINEPP:131,PARACLINICO_LECTURA:168,PARACLINICO_CONTROL:169,PARACLINICO_TIPOEPP:1168,PARACLINICO_RESULTADO:1169,VACUNAS:154,HCO_FRECUENCIAS:32,HCO_REFUERZO:150,HC_DEPORTE:143,HC_TIFOBIA:39,HCO_PARENTES:123,HCO_GINECOMETO:8,HCO_GINECOCICLO:8,HCO_GINECORESULT:8,HCO_BIOTIPO:37,HCO_RESULTADO:140,HCO_CONCEP_APTI_PSICO_INGRESO:151,HCO_CONCEP_APTI_PSICO_CONTROL:152,HCO_CONCEP_APTI_PSICO_PROMO:153,HCO_CONCEPTO_APTI_MEDICA:42,OPT_SINO:8,HCO_NEADONDE:145,HCO_RIESGO_CLASIFICACION:127,HCO_SINTOMAS_RESPIRATORIO:146,HCO_DX_TENSION_ARTERIAL:110,HCO_ANTECEDENTE_CARDIOVASCULAR:111,HCO_FRAM_BEBIDAS:31,HCO_DX_METABOLICO:142,RECE_TIPORDEN:8,RECE_CONTINGENCIA:8,PAD_MOTIVO:50,PAD_MOTIVO_NO_ASIS:54,UNIDAD:36,PAD_MUESTRA_AD:115,PAD_MUESTRA_AL:117,PAD_RESULTADO:116,PAD_CONCEPTOA:147,ASME_TIPOASESORIA:119,TIPO_PROVEEDOR:22,ROL_USUARIO:157,ESPECIALIDAD_MEDICO:158,CIUDADES:5,CLASE_AT:98,CAUSA_AT:99,SUBTIPO_AT:100,ESTADO_AT:102,AHC_ATENCION_NOTA_ENFERMERIA:136,Contingencia:74,PROCEDIMIENTO_ENFERMERIA:156,DiaTurno:76,JornadaTurno:139,MotivoPsicologia:53,MotivoMedica:52,ESTADO_EMPLEADO:162,ESTADO_RESTRICCION:163,TIPO_RESTRICCION:164,ORDENADO_POR:94,CONCEPTO_APTITUD_REINTEGRO:95,ORDENADO_POR_HORARIO:167,ORIGEN_REINTEGRO:90,TipoAsesoria:119,CausaAsesoria:8,EstadoAsesoria:8,EstadoCaso:48,ESTADO_CASO:38,TipoAtencion:65,Desocupado_EraDe_Plantilla1:8,Desocupado_EraDe_Plantilla2:8,Desocupado_EraDe_Plantilla3:8,SaludOcupacional_Atencion:8,SaludOcupacional_Motivo:8,TipoAtencion_Item:8,AHC_ATENCION:135,Opciones_SINO:88,AHC_CONCEP_ACTITUD:43,AUSLAB_INC:8,AUSLAB_TIPOINCA:8,AUSLAB_CONT:8,AUSLAB_ESTCAS:8,MEDLAB_RECASO:8,MEDLAB_REGION:8,MEDLAB_LATERA:8,MEDLAB_ENMO_EN:8,MEDLAB_ENDON_EN:8,MEDLAB_ORIGEN_EPS:8,MEDLAB_ORI_CA_ARL:8,MEDLAB_INS_ORIGEN:8},Object(i.a)(r,"MEDLAB_INS_ORIGEN",8),Object(i.a)(r,"AUSLAB_TISOPOR",8),Object(i.a)(r,"AUSLAB_CATEGORIA",8),Object(i.a)(r,"AUSLAB_TIPOATEN",8),Object(i.a)(r,"AUSLAB_REDEXP",8),Object(i.a)(r,"LISTA_CHEKEO_REINTEGRO",159),r),o={SINREGISTRO_GLOBAL:1,AsesoriaPsicologica:3909,ASESORIA_MEDICA:3911,SinRegistro:1},c={SINREGISTRO_GLOBAL:1,SINREGISTRO_TEXTO:"REGISTRO NO APLICA",GeneroWomen:2,ATENCION_ATENDIDO:"ATENDIDO",PARACLINICO_RNM:"RNM",PARACLINICO_ELECTRO:"ELECTROCARDIOGRAMA",PARACLINICO_PSA:"PSA",PARACLINICO_RXTORAX:"RXTORAX",PARACLINICO_CITOLOGIA:"CITOLOGIA",PARACLINICO_VISIOMETRIA:"VISIOMETRIA",PARACLINICO_ESPIROMETRIA:"ESPIROMETRIA",TIPO_ORDEN_FORMULA:4023,TIPO_ORDEN_EXAMEN:4026,TIPO_ORDEN_IMAGEN:4025,TIPO_ORDEN_LABORATORIO:4024,TIPO_ATENCION_EMO:3900,ATENCION_PRUEBA_ALCOHOL:3908,ATENCION_ENFERMERIA:3907,TIPO_ATENCION_ASESORIAS:3899,TIPO_ATENCION_ASESORIAS_PSICO:3909,TIPO_ATENCION_ASESORIAS_MEDICA:3911,TIPO_ATENCION_ENFERMERIA:3898,TIPO_ATENCION_ATENCIONMEDICA:3897,TIPO_ATENCION_ATENCIONMEDICA_NUEVO:3931,TIPO_ATENCION_ATENCIONMEDICA_CONTROL:3932,EMO_ATENCION_INGRESO:3918,EMO_ATENCION_CONTRO:3921,EMO_ATENCION_PROMO:3922,ORDENES_LABORATORIO:3533,ORDENES_FECHA_EXAM_FISICO:3541,ORDENES_RNM:3537,CONCEPTO_PAD_APTO:4103,CONCEPTO_PAD_NOAPTO:4104,RESULTADO_PAD_POSITIVO:4097,TIP_AT_TRIAGE:3897,TIP_AT_ENFERME:3898,TIP_AT_ASESORIA:3899,TIP_AT_EMO:3900,AT_ENFERMERIA:3907,AT_PAD:3908,AT_PAD_MOTIVO:3802,AT_PSICO:3909,AT_ASESORIA_MEDICA:3911,RiesgoEnOtrasEmpresas:4067,RiesgoQuimico:3949,RiesgoQuimico_MPI_DLTD:3955,RiesgoQuimico_RUIDO_DLTD:3960,RiesgoFisico:3950,RiesgoPsicosocial:3952,RiesgoBiologico:3953,RiesgoErgonomicoCargaFisica_Postura:3954,RiesgoErgonomicoCargaFisica_Fuerza:4065,RiesgoErgonomicoCargaFisica_Movimiento:4066,Opcion_SI:4005,Opcion_NO:4006},s={Guardar:"Guardar",CerrarCaso:"Cerrar Caso",OrdenesMedicas:"Ordenes Medicas",SubirArchivo:"Subir Archivo",Programacion:"Programaci\xf3n",Imprimir:"Imprimir",Cancelar:"Cerrar",Cerrar:"Cancelar",Actualizar:"Actualizar",Eliminar:"Eliminar",Agregar:"Nuevo",Seleccionadas:"Seleccionadas",Regresar:"Regresar",RegresarACargos:"Regresar A Cargos"},l={Requerido:"Este campo es requerido"},u={Guardar:"Registro guardado con \xe9xito",RiesgoGuardado:"Riesgos Cargados",Actualizar:"Registro actualizado con \xe9xito",Eliminar:"Registro eliminado con \xe9xito",TituloEliminar:"\xbfEstas seguro?",TextoEliminar:"Este registro se eliminara, \xbfesta seguro de eliminarlo?",TituloCerrarCaso:"\xbfEstas seguro de Cerrar Caso?",TextoCerrarCaso:"Este caso ser\xe1 cerrado, \xbfesta seguro de hacerlo?",TituloCargar:"\xbfDesea cargar la exposici\xf3n ocupacional?",TextoCargar:"Se cargaran los riesgos, esto puede demorar un poco",NoEliminar:"No se pudo eliminar el registro",ErrorDocumento:"Por favor, ingrese un n\xfamero de documento",ErrorDeDatos:"Hubo un error al buscar los datos, vuelva a intentarlo",ErrorNoHayDatos:"No hay datos buscados, vuelva a intentarlo",CampoRequerido:"Este campo es requerido"}},656:function(e,a,t){"use strict";t.d(a,"f",(function(){return O})),t.d(a,"e",(function(){return d})),t.d(a,"g",(function(){return p})),t.d(a,"c",(function(){return E})),t.d(a,"d",(function(){return b})),t.d(a,"a",(function(){return I})),t.d(a,"b",(function(){return g}));var r=t(4),i=t(0),n=t.n(i),o=t(548),c=t(619),s=t(648),l=t(624),u=t(1),O={title:"".concat(s.d.TituloEliminar),text:"".concat(s.d.TextoEliminar),icon:"error",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}},d={title:"".concat(s.d.TituloCerrarCaso),text:"".concat(s.d.TextoCerrarCaso),icon:"warning",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}},p={title:"".concat(s.d.TituloCargar),text:"".concat(s.d.TextoCargar),icon:"warning",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}};function A(e){return Object(u.jsx)(o.a,Object(r.a)(Object(r.a)({},e),{},{direction:"up"}))}var C=n.a.forwardRef((function(e,a){return Object(u.jsx)(c.a,Object(r.a)({elevation:6,ref:a,variant:"filled"},e))})),E=function(e){var a=e.open,t=e.onClose;return Object(u.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2500,onClose:t,children:Object(u.jsx)(C,{severity:"success",sx:{width:"100%"},children:s.d.Guardar})},"alert")},b=function(e){var a=e.open,t=e.onClose;return Object(u.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2500,onClose:t,children:Object(u.jsx)(C,{severity:"success",sx:{width:"100%"},children:s.d.Actualizar})},"alert")},I=function(e){var a=e.open,t=e.onClose;return Object(u.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2500,onClose:t,children:Object(u.jsx)(C,{severity:"error",sx:{width:"100%"},children:s.d.Eliminar})},"alert")},g=function(e){var a=e.open,t=e.onClose,r=e.error;return Object(u.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2e3,onClose:t,children:Object(u.jsx)(C,{severity:"error",sx:{width:"100%"},children:r})},"alert")}},713:function(e,a,t){"use strict";var r=t(100);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=r(t(127)),n=t(1),o=(0,i.default)((0,n.jsx)("path",{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"AddCircleOutlineOutlined");a.default=o},759:function(e,a,t){"use strict";var r=t(100);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=r(t(127)),n=t(1),o=(0,i.default)([(0,n.jsx)("path",{d:"M8 5h8v3H8z",opacity:".3"},"0"),(0,n.jsx)("circle",{cx:"18",cy:"11.5",r:"1"},"1"),(0,n.jsx)("path",{d:"M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm4-4h-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4z"},"2"),(0,n.jsx)("path",{d:"M6 13h12v2h2v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4h2v-2zm12-2.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z",opacity:".3"},"3")],"PrintTwoTone");a.default=o},884:function(e,a,t){"use strict";t.d(a,"b",(function(){return s})),t.d(a,"c",(function(){return l})),t.d(a,"d",(function(){return u})),t.d(a,"e",(function(){return O})),t.d(a,"a",(function(){return d}));var r=t(45),i=t.n(r),n=t(66),o=t(645),c=t(646),s=function(){var e=Object(n.a)(i.a.mark((function e(a,t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.b)(o.a.TipoCatalogo,{page:a,pageSize:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),l=function(){var e=Object(n.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.b)(o.a.TipoCatalogoId,{id:a});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),u=function(){var e=Object(n.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.c)(o.a.TipoCatalogo,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),O=function(){var e=Object(n.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.d)(o.a.TipoCatalogo,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),d=function(){var e=Object(n.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.a)(o.a.TipoCatalogo,{idTipoCatalogo:a});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()}}]);
//# sourceMappingURL=150.ffaf0519.chunk.js.map