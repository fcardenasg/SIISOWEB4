import { CircularProgress, Grid } from '@mui/material';

export default function Cargando() {
    return (
        <>
            <Grid container justifyContent="center">
                <CircularProgress color="success" size={250} />
            </Grid>
        </>
    )
}