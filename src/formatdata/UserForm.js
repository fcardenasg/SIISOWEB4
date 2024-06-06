export function PostUser(documento, nombreUsuario, password, nombre, telefono, idArea,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro, respondeVentanillaUnica) {
    return {
        documento, nombreUsuario, password, nombre, telefono, idArea,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro, respondeVentanillaUnica
    };
}

export function PutUser(id, documento, nombreUsuario, password, nombre, telefono, idArea,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro, respondeVentanillaUnica) {
    return {
        id, documento, nombreUsuario, password, nombre, telefono, idArea,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro, respondeVentanillaUnica
    }
} 