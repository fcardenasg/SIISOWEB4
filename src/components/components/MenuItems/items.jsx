import {
  IconClipboardHeart,
  IconUser,
  IconGenderBigender,
  IconSchool,
  IconReportMedical,
  IconTool
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
    subtitle: "Expats, Practicantes y Contratistas",
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

export const itemsOccupationalHealth = [
  {
    title: "Medicina Laboral",
    subtitle: "",
    icon: IconClipboardHeart,
    selected: true,
    url: '/occupationalmedicine/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Reintegro",
    subtitle: "",
    icon: IconClipboardHeart,
    selected: true,
    url: '/refund/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Accidente de Trabajo",
    subtitle: "",
    icon: IconClipboardHeart,
    selected: false,
    url: '/accident-rate/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Ausentismo Laboral",
    subtitle: "",
    icon: IconClipboardHeart,
    selected: false,
    url: '/work-absenteeism/list',
    color: ColorDrummondltd.RedDrummond
  },
];

export const itemsConsultancies = [
  {
    title: "Asesoría Médica",
    subtitle: "",
    icon: IconReportMedical,
    selected: true,
    url: '/medicaladvice/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Asesoría Psicológica",
    subtitle: "",
    icon: IconReportMedical,
    selected: true,
    url: '/psychologicalcounseling/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Otras Asesorías",
    subtitle: "",
    icon: IconReportMedical,
    selected: true,
    url: '/otheradvice/list',
    color: ColorDrummondltd.RedDrummond
  }
];

export const itemsParameterization = [
  {
    title: "Tipo Catálogo",
    subtitle: "",
    icon: IconTool,
    selected: true,
    url: '/typecatalog/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Catálogo",
    subtitle: "",
    icon: IconTool,
    selected: true,
    url: '/catalog/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Empresas",
    subtitle: "",
    icon: IconTool,
    selected: true,
    url: '/company/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Proveedor",
    subtitle: "",
    icon: IconTool,
    selected: true,
    url: '/supplier/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "CIE11",
    subtitle: "",
    icon: IconTool,
    selected: true,
    url: '/cie11/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Plantilla",
    subtitle: "",
    icon: IconTool,
    selected: true,
    url: '/template/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Apuntes Personales",
    subtitle: "",
    icon: IconTool,
    selected: true,
    url: '/personal-notes/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Medicamentos",
    subtitle: "",
    icon: IconTool,
    selected: true,
    url: '/medicines/list',
    color: ColorDrummondltd.RedDrummond
  }
];