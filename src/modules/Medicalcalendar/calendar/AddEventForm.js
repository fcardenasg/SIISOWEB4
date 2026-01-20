import PropTypes from 'prop-types';

import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    RadioGroup,
    Switch,
    TextField,
    Tooltip,
    Box,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


import _ from 'lodash';
import * as Yup from 'yup';


import ColorPalette from './ColorPalette';
import { gridSpacing } from 'store/constant';


import DateRangeIcon from '@mui/icons-material/DateRange';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import SelectOnChange from 'components/input/SelectOnChange';
import { GetAllBySubTipoCatalogo, GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import { useTheme } from '@mui/styles';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import useAuth from 'hooks/useAuth';
import Label from 'components/label';

const validationSchema = Yup.object().shape({
    idmotivo: Yup.string().required('El motivo es requerido'),
    idsubmotivo: Yup.string().required('EL submotivo es requerido')
});


const AddEventFrom = ({ event, listEvents, range, chosenDate, handleDelete, handleCreate, handleUpdate, onCancel }) => {

    const usuario = useAuth()

    const theme = useTheme();
    const isCreating = !event;
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [textMotivo, setTextMotivo] = useState('');
    const [lsCodigoMotivo, setLsCodigoMotivo] = useState([]);

    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [lsSubmotivo, setLsSubmotivo] = useState([]);
    const [atencion, setAtencion] = useState('');
    const [tipoAtencion, setTipoAtencion] = useState('');
    const [sede, setSede] = useState('');
    const [lsCodigoTipo, setLsCodigoTipo] = useState([]);
    const [lsTipoAtencion, setLsTipoAtencion] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [documento, setDocumento] = useState('');
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isFirstChange, setIsFirstChange] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (lsTipoAtencion.length > 0) {
            setTipoAtencion(lsTipoAtencion[0].value);
        }
    }, [lsTipoAtencion]);


    const backgroundColor = [
        {
            value: 'alta',
            label: 'Alta',
            color: '#FF0000'
        },
        {
            value: 'media',
            label: 'Media',
            color: '#0269ca'
        },
        {
            value: 'baja',
            label: 'Baja',
            color: '#219707'
        }
    ];

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            message: true,
            prioridad: 'alta'
        }
    });

    const {
        handleSubmit,
        reset,
        setValue,
        watch,
        isSubmitting,
        formState: { errors }
    } = methods;

    useEffect(() => {
        if (event) {
            setDocumento(event?.extendedProps?.empleado ?? '');
            getDocumento(event?.extendedProps?.empleado);
            setValue('message', event?.message ?? true);
            setValue('idempleado', event?.extendedProps?.empleado ?? null);
            setValue('prioridad', event?.extendedProps?.prioridad ?? 'alta');
            setTipoAtencion(event?.extendedProps?.idtipoatencion ?? null);
            setValue('idmotivo', event?.extendedProps?.idmotivo ?? null);
            setValue('idsubmotivo', event?.extendedProps?.idsubmotivo ?? null);
            setValue('descripcion', event?.extendedProps?.descripcion ?? '');
            setValue('message', event?.extendedProps?.message ?? false);
            setValue('whatsapp', event?.extendedProps?.whatsapp ?? false);
            setValue('email', event?.extendedProps?.email ?? false);
            setValue('fecha', event?.start ?? new Date());
        } else {
            setValue('fecha', chosenDate ?? new Date());
        }
    }, [event, chosenDate]);

    const values = watch();

    useEffect(() => {
        if (values.fecha) {
            const filtro = listEvents.find((item) => item.fecha == values.fecha);
        }
    }, [values.fecha]);

    const onSubmit = handleSubmit(async (datos) => {
        setIsLoading(true);

        datos.idempleado = documento;
        datos.idmedico = usuario?.user?.id?.toString();
        datos.idtipoatencion = tipoAtencion;

        try {
            if (event) {
                const response = await handleUpdate(event.id, datos);
            } else {
                const response = await handleCreate(datos);
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    });

    const handleClick = () => {
        navigate(
            '/app/MedicalAdvice?appId=24620e849c55400aad51c1da9141ac46&channel=rubikapp&tokenend=U2FsdGVkX1%2BEshk%2BQl44xbCzoILa18dKxPle7uTLoTcvubnJ%2FbwATgedn0oGYS35'
        );
    };

    useEffect(() => {
        getAll();
    }, [values.idmotivo]);

    async function getAll() {
        try {
            const lsServerTipoAtencion = await GetByTipoCatalogoCombo(CodCatalogo.TipoAtencion);
            setLsTipoAtencion(lsServerTipoAtencion.data);
            setLsCodigoTipo(lsServerTipoAtencion.data);

            const lsServerTipoAsesoria = await GetByTipoCatalogoCombo(CodCatalogo.ASME_TIPOASESORIA);
            setTipoAsesoria(lsServerTipoAsesoria.data);

            const lsServerMotivo = await GetByTipoCatalogoCombo(CodCatalogo.MotivoMedica);
            setLsMotivo(lsServerMotivo.data);

            setLsCodigoMotivo(lsServerMotivo.data);

            setLsAtencion([{ id: 0 }]);
        } catch (error) { }
    }

    useEffect(() => {
        if (values.idmotivo) {
            handleMotivo()
        }
    }, [values.idmotivo, lsCodigoMotivo])

    const handleMotivo = async () => {
        try {
            var lsResulCode = String(lsCodigoMotivo.filter(code => code.value === values?.idmotivo).map(code => code.codigo));
            var lsSubmotivo = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);

            if (lsSubmotivo.status === 200) {
                var submotivo = lsSubmotivo.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));

                setLsSubmotivo(submotivo);
            }

        } catch (error) { }
    }

    const handleChangeTipo = async (event) => {
        try {
            setAtencion('');
            setTipoAtencion(event.target.value);

            if (sede === DefaultValue.SEDE_PUERTO && event.target.value === DefaultValue.TIPO_ATENCION_ENFERMERIA) {

                var resultMapsTipoAM = [];
                var resultMapsTipoAE = [];
                /* AQUÍ SE CARGAN LAS ATENCIONES MÉDICAS */
                var lsGetTipoAtencionMedica = await GetAllBySubTipoCatalogo(0, 0, 'SER01', 5);

                if (lsGetTipoAtencionMedica.status === 200) {
                    resultMapsTipoAM = lsGetTipoAtencionMedica.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                }

                /* AQUÍ SE CARGAN LAS ATENCIONES DE ENFERMERIA */
                var lsResulCode = String(lsCodigoTipo.filter(code => code.value === event.target.value).map(code => code.codigo));

                var lsGetTipoAtencionEnfermeria = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);
                if (lsGetTipoAtencionEnfermeria.status === 200) {
                    resultMapsTipoAE = lsGetTipoAtencionEnfermeria.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                }

                const arrayAtencion = resultMapsTipoAE.concat(resultMapsTipoAM);
                setLsAtencion(arrayAtencion);

            } else {
                var lsResulCode = String(lsCodigoTipo.filter(code => code.value === event.target.value).map(code => code.codigo));

                var lsGetTipo = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);
                if (lsGetTipo.status === 200) {
                    var resultMapsTipo = lsGetTipo.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));

                    setLsAtencion(resultMapsTipo);
                }
            }
        } catch (error) { }
    };

    const getDocumento = async (documento) => {
        var lsServerEmployee = await GetByIdEmployee(documento);

        if (lsServerEmployee?.data.status === 200) {
            setLsEmployee(lsServerEmployee.data.data);
        } else {
            setLsEmployee(lsServerEmployee?.data.data);
            setOpenError(true);
            setErrorMessage(lsServerEmployee?.data.message);
        }
    }

    const handleDocumento = async (event) => {
        try {
            if (event?.target.value !== '') {
                setDocumento(event?.target.value);
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee?.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    } else {
                        setLsEmployee(lsServerEmployee?.data.data);
                        setOpenError(true);
                        setErrorMessage(lsServerEmployee?.data.message);
                    }
                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    }
                }
            } else setLsEmployee([]);

        } catch (error) { }
    }

    useEffect(() => {
    }, [isLoading])


    return (
        <FormProvider {...methods}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>

                <DialogTitle> <Typography variant="h4" fontWeight="bold">
                    {event ? 'Editar cita para asesoría médica' : 'Agendamiento de citas para asesorías médicas.'}
                </Typography></DialogTitle>
                <Divider />
                <DialogContent sx={{ p: 3 }}>
                    <Grid container spacing={gridSpacing}>

                        <Grid item xs={12}>
                            <ViewEmployee
                                title=""
                                key={lsEmployee?.documento}
                                documento={documento}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setDocumento(e.target.value);
                                }}
                                lsEmployee={lsEmployee}
                                handleDocumento={handleDocumento}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <SelectOnChange
                                name="idtipoatencion"
                                label="Tipo de Atención"
                                value={tipoAtencion}
                                disabled
                                options={lsTipoAtencion}
                                onChange={handleChangeTipo}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputSelect
                                name="idmotivo"
                                label="Motivo"
                                defaultValue=""
                                options={lsMotivo}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idmotivo}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputSelect
                                name="idsubmotivo"
                                label="Submotivo"
                                defaultValue=""
                                options={lsSubmotivo}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idsubmotivo}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Controller
                                name="fecha"
                                control={methods.control}
                                render={({ field }) => (
                                    <MobileDateTimePicker
                                        label="Fecha"
                                        value={field.value || new Date()}
                                        inputFormat="dd/MM/yyyy hh:mm a"
                                        onChange={(date) => {
                                            field.onChange(date);
                                        }}
                                        renderInput={(params) => (
                                            <Box sx={{ display: "flex" }}>
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    error={!!errors.start}
                                                    helperText={errors.start?.message}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <DateRangeIcon />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Box>

                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputText
                                name="descripcion"
                                label="Descripción"
                                multiline
                                rows={3}
                                defaultValue=""
                                bug={errors.description}
                            />
                        </Grid>

                        {event && (
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 2 }}>
                                <Typography variant="subtitle1">Url de conexión: </Typography>
                                {event.extendedProps?.idasesoria == 0 ? (

                                    <Box sx={{ display: 'inline-flex' }}>
                                        <Link to={`${event?.extendedProps?.url}&extraParam=${event.id}`}>Video llamada</Link>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'inline-flex' }}>
                                        <Label color="success">
                                            ha sido atendido
                                        </Label>
                                    </Box>
                                )}
                            </Grid>
                        )}

                        <Grid item xs={5.5} sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
                            <Typography variant="subtitle1">Prioridad</Typography>
                            <FormControl>
                                <Controller
                                    name="prioridad"
                                    control={methods.control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            row
                                            onChange={(event) => {
                                                field.onChange(event.target.value);
                                            }}
                                        >
                                            {backgroundColor.map((item, index) => (
                                                <ColorPalette key={index} value={item.value} color={item.color} label={item.label} />
                                            ))}
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <FormControl>
                                <Typography variant="subtitle1">Notificación</Typography>
                                <Box>
                                    <Controller
                                        name="message"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FormControlLabel
                                                control={<Switch {...field} disabled checked={field.value ?? false} color="primary" />}
                                                label="Mensaje texto"
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="whatsapp"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FormControlLabel
                                                control={<Switch {...field} checked={field.value ?? false} color="success" />}
                                                label="Whatsapp"
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="email"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FormControlLabel
                                                control={<Switch {...field} checked={field.value ?? false} color="secondary" />}
                                                label="Correo"
                                            />
                                        )}
                                    />
                                </Box>
                            </FormControl>
                        </Grid>

                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            {!isCreating && (
                                <Button type="button" variant="contained" color="error" onClick={() => handleDelete(event.id)}>
                                    Eliminar
                                </Button>
                            )}
                        </Grid>
                        <Grid item>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Button type="button" variant="outlined" onClick={onCancel}>
                                    Cerrar
                                </Button>
                                {event ? (
                                    <Button disabled={event?.extendedProps?.idasesoria !== null && event?.extendedProps?.idasesoria !== 0 || isLoading}
                                        onClick={onSubmit} type="submit" variant="contained" >
                                        {isLoading ? "Guardando..." : event ? "Editar" : "Guardar"}
                                    </Button>
                                ) :
                                    <Button disabled={isLoading}
                                        onClick={onSubmit} type="submit" variant="contained" >
                                        {isLoading ? "Guardando..." : event ? "Editar" : "Guardar"}
                                    </Button>
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogActions>

            </LocalizationProvider>
        </FormProvider>
    );
};



export default AddEventFrom;
