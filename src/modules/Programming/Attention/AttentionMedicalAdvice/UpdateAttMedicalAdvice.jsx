import { Grid, Typography } from '@mui/material';

import ViewCall from './ViewCall';
import { gridSpacing } from 'store/constant';

import SubCard from 'ui-component/cards/SubCard';

const UpdateAttMedicalAdvice = ({ children, setUserEdit, userEdit }) => {

    return (
        <SubCard title={<Typography variant='h4'>ASESORÍAS MÉDICAS ESPECIALIZADAS</Typography>}>
            <Grid container spacing={gridSpacing}>
                <Grid className="block" item xs zeroMinWidth sx={{ display: userEdit ? { xs: 'none', md: 'flex' } : 'flex' }}>
                    <Grid container alignItems="center" spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container direction="row" spacing={gridSpacing}>
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