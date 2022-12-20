export function PostUser(documento, nombreUsuario, password, nombre, telefono,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado) {
    return {
        documento, nombreUsuario, password, nombre, telefono,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado
    };
}

export function PutUser(id, documento, nombreUsuario, password, nombre, telefono,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado) {
    return {
        id, documento, nombreUsuario, password, nombre, telefono,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado
    }
} 