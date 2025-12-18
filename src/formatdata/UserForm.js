export function PostUser(documento, nombreUsuario, password, nombre, telefono, idArea,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorARL, investigador) {
    return {
        documento, nombreUsuario, password, nombre, telefono, idArea,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorARL, investigador
    };
}

export function PutUser(id, documento, nombreUsuario, password, nombre, telefono, idArea,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorARL, investigador) {
    return {
        id, documento, nombreUsuario, password, nombre, telefono, idArea,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorARL, investigador
    }
} 