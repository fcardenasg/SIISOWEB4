export const posturasErgonomicasOWAS = [
    // CATEGORÍA: ESPALDA
    {
        categoria: "Espalda",
        codigo: 1,
        nombre: "Espalda derecha",
        descripcion: "El eje del tronco del trabajador está alineado con el eje caderas-piernas.",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/espalda_derecha.png"
    },
    {
        categoria: "Espalda",
        codigo: 2,
        nombre: "Espalda doblada",
        descripcion: "Puede considerarse que ocurre para inclinaciones mayores de 20º (Mattila et al., 1999)",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/espalda_doblada.png"
    },
    {
        categoria: "Espalda",
        codigo: 3,
        nombre: "Espalda con giro",
        descripcion: "Existe torsión del tronco o inclinación lateral superior a 20º.",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/espalda_con_giro.png"
    },
    {
        categoria: "Espalda",
        codigo: 4,
        nombre: "Espalda doblada con giro",
        descripcion: "Existe flexión del tronco y giro (o inclinación) de forma simultánea.",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/espalda_doblada_con_giro.png"
    },

    // CATEGORÍA: BRAZOS
    {
        categoria: "Brazos",
        codigo: 1,
        nombre: "Los dos brazos bajos",
        descripcion: "Ambos brazos del trabajador están situados bajo el nivel de los hombros.",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/los_dos_brazos_bajos.png"
    },
    {
        categoria: "Brazos",
        codigo: 2,
        nombre: "Un brazo bajo y el otro elevado",
        descripcion: "Un brazo del trabajador está situado bajo el nivel de los hombros y el otro, o parte del otro, está situado por encima del nivel de los hombros",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/un_brazo_bajo_y_el_otro_elevado.png"
    },
    {
        categoria: "Brazos",
        codigo: 3,
        nombre: "Los dos brazos elevados",
        descripcion: "Ambos brazos (o parte de los brazos) del trabajador están situados por encima del nivel de los hombros",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/los_dos_brazos_elevados.png"
    },

    // CATEGORÍA: PIERNAS
    {
        categoria: "Piernas",
        codigo: 1,
        nombre: "Sentado",
        descripcion: "El trabajador permanece sentado.",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/sentado.png"
    },
    {
        categoria: "Piernas",
        codigo: 2,
        nombre: "De pie con las dos piernas rectas",
        descripcion: "Las dos piernas rectas y con el peso equilibrado entre ambas.",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/de_pie_con_las_dos_piernas_rectas.png"
    },
    {
        categoria: "Piernas",
        codigo: 3,
        nombre: "De pie con una pierna recta y la otra flexionada",
        descripcion: "De pie con una pierna recta y la otra flexionada con el peso desequilibrado entre ambas",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/de_pie_con_una_pierna_recta_y_la_otra_flexionada.png"
    },
    {
        categoria: "Piernas",
        codigo: 4,
        nombre: "De pie o en cuclillas con las dos piernas flexionadas y el peso equilibrado entre ambas",
        descripcion: "Puede considerarse que ocurre para ángulos muslo-pantorrilla inferiores o iguales a 150º (Mattila et al., 1999). Ángulos mayores serán considerados piernas rectas.",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/de_pie_o_en_cuclillas2.png"
    },
    {
        categoria: "Piernas",
        codigo: 5,
        nombre: "De pie o en cuclillas con las dos piernas flexionadas y el peso desequilibrado",
        descripcion: "Puede considerarse que ocurre para ángulos muslo-pantorrilla inferiores o iguales a 150º (Mattila et al., 1999). Ángulos mayores serán considerados piernas rectas.",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/de_pie_o_en_cuclillas1.png"
    },
    {
        categoria: "Piernas",
        codigo: 6,
        nombre: "Arrodillado",
        descripcion: "El trabajador apoya una o las dos rodillas en el suelo.",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/arrodillado.png"
    },
    {
        categoria: "Piernas",
        codigo: 7,
        nombre: "Andando",
        descripcion: "El trabajador camina.",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/andando.png"
    },
    // CATEGORÍA: FUERZA / CARGA
    {
        categoria: "Fuerza",
        codigo: 1,
        nombre: "Menos de 10 kg",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/menos10kg.png"
    },
    {
        categoria: "Fuerza",
        codigo: 2,
        nombre: "Entre 10 y 20 kg",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/entre10_20kg.png"
    },
    {
        categoria: "Fuerza",
        codigo: 3,
        nombre: "Más de 20 kg",
        imagen: "https://siiso.drummondltd.com:44347/SIISOFiles/imgaptpostura/mas20kg.png"
    }
];

export const valoracionMovimiento = [
    {
        segmento: "Hombro",
        postura: [
            { value: 0, label: "0° - 45°" },
            { value: 1, label: "45° a 90°" },
            { value: 2, label: "> 90°" },
            { value: 1, label: "Extensión" }
        ],
        velocidad: [
            { value: 1, label: "Estática" },
            { value: 0, label: "Despacio" },
            { value: 1, label: "Moderado" },
            { value: 2, label: "Rápido" }
        ],
        frecuencia: [
            { value: 0, label: "< 90" },
            { value: 1, label: "90 - 150" },
            { value: 2, label: "> 150" }
        ],
        duracion: [
            { value: 0, label: "< 1 h" },
            { value: 1, label: "1 - 4 h" },
            { value: 2, label: "> 4 h" }
        ],
        fuerza: [
            { value: 0, label: "No" },
            { value: 1, label: "Soporta parte del cuerpo" },
            { value: 2, label: "Aplica fuerza" }
        ]
    },
    {
        segmento: "Antebrazo",
        tituloFuerza: "¿Ejerce fuerza?",
        postura: [
            { value: 0, label: "Neutro" },
            { value: 1, label: "Parcial" },
            { value: 2, label: "Completa" }
        ],
        velocidad: [
            { value: 1, label: "Estática" },
            { value: 0, label: "Despacio" },
            { value: 1, label: "Moderado" },
            { value: 2, label: "Rápido" }
        ],
        duracion: [
            { value: 0, label: "< 1 h" },
            { value: 1, label: "1 - 4 h" },
            { value: 2, label: "> 4 h" }
        ],
        fuerza: [
            { value: 0, label: "No" },
            { value: 1, label: "Si" }
        ]
    },
    {
        segmento: "Muñeca",
        tituloFuerza: "¿Ejerce fuerza?",
        postura: [
            { value: 0, label: "Neutra" },
            { value: 1, label: "Parcial" },
            { value: 2, label: "Parcial + dedos rectos" },
            { value: 2, label: "Parcial + dedos flejados" },
            { value: 2, label: "Forzada" }
        ],
        velocidad: [
            { value: 1, label: "Estática" },
            { value: 0, label: "Despacio" },
            { value: 1, label: "Moderado" },
            { value: 2, label: "Rápido" }
        ],
        frecuencia: [
            { value: 0, label: "< 900" },
            { value: 1, label: "900 - 1800" },
            { value: 2, label: "> 1800" }
        ],
        duracion: [
            { value: 0, label: "< 1 h" },
            { value: 1, label: "1 - 4 h" },
            { value: 2, label: "> 4 h" }
        ],
        fuerza: [
            { value: 0, label: "No" },
            { value: 1, label: "Si" }
        ]
    },
    {
        segmento: "Agarres",
        tituloFuerza: "¿Ejerce fuerza?",
        tituloPostura: "1==¿En palma o muñeca?",
        postura: [
            { value: 1, label: "Presión Herramienta - Si" },
            { value: 0, label: "Presión Herramienta - No" },
            { value: 0, label: "Tipo de Agarre - No" },
            { value: 1, label: "Tipo de Agarre - Circular" },
            { value: 2, label: "Tipo de Agarre - Pinza" }
        ],
        velocidad: [
            { value: 1, label: "Estático" },
            { value: 0, label: "Dinámico" }
        ],
        frecuencia: [
            { value: 1, label: "Infrecuente" },
            { value: 2, label: "Frecuente" },
            { value: 0, label: "< 900" },
            { value: 1, label: "900 - 1800" },
            { value: 2, label: "> 1800" }
        ],
        duracion: [
            { value: 0, label: "< 1 h" },
            { value: 1, label: "1 - 4 h" },
            { value: 2, label: "> 4 h" }
        ],
        fuerza: [
            { value: 0, label: "No" },
            { value: 1, label: "Si" }
        ]
    },
    {
        segmento: "Dedos",
        postura: [
            { value: 0, label: "Pulsaciones - Dos manos" },
            { value: 1, label: "Pulsaciones - Una mano" },
            { value: 0, label: "Gatillo - No" },
            { value: 1, label: "Gatillo - Si" }
        ],
        frecuencia: [
            { value: 0, label: "Pulsaciones < 15000" },
            { value: 1, label: "Pulsaciones 15000 - 18000" },
            { value: 2, label: "Pulsaciones > 18000" },
            { value: 0, label: "Gatillo < 1000" },
            { value: 1, label: "Gatillo 1000 - 2000" },
            { value: 2, label: "Gatillo > 2000" }
        ],
        duracion: [
            { value: 0, label: "< 1 h" },
            { value: 1, label: "1 - 4 h" },
            { value: 2, label: "> 4 h" }
        ],
        fuerza: [
            { value: 0, label: "No" },
            { value: 1, label: "Si" }
        ]
    }
];

export function formatearResultado(result) {
    if (result == null || result === undefined || result === 0) return '';

    if (result <= 1) {
        return `${parseFloat(result).toFixed(2).replace(/\.?0+$/, '')} = 1 Categoría leve`;
    } else if (result >= 1.1 && result <= 2) {
        return `${parseFloat(result).toFixed(2).replace(/\.?0+$/, '')} = 2 Categoría baja`;
    } else if (result >= 2.1 && result <= 3) {
        return `${parseFloat(result).toFixed(2).replace(/\.?0+$/, '')} = 3 Categoría media`;
    } else {
        return `${parseFloat(result).toFixed(2).replace(/\.?0+$/, '')} = 4 Categoría alta`;
    }
}