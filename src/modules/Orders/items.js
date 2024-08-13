import { ColorDrummondltd } from 'themes/colors';

export const itemsMenuOrders = [
    {
        title: "Ordenes Individuales",
        subtitle: "Audimetría, Espirometría, Laboratorio, Visiometría, Electrocardiograma, Examen Físico, RxCLS, RNM, Rx Torax, COVID-19",
        icon: "iconoir:notes",
        selected: true,
        url: '/orders-individual/list',
        color: ColorDrummondltd.RedDrummond
    },
    {
        title: "Ordenes Masivas",
        subtitle: "Audimetría, Espirometría, Laboratorio, Visiometría, Electrocardiograma, Examen Físico, RxCLS, RNM, Rx Torax, COVID-19",
        icon: "solar:notes-broken",
        selected: true,
        url: '/orders-masivas/add',
        color: ColorDrummondltd.OrangeDrummond
    },
    {
        title: "Exportar",
        subtitle: "Audimetría, Espirometría, Laboratorio, Visiometría, Electrocardiograma, Examen Físico, RxCLS, RNM, Rx Torax, COVID-19",
        icon: "ph:export-thin",
        selected: false,
        url: '/programming/list',
        color: ColorDrummondltd.GreenDrummond
    },
];