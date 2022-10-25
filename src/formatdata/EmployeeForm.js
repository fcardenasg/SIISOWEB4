import { DefaultValue } from "components/helpers/Enums";

export function PostEmployee(documento, nombres, fechaNaci, type = DefaultValue.SINREGISTRO_GLOBAL,
    departamento = DefaultValue.SINREGISTRO_GLOBAL, area = DefaultValue.SINREGISTRO_GLOBAL, subArea = DefaultValue.SINREGISTRO_GLOBAL,
    grupo = DefaultValue.SINREGISTRO_GLOBAL, municipioNacido = DefaultValue.SINREGISTRO_GLOBAL, dptoNacido = DefaultValue.SINREGISTRO_GLOBAL,
    fechaContrato, rosterPosition = DefaultValue.SINREGISTRO_GLOBAL, tipoContrato = DefaultValue.SINREGISTRO_GLOBAL,
    generalPosition = DefaultValue.SINREGISTRO_GLOBAL, genero = DefaultValue.SINREGISTRO_GLOBAL, sede = DefaultValue.SINREGISTRO_GLOBAL,
    direccionResidencia, direccionResidenciaTrabaja, municipioResidencia = DefaultValue.SINREGISTRO_GLOBAL,
    dptoResidenciaTrabaja = DefaultValue.SINREGISTRO_GLOBAL, municipioResidenciaTrabaja = DefaultValue.SINREGISTRO_GLOBAL,
    dptoResidencia = DefaultValue.SINREGISTRO_GLOBAL, celular, eps = DefaultValue.SINREGISTRO_GLOBAL, afp = DefaultValue.SINREGISTRO_GLOBAL,
    turno = DefaultValue.SINREGISTRO_GLOBAL, email, telefonoContacto, estadoCivil, empresa, arl = DefaultValue.SINREGISTRO_GLOBAL,
    contacto, escolaridad = DefaultValue.SINREGISTRO_GLOBAL, cesantias = DefaultValue.SINREGISTRO_GLOBAL, rotation,
    payStatus = DefaultValue.SINREGISTRO_GLOBAL, termDate, bandera = DefaultValue.SINREGISTRO_GLOBAL, ges = DefaultValue.SINREGISTRO_GLOBAL,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, imagenUrl = '', oficio = DefaultValue.SINREGISTRO_GLOBAL) {
    return {
        documento, nombres, fechaNaci, type, departamento, area, subArea, grupo, municipioNacido, dptoNacido, fechaContrato,
        rosterPosition, tipoContrato, generalPosition, genero, sede, direccionResidencia, direccionResidenciaTrabaja,
        municipioResidencia, dptoResidenciaTrabaja, municipioResidenciaTrabaja, dptoResidencia, celular, eps, afp, turno, email,
        telefonoContacto, estadoCivil, empresa, arl, contacto, escolaridad, cesantias, rotation, payStatus, termDate, bandera, ges,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, imagenUrl,oficio
    };
}

export function PutEmployee(documento, nombres, fechaNaci, type = DefaultValue.SINREGISTRO_GLOBAL,
    departamento = DefaultValue.SINREGISTRO_GLOBAL, area = DefaultValue.SINREGISTRO_GLOBAL, subArea = DefaultValue.SINREGISTRO_GLOBAL,
    grupo = DefaultValue.SINREGISTRO_GLOBAL, municipioNacido = DefaultValue.SINREGISTRO_GLOBAL, dptoNacido = DefaultValue.SINREGISTRO_GLOBAL,
    fechaContrato, rosterPosition = DefaultValue.SINREGISTRO_GLOBAL, tipoContrato = DefaultValue.SINREGISTRO_GLOBAL,
    generalPosition = DefaultValue.SINREGISTRO_GLOBAL, genero = DefaultValue.SINREGISTRO_GLOBAL, sede = DefaultValue.SINREGISTRO_GLOBAL,
    direccionResidencia, direccionResidenciaTrabaja, municipioResidencia = DefaultValue.SINREGISTRO_GLOBAL,
    dptoResidenciaTrabaja = DefaultValue.SINREGISTRO_GLOBAL, municipioResidenciaTrabaja = DefaultValue.SINREGISTRO_GLOBAL,
    dptoResidencia = DefaultValue.SINREGISTRO_GLOBAL, celular, eps = DefaultValue.SINREGISTRO_GLOBAL, afp = DefaultValue.SINREGISTRO_GLOBAL,
    turno = DefaultValue.SINREGISTRO_GLOBAL, email, telefonoContacto, estadoCivil, empresa, arl = DefaultValue.SINREGISTRO_GLOBAL,
    contacto, escolaridad = DefaultValue.SINREGISTRO_GLOBAL, cesantias = DefaultValue.SINREGISTRO_GLOBAL, rotation,
    payStatus = DefaultValue.SINREGISTRO_GLOBAL, termDate, bandera = DefaultValue.SINREGISTRO_GLOBAL, ges = DefaultValue.SINREGISTRO_GLOBAL,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, imagenUrl = '',oficio= DefaultValue.SINREGISTRO_GLOBAL) {
    return {
        documento, nombres, fechaNaci, type, departamento, area, subArea, grupo, municipioNacido, dptoNacido, fechaContrato,
        rosterPosition, tipoContrato, generalPosition, genero, sede, direccionResidencia, direccionResidenciaTrabaja,
        municipioResidencia, dptoResidenciaTrabaja, municipioResidenciaTrabaja, dptoResidencia, celular, eps, afp, turno, email,
        telefonoContacto, estadoCivil, empresa, arl, contacto, escolaridad, cesantias, rotation, payStatus, termDate, bandera, ges,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, imagenUrl,oficio
    };
}