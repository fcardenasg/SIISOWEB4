import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';

import { Card, CardContent, Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

const ChartHistory = ({ data, theme, user }) => {
    /* const [texto, setTexto] = useState('');

    var ultimaPosicion = data.length - 1;
    var textoCompleto = data[ultimaPosicion]?.text;
    const velocidadEscritura = 10;

    useEffect(() => {
        setTexto('');
        let index = 0;
        const timer = setInterval(() => {
            setTexto(textoCompleto?.slice(0, index));
            index++;

            if (index > textoCompleto?.length) {
                clearInterval(timer);
            }
        }, velocidadEscritura);

        return () => clearInterval(timer);
    }, [ultimaPosicion]); */ // Se ejecuta solo al montar el componente

    return (
        <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
                {data.map((history, index) => (
                    <Fragment key={index}>
                        {history.from !== user?.nameuser ? (
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={2} />
                                    <Grid item xs={10}>
                                        <Card
                                            sx={{
                                                display: 'inline-block',
                                                float: 'right',
                                                bgcolor: theme.palette.mode === 'dark' ? 'grey.600' : theme.palette.primary.light
                                            }}
                                        >
                                            <CardContent sx={{ p: 2, pb: '16px !important', width: 'fit-content', ml: 'auto' }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography noWrap={true} variant="body2" color={theme.palette.mode === 'dark' ? 'dark.900' : ''}>
                                                            {history.text}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography
                                                            align="right"
                                                            variant="subtitle2"
                                                            color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                        >
                                                            {history.time}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} sm={7}>
                                        <Card
                                            sx={{
                                                display: 'inline-block',
                                                float: 'left',
                                                background:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark[900] : theme.palette.secondary.light
                                            }}
                                        >
                                            <CardContent sx={{ p: 2, pb: '16px !important' }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2">{history.text}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography align="right" variant="subtitle2">
                                                            {history.time}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Fragment>
                ))}
            </Grid>
        </Grid>
    )
};

ChartHistory.propTypes = {
    theme: PropTypes.object,
    data: PropTypes.array,
    user: PropTypes.object
};

export default ChartHistory;
