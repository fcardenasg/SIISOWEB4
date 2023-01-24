export const Url = {
    Base: 'https://localhost:44347/',

    /* https://siisonew.drummondltd.com:44347/ */
    /* https://localhost:44347/ */

    Login: 'api/Login',
    RecuperarPasswordCorreo: 'api/Login/RecuperarPasswordCorreo',
    ChangePassword: 'api/Login/ChangePassword',
    Usuario: 'api/Usuario',

    TipoCatalogo: 'api/TipoCatalogo',
    TipoCatalogoId: 'api/TipoCatalogo/id',

    Rol: 'api/Rol',
    RolId: 'api/Rol/id',

    Catalogo: 'api/Catalogo',
    CatalogoId: 'api/Catalogo/id',
    GetAllByTipoCatalogo: 'api/Catalogo/GetAllByTipoCatalogo',
    GetAllBySubTipoCatalogo: 'api/Catalogo/GetAllBySubTipoCatalogo',

    Empleado: 'api/Empleado',
    EmpleadoId: 'api/Empleado/id',

    Reintegro: 'api/Reintegro',
    ReintegroId: 'api/Reintegro/id',

    Framingham: 'api/Framingham',
    FraminghamId: 'api/Framingham/id',

    ListaReintegro: 'api/ListaReintegro',
    ListaReintegro_GetAllReintegro: 'api/ListaReintegro/GetAllReintegro',
    ListaReintegroId: 'api/ListaReintegro/id',

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
    PruebasAlcoholDrogaId: 'api/PruebasAlcoholDroga/id',

    Empresa: 'api/Empresa',
    EmpresaId: 'api/Empresa/id',

    SGSST: 'api/SistemaGestion',
    SGSSTId: 'api/SistemaGestion/id',

    RiesgoHistoriaLaboral: 'api/RiesgoHistoriaLaboral',
    RiesgoHistoriaLaboralId: 'api/RiesgoHistoriaLaboral/id',
    RHLByChargeHistorico: 'api/RiesgoHistoriaLaboral/GetAllByChargeHistorico',
    RHLByHistorico: 'api/RiesgoHistoriaLaboral/GetAllByHistorico',
    RHLByChargeAdvance: 'api/RiesgoHistoriaLaboral/GetAllByChargeAdvance',
    ReportRHL: 'api/RiesgoHistoriaLaboral/GetAllRHL',

    RiesgoHistoriaLaboralEmpresa: 'api/RiesgoHistoriaLaboralOtrasEmpresas',
    RiesgoHistoriaLaboralIdEmpresa: 'api/RiesgoHistoriaLaboralOtrasEmpresas/id',
    RHLByChargeHistoricoEmpresa: 'api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByChargeHistorico',
    RHLByHistoricoEmpresa: 'api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByHistorico',
    RHLByChargeAdvanceEmpresa: 'api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllByChargeAdvance',
    ReportRHLOE: 'api/RiesgoHistoriaLaboralOtrasEmpresas/GetAllRHL',

    Proveedor: 'api/Proveedor',
    ProveedorId: 'api/Proveedor/id',

    Usuarios: 'api/Usuarios',
    UsuariosId: 'api/Usuarios/id',
    UsuariosEmail: 'api/Usuarios/email',

    RegistroAtencion: 'api/RegistroAtencion',
    RegistroAtencio_GetAllAtencion: 'api/RegistroAtencion/GetAllAtencion',
    RegistroAtencionId: 'api/RegistroAtencion/id',

    Paraclinicos: 'api/Paraclinicos',
    Paraclinicos_GetAllByDocumento: 'api/Paraclinicos/GetAllByDocumento',
    Paraclinicos_GetAllByDocumentoParacli: 'api/Paraclinicos/GetAllByDocumentoParacli',
    Paraclinicos_GetAllByTypeParaclinico: 'api/Paraclinicos/GetAllByTipoParaclinico',
    ParaclinicosId: 'api/Paraclinicos/id',

    Ordenes: 'api/Ordenes',
    OrdenesId: 'api/Ordenes/id',

    Asesorias: 'api/Asesorias',
    AsesoriasId: 'api/Asesorias/id',
    AsesoriasGetAllByTipoAtencion: 'api/Asesorias/GetAllByTipoAtencion',
    AsesoriasGetAllByTipoAtencion2: 'api/Asesorias/GetAllByTipoAtencion2',


    OrdenesEPP: 'api/OrdenesEPP',
    OrdenesEPPId: 'api/OrdenesEPP/id',


    ConceptosIND: 'api/ConceptosIND',
    ConceptosINDId: 'api/ConceptosIND/id',

    RegistroTaxi: 'api/RegistroTaxi',
    RegistroTaxiId: 'api/RegistroTaxi/id',

    ApuntesPersonales: 'api/ApuntesPersonales',
    ApuntesPersonalesId: 'api/ApuntesPersonales/id',

    Accidentalidad: 'api/Accidentalidad',
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
    HistoriaClinicaId: 'api/HistoriaClinica/id',

    NotaEvolucion: 'api/NotaEvolucion',
    NotaEvolucionId: 'api/NotaEvolucion/id',

    NotaEnfermeria: 'api/NotaEnfermeria',
    NotaEnfermeriaId: 'api/NotaEnfermeria/id',

    MedicinaLaboral: 'api/MedicinaLaboralX',
    MedicinaLaboralId: 'api/MedicinaLaboralX/id',

    AusentismoLaboral: 'api/AusentismoLaboral',
    AusentismoLaboralId: 'api/AusentismoLaboral/id',

    HistoriaClinicaOcupacional: 'api/HistoriaClinicaOcupacional',
    HistoriaClinicaOcupacional_ValidateIdRegistroAtencion: 'api/HistoriaClinicaOcupacional/ValidateIdRegistroAtencion',
    HCOGetAllByDocumento: 'api/HistoriaClinicaOcupacional/GetAllByDocumento',
    HistoriaClinicaOcupacionalId: 'api/HistoriaClinicaOcupacional/id',
    HistoriaClinicaOcupacionalReport: 'api/HistoriaClinicaOcupacional/GetById',
    GetLastRecordHisCliOcu: 'api/HistoriaClinicaOcupacional/GetLastRecord',

    TipoAtencion: 'api/TipoAtencion',
    AtencionGetAllByTipoAtencion: 'api/Atencion/GetAllByTipoAtencion',
    Atencion: 'api/Atencion',

    Cuestionario: 'api/CuestionarioPrevencion',
    CuestionarioSave: 'api/CuestionarioPrevencion/Save',
    CuestionarioId: 'api/CuestionarioPrevencion/id',

}