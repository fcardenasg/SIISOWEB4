import { Button, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { GetAllIndicadores, GetByIdIndicadores } from "api/clients/IndicadoresClient";
import { TitleButton } from "components/helpers/Enums";
import SelectOnChange from "components/input/SelectOnChange";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";

const IndicatorsAdvanced = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [idIndicador, setIdIndicador] = useState('');
    const [dataResult, setDataResult] = useState([]);
    const [lsIndicador, setLsIndicador] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetAllIndicadores(2);
                if (lsServer.status === 200) {
                    setLsIndicador(lsServer.data);
                    setIdIndicador(lsServer.data[0].value);

                    var resultIndicadores = await GetByIdIndicadores(lsServer.data[0]?.value);
                    setDataResult(resultIndicadores.data);
                }
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleChangeIndicadores = async (event) => {
        try {
            setIdIndicador(event.target.value);
            var resultIndicadores = await GetByIdIndicadores(event.target.value);
            setDataResult(resultIndicadores.data);
        } catch (error) { }
    };

    return (
        <Fragment>
            <MainCard title="Indicadores del área de salud ocupacional - modo avanzado" secondary={
                <AnimateButton>
                    <Button variant="outlined" fullWidth onClick={() => navigate("/indicators/menu")}>
                        {TitleButton.Cancelar}
                    </Button>
                </AnimateButton>}
            >
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <SelectOnChange
                        name="idIndicadores"
                        label="Indicadores"
                        value={idIndicador}
                        options={lsIndicador}
                        onChange={handleChangeIndicadores}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}>
                    {dataResult.length === 0 ? null :
                        <SubCard title={`Indicadores De ${dataResult.nombre}`} secondary={
                            <Button component="a" href={dataResult.urlExportar}
                                target="_blank" >
                                Exportar
                            </Button>}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <iframe
                                        title={dataResult.nombre}
                                        width="1150"
                                        height="450"
                                        src={dataResult.urlReporte}
                                        frameborder="0"
                                        allowFullScreen="true">
                                    </iframe>
                                </Grid>
                            </Grid>
                        </SubCard>
                    }
                </Grid>

            </MainCard>
        </Fragment>
    )
}

export default IndicatorsAdvanced;