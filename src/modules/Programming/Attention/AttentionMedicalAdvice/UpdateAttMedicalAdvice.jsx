import { Grid, Typography } from '@mui/material';

import ViewCall from './ViewCall';

import SubCard from 'ui-component/cards/SubCard';

const UpdateAttMedicalAdvice = ({ children, setUserEdit, userEdit }) => {

    return (
        <SubCard title={<Typography variant='h4'>Asesorías médicas especializadas</Typography>}>
            <Grid container spacing={2}>
                <Grid className="block" item xs zeroMinWidth sx={{ display: userEdit ? { xs: 'none', md: 'flex' } : 'flex' }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <Grid container direction="row" spacing={2}>
                                {children}
                            </Grid>
                        </Grid>
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