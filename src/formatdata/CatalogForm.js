export function PostCatalog(nombre, codigo, idTipoCatalogo) {
    return { nombre, codigo, idTipoCatalogo };
}

export function PutCatalog(idCatalogo, nombre, codigo, idTipoCatalogo) {
    return { idCatalogo, nombre, codigo, idTipoCatalogo };
}