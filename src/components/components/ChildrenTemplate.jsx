import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import InputOnChange from 'components/input/InputOnChange';

const ChildrenTemplate = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [search, setSearch] = useState('');

    return (
        <MainCard>
            <Grid xs={12} constainer spacing={2}>
                <Typography>Algun texto</Typography>

                <Grid item xs={12}>
                    <InputOnChange
                        name=""
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default ChildrenTemplate;