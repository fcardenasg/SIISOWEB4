import {
  IconUser,
  IconSchool,
  IconGenderBigender,
} from '@tabler/icons';

import ContactMailIcon from '@mui/icons-material/ContactMail';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PrintIcon from '@mui/icons-material/Print';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import GetAppIcon from '@mui/icons-material/GetApp';

import { ColorDrummondltd } from 'themes/colors';


export const itemsMenu = [
  {
    title: "Empleados",
    subtitle: "Expats,Practicantes y Contratistas",
    icon: IconUser,
    selected: true,
    url: '/employee/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Atención",
    subtitle: "EMO, TRIAGE, Enfermería y Asesorias",
    icon: ContactMailIcon,
    selected: true,
    url: '/attention/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Programación",
    subtitle: "EMO, TRIAGE, Enfermería y Asesorias",
    icon: PendingActionsIcon,
    selected: true,
    url: '/programming/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Reimpresión",
    subtitle: "EMO, TRIAGE, Enfermería y Asesorias",
    icon: PrintIcon,
    selected: false,
    url: '/reprint/list',
    color: ColorDrummondltd.GrayDrummond
  },
  {
    title: "Estadísticas",
    subtitle: "EMO, TRIAGE, Enfermería y Asesorias",
    icon: InsertChartIcon,
    selected: false,
    url: '/indicators/view',
    color: ColorDrummondltd.GrayDrummond
  },
  {
    title: "Exportar",
    subtitle: "EMO, TRIAGE, Enfermería y Asesorias",
    icon: GetAppIcon,
    selected: false,
    url: '/export/list',
    color: ColorDrummondltd.GrayDrummond
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