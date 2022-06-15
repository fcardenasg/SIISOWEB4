export function PostPanorama(idCargo, riesgo, clase, exposicion, gradoconEPP,
    gradosinEPP, medidascontrol, descripcionCargo,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idCargo, riesgo, clase, exposicion, gradoconEPP, gradosinEPP, medidascontrol,
        descripcionCargo, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutPanorama(idpanorama, idCargo, riesgo, clase, exposicion, gradoconEPP,
    gradosinEPP, medidascontrol, descripcionCargo, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idpanorama, idCargo, riesgo, clase, exposicion, gradoconEPP, gradosinEPP,
        medidascontrol, descripcionCargo,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}