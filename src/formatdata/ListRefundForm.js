export function PostListRefund(idReintegro, documento, idListaChekeo, url, estado,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idReintegro, documento, idListaChekeo, url, estado,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutListRefund(id, idReintegro, documento, idListaChekeo, url, estado,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, idReintegro, documento, idListaChekeo, url, estado,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}