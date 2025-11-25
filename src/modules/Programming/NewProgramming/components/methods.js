import { DefaultValue } from "components/helpers/Enums";
import { ColorDrummondltd } from "themes/colors";
import { PendingActions, HourglassEmpty, CheckCircle } from "@mui/icons-material";
import { UpperFirstChar } from "components/helpers/Format";
import axios from "axios";
import { alpha, Chip, styled } from "@mui/material";
import config from "config";

export const getStatusConfig = (status) => {
    switch (status) {
        case DefaultValue.ATENCION_PENDIENTE_ATENDIDO:
            return { step: 0, percent: 0, color: ColorDrummondltd.GrayDrummond, label: "Pendiente por atención", icon: <PendingActions /> };
        case DefaultValue.ATENCION_ESTASIENDOATENDIDO:
            return { step: 1, percent: 50, color: ColorDrummondltd.OrangeDrummond, label: "Está siendo atendido", icon: <HourglassEmpty /> };
        case DefaultValue.ATENDIDO:
            return { step: 2, percent: 100, color: ColorDrummondltd.GreenDrummond, label: "Atendido", icon: <CheckCircle /> };
        default:
            return { step: 0, percent: 0, color: ColorDrummondltd.GrayDrummond, label: "Pendiente por atención", icon: <PendingActions /> };
    }
}

export function capitalizarTypeCare(texto) {
    if (typeof texto !== 'string' || texto.length === 0)
        return '';

    const textoMinusculas = texto.toLowerCase();
    if (textoMinusculas.includes('triage')) {
        const parts = texto.trimStart().split(' ');

        if (parts.length === 0)
            return texto;

        parts[0] = UpperFirstChar(parts[0]);
        return parts.join(' ');
    }
    else {
        return UpperFirstChar(texto);
    }
}

export const fetchChatGPTResponse = async (conversation, model = 'gpt-4o-mini') => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/responses',
            {
                model,
                input: conversation,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey.openia}`,
                },
            }
        );

        const aiText = response.data.output[0].content[0].text || 'Sin respuesta del modelo.';
        return aiText;
    } catch (error) {
        return 'Ocurrió un error al procesar la solicitud.';
    }
};

export function getColorCard(param) {
    if (!param) {
        return ColorDrummondltd.GrayDrummond;
    }

    if (param.nameAtencion === 'TRIAGE I') {
        return ColorDrummondltd.RedDrummond;
    } else if (param.nameAtencion === 'TRIAGE II') {
        return ColorDrummondltd.OrangeDrummond;
    } else if (param.nameAtencion === 'PRUEBAS DE ALCOHOL Y DROGAS') {
        return ColorDrummondltd.RedDrummond;
    } else if (param.nameTipoAtencion === 'ENFERMERIA') {
        return ColorDrummondltd.BlueDrummond;
    } else if (param.nameTipoAtencion === 'ASESORIAS') {
        return ColorDrummondltd.GreenDrummond;
    } else if (param.nameTipoAtencion === 'EMO') {
        return ColorDrummondltd.GrayDrummond;
    } else if (param.nameAtencion === 'TRIAGE III') {
        return ColorDrummondltd.YellowDrummond;
    } else if (param.nameAtencion === 'TRIAGE IV') {
        return ColorDrummondltd.GreenDrummond;
    } else if (param.nameAtencion === 'TRIAGE V') {
        return ColorDrummondltd.BlueDrummond;
    }

    return ColorDrummondltd.GrayDrummond;
}

export const StyledChip = styled(Chip)((props) => {
    const { theme, timeColor } = props;

    return {
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius * 3,
        border: `2px solid ${timeColor}`,
        backgroundColor: alpha(timeColor, 0.08),
        transition: 'border-color 0.5s ease, background-color 0.5s ease',
        color: timeColor,
        '& .MuiChip-icon': {
            color: timeColor,
        },
        '&:hover, &:focus': {
            backgroundColor: alpha(timeColor, 0.15),
        }
    }
});