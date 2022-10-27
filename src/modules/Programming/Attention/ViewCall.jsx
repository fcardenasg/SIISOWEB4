import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Button,
    Grid,
    IconButton,
    Typography,
    useScrollTrigger
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import User1 from 'assets/images/users/avatar-1.png';

// assets
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { Fragment } from 'react';
import { ArrowCircleRightTwoTone } from '@mui/icons-material';

const avatarImage = require.context('assets/images/users', true);

function ElevationScroll({ children, window }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
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

const ViewCall = ({ user, callVideo, onCancel, onSave, ...others }) => {
    const theme = useTheme();

    // save user to local state to update details and submit letter
    const [profile, setProfile] = useState(user);
    useEffect(() => {
        setProfile(user);
    }, [user]);

    let avatarProfile = User1;
    if (profile) {
        avatarProfile = profile.avatar && avatarImage(`./${profile.avatar}`);
    }

    return (
        <Fragment>
            {callVideo ?
                <ElevationScroll {...others}>
                    <SubCard
                        sx={{
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                            width: '100%',
                            maxWidth: 700
                        }}
                        content={false}
                    >
                        <PerfectScrollbar style={{ height: 'calc(50vh - 5px)', overflowX: 'hidden' }}>
                            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <Avatar alt="User 3" src={avatarProfile} sx={{ width: 80, height: 80 }} />
                                        </Grid>

                                        <Grid item>
                                            <IconButton onClick={() => onCancel(false)} size="large">
                                                <HighlightOffTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Button variant="contained" fullWidth onClick={() => onSave(profile)}>
                                                Guardar
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="outlined" fullWidth onClick={() => onCancel(false)}>
                                                Cerrar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </PerfectScrollbar>
                    </SubCard>
                </ElevationScroll> : null
            }
        </Fragment>

    );
};

ViewCall.propTypes = {
    user: PropTypes.object,
    callVideo: PropTypes.bool,
    onCancel: PropTypes.func,
    onSave: PropTypes.func
};

export default ViewCall;