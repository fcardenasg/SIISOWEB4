import PropTypes from 'prop-types';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    FormHelperText,
    Grid,
    TextField,
    useMediaQuery
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

// third-party
import * as yup from 'yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

// ==============================|| COMMENT TEXTFIELD ||============================== //

const FormInput = ({ bug, label, size, fullWidth = true, name, required, ...others }) => {
    let isError = false;
    let errorMessage = '';
    if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
        isError = true;
        errorMessage = bug[name].message;
    }

    return (
        <>
            <Controller
                as={TextField}
                name={name}
                defaultValue=""
                label={label}
                size={size}
                fullWidth={fullWidth}
                InputLabelProps={{
                    className: required ? 'required-label' : '',
                    required: required || false
                }}
                error={isError}
                {...others}
            />
            {errorMessage && (
                <Grid item xs={12}>
                    <FormHelperText error>{errorMessage}</FormHelperText>
                </Grid>
            )}
        </>
    );
};

FormInput.propTypes = {
    bug: PropTypes.object,
    size: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool
};

// ==============================|| SOCIAL PROFILE - POST ||============================== //

const validationSchema = yup.object().shape({
    nombre: yup.string().required('Comment Field is Required')
});

const Post = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, errors, reset } = methods;



    async function postData(url = "", datas = {}) {
        axios({
            method: 'post',
            url: url,
            data: datas
        }).then((res) => { console.log(res) }).catch((error) => { console.log(error) });
    }

    const onSubmit = async (datos) => {
        console.log("Datos = ", datos);

        postData('https://localhost:44347/api/TipoCatalogo', datos);
        reset();
    };

    const navigate = useNavigate();

    return (
        <MainCard
            title="Registrar Tipo de Catalogo"
            secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} />}
        >
            <Grid item xs={12} sx={{ pt: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Grid item xs zeroMinWidth sx={{ pb: 2 }}>
                                <FormProvider {...methods}>
                                    <FormInput
                                        fullWidth
                                        name="nombre"
                                        label="Nombre"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item>
                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="contained" fullWidth type="submit">
                                                    Guardar
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => navigate("/typecatalog/list")}>
                                                    Cancel
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </MainCard>
    );
};

export default Post;