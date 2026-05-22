import {
    CheckCircle,
    HourglassEmpty,
    PendingActions,
    RateReview,
    Replay
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { default as TableCell, tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ColorDrummondltd } from "themes/colors";

export const getStatusConfig = (status) => {
    switch (status) {
        case 1:
            return { step: 0, percent: 0, color: ColorDrummondltd.GrayDrummond, label: 'Pendiente', icon: <PendingActions /> };
        case 2:
            return { step: 1, percent: 25, color: ColorDrummondltd.OrangeDrummond, label: 'En progreso', icon: <HourglassEmpty /> };
        case 3:
            return { step: 2, percent: 50, color: ColorDrummondltd.GreenDrummond, label: 'Para revisión', icon: <RateReview /> };
        case 4:
            return { step: 3, percent: 75, color: ColorDrummondltd.RedDrummond, label: 'Devuelto', icon: <Replay /> };
        case 5:
            return { step: 4, percent: 100, color: ColorDrummondltd.GreenDrummond, label: 'Aprobado', icon: <CheckCircle /> };
        default:
            return { step: 0, percent: 0, color: ColorDrummondltd.GrayDrummond, label: 'Desconocido', icon: <PendingActions /> };
    }
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#E0E0E0',
        color: theme.palette.common.black,
        fontWeight: 'bold',
        padding: '8px 12px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '6px 12px',
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const formatDateForInput = (dateString) => {
    if (!dateString) return null;
    return dateString.split('T')[0];
};