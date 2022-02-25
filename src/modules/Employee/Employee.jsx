// Import de Material-ui
import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import ModalChildren from 'components/form/ModalChildren';
import WebCamCapture from 'components/form/WebCam';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertEmployee } from 'api/clients/EmployeeClient';
import { GetAllCatalog, GetAllByTipoCatalogo, GetAllBySubTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { PostCatalog } from 'formatdata/CatalogForm';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import InputDate from 'components/input/InputDate';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import { PostEmployee } from 'formatdata/EmployeeForm';
import SelectOnChange from 'components/input/SelectOnChange';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
/* const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`),
    idTipoCatalogo: yup.number().required(`${ValidationMessage.Requerido}`),
}); */

const Employee = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS ESTADOS PARA LOS COMBOS */

    const [catalog, setCatalog] = useState([]);
    const [company, setCompany] = useState([]);
    const [lsEscolaridad, setEscolaridad] = useState([]);
    const [lsMunicipio, setMunicipio] = useState([]);
    const [lsDepartamento, setDepartamento] = useState([]);
    const [lsCodigoFilter, setCodigoFilter] = useState([]);
    const [valueSelect, setValues] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [estado, setEstado] = useState(true);

    /* ESTADOS PARA LAS FECHAS */
    const [valueFechaNaci, setFechaNaci] = useState(null);
    const [valueFechaContrato, setFechaContrato] = useState(null);
    const [valueTermDate, setTermDate] = useState(null);
    const [valueFechaModificacion, setFechaModificacion] = useState(null);
    const [valueFechaCreacion, setFechaCreacion] = useState(null);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    /* MANEJO DE MODAL */

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setEstado(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* MANEJO DE WEBCAM */
    const WebCamRef = useRef(null);

    const CapturePhoto = useCallback(() => {
        const imageSrc = WebCamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [WebCamRef, setImgSrc]);

    const Remover = () => {
        setImgSrc(null);
    }

    /* EVENTO DE FILTRAR COMBO DEPARTAMENTO */
    async function GetSubString(codigo) {
        const lsServerCatalog = await GetAllBySubTipoCatalogo(0, 0, codigo);
        var resultMunicipio = lsServerCatalog.data.entities.map((item) => ({
            value: item.idCatalogo,
            label: item.nombre
        }));
        console.log("resultMunicipio = ", resultMunicipio);
        setMunicipio(resultMunicipio);
    }


    const handleChange = (event) => {

        setValues(event.target?.value);
        console.log("event.target.value = ", Number(event.target?.value));

        /* const eventCode = event.target.value;
        var lsResulCode = String(lsCodigoFilter.filter(code => code.idCatalogo == eventCode).map(code => code.codigo));
        console.log("lsResulCode = ", lsResulCode);
        GetSubString(lsResulCode); */
    };

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        const lsServerCatalog = await GetAllCatalog(0, 0);
        var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
            value: item.idCatalogo,
            label: item.nombre
        }));
        setCatalog(resultCatalogo);

        const lsServerDepartamento = await GetAllByTipoCatalogo(0, 0, 1077);
        var resultDepartamento = lsServerDepartamento.data.entities.map((item) => ({
            value: item.idCatalogo,
            label: item.nombre
        }));
        setDepartamento(resultDepartamento);
        setCodigoFilter(lsServerDepartamento.data.entities);

        const lsServerEscolaridad = await GetAllByTipoCatalogo(0, 0, 1146);
        var resultEscolaridad = lsServerEscolaridad.data.entities.map((item) => ({
            value: item.idCatalogo,
            label: item.nombre
        }));
        setEscolaridad(resultEscolaridad);

        const lsServerCompany = await GetAllCompany(0, 0);
        var resultCompany = lsServerCompany.data.entities.map((item) => ({
            value: item.codigo,
            label: item.descripcionSpa
        }));
        setCompany(resultCompany);
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    const CleanCombo = () => {
        setFechaNaci(null);
        setFechaContrato(null);
        setTermDate(null);
        setFechaModificacion(null);
        setFechaCreacion(null);
    }

    /* METODO DE INSERT  */
    const handleClick = async (datos) => {
        const FechaNaci = FormatDate(valueFechaNaci);
        const FechaContrato = FormatDate(valueFechaContrato);
        const TermDate = FormatDate(valueTermDate);
        const FechaModificacion = FormatDate(valueFechaModificacion);
        const FechaCreacion = FormatDate(valueFechaCreacion);

        const DataToInsert = PostEmployee(datos.documento, datos.nombres, FechaNaci, datos.type, datos.departamento,
            datos.area, datos.subArea, datos.grupo, datos.municipioNacido, datos.dptoNacido, FechaContrato,
            datos.rosterPosition, datos.tipoContrato, datos.generalPosition, datos.genero, datos.sede,
            datos.direccionResidencia, datos.municipioResidencia, datos.dptoResidencia, datos.celular, datos.eps,
            datos.afp, datos.turno, datos.email, datos.telefonoContacto, datos.estadoCivil, datos.empresa, datos.arl,
            datos.contacto, datos.escolaridad, datos.cesantias, datos.rotation, datos.payStatus, TermDate,
            datos.bandera, datos.ges, datos.usuarioModifica, FechaModificacion, datos.usuarioCreacion,
            FechaCreacion, imgSrc);

        console.log("fechaNaci = ", datos.fechaNaci);

        if (Object.keys(datos.length !== 0)) {
            const result = await InsertEmployee(DataToInsert);
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
                CleanCombo();
            }
        }
    };

    const navigate = useNavigate();

    return (
        <MainCard title="Registrar Empleado">
            <Grid container xs={12} sx={{ pt: 3 }}>
                <form onSubmit={handleSubmit(handleClick)}>

                    <Typography variant="h4">Datos Personales</Typography>

                    <ModalChildren
                        open={open}
                        onClose={handleClose}
                        title="Tomar Fotografía"
                    >
                        <WebCamCapture
                            CaptureImg={CapturePhoto}
                            RemoverImg={Remover}
                            ImgSrc={imgSrc}
                            WebCamRef={WebCamRef}
                        />
                    </ModalChildren>


                    <Grid container xs={12} spacing={2} sx={{ pb: 3, pt: 3 }}>
                        <Grid item xs={3}>
                            <PhotoModel
                                OpenModal={handleOpen}
                                EstadoImg={imgSrc}
                                RemoverImg={Remover}
                            />
                        </Grid>

                        <Grid container spacing={2} item xs={9}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="documento"
                                        label="Documento"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="nombres"
                                        label="Nombres"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="celular"
                                        label="Celular"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="escolaridad"
                                        label="Escolaridad"
                                        defaultValue=""
                                        options={lsEscolaridad}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="sede"
                                        label="Sede"
                                        defaultValue=""
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDate
                                        defaultValue={null}
                                        name="fechaNaci"
                                        label="Fecha de Nacimiento"
                                        value={valueFechaNaci}
                                        onChange={(newValue) => {
                                            setFechaNaci(newValue);
                                        }}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="genero"
                                        label="Genero"
                                        defaultValue=""
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="estadoCivil"
                                        label="Estado civil"
                                        defaultValue=""
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="contacto"
                                        label="Contacto"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="telefonoContacto"
                                        label="Teléfono Contacto"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Typography sx={{ pb: 2 }} variant="h4">Información Contractual</Typography>

                    <Grid container spacing={2} sx={{ pb: 3 }}>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputDate
                                    defaultValue=""
                                    fullWidth
                                    name="fechaContrato"
                                    label="Fecha de Contrato"
                                    value={valueFechaContrato}
                                    onChange={(newValue) => {
                                        setFechaContrato(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="tipoContrato"
                                    label="Tipo de Contrato"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="type"
                                    label="Rol"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="rosterPosition"
                                    label="Roster Position"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="generalPosition"
                                    label="General Position"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="departamento"
                                    label="Departamento"
                                    defaultValue=""
                                    options={lsDepartamento}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="area"
                                    label="Area"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="subArea"
                                    label="Subarea"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="grupo"
                                    label="Grupo"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="turno"
                                    label="Turno"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="rotation"
                                    label="Rotación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="payStatus"
                                    label="Estado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Typography sx={{ pb: 2 }} variant="h4">Información Demografica</Typography>

                    <Grid container spacing={2} sx={{ pb: 3 }}>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                {/* <SelectOnChange
                                    name="dptoNacido"
                                    label="Departamento de Nacimiento"
                                    options={lsDepartamento}
                                    onChange={handleChange}
                                /> */}


                                <InputSelect
                                    name="dptoNacido"
                                    label="Departamento de Nacimiento"
                                    defaultValue=""
                                    options={lsDepartamento}
                                    onChange={handleChange}
                                    valueSelect={valueSelect}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="municipioNacido"
                                    label="Municipio de Nacimiento"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="dptoResidencia"
                                    label="Departamento de Residencia"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="municipioResidencia"
                                    label="Municipio de Residencia"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="direccionResidencia"
                                    label="Dirección de Residencia"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Typography sx={{ pb: 2 }} variant="h4">Seguridad Social</Typography>

                    <Grid container spacing={2} sx={{ pb: 3 }}>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="eps"
                                    label="EPS"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="afp"
                                    label="AFP"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="arl"
                                    label="ARL"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="cesantias"
                                    label="Cesantias"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Typography sx={{ pb: 2 }} variant="h4">Datos Adicionales</Typography>

                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                {/* <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="termDate"
                                    label="Fecha de Terminación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                /> */}
                                <InputDate
                                    defaultValue=""
                                    fullWidth
                                    name="termDate"
                                    label="Fecha de Terminación"
                                    value={valueTermDate}
                                    onChange={(newValue) => {
                                        setTermDate(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="bandera"
                                    label="Bandera"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="ges"
                                    label="Ges"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="usuarioModifica"
                                    label="Usuario Modifica"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                {/* <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="fechaModificacion"
                                    label="Fecha de Modificación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                /> */}

                                <InputDate
                                    defaultValue=""
                                    fullWidth
                                    name="fechaModificacion"
                                    label="Fecha de Modificación"
                                    value={valueFechaModificacion}
                                    onChange={(newValue) => {
                                        setFechaModificacion(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="usuarioCreacion"
                                    label="Usuario de Creación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputDate
                                    defaultValue=""
                                    fullWidth
                                    name="fechaCreacion"
                                    label="Fecha de Creación"
                                    value={valueFechaCreacion}
                                    onChange={(newValue) => {
                                        setFechaCreacion(newValue);
                                    }}
                                />

                                {/* <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="fechaCreacion"
                                    label="Fecha de Creación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                /> */}
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ pb: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="contained" type="submit" fullWidth>
                                        {TitleButton.Guardar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/employee/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </MainCard>
    );
};

export default Employee;