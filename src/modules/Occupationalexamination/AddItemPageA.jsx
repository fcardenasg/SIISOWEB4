import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SelectOnChange from 'components/input/SelectOnChange';

import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

// material-ui
import { Button, FormControl, Grid, MenuItem, useMediaQuery, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';

// project imports


import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';

// project imports
import UserDetailsCard from 'ui-component/cards/UserDetailsCard';
import UserProfileCard from 'ui-component/cards/UserProfileCard';
import UserSimpleCard from 'ui-component/cards/UserSimpleCard';
import FollowerCard from 'ui-component/cards/FollowerCard';
import FriendsCard from 'ui-component/cards/FriendsCard';

import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';


// project imports

import { gridSpacing } from 'store/constant';
import InputText from 'components/input/InputText';
import * as yup from 'yup';

import { useFormik } from 'formik';
import { FormProvider, useForm } from 'react-hook-form';


import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';

// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// ==============================|| ADD ITEM PAGE ||============================== //

function AddItemPageA({ handleAddItem, setAddItemClicked }) {

    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [valueCargo, setValueCargo] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItem1, setSelectedItem1] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [amount, setAmount] = useState(0);
    const [errors, setErrors] = useState({
        quantityError: ''
    });
  

    
    const methods = useForm();
  
    const itemList1 = [
        {
            value: 1,
            label: 'REFIERE',

        },
        {
            value: 2,
            label: 'NO REFIERE',

        },
        
    ];

   

    useEffect(() => {
        if (selectedItem?.id) {
            setAmount(selectedItem.amount * selectedQuantity);
        }

        if (selectedItem1?.id) {

        }



    }, [selectedQuantity, selectedItem, selectedItem1]);


    const handleChange1 = (event) => {
        setValueCargo(event.target.value);

   
    }


    const handleChange = (event) => {
        const value = event.target.value;
        if (event.target.name === 'quantity') {
            if (Number(value) < 0) {
                setErrors({
                    ...errors,
                    quantityError: 'Valores negativos no permitidos'
                });
                setSelectedQuantity(value);
            } else if (Number(value) === 0) {
                setErrors({
                    ...errors,
                    quantityError: 'La cantidad no puede ser cero'
                });
                setSelectedQuantity(value);
            } else {
                setSelectedQuantity(value);
                setErrors({
                    ...errors,
                    quantityError: ''
                });
            }
        } else {
       


        }
    };

    const handleOk = () => {
        const data = {
            ...selectedItem,
            ...valueCargo,
            totalAmount: amount,
            selectedQuantity
        };
        handleAddItem(data);

    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
               
            
                        <SelectOnChange
                            name="congenitos"
                            label="Congenitos"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                  
                    </Stack>
                </Grid>


                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                
                        <SelectOnChange
                            name="inmunoprevenible"
                            label="Inmunoprevenible"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
            
                        <SelectOnChange
                            name="infecciosos"
                            label="Infecciosos"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
        
                        <SelectOnChange
                            name="ojos"
                            label="Ojos"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="agudezavisual"
                            label="Agudeza Visual"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="oidos"
                            label="Oidos"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                
                        <SelectOnChange
                            name="nasofaringe"
                            label="Nasofaringe"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="cardiovascular"
                            label="Cardiovascular"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="pulmonar"
                            label="Pulmonar"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="gastrointestinal"
                            label="Gastrointestinal"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="genitourinario"
                            label="Genitourinario"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="neurológico"
                            label="Neurológico"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="problemasdepiel"
                            label="Problemas de Piel"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="osteomusculares"
                            label="Osteomusculares"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="alergicos"
                            label="Alérgicos"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="toxicos"
                            label="Tóxicos"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="farmacologicos"
                            label="Farmacólogicos"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
              
                        <SelectOnChange
                            name="quirurgicos"
                            label="Quirúrgicos"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
     
                        <SelectOnChange
                            name="traumaticos"
                            label="Traumáticos"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
        
                        <SelectOnChange
                            name="transfusiones"
                            label="Transfusiones"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="venereas"
                            label="Venéreas"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="deformidades"
                            label="Deformidades"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="psiquiatrico"
                            label="Psiquiatrico"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
        
                        <SelectOnChange
                            name="farmacodependencia"
                            label="Farmacodependencia"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="Diabetes"
                            label="Diabetes"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="renal"
                            label="Renal"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
  
                        <SelectOnChange
                            name="asma"
                            label="Asma"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="ORL"
                            label="O.R.L."
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <SelectOnChange
                            name="ets"
                            label="ETS"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                                <FormProvider {...methods}>
       
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="especifique"
                                        label="Especifique"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>




                <Grid item container justifyContent="flex-end">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button color="error" onClick={() => setAddItemClicked(false)}>
                            Cancelar
                        </Button>
                        <Button
                            disabled={!selectedItem?.id || !selectedQuantity || Boolean(errors.quantityError)}
                            variant="contained"
                            size="small"
                            onClick={handleOk}
                        >
                            Adicionar
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

AddItemPageA.propTypes = {
    handleAddItem: PropTypes.func,
    setAddItemClicked: PropTypes.func
};

export default AddItemPageA;
