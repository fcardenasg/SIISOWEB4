export function PostUser(documento, nombreUsuario, password, nombre, telefono,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro) {
    return {
        documento, nombreUsuario, password, nombre, telefono,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro
    };
}

export function PutUser(id, documento, nombreUsuario, password, nombre, telefono,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro) {
    return {
        id, documento, nombreUsuario, password, nombre, telefono,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro
    }
} 