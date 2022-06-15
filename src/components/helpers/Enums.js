export const CodCatalogo = {
    Departamento: 4,
    Sede: 6,
    Escolaridad: 2,
    Genero: 1,
    EstadoCivil: 3,
    TipoContrato: 7,
    Rol: 21,
    RosterPosition: 14,
    GeneralPosition: 15,
    DepartEmpresa: 13,
    Area: 16,
    SubArea: 17,
    Grupo: 12,
    Turno: 11,
    Estado: 18,
    Eps: 9,
    Afp: 8,
    Arl: 10,
    Ges: 20,
    Cesantias: 19,

    AtencionEMO: 8,
    GradoconEPP: 8,
    GradosinEPP: 8,

    TIPO_ATENCION: 107,

    PANO_ANALISISRUIDO: 8,
    PANO_ANALISISMPI: 8,
    PANO_EXPOSICIÓN: 130,
    PANO_MEDIDASCONTROL: 40,
    PANO_RIESGO: 128,
    PANO_GRADO_CONSINEPP: 131,

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

    Contingencia: 74,
    DiaTurno: 76,
    JornadaTurno: 139,
    MotivoPsicologia: 53,
    MotivoMedica: 52,

    TipoAsesoria: 8,
    CausaAsesoria: 8,
    EstadoAsesoria: 8,
    EstadoCaso: 48,
    TipoAtencion: 65,
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

    /* REGISTRO ATENCIÓN */
    TIP_AT_TRIAGE: 3897,
    TIP_AT_ENFERME: 3898,
    TIP_AT_ASESORIA: 3899,
    TIP_AT_EMO: 3900,
    AT_ENFERMERIA: 3907,
    AT_PAD: 3908,
    AT_PAD_MOTIVO: 3802,

    AT_PSICO: 3909,
    AT_ASESORIA_MEDICA: 3911,

    /* RIESGOS */
    RiesgoQuimico: 3949,
    RiesgoFisico: 3950,
    RiesgoPsicosocial: 3952,
    RiesgoBiologico: 3953,
    RiesgoErgonomicoCargaFisica_Postura: 3954,
    RiesgoErgonomicoCargaFisica_Fuerza: 4065,
    RiesgoErgonomicoCargaFisica_Movimiento: 4066,

    Opcion_SI: 1,
    Opcion_NO: 1,
}

export const TitleButton = {
    Guardar: 'Guardar',
    Programacion: 'Programación',
    Imprimir: 'Imprimir',
    Cancelar: 'Cerrar',
    Cerrar: 'Cancelar',
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
    RiesgoGuardado: 'Riesgos Cargados',
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