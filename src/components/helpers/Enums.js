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

    AtencionEMO: 138,
    TIPO_EXAMEN_PARACLINICOS: 68,
    ESTUDIO_EXAMEN_PARACLINICOS: 22,
    LABORATORIO_ORDENES_PARACLINICOS: 30,
    TIPORNM_ORDENES_PARACLINICOS: 114,
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
    HCO_FRECUENCIAS: 32,
    HCO_REFUERZO: 150,
    HC_DEPORTE: 143,
    HC_TIFOBIA: 39,
    HCO_PARENTES: 123,
    HCO_GINECOMETO: 8,
    HCO_GINECOCICLO: 8,
    HCO_GINECORESULT: 8,
    HCO_BIOTIPO: 37,
    HCO_RESULTADO: 140,
    HCO_CONCEP_APTI_PSICO_INGRESO: 151,
    HCO_CONCEP_APTI_PSICO_CONTROL: 152,
    HCO_CONCEP_APTI_PSICO_PROMO: 153,
    HCO_CONCEPTO_APTI_MEDICA: 42,
    OPT_SINO: 8,
    HCO_NEADONDE: 145,
    HCO_RIESGO_CLASIFICACION: 127,
    HCO_SINTOMAS_RESPIRATORIO: 146,

    HCO_DX_TENSION_ARTERIAL: 110,
    HCO_ANTECEDENTE_CARDIOVASCULAR: 111,
    HCO_FRAM_BEBIDAS: 31,
    HCO_DX_METABOLICO: 142,

    RECE_TIPORDEN: 8,
    RECE_CONTINGENCIA: 8,

    PAD_MOTIVO: 50,
    PAD_MOTIVO_NO_ASIS: 54,

    PAD_MUESTRA_AD: 115,
    PAD_MUESTRA_AL: 117,
    PAD_RESULTADO: 116,
    PAD_CONCEPTOA: 147,

    ASME_TIPOASESORIA: 119,
    ASME_MOT_ASESORIA: 8,

    TIPO_PROVEEDOR: 22,
    CIUDADES: 5,

    AHC_ATENCION_NOTA_ENFERMERIA: 136,
    Contingencia: 74,
    DiaTurno: 76,
    JornadaTurno: 139,
    MotivoPsicologia: 53,
    MotivoMedica: 52,

    TipoAsesoria: 119,
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

    AHC_ATENCION: 135,
    Opciones_SINO: 88,
    AHC_CONCEP_ACTITUD: 43,
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
    GeneroWomen: 2,

    /* TIPO DE ORDEN */
    TIPO_ORDEN_FORMULA: 4023,
    TIPO_ORDEN_EXAMEN: 4026,
    TIPO_ORDEN_IMAGEN: 4025,
    TIPO_ORDEN_LABORATORIO: 4024,


    /* TIPO ATENCIÓN */
    TIPO_ATENCION_EMO: 3900,
    TIPO_ATENCION_ASESORIAS: 3899,
    TIPO_ATENCION_ASESORIAS_PSICO: 3909,
    TIPO_ATENCION_ASESORIAS_MEDICA: 3911,
    TIPO_ATENCION_ENFERMERIA: 3898,
    TIPO_ATENCION_ATENCIONMEDICA: 3897,
    TIPO_ATENCION_ATENCIONMEDICA_NUEVO: 3931,
    TIPO_ATENCION_ATENCIONMEDICA_CONTROL: 3932,

    /* ATENCIÓN EMO */
    EMO_ATENCION_INGRESO: 3918,
    EMO_ATENCION_CONTRO: 3921,
    EMO_ATENCION_PROMO: 3922,


    ORDENES_LABORATORIO: 3533,
    ORDENES_FECHA_EXAM_FISICO: 3541,
    ORDENES_RNM: 3537,

    CONCEPTO_PAD_APTO: 4103,
    CONCEPTO_PAD_NOAPTO: 4104,
    RESULTADO_PAD_POSITIVO: 4097,

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
    RiesgoEnOtrasEmpresas: 4067,
    RiesgoQuimico: 3949,
    RiesgoQuimico_MPI_DLTD: 3955,
    RiesgoQuimico_RUIDO_DLTD: 3960,
    RiesgoFisico: 3950,
    RiesgoPsicosocial: 3952,
    RiesgoBiologico: 3953,
    RiesgoErgonomicoCargaFisica_Postura: 3954,
    RiesgoErgonomicoCargaFisica_Fuerza: 4065,
    RiesgoErgonomicoCargaFisica_Movimiento: 4066,

    Opcion_SI: 4005,
    Opcion_NO: 4006,
}

export const TitleButton = {
    Guardar: 'Guardar',
    CerrarCaso: 'Cerrar Caso',
    OrdenesMedicas: 'Ordenes Medicas',
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

    TituloEliminar: '¿Estas seguro?',
    TextoEliminar: 'Este registro se eliminara, ¿esta seguro de eliminarlo?',

    TituloCargar: '¿Desea cargar la exposición ocupacional?',
    TextoCargar: 'Se cargaran los riesgos, esto puede demorar un poco',

    NoEliminar: 'No se pudo eliminar el registro',

    ErrorDocumento: 'Por favor, ingrese un número de documento',
    ErrorDeDatos: 'Hubo un error al buscar los datos, vuelva a intentarlo',
    ErrorNoHayDatos: 'No hay datos buscados, vuelva a intentarlo',

    CampoRequerido: 'Este campo es requerido',
}

export const optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};