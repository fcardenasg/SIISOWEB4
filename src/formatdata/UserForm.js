export function PostUser(documento, nombre, telefono, correo,
    idRol, especialidad, registroMedico, licencia, tarjetaProfesional, firma) {
    return {
        documento, nombre, telefono, correo,
        idRol, especialidad, registroMedico, licencia, tarjetaProfesional, firma
    };
}

export function PutUser(id, documento, nombre, telefono, correo,
    idRol, especialidad, registroMedico, licencia, tarjetaProfesional, firma) {
    return {
        id, documento, nombre, telefono, correo,
        idRol, especialidad, registroMedico, licencia, tarjetaProfesional, firma
    }
} 