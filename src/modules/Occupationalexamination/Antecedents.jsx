import React, { useEffect, useState } from 'react';
// material-ui
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Button, Grid, MenuItem, TextField, Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormHelperText,
    Select,
    Stack,
    Box, Tab, Tabs,
    useMediaQuery,
    Typography,
    Tooltip,
    Fab,
    Avatar,
    Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Modal

} from '@mui/material';



// Terceros
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
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import InputText from 'components/input/InputText';
import * as yup from 'yup';
import ProductsPageA from './ProductsPageA';
import ProductsPageEP from './ProductsPageEP';
import TotalCardA from './TotalCardA';
import { useFormik } from 'formik';
import { FormProvider, useForm } from 'react-hook-form';
import AddItemPageA from './AddItemPageA';
import AddItemPageEP from './AddItemPageEP';

import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';

// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



const initialProducsData = [
    {
        id: 1,
        product: 'Logo Design',
        description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
        cargo: 'Gerente',
        quantity: 6,
        amount: 200.0,

    },
    {
        id: 2,
        product: 'Landing Page',
        description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
        cargo: 'Ingeniero de sistemas',
        quantity: 7,
        amount: 100.0,

    },
    {
        id: 3,
        product: 'Admin Template',
        description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
        cargo: 'Supervisor',
        quantity: 5,
        amount: 150.0,

    }
];

const initialProducsDataEP = [
    {
        id: 1,
        product: 'Logo Design',
        description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
        cargo: 'Gerente',
        quantity: 6,
        amount: 200.0,

    },
    {
        id: 2,
        product: 'Landing Page',
        description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
        cargo: 'Ingeniero de sistemas',
        quantity: 7,
        amount: 100.0,

    },
    {
        id: 3,
        product: 'Admin Template',
        description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
        cargo: 'Supervisor',
        quantity: 5,
        amount: 150.0,

    }
];

// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //

const Antecedents = () => {

    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [currency, setCurrency] = useState('Washington');
    const handleChange1 = (event) => {
        setCurrency(event.target.value);
    };

    const [productsData, setProductsData] = useState(initialProducsData);
    const [productsDataEP, setProductsDataEP] = useState(initialProducsDataEP);
    const [valueBasic, setValueBasic] = React.useState(new Date());
    const [addItemClicked, setAddItemClicked] = useState(false);


    const [experience, setExperience] = useState('Startup');
    const handleChange2 = (event) => {
        setExperience(event.target.value);
    };


    const methods = useForm();

    const { handleSubmit, errors, reset } = methods;

    // array of products

    const [allAmounts, setAllAmounts] = useState({
        subTotal: 0,
        appliedTaxValue: 0.1,
        appliedDiscountValue: 0.05,
        taxesAmount: 0,
        discountAmount: 0,
        totalAmount: 0
    });

    // for calculating cost of all orders
    const getTotalAmounts = () => {
        const amounts = {
            subTotal: 0,
            appliedTaxValue: 0.1,
            appliedDiscountValue: 0.05,
            taxesAmount: 0,
            discountAmount: 0,
            totalAmount: 0
        };
        productsData.forEach((item) => {
            amounts.subTotal += item.total;
        });



        amounts.taxesAmount = amounts.subTotal * amounts.appliedTaxValue;
        amounts.discountAmount = (amounts.subTotal + amounts.taxesAmount) * amounts.appliedDiscountValue;
        amounts.totalAmount = amounts.subTotal + amounts.taxesAmount - amounts.discountAmount;
        setAllAmounts(amounts);
    };

    // calculates costs when order-details change
    useEffect(() => {
        getTotalAmounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsData]);

    // to delete row in order details
    const deleteProductHandler = (id) => {
        setProductsData(productsData.filter((item) => item.id !== id));
    };

    const deleteProductHandlerEP = (id) => {
        setProductsDataEP(productsDataEP.filter((item) => item.id !== id));
    };


    // Dialog Handler
    const handleDialogOk = () => {
        setOpen(false);

    };

    // add item handler
    const handleAddItem = (addingData) => {
        setProductsData([
            ...productsData,
            {
                id: addingData.id,
                product: addingData.name,
                description: addingData.desc,
                cargo: addingData.label,
                quantity: addingData.selectedQuantity,
                amount: addingData.amount,

            }
        ]);

        setAddItemClicked(false);
    };






    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
                <SubCard title=" Antecedentes Patológicos">
                    <form noValidate autoComplete="off">
                        <Grid container spacing={gridSpacing}>

                            <ProductsPageA productsData={productsData} deleteProductHandler={deleteProductHandler} />

                            {addItemClicked ? (
                                <Grid item xs={12}>
                                    <AddItemPageA handleAddItem={handleAddItem} setAddItemClicked={setAddItemClicked} />
                                </Grid>
                            ) : (
                                <Grid item>
                                    <Button variant="text" onClick={() => setAddItemClicked(true)}>
                                        + Add Item
                                    </Button>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>


                        </Grid>
                    </form>
                </SubCard>

          



            </Grid>


            <Grid item xs={12} md={12}>
                <SubCard title=" Enfermedades Profesionales">
                    <form noValidate autoComplete="off">
                        <Grid container spacing={gridSpacing}>

                            <ProductsPageEP productsData={productsData} deleteProductHandler={deleteProductHandler} />

                            {addItemClicked ? (
                                <Grid item xs={12}>
                                    <AddItemPageEP handleAddItem={handleAddItem} setAddItemClicked={setAddItemClicked} />
                                </Grid>
                            ) : (
                                <Grid item>
                                    <Button variant="text" onClick={() => setAddItemClicked(true)}>
                                        + Add Item
                                    </Button>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>


                        </Grid>
                    </form>
                </SubCard>

          



            </Grid>



        </Grid>



    );
};

export default Antecedents;


