import {
  IconClipboardHeart,
  IconUser,
  IconGenderBigender,
  IconSchool,
  IconReportMedical,
  IconTool,
  IconStethoscope,
  IconUsers,
  IconFirstAidKit,
  IconMessages,
  IconChartLine,
  IconFileExport
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
    url: '/export/menu',
    color: ColorDrummondltd.GrayDrummond
  },
  {
    title: "Editar Programación",
    subtitle: "EMO, TRIAGE, Enfermería y Asesorias",
    icon: GetAppIcon,
    selected: false,
    url: '/programming/update',
    color: ColorDrummondltd.GrayDrummond
  },
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
    url: '/orders-masivas/add',
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
    title: "Accidente de Trabajo",
    subtitle: "",
    icon: IconClipboardHeart,
    selected: true,
    url: '/accident-rate/list',
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
    title: "Medicina Laboral",
    subtitle: "",
    icon: IconClipboardHeart,
    selected: true,
    url: '/occupationalmedicine/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Ausentismo Laboral",
    subtitle: "",
    icon: IconClipboardHeart,
    selected: true,
    url: '/work-absenteeism/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Exportar",
    subtitle: "",
    icon: IconClipboardHeart,
    selected: true,
    url: '/occupational-health/export',
    color: ColorDrummondltd.GrayDrummond
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
    title: "CIE10",
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
  }
];

export const itemsParaclinics = [
  {
    title: "Ordenes",
    subtitle: "",
    icon: IconStethoscope,
    selected: true,
    url: '/orders/view',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Audiometría",
    subtitle: "",
    icon: IconStethoscope,
    selected: true,
    url: '/paraclinics/audiometry/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Electrocardiograma",
    subtitle: "",
    icon: IconStethoscope,
    selected: true,
    url: '/paraclinics/electro/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Espirometría",
    subtitle: "",
    icon: IconStethoscope,
    selected: true,
    url: '/paraclinics/spirometry/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Laboratorios",
    subtitle: "",
    icon: IconStethoscope,
    selected: true,
    url: '/paraclinics/laboratory/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "RX de Torax",
    subtitle: "",
    icon: IconStethoscope,
    selected: true,
    url: '/paraclinics/rxtorax/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Visiometría",
    subtitle: "",
    icon: IconStethoscope,
    selected: true,
    url: '/paraclinics/visiometrics/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "RMN",
    subtitle: "",
    icon: IconStethoscope,
    selected: true,
    url: '/paraclinics/rnm/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "PSA",
    subtitle: "",
    icon: IconStethoscope,
    selected: true,
    url: '/paraclinics/psa/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Citología",
    subtitle: "",
    icon: IconStethoscope,
    selected: true,
    url: '/paraclinics/cytology/list',
    color: ColorDrummondltd.RedDrummond
  }
];

export const itemsAdministration = [
  {
    title: "Usuarios",
    subtitle: "",
    icon: IconUsers,
    selected: true,
    url: '/user/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Rol",
    subtitle: "",
    icon: IconUsers,
    selected: true,
    url: '/rol/list',
    color: ColorDrummondltd.RedDrummond
  },
];

export const itemsRequests = [
  {
    title: "Solicitudes",
    subtitle: "",
    icon: IconMessages,
    selected: true,
    url: '/requests/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Responder Solicitudes",
    subtitle: "",
    icon: IconMessages,
    selected: true,
    url: '/requests/reply',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Consultar Respuestas",
    subtitle: "",
    icon: IconMessages,
    selected: true,
    url: '/requests/answered',
    color: ColorDrummondltd.RedDrummond
  },
];

export const itemsMedicines = [
  {
    title: "Medicamentos",
    subtitle: "",
    icon: IconFirstAidKit,
    selected: true,
    url: '/medicines/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Entrada Medicamentos",
    subtitle: "",
    icon: IconFirstAidKit,
    selected: true,
    url: '/medicines-entry/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Salida Medicamentos",
    subtitle: "",
    icon: IconFirstAidKit,
    selected: true,
    url: '/medication-outlet/list',
    color: ColorDrummondltd.RedDrummond
  },
];

export const itemsExcel = [
  {
    title: "Registro Atención",
    subtitle: "",
    icon: IconFileExport,
    selected: true,
    url: 'REGIS_ATEN',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Asesorías",
    subtitle: "",
    icon: IconFileExport,
    selected: true,
    url: 'ASESO',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Paraclínicos",
    subtitle: "",
    icon: IconFileExport,
    selected: true,
    url: 'PARACLINI',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Atención Médica",
    subtitle: "",
    icon: IconFileExport,
    selected: true,
    url: 'ATEN_MEDI',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Emo",
    subtitle: "",
    icon: IconFileExport,
    selected: true,
    url: 'EMO',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Enfermería",
    subtitle: "",
    icon: IconFileExport,
    selected: true,
    url: 'ENFER',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Ordenes De Examen",
    subtitle: "",
    icon: IconFileExport,
    selected: true,
    url: 'ORDEN_EXAM',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "P. De Alcohol y Droga",
    subtitle: "",
    icon: IconFileExport,
    selected: true,
    url: 'ALC_DRO',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Framingham",
    subtitle: "",
    icon: IconFileExport,
    selected: true,
    url: 'FRAMI',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Indicadores",
    subtitle: "",
    icon: IconFileExport,
    selected: true,
    url: 'INDIC',
    color: ColorDrummondltd.GrayDrummond
  },
];

export const itemsIndicadores = [
  {
    title: "Incapacidades",
    subtitle: "",
    icon: IconChartLine,
    selected: true,
    url: '/indicators/disabilities',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Atenciones Médicas",
    subtitle: "",
    icon: IconChartLine,
    selected: true,
    url: '/indicators/disabilities',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Asesorías",
    subtitle: "",
    icon: IconChartLine,
    selected: true,
    url: '/indicators/disabilities',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Órdenes",
    subtitle: "",
    icon: IconChartLine,
    selected: true,
    url: '/indicators/disabilities',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Paraclinicos",
    subtitle: "",
    icon: IconChartLine,
    selected: true,
    url: '/indicators/disabilities',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Medicina Laboral",
    subtitle: "",
    icon: IconChartLine,
    selected: true,
    url: '/indicators/disabilities',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Accidente De Trabajo",
    subtitle: "",
    icon: IconChartLine,
    selected: true,
    url: '/indicators/disabilities',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Reintegro",
    subtitle: "",
    icon: IconChartLine,
    selected: true,
    url: '/indicators/disabilities',
    color: ColorDrummondltd.RedDrummond
  },
];