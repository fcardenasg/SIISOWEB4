import {
  IconActivity,
  IconReportMedical,
  IconUser
} from '@tabler/icons';


export const itemsMenu = [
  {
    title: "EMPLEADOS",
    subtitle: "Registro de Empleados",
    icon: IconUser,
    selected: true,
    url: '/catalog/list',
    color: '#d81b60'
  },
  {
    title: "ATENCIÓN",
    subtitle: "Registro de Atenciones",
    icon: IconReportMedical,
    selected: true,
    url: '/catalog/list',
    color: '#d81b60'
  },
  {
    title: "PROGRAMACIÓN",
    subtitle: "Programación de Atenciones",
    icon: IconActivity,
    selected: true,
    url: '/catalog/list',
    color: '#388e3c'
  },
];