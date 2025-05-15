import {
    Box,
    Button,
    Divider,
    Grid,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { InsertProgramacionOrdenes } from 'api/clients/ProgramacionOrdenesClient';
import SelectFilterOptions from 'assets/img/selectfilteroptions.json';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { CodCatalogo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputDatePick from 'components/input/InputDatePick';
import { InputSelectAutocompleteControl } from 'components/input/InputSelectAutocomplete';
import SelectOnChange from 'components/input/SelectOnChange';
import AnimateComponent from 'components/loading/AnimateComponent';
import { useBoolean } from 'hooks/use-boolean';
import Lottie from 'lottie-react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ListDetailMassive from './ListDetailMassive';

const validationSchema = yup.object().shape({
    idTipoAsesoria: yup.string().required(ValidationMessage.Requerido),
    idCausa: yup.string().required(ValidationMessage.Requerido),
    idMotivo: yup.string().required(ValidationMessage.Requerido),
    idEstadoCaso: yup.string().required(ValidationMessage.Requerido),
});

const MassiveMessageScheduling = () => {
    const navigate = useNavigate();
    const validateSave = useBoolean(true);

    const [valueGes, setValueGes] = useState(null);
    const [tipoExamenLaboral, setTipoExamenLaboral] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [lsGes, setLsGes] = useState([]);
    const [lsTipoExamenLaboral, setLsTipoExamenLaboral] = useState([]);
    const [lsOrdenesParaclinicos, setLsOrdenesParaclinicos] = useState([]);

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function getAll() {
        try {
            const lsServerMotivo = await GetByTipoCatalogoCombo(CodCatalogo.Ges);
            setLsGes(lsServerMotivo.data);

            const lsServerTipoExamen = await GetByTipoCatalogoCombo(CodCatalogo.LABORATORIO_ORDENES_PARACLINICOS);
            setLsTipoExamenLaboral(lsServerTipoExamen.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleClick = async () => {
        try {
            if (!tipoExamenLaboral) {
                setErrorMessage("Debe elegir un tipo de examen laboral para los empleados");
                setOpenError(true);
                return;
            }

            const modeldata = {
                tipoProgramacion: "masiva",
                idGes: parseInt(valueGes.value),
                detalle: lsOrdenesParaclinicos,
                idTipoExamenLaboral: tipoExamenLaboral
            }

            const response = await InsertProgramacionOrdenes(modeldata);
            if (response.data.exito) {
                setOpenSuccess(true);
            } else {
                setErrorMessage(response.data.mensaje);
                setOpenError(true);
            }
        } catch (error) {
            setErrorMessage(`${error}`);
            setOpenError(true);
        }
    };

    return (
        <FormProvider {...methods}>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container justifyContent="left" alignItems="center" spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <InputSelectAutocompleteControl
                        label="GES"
                        onChange={(event, newValue) => setValueGes(newValue)}
                        value={valueGes}
                        options={lsGes}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <InputDatePick
                        label="Fecha de inicio"
                        value={fechaInicio}
                        onChange={(e) => {
                            const newValue = e.target.value || null;
                            setFechaInicio(newValue);
                            if (!newValue) {
                                setFechaFin(null);
                            }
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <InputDatePick
                        label="Fecha fin"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value || null)}
                    />
                </Grid>

                <Grid sx={{ my: 1.5 }} item xs={12}><Divider /></Grid>

                {valueGes || fechaInicio || fechaFin ?
                    <>
                        <Grid item xs={12}>
                            <AnimateComponent>
                                <SelectOnChange
                                    maxWidth="1100px"
                                    name="tipoExamenLaboral"
                                    label="Tipo de examen laboral"
                                    options={lsTipoExamenLaboral}
                                    value={tipoExamenLaboral}
                                    onChange={(e) => setTipoExamenLaboral(e.target.value)}
                                />
                            </AnimateComponent>
                        </Grid>

                        <Grid item xs={12}>
                            <AnimateComponent>
                                <MainCard title="Listado de empleados">
                                    <ListDetailMassive
                                        setLsOrdenesParaclinicos={setLsOrdenesParaclinicos}
                                        lsOrdenesParaclinicos={lsOrdenesParaclinicos}
                                        valueGes={valueGes}
                                        fechaInicio={fechaInicio}
                                        fechaFin={fechaFin}
                                        validateSave={validateSave}
                                    />
                                </MainCard>
                            </AnimateComponent>
                        </Grid>
                    </> :
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Box sx={{ width: '260px', height: '260px' }}>
                                    <Lottie animationData={SelectFilterOptions} />
                                </Box>
                            </Grid>

                            <Grid item xs>
                                <Typography variant="h3">Instrucciones para Filtrado de Registros de Empleados</Typography>
                                <Divider sx={{ my: 1.5 }} />
                                <Typography variant="body1">
                                    Para optimizar la búsqueda de registros de empleados en el sistema, se recomienda seguir los siguientes pasos al aplicar filtros:
                                    <ol>
                                        <li><strong>Selección de GES:</strong> Elija uno de los Grupo de Exposición Similar (GES) como parámetro principal para realizar la búsqueda.</li>
                                        <li><strong>Filtrado por Fecha:</strong> Si es necesario, seleccione un rango de fechas específico para limitar su búsqueda. Alternativamente, puede optar por buscar registros de una fecha en particular.</li>
                                        <li><strong>Visualización de Resultados:</strong> Una vez que haya aplicado los filtros deseados, se generará automáticamente una lista de empleados que cumplen con los criterios seleccionados.</li>
                                    </ol>
                                    Este enfoque garantiza una búsqueda más eficiente y precisa dentro del sistema, facilitando la gestión de los registros de empleados.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Grid>

            <Grid container spacing={2} sx={{ pt: (valueGes || fechaInicio || fechaFin) && 4 }}>
                <Grid item xs={6} md={4} lg={2}>
                    <AnimateButton>
                        <Button disabled={validateSave.value} variant="contained" fullWidth onClick={handleClick}>
                            Programar órdenes
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={6} md={4} lg={2}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => navigate("/programming/view")}>
                            {TitleButton.Cancelar}
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default MassiveMessageScheduling;