export function PostUser(documento, nombreUsuario, password, nombre, telefono,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado,idSede) {
    return {
        documento, nombreUsuario, password, nombre, telefono,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede
    };
}

export function PutUser(id, documento, nombreUsuario, password, nombre, telefono,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado,idSede) {
    return {
        id, documento, nombreUsuario, password, nombre, telefono,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado,idSede
    }
} 