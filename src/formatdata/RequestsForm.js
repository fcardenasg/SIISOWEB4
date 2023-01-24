import { DefaultValue } from "components/helpers/Enums";

export function PostRequests(fechaRecibo,recibio,documentoPeticion,nombre,area,
    idCargoOficio,idTipoSolicitud,idResponsableRespuesta,fechaLimiteRespuesta,
    fechaRespuesta,personaResponde,grupo,documentoResponde,entidadSolicitante,
    medioUtilizado,numeroGuia,observaciones,direccion,correo,telefono,
    fechaEntrega,fechaReciboDLTD,usuarioReciboDLTD,estado,usuarioRegistro,fechaRegistro,
    usuarioModifico,fechaModifico) {
    return {
        fechaRecibo,recibio,documentoPeticion,nombre,area,
        idCargoOficio,idTipoSolicitud,idResponsableRespuesta,fechaLimiteRespuesta,
        fechaRespuesta,personaResponde,grupo,documentoResponde,entidadSolicitante,
        medioUtilizado,numeroGuia,observaciones,direccion,correo,telefono,
        fechaEntrega,fechaReciboDLTD,usuarioReciboDLTD,estado,usuarioRegistro,fechaRegistro,
        usuarioModifico,fechaModifico
    };
}

export function PutRequests(idSolicitudes,fechaRecibo,recibio,documentoPeticion,nombre,area,
    idCargoOficio,idTipoSolicitud,idResponsableRespuesta,fechaLimiteRespuesta,
    fechaRespuesta,personaResponde,grupo,documentoResponde,entidadSolicitante,
    medioUtilizado,numeroGuia,observaciones,direccion,correo,telefono,
    fechaEntrega,fechaReciboDLTD,usuarioReciboDLTD,estado,usuarioRegistro,fechaRegistro,
    usuarioModifico,fechaModifico) {
    return {
        idSolicitudes,fechaRecibo,recibio,documentoPeticion,nombre,area,
        idCargoOficio,idTipoSolicitud,idResponsableRespuesta,fechaLimiteRespuesta,
        fechaRespuesta,personaResponde,grupo,documentoResponde,entidadSolicitante,
        medioUtilizado,numeroGuia,observaciones,direccion,correo,telefono,
        fechaEntrega,fechaReciboDLTD,usuarioReciboDLTD,estado,usuarioRegistro,fechaRegistro,
        usuarioModifico,fechaModifico
    };
}


// idSolicitudes,fechaRecibo,recibio,documentoPeticion,nombre,area
// idCargoOficio,idTipoSolicitud,idResponsableRespuesta,fechaLimiteRespuesta,
// fechaRespuesta,personaResponde,grupo,documentoResponde,entidadSolicitante,
// medioUtilizado,numeroGuia,observaciones,direccion,correo,telefono,
// fechaEntrega,fechaReciboDLTD,usuarioReciboDLTD,estado,usuarioRegistro,fechaRegistro,
// usuarioModifico,fechaModifico,nameArea,nameCargoOficio,nameTipoSolicitud,
// nameResponsableRespuesta,nameGrupo,nameEntidadSolicitante,nameMedioUtilizadoa,nameEmpleado




