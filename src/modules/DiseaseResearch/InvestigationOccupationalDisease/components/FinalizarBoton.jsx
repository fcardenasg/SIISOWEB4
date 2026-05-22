import { Button, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Chip, alpha } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ColorDrummondltd } from 'themes/colors';

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#8DC63F',
    color: '#ffffff',
    textTransform: 'none',
    height: '32px',
    padding: '0 16px',
    fontSize: '0.875rem',
    borderRadius: '6px',
    fontWeight: 500,
    letterSpacing: '0.2px',
    transition: 'all 0.2s ease-in-out',
    border: '1px solid #8DC63F',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#ffffff',
        color: '#8DC63F',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderColor: '#8DC63F',
    },
    '&:active': {
        backgroundColor: '#f4f7f9',
        transform: 'scale(0.98)',
    },
    '& .MuiButton-startIcon': {
        marginRight: '8px',
        '& svg': {
            fontSize: '18px',
        }
    }
}));

export default function FinalizarBoton({ onClick }) {
    return (
        <StyledButton
            variant="contained"
            onClick={onClick}
            startIcon={<CheckCircleIcon />}
        >
            Finalizar
        </StyledButton>
    );
}

export const ReadOnlyChip = () => {
    const baseColor = ColorDrummondltd.GrayDrummond;

    return (
        <Chip
            icon={<LockOutlinedIcon style={{ fontSize: '1rem', color: baseColor }} />}
            label="Solo lectura"
            sx={{
                height: 32,
                paddingX: '8px',
                backgroundColor: alpha(baseColor, 0.08),
                color: baseColor,
                fontWeight: 600,
                fontSize: '0.70rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: `1px solid ${alpha(baseColor, 0.2)}`,
                borderRadius: '6px',
                cursor: 'default',
                '& .MuiChip-icon': {
                    marginLeft: '4px',
                },
                '&:hover': {
                    backgroundColor: alpha(baseColor, 0.12),
                }
            }}
        />
    );
};