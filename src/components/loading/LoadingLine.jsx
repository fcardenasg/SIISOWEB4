import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';

import { withStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Grid, LinearProgress, Typography } from '@mui/material';

const BorderLinearProgress = withStyles(() => ({
    root: {
        height: 10,
        borderRadius: 5
    },
    bar: {
        borderRadius: 5
    }
}))(LinearProgress);

const LoadingLine = () => {
    const theme = useTheme();
    const [progress, setProgress] = useState(0);

    const progressRef = useRef(() => { });
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                const diff = Math.random() * 10;
                setProgress(progress + diff);
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Grid item xs={12} sm={6}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            <Typography variant="caption">Progress</Typography>
                        </Grid>
                        <Grid item xs sx={{ color: theme.palette.success.main }}>
                            <BorderLinearProgress color="inherit" variant="determinate" value={progress} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">{Math.round(progress)}%</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LoadingLine;