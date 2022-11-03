import { useState, Fragment } from 'react';

import { Button, Grid, Typography } from '@mui/material';

import ViewCall from './ViewCall';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SubCard from 'ui-component/cards/SubCard';

const UpdateAttMedicalAdvice = ({ children }) => {

    const [userDetails, setUserDetails] = useState(false);
    const [userEdit, setUserEdit] = useState(false);
    const handleOnAdd = () => {
        setUserDetails(false);
        setUserEdit(true);
    };

    return (
        <SubCard title={<Typography variant='ASESORÍAS MÉDICAS ESPECIALIZADAS'>ASESORÍAS MÉDICAS ESPECIALIZADAS</Typography>}
            secondary={
                <Button variant="contained" size="large" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleOnAdd}>
                    Video Llamada
                </Button>
            }>
            <Grid container spacing={gridSpacing}>
                <Grid
                    className="block"
                    item
                    xs
                    zeroMinWidth
                    sx={{ display: userDetails || userEdit ? { xs: 'none', md: 'flex' } : 'flex' }}
                >
                    <Grid container alignItems="center" spacing={gridSpacing}>
                        <Grid item>
                            BUTON

                        </Grid>

                        <Fragment>
                            <Grid item xs={12}>
                                <Grid container direction="row" spacing={gridSpacing}>
                                    {children}
                                </Grid>
                            </Grid>
                        </Fragment>

                    </Grid>
                </Grid>

                {userEdit && (
                    <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' } }}>
                        <ViewCall
                            onCancel={() => setUserEdit(false)}
                        />
                    </Grid>
                )}
            </Grid>
        </SubCard>
    );
};

export default UpdateAttMedicalAdvice;