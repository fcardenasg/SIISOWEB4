import { DefaultValue } from "./Enums";

const FormatDate = (date = new Date()) => {
    try {
        const fechaFormat = new Date(date).toISOString().split('T')[0];
        return fechaFormat;
    } catch (error) {
    }
}

const ViewFormat = (fecha = new Date()) => {
    try {
        /* const event = new Date(fecha);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return event.toLocaleDateString(undefined, options); */

        let day = `${(new Date(fecha).getDate())}`.padStart(2, '0');
        let month = `${(new Date(fecha).getMonth() + 1)}`.padStart(2, '0');
        let year = new Date(fecha).getFullYear();

        return `${day}-${month}-${year}`;

        /* const fechaFormat = new Date(fecha).toLocaleDateString('en-US') */

        /* const fechaFormat = new Date(fecha).toISOString().split('T')[0];
        return fechaFormat; */
    } catch (error) { }
}

function GetEdad(dateString) {
    try {
        let hoy = new Date()
        let fechaNacimiento = new Date(dateString)
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        if (
            diferenciaMeses < 0 ||
            (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
            edad--
        }
        return edad;
    } catch (error) { }
}

function EdadFramigan(edad = 0, genero = '') {
    try {
        if (edad > 0 && edad <= 34) {
            if (genero === "MASCULINO")
                return -1;
            else
                return -9;
        }

        if (edad >= 35 && edad <= 39) {
            if (genero === "MASCULINO")
                return 0;
            else
                return -4;
        }

        if (edad >= 40 && edad <= 44) {
            if (genero === "MASCULINO")
                return 1;
            else
                return 0;
        }

        if (edad >= 45 && edad <= 49) {
            if (genero === "MASCULINO")
                return 2;
            else
                return 3;
        }

        if (edad >= 50 && edad <= 54) {
            if (genero === "MASCULINO")
                return 3;
            else
                return 6;
        }

        if (edad >= 55 && edad <= 59) {
            if (genero === "MASCULINO")
                return 4;
            else
                return 7;
        }

        if (edad >= 60 && edad <= 64) {
            if (genero === "MASCULINO")
                return 5;
            else
                return 8;
        }

        if (edad >= 65 && edad <= 69) {
            if (genero === "MASCULINO")
                return 6;
            else
                return 8;
        }

        if (edad >= 70 && edad <= 74) {
            if (genero === "MASCULINO")
                return 7;
            else
                return 8;
        }
    } catch (error) { }
}

function FrColesterol(colesterol = 0, genero = '') {
    if (genero === "MASCULINO") {
        if (colesterol < 160) {
            return -3;
        }
        else if (colesterol >= 160 && colesterol < 200) {
            return 0;
        }
        else if (colesterol >= 200 && colesterol < 240) {
            return 1;
        }
        else if (colesterol >= 240 && colesterol < 280) {
            return 2;
        }
        else if (colesterol >= 280) {
            return 3;
        }
    }
    else {
        if (colesterol < 160) {
            return -2;
        }
        else if (colesterol >= 160 && colesterol < 200) {
            return 0;
        }
        else if (colesterol >= 200 && colesterol < 280) {
            return 1;
        }
        else if (colesterol >= 280) {
            return 3;
        }
    }
}

function FrHdl(edad = 0, genero = '') {
    try {
        if (genero === "MASCULINO") {
            if (edad < 35)
                return 2;
            else if (edad >= 35 && edad < 45)
                return 1;
            else if (edad >= 45 && edad < 50)
                return 0;
            else if (edad >= 50 && edad < 60)
                return 0;
            else if (edad >= 60)
                return -2;
        }
        else {
            if (edad < 35)
                return 5;
            else if (edad >= 35 && edad < 45)
                return 2;
            else if (edad >= 45 && edad < 50)
                return 1;
            else if (edad >= 50 && edad < 60)
                return 0;
            else if (edad >= 60)
                return -3;
        }
    } catch (error) { }
}

function FrGlicemia(glicemia = 0, genero = '') {
    try {
        if (genero === "MASCULINO") {
            if (glicemia < 110)
                return 0;
            else if (glicemia >= 110)
                return 2;
        }
        else {
            if (glicemia < 110)
                return 0;
            else if (glicemia >= 110)
                return 4;
        }
    } catch (error) { }
}

function FrTension(tension = '', genero = '') {
    try {
        var tensi = tension.split('/');
        var r = 0;

        if (parseInt(tensi[0]) < 120 || parseInt(tensi[1]) < 80) {
            if (genero === "MASCULINO")
                r = 0;
            else
                r = -3;
        }

        if ((parseInt(tensi[0]) >= 120 && parseInt(tensi[0]) <= 129) || (parseInt(tensi[1]) >= 80 && parseInt(tensi[0]) <= 84))
            r = 0;

        if ((parseInt(tensi[0]) >= 130 && parseInt(tensi[0]) <= 139) || (parseInt(tensi[1]) >= 85 && parseInt(tensi[0]) <= 89)) {
            if (genero === "MASCULINO")
                r = 1;
            else
                r = 0;
        }

        if ((parseInt(tensi[0]) >= 140 && parseInt(tensi[0]) <= 159) || (parseInt(tensi[1]) >= 90 && parseInt(tensi[0]) <= 99))
            r = 2;

        if ((parseInt(tensi[0]) >= 160) || (parseInt(tensi[1]) >= 100))
            r = 3;

        return r;
    } catch (error) { }
}

function GetRiesgos(puntaje = 0, edad = 0, sexo = '') {
    var riesgoAbsolutoM = 0;
    var riesgoAbsolutoH = 0;
    var riesgoRelativo = '';
    var dxRiesgo = '';

    if (puntaje <= -2) {
        riesgoAbsolutoM = 1;
        riesgoAbsolutoH = 2;
    }
    else if (puntaje === -1) {
        riesgoAbsolutoM = 2;
        riesgoAbsolutoH = 2;
    }
    else if (puntaje <= 1) {
        riesgoAbsolutoM = 2;
        riesgoAbsolutoH = 3;
    }
    else if (puntaje === 2) {
        riesgoAbsolutoM = 3;
        riesgoAbsolutoH = 4;
    }
    else if (puntaje === 3) {
        riesgoAbsolutoM = 3;
        riesgoAbsolutoH = 5;
    }
    else if (puntaje === 4) {
        riesgoAbsolutoM = 4;
        riesgoAbsolutoH = 7;
    }
    else if (puntaje === 5) {
        riesgoAbsolutoM = 4;
        riesgoAbsolutoH = 8;
    }
    else if (puntaje === 6) {
        riesgoAbsolutoM = 5;
        riesgoAbsolutoH = 10;
    }
    else if (puntaje === 7) {
        riesgoAbsolutoM = 6;
        riesgoAbsolutoH = 13;
    }
    else if (puntaje === 8) {
        riesgoAbsolutoM = 7;
        riesgoAbsolutoH = 16;
    }
    else if (puntaje === 9) {
        riesgoAbsolutoM = 8;
        riesgoAbsolutoH = 20;
    }
    else if (puntaje === 10) {
        riesgoAbsolutoM = 10;
        riesgoAbsolutoH = 25;
    }
    else if (puntaje === 11) {
        riesgoAbsolutoM = 11;
        riesgoAbsolutoH = 31;
    }
    else if (puntaje === 12) {
        riesgoAbsolutoM = 13;
        riesgoAbsolutoH = 37;
    }
    else if (puntaje === 13) {
        riesgoAbsolutoM = 15;
        riesgoAbsolutoH = 45;
    }
    else if (puntaje === 14) {
        riesgoAbsolutoM = 18;
        riesgoAbsolutoH = 53;
    }
    else if (puntaje === 15) {
        riesgoAbsolutoM = 20;
        riesgoAbsolutoH = 53;
    }
    else if (puntaje === 16) {
        riesgoAbsolutoM = 24;
        riesgoAbsolutoH = 53;
    }
    else if (puntaje >= 17) {
        riesgoAbsolutoM = 27;
        riesgoAbsolutoH = 53;
    }

    switch (puntaje) {
        case 0:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else {
                    riesgoRelativo = "0";
                    dxRiesgo = "";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else {
                    riesgoRelativo = "0";
                    dxRiesgo = "";
                }
            }
            break;
        case 1:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "1.5";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else {
                    riesgoRelativo = "0";
                    dxRiesgo = "";
                }
            }
            break;
        case 2:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "2.0";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 45) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "1.5";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            break;
        case 3:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "2.5";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "1.7";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "1.7";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 50) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "1.5";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            break;
        case 4:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "3.5";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "2.3";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "2.3";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "1.4";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "2.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            break;
        case 5:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "4.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "2.6";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "2.6";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "2.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "1.6";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "1.1";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "2.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            break;
        case 6:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "5.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "3.3";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "3.3";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "2.5";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "2.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "1.4";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "2.5";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "1.7";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            break;
        case 7:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "6.5";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "4.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "4.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "3.3";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "2.6";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "1.9";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "1.6";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "3.0";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "2.0";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "1.2";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            break;
        case 8:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "8.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "5.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "5.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "4.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "3.2";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "2.3";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "2.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "1.6";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "1.2";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "3.5";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "2.3";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "1.4";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            break;
        case 9:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "10.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "6.7";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "6.7";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "5.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "4.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "2.9";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "2.5";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "2.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "1.5";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "4.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "2.7";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "1.6";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "1.1";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "1.0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }

            break;
        case 10:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "12.5";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "8.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "8.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "6.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "5.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "3.6";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "3.1";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "2.5";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "1.9";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "5.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "3.3";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "2.0";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "1.4";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "1.3";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }

            break;
        case 11:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "15.5";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "10.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "10.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "7.8";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "6.1";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "4.4";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "3.9";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "3.1";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "2.3";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "5.5";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "3.7";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "2.2";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "1.6";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "1.4";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "1.4";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "1.4";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            break;
        case 12:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "18.5";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "12.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "12.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "9.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "7.4";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "5.2";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "4.6";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "3.7";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "2.8";
                    dxRiesgo = "RIESGO MODERADO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "6.5";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "4.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "2.6";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "1.9";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "1.6";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "1.6";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "1.6";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            break;
        case 13:
            if (sexo === "MASCULINO") {
                if (edad < 30) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 30 && edad <= 34) {
                    riesgoRelativo = "22.5";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 35 && edad <= 39) {
                    riesgoRelativo = "15.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "15.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "11.3";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "9.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "6.4";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "5.6";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "4.5";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "3.5";
                    dxRiesgo = "RIESGO ALTO";
                }
            }
            else {
                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "7.5";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "5.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "3.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "2.1";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "1.9";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "1.9";
                    dxRiesgo = "RIESGO PROMEDIO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "1.9";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
            }
            break;
        case 14:
            if (sexo != "MASCULINO") {

                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "9.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "6.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "3.6";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "2.6";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "2.3";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "2.3";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "2.3";
                    dxRiesgo = "RIESGO MODERADO";
                }
            }
            break;
        case 15:
            if (sexo != "MASCULINO") {

                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "10.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "6.7";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "4.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "2.9";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "2.5";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "2.5";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "2.5";
                    dxRiesgo = "RIESGO MODERADO";
                }
            }
            break;
        case 16:
            if (sexo != "MASCULINO") {

                if (edad < 40) {
                    riesgoRelativo = "0";
                    dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
                }
                else if (edad >= 40 && edad <= 44) {
                    riesgoRelativo = "12.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 45 && edad <= 49) {
                    riesgoRelativo = "8.0";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 50 && edad <= 54) {
                    riesgoRelativo = "4.8";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 55 && edad <= 59) {
                    riesgoRelativo = "3.4";
                    dxRiesgo = "RIESGO ALTO";
                }
                else if (edad >= 60 && edad <= 64) {
                    riesgoRelativo = "3.0";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 65 && edad <= 69) {
                    riesgoRelativo = "3.0";
                    dxRiesgo = "RIESGO MODERADO";
                }
                else if (edad >= 70 && edad <= 74) {
                    riesgoRelativo = "3.0";
                    dxRiesgo = "RIESGO MODERADO";
                }
            }
            break;
    }

    if (puntaje < 0) {
        if (sexo === "MASCULINO") {
            if (edad < 30) {
                riesgoRelativo = "0";
                dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
            }
            else if (edad >= 30 && edad <= 34) {
                riesgoRelativo = "1.0";
                dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
            }
            else {
                riesgoRelativo = "0";
                dxRiesgo = "";
            }
        }
        else {
            if (edad < 40) {
                riesgoRelativo = "0";
                dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
            }
            else if (edad >= 40 && edad <= 44) {
                riesgoRelativo = "1.0";
                dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
            }
            else {
                riesgoRelativo = "0";
                dxRiesgo = "";
            }
        }
    }

    if (puntaje >= 14) {
        if (sexo === "MASCULINO") {
            if (edad < 30) {
                riesgoRelativo = "0";
                dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
            }
            else if (edad >= 30 && edad <= 34) {
                riesgoRelativo = "26.5";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 35 && edad <= 39) {
                riesgoRelativo = "17.7";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 40 && edad <= 44) {
                riesgoRelativo = "17.7";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 45 && edad <= 49) {
                riesgoRelativo = "13.3";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 50 && edad <= 54) {
                riesgoRelativo = "10.6";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 55 && edad <= 59) {
                riesgoRelativo = "7.6";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 60 && edad <= 64) {
                riesgoRelativo = "6.6";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 65 && edad <= 69) {
                riesgoRelativo = "5.3";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 70 && edad <= 74) {
                riesgoRelativo = "4.1";
                dxRiesgo = "RIESGO ALTO";
            }
        }
    }

    if (puntaje >= 17) {
        if (sexo != "MASCULINO") {

            if (edad < 40) {
                riesgoRelativo = "0";
                dxRiesgo = "POR DEBAJO DEL RIESGO PROMEDIO";
            }
            else if (edad >= 40 && edad <= 44) {
                riesgoRelativo = "13.5";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 45 && edad <= 49) {
                riesgoRelativo = "9.0";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 50 && edad <= 54) {
                riesgoRelativo = "5.4";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 55 && edad <= 59) {
                riesgoRelativo = "3.9";
                dxRiesgo = "RIESGO ALTO";
            }
            else if (edad >= 60) {
                riesgoRelativo = "5.4";
                dxRiesgo = "RIESGO ALTO";
            }
        }
    }

    return {
        riesgoAbsolutoM,
        riesgoAbsolutoH,
        riesgoRelativo,
        dxRiesgo
    };
}

function PuntajeFr(frEdad = 0, frColesterol = 0, frHdl = 0, frGlicemia = 0, frTensionArterial = 0, frTabaquismo = 0) {
    try {
        var puntaje = (parseInt(frEdad) + parseInt(frColesterol) + parseInt(frHdl) +
            parseInt(frGlicemia) + parseInt(frTensionArterial) + parseInt(frTabaquismo));
        return puntaje;
    } catch (error) {
    }
}

function FrFuma(fuma = '') {
    try {
        if (fuma === DefaultValue.Opcion_NO) {
            return 0;
        }
        else if (fuma === DefaultValue.Opcion_SI) {
            return 2;
        }
    } catch (error) { }
}

function FrLdl_FrRelacion(hdl = 0, colesterol = 0, triglicerios = 0) {
    if (hdl != 0 && colesterol != 0 && triglicerios != 0) {

        var ldl = Math.ceil(parseInt(colesterol) - ((parseInt(triglicerios) / 5) + parseInt(hdl)));
        var relacion = (colesterol / hdl).toFixed(1);

        return { ldl, relacion }
    }
}

function NumeroDias(fechaInicio, fechaFin) {
    try {
        let fechaIni = new Date(fechaInicio);
        let fechaFinn = new Date(fechaFin);

        let milisegundosDia = 24 * 60 * 60 * 1000;
        let milisegundosTranscurridos = Math.abs(fechaIni.getTime() - fechaFinn.getTime());
        let diasTranscurridos = Math.round(milisegundosTranscurridos / milisegundosDia);
        return diasTranscurridos;
    } catch (error) { }
}

export {
    FormatDate,
    ViewFormat,
    GetEdad,
    EdadFramigan,
    FrColesterol,
    FrHdl,
    FrGlicemia,
    FrTension,
    GetRiesgos,
    PuntajeFr,
    FrFuma,
    FrLdl_FrRelacion,
    NumeroDias
}