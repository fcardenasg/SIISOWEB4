import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import InputSwitch from 'components/input/InputSwitch'
import { Divider, Grid, useMediaQuery, Button } from '@mui/material';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePick from 'components/input/InputDatePick';
import { useTheme } from '@mui/material/styles';
import InputOnChange from 'components/input/InputOnChange';
import { GetByIdQuestionnaire } from 'api/clients/QuestionnaireClient';
import { SNACKBAR_OPEN } from 'store/actions';
import { useDispatch } from 'react-redux';
import { GetAllCatalog } from 'api/clients/CatalogClient';

const Vaccination = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [form, setForm] = useState(false);
    const [document, setDocument] = useState('');
    const [catalog, setCatalog] = useState([]);

    const [laboratorioPrimera, setLaboratorioPrimera] = useState(73);
    const [dosisPrimera, setDosisPrimera] = useState(73);
    const [laboratorioSegunda, setLaboratorioSegunda] = useState(73);
    const [dosisSegunda, setDosisSegunda] = useState(73);
    const [laboratorioTercera, setLaboratorioTercera] = useState(73);
    const [dosisTercera, setDosisTercera] = useState(73);

    const [fechaPrimera, setFechaPrimera] = useState(new Date());
    const [fechaSegunda, setFechaSegunda] = useState(new Date());
    const [fechaTercera, setFechaTercera] = useState(new Date());

    const handleDocument = async (event) => {
        try {
            setDocument(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    const documento = event?.target.value;

                    var lsQuestionnaire = await GetByIdQuestionnaire(documento);

                    if (lsQuestionnaire.status === 200) {
                        setLaboratorioPrimera(lsQuestionnaire.data.laboratorioPrimera);
                        setDosisPrimera(lsQuestionnaire.data.dosisPrimera);
                        setLaboratorioSegunda(lsQuestionnaire.data.laboratorioSegunda);
                        setDosisSegunda(lsQuestionnaire.data.dosisSegunda);
                        setLaboratorioTercera(lsQuestionnaire.data.laboratorioTercera);
                        setDosisTercera(lsQuestionnaire.data.dosisTercera);
                        setFechaPrimera(new Date(lsQuestionnaire.data.fechaPrimera));
                        setFechaSegunda(new Date(lsQuestionnaire.data.fechaSegunda));
                        setFechaTercera(new Date(lsQuestionnaire.data.fechaTercera));
                    }
                } else {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: 'Por favor, ingrese su número de documento',
                        variant: 'alert',
                        alertSeverity: 'error',
                        close: false,
                        transition: 'SlideUp'
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {

            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalog = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(resultCatalog);
        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    const handleSwitch = (event) => {
        setForm(event.target.checked);
    }

    return (
        <MainCard title="Información de Vacunación">
            <Grid container xs={12} justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                    <InputSwitch
                        label="Vacunado"
                        onChange={handleSwitch}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputOnChange
                        label="N° Documento"
                        onKeyDown={handleDocument}
                        onChange={(e) => setDocument(e?.target.value)}
                        value={document}
                        size={matchesXS ? 'small' : 'medium'}
                        required={true}
                        helperText="Por favor, dar Enter"
                    />
                </Grid>
            </Grid>

            <Divider sx={{ pt: 2 }} />

            {form ? (
                <>
                    <Grid container justifyContent="center" alignItems="center" xs={12} sx={{ pt: 3 }}>
                        <Grid container>
                            <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                                <Grid item xs={4}>
                                    <SelectOnChange
                                        name="laboratorioPrimera"
                                        label="Laboratorio"
                                        disabled
                                        value={laboratorioPrimera}
                                        options={catalog}
                                        onChange={(e) => setLaboratorioPrimera(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <SelectOnChange
                                        name="dosisPrimera"
                                        label="Dosis"
                                        disabled
                                        value={dosisPrimera}
                                        options={catalog}
                                        onChange={(e) => setDosisPrimera(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputDatePick
                                        label="Fecha 1era dosis"
                                        disabled
                                        value={fechaPrimera}
                                        onChange={(e) => setFechaPrimera(e)}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container xs={12} spacing={2} sx={{ pb: 3 }}>
                                <Grid item xs={4}>
                                    <SelectOnChange
                                        name="laboratorioSegunda"
                                        label="Laboratorio"
                                        disabled
                                        value={laboratorioSegunda}
                                        options={catalog}
                                        onChange={(e) => setLaboratorioSegunda(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <SelectOnChange
                                        name="dosisSegunda"
                                        label="Dosis"
                                        disabled
                                        value={dosisSegunda}
                                        options={catalog}
                                        onChange={(e) => setDosisSegunda(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputDatePick
                                        label="Fecha 2era dosis"
                                        disabled
                                        value={fechaSegunda}
                                        onChange={(e) => setFechaSegunda(e)}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container xs={12} spacing={2} sx={{ pb: 3 }}>
                                <Grid item xs={4}>
                                    <SelectOnChange
                                        name="laboratorioTercera"
                                        label="Laboratorio"
                                        disabled
                                        value={laboratorioTercera}
                                        options={catalog}
                                        onChange={(e) => setLaboratorioTercera(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <SelectOnChange
                                        name="dosisTercera"
                                        label="Dosis"
                                        disabled
                                        value={dosisTercera}
                                        options={catalog}
                                        onChange={(e) => setDosisTercera(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputDatePick
                                        label="Fecha 3era dosis"
                                        disabled
                                        value={fechaTercera}
                                        onChange={(e) => setFechaTercera(e)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            ) : (<></>)}
        </MainCard>
    );
}

export default Vaccination;