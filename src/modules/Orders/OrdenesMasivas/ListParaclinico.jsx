import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Grid, Button,
    useMediaQuery,
    TableCell,
    TableRow,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    Stack,
    Tooltip,
    IconButton
} from '@mui/material';

import { GetAllSupplier } from 'api/clients/SupplierClient';
import { useForm, FormProvider } from 'react-hook-form';
import Transitions from 'ui-component/extended/Transitions';
import { Message } from 'components/helpers/Enums';
import useAuth from 'hooks/useAuth';
import { MessageSuccess, MessageError, ParamDelete, MessageDelete } from 'components/alert/AlertAll';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePicker from 'components/input/InputDatePicker';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';
import SubCard from 'ui-component/cards/SubCard';
import InputCheckBox from 'components/input/InputCheckBox';
import { PostOrdersParaclinico } from 'formatdata/OrdersForm';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import swal from 'sweetalert';
import { ViewFormat } from 'components/helpers/Format';

const ListParaclinico = ({ setLsOrdenesParaclinicos, lsOrdenesParaclinicos }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openDelete, setOpenDelete] = useState(false);
    const [addItemClickedEmpresa, setAddItemClickedEmpresa] = useState(false);
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

    const xsGrid = paraclinicos === DefaultValue.ORDENES_LABORATORIO || paraclinicos === DefaultValue.ORDENES_RNM
        || paraclinicos === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;
    const tipoExamenRNM = paraclinicos === DefaultValue.ORDENES_RNM ? true : false;
    const tipoExamenLabor = paraclinicos === DefaultValue.ORDENES_LABORATORIO ? true : false;
    const fechaExmaneFisico = paraclinicos === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerLaboratorio = await GetAllByTipoCatalogo(0, 0, CodCatalogo.LABORATORIO_ORDENES_PARACLINICOS);
                var resultLaboratorio = lsServerLaboratorio.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsLaboratorio(resultLaboratorio);

                const lsServerTipoRNM = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPORNM_ORDENES_PARACLINICOS);
                var resultTipoRNM = lsServerTipoRNM.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsTipoRNM(resultTipoRNM);

                const lsServerCiudad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CIUDADES);
                if (lsServerCiudad.status === 200) {
                    var resultCiudad = lsServerCiudad.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                    setLsCiudad(resultCiudad);
                }

                const lsServerProveedor = await GetAllSupplier(0, 0);
                if (lsServerProveedor.status === 200) {
                    setLsProveedor(lsServerProveedor.data.entities);
                }

                const lsServerEstudioParaclinico2 = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESTUDIO_EXAMEN_PARACLINICOS);
                var resultEstudioParaclinico = lsServerEstudioParaclinico2.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsEstudioParaclinico(resultEstudioParaclinico);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleParaclinicos = (event) => {
        try {
            setCiudad('');
            setProveedor('');
            setParaclinicos(event.target.value);

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo(arrayReady);
        } catch (error) { }
    }

    const handleProveedor = (event) => {
        try {
            setProveedor(event.target.value);
            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad(intCiudad);
        } catch (error) { }
    }

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    const handleDelete = async (index) => {
        try {
            if (index !== null) {
                swal(ParamDelete).then(async (willDelete) => {
                    if (willDelete) {
                        lsOrdenesParaclinicos.splice(index, 1);

                        setOpenDelete(true);
                    }
                });
            }
        } catch (error) { }
    };

    const handleClick = async (datos) => {
        try {
            var proveedorMap = fechaExmaneFisico ? '01' : proveedor;
            var ciudadMap = fechaExmaneFisico ? DefaultValue.SINREGISTRO_GLOBAL : ciudad;

            const DataToInsert = PostOrdersParaclinico(paraclinicos, 0, proveedorMap, ciudadMap, datos.idTipoExamenLaboratorio,
                datos.idTipoExamenRNM, datos.fechaExamenFisico, datos.asistio, user.nameuser, new Date(), "", undefined);


            var existe = lsOrdenesParaclinicos.some(x => x.idParaclinico === paraclinicos);

            if (!existe) {
                if (paraclinicos !== '') {
                    setLsOrdenesParaclinicos([...lsOrdenesParaclinicos, DataToInsert]);
                    setOpenSuccess(true);

                    setAddItemClickedEmpresa(false);
                    setParaclinicos('');
                    setProveedor('');
                    setCiudad('');
                    reset();
                } else {
                    setOpenError(true);
                    setErrorMessage("Por favor seleccione un paraclinico");
                }

            } else {
                setOpenError(true);
                setErrorMessage("Este paraclinico ya esta registrado");
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
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
                                        <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                            <TableCell>{lsEstudioParaclinico.filter(x => x.value === Number(row.idParaclinico)).map(x => x.label)}</TableCell>
                                            <TableCell>{lsProveedor.filter(x => x.codiProv === row.idProveedor).map(x => x.nombProv)}</TableCell>
                                            <TableCell>{lsCiudad.filter(x => x.value === Number(row.idCiudad)).map(x => x.label)}</TableCell>
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
                                        </TableRow>))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12}>
                        <Transitions type="collapse" in={addItemClickedEmpresa} position="top-left" direction="up">
                            <Grid container sx={{ pt: 5 }} spacing={2}>

                                <Grid item xs={xsGrid}>
                                    <SelectOnChange
                                        name="idParaclinico"
                                        label="Paraclínicos"
                                        value={paraclinicos}
                                        onChange={handleParaclinicos}
                                        options={lsEstudioParaclinico}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </Grid>

                                {tipoExamenLabor ?
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
                                    </Grid> : tipoExamenRNM ?
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
                                        </Grid> : fechaExmaneFisico ?
                                            <Grid item xs={xsGrid}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha De Examen Físico"
                                                        name="fechaExamenFisico"
                                                        defaultValue={new Date()}
                                                    />
                                                </FormProvider>
                                            </Grid> : null
                                }

                                {fechaExmaneFisico ?
                                    <Fragment>
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
                                    </Fragment> :
                                    <Fragment>
                                        <Grid item xs={xsGrid}>
                                            <SelectOnChange
                                                name="idProveedor"
                                                label="Proveedor"
                                                value={proveedor}
                                                onChange={handleProveedor}
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
                                    </Fragment>}
                            </Grid>

                            <Grid container sx={{ pr: 0.5, pt: 3 }} justifyContent="flex-end">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Button color="error" onClick={() => setAddItemClickedEmpresa(false)}>
                                        Cancelar
                                    </Button>

                                    <Button variant="contained" size="small" onClick={handleSubmit(handleClick)}>
                                        Adicionar
                                    </Button>
                                </Stack>
                            </Grid>
                        </Transitions>

                        <Grid item sx={{ pl: 2, pt: 3 }}>
                            <Button variant="text" onClick={() => setAddItemClickedEmpresa(true)}>
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