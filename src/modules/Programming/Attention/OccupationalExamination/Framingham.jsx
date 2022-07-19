import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    useMediaQuery,
    Grid, Typography, Divider
} from '@mui/material';

import { IconHeartbeat } from '@tabler/icons';

import TableAntecedentes from './TableEmo/TableAntecedentes';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import ListPlantillaAll from 'components/template/ListPlantillaAll';

import InputOnChange from 'components/input/InputOnChange';
import DetailedIcon from 'components/controllers/DetailedIcon';
import Accordion from 'components/accordion/Accordion';
import { FormProvider } from 'react-hook-form';
import SubCard from 'ui-component/cards/SubCard';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import InputDatePicker from 'components/input/InputDatePicker';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import SelectOnChange from 'components/input/SelectOnChange';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
]

const Framingham = ({
    atencion,
    setSexo, sexo,
    setEdad, edad,
    setFrFuma, frFuma,
    setFrColesterol, frColesterol,
    setFrTencion, frTencion,

    handleFuma,
    handleColesterol,
    handleGlicemia,

    handleFrPuntaje,
    handleFrEdad,
    handleFrHdl,
    setFrGlicemia,
    handleTencion,

    fuma,
    colesterol,
    glicemia,
    tencion,
    frEdad,
    frHdl,
    frGlicemia,
    frTabaquismo,
    frPuntaje,

    errors,
    documento,
    ...methods
}) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsOpcion, setLsOpcion] = useState([]);

    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [cadenaHistory, setCadenaHistory] = useState('');

    async function GetAll() {
        try {
            const lsServerOpcion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultOpcion = lsServerOpcion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOpcion(resultOpcion);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [documento]);

    return (
        <Fragment>
            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

            <FullScreenDialog
                open={openTemplate}
                title="LISTADO DE PLANTILLA"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>

            <FullScreenDialog
                open={openHistory}
                title="VISTA DE HISTÓRICO"
                handleClose={() => setOpenHistory(false)}
            >
                <TableAntecedentes documento={documento} param={cadenaHistory} />
            </FullScreenDialog>

            <Accordion title={<><IconHeartbeat />
                <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">FRAMINGHAM</Typography></>}>

                <SubCard darkTitle title={<Typography variant="h4">INFORMACIÓN CARDIOVASCULAR</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputDatePicker
                                    label="Fecha"
                                    name="fechaFRA"
                                    defaultValue={new Date()}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <InputOnChange
                                disabled
                                label="Fr Edad"
                                onChange={(e) => setEdad(e.target.value)}
                                value={edad}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputOnChange
                                disabled
                                label="Sexo"
                                onChange={(e) => setSexo(e.target.value)}
                                value={sexo}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <SelectOnChange
                                name="fumaFRA"
                                label="Fuma"
                                value={fuma}
                                onChange={handleFuma}
                                options={lsOpcion}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputOnChange
                                name="tencionFRA"
                                label="Tensión Arterial"
                                onChange={handleTencion}
                                value={tencion}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputDatePicker
                                    label="Fecha Laboratorio"
                                    name="fechaLaboratorioFRA"
                                    defaultValue={new Date()}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2.4}>
                            <InputOnChange
                                type="number"
                                name="colesterolTotalFRA"
                                label="Colesterol Total"
                                onChange={handleColesterol}
                                value={colesterol}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={2.4}>
                            <InputOnChange
                                disabled
                                name="hDLFRA"
                                label="HDL"
                                onChange={handleFrHdl}
                                value={frHdl}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={2.4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="triglicericosFRA"
                                    label="Trigliceridos"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="lDLFRA"
                                    label="LDL"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2.4}>
                            <InputOnChange
                                type="number"
                                name="glisemiaFRA"
                                label="Glicemia"
                                onChange={handleGlicemia}
                                value={glicemia}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    fullWidth
                                    name="observacionFRA"
                                    label="Observación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                title={DetailIcons[0].title}
                                onClick={() => setOpenTemplate(true)}
                                icons={DetailIcons[0].icons}
                            />

                            <DetailedIcon
                                title={DetailIcons[1].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                title={DetailIcons[2].title}
                                onClick={() => { setOpenHistory(true); setCadenaHistory('INFORMACION_CARDIOVASCULAR') }}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="relacionFRA"
                                    label="Relación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <InputOnChange
                                disabled
                                label="Fr Edad"
                                onChange={handleFrEdad}
                                value={frEdad}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <InputOnChange
                                disabled
                                name="fRHDLFRA"
                                label="Fr Colesterol"
                                onChange={(e) => setFrColesterol(e.target.value)}
                                value={frColesterol}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <InputOnChange
                                disabled
                                name="fRHDLFRA"
                                label="Fr HDL"
                                onChange={handleFrHdl}
                                value={frHdl}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <InputOnChange
                                disabled
                                label="FR Glicemia"
                                onChange={(e) => setFrGlicemia(e.target.value)}
                                value={frGlicemia}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <InputOnChange
                                disabled
                                label="Fr Tención Arterial"
                                onChange={(e) => setFrTencion(e.target.value)}
                                value={frTencion}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <InputOnChange
                                disabled
                                label="Fr Tabaquismo"
                                onChange={(e) => setFrFuma(e.target.value)}
                                value={frFuma}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="puntajeFRA"
                                    label="Puntaje"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="riesgoAbsolutoFRA"
                                    label="Riesgo Absoluto  "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="riesgoRelativoFRA"
                                    label="Riesgo Relativo  "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="interpretacionFRA"
                                    label="Interpretación  "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>

            </Accordion>
            <Divider />
        </Fragment>
    );

}

export default Framingham;

Framingham.propTypes = {
    atencion: PropTypes.string,
    setSexo: PropTypes.any, sexo: PropTypes.any,
    setEdad: PropTypes.any, edad: PropTypes.any,
    setFrFuma: PropTypes.any, frFuma: PropTypes.any,
    setFrColesterol: PropTypes.any, frColesterol: PropTypes.any,
    setFrTencion: PropTypes.any, frTencion: PropTypes.any,

    handleFuma: PropTypes.func,
    handleFrPuntaje: PropTypes.func,
    handleFrEdad: PropTypes.func,
    handleColesterol: PropTypes.func,
    handleFrHdl: PropTypes.func,
    setFrGlicemia: PropTypes.func,
    handleTencion: PropTypes.func,
    handleGlicemia: PropTypes.func,

    frEdad: PropTypes.any,
    colesterol: PropTypes.any,
    frHdl: PropTypes.any,
    frGlicemia: PropTypes.any,
    tencion: PropTypes.any,
    frTabaquismo: PropTypes.any,
    frPuntaje: PropTypes.any,
    glicemia: PropTypes.any,
    fuma: PropTypes.any,



    errors: PropTypes.any,
    documento: PropTypes.string,
};