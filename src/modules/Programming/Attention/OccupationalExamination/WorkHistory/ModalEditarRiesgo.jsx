import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';

import { CodCatalogo, TitleButton } from 'components/helpers/Enums';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    useMediaQuery,
} from '@mui/material';
import InputText from 'components/input/InputText';
import { FormProvider, useForm } from 'react-hook-form';
import AnimateButton from 'ui-component/extended/AnimateButton';

import { MessageUpdate } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import Cargando from 'components/loading/Cargando';
import InputSelect from 'components/input/InputSelect';
import { useTheme } from '@mui/material/styles';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetByIdWorkHistoryOtherCompany, UpdateWorkHistoryOtherCompanys } from 'api/clients/WorkHistoryOtherCompany';
import { PutWorkHistoryDLTD, PutWorkHistoryEmpresa } from 'formatdata/WorkHistoryForm';
import { GetByIdWorkHistory, UpdateWorkHistorys } from 'api/clients/WorkHistoryClient';
import { FormatDate } from 'components/helpers/Format';

const ModalEditarRiesgo = ({ open = false, diferen, onClose, idRisk, title, getAllWorkHistory }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const { user } = useAuth();
    const methods = useForm();
    const { handleSubmit } = methods;

    const [lsWorkHistory, setLsWorkHistory] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [timeWait, setTimeWait] = useState(false);

    useEffect(() => {
        async function getAllRisk() {
            try {
                const lsServerCargo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RosterPosition);
                var resultCargo = lsServerCargo.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsCargo(resultCargo);

                if (diferen === "COMPANY") {
                    const lsServerWorkHistoryOC = await GetByIdWorkHistoryOtherCompany(idRisk);
                    setLsWorkHistory(lsServerWorkHistoryOC.data);
                }

                if (diferen === "DLTD") {
                    const lsServerWorkHistoryDrumm = await GetByIdWorkHistory(idRisk);
                    setLsWorkHistory(lsServerWorkHistoryDrumm.data);
                }

            } catch (error) { }
        }

        getAllRisk();
    }, [idRisk]);

    const handleClick = async (datos) => {
        try {
            const DataToInsertCOMPANY = PutWorkHistoryEmpresa(idRisk, lsWorkHistory.fecha, lsWorkHistory.idAtencion, lsWorkHistory.documento,
                datos.empresa, datos.cargo, datos.anio, datos.meses, lsWorkHistory.usuarioRegistro, lsWorkHistory.fechaRegistro,
                user.nameuser, FormatDate(new Date()));

            const DataToInsertDLTD = PutWorkHistoryDLTD(idRisk, lsWorkHistory.fecha, lsWorkHistory.idAtencion, lsWorkHistory.documento,
                lsWorkHistory.idEmpresa, datos.idCargo, datos.anio, datos.meses,
                lsWorkHistory.usuarioRegistro, lsWorkHistory.fechaRegistro, user.nameuser, FormatDate(new Date()));

            if (diferen === "DLTD") {
                const result1 = await UpdateWorkHistorys(DataToInsertDLTD);
                if (result1.status === 200) {
                    getAllWorkHistory();
                    setOpenUpdate(true);
                }
            }

            if (diferen === "COMPANY") {
                const result2 = await UpdateWorkHistoryOtherCompanys(DataToInsertCOMPANY);
                if (result2.status === 200) {
                    getAllWorkHistory();
                    setOpenUpdate(true);
                }
            }


        } catch (error) { }
    }

    setTimeout(() => {
        if (lsWorkHistory.length !== 0)
            setTimeWait(true);
    }, 1500);

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
                                <SubCard title={lsWorkHistory.empresa !== undefined ? lsWorkHistory.empresa : 'Drummond'}>
                                    <Grid sx={{ pt: 2 }} container spacing={2}>
                                        {diferen === 'DLTD' ?
                                            <Grid item xs={12}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idCargo"
                                                        label="Cargo"
                                                        defaultValue={lsWorkHistory.idCargo}
                                                        options={lsCargo}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid> : null
                                        }

                                        {diferen === 'COMPANY' ?
                                            <Fragment>
                                                <Grid item xs={12}>
                                                    <FormProvider {...methods}>
                                                        <InputText
                                                            defaultValue={lsWorkHistory.empresa}
                                                            fullWidth
                                                            name="empresa"
                                                            label="Empresa"
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <FormProvider {...methods}>
                                                        <InputText
                                                            defaultValue={lsWorkHistory.cargo}
                                                            fullWidth
                                                            name="cargo"
                                                            label="Cargo"
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>
                                            </Fragment> : null
                                        }

                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    defaultValue={lsWorkHistory.anio}
                                                    fullWidth
                                                    name="anio"
                                                    label="Año"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    defaultValue={lsWorkHistory.meses}
                                                    fullWidth
                                                    name="meses"
                                                    label="Meses"
                                                    size={matchesXS ? 'small' : 'medium'}
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

export default ModalEditarRiesgo;

ModalEditarRiesgo.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    diferen: PropTypes.string,
    idRisk: PropTypes.number,
    onClose: PropTypes.func,
};