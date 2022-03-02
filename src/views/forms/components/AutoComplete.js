// material-ui
import { useTheme } from '@mui/material/styles';
import { Autocomplete, Grid, InputAdornment, TextField } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// assets
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';

// autocomplete options
const top100Films = [
    { label: 'The Dark Knight', value: 1 },
    { label: 'Control with Control', value: 2 },
    { label: 'Combo with Solo', value: 3 },
    { label: 'The Dark', value: 4 },
    { label: 'Fight Club', value: 5 },
    { label: 'demo@company.com', value: 6 },
    { label: 'Pulp Fiction', value: 7 }
];

// ==============================|| AUTOCOMPLETE ||============================== //

const AutoComplete = () => {
    const theme = useTheme();
    return (
        <MainCard
            title="Autocomplete"
            secondary={<SecondaryAction link="https://next.material-ui.com/components/autocomplete/#main-content" />}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6} lg={4}>
                    <SubCard title="Combo Box">
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <Autocomplete
                                    disableClearable
                                    options={top100Films}
                                    onChange={(value) => { console.log(value) }}
                                    defaultValue={top100Films[0]}
                                    renderInput={(params) => <TextField {...params} label="" />}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    disablePortal
                                    options={top100Films}
                                    defaultValue={top100Films[1]}
                                    renderInput={(params) => <TextField {...params} label="" />}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    disablePortal
                                    options={top100Films}
                                    defaultValue={top100Films[2]}
                                    renderInput={(params) => <TextField {...params} label="" />}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <SubCard title="With Caption">
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <Autocomplete
                                    disablePortal
                                    options={top100Films}
                                    defaultValue={top100Films[5]}
                                    renderInput={(params) => <TextField {...params} label="Email Address" />}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    disablePortal
                                    options={top100Films}
                                    defaultValue={top100Films[5]}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Email Address"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailTwoToneIcon fontSize="small" sx={{ color: theme.palette.grey[700] }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <SubCard title="Combo with Multiple Options">
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <Autocomplete
                                    multiple
                                    options={top100Films}
                                    getOptionLabel={(option) => option.label}
                                    defaultValue={[top100Films[0], top100Films[4]]}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default AutoComplete;
