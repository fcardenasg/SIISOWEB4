export function PostPersonalNotes(descripcion, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModificacion) {
    return { descripcion, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModificacion };
}

export function PutPersonalNotes(id, descripcion, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModificacion) {
    return { id, descripcion, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModificacion };
}