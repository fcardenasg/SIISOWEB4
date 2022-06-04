import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

// assets
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Accordion = ({ defaultExpandedId = null, title, defaultExpand, id, disabled, children, expandIcon, square, toggle }) => {
    const theme = useTheme();

    const [expanded, setExpanded] = useState(null);
    const handleChange = (panel) => (event, newExpanded) => {
        if (toggle) setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        setExpanded(defaultExpandedId);
    }, [defaultExpandedId]);

    return (
        <Box sx={{ width: '100%' }}>
            <MuiAccordion
                key={id}
                defaultExpanded={!disabled && defaultExpand}
                expanded={(!toggle && !disabled && expanded) || (toggle && expanded === id)}
                disabled={disabled}
                square={square}
                onChange={handleChange(id)}
            >
                <MuiAccordionSummary
                    expandIcon={expandIcon || expandIcon === false ? expandIcon : <ExpandMoreIcon />}
                    sx={{ color: theme.palette.mode === 'dark' ? 'grey.500' : 'grey.800', fontWeight: 500 }}
                >
                    {title}
                </MuiAccordionSummary>
                <MuiAccordionDetails>{children}</MuiAccordionDetails>
            </MuiAccordion>
        </Box>
    );
};

Accordion.propTypes = {
    expanded: PropTypes.any,
    disabled: PropTypes.any,
    defaultExpand: PropTypes.any,
    childre: PropTypes.node,
    title: PropTypes.node,
    id: PropTypes.string,
    defaultExpandedId: PropTypes.string,
    expandIcon: PropTypes.object,
    square: PropTypes.bool,
    toggle: PropTypes.bool
};

export default Accordion;