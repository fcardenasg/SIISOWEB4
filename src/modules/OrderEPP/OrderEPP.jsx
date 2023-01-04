import { useState, Fragment, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Tooltip,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import BiotechIcon from '@mui/icons-material/Biotech';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ImageIcon from '@mui/icons-material/Image';

import ListMedicalFormula from '../Programming/Attention/OccupationalExamination/MedicalOrder/ListMedicalFormula';
import MedicalFormula from '../Programming/Attention/OccupationalExamination/MedicalOrder/MedicalFormula';
import UpdateMedicalFormula from '../Programming/Attention/OccupationalExamination/MedicalOrder/UpdateMedicalFormula';
import DialogFormula from '../Programming/Attention/OccupationalExamination/Modal/DialogFormula';
import { ColorDrummondltd } from 'themes/colors';

import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import InputDatePicker from 'components/input/InputDatePicker';
import ViewEmployee from 'components/views/ViewEmployee';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import DetailedIcon from 'components/controllers/DetailedIcon';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdOrderEPP, InsertOrderEPP } from 'api/clients/OrderEPPClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { CodCatalogo, Message, TitleButton, DefaultData, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostOrderEPP } from 'formatdata/OrderEPPForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import ViewPDF from 'components/components/ViewPDF';
import { generateReport } from '../Programming/Attention/Report/MedicalAdvice';
import { GetByMail } from 'api/clients/UserClient';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SelectOnChange from 'components/input/SelectOnChange';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import UpdateAttMedicalAdvice from 'modules/Programming/Attention/AttentionMedicalAdvice/UpdateAttMedicalAdvice';
import HoverSocialCard from 'modules/OccupationalExamination/Framingham/HoverSocialCard';
import { GetAllSupplier } from 'api/clients/SupplierClient';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Apuntes Personales', icons: <NoteAltIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const dataMedicalOrders = [
    {
        open: true,
        title: 'Formula',
        subtitle: 'Formula',
        iconPrimary: AssignmentIcon,
        color: ColorDrummondltd.RedDrummond,
    },
    {
        open: true,
        title: 'Laboratorio',
        subtitle: 'Laboratorio',
        iconPrimary: BiotechIcon,
        color: ColorDrummondltd.RedDrummond,
    },
    {
        open: true,
        title: 'Imagenes',
        subtitle: 'Imagenes',
        iconPrimary: ImageIcon,
        color: ColorDrummondltd.RedDrummond,
    },
    {
        open: true,
        title: 'Examenes',
        subtitle: 'Examenes',
        iconPrimary: FolderOpenIcon,
        color: ColorDrummondltd.RedDrummond,
    },
]

const OrderEPP = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');
    const [lsProveedor, setLsProveedor] = useState([]);
    const [openApuntesPersonales, setOpenApuntesPersonales] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openFormula, setOpenFormula] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [listMedicalFormula, setListMedicalFormula] = useState(true);
    const [newMedicalFormula, setNewMedicalFormula] = useState(false);
    const [updateMedicalFormula, setUpdateMedicalFormula] = useState(false);
    const [numberId, setNumberId] = useState('');

    const [textTipoAsesoria, setTextTipoAsesoria] = useState('');
    const [textMotivo, setTextMotivo] = useState('');
    const [lsSubmotivo, setLsSubmotivo] = useState([]);
    const [lsCodigoMotivo, setLsCodigoMotivo] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [resultData, setResultData] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);

    const [userEdit, setUserEdit] = useState(false);

    const methods = useForm();
    const { handleSubmit, reset } = methods;

    async function getAll() {
        try {
            const lsServerTipoAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ASME_TIPOASESORIA);
            var resultTipoAsesoria = lsServerTipoAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoAsesoria(resultTipoAsesoria);

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MotivoMedica);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);
            setLsCodigoMotivo(lsServerMotivo.data.entities);

            setLsAtencion([{ id: 0 }]);


            const lsServerProveedor = await GetAllSupplier(0, 0);
            var resultProveedor = lsServerProveedor.data.entities.map((item) => ({
                value: item.codiProv,
                label: item.nombProv
            }));
            setLsProveedor(resultProveedor);


            
        } catch (error) { }
    }

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value !== "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorDocumento}`);
                }
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(`${Message.ErrorDeDatos}`);
        }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdOrderEPP(resultData.id);
            const lsDataUser = await GetByMail(user.email);

            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleCallClick = () => {
        setUserEdit(true);
    }

    const handleMotivo = async (event) => {
        try {
            setTextMotivo(event.target.value);

            var lsResulCode = String(lsCodigoMotivo.filter(code => code.idCatalogo === event.target.value).map(code => code.codigo));
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

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PostOrderEPP(documento, FormatDate(datos.fecha), datos.idProvedor, user.nameuser, FormatDate(new Date()),
                '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                if (documento !== '' && lsEmployee.length !== 0) {
                    const result = await InsertOrderEPP(DataToUpdate);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                        setResultData(result.data);
                        reset();
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorDocumento);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <FullScreenDialog
                open={openTemplate}
                title="LISTADO DE PLANTILLA"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>

            <FullScreenDialog
                open={openApuntesPersonales}
                title="APUNTES PERSONALES"
                handleClose={() => setOpenApuntesPersonales(false)}
            >
                <ListPersonalNotesAll />
            </FullScreenDialog>

            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

            <ControlModal
                title="VISTA DE REPORTE"
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <ControlModal
                title={"Orden de " + titleModal}
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    setListMedicalFormula(true);
                    setNewMedicalFormula(false);
                    setUpdateMedicalFormula(false);
                    setNewMedicalFormula(false)
                }}
                maxWidth="md"
            >
                {newMedicalFormula ?
                    <MedicalFormula
                        contingencia={DefaultValue.SINREGISTRO_GLOBAL}
                        setUpdateMedicalFormula={setUpdateMedicalFormula}
                        setListMedicalFormula={setListMedicalFormula}
                        setNewMedicalFormula={setNewMedicalFormula}
                        tipoOrden={titleModal}
                        lsEmployee={lsEmployee}
                        setDocumento={setDocumento}
                        documento={documento}
                        lsAtencion={lsAtencion}
                    />
                    : listMedicalFormula ?
                        <ListMedicalFormula
                            documento={documento}
                            tipoOrden={titleModal}
                            setListMedicalFormula={setListMedicalFormula}
                            setNewMedicalFormula={setNewMedicalFormula}
                            setUpdateMedicalFormula={setUpdateMedicalFormula}
                            setNumberId={setNumberId}
                        />
                        : updateMedicalFormula ?
                            <UpdateMedicalFormula
                                contingencia={DefaultValue.SINREGISTRO_GLOBAL}
                                setListMedicalFormula={setListMedicalFormula}
                                setNewMedicalFormula={setNewMedicalFormula}
                                setUpdateMedicalFormula={setUpdateMedicalFormula}
                                numberId={numberId}
                                lsEmployee={lsEmployee}
                                lsAtencion={lsAtencion}
                                tipoOrden={titleModal}
                            /> : null
                }
            </ControlModal>

            <DialogFormula
                title="TIPO DE ORDEN"
                open={openFormula}
                handleCloseDialog={() => setOpenFormula(false)}
            >
                {dataMedicalOrders.map(data =>
                    <Grid item xs={12}>
                        <HoverSocialCard
                            onClick={() => { setOpenForm(data.open); setTitleModal(data.title) }}
                            secondary={data.subtitle}
                            iconPrimary={data.iconPrimary}
                            color={data.color}
                        />
                    </Grid>
                )}
            </DialogFormula>

            <Fragment>

                <UpdateAttMedicalAdvice setUserEdit={setUserEdit} userEdit={userEdit}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ViewEmployee
                                    key={lsEmployee.documento}
                                    documento={documento}
                                    onChange={(e) => setDocumento(e.target.value)}
                                    lsEmployee={lsEmployee}
                                    handleDocumento={handleDocumento}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <SubCard darkTitle title={<Typography variant="h4">REGISTRAR LA  ATENCIÓN</Typography>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputDatePicker
                                                    label="Fecha"
                                                    name="fecha"
                                                    defaultValue={new Date()}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idProvedor"
                                                    label="Provedor"
                                                    options={lsProveedor}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>

                                   

                                    

                                    </Grid>

                                    <Grid container spacing={2} sx={{ pt: 4 }}>
                                        <Grid item xs={2.4}>
                                            <AnimateButton>
                                                <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                                    {TitleButton.Guardar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={2.4}>
                                            <AnimateButton>
                                                <Button disabled={resultData.length === 0 ? true : false} variant="outlined" fullWidth onClick={handleClickReport}>
                                                    {TitleButton.Imprimir}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>


                                        <Grid item xs={2.4}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => navigate("/orderepp/list")}>
                                                    {TitleButton.Cancelar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </UpdateAttMedicalAdvice>

            </Fragment>
        </Fragment>
    );
};

export default OrderEPP;