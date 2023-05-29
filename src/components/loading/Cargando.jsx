import { CircularProgress, Grid } from '@mui/material';

export default function Cargando({ size = 250, myy = 4, mxx = 4, }) {
    return (
        <>
            <Grid item sx={{ my: myy, mx: mxx }}>
                <Grid container justifyContent="center">
                    <CircularProgress size={size} />
                </Grid>
            </Grid>
        </>
    )
}