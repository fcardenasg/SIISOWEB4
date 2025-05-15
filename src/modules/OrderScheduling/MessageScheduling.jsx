import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import User from 'assets/img/user.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetByProgramacionOrdenesProveedor, GetComboProgramacionOrdenes, GetEmpleadoProgramacionOrdenes, InsertIndividualProgramacionOrdenes } from 'api/clients/ProgramacionOrdenesClient';
import SearchEmployee from 'assets/img/searchemployee.json';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { CodCatalogo, TitleButton } from 'components/helpers/Enums';
import { GetAnioMeses, GetEdad, validateData, ViewFormat } from 'components/helpers/Format';
import SelectOnChange from 'components/input/SelectOnChange';
import AnimateComponent from 'components/loading/AnimateComponent';
import { useBoolean } from 'hooks/use-boolean';
import Lottie from 'lottie-react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Chip from 'ui-component/extended/Chip';
import ListDetailParaclinicos from './components/ListDetailParaclinicos';

const BoxTypography = ({ title, data, sx = {} }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
        <Typography sx={{ color: 'black', marginRight: 1 }} variant="body1">{title}</Typography>
        <Typography variant="body1">{data}</Typography>
    </Box>
);

const MessageScheduling = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const blockSave = useBoolean(true);
    const [documento, setDocumento] = useState('');
    const [lsTipoExamenLaboral, setLsTipoExamenLaboral] = useState([]);
    const [dataParaclinico, setDataParaclinico] = useState([]);
    const [textError, setTextError] = useState("");
    const validateParaclinico = useBoolean(true);
    const [tipoExamenLaboral, setTipoExamenLaboral] = useState(null);

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [employeeData, setEmployeeData] = useState(null);
    const [lsCiudad, setLsCiudad] = useState([]);

    function agruparCiudades(ciudades) {
        const ciudadesUnicas = Array.from(
            new Map(ciudades.map(ciudad => [`${ciudad.value}-${ciudad.label}`, ciudad])).values()
        );
        return ciudadesUnicas;
    }

    async function getAll() {
        try {
            const lsServerCiudad = await GetComboProgramacionOrdenes();
            const ciudadesUnicas = agruparCiudades(lsServerCiudad.data);
            setLsCiudad(ciudadesUnicas);

            const lsServerTipoExamen = await GetByTipoCatalogoCombo(CodCatalogo.LABORATORIO_ORDENES_PARACLINICOS);
            setLsTipoExamenLaboral(lsServerTipoExamen.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getAll();
    }, []);

    async function getAllParaclinico(idCiudad) {
        try {
            const lsServer = await GetByProgramacionOrdenesProveedor(idCiudad);
            if (lsServer.data.exito) {
                validateParaclinico.onTrue();
                setDataParaclinico(lsServer.data.datos);
            } else {
                validateParaclinico.onFalse();
                setTextError(lsServer.data.mensaje);
                setDataParaclinico([]);
            }
        } catch (error) {

        }
    }

    const handleDocumento = async (event) => {
        try {
            setDocumento(event.target.value);

            if (event.target.value !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetEmpleadoProgramacionOrdenes(event.target.value);

                    if (lsServerEmployee?.data.status === 200) {
                        const dataemployee = lsServerEmployee.data.data;
                        getAllParaclinico(dataemployee.idMunicipioResidencia);
                        setEmployeeData(dataemployee);
                        blockSave.onFalse();
                    } else {
                        blockSave.onTrue();
                        setOpenError(true);
                        setErrorMessage(lsServerEmployee?.data.message);

                        if (lsServerEmployee?.data.data) {
                            const dataemployee = lsServerEmployee.data.data;
                            getAllParaclinico(dataemployee.idMunicipioResidencia);
                            setEmployeeData(dataemployee);
                        } else {
                            setEmployeeData(null);
                        }
                    }
                }
            } else {
                setEmployeeData(null);
                blockSave.onTrue();
            }
        } catch (error) { }
    }

    const handleChangeCity = async (event) => {
        try {
            getAllParaclinico(event.target.value);
        } catch (error) {

        }
    };

    const handleClick = async () => {
        try {
            if (!tipoExamenLaboral) {
                setErrorMessage("Debe elegir un tipo de examen laboral para el empleado");
                setOpenError(true);
                return;
            }

            const modeldata = {
                tipoProgramacion: "individual",
                documento: documento,
                idGes: employeeData.idGes,
                proveedores: dataParaclinico.map(pa => pa.id),
                idTipoExamenLaboral: tipoExamenLaboral
            }

            const response = await InsertIndividualProgramacionOrdenes(modeldata);
            if (response.data.exito) {
                setOpenSuccess(true);
            } else {
                setErrorMessage(response.data.mensaje);
                setOpenError(true);
            }
        } catch (error) {
            setErrorMessage("Error en la petición");
            setOpenError(true);
        }
    };

    return (
        <Grid container spacing={2}>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid item xs={12}>
                <Grid container justifyContent="left" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={2} lg={2}>
                        <TextField
                            fullWidth
                            type="number"
                            value={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            onKeyDown={handleDocumento}
                            id="standard-basic"
                            label="Documento"
                            variant="outlined"
                        />
                    </Grid>

                    {employeeData == null ?
                        <>
                            <Grid item>
                                <Box sx={{ width: '150px', height: '150px', ml: matchesXS ? 0 : 7 }}>
                                    <Lottie animationData={SearchEmployee} />
                                </Box>
                            </Grid>

                            <Grid item xs md={5}>
                                <Typography variant="h3">Registro de Documento</Typography>
                                <Divider sx={{ my: 1.5 }} />
                                <Typography variant="body1">
                                    Por favor, ingrese el número de documento correspondiente para realizar la búsqueda de la información básica del empleado.
                                </Typography>
                            </Grid>

                        </>
                        :
                        <>
                            <Divider sx={{ px: 2 }} orientation="vertical" variant="middle" flexItem />

                            <Grid item xs={12} md={9} lg={9}>
                                <AnimateComponent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} md={4} lg={3} container justifyContent="center" alignItems="center">
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    bgcolor: 'inherit',
                                                    width: 160,
                                                    height: 160,
                                                    borderRadius: '25px',
                                                }}
                                                src={employeeData.imagenUrl !== null ? employeeData.imagenUrl : User}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={8} lg={9}>
                                            <Typography variant="h2" sx={{ mb: 1 }}>
                                                {employeeData.nombres}
                                                <Chip
                                                    size="small"
                                                    label={employeeData.namePayStatus}
                                                    chipcolor={employeeData.namePayStatus === 'ACTIVO (A)' ? 'success' : 'error'}
                                                    sx={{ borderRadius: '4px', textTransform: 'capitalize', ml: 2 }}
                                                />
                                            </Typography>

                                            <BoxTypography title="ROSTER POSITION:" data={employeeData.nameRosterPosition} />
                                            <BoxTypography sx={{ my: 0.5 }} title="LUGAR DE RESIDENCIA:" data={`${employeeData.nameDepartamentoResidencia}, ${employeeData.nameMunicipioResidencia}`} />

                                            <Box
                                                gap={0.5}
                                                display="grid"
                                                gridTemplateColumns={{
                                                    xs: 'repeat(1, 1fr)',
                                                    md: 'repeat(1, 0.5fr)',
                                                    lg: 'repeat(2, 0.5fr)'
                                                }}
                                            >
                                                <BoxTypography title="GENERO:" data={employeeData.nameGenero} />
                                                <BoxTypography title="EDAD:" data={`${GetEdad(employeeData.fechaNaci)} AÑOS`} />
                                                <BoxTypography title="FECHA DE CONTRATO:" data={ViewFormat(employeeData.fechaContrato)} />
                                                <BoxTypography title="ANTIGÜEDAD:" data={GetAnioMeses(employeeData.fechaContrato)} />
                                                <BoxTypography title="GES:" data={employeeData.nameGes} />
                                                <BoxTypography title="CORREO:" data={employeeData.email} />
                                                <BoxTypography title="TELÉFONO:" data={employeeData.celular} />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </AnimateComponent>
                            </Grid>
                        </>
                    }
                </Grid>
            </Grid>

            {employeeData !== null && <Grid item xs={12} sx={{ my: 1.5 }}><Divider /></Grid>}

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {employeeData !== null &&
                        <Grid item xs={12}>
                            <AnimateComponent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <BoxTypography title="ÚLTIMO TIPO DE ATENCIÓN:" data={validateData(employeeData?.ultimaAtencionEMO)} />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <BoxTypography title="ÚLTIMA FECHA DE EMO:" data={validateData(ViewFormat(employeeData?.fechaUltimoEMO))} />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <BoxTypography title="MESES TRANSCURRIDOS:" data={validateData(employeeData?.mesesUltimoEMO)} />
                                    </Grid>

                                    {!validateParaclinico.value &&
                                        <Grid item xs={12} md={6} lg={4}>
                                            <SelectOnChange
                                                name="ciudad"
                                                label="Ciudad"
                                                options={lsCiudad}
                                                onChange={handleChangeCity}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    }

                                    <Grid item xs={12}>
                                        <Divider sx={{ my: 1.5 }} />
                                    </Grid>

                                    {validateParaclinico.value &&
                                        <Grid item xs={12}>
                                            <SelectOnChange
                                                maxWidth="1100px"
                                                name="tipoExamenLaboral"
                                                label="Tipo de examen laboral"
                                                options={lsTipoExamenLaboral}
                                                value={tipoExamenLaboral}
                                                onChange={(e) => setTipoExamenLaboral(e.target.value)}
                                            />
                                        </Grid>
                                    }

                                    <Grid item xs={12}>
                                        <ListDetailParaclinicos
                                            setDataParaclinico={setDataParaclinico}
                                            dataParaclinico={dataParaclinico}
                                            textError={textError}
                                            validateParaclinico={validateParaclinico}
                                        />
                                    </Grid>
                                </Grid>
                            </AnimateComponent>
                        </Grid>
                    }
                </Grid>

                <Grid container spacing={2} sx={{ pt: 4 }}>
                    <Grid item xs={6} md={4} lg={2}>
                        <AnimateButton>
                            <Button disabled={blockSave.value} variant="contained" fullWidth onClick={handleClick}>
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
            </Grid>
        </Grid>
    );
};

export default MessageScheduling;