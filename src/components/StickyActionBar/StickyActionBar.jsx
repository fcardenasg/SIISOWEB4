import {
    Button,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Typography
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ElevationScroll from './ElevationScroll';
import { TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ColorDrummondltd } from 'themes/colors';

function StickyActionBar({ children, onClickSave, onClickReport, onClickOrderMedical, onClickUpdate,
    showButton = false, disabledSave, disabledReport, disabledUpdate, ...others }) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <MainCard content={false}>
                    <ElevationScroll {...others}>
                        <CardActions>
                            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                                <Grid item>
                                    <Typography variant="h5" sx={{ m: 0 }}>
                                        ACTUALIZAR O GUARDAR
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="contained" disabled={disabledSave} onClick={onClickSave} sx={{ background: ColorDrummondltd.RedDrummond }} color="error" fullWidth>
                                                    {TitleButton.Guardar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="outlined" disabled={disabledUpdate} color="error" onClick={onClickUpdate} fullWidth>
                                                    {TitleButton.Actualizar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </ElevationScroll>
                    <Divider />

                    <CardContent>
                        {children}
                    </CardContent>

                    {showButton ?
                        <CardActions>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <AnimateButton>
                                                <Button disabled={disabledReport} variant="outlined" fullWidth onClick={onClickReport}>
                                                    {TitleButton.Imprimir}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={onClickOrderMedical}>
                                                    {TitleButton.OrdenesMedicas}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardActions> : null
                    }
                </MainCard>
            </Grid>
        </Grid>
    );
}

export default StickyActionBar;