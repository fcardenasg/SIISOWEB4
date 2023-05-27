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

import EditIcon from '@mui/icons-material/Edit';
import MailIcon from '@mui/icons-material/Mail';
import PrintIcon from '@mui/icons-material/Print';

const CardsEmployee = ({ lsEmployee = [], handleClick, handleDelete, views = false, report = false, editarEmployee = false }) => {

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
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        {report ? <Fragment>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleDelete} startIcon={<PrintIcon fontSize="small" />} fullWidth>
                                            {TitleButton.Imprimir}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleClick} startIcon={<MailIcon fontSize="small" />} fullWidth>
                                            {TitleButton.EnviarCorreo}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Fragment> : editarEmployee ?
                            <Fragment>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <AnimateButton>
                                            <Button variant="contained" onClick={handleClick} startIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />} fullWidth>
                                                Agregar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <AnimateButton>
                                            <Button variant="contained" onClick={handleDelete} startIcon={<EditIcon fontSize="small" />} fullWidth>
                                                Editar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Fragment> : views ?
                                <Grid item xs={8}>
                                    <AnimateButton>
                                        <Button color="error" variant="contained" onClick={handleDelete} startIcon={<HighlightOffIcon fontSize="small" />} fullWidth>
                                            {TitleButton.Eliminar}
                                        </Button>
                                    </AnimateButton>
                                </Grid> :
                                <Grid item xs={8}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleClick} startIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />} fullWidth>
                                            Agregar
                                        </Button>
                                    </AnimateButton>
                                </Grid>}
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
