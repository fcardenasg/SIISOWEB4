import config from "config";

export const Url = {
    Base: config.rutaApi,

    Login: 'api/Login',
    RecuperarPasswordCorreo: 'api/Login/RecuperarPasswordCorreo',
    EnviarExamenesPorCorreo: 'api/Login/enviar-paraclinicos',
    ChangePassword: 'api/Login/ChangePassword',
    Usuario: 'api/Usuario',

    Usuarios: 'api/Usuarios',
    UsuariosCombo: 'api/Usuarios/combo',
    UsuariosUpdateSede: 'api/Usuarios/UpdateSede',
    UsuariosId: 'api/Usuarios/id',
    UsuariosEmail: 'api/Usuarios/email',

    TipoCatalogo: 'api/TipoCatalogo',
    TipoCatalogoId: 'api/TipoCatalogo/id',

    Rol: 'api/Rol',
    RolId: 'api/Rol/id',

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
    ProveedorId: 'api/Proveedor/id',

    RegistroAtencion: 'api/RegistroAtencion',
    RegistroAtencionExcel: 'api/RegistroAtencion/excel',
    RegistroAtencionValidateAtencion: 'api/RegistroAtencion/validate-attention',
    UpdateEstadoRegistroAtencion: 'api/RegistroAtencion/UpdateEstadoRegistroAtencion',
    RegistroAtencio_GetAllAtencion: 'api/RegistroAtencion/attention',
    RegistroAtencionId: 'api/RegistroAtencion/id',

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

    Asesorias: 'api/Asesorias',
    AsesoriasExcel: 'api/Asesorias/excel',
    AsesoriasAll: 'api/Asesorias/all',
    AsesoriasId: 'api/Asesorias/id',

    OrdenesEPP: 'api/OrdenesEPP',
    OrdenesEPPId: 'api/OrdenesEPP/id',

    ConceptosIND: 'api/ConceptosIND',
    ConceptosINDId: 'api/ConceptosIND/id',

    RegistroTaxi: 'api/RegistroTaxi',
    RegistroTaxiExcel: 'api/RegistroTaxi/excel',
    RegistroTaxiId: 'api/RegistroTaxi/id',

    Solicitudes: 'api/Solicitudes',
    SolicitudesPorSede: 'api/Solicitudes/all-por-sede',
    SolicitudesExcel: 'api/Solicitudes/excel',
    SolicitudesId: 'api/Solicitudes/id',

    SolicitudDetalle: 'api/SolicitudDetalle',
    SolicitudDetalleFile: 'api/SolicitudDetalle/file',
    SolicitudDetalleId: 'api/SolicitudDetalle/id',
    SolicitudDetallePendiente: 'api/SolicitudDetalle/pendiente-respuesta',

    ApuntesPersonales: 'api/ApuntesPersonales',
    ApuntesPersonalesId: 'api/ApuntesPersonales/id',

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
    CuestionarioId: 'api/CuestionarioPrevencion/id',
}