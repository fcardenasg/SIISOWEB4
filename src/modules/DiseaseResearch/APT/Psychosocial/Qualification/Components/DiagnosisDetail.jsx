import PropTypes from 'prop-types';

import {
    Grid,
    Typography,
    Paper
} from '@mui/material';

const DiagnosisDetail = ({
    data
}) => {

    if (!data) {

        return (

            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    textAlign: 'center'
                }}
            >

                <Typography
                    variant="body2"
                >
                    Sin diagnóstico
                </Typography>

            </Paper>

        );
    }

    return (

        <Paper
            elevation={1}
            sx={{
                p: 2
            }}
        >

            <Grid
                container
                spacing={1}
            >

                <Grid item xs={12}>

                    <Typography
                        variant="h4"
                    >
                        {
                            data.codigo ||
                            data.code
                        }
                    </Typography>

                </Grid>

                <Grid item xs={12}>

                    <Typography
                        variant="body2"
                    >

                        {
                            data.nombre ||
                            data.name
                        }

                    </Typography>

                </Grid>

            </Grid>

        </Paper>
    );
};

DiagnosisDetail.propTypes = {
    data: PropTypes.object
};

export default DiagnosisDetail;