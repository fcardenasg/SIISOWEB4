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
import { useNavigate, useParams } from 'react-router-dom';


import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetAllByProgramacionOrdenes, GetByIdProgramacionOrdenes, GetByProgramacionOrdenesProveedor, GetComboProgramacionOrdenes, GetEmpleadoProgramacionOrdenes, InsertIndividualProgramacionOrdenes } from 'api/clients/ProgramacionOrdenesClient';
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
import MainCard from 'ui-component/cards/MainCard';
import MonitoringDetailParaclinicos from './components/MonitoringDetailParaclinicos';
import LoadingMassive from './components/LoadingMassive';

const BoxTypography = ({ title, data, sx = {} }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
        <Typography sx={{ color: 'black', marginRight: 1 }} variant="body1">{title}</Typography>
        <Typography variant="body1">{data}</Typography>
    </Box>
);

const ViewIndividualOrders = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();


    const loadingModulo = useBoolean(true);
    const [dataParaclinico, setDataParaclinico] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [employeeData, setEmployeeData] = useState(null);

    function agruparCiudades(ciudades) {
        const ciudadesUnicas = Array.from(
            new Map(ciudades.map(ciudad => [`${ciudad.value}-${ciudad.label}`, ciudad])).values()
        );
        return ciudadesUnicas;
    }

    useEffect(() => {
        async function getData() {
            try {
                const serverData = await GetByIdProgramacionOrdenes(id);
                const dataEmployee = await GetEmpleadoProgramacionOrdenes(serverData.data.documento);
                const serverDataDetalle = await GetAllByProgramacionOrdenes(id);

                setTimeout(() => {
                    setEmployeeData(dataEmployee.data.data);
                    setDataParaclinico(serverDataDetalle.data.datos);

                    loadingModulo.onFalse();
                }, 500);
            } catch (error) {

            }
        }

        getData();
    }, []);

    return (
        <MainCard title="Monitoreo de órdenes individuales">
            <LoadingMassive>
                <Grid container spacing={2}>
                    <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
                    <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                    <Grid item xs={12}>
                        {employeeData !== null &&
                            <AnimateComponent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={4} container justifyContent="center" alignItems="center">
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

                                    <Grid item xs={12} md={8}>
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
                        }
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

                                            <Grid item xs={12}>
                                                <Divider sx={{ my: 1.5 }} />
                                            </Grid>

                                            {dataParaclinico.length != 0 &&
                                                <Grid item xs={12}>
                                                    <MonitoringDetailParaclinicos dataParaclinico={dataParaclinico} />
                                                </Grid>
                                            }
                                        </Grid>
                                    </AnimateComponent>
                                </Grid>
                            }
                        </Grid>

                        <Grid container spacing={2} sx={{ pt: 4 }}>
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
            </LoadingMassive>
        </MainCard>
    );
};

export default ViewIndividualOrders;