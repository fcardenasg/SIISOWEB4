// Import de Material-ui
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Divider,
    Typography
} from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { IconReportMedical } from '@tabler/icons';

import InputMultiSelects from 'components/input/InputMultiSelects';
import SelectOnChange from 'components/input/SelectOnChange';
import { FormatDate } from 'components/helpers/Format';
import InputCheckBox from 'components/input/InputCheckBox';
import SubCard from 'ui-component/cards/SubCard';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertQuestionnaire, UpdateQuestionnaires } from 'api/clients/QuestionnaireClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { GetAllCatalog, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { PostQuestionnaire } from 'formatdata/QuestionnaireForm';
import { GetByIdQuestionnaire } from 'api/clients/QuestionnaireClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, CodCatalogo, TitleButton } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputCheck from 'components/input/InputCheck';
import InputOnChange from 'components/input/InputOnChange';

const DashboardQuestionnaire = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { user } = useAuth();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [company, setCompany] = useState([]);
    const [lsQuestionnaire, setLsQuestionnaire] = useState([]);
    const [lsRefuerzo, setLsRefuerzo] = useState([]);

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [refuerzo, setRefuerzo] = useState('');
    const [observacionVacuna, setObservacionVacuna] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState(73);
    const [documento, setDocumento] = useState('');
    const [btnReport, setBtnReport] = useState(false);
    const [vacunas, setVacunas] = useState([]);
    const [lsVacunas, setLsVacunas] = useState([]);

    const [ocultarBoton, setOcultarBoton] = useState(false);
    const [noSymptoms, setNoSymptoms] = useState(false);
    const [vacunado, setVacunado] = useState(false);

    const handleDocument = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    const documento = event?.target.value;

                    var lsQuestionnaire = await GetByIdQuestionnaire(documento);

                    if (lsQuestionnaire.status === 200) {
                        setLsQuestionnaire(lsQuestionnaire.data);
                        setDocumento(lsQuestionnaire.data.documento)
                        setNombre(lsQuestionnaire.data.nombre);
                        setTelefono(lsQuestionnaire.data.telefono);
                        setEmail(lsQuestionnaire.data.email);
                        setEmpresa(lsQuestionnaire.data.empresa);
                        setNoSymptoms(lsQuestionnaire.data.sintomasNoSi);
                        setVacunado(lsQuestionnaire.data.vacunado);
                        setVacunas(JSON.parse(lsQuestionnaire.data.vacunas));
                        setRefuerzo(lsQuestionnaire.data.refuerzo);
                        setObservacionVacuna(lsQuestionnaire.data.observacionVacuna);
                    }
                } else {
                    setErrorMessage('Por favor, ingrese su número de documento');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClearController = () => {
        setNombre('');
        setTelefono('');
        setEmail('');
        setDocumento('');
        setEmpresa('');
        setBtnReport(false);
        setNoSymptoms(false);
        setLsQuestionnaire([]);
    }

    const methods = useForm();
    /* resolver: yupResolver(validationSchema), */

    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const lsServerCompany = await GetAllCompany(0, 0);
            var resultCompany = lsServerCompany.data.entities.map((item) => ({
                value: item.codigo,
                label: item.descripcionSpa
            }));
            setCompany(resultCompany);

            const lsServerRefuerzo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_REFUERZO);
            var resultRefuerzo = lsServerRefuerzo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRefuerzo(resultRefuerzo);

            const lsServerVacunas = await GetAllByTipoCatalogo(0, 0, CodCatalogo.VACUNAS);
            var resultVacunas = lsServerVacunas.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsVacunas(resultVacunas);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = () => {
        if (documento === "" && lsQuestionnaire.length != 0) {
            setErrorMessage('Por favor, ingrese su número de documento');
        } else { setBtnReport(true); setOcultarBoton(true); }
    }

    const handleClickSubmit = async (datos) => {
        try {
            const name = datos.nombre != "" ? datos.nombre : nombre;
            const phone = datos.telefono != "" ? datos.telefono : telefono;
            const mail = datos.email != "" ? datos.nombre : email;
            const company = datos.empresa != "" ? datos.empresa : empresa;

            const InsertToData = PostQuestionnaire(documento, name, phone, mail, company, noSymptoms, vacunado, JSON.stringify(vacunas),
                refuerzo, observacionVacuna, user.email, FormatDate(new Date()), user.email, FormatDate(new Date())
            );

            if (lsQuestionnaire.length !== 0) {
                if (Object.keys(datos.length !== 0)) {
                    const result = await UpdateQuestionnaires(InsertToData);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                        reset();
                        handleClearController();
                        setOcultarBoton(false);
                    }
                } else {
                    setErrorMessage('Hubo un error al guardar los Datos');
                }
            } else {
                if (Object.keys(datos.length !== 0)) {
                    const result = await InsertQuestionnaire(InsertToData);
                    if (result.status === 200) {
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: `${Message.Guardar}`,
                            variant: 'alert',
                            alertSeverity: 'success',
                            close: false,
                            transition: 'SlideUp'
                        })
                        reset();
                        handleClearController();
                        setOcultarBoton(false);
                    }
                } else {
                    setErrorMessage('Hubo un error al guardar los Datos');
                }

            }
        } catch (error) {
            setErrorMessage('No se pudo guardar el registro');
        }
    }

    return (
        <MainCard title="Cuestionario De Salud">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid xs={12} sx={{ pt: 3 }}>
                <form onSubmit={handleSubmit(handleClickSubmit)}>

                    <Grid container spacing={1} sx={{ pb: 4 }}>

                    <Grid item xs={12} md={4}>
                            <InputOnChange
                                label="N° Documento"
                                onKeyDown={handleDocument}
                                onChange={(e) => setDocumento(e?.target.value)}
                                value={documento}
                                size={matchesXS ? 'small' : 'medium'}
                                required={true}
                                helperText="Por favor, dar Enter"
                                autoFocus
                            />
                        </Grid>

                        {lsQuestionnaire.length === 0 ? (
                            <>
                              <Grid item xs={12} md={4}>
                               
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="nombre"
                                            label="Apellidos y Nombres"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                             
                                </Grid>

                                <Grid item xs={12} md={4}>
                        
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="telefono"
                                            label="Teléfono"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                          
                                </Grid>

                                <Grid item xs={12} md={4}>
                          
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                            
                                </Grid>
                                <Grid item xs={12} md={4}>
                   
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="empresa"
                                            label="Empresa"
                                            defaultValue=""
                                            options={company}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                       
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={12} md={4}>
                            
                                    <InputOnChange
                                        label="Apellidos y Nombres"
                                        onChange={(e) => setNombre(e?.target.value)}
                                        value={nombre}
                                        size={matchesXS ? 'small' : 'medium'}
                                        required={true}
                                        disabled
                                    />
                                </Grid>
                                
                                <Grid item xs={12} md={4}>
                                    <InputOnChange
                                        label="Teléfono"
                                        onChange={(e) => setTelefono(e?.target.value)}
                                        value={telefono}
                                        size={matchesXS ? 'small' : 'medium'}
                                        required={true}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputOnChange
                                        label="Email"
                                        onChange={(e) => setEmail(e?.target.value)}
                                        value={email}
                                        size={matchesXS ? 'small' : 'medium'}
                                        required={true}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectOnChange
                                        name="empresa"
                                        label="Empresa"
                                        value={empresa}
                                        options={company}
                                        onChange={(e) => setEmpresa(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                        disabled
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>

                    <Divider />

                    <Grid sx={{ pt: 2 }} container justifyContent="left" alignItems="center">
                        <IconReportMedical size={20} />
                        <Typography sx={{ pt: 1.5, pb: 1 }} align="left" variant="body2">
                            Estamos comprometidos con la salud de todos los trabajadores y colaboradores de <b>Drummond LTD</b>
                        </Typography>
                    </Grid>

                    <Typography sx={{ pt: 3 }} align="letf" variant="caption">
                        Nos interesa saber cómo te sientes, por favor recuerda reportar tu estado de salud todos los días
                    </Typography>

                    {ocultarBoton ? (<></>) : (
                        <Grid item xs={12} sx={{ pb: 2, pt: 5 }}>
                            <Grid container justifyContent="center" alignItems="center" spacing={1}>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleClick} fullWidth>
                                        Registrar declaración de salud
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>)}

                    {btnReport ?
                        (
                               <Grid item xs={12}>
                              <SubCard title="DECLARACIÓN DE SALUD">
                                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <InputCheck
                                        label="Presenta síntomas"
                                        size={40}
                                        checked={noSymptoms}
                                        onChange={(event) => setNoSymptoms(event.target.checked)}
                                    />
                                </Grid>


                                {noSymptoms ? (
                                <Grid item xs={12}>
                                                    <InputOnChange
                                                        label="Cuales síntomas"
                                                        onChange={(e) => setObservacionVacuna(e?.target.value)}
                                                        value={observacionVacuna}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                ) : (<></>)}

                                <Grid item xs={6}>
                                    <InputCheck
                                        label="Vacunado"
                                        size={40}
                                        checked={vacunado}
                                        onChange={(event) => setVacunado(event.target.checked)}
                                    />
                                </Grid>
                                </Grid>
                                        </SubCard>
                    

                                {vacunado ? (
                                    <Grid item xs={12}>
                                        <SubCard title="INFORMACIÓN DE VACUNACIÓN">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <InputMultiSelects
                                                        fullWidth
                                                        onChange={(event, value) => setVacunas(value)}
                                                        value={vacunas}
                                                        label="Vacunas"
                                                        options={lsVacunas}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <SelectOnChange
                                                        name="refuerzo"
                                                        label="Refuerzo"
                                                        value={refuerzo}
                                                        options={lsRefuerzo}
                                                        onChange={(e) => setRefuerzo(e?.target.value)}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                             
                                            </Grid>
                                        </SubCard>
                                    </Grid>

                                ) : (<></>)}

                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="contained" fullWidth type="submit">
                                                    {TitleButton.Guardar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => {
                                                    setBtnReport(false);
                                                    setDocumento('');
                                                    setOcultarBoton(false);
                                                    setLsQuestionnaire([]);
                                                }}>
                                                    {TitleButton.Cancelar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : (<></>)
                    }
                </form>
            </Grid>
        </MainCard>
    );
};

export default DashboardQuestionnaire;