import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Button,
    Grid,
    Typography,
    useScrollTrigger
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import User1 from 'assets/images/users/avatar-1.png';

const avatarImage = require.context('assets/images/users', true);

const jobTypes = [
    { label: 'Work', id: 1 },
    { label: 'Personal', id: 2 }
];

// sticky edit card

function ElevationScroll({ children, window }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 130,
        target: window || undefined
    });

    return React.cloneElement(children, {
        style: {
            position: trigger ? 'fixed' : 'relative',
            top: trigger ? 83 : 0,
            width: trigger ? 318 : '100%'
        }
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.node,
    window: PropTypes.object
};

// ==============================|| CONTACT CARD/LIST USER EDIT ||============================== //

const ViewCall = ({ onCancel, ...others }) => {
    const theme = useTheme();

    let avatarProfile = User1;

    return (
        <ElevationScroll {...others}>
            <SubCard
                title="VIDEO LLAMADA"
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    width: '100%',
                    maxWidth: 342
                }}
                container={false}
            >
                <PerfectScrollbar style={{ height: 'calc(80vh - 80px)', overflowX: 'hidden' }}>
                    <Grid container spacing={gridSpacing} /* sx={{ p: 3 }} */>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Avatar alt="User 3" src={avatarProfile} sx={{ width: 64, height: 64 }} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Button>
                                                Copiar Link
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ my: 6 }}>
                            <Typography>
                                CAMARA NUMERO UNO
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ my: 6 }}>
                            <Typography>
                                CAMARA NUMERO DOS
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Button variant="contained" fullWidth>
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="outlined" fullWidth onClick={onCancel}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </SubCard>
        </ElevationScroll>
    );
};

ViewCall.propTypes = {
    onCancel: PropTypes.func,
};

export default ViewCall;