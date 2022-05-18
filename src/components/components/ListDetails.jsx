import {
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    Divider
} from '@mui/material';
import PropTypes from 'prop-types';

export const ListDetailsAll = ({ name, campoRender, icons }) => {
    return (
        <>
            <ListItemButton>
                <ListItemIcon>
                    {icons}
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1">{name}</Typography>} />
                <ListItemSecondaryAction>
                    <Typography variant="subtitle2" align="right">
                        {campoRender}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
        </>
    );
}

ListDetailsAll.propTypes = {
    name: PropTypes.string,
    campoRender: PropTypes.string,
    icons: PropTypes.node,
    iconsView: PropTypes.bool,
};

export const ListDetails = ({ name, campoRender }) => {
    return (
        <>
            <ListItemButton>
                <ListItemText primary={<Typography variant="subtitle1">{name}</Typography>} />
                <ListItemSecondaryAction>
                    <Typography variant="subtitle2" align="right">
                        {campoRender}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
        </>
    );
}

ListDetails.propTypes = {
    name: PropTypes.string,
    campoRender: PropTypes.string
};