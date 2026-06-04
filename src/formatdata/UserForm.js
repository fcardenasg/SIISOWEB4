export function PostUser(documento, nombreUsuario, password, nombre, telefono, idArea,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi,
    puedeAdministrarPermisos, medicoRegistroAtencion, asesorARL, investigador, asesorAPTHigiene) {
    return {
        documento, nombreUsuario, password, nombre, telefono, idArea,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorARL, investigador, asesorAPTHigiene
    };
}

export function PutUser(id, documento, nombreUsuario, password, nombre, telefono, idArea,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorARL, investigador, asesorAPTHigiene) {
    return {
        id, documento, nombreUsuario, password, nombre, telefono, idArea,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorARL, investigador, asesorAPTHigiene
    }
} 