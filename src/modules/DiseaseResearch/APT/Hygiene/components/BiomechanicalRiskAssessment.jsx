import {
    Divider,
    Grid,
    Typography
} from '@mui/material';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import InputCheckBox from 'components/input/InputCheckBox';
import InputRadioGroup from 'components/input/InputRadioGroup';
import InputText from 'components/input/InputText';
import { Fragment, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const PlanoRow = ({ item, nameAplica, nameObservacion }) => {
    const { watch, setValue } = useFormContext();
    const aplica = watch(nameAplica);

    useEffect(() => {
        if (!aplica) {
            setValue(nameObservacion, '');
        }
    }, [aplica, nameObservacion, setValue]);

    return (
        <Fragment>
            <Grid item xs={1.5}>
                <InputCheckBox name={nameAplica} label="Aplica" defaultValue={false} />
            </Grid>

            <Grid item xs={1.5}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item}</Typography>
            </Grid>

            <Grid item xs={9}>
                <InputText
                    name={nameObservacion}
                    label="Descripción"
                    disabled={!aplica}
                />
            </Grid>
        </Fragment>
    );
};

const BiomechanicalRiskAssessment = () => {
    const [lsTipoTrabajo, setLsTipoTrabajo] = useState([]);
    const [lsCargaFisicaOWAS, setLsCargaFisicaOWAS] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerTipoTrabajo = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_TIPO_TRABAJO);
            setLsTipoTrabajo(lsServerTipoTrabajo.data);

            const lsServerCargaFisicaOWAS = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_CARGAFISICAOWAS);
            const dataOrdenada = lsServerCargaFisicaOWAS.data.sort((a, b) => a.value - b.value);
            setLsCargaFisicaOWAS(dataOrdenada);
        }

        getData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Gasto metabólico estimado</Typography>
            </Grid>

            <Grid item xs={12}>
                <InputRadioGroup row name="vcrB_GME_TipoTrabajo" options={lsTipoTrabajo} defaultValue="" />
            </Grid>

            <Grid item xs={12}>
                <InputText name="vcrB_GME_Observacion" label="Observaciones" multiline minRows={2} maxRows={4} />
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12}>
                <Typography variant="h4">Planos de trabajo</Typography>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <PlanoRow item="Plano alto" nameAplica="vcrB_PT_AltoAplica" nameObservacion="vcrB_PT_AltoObservacion" />
                    <PlanoRow item="Plano medio" nameAplica="vcrB_PT_MedioAplica" nameObservacion="vcrB_PT_MedioObservacion" />
                    <PlanoRow item="Plano bajo" nameAplica="vcrB_PT_BajoAplica" nameObservacion="vcrB_PT_BajoObservacion" />
                </Grid>
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12}>
                <InputText name="vcrB_Postura" label="Postura" multiline minRows={2} maxRows={4} />
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h4">Carga física (OWAS)</Typography>
                <Typography variant="body1">De acuerdo con la valoración con la metodología OWAS:</Typography>

                <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <InputRadioGroup label="Carga física global" row name="vcrB_CF_OWAS_Global" options={lsCargaFisicaOWAS} defaultValue="" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputRadioGroup label="Carga física para espalda" row name="vcrB_CF_OWAS_Espalda" options={lsCargaFisicaOWAS} defaultValue="" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputRadioGroup label="Carga física para miembros superiores" row name="vcrB_CF_OWAS_MiembrosSuperiores" options={lsCargaFisicaOWAS} defaultValue="" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputRadioGroup label="Carga física para miembros inferiores" row name="vcrB_CF_OWAS_MiembrosInferiores" options={lsCargaFisicaOWAS} defaultValue="" />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12}>
                <InputText name="vcrB_CF_ANSI" label="Carga física (ANSI)" multiline minRows={2} maxRows={4} />
            </Grid>

            <Grid item xs={12}>
                <InputText name="vcrB_Movimiento" label="Movimientos" multiline minRows={2} maxRows={4} />
            </Grid>

            <Grid item xs={12}>
                <InputText name="vcrB_Fuerza" label="Fuerza" multiline minRows={2} maxRows={4} />
            </Grid>

            <Grid item xs={12}>
                <InputText name="vcrB_Vibracion" label="Vibración" multiline minRows={2} maxRows={4} />
            </Grid>
        </Grid>
    )
}

export default BiomechanicalRiskAssessment