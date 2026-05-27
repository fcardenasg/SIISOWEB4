import {
    Grid,
    Paper,
    Typography
} from '@mui/material';

import {
    useState
} from 'react';

import InputOnChange from 'components/input/InputOnChange';
import InputSelect from 'components/input/InputSelect';

import {
    GetAllByCodeOrName
} from 'api/clients/CIE11Client';

const DiagnosisAPT = ({
    dx1,
    dx2,
    dx3,
    setDx1,
    setDx2,
    setDx3
}) => {

    // =========================
    // STATES
    // =========================

    const [textDx1, setTextDx1] =
        useState('');

    const [textDx2, setTextDx2] =
        useState('');

    const [textDx3, setTextDx3] =
        useState('');

    const [lsDx1, setLsDx1] =
        useState([]);

    const [lsDx2, setLsDx2] =
        useState([]);

    const [lsDx3, setLsDx3] =
        useState([]);

    // =========================
    // SEARCH DX1
    // =========================

    const handleDx1 = async () => {

        try {

            const result =
                await GetAllByCodeOrName(
                    textDx1
                );

            const data =
                result?.data?.data || [];

            setLsDx1(

                data.map(item => ({

                    value:
                        item.codigo,

                    label:
                        `${item.codigo} - ${item.descripcion}`,

                    codigo:
                        item.codigo,

                    descripcion:
                        item.descripcion
                }))
            );

        } catch (error) {

            console.log(error);
        }
    };

    // =========================
    // SEARCH DX2
    // =========================

    const handleDx2 = async () => {

        try {

            const result =
                await GetAllByCodeOrName(
                    textDx2
                );

            const data =
                result?.data?.data || [];

            setLsDx2(

                data.map(item => ({

                    value:
                        item.codigo,

                    label:
                        `${item.codigo} - ${item.descripcion}`,

                    codigo:
                        item.codigo,

                    descripcion:
                        item.descripcion
                }))
            );

        } catch (error) {

            console.log(error);
        }
    };

    // =========================
    // SEARCH DX3
    // =========================

    const handleDx3 = async () => {

        try {

            const result =
                await GetAllByCodeOrName(
                    textDx3
                );

            const data =
                result?.data?.data || [];

            setLsDx3(

                data.map(item => ({

                    value:
                        item.codigo,

                    label:
                        `${item.codigo} - ${item.descripcion}`,

                    codigo:
                        item.codigo,

                    descripcion:
                        item.descripcion
                }))
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <Grid
            container
            spacing={2}
        >

            {/* ========================= */}
            {/* DX1 */}
            {/* ========================= */}

            <Grid item xs={12}>

                <Paper
                    elevation={1}
                    sx={{
                        p: 2
                    }}
                >

                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2
                        }}
                    >
                        DX1
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid item xs={12} md={3}>

                            <InputOnChange
                                label="Buscar DX1"
                                onChange={(e) =>
                                    setTextDx1(
                                        e.target.value
                                    )
                                }
                                onBlur={handleDx1}
                                value={textDx1}
                            />

                        </Grid>

                        <Grid item xs={12} md={9}>

                                                <InputSelect
                            defaultValue=""
                            name="dx1Temp"
                            label="Diagnóstico DX1"
                            options={lsDx1}
                            value={dx1}
                            onChange={(e) =>
                                setDx1(e)
                            }
                        />

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

            {/* ========================= */}
            {/* DX2 */}
            {/* ========================= */}

            <Grid item xs={12}>

                <Paper
                    elevation={1}
                    sx={{
                        p: 2
                    }}
                >

                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2
                        }}
                    >
                        DX2
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid item xs={12} md={3}>

                            <InputOnChange
                                label="Buscar DX2"
                                onChange={(e) =>
                                    setTextDx2(
                                        e.target.value
                                    )
                                }
                                onBlur={handleDx2}
                                value={textDx2}
                            />

                        </Grid>

                        <Grid item xs={12} md={9}>

                                            <InputSelect
                        defaultValue=""
                        name="dx2Temp"
                        label="Diagnóstico DX2"
                        options={lsDx2}
                        value={dx2}
                        onChange={(e) =>
                            setDx2(e)
                        }
                    />

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

            {/* ========================= */}
            {/* DX3 */}
            {/* ========================= */}

            <Grid item xs={12}>

                <Paper
                    elevation={1}
                    sx={{
                        p: 2
                    }}
                >

                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2
                        }}
                    >
                        DX3
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid item xs={12} md={3}>

                            <InputOnChange
                                label="Buscar DX3"
                                onChange={(e) =>
                                    setTextDx3(
                                        e.target.value
                                    )
                                }
                                onBlur={handleDx3}
                                value={textDx3}
                            />

                        </Grid>

                        <Grid item xs={12} md={9}>

                                                <InputSelect
                            defaultValue=""
                            name="dx3Temp"
                            label="Diagnóstico DX3"
                            options={lsDx3}
                            value={dx3}
                            onChange={(e) =>
                                setDx3(e)
                            }
                        />

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

        </Grid>
    );
};

export default DiagnosisAPT;