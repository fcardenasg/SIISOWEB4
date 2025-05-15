import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from '@mui/material/styles';

export const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 350,
        fontSize: theme.typography.pxToRem(12),
        backgroundColor: 'transparent',
    },
}));