import { CircularProgress, Grid } from '@mui/material';

export default function Cargando(props) {
    return (
        <>
            <Grid container justifyContent="center">
                <CircularProgress color="success" size={props.size === "" ? 250 : props.size} />
            </Grid>
        </>
    )
}