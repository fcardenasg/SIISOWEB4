export function PostUser(documento, nombreUsuario, password, nombre, telefono, idArea,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorInvestigacion) {
    return {
        documento, nombreUsuario, password, nombre, telefono, idArea,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorInvestigacion
    };
}

export function PutUser(id, documento, nombreUsuario, password, nombre, telefono, idArea,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorInvestigacion) {
    return {
        id, documento, nombreUsuario, password, nombre, telefono, idArea,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos, medicoRegistroAtencion, asesorInvestigacion
    }
} 