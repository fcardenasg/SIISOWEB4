(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[149],{1634:function(e,a,t){"use strict";t.r(a);var r=t(45),n=t.n(r),i=t(66),o=t(10),c=t(4),s=t(0),l=t(25),u=t(33),O=t(763),d=t(764),p=t(887),A=t(824),C=t(796),E=t(163),b=t(99),I=t(634),j=t(562),g=t(564),R=t(345),_=t(61),h=t(560),m=t(631),f=t(638),T=t(761),S=t(762),P=t(765),N=t(1709),x=t(614),v=t(736),L=t.n(v),D=t(656),H=t(648),y=t(102),M=t(711),G=t(713),B=t.n(G),w=t(738),k=t.n(w),U=t(759),z=t.n(U),F=t(670),X=t.n(F),V=t(741),q=t.n(V),J=t(756),Q=t.n(J),W=t(13),K=t(1),Z=Q.a.ExcelFile,Y=Q.a.ExcelFile.ExcelSheet,$=Q.a.ExcelFile.ExcelColumn;function ee(e,a,t){return a[t]<e[t]?-1:a[t]>e[t]?1:0}var ae=function(e,a){return"desc"===e?function(e,t){return ee(e,t,a)}:function(e,t){return-ee(e,t,a)}};function te(e,a){var t=e.map((function(e,a){return[e,a]}));return t.sort((function(e,t){var r=a(e[0],t[0]);return 0!==r?r:e[1]-t[1]})),t.map((function(e){return e[0]}))}var re=[{id:"id",numeric:!1,label:"ID",align:"center"},{id:"nameCIE11",numeric:!1,label:"CIE11",align:"left"},{id:"nameTipoAtencion",numeric:!1,label:"Tipo de Atenci\xf3n",align:"left"},{id:"nameAtencion",numeric:!1,label:"Atenci\xf3n",align:"left"}];function ne(e){var a=e.onClick,t=e.onSelectAllClick,r=e.order,n=e.orderBy,i=e.numSelected,o=e.rowCount,c=e.onRequestSort,s=e.theme,l=e.selected;return Object(K.jsx)(O.a,{children:Object(K.jsxs)(d.a,{children:[Object(K.jsx)(p.a,{padding:"checkbox",sx:{pl:3},children:Object(K.jsx)(A.a,{color:"primary",indeterminate:i>0&&i<o,checked:o>0&&i===o,onChange:t,inputProps:{"aria-label":"select all desserts"}})}),i>0&&Object(K.jsx)(p.a,{padding:"none",colSpan:8,children:Object(K.jsx)(ie,{numSelected:l.length,onClick:a})}),i<=0&&re.map((function(e){return Object(K.jsx)(p.a,{align:e.align,padding:e.disablePadding?"none":"normal",sortDirection:n===e.id&&r,children:Object(K.jsxs)(C.a,{active:n===e.id,direction:n===e.id?r:"asc",onClick:(a=e.id,function(e){c(e,a)}),children:[e.label,n===e.id?Object(K.jsx)(E.a,{component:"span",sx:x.a,children:"desc"===r?"sorted descending":"sorted ascending"}):null]})},e.id);var a})),i<=0&&Object(K.jsx)(p.a,{sortDirection:!1,align:"center",sx:{pr:3},children:Object(K.jsx)(b.a,{variant:"subtitle1",sx:{color:"dark"===s.palette.mode?"grey.600":"grey.900"},children:"Acci\xf3n"})})]})})}var ie=function(e){var a=e.numSelected,t=e.onClick;return Object(K.jsxs)(I.a,{sx:Object(c.a)({p:0,pl:1,pr:1},a>0&&{color:function(e){return e.palette.secondary.main}}),children:[a>0?Object(K.jsxs)(b.a,{color:"inherit",variant:"h4",children:[a," ",H.e.Seleccionadas]}):Object(K.jsx)(b.a,{variant:"h6",id:"tableTitle",children:"Nutrici\xf3n"}),Object(K.jsx)(E.a,{sx:{flexGrow:1}}),a>0&&Object(K.jsx)(j.a,{title:H.e.Eliminar,onClick:t,children:Object(K.jsx)(g.a,{size:"large",children:Object(K.jsx)(k.a,{fontSize:"small"})})})]})};a.default=function(){var e=Object(l.e)(),a=Object(s.useState)([]),t=Object(o.a)(a,2),r=t[0],c=t[1],O=Object(s.useState)(!1),C=Object(o.a)(O,2),E=C[0],I=C[1],x=Object(s.useState)(""),v=Object(o.a)(x,2),G=v[0],w=v[1],k=Object(u.a)(),U=Object(s.useState)("asc"),F=Object(o.a)(U,2),V=F[0],J=F[1],Q=Object(s.useState)("fechaRegistro"),ee=Object(o.a)(Q,2),re=ee[0],ie=ee[1],oe=Object(s.useState)([]),ce=Object(o.a)(oe,2),se=ce[0],le=ce[1],ue=Object(s.useState)(0),Oe=Object(o.a)(ue,2),de=Oe[0],pe=Oe[1],Ae=Object(s.useState)(5),Ce=Object(o.a)(Ae,2),Ee=Ce[0],be=Ce[1],Ie=Object(s.useState)(""),je=Object(o.a)(Ie,2),ge=je[0],Re=je[1],_e=Object(s.useState)([]),he=Object(o.a)(_e,2),me=he[0],fe=he[1];function Te(){return Se.apply(this,arguments)}function Se(){return(Se=Object(i.a)(n.a.mark((function e(){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(M.b)(0,0);case 3:200===(a=e.sent).status&&(c(a.data.entities),fe(a.data.entities)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}Object(s.useEffect)((function(){Te()}),[]);var Pe=function(e,a){w(a);var t=se.indexOf(a),r=[];-1===t?r=r.concat(se,a):0===t?r=r.concat(se.slice(1)):t===se.length-1?r=r.concat(se.slice(0,-1)):t>0&&(r=r.concat(se.slice(0,t),se.slice(t+1))),le(r)},Ne=function(){var e=Object(i.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{L()(D.f).then(function(){var e=Object(i.a)(n.a.mark((function e(a){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=9;break}return e.next=3,Object(M.a)(G);case 3:200===e.sent.status&&I(!0),le([]),Te(),e.next=10;break;case 9:le([]);case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}())}catch(a){console.log(a)}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),xe=de>0?Math.max(0,(1+de)*Ee-r.length):0;return Object(K.jsxs)(y.a,{title:"Lista de Plantilla",content:!1,children:[Object(K.jsx)(D.a,{open:E,onClose:function(){return I(!1)}}),Object(K.jsx)(R.a,{children:Object(K.jsxs)(_.a,{container:!0,justifyContent:"space-between",alignItems:"center",spacing:2,children:[Object(K.jsx)(_.a,{item:!0,xs:12,sm:6,children:Object(K.jsx)(h.a,{InputProps:{startAdornment:Object(K.jsx)(m.a,{position:"start",children:Object(K.jsx)(X.a,{fontSize:"small"})})},onChange:function(e){var a=null===e||void 0===e?void 0:e.target.value;if(Re(a||""),a){var t=me.filter((function(e){var t=!0,r=!1;return["id","nameCIE11","nameTipoAtencion","nameAtencion"].forEach((function(t){e[t].toString().toLowerCase().includes(a.toString().toLowerCase())&&(r=!0)})),r||(t=!1),t}));c(t)}else c(me)},placeholder:"Buscar",value:ge,size:"small"})}),Object(K.jsxs)(_.a,{item:!0,xs:12,sm:6,sx:{textAlign:"right"},children:[Object(K.jsx)(Z,{element:Object(K.jsx)(j.a,{title:"Exportar",children:Object(K.jsx)(g.a,{size:"large",children:Object(K.jsx)(W.R,{})})}),filename:"Plantilla",children:Object(K.jsxs)(Y,{data:r,name:"Lista de Plantilla",children:[Object(K.jsx)($,{label:"Id",value:"id"}),Object(K.jsx)($,{label:"Subsegmento",value:"nameSubsegmento"}),Object(K.jsx)($,{label:"Segmento Agrupado",value:"nameSegmentoAgru"}),Object(K.jsx)($,{label:"DX",value:"nameCIE11"}),Object(K.jsx)($,{label:"Segmento Afectado",value:"nameSegmentoAfec"}),Object(K.jsx)($,{label:"Descripci\xf3n",value:"descripcion"}),Object(K.jsx)($,{label:"Atenci\xf3n",value:"nameAtencion"}),Object(K.jsx)($,{label:"Tipo de Atenci\xf3n",value:"nameTipoAtencion"}),Object(K.jsx)($,{label:"Items",value:"nameItems"}),Object(K.jsx)($,{label:"Usuario",value:"usuario"})]})}),Object(K.jsx)(j.a,{title:"Impresi\xf3n",onClick:function(){return e("/template/report")},children:Object(K.jsx)(g.a,{size:"large",children:Object(K.jsx)(z.a,{})})}),Object(K.jsx)(f.a,{variant:"contained",size:"large",startIcon:Object(K.jsx)(B.a,{}),onClick:function(){return e("/template/add")},children:H.e.Agregar})]})]})}),Object(K.jsx)(T.a,{children:Object(K.jsxs)(S.a,{sx:{minWidth:750},"aria-labelledby":"tableTitle",children:[Object(K.jsx)(ne,{numSelected:se.length,order:V,orderBy:re,onSelectAllClick:function(e){if(e.target.checked){var a=r.map((function(e){return e.id}));le(a)}else le([])},onRequestSort:function(e,a){J(re===a&&"asc"===V?"desc":"asc"),ie(a)},rowCount:r.length,theme:k,selected:se,onClick:Ne}),Object(K.jsxs)(P.a,{children:[te(r,ae(V,re)).slice(de*Ee,de*Ee+Ee).map((function(a,t){if("string"===typeof a)return null;var r,n=(r=a.id,-1!==se.indexOf(r)),i="enhanced-table-checkbox-".concat(t);return Object(K.jsxs)(d.a,{hover:!0,role:"checkbox","aria-checked":n,tabIndex:-1,selected:n,children:[Object(K.jsx)(p.a,{padding:"checkbox",sx:{pl:3},onClick:function(e){return Pe(0,a.id)},children:Object(K.jsx)(A.a,{color:"primary",checked:n,inputProps:{"aria-labelledby":i}})}),Object(K.jsx)(p.a,{component:"th",id:i,scope:"row",onClick:function(e){return Pe(0,a.id)},sx:{cursor:"pointer"},align:"center",children:Object(K.jsxs)(b.a,{variant:"subtitle1",sx:{color:"dark"===k.palette.mode?"grey.600":"grey.900"},children:["#",a.id]})}),Object(K.jsx)(p.a,{component:"th",id:i,scope:"row",onClick:function(e){return Pe(0,a.id)},sx:{cursor:"pointer"},children:Object(K.jsx)(b.a,{variant:"subtitle1",sx:{color:"dark"===k.palette.mode?"grey.600":"grey.900"},children:a.nameCIE11})}),Object(K.jsx)(p.a,{component:"th",id:i,scope:"row",onClick:function(e){return Pe(0,a.id)},sx:{cursor:"pointer"},children:Object(K.jsx)(b.a,{variant:"subtitle1",sx:{color:"dark"===k.palette.mode?"grey.600":"grey.900"},children:a.nameTipoAtencion})}),Object(K.jsx)(p.a,{component:"th",id:i,scope:"row",onClick:function(e){return Pe(0,a.id)},sx:{cursor:"pointer"},children:Object(K.jsx)(b.a,{variant:"subtitle1",sx:{color:"dark"===k.palette.mode?"grey.600":"grey.900"},children:a.nameAtencion})}),Object(K.jsx)(p.a,{align:"center",sx:{pr:3},children:Object(K.jsx)(j.a,{title:"Actualizar",onClick:function(){return e("/template/update/".concat(a.id))},children:Object(K.jsx)(g.a,{size:"large",children:Object(K.jsx)(q.a,{sx:{fontSize:"1.3rem"}})})})})]},t)})),xe>0&&Object(K.jsx)(d.a,{style:{height:53*xe},children:Object(K.jsx)(p.a,{colSpan:6})})]})]})}),Object(K.jsx)(N.a,{rowsPerPageOptions:[5,10,25],component:"div",count:r.length,rowsPerPage:Ee,page:de,onPageChange:function(e,a){pe(a)},onRowsPerPageChange:function(e){(null===e||void 0===e?void 0:e.target.value)&&be(parseInt(null===e||void 0===e?void 0:e.target.value,10)),pe(0)}})]})}},645:function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var r,n=t(5),i=(r={Base:"https://siiso4.westus3.cloudapp.azure.com:44347/",TipoCatalogo:"api/TipoCatalogo",TipoCatalogoId:"api/TipoCatalogo/id",Catalogo:"api/Catalogo",CatalogoId:"api/Catalogo/id",GetAllByTipoCatalogo:"api/Catalogo/GetAllByTipoCatalogo",GetAllBySubTipoCatalogo:"api/Catalogo/GetAllBySubTipoCatalogo",Empleado:"api/Empleado",EmpleadoId:"api/Empleado/id",Reintegro:"api/Reintegro",ReintegroId:"api/Reintegro/id",ListaReintegro:"api/ListaReintegro",ListaReintegro_GetAllReintegro:"api/ListaReintegro/GetAllReintegro",ListaReintegroId:"api/ListaReintegro/id",Cargo:"api/Cargo",CargoId:"api/Cargo/id",Panorama:"api/Panoramariesgo",PanoramaGetAllByCharge:"api/Panoramariesgo/GetAllByCharge",PanoramaId:"api/Panoramariesgo/id",Recetario:"api/Recetario",RecetarioId:"api/Recetario/id",Medicamentos:"api/Medicamentos",MedicamentosId:"api/Medicamentos/id",PruebasAlcoholDroga:"api/PruebasAlcoholDroga",PruebasAlcoholDrogaId:"api/PruebasAlcoholDroga/id",Empresa:"api/Empresa",EmpresaId:"api/Empresa/id",SGSST:"api/SistemaGestion",SGSSTId:"api/SistemaGestion/id",RiesgoHistoriaLaboral:"api/RiesgoHistoriaLaboral",RiesgoHistoriaLaboralId:"api/RiesgoHistoriaLaboral/id",RHLByChargeHistorico:"api/RiesgoHistoriaLaboral/GetAllByChargeHistorico",RHLByHistorico:"api/RiesgoHistoriaLaboral/GetAllByHistorico",RHLByChargeAdvance:"api/RiesgoHistoriaLaboral/GetAllByChargeAdvance",RiesgoHistoriaLaboralEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas",RiesgoHistoriaLaboralIdEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/id",RHLByChargeHistoricoEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByChargeHistorico",RHLByHistoricoEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByHistorico",RHLByChargeAdvanceEmpresa:"api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByChargeAdvance",Proveedor:"api/Proveedor",ProveedorId:"api/Proveedor/id",Usuarios:"api/Usuarios",UsuariosId:"api/Usuarios/id",UsuariosEmail:"api/Usuarios/email",RegistroAtencion:"api/RegistroAtencion",RegistroAtencio_GetAllAtencion:"api/RegistroAtencion/GetAllAtencion",RegistroAtencionId:"api/RegistroAtencion/id",Paraclinicos:"api/Paraclinicos",Paraclinicos_GetAllByTypeParaclinico:"api/Paraclinicos/GetAllByTipoParaclinico",ParaclinicosId:"api/Paraclinicos/id",Ordenes:"api/Ordenes",OrdenesId:"api/Ordenes/id",Asesorias:"api/Asesorias",AsesoriasId:"api/Asesorias/id",Accidentalidad:"api/Accidentalidad",AccidentalidadId:"api/Accidentalidad/id"},Object(n.a)(r,"RegistroAtencion","api/RegistroAtencion"),Object(n.a)(r,"RegistroAtencionId","api/RegistroAtencion/id"),Object(n.a)(r,"HistoriaLaboral","api/HistoriaLaboral"),Object(n.a)(r,"HistoriaLaboralGetAllByDocument","api/HistoriaLaboral/GetAllByDocument"),Object(n.a)(r,"HistoriaLaboralId","api/HistoriaLaboral/id"),Object(n.a)(r,"HistoriaLaboralOtrasEmpresas","api/HistoriaLaboralOtrasEmpresas"),Object(n.a)(r,"HistoriaLaboralOtrasEmpresasGetAllByDocument","api/HistoriaLaboralOtrasEmpresas/GetAllByDocument"),Object(n.a)(r,"HistoriaLaboralOtrasEmpresasId","api/HistoriaLaboralOtrasEmpresas/id"),Object(n.a)(r,"CIE11","api/CIE11"),Object(n.a)(r,"CIE11Id","api/CIE11/id"),Object(n.a)(r,"Plantilla","api/Plantilla"),Object(n.a)(r,"PlantillaId","api/Plantilla/id"),Object(n.a)(r,"Items","api/Item"),Object(n.a)(r,"ItemsId","api/Item/id"),Object(n.a)(r,"ItemsGetAllByAtencion","api/Item/GetAllByAtencion"),Object(n.a)(r,"SegmentoAgrupado","api/SegmentoAgrupado"),Object(n.a)(r,"SegmentoAfectado","api/SegmentoAfectado/GetAllBySegAgrupado"),Object(n.a)(r,"Subsegmento","api/Subsegmento/GetAllBySegAfectado"),Object(n.a)(r,"MetodoCie11","api/CIE11/GetAllBySubsegmento"),Object(n.a)(r,"SegAfectado","api/SegmentoAfectado"),Object(n.a)(r,"Subsegment","api/Subsegmento"),Object(n.a)(r,"HistoriaClinica","api/HistoriaClinica"),Object(n.a)(r,"HistoriaClinicaId","api/HistoriaClinica/id"),Object(n.a)(r,"NotaEvolucion","api/NotaEvolucion"),Object(n.a)(r,"NotaEvolucionId","api/NotaEvolucion/id"),Object(n.a)(r,"NotaEnfermeria","api/NotaEnfermeria"),Object(n.a)(r,"NotaEnfermeriaId","api/NotaEnfermeria/id"),Object(n.a)(r,"MedicinaLaboral","api/MedicinaLaboralX"),Object(n.a)(r,"MedicinaLaboralId","api/MedicinaLaboralX/id"),Object(n.a)(r,"AusentismoLaboral","api/AusentismoLaboral"),Object(n.a)(r,"AusentismoLaboralId","api/AusentismoLaboral/id"),Object(n.a)(r,"HistoriaClinicaOcupacional","api/HistoriaClinicaOcupacional"),Object(n.a)(r,"HCOGetAllByDocumento","api/HistoriaClinicaOcupacional/GetAllByDocumento"),Object(n.a)(r,"HistoriaClinicaOcupacionalId","api/HistoriaClinicaOcupacional/id"),Object(n.a)(r,"HistoriaClinicaOcupacionalReport","api/HistoriaClinicaOcupacional/GetById"),Object(n.a)(r,"GetLastRecordHisCliOcu","api/HistoriaClinicaOcupacional/GetLastRecord"),Object(n.a)(r,"TipoAtencion","api/TipoAtencion"),Object(n.a)(r,"AtencionGetAllByTipoAtencion","api/Atencion/GetAllByTipoAtencion"),Object(n.a)(r,"Atencion","api/Atencion"),Object(n.a)(r,"Cuestionario","api/CuestionarioPrevencion"),Object(n.a)(r,"CuestionarioSave","api/CuestionarioPrevencion/Save"),Object(n.a)(r,"CuestionarioId","api/CuestionarioPrevencion/id"),r)},646:function(e,a,t){"use strict";t.d(a,"c",(function(){return l})),t.d(a,"b",(function(){return O})),t.d(a,"d",(function(){return p})),t.d(a,"a",(function(){return C}));var r=t(45),n=t.n(r),i=t(66),o=t(645),c=t(200),s=t.n(c);function l(){return u.apply(this,arguments)}function u(){return u=Object(i.a)(n.a.mark((function e(){var a,t,r=arguments;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.length>0&&void 0!==r[0]?r[0]:"",t=r.length>1&&void 0!==r[1]?r[1]:{},!(r.length>2&&void 0!==r[2]&&r[2])){e.next=15;break}return e.prev=4,e.next=7,s()({method:"post",url:"".concat(o.a.Base).concat(a),data:t,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(4),console.log("catch post ",e.t0);case 13:e.next=24;break;case 15:return e.prev=15,e.next=18,s()({method:"post",url:"".concat(o.a.Base).concat(a),data:t}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 18:return e.abrupt("return",e.sent);case 21:e.prev=21,e.t1=e.catch(15),console.log("catch post ",e.t1);case 24:case"end":return e.stop()}}),e,null,[[4,10],[15,21]])}))),u.apply(this,arguments)}function O(){return d.apply(this,arguments)}function d(){return d=Object(i.a)(n.a.mark((function e(){var a,t,r,i=arguments;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=i.length>0&&void 0!==i[0]?i[0]:"",t=i.length>1&&void 0!==i[1]?i[1]:{},e.prev=2,r=new URL("".concat(o.a.Base).concat(a)),Object.keys(t).forEach((function(e){return r.searchParams.append(e,t[e])})),e.next=7,s.a.get(r).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(2),console.log("catch get ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])}))),d.apply(this,arguments)}function p(){return A.apply(this,arguments)}function A(){return A=Object(i.a)(n.a.mark((function e(){var a,t,r=arguments;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.length>0&&void 0!==r[0]?r[0]:"",t=r.length>1&&void 0!==r[1]?r[1]:{},e.prev=2,e.next=5,s()({method:"put",url:"".concat(o.a.Base).concat(a),data:t}).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 5:return e.abrupt("return",e.sent);case 8:e.prev=8,e.t0=e.catch(2),console.log("catch put ",e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])}))),A.apply(this,arguments)}function C(){return E.apply(this,arguments)}function E(){return E=Object(i.a)(n.a.mark((function e(){var a,t,r,i=arguments;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=i.length>0&&void 0!==i[0]?i[0]:"",t=i.length>1&&void 0!==i[1]?i[1]:{},e.prev=2,r=new URL("".concat(o.a.Base).concat(a)),Object.keys(t).forEach((function(e){return r.searchParams.append(e,t[e])})),e.next=7,s.a.delete(r).then((function(e){if(200!==e.status)throw Error(e.status);return e})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",e.sent);case 10:e.prev=10,e.t0=e.catch(2),console.log("catch delete ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])}))),E.apply(this,arguments)}},648:function(e,a,t){"use strict";t.d(a,"a",(function(){return i})),t.d(a,"b",(function(){return o})),t.d(a,"c",(function(){return c})),t.d(a,"e",(function(){return s})),t.d(a,"f",(function(){return l})),t.d(a,"d",(function(){return u}));var r,n=t(5),i=(r={Departamento:4,Sede:6,Escolaridad:2,Genero:1,EstadoCivil:3,TipoContrato:7,Rol:21,RosterPosition:14,GeneralPosition:15,DepartEmpresa:13,Area:16,SubArea:17,Grupo:12,Turno:11,Estado:18,Eps:9,Afp:8,Arl:10,Ges:20,Cesantias:19,AtencionEMO:138,TIPO_EXAMEN_PARACLINICOS:68,ESTUDIO_EXAMEN_PARACLINICOS:22,LABORATORIO_ORDENES_PARACLINICOS:30,TIPORNM_ORDENES_PARACLINICOS:114,TIPO_ATENCION:107,PANO_ANALISISRUIDO:8,PANO_ANALISISMPI:8,"PANO_EXPOSICI\xd3N":130,PANO_MEDIDASCONTROL:40,PANO_RIESGO:128,PANO_GRADO_CONSINEPP:131,PARACLINICO_LECTURA:168,PARACLINICO_CONTROL:169,PARACLINICO_TIPOEPP:1168,PARACLINICO_RESULTADO:1169,VACUNAS:154,HCO_FRECUENCIAS:32,HCO_REFUERZO:150,HC_DEPORTE:143,HC_TIFOBIA:39,HCO_PARENTES:123,HCO_GINECOMETO:8,HCO_GINECOCICLO:8,HCO_GINECORESULT:8,HCO_BIOTIPO:37,HCO_RESULTADO:140,HCO_CONCEP_APTI_PSICO_INGRESO:151,HCO_CONCEP_APTI_PSICO_CONTROL:152,HCO_CONCEP_APTI_PSICO_PROMO:153,HCO_CONCEPTO_APTI_MEDICA:42,OPT_SINO:8,HCO_NEADONDE:145,HCO_RIESGO_CLASIFICACION:127,HCO_SINTOMAS_RESPIRATORIO:146,HCO_DX_TENSION_ARTERIAL:110,HCO_ANTECEDENTE_CARDIOVASCULAR:111,HCO_FRAM_BEBIDAS:31,HCO_DX_METABOLICO:142,RECE_TIPORDEN:8,RECE_CONTINGENCIA:8,PAD_MOTIVO:50,PAD_MOTIVO_NO_ASIS:54,UNIDAD:36,PAD_MUESTRA_AD:115,PAD_MUESTRA_AL:117,PAD_RESULTADO:116,PAD_CONCEPTOA:147,ASME_TIPOASESORIA:119,TIPO_PROVEEDOR:22,ROL_USUARIO:157,ESPECIALIDAD_MEDICO:158,CIUDADES:5,CLASE_AT:98,CAUSA_AT:99,SUBTIPO_AT:100,ESTADO_AT:102,AHC_ATENCION_NOTA_ENFERMERIA:136,Contingencia:74,PROCEDIMIENTO_ENFERMERIA:156,DiaTurno:76,JornadaTurno:139,MotivoPsicologia:53,MotivoMedica:52,ESTADO_EMPLEADO:162,ESTADO_RESTRICCION:163,TIPO_RESTRICCION:164,ORDENADO_POR:94,CONCEPTO_APTITUD_REINTEGRO:95,ORDENADO_POR_HORARIO:167,ORIGEN_REINTEGRO:90,TipoAsesoria:119,CausaAsesoria:8,EstadoAsesoria:8,EstadoCaso:48,ESTADO_CASO:38,TipoAtencion:65,Desocupado_EraDe_Plantilla1:8,Desocupado_EraDe_Plantilla2:8,Desocupado_EraDe_Plantilla3:8,SaludOcupacional_Atencion:8,SaludOcupacional_Motivo:8,TipoAtencion_Item:8,AHC_ATENCION:135,Opciones_SINO:88,AHC_CONCEP_ACTITUD:43,AUSLAB_INC:8,AUSLAB_TIPOINCA:8,AUSLAB_CONT:8,AUSLAB_ESTCAS:8,MEDLAB_RECASO:8,MEDLAB_REGION:8,MEDLAB_LATERA:8,MEDLAB_ENMO_EN:8,MEDLAB_ENDON_EN:8,MEDLAB_ORIGEN_EPS:8,MEDLAB_ORI_CA_ARL:8,MEDLAB_INS_ORIGEN:8},Object(n.a)(r,"MEDLAB_INS_ORIGEN",8),Object(n.a)(r,"AUSLAB_TISOPOR",8),Object(n.a)(r,"AUSLAB_CATEGORIA",8),Object(n.a)(r,"AUSLAB_TIPOATEN",8),Object(n.a)(r,"AUSLAB_REDEXP",8),Object(n.a)(r,"LISTA_CHEKEO_REINTEGRO",159),r),o={SINREGISTRO_GLOBAL:1,AsesoriaPsicologica:3909,ASESORIA_MEDICA:3911,SinRegistro:1},c={SINREGISTRO_GLOBAL:1,SINREGISTRO_TEXTO:"REGISTRO NO APLICA",GeneroWomen:2,ATENCION_ATENDIDO:"ATENDIDO",PARACLINICO_RNM:"RNM",PARACLINICO_ELECTRO:"ELECTROCARDIOGRAMA",PARACLINICO_PSA:"PSA",PARACLINICO_RXTORAX:"RXTORAX",PARACLINICO_CITOLOGIA:"CITOLOGIA",PARACLINICO_VISIOMETRIA:"VISIOMETRIA",PARACLINICO_ESPIROMETRIA:"ESPIROMETRIA",TIPO_ORDEN_FORMULA:4023,TIPO_ORDEN_EXAMEN:4026,TIPO_ORDEN_IMAGEN:4025,TIPO_ORDEN_LABORATORIO:4024,TIPO_ATENCION_EMO:3900,ATENCION_PRUEBA_ALCOHOL:3908,ATENCION_ENFERMERIA:3907,TIPO_ATENCION_ASESORIAS:3899,TIPO_ATENCION_ASESORIAS_PSICO:3909,TIPO_ATENCION_ASESORIAS_MEDICA:3911,TIPO_ATENCION_ENFERMERIA:3898,TIPO_ATENCION_ATENCIONMEDICA:3897,TIPO_ATENCION_ATENCIONMEDICA_NUEVO:3931,TIPO_ATENCION_ATENCIONMEDICA_CONTROL:3932,EMO_ATENCION_INGRESO:3918,EMO_ATENCION_CONTRO:3921,EMO_ATENCION_PROMO:3922,ORDENES_LABORATORIO:3533,ORDENES_FECHA_EXAM_FISICO:3541,ORDENES_RNM:3537,CONCEPTO_PAD_APTO:4103,CONCEPTO_PAD_NOAPTO:4104,RESULTADO_PAD_POSITIVO:4097,TIP_AT_TRIAGE:3897,TIP_AT_ENFERME:3898,TIP_AT_ASESORIA:3899,TIP_AT_EMO:3900,AT_ENFERMERIA:3907,AT_PAD:3908,AT_PAD_MOTIVO:3802,AT_PSICO:3909,AT_ASESORIA_MEDICA:3911,RiesgoEnOtrasEmpresas:4067,RiesgoQuimico:3949,RiesgoQuimico_MPI_DLTD:3955,RiesgoQuimico_RUIDO_DLTD:3960,RiesgoFisico:3950,RiesgoPsicosocial:3952,RiesgoBiologico:3953,RiesgoErgonomicoCargaFisica_Postura:3954,RiesgoErgonomicoCargaFisica_Fuerza:4065,RiesgoErgonomicoCargaFisica_Movimiento:4066,Opcion_SI:4005,Opcion_NO:4006},s={Guardar:"Guardar",CerrarCaso:"Cerrar Caso",OrdenesMedicas:"Ordenes Medicas",SubirArchivo:"Subir Archivo",Programacion:"Programaci\xf3n",Imprimir:"Imprimir",Cancelar:"Cerrar",Cerrar:"Cancelar",Actualizar:"Actualizar",Eliminar:"Eliminar",Agregar:"Nuevo",Seleccionadas:"Seleccionadas",Regresar:"Regresar",RegresarACargos:"Regresar A Cargos"},l={Requerido:"Este campo es requerido"},u={Guardar:"Registro guardado con \xe9xito",RiesgoGuardado:"Riesgos Cargados",Actualizar:"Registro actualizado con \xe9xito",Eliminar:"Registro eliminado con \xe9xito",TituloEliminar:"\xbfEstas seguro?",TextoEliminar:"Este registro se eliminara, \xbfesta seguro de eliminarlo?",TituloCerrarCaso:"\xbfEstas seguro de Cerrar Caso?",TextoCerrarCaso:"Este caso ser\xe1 cerrado, \xbfesta seguro de hacerlo?",TituloCargar:"\xbfDesea cargar la exposici\xf3n ocupacional?",TextoCargar:"Se cargaran los riesgos, esto puede demorar un poco",NoEliminar:"No se pudo eliminar el registro",ErrorDocumento:"Por favor, ingrese un n\xfamero de documento",ErrorDeDatos:"Hubo un error al buscar los datos, vuelva a intentarlo",ErrorNoHayDatos:"No hay datos buscados, vuelva a intentarlo",CampoRequerido:"Este campo es requerido"}},656:function(e,a,t){"use strict";t.d(a,"f",(function(){return O})),t.d(a,"e",(function(){return d})),t.d(a,"g",(function(){return p})),t.d(a,"c",(function(){return E})),t.d(a,"d",(function(){return b})),t.d(a,"a",(function(){return I})),t.d(a,"b",(function(){return j}));var r=t(4),n=t(0),i=t.n(n),o=t(548),c=t(619),s=t(648),l=t(624),u=t(1),O={title:"".concat(s.d.TituloEliminar),text:"".concat(s.d.TextoEliminar),icon:"error",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}},d={title:"".concat(s.d.TituloCerrarCaso),text:"".concat(s.d.TextoCerrarCaso),icon:"warning",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}},p={title:"".concat(s.d.TituloCargar),text:"".concat(s.d.TextoCargar),icon:"warning",buttons:["Cancelar","Si"],dangerMode:!0,confirm:{text:"Si"},cancel:{text:"Cancelar"}};function A(e){return Object(u.jsx)(o.a,Object(r.a)(Object(r.a)({},e),{},{direction:"up"}))}var C=i.a.forwardRef((function(e,a){return Object(u.jsx)(c.a,Object(r.a)({elevation:6,ref:a,variant:"filled"},e))})),E=function(e){var a=e.open,t=e.onClose;return Object(u.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2500,onClose:t,children:Object(u.jsx)(C,{severity:"success",sx:{width:"100%"},children:s.d.Guardar})},"alert")},b=function(e){var a=e.open,t=e.onClose;return Object(u.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2500,onClose:t,children:Object(u.jsx)(C,{severity:"success",sx:{width:"100%"},children:s.d.Actualizar})},"alert")},I=function(e){var a=e.open,t=e.onClose;return Object(u.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2500,onClose:t,children:Object(u.jsx)(C,{severity:"error",sx:{width:"100%"},children:s.d.Eliminar})},"alert")},j=function(e){var a=e.open,t=e.onClose,r=e.error;return Object(u.jsx)(l.a,{TransitionComponent:A,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:2e3,onClose:t,children:Object(u.jsx)(C,{severity:"error",sx:{width:"100%"},children:r})},"alert")}},711:function(e,a,t){"use strict";t.d(a,"b",(function(){return s})),t.d(a,"c",(function(){return l})),t.d(a,"d",(function(){return u})),t.d(a,"e",(function(){return O})),t.d(a,"a",(function(){return d}));var r=t(45),n=t.n(r),i=t(66),o=t(645),c=t(646),s=function(){var e=Object(i.a)(n.a.mark((function e(a,t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.b)(o.a.Plantilla,{page:a,pageSize:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),l=function(){var e=Object(i.a)(n.a.mark((function e(a){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.b)(o.a.PlantillaId,{id:a});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),u=function(){var e=Object(i.a)(n.a.mark((function e(a){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.c)(o.a.Plantilla,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),O=function(){var e=Object(i.a)(n.a.mark((function e(a){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.d)(o.a.Plantilla,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),d=function(){var e=Object(i.a)(n.a.mark((function e(a){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.a)(o.a.Plantilla,{idPlantilla:a});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()},713:function(e,a,t){"use strict";var r=t(100);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=r(t(127)),i=t(1),o=(0,n.default)((0,i.jsx)("path",{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"AddCircleOutlineOutlined");a.default=o},759:function(e,a,t){"use strict";var r=t(100);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=r(t(127)),i=t(1),o=(0,n.default)([(0,i.jsx)("path",{d:"M8 5h8v3H8z",opacity:".3"},"0"),(0,i.jsx)("circle",{cx:"18",cy:"11.5",r:"1"},"1"),(0,i.jsx)("path",{d:"M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm4-4h-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4z"},"2"),(0,i.jsx)("path",{d:"M6 13h12v2h2v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4h2v-2zm12-2.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z",opacity:".3"},"3")],"PrintTwoTone");a.default=o}}]);
//# sourceMappingURL=149.1cb368c9.chunk.js.map