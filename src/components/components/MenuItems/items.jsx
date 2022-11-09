import {
  IconUser,
  IconSchool,
  IconGenderBigender,
} from '@tabler/icons';

import { ColorDrummondltd } from 'themes/colors';


export const itemsMenu = [
  {
    title: "Personal",
    subtitle: "Empleados,Expats,Contratistas,                 Practicantes y Visitantes",
    icon: IconUser,
    selected: true,
    url: '/employee/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Atención",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconGenderBigender,
    selected: true,
    url: '/attention/list',
    color: ColorDrummondltd.OrangeDrummond
  },
  {
    title: "Programación",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconSchool,
    selected: true,
    url: '/programming/list',
    color: ColorDrummondltd.GreenDrummond
  },
  {
    title: "Reimpresión",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconSchool,
    selected: false,
    url: '/reprint/list',
    color: ColorDrummondltd.GrayDrummond
  },
  {
    title: "Indicadores",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconSchool,
    selected: false,
    url: '/indicators/view',
    color: ColorDrummondltd.BlueSeDrummond
  },
  {
    title: "Exportar",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconSchool,
    selected: false,
    url: '/export/list',
    color: ColorDrummondltd.BlueSeDrummond
  }
];

export const itemsMenuOrders = [
  {
    title: "Ordenes Individuales",
    subtitle: "Audimetría, Espirometría, Laboratorio, Visiometría, Electrocardiograma, Examen Físico, RxCLS, RNM, Rx Torax, COVID-19",
    icon: IconUser,
    selected: true,
    url: '/orders-individual/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Ordenes Masivas",
    subtitle: "Audimetría, Espirometría, Laboratorio, Visiometría, Electrocardiograma, Examen Físico, RxCLS, RNM, Rx Torax, COVID-19",
    icon: IconGenderBigender,
    selected: true,
    url: '/attention/list',
    color: ColorDrummondltd.OrangeDrummond
  },
  {
    title: "Exportar",
    subtitle: "Audimetría, Espirometría, Laboratorio, Visiometría, Electrocardiograma, Examen Físico, RxCLS, RNM, Rx Torax, COVID-19",
    icon: IconSchool,
    selected: false,
    url: '/programming/list',
    color: ColorDrummondltd.GreenDrummond
  },
];