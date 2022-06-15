export function PostCargo(sede, rosterPosition, area, subArea, descripcionCargo, idGES,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        sede, rosterPosition, area, subArea, descripcionCargo, idGES,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutCargo(idCargo, sede, rosterPosition, area, subArea, descripcionCargo, idGES,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idCargo, sede, rosterPosition, area, subArea, descripcionCargo, idGES,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}