import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

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
    useMediaQuery,
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
import { UpdateWorkHistoryRisks } from 'api/clients/WorkHistoryRiskClient';
import useAuth from 'hooks/useAuth';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdWorkHistoryRisk } from 'api/clients/WorkHistoryRiskClient';
import Avatar from 'ui-component/extended/Avatar';
import SubCard from 'ui-component/cards/SubCard';
import Cargando from 'components/loading/Cargando';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import user from 'assets/img/user.png';
import { PutWorkHistoryRiskDLTD } from 'formatdata/WorkHistoryRiskForm';

const ViewInfo = ({ row }) => {

    return (
        <Fragment>
            <SubCard
                title={
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Chip chipcolor="success" label={row.nameAtencion} size="small" />
                        </Grid>
                        <Grid item>
                            <Avatar size="sm" alt="Foto Empleado" src={row.empleadoFoto != null ? row.empleadoFoto : user} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" variant="h4">
                                {row.nameRiesgo}
                            </Typography>
                            <Typography align="left" variant="h7">
                                {row.nameClase}
                            </Typography>
                        </Grid>
                    </Grid>
                }
            >
                <List component="nav">
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
            </SubCard>
        </Fragment>
    );
}

ViewInfo.propTypes = {
    row: PropTypes.array,
};

const ModalRisk = ({ open = false, onClose, getAll, idRisk, title }) => {
    let openRisk = open;

    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    const [row, setRow] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);

    useEffect(() => {
        async function GetAll() {
            try {
                if (idRisk !== 0) {
                    const lsServerRisk = await GetByIdWorkHistoryRisk(idRisk);
                    if (lsServerRisk.status === 200)
                        setRow(lsServerRisk.data);
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
                const result = await UpdateWorkHistoryRisks(DataToInsert);
                if (result.status === 200) {
                    openRisk = false;
                    setOpenUpdate(true);
                    reset();
                    getAll();
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
                            {row.length != 0 ? <ViewInfo row={row} key={idRisk} /> : <Cargando />}
                        </Grid>
                        {row.length != 0 ? <>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        disabled={row.length != 0 ? false : true}
                                        defaultValue=""
                                        name="anio"
                                        label="Año"
                                        size={matchesXS ? 'small' : 'medium'}
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
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid></> : <></>
                        }
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <AnimateButton>
                        <Button variant="contained" onClick={handleSubmit(handleClick)}>{TitleButton.Guardar}</Button>
                    </AnimateButton>

                    <AnimateButton>
                        <Button variant="text" onClick={onClose}>
                            {TitleButton.Cerrar}
                        </Button>
                    </AnimateButton>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

ModalRisk.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    idRisk: PropTypes.number,
    onClose: PropTypes.func,
    getAll: PropTypes.func,
};

export default ModalRisk;