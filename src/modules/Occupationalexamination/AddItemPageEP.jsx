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

function AddItemPageEP({ handleAddItem, setAddItemClicked }) {

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
                            name="refiere"
                            label="Refiere"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                      
                    </Stack>
                </Grid>
   

                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                    <FormProvider {...methods}>    
                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="ano"
                                        label="Año"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
                                    />
                     </FormProvider>
                    </Stack>
                 
                </Grid>

                <Grid item xs={12}>
                                <FormProvider {...methods}>       
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="observacion"
                                        label="Observación"
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

AddItemPageEP.propTypes = {
    handleAddItem: PropTypes.func,
    setAddItemClicked: PropTypes.func
};

export default AddItemPageEP;
