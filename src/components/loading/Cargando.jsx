import { CircularProgress, Grid } from '@mui/material';

export default function Cargando({ size = 250 }) {
    return (
        <>
            <Grid item sx={{ my: 4 }}>
                <Grid container justifyContent="center">
                    <CircularProgress color="success" size={size} />
                </Grid>
            </Grid>
        </>
    )
}