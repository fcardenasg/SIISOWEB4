import config from "config";

export const Url = {
    Base: config.rutaApi,

    Login: 'api/Login',
    ConsultarCorreo: 'api/Login/mail-consult',
    RecuperarPasswordCorreo: 'api/Login/RecuperarPasswordCorreo',
    EnviarExamenesPorCorreo: 'api/Login/enviar-paraclinicos',
    ChangePassword: 'api/Login/ChangePassword',
    Usuario: 'api/Usuario',

    Usuarios: 'api/Usuarios',
    UsuariosCombo: 'api/Usuarios/combo',
    UsuariosVentanilla: 'api/Usuarios/combo-responventanilla',
    UsuariosRegTaxi: 'api/Usuarios/combo-registrataxi',
    UsuariosRol: 'api/Usuarios/combo-rol',
    UsuariosComboArea: 'api/Usuarios/combo-area',
    UsuariosUpdateSede: 'api/Usuarios/UpdateSede',
    UsuariosId: 'api/Usuarios/id',
    UsuariosEmail: 'api/Usuarios/email',

    TipoCatalogo: 'api/TipoCatalogo',
    TipoCatalogoId: 'api/TipoCatalogo/id',

    HeadcountId: "api/Headcount/id",
    Headcount: "api/Headcount",
    HeadcountAnio: "api/Headcount/list-anio",

    Rol: 'api/Rol',
    RolList: 'api/Rol/list',
    RolComboRol: 'api/Rol/combo-rol',
    RolComboCompo: 'api/Rol/combo-componente',
    RolComboItem: 'api/Rol/combo-itemmenu',
    RolComboCard: 'api/Rol/combo-carditem',
    RolId: 'api/Rol/id',
    RolIdPermiso: 'api/Rol/idPermiso',

    Catalogo: 'api/Catalogo',
    CatalogoCombo: 'api/Catalogo/combo',
    CatalogoId: 'api/Catalogo/id',
    GetAllByTipoCatalogo: 'api/Catalogo/GetAllByTipoCatalogo',
    GetAllBySubTipoCatalogo: 'api/Catalogo/GetAllBySubTipoCatalogo',

    Empleado: 'api/Empleado',
    EmpleadoExcel: 'api/Empleado/excel',
    EmpleadoOrdenes: 'api/Empleado/buscar-ordenes',
    EmpleadoId: 'api/Empleado/id',

    Reintegro: 'api/Reintegro',
    ReintegroExcel: 'api/Reintegro/excel',
    ReintegroId: 'api/Reintegro/id',
    ReintegroGenerarList: 'api/Reintegro/lista-chekeo',

    Framingham: 'api/Framingham',
    FraminghamExcel: 'api/Framingham/excel',
    FraminghamId: 'api/Framingham/id',

    ListaReintegro: 'api/ListaReintegro',

    ListaReintegroArchivo: 'api/ListaReintegroArchivo',

    Cargo: 'api/Cargo',
    CargoId: 'api/Cargo/id',

    Panorama: 'api/Panoramariesgo',
    PanoramaGetAllByCharge: 'api/Panoramariesgo/GetAllByCharge',
    PanoramaId: 'api/Panoramariesgo/id',

    Recetario: 'api/Recetario',
    RecetarioByDocAndOrder: 'api/Recetario/GetAllByDocumentAndTypeOrder',
    RecetarioId: 'api/Recetario/id',

    Medicamentos: 'api/Medicamentos',
    MedicamentosId: 'api/Medicamentos/id',

    PruebasAlcoholDroga: 'api/PruebasAlcoholDroga',
    PruebasAlcoholDrogaExcel: 'api/PruebasAlcoholDroga/excel',
    PruebasAlcoholDrogaId: 'api/PruebasAlcoholDroga/id',

    Empresa: 'api/Empresa',
    EmpresaId: 'api/Empresa/id',

    SGSST: 'api/SistemaGestion',
    SGSSTId: 'api/SistemaGestion/id',

    /* RIESGO HISTORIA LABORAL */
    RiesgoHistoriaLaboral: 'api/RiesgoHistoriaLaboral',
    RiesgoHistoriaLaboralId: 'api/RiesgoHistoriaLaboral/id',
    RHLByChargeAdvance: 'api/RiesgoHistoriaLaboral/all-charge-advance',
    ReportRHL: 'api/RiesgoHistoriaLaboral/all-reporte-rhl',
    RHLDeleteAndInsertRisk: 'api/RiesgoHistoriaLaboral/delete-insert-risk',


    RiesgoHistoriaLaboralEmpresa: 'api/RiesgoHistoriaLaboralOtrasEmpresas',
    RiesgoHistoriaLaboralIdEmpresa: 'api/RiesgoHistoriaLaboralOtrasEmpresas/id',
    RHLByChargeAdvanceEmpresa: 'api/RiesgoHistoriaLaboralOtrasEmpresas/all-charge-advance',
    RHLOEDeleteAndInsertRisk: 'api/RiesgoHistoriaLaboralOtrasEmpresas/delete-insert-risk',
    ReportRHLOE: 'api/RiesgoHistoriaLaboralOtrasEmpresas/all-reporte-rhl',
    RiesgoHistoriaLaboralEmpresa_GetDataExploracion: 'api/RiesgoHistoriaLaboralOtrasEmpresas/get-data-exploracion',

    Proveedor: 'api/Proveedor',
    ProveedorExcel: 'api/Proveedor/excel',
    ProveedorId: 'api/Proveedor/id',

    RegistroAtencion: 'api/RegistroAtencion',
    RegistroAtencionAtendidos: 'api/RegistroAtencion/atendidos',
    RegistroAtencionExcel: 'api/RegistroAtencion/excel',
    RegistroAtencionValidateAtencion: 'api/RegistroAtencion/validate-attention',
    UpdateEstadoRegistroAtencion: 'api/RegistroAtencion/UpdateEstadoRegistroAtencion',
    RegistroAtencio_GetAllAtencion: 'api/RegistroAtencion/attention',
    RegistroAtencionId: 'api/RegistroAtencion/id',
    RegistroAtencionEpide: 'api/RegistroAtencion/consulta-epidemiologica',
    RegistroAtencionEpideResumen: 'api/RegistroAtencion/consulta-epidemiologica-resumen',

    Paraclinicos: 'api/Paraclinicos',
    Paraclinicos_GetAllByDocumento: 'api/Paraclinicos/GetAllByDocumento',
    Paraclinicos_GetAllByDocumentoParacli: 'api/Paraclinicos/GetAllByDocumentoParacli',
    Paraclinicos_Por: 'api/Paraclinicos/listarpor-paraclinico',
    ParaclinicosExcel: 'api/Paraclinicos/excel',
    ParaclinicosId: 'api/Paraclinicos/id',

    Ordenes: 'api/Ordenes',
    OrdenesId: 'api/Ordenes/id',
    LsOrdenes: 'api/Ordenes/empleados-ordenes',

    OrdenesParaclinicos: 'api/OrdenesParaclinicos',
    OrdenesParaclinicosExcel: 'api/OrdenesParaclinicos/excel',
    OrdenesParaclinicosId: 'api/OrdenesParaclinicos/id',
    OrdenesParaclinicosMasiva: 'api/OrdenesParaclinicos/masiva',

    Antecedente: 'api/Antecedente',

    Indicadores: 'api/Indicadores',
    IndicadoresExcel: 'api/Headcount/indicadores',
    IndicadoresId: 'api/Indicadores/id',

    VentanillaUnica: 'api/VentanillaUnica',
    VentanillaUnicaFile: 'api/VentanillaUnica/file',
    VentanillaUnicaComboUsuario: 'api/VentanillaUnica/combo-usuario',
    VentanillaUnicaNotificarUsuario: 'api/VentanillaUnica/notificar-usuario',
    UpdateVentanillaUnicaEnvio: 'api/VentanillaUnica/update-dataenvio',
    UpdateVentanillaUnicaCorreo: 'api/VentanillaUnica/update-datacorreo',
    VentanillaUnicaDescargarDocumento: 'api/VentanillaUnica/comprimir-zid',
    VentaUnicaNotiSolicitante: 'api/VentanillaUnica/notificar-solicitante',
    VentaUnicaNotiUsuarios: 'api/VentanillaUnica/notificar',
    VentanillaUnicaMonitoreo: 'api/VentanillaUnica/list-monitoreo',
    VentanillaUnicaDocumento: 'api/VentanillaUnica/documento',
    VentanillaUnicaId: 'api/VentanillaUnica/id',

    VentanillaUnicaDetalle: 'api/VentanillaUnicaDetalle',
    VentanillaUnicaDetalleId: 'api/VentanillaUnicaDetalle/id',
    VentanillaUnicaDetalleList: 'api/VentanillaUnicaDetalle/list-detalle',
    VentanillaUnicaDetalleArea: 'api/VentanillaUnicaDetalle/list-area',
    VentanillaUnicaDetalleArchivo: 'api/VentanillaUnicaDetalle/archivo',

    VentanillaUnicaDetalleArchivoAll: 'api/VentanillaUnicaDetalle/archivo/all',
    VentanillaUnicaDetalleArchivoById: 'api/VentanillaUnicaDetalle/archivo/by-id',

    Asesorias: 'api/Asesorias',
    AsesoriasExcel: 'api/Asesorias/excel',
    AsesoriasAll: 'api/Asesorias/all',
    AsesoriasId: 'api/Asesorias/id',
    AsesoriasReportePdf: 'api/Asesorias/reporte-pdf',

    OrdenesEPP: 'api/OrdenesEPP',
    OrdenesEPPExcel: 'api/OrdenesEPP/excel',
    OrdenesEPPId: 'api/OrdenesEPP/id',

    ConceptosIND: 'api/ConceptosIND',
    ConceptosINDId: 'api/ConceptosIND/id',

    RegistroTaxi: 'api/RegistroTaxi',
    RegistroTaxiExcel: 'api/RegistroTaxi/excel',
    RegistroTaxiId: 'api/RegistroTaxi/id',

    Solicitudes: 'api/Solicitudes',
    SolicitudesDataSend: 'api/Solicitudes/data-send',
    SolicitudesPorSede: 'api/Solicitudes/all-por-sede',
    SolicitudesExcel: 'api/Solicitudes/excel',
    SolicitudesId: 'api/Solicitudes/id',
    SolicitudesSendSolic: 'api/Solicitudes/enviar-solicitud',

    SolicitudDetalle: 'api/SolicitudDetalle',
    SolicitudDetalleFile: 'api/SolicitudDetalle/file',
    SolicitudDetalleId: 'api/SolicitudDetalle/id',
    SolicitudDetallePendiente: 'api/SolicitudDetalle/pendiente-respuesta',

    ApuntesPersonales: 'api/ApuntesPersonales',
    ApuntesPersonalesId: 'api/ApuntesPersonales/id',

    ApuntesIndexacion: 'api/ApuntesIndexacion',
    ApuntesIndexacionId: 'api/ApuntesIndexacion/id',

    Accidentalidad: 'api/Accidentalidad',
    AccidentalidadExcel: 'api/Accidentalidad/excel',
    AccidentalidadId: 'api/Accidentalidad/id',

    HistoriaLaboral: 'api/HistoriaLaboral',
    HistoriaLaboralGetAllByDocument: 'api/HistoriaLaboral/GetAllByDocument',
    HistoriaLaboralId: 'api/HistoriaLaboral/id',

    HistoriaLaboralOtrasEmpresas: 'api/HistoriaLaboralOtrasEmpresas',
    HistoriaLaboralOtrasEmpresasGetAllByDocument: 'api/HistoriaLaboralOtrasEmpresas/GetAllByDocument',
    HistoriaLaboralOtrasEmpresasId: 'api/HistoriaLaboralOtrasEmpresas/id',

    CIE11: 'api/CIE11',
    CIE11Search: 'api/CIE11/GetAllByCodeOrName',
    CIE11Id: 'api/CIE11/id',

    Plantilla: 'api/Plantilla',
    PlantillaId: 'api/Plantilla/id',

    Items: 'api/Item',
    ItemsId: 'api/Item/id',
    ItemsGetAllByAtencion: 'api/Item/GetAllByAtencion',

    SegmentoAgrupado: 'api/SegmentoAgrupado',
    SegmentoAfectado: 'api/SegmentoAfectado/GetAllBySegAgrupado',
    Subsegmento: 'api/Subsegmento/GetAllBySegAfectado',
    MetodoCie11: 'api/CIE11/GetAllBySubsegmento',

    SegAfectado: 'api/SegmentoAfectado',
    Subsegment: 'api/Subsegmento',

    HistoriaClinica: 'api/HistoriaClinica',
    HistoriaClinicaExcel: 'api/HistoriaClinica/excel',
    HistoriaClinicaId: 'api/HistoriaClinica/id',
    HistoriaClinicaAntecendete: 'api/HistoriaClinica/antecedente',
    HistoriaClinica_GetIdRegistroAtencion: 'api/HistoriaClinica/GetIdRegistroAtencion',
    HistoriaClinica_ValidateIdRegistroAtencion: 'api/HistoriaClinica/ValidateIdRegistroAtencion',

    NotaEvolucion: 'api/NotaEvolucion',
    NotaEvolucionExcel: 'api/NotaEvolucion/excel',
    NotaEvolucionId: 'api/NotaEvolucion/id',
    NotaEvolucion_GetIdRegistroAtencion: 'api/NotaEvolucion/GetIdRegistroAtencion',
    NotaEvolucion_ValidateIdRegistroAtencion: 'api/NotaEvolucion/ValidateIdRegistroAtencion',

    NotaEnfermeria: 'api/NotaEnfermeria',
    NotaEnfermeriaExcel: 'api/NotaEnfermeria/excel',
    NotaEnfermeriaId: 'api/NotaEnfermeria/id',

    MedicinaLaboral: 'api/MedicinaLaboralX',
    MedicinaLaboralExcel: 'api/MedicinaLaboralX/excel',
    MedicinaLaboralId: 'api/MedicinaLaboralX/id',

    AusentismoLaboralHistorico: 'api/AusentismoLaboralHistorico',
    AusentismoLaboralHistoricoExcel: 'api/AusentismoLaboralHistorico/excel',
    AusentismoLaboralHistoricoId: 'api/AusentismoLaboralHistorico/id',
    AusentismoLaboralHistoricoIndicadores: 'api/AusentismoLaboralHistorico/indicadores',
    AusentismoLaboralHistoricoComboAnios: 'api/AusentismoLaboralHistorico/combo-anio',

    AusentismoLaboral: 'api/AusentismoLaboral',
    AusentismoLaboralExcel: 'api/AusentismoLaboral/excel',
    AusentismoLaboral_Documento: 'api/AusentismoLaboral/getbydocumento',
    AusentismoLaboral_NumDia: 'api/AusentismoLaboral/get-numerodia',
    AusentismoLaboralId: 'api/AusentismoLaboral/id',

    HistoriaClinicaOcupacional: 'api/HistoriaClinicaOcupacional',
    HistoriaClinicaOcupacionalExcel: 'api/HistoriaClinicaOcupacional/excel',
    HistoriaClinicaOcupacional_ValidateIdRegistroAtencion: 'api/HistoriaClinicaOcupacional/ValidateIdRegistroAtencion',
    HCOGetAllByDocumento: 'api/HistoriaClinicaOcupacional/GetAllByDocumento',
    HistoriaClinicaOcupacionalId: 'api/HistoriaClinicaOcupacional/id',
    HistoriaClinicaOcupacionalReport: 'api/HistoriaClinicaOcupacional/GetById',
    GetLastRecordHisCliOcu: 'api/HistoriaClinicaOcupacional/GetLastRecord',
    GetLastRegister: 'api/HistoriaClinicaOcupacional/historico',

    TipoAtencion: 'api/TipoAtencion',
    AtencionGetAllByTipoAtencion: 'api/Atencion/GetAllByTipoAtencion',
    Atencion: 'api/Atencion',

    Cuestionario: 'api/CuestionarioPrevencion',
    CuestionarioSave: 'api/CuestionarioPrevencion/Save',
    CuestionarioId: 'api/CuestionarioPrevencion/id'
}