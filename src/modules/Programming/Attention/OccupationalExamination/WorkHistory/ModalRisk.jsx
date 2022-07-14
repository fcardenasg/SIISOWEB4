import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';

import { TitleButton } from 'components/helpers/Enums';
import Chip from 'ui-component/extended/Chip';

import {
    Button,
    Dialog,
    Typography,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material';
import InputText from 'components/input/InputText';
import { FormProvider, useForm } from 'react-hook-form';
import AnimateButton from 'ui-component/extended/AnimateButton';

import { MessageUpdate } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdWorkHistoryRisk, GetByIdWorkHistoryRiskCompany, UpdateWorkHistoryRisks, UpdateWorkHistoryRisksCompany } from 'api/clients/WorkHistoryRiskClient';
import Avatar from 'ui-component/extended/Avatar';
import SubCard from 'ui-component/cards/SubCard';
import Cargando from 'components/loading/Cargando';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import userImg from 'assets/img/user.png';
import { PutWorkHistoryRiskDLTD } from 'formatdata/WorkHistoryRiskForm';

const ModalRisk = ({ open = false, diferen, onClose, getAll, idRisk, title }) => {
    let openRisk = open;

    const { user } = useAuth();
    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    const [row, setRow] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);

    useEffect(() => {
        async function GetAll() {
            try {
                if (idRisk !== 0) {
                    if (diferen == "DLTD") {
                        const lsServerRisk = await GetByIdWorkHistoryRisk(idRisk);
                        if (lsServerRisk.status === 200)
                            setRow(lsServerRisk.data);
                    }

                    if (diferen == "COMPANY") {
                        const lsServerRisk = await GetByIdWorkHistoryRiskCompany(idRisk);
                        if (lsServerRisk.status === 200)
                            setRow(lsServerRisk.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [idRisk]);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PutWorkHistoryRiskDLTD(idRisk, row.idHistoriaLaboral, row.fecha, row.documento, row.idRiesgo,
                row.idCargo, row.idClase, row.idExposicion, row.gradoSinEPP, row.gradoConEPP, row.medidasControl, datos.anio, datos.mes,
                row.usuarioRegistro, row.fechaRegistro, user.email, FormatDate(new Date()));

            if (DataToInsert) {
                if (diferen == "DLTD") {
                    const result = await UpdateWorkHistoryRisks(DataToInsert);
                    if (result.status === 200) {
                        openRisk = false;
                        setOpenUpdate(true);
                        reset();
                        getAll();
                    }
                }

                if (diferen == "COMPANY") {
                    const result = await UpdateWorkHistoryRisksCompany(DataToInsert);
                    if (result.status === 200) {
                        openRisk = false;
                        setOpenUpdate(true);
                        reset();
                        getAll();
                    }
                }
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />

            <Dialog
                open={openRisk}
                onClose={onClose}
                sx={{
                    '&>div:nth-child(3)': {
                        '&>div': {
                            maxWidth: 400
                        }
                    }
                }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ my: 0 }}>
                        <Grid item xs={12}>
                            {row.length != 0 ?
                                <SubCard
                                    title={
                                        <Grid container spacing={1} alignItems="center">
                                            <Grid item xs={12}>
                                                <Chip chipcolor="success" label={row.nameAtencion} size="small" />
                                            </Grid>
                                            <Grid item>
                                                <Avatar size="sm" alt="Foto Empleado" src={row.empleadoFoto != null ? row.empleadoFoto : userImg} />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" variant="h4">
                                                    {row.nameRiesgo}
                                                </Typography>

                                                <Typography align="left" variant="caption">
                                                    {row.nameClase}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    }
                                >
                                    <List component="div">
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <AccountBoxIcon sx={{ fontSize: '1.3rem' }} />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="subtitle1">Cargo</Typography>} />
                                            <ListItemSecondaryAction>
                                                <Typography variant="subtitle2" align="right">
                                                    {row.nameCargo}
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>

                                        <Divider />
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <AccessibilityNewIcon sx={{ fontSize: '1.3rem' }} />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="subtitle1">Exposición</Typography>} />
                                            <ListItemSecondaryAction>
                                                <Typography variant="subtitle2" align="right">
                                                    {row.nameExpocision}
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <VerifiedUserIcon sx={{ fontSize: '1.3rem' }} />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="subtitle1">Grado Con EPP</Typography>} />
                                            <ListItemSecondaryAction>
                                                <Chip chipcolor={row.nameGradoConEPP === 'BAJO' ? 'success' :
                                                    row.nameGradoConEPP === 'MEDIO' ? 'warning' :
                                                        row.nameGradoConEPP === 'CRITICO' ? 'error' : 'error'} label={row.nameGradoConEPP} size="small" />
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <RemoveModeratorIcon sx={{ fontSize: '1.3rem' }} />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="subtitle1">Grado Sin EPP</Typography>} />
                                            <ListItemSecondaryAction>
                                                <Chip chipcolor={row.nameGradoSinEPP === 'BAJO' ? 'success' :
                                                    row.nameGradoSinEPP === 'MEDIO' ? 'warning' :
                                                        row.nameGradoSinEPP === 'CRITICO' ? 'error' : 'error'} label={row.nameGradoSinEPP} size="small" />
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                    </List>

                                    <Grid sx={{ pt: 2 }} container spacing={2}>
                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    disabled={row.length != 0 ? false : true}
                                                    defaultValue=""
                                                    name="anio"
                                                    label="Año"
                                                    size="small"
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    disabled={row.length != 0 ? false : true}
                                                    defaultValue=""
                                                    name="mes"
                                                    label="Mes"
                                                    size="small"
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </Grid>
                                    </Grid>
                                </SubCard> : <Cargando />
                            }
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <AnimateButton>
                        <Button variant="contained" onClick={handleSubmit(handleClick)}>{TitleButton.Guardar}</Button>
                    </AnimateButton>

                    <AnimateButton>
                        <Button variant="text" onClick={onClose}>
                            {TitleButton.Cancelar}
                        </Button>
                    </AnimateButton>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default ModalRisk;

ModalRisk.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    diferen: PropTypes.string,
    idRisk: PropTypes.number,
    onClose: PropTypes.func,
    getAll: PropTypes.func,
};
