import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import de Material-ui
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
import { Url } from 'api/instances/AuthRoute';
import { PutEmployee } from 'formatdata/EmployeeForm';
import { SNACKBAR_OPEN } from 'store/actions';
import UpdateData from 'components/form/UpdateData';
import { UpdateEmployees } from 'api/clients/EmployeeClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { GetAllCatalog } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputDate from 'components/input/InputDate';
import { FormatDate, DateFormat } from 'components/helpers/Format';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
/* const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`)
}); */

const UpdateEmployee = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    /* NUESTROS USESTATE */
    const [catalog, setCatalog] = useState([]);
    const [company, setCompany] = useState([]);
    const [employeeId, setEmployee] = useState([]);

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        const lsServerCatalog = await GetAllCatalog(0, 0);
        var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
            value: item.idCatalogo,
            label: item.nombre
        }));
        setCatalog(resultCatalogo);

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

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors } = methods;
    const { id } = useParams();

    /* ESTADOS PARA LAS FECHAS */

    const [valueFechaNaci, setFechaNaci] = useState(null);

    const [valueFechaContrato, setFechaContrato] = useState(null);
    const [valueTermDate, setTermDate] = useState(null);
    const [valueFechaModificacion, setFechaModificacion] = useState(null);
    const [valueFechaCreacion, setFechaCreacion] = useState(null);

    /* METODO DE UPDATE  */
    const handleClick = async (datos) => {
        const DataToUpdate = PutEmployee(id, datos.documento, datos.nombres, datos.fechaNaci, datos.type, datos.departamento,
            datos.area, datos.subArea, datos.grupo, datos.municipioNacido, datos.dptoNacido, datos.fechaContrato,
            datos.rosterPosition, datos.tipoContrato, datos.generalPosition, datos.genero, datos.sede,
            datos.direccionResidencia, datos.municipioResidencia, datos.dptoResidencia, datos.celular, datos.eps,
            datos.afp, datos.turno, datos.email, datos.telefonoContacto, datos.estadoCivil, datos.empresa, datos.arl,
            datos.contacto, datos.escolaridad, datos.cesantias, datos.rotation, datos.payStatus, datos.termDate,
            datos.bandera, datos.ges, datos.usuarioModifica, datos.fechaModificacion, datos.usuarioCreacion,
            datos.fechaCreacion, datos.imagenUrl);

        console.log("Fecha = ", datos.fechaNaci);


        /* try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateEmployees(DataToUpdate);
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Actualizar}`,
                        variant: 'alert',
                        alertSeverity: 'success',
                        close: false,
                        transition: 'SlideUp'
                    })
                }
            }
        } catch (error) {
            console.log(error);
        } */
    };

    return (
        <MainCard title="Actualizar Empleado">
            <UpdateData url={Url.EmpleadoId}>
                {(Employee) => (
                    <form onSubmit={handleSubmit(handleClick)}>
                        {setEmployee(Employee)}
                        <Typography sx={{ pb: 2 }} variant="h4">Datos Personales</Typography>

                        <Grid container spacing={2} sx={{ pb: 3 }}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <img width={230} src={Employee.imagenUrl} />
                                    {/* <InputText
                                        defaultValue={Employee.imagenUrl}
                                        fullWidth
                                        name="imagenUrl"
                                        label="Foto"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    /> */}
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.documento}
                                        fullWidth
                                        name="documento"
                                        label="Documento"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.nombres}
                                        fullWidth
                                        name="nombres"
                                        label="Nombres"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.email}
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.celular}
                                        fullWidth
                                        name="celular"
                                        label="Celular"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="escolaridad"
                                        label="Escolaridad"
                                        defaultValue={Employee.escolaridad}
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="empresa"
                                        label="Empresa"
                                        defaultValue={Employee.empresa}
                                        options={company}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="sede"
                                        label="Sede"
                                        defaultValue={Employee.sede}
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    {/* <InputText
                                        defaultValue={Employee.fechaNaci}
                                        fullWidth
                                        name="fechaNaci"
                                        label="Fecha de Nacimiento"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    /> */}
                                    <InputDate
                                        fullWidth
                                        name="fechaNaci"
                                        label="Fecha de Nacimiento"
                                        defaultValue={Employee.fechaNaci}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="genero"
                                        label="Genero"
                                        defaultValue={Employee.genero}
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="estadoCivil"
                                        label="Estado civil"
                                        defaultValue={Employee.estadoCivil}
                                        options={catalog}
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
                                        defaultValue={Employee.payStatus}
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.contacto}
                                        fullWidth
                                        name="contacto"
                                        label="Contacto"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.telefonoContacto}
                                        fullWidth
                                        name="telefonoContacto"
                                        label="Telefono Contacto"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

                        <Typography sx={{ pb: 2 }} variant="h4">Información Contractual</Typography>

                        <Grid container spacing={2} sx={{ pb: 3 }}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.fechaContrato}
                                        fullWidth
                                        name="fechaContrato"
                                        label="Fecha de Contrato"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="tipoContrato"
                                        label="Tipo de Contrato"
                                        defaultValue={Employee.tipoContrato}
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
                                        defaultValue={Employee.type}
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
                                        defaultValue={Employee.rosterPosition}
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
                                        defaultValue={Employee.generalPosition}
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
                                        label="Departamentos"
                                        defaultValue={Employee.departamento}
                                        options={catalog}
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
                                        defaultValue={Employee.area}
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
                                        defaultValue={Employee.subArea}
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
                                        defaultValue={Employee.grupo}
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
                                        defaultValue={Employee.turno}
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.rotation}
                                        fullWidth
                                        name="rotation"
                                        label="Rotación"
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
                                    <InputSelect
                                        name="dptoNacido"
                                        label="Departamento de Nacimiento"
                                        defaultValue={Employee.dptoNacido}
                                        options={catalog}
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
                                        defaultValue={Employee.municipioNacido}
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
                                        defaultValue={Employee.dptoResidencia}
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
                                        defaultValue={Employee.municipioResidencia}
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.direccionResidencia}
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
                                        defaultValue={Employee.eps}
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
                                        defaultValue={Employee.afp}
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
                                        defaultValue={Employee.arl}
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
                                        defaultValue={Employee.cesantias}
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
                                    <InputText
                                        defaultValue={Employee.termDate}
                                        fullWidth
                                        name="termDate"
                                        label="Fecha de Terminación"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="bandera"
                                        label="Bandera"
                                        defaultValue={Employee.bandera}
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.ges}
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
                                        defaultValue={Employee.usuarioModifica}
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
                                    <InputText
                                        defaultValue={Employee.fechaModificacion}
                                        fullWidth
                                        name="fechaModificacion"
                                        label="Fecha de Modificación"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={Employee.usuarioCreacion}
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
                                    <InputText
                                        defaultValue={Employee.fechaCreacion}
                                        fullWidth
                                        name="fechaCreacion"
                                        label="Fecha de Creación"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ pb: 3 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="contained" type="submit" fullWidth>
                                            {TitleButton.Actualizar}
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
                )}
            </UpdateData>

        </MainCard>
    );
};

export default UpdateEmployee;