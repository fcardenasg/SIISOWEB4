export const CodCatalogo = {
    Departamento: 8,
    Sede: 8,
    Escolaridad: 8,
    Genero: 8,
    EstadoCivil: 8,
    TipoContrato: 8,
    Rol: 8,
    RosterPosition: 8,
    GeneralPosition: 8,
    DepartEmpresa: 8,
    Area: 8,
    Grupo: 8,
    Turno: 8,
    Estado: 8,
    Eps: 8,
    Afp: 8,
    Arl: 8,
    Version: 8,
    Ges: 8,
    Cesantias: 8,
    AtencionEMO: 8,
    GradoconEPP: 8,
    GradosinEPP: 8,

    TIPO_ATENCION: 107,

    PANO_ANALISISRUIDO: 8,
    PANO_ANALISISMPI: 8,
    PANO_EXPOSICIÓN: 8,
    PANO_MEDIDASCONTROL: 8,
    PANO_RIESGO: 8,
    PANO_GRADO_CONSINEPP: 8,

    HCO_VACUNAS: 8,
    HCO_FRECUENCIAS: 8,
    HC_DEPOR: 8,
    HC_TIFOBIA: 8,
    HCO_PARENTES: 8,
    HCO_GINECOMETO: 8,
    HCO_GINECOCICLO: 8,
    HCO_GINECORESULT: 8,
    HCO_BIOTIPO: 8,
    HCO_RESULT: 8,
    HCO_CONCEP_ACTIPSI: 8,
    HCO_NECONCEPTOAC: 8,
    OPT_SINO: 8,
    HCO_NEADONDE: 8,
    HCO_RIES_CLASI: 8,

    HCO_DXTENSI: 8,
    HCO_ANTE_CARDIOVAS: 8,
    HCO_FRAM_DEPOR: 8,
    HCO_FRAM_BEBIDAS: 8,
    HCO_DXMETA: 8,

    RECE_TIPORDEN: 8,
    RECE_CONTINGENCIA: 8,

    PAD_MOTIVO: 50,
    PAD_MOTIVO_NO_ASIS: 8,

    PAD_MUESTRAAD: 8,
    PAD_MUESTRAAL: 8,
    PAD_RESULTADO: 8,
    PAD_CONCEPTOA: 8,

    ASME_TIPOASESORIA: 8,
    ASME_MOT_ASESORIA: 8,

    TIPO_PROVEEDOR: 8,
    CIUDADES: 8,
    Contingencia: 8,
    DiaTurno: 8,
    AsesoriaMotivo: 8,
    TipoAsesoria: 8,
    CausaAsesoria: 8,
    EstadoAsesoria: 8,
    EstadoCaso: 8,
    TipoAtencion: 8,
    Desocupado_EraDe_Plantilla1: 8,
    Desocupado_EraDe_Plantilla2: 8,
    Desocupado_EraDe_Plantilla3: 8,
    SaludOcupacional_Atencion: 8,
    SaludOcupacional_Motivo: 8,
    TipoAtencion_Item: 8,

    AHC_ATENCION: 8,
    Opciones_SINO: 8,
    AHC_CONCEP_ACTITUD: 8,
    AUSLAB_INC: 8,
    AUSLAB_TIPOINCA: 8,
    AUSLAB_CONT: 8,
    AUSLAB_ESTCAS: 8,
    MEDLAB_RECASO: 8,
    MEDLAB_REGION: 8,
    MEDLAB_LATERA: 8,
    MEDLAB_ENMO_EN: 8,
    MEDLAB_ENDON_EN: 8,
    MEDLAB_ORIGEN_EPS: 8,
    MEDLAB_ORI_CA_ARL: 8,
    MEDLAB_INS_ORIGEN: 8,
    MEDLAB_INS_ORIGEN: 8,
    AUSLAB_TISOPOR: 8,
    AUSLAB_CATEGORIA: 8,
    AUSLAB_TIPOATEN: 8,
    AUSLAB_REDEXP: 8,
}

export const DefaultData = {
    SINREGISTRO_GLOBAL: 1,
    AsesoriaPsicologica: 1,
    ASESORIA_MEDICA: 1,
    SinRegistro: 1,
}

export const DefaultValue = {
    SINREGISTRO_GLOBAL: 1,
    SINREGISTRO_TEXTO: 'REGISTRO NO APLICA',
    GeneroWomen: 1,

    TIP_AT_TRIAGE: 4,
    TIP_AT_ENFERME: 5,
    TIP_AT_ASESORIA: 6,
    TIP_AT_EMO: 7,

    AT_ENFERMERIA: 15,
    AT_PAD: 16,
    AT_PAD_MOTIVO: 35,

    RiesgoQuimico: 1,
    RiesgoFisico: 1,
    RiesgoPsicosocial: 1,
    RiesgoBiologico: 1,
    RiesgoErgonomicoCargaFisica_Postura: 1,
    RiesgoErgonomicoCargaFisica_Fuerza: 1,
    RiesgoErgonomicoCargaFisica_Movimiento: 1,

    Opcion_SI: 1,
    Opcion_NO: 1,
}

export const TitleButton = {
    Guardar: 'Guardar',
    Programacion: 'Programación',
    Imprimir: 'Imprimir',
    Cancelar: 'Cerrar',
    Actualizar: 'Actualizar',
    Eliminar: 'Eliminar',
    Agregar: 'Nuevo',
    Seleccionadas: 'Seleccionadas',
    Regresar: 'Regresar',
    RegresarACargos: 'Regresar A Cargos',
}

export const ValidationMessage = {
    Requerido: 'Este campo es requerido'
}

export const Message = {
    Guardar: 'Registro guardado con éxito',
    Actualizar: 'Registro actualizado con éxito',
    Eliminar: 'Registro eliminado con éxito',

    NoEliminar: 'No se pudo eliminar el registro',

    ErrorDocumento: 'Por favor, ingrese un número de documento',
    ErrorDeDatos: 'Hubo un error al buscar los datos, vuelva a intentarlo',
    ErrorNoHayDatos: 'No hay datos buscados, vuelva a intentarlo',

    Seleccionar: 'Debe seleccionar ',
    CampoRequerido: 'Este campo es requerido',
    TituloEliminado: 'Eliminado!',
    InfoEliminada: 'La información se ha eliminado.'
}

export const optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};