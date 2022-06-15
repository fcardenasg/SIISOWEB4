import {
  IconRadioactive,
  IconScale,
  IconRun,
  IconSocial,
  IconFall,
  IconPhysotherapist,
  IconDna,
} from '@tabler/icons';

import { ColorDrummondltd } from 'themes/colors';


export const itemsMenu = [
  {
    title: "Químico",
    icon: IconRadioactive,
    selected: true,
    func: 1,
    color: ColorDrummondltd.RedDrummond
  },
  {
    title: "Físico",
    icon: IconPhysotherapist,
    selected: true,
    func: 2,
    color: ColorDrummondltd.OrangeDrummond
  },
  {
    title: "Psicosocial",
    icon: IconSocial,
    selected: false,
    func: 3,
    color: ColorDrummondltd.GreenDrummond
  },
  {
    title: "Biológico",
    icon: IconDna,
    selected: false,
    func: 4,
    color: ColorDrummondltd.GrayDrummond
  },
  {
    title: "ECF - Postura",
    icon: IconFall,
    selected: false,
    func: 5,
    color: ColorDrummondltd.BlueSeDrummond
  },
  {
    title: "ECF - Fuerza",
    icon: IconScale,
    selected: false,
    func: 6,
    color: ColorDrummondltd.BlueSeDrummond
  },
  {
    title: "ECF - Movimiento",
    icon: IconRun,
    selected: false,
    func: 7,
    color: ColorDrummondltd.BlueSeDrummond
  },
];