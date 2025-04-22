import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
    Button,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import { MessageDelete, MessageError, MessageSuccess, ParamDelete } from 'components/alert/AlertAll';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import { ViewFormat } from 'components/helpers/Format';
import InputCheckBox from 'components/input/InputCheckBox';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import SelectOnChange from 'components/input/SelectOnChange';
import { PostOrdersParaclinico } from 'formatdata/OrdersForm';
import useAuth from 'hooks/useAuth';
import { Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';
import Transitions from 'ui-component/extended/Transitions';

const ListParaclinico = ({ setLsOrdenesParaclinicos, lsOrdenesParaclinicos }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openDelete, setOpenDelete] = useState(false);
    const [addItemClicked, setAddItemClicked] = useState(false);
    const [ciudad, setCiudad] = useState('');
    const [paraclinicos, setParaclinicos] = useState('');
    const [proveedor, setProveedor] = useState('');

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [lsProveedorCombo, setLsProveedorCombo] = useState([]);
    const [lsCiudad, setLsCiudad] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsLaboratorio, setLsLaboratorio] = useState([]);
    const [lsTipoRNM, setLsTipoRNM] = useState([]);
    const [lsEstudioParaclinico, setLsEstudioParaclinico] = useState([]);

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    const xsGrid = [DefaultValue.ORDENES_LABORATORIO, DefaultValue.ORDENES_RNM, DefaultValue.ORDENES_FECHA_EXAM_FISICO].includes(paraclinicos) ? 3 : 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [laboratorio, tipoRNM, ciudad, proveedor, estudioParaclinico] = await Promise.all([
                    GetAllByTipoCatalogo(0, 0, CodCatalogo.LABORATORIO_ORDENES_PARACLINICOS),
                    GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPORNM_ORDENES_PARACLINICOS),
                    GetAllByTipoCatalogo(0, 0, CodCatalogo.CIUDADES),
                    GetAllSupplier(),
                    GetAllByTipoCatalogo(0, 0, CodCatalogo.ESTUDIO_EXAMEN_PARACLINICOS)
                ]);

                setLsLaboratorio(laboratorio.data.entities.map(item => ({ value: item.idCatalogo, label: item.nombre })));
                setLsTipoRNM(tipoRNM.data.entities.map(item => ({ value: item.idCatalogo, label: item.nombre })));
                setLsCiudad(ciudad.data.entities.map(item => ({ value: item.idCatalogo, label: item.nombre })));
                setLsProveedor(proveedor.data);
                setLsEstudioParaclinico(estudioParaclinico.data.entities.map(item => ({ value: item.idCatalogo, label: item.nombre })));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleParaclinicosChange = (event) => {
        const selectedValue = event.target.value;
        setCiudad('');
        setProveedor('');
        setParaclinicos(selectedValue);
        setLsProveedorCombo(lsProveedor.filter(tipo => tipo.tipoProv === selectedValue).map(para => ({
            value: para.codiProv,
            label: para.nombProv
        })));
    };

    const handleProveedorChange = (event) => {
        const selectedValue = event.target.value;
        setProveedor(selectedValue);
        const ciudadValue = lsProveedor.find(tipo => tipo.codiProv === selectedValue)?.ciudProv || '';
        setCiudad(ciudadValue);
    };

    const handleDelete = async (index) => {
        if (index !== null) {
            const willDelete = await swal(ParamDelete);
            if (willDelete) {
                setLsOrdenesParaclinicos(prev => prev.filter((_, i) => i !== index));
                setOpenDelete(true);
            }
        }
    };

    const handleSubmitForm = async (datos) => {
        try {
            const proveedorMap = paraclinicos === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? '01' : proveedor;
            const ciudadMap = paraclinicos === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? DefaultValue.SINREGISTRO_GLOBAL : ciudad;

            const DataToInsert = PostOrdersParaclinico(
                paraclinicos,
                0,
                proveedorMap,
                ciudadMap,
                datos.idTipoExamenLaboratorio,
                datos.idTipoExamenRNM,
                datos.fechaExamenFisico,
                datos.asistio,
                user?.nameuser,
                new Date(),
                "",
                undefined
            );

            if (!lsOrdenesParaclinicos.some(x => x.idParaclinico === paraclinicos)) {
                if (paraclinicos) {
                    setLsOrdenesParaclinicos(prev => [...prev, DataToInsert]);
                    setOpenSuccess(true);
                    setErrorMessage("Examen agregado con éxito");
                    reset();
                    setAddItemClicked(false);
                    setParaclinicos('');
                    setProveedor('');
                    setCiudad('');
                } else {
                    setOpenError(true);
                    setErrorMessage("Por favor seleccione un paraclinico");
                }
            } else {
                setOpenError(true);
                setErrorMessage("Este paraclinico ya está registrado");
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage("Error al guardar el registro.");
        }
    };

    return (
        <Fragment>
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
            <MessageSuccess open={openSuccess} message={errorMessage} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <SubCard>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Paraclinico</TableCell>
                                        <TableCell>Proveedor</TableCell>
                                        <TableCell>Ciudad</TableCell>
                                        <TableCell>Fecha Registro</TableCell>
                                        <TableCell>Acción</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lsOrdenesParaclinicos.map((row, index) => (
                                        <TableRow key={index} hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                            <TableCell>{lsEstudioParaclinico.find(x => x.value === Number(row.idParaclinico))?.label}</TableCell>
                                            <TableCell>{lsProveedor.find(x => x.codiProv === row.idProveedor)?.nombProv}</TableCell>
                                            <TableCell>{lsCiudad.find(x => x.value === Number(row.idCiudad))?.label}</TableCell>
                                            <TableCell>{ViewFormat(row.fechaRegistro)}</TableCell>
                                            <TableCell>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Tooltip title="Eliminar" onClick={() => handleDelete(index)}>
                                                            <IconButton color="error" size="small">
                                                                <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12}>
                        <Transitions type="collapse" in={addItemClicked} position="top-left" direction="up">
                            <Grid container sx={{ pt: 5 }} spacing={2}>
                                <Grid item xs={xsGrid}>
                                    <SelectOnChange
                                        name="idParaclinico"
                                        label="Paraclínicos"
                                        value={paraclinicos}
                                        onChange={handleParaclinicosChange}
                                        options={lsEstudioParaclinico}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </Grid>

                                {paraclinicos === DefaultValue.ORDENES_LABORATORIO && (
                                    <Grid item xs={xsGrid}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idTipoExamenLaboratorio"
                                                label="Tipo Examen"
                                                options={lsLaboratorio}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                )}

                                {paraclinicos === DefaultValue.ORDENES_RNM && (
                                    <Grid item xs={xsGrid}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idTipoExamenRNM"
                                                label="Tipo De Examen"
                                                options={lsTipoRNM}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                )}

                                {paraclinicos === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? (
                                    <Fragment>
                                        <Grid item xs={xsGrid}>
                                            <FormProvider {...methods}>
                                                <InputDatePicker
                                                    label="Fecha De Examen Físico"
                                                    name="fechaExamenFisico"
                                                    defaultValue={new Date()}
                                                />
                                            </FormProvider>
                                        </Grid>
                                        <Grid item xs={xsGrid} sx={{ align: "center" }}>
                                            <FormProvider {...methods}>
                                                <InputCheckBox
                                                    label="Asistio"
                                                    name="asistio"
                                                    size={30}
                                                    defaultValue={false}
                                                />
                                            </FormProvider>
                                        </Grid>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Grid item xs={xsGrid}>
                                            <SelectOnChange
                                                name="idProveedor"
                                                label="Proveedor"
                                                value={proveedor}
                                                onChange={handleProveedorChange}
                                                options={lsProveedorCombo}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>
                                        <Grid item xs={xsGrid}>
                                            <SelectOnChange
                                                disabled
                                                name="idCiudad"
                                                label="Ciudad"
                                                value={ciudad}
                                                onChange={(e) => setCiudad(e.target.value)}
                                                options={lsCiudad}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>
                                    </Fragment>
                                )}
                            </Grid>

                            <Grid container sx={{ pr: 0.5, pt: 3 }} justifyContent="flex-end">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Button color="error" onClick={() => setAddItemClicked(false)}>
                                        Cancelar
                                    </Button>
                                    <Button variant="contained" size="small" onClick={handleSubmit(handleSubmitForm)}>
                                        Adicionar
                                    </Button>
                                </Stack>
                            </Grid>
                        </Transitions>

                        <Grid item sx={{ pl: 2, pt: 3 }}>
                            <Button variant="text" onClick={() => setAddItemClicked(true)}>
                                + Agregar Paraclinico
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </SubCard>
        </Fragment>
    );
};

export default ListParaclinico;