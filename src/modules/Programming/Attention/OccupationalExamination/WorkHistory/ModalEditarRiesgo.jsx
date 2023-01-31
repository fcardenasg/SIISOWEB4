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

const ModalEditarRiesgo = ({ open = false, diferen, onClose, idRisk, title }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const { user } = useAuth();
    const methods = useForm();
    const { handleSubmit } = methods;

    const [lsRiesgos, setLsRiesgos] = useState([]);
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

                }

            } catch (error) { }
        }

        getAllRisk();
    }, [idRisk]);

    const handleClick = async (datos) => {
        try {

        } catch (error) { }
    }

    setTimeout(() => {
        if (lsRiesgos.length !== 0)
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
                                <SubCard>
                                    <Grid sx={{ pt: 2 }} container spacing={2}>
                                        <Grid item xs={3.5}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idCargo"
                                                    label="Cargo"
                                                    defaultValue=""
                                                    options={lsCargo}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    defaultValue=""
                                                    fullWidth
                                                    name="anio"
                                                    label="Año"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    defaultValue=""
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
