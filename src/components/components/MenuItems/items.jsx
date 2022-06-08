import {
  IconUser,
  IconSchool,
  IconGenderBigender,
} from '@tabler/icons';

import { ColorDrummondltd } from 'themes/colors';


export const itemsMenu = [
  {
    title: "Personal",
    subtitle: "Empleados, contratistas, practicantes y visitantes",
    icon: IconUser,
    selected: true,
    url: '/catalog/list',
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Atención",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconGenderBigender,
    selected: true,
    url: '/catalog/list',
    color: ColorDrummondltd.OrangeDrummond
  },
  {
    title: "Programación",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconSchool,
    selected: true,
    url: '/catalog/list',
    color: ColorDrummondltd.GreenDrummond
  },
  {
    title: "Reimpresión",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconSchool,
    selected: false,
    url: '/catalog/list',
    color: ColorDrummondltd.GrayDrummond
  },
  {
    title: "Indicadores",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconSchool,
    selected: false,
    url: '/catalog/list',
    color: ColorDrummondltd.BlueSeDrummond
  },
  {
    title: "Exportar",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconSchool,
    selected: false,
    url: '/catalog/list',
    color: ColorDrummondltd.BlueSeDrummond
  },
  {
    title: "Historial",
    subtitle: "TRIAGE, Enfermería, Asesorias, EMO y Paraclinicos",
    icon: IconSchool,
    selected: false,
    url: '/catalog/list',
    color: ColorDrummondltd.BlueSeDrummond
  },


];