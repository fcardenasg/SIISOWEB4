import { ColorDrummondltd } from "themes/colors";
import { PendingActions, HourglassEmpty, CheckCircle } from "@mui/icons-material";

export const getStatusConfig = (status) => {
    switch (status) {
        case 1:
            return { step: 0, percent: 0, color: ColorDrummondltd.GrayDrummond, label: 'Pendiente', icon: <PendingActions /> };
        case 2:
            return { step: 1, percent: 50, color: ColorDrummondltd.OrangeDrummond, label: 'En progreso', icon: <HourglassEmpty /> };
        case 3:
            return { step: 2, percent: 100, color: ColorDrummondltd.GreenDrummond, label: 'Completada', icon: <CheckCircle /> };
        default:
            return { step: 0, percent: 0, color: ColorDrummondltd.GrayDrummond, label: 'Desconocido', icon: <PendingActions /> };
    }
};