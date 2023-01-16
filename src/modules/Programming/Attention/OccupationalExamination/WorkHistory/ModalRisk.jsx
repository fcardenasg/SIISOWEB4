import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';

import { CodCatalogo, TitleButton } from 'components/helpers/Enums';
import Chip from 'ui-component/extended/Chip';

import {
    Button,
    Dialog,
    Typography,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
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
import userImg from 'assets/img/user.png';
import { PutWorkHistoryRiskDLTD } from 'formatdata/WorkHistoryRiskForm';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import InputMultiSelects from 'components/input/InputMultiSelects';
import SelectOnChange from 'components/input/SelectOnChange';

const ModalRisk = ({ open = false, diferen, onClose, getAll, getSumaRiesgo, idRisk, title }) => {

    const { user } = useAuth();
    const methods = useForm();
    const { handleSubmit, reset } = methods;

    const [gradoConEPP, setGradoConEPP] = useState('');
    const [gradoSinEPP, setGradoSinEPP] = useState('');

    const [row, setRow] = useState([]);
    const [medicaControl, setMedicaControl] = useState([]);
    const [lsMedidasControl, setLsMedidasControl] = useState([]);
    const [lsGradoConSinEPP, setLsGradoConSinEPP] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [timeWait, setTimeWait] = useState(false);

    useEffect(() => {
        async function getAllRisk() {
            try {
                if (idRisk !== 0) {
                    const lsServerMedidasControl = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PANO_MEDIDASCONTROL);
                    var lsResultMedidasControl = lsServerMedidasControl.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                    setLsMedidasControl(lsResultMedidasControl);

                    const lsServerGradoConSinEPP = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PANO_GRADO_CONSINEPP);
                    var lresultGradoConSinEPP = lsServerGradoConSinEPP.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                    setLsGradoConSinEPP(lresultGradoConSinEPP);

                    if (diferen == "DLTD") {
                        const lsServerRisk1 = await GetByIdWorkHistoryRisk(idRisk);
                        if (lsServerRisk1.status === 200) {
                            setRow(lsServerRisk1.data);
                            setMedicaControl(JSON.parse(lsServerRisk1.data.medidasControl));

                            setGradoConEPP(lsServerRisk1.data.gradoConEPP);
                            setGradoSinEPP(lsServerRisk1.data.gradoSinEPP);
                        }
                    }

                    if (diferen == "COMPANY") {
                        const lsServerRisk2 = await GetByIdWorkHistoryRiskCompany(idRisk);
                        if (lsServerRisk2.status === 200) {
                            setRow(lsServerRisk2.data);
                        }
                    }
                }
            } catch (error) { }
        }

        getAllRisk();
    }, [idRisk]);

    const handleClick = async (datos) => {
        try {
            const DataToInsertCOMPANY = PutWorkHistoryRiskDLTD(idRisk, row.idHistoriaLaboral, row.fecha, row.documento, row.idRiesgo,
                row.idCargo, row.idClase, row.idExposicion, row.gradoSinEPP, row.gradoConEPP, row.medidasControl, datos.anio, datos.mes,
                row.usuarioRegistro, row.fechaRegistro, user.email, FormatDate(new Date()));

            const DataToInsertDLTD = PutWorkHistoryRiskDLTD(idRisk, row.idHistoriaLaboral, row.fecha, row.documento, row.idRiesgo,
                row.idCargo, row.idClase, row.idExposicion, gradoSinEPP, gradoConEPP, JSON.stringify(medicaControl), datos.anio, datos.mes,
                row.usuarioRegistro, row.fechaRegistro, user.email, FormatDate(new Date()));

            if (diferen === "DLTD") {
                const result1 = await UpdateWorkHistoryRisks(DataToInsertDLTD);
                if (result1.status === 200) {
                    getAll();
                    getSumaRiesgo();
                    reset();
                    setOpenUpdate(true);
                }
            }

            if (diferen === "COMPANY") {
                const result2 = await UpdateWorkHistoryRisksCompany(DataToInsertCOMPANY);
                if (result2.status === 200) {
                    getAll();
                    getSumaRiesgo();
                    reset();
                    setOpenUpdate(true);
                }
            }
        } catch (error) { }
    }

    setTimeout(() => {
        if (row.length !== 0)
            setTimeWait(true);
    }, 2000);

    return (
        <Fragment>
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />

            <Dialog
                open={open}
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
                            {timeWait ?
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
                                                    {diferen === "COMPANY" ? row.idCargo : row.nameCargo}
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                    </List>

                                    <Grid sx={{ pt: 2 }} container spacing={2}>
                                        {diferen === "COMPANY" ? null :
                                            <Fragment>
                                                <Grid item xs={6}>
                                                    <FormProvider {...methods}>
                                                        <SelectOnChange
                                                            name="gradoSinEPP"
                                                            label="Grado sin EPP"
                                                            onChange={(e) => setGradoSinEPP(e.target.value)}
                                                            value={gradoSinEPP}
                                                            options={lsGradoConSinEPP}
                                                            size="small"
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <FormProvider {...methods}>
                                                        <SelectOnChange
                                                            name="gradoConEPP"
                                                            label="Grado con EPP"
                                                            onChange={(e) => setGradoConEPP(e.target.value)}
                                                            value={gradoConEPP}
                                                            options={lsGradoConSinEPP}
                                                            size="small"
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <InputMultiSelects
                                                        fullWidth
                                                        onChange={(event, value) => setMedicaControl(value)}
                                                        value={medicaControl}
                                                        label="Medidas de control"
                                                        options={lsMedidasControl}
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Fragment>
                                        }

                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    name="anio"
                                                    label="Año"
                                                    size="small"
                                                />
                                            </FormProvider>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    name="mes"
                                                    label="Mes"
                                                    size="small"
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
                        <Button variant="contained" onClick={handleSubmit(handleClick)}>
                            {TitleButton.Guardar}
                        </Button>
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
    getSumaRiesgo: PropTypes.func,
    getAll: PropTypes.func,
};
