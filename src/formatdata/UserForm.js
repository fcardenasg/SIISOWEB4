export function PostUser(documento, nombreUsuario, password, nombre, telefono, idArea,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos) {
    return {
        documento, nombreUsuario, password, nombre, telefono, idArea,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos
    };
}

export function PutUser(id, documento, nombreUsuario, password, nombre, telefono, idArea,
    correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
    firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos) {
    return {
        id, documento, nombreUsuario, password, nombre, telefono, idArea,
        correo, idRol, especialidad, registroMedico, licencia, tarjetaProfesional,
        firma, estado, idSede, respondeReintegro, respondeVentanillaUnica, registraTaxi, puedeAdministrarPermisos
    }
} 