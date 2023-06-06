import PropTypes from 'prop-types';

import { Button, Divider, Grid, Typography } from '@mui/material';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { ViewFormat } from 'components/helpers/Format';
import { ColorDrummondltd } from 'themes/colors';
import { TitleButton } from 'components/helpers/Enums';
import { Fragment } from 'react';

import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import MailIcon from '@mui/icons-material/Mail';
import PrintIcon from '@mui/icons-material/Print';
import { LoadingButton } from '@mui/lab';

const ValidateButtons = ({ handleClick1, handleClick2, TitleOne, TitleTwo, iconOne, iconTwo, vista, loading }) => {
    return (
        <Fragment>
            <Grid item xs={vista === 'views' ? 12 : 6}>
                <AnimateButton>
                    <Button color={vista === 'views' ? 'error' : 'primary'} variant="contained" onClick={handleClick1} startIcon={iconOne} fullWidth>
                        {TitleOne}
                    </Button>
                </AnimateButton>
            </Grid>

            {vista !== 'views' && vista !== 'print' ?
                <Grid item xs={6}>
                    <AnimateButton>
                        <Button variant="contained" onClick={handleClick2} startIcon={iconTwo} fullWidth>
                            {TitleTwo}
                        </Button>
                    </AnimateButton>
                </Grid> : vista === 'print' ?
                    <Grid item xs={6}>
                        <AnimateButton>
                            <LoadingButton
                                fullWidth
                                onClick={handleClick2}
                                loading={loading}
                                loadingPosition="end"
                                startIcon={iconTwo}
                                variant="contained"
                            >
                                {TitleTwo}
                            </LoadingButton>
                        </AnimateButton>
                    </Grid> : null
            }
        </Fragment>
    );
}

const CardsEmployee = ({ lsEmployee = [], handleClick1, handleClick2, vista = '', loading }) => {

    return (
        <SubCard sx={{ border: '4px solid', }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} direction="row-reverse" justifyContent="center" alignItems="center">
                        <Grid item xs={3}>
                            <Avatar sx={{ bgcolor: ColorDrummondltd.RedDrummond, width: 60, height: 60 }}>
                                <Typography sx={{ color: 'white' }} >{lsEmployee.nombres !== "" ? lsEmployee.nombres.charAt(0) : ""}</Typography>
                            </Avatar>
                        </Grid>

                        <Grid item xs={9}>
                            <Typography variant="h6">{lsEmployee.nombres}</Typography>
                            <Typography variant="caption">{lsEmployee.documento}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ border: 0.5, color: 'gray' }} />
                </Grid>

                <Grid item xs={12} alignItems="center">
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="subtitle2"><b>Celular:</b> {lsEmployee.celular}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2"><b>Correo:</b> {lsEmployee.correoEmpleado}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2"><b>Area:</b> {lsEmployee.nameArea}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2"><b>Ciudad Res.:</b> {lsEmployee.nameCiudadResidencia}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2"><b>Fecha Ultimo Control:</b> {lsEmployee.fechaUltimoControlEmo === '0001-01-01T00:00:00' ?
                                "" : ViewFormat(lsEmployee.fechaUltimoControlEmo)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <ValidateButtons
                            TitleOne={
                                vista === 'print' ? TitleButton.Imprimir :
                                    vista === 'editEmployee' ? TitleButton.AgregarOrden :
                                        vista === 'views' ? TitleButton.Eliminar : null
                            }
                            TitleTwo={
                                vista === 'print' ? TitleButton.EnviarCorreo :
                                    vista === 'editEmployee' ? TitleButton.Editar :
                                        vista === 'views' ? TitleButton.Eliminar : null
                            }
                            handleClick1={handleClick1}
                            handleClick2={handleClick2}
                            iconOne={
                                vista === 'print' ? <PrintIcon fontSize="small" /> :
                                    vista === 'editEmployee' ? <AddCircleOutlineOutlinedIcon fontSize="small" /> :
                                        vista === 'views' ? <HighlightOffIcon fontSize="small" /> : null
                            }
                            iconTwo={
                                vista === 'print' ? <SendIcon fontSize="small" /> :
                                    vista === 'editEmployee' ? <EditIcon fontSize="small" /> :
                                        vista === 'views' ? <HighlightOffIcon fontSize="small" /> : null
                            }
                            vista={vista}
                            loading={loading}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    );
};

CardsEmployee.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string
};

export default CardsEmployee;
