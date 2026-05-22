import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, Typography } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useEffect, useState } from 'react';
import { ColorDrummondltd } from 'themes/colors';

const statusColors = {
    1: 'RedDrummond',
    2: 'YellowDrummond',
    3: 'GreenDrummond',
    4: 'BlueDrummond'
};

const AccordionStatus = ({
    defaultExpandedId = null,
    title,
    defaultExpand,
    id,
    disabled,
    children,
    expandIcon,
    square,
    toggle,
    secondaryAction,
    statusColor = 1
}) => {
    const [expanded, setExpanded] = useState(null);

    const handleChange = (panel) => (event, newExpanded) => {
        if (toggle) setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        setExpanded(defaultExpandedId);
    }, [defaultExpandedId]);

    const getBaseColor = () => {
        if (disabled || !statusColor || !statusColors[statusColor]) return null;
        return ColorDrummondltd[statusColors[statusColor]];
    };

    const baseColor = getBaseColor();

    return (
        <Box sx={{ width: '100%' }}>
            <MuiAccordion
                key={id}
                defaultExpanded={!disabled && defaultExpand}
                expanded={(!toggle && !disabled && expanded) || (toggle && expanded === id)}
                disabled={disabled}
                square={square}
                onChange={handleChange(id)}
                sx={{
                    '&:before': { display: 'none' },
                    boxShadow: 'none',
                }}
            >
                <MuiAccordionSummary
                    expandIcon={expandIcon || expandIcon === false ? expandIcon : <ExpandMoreIcon />}
                    sx={{
                        fontWeight: 500,
                        background: baseColor
                            ? `linear-gradient(90deg, ${baseColor}14 0%, ${baseColor}00 100%)`
                            : 'transparent',
                        borderLeft: baseColor ? `4px solid ${baseColor}` : 'none',
                        transition: 'background 0.3s ease',
                        '& .MuiAccordionSummary-content': {
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        },
                        '&.Mui-disabled': {
                            opacity: 1,
                            background: 'transparent',
                            borderLeft: 'none'
                        }
                    }}
                >
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, flex: 1, textAlign: 'center' }}>
                        {title}
                    </Typography>

                    {secondaryAction && (
                        <Box
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mr: 2
                            }}
                        >
                            {secondaryAction}
                        </Box>
                    )}
                </MuiAccordionSummary>

                <MuiAccordionDetails sx={{ background: 'transparent', my: 1 }}>
                    {children}
                </MuiAccordionDetails>
            </MuiAccordion>
            <Divider />
        </Box>
    );
};

export default AccordionStatus;