import {
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    Divider
} from '@mui/material';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

export const ListDetailsAll = ({ name, campoRender, icons }) => {
    return (
        <Fragment>
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
        </Fragment>
    );
}

ListDetailsAll.propTypes = {
    name: PropTypes.string,
    campoRender: PropTypes.any,
    icons: PropTypes.node,
    iconsView: PropTypes.bool,
};

export const ListDetails = ({ name, campoRender }) => {
    return (
        <Fragment>
            <ListItemButton>
                <ListItemText primary={<Typography variant="subtitle1">{name}</Typography>} />
                <ListItemSecondaryAction>
                    <Typography variant="subtitle2" align="right">
                        {campoRender}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
        </Fragment>
    );
}

ListDetails.propTypes = {
    name: PropTypes.string,
    campoRender: PropTypes.any
};