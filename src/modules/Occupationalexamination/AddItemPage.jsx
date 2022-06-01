import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SelectOnChange from 'components/input/SelectOnChange';

// material-ui
import { Button, FormControl, Grid, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| ADD ITEM PAGE ||============================== //

function AddItemPage({ handleAddItem, setAddItemClicked }) {
    const [valueCargo, setValueCargo] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItem1, setSelectedItem1] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [amount, setAmount] = useState(0);
    const [errors, setErrors] = useState({
        quantityError: ''
    });

    const itemList = [
        {
            id: 111,
            name: 'Rubikapp',
            amount: 260,
            desc: 'Desarrollo de Software'
        },
        {
            id: 112,
            name: 'Servientrega',
            amount: 200,
            desc: 'Mensajeria'
        },
        {
            id: 113,
            name: 'SENA',
            amount: 300,
            desc: 'Formación profesional integral'
        }
    ];

    const itemList1 = [
        {
            value: 1,
            label: 'Gerente',

        },
        {
            value: 2,
            label: 'Ingeniero de sistemas',

        },
        {
            value: 3,
            label: 'Supervisor',

        }
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
            const selectedOption = itemList.find((item) => item.id === value);
            setSelectedItem(selectedOption);


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
                        <Typography variant="subtitle1">Empresa</Typography>
                        <FormControl>
                            <Select
                                fullWidth
                                displayEmpty
                                value={selectedItem?.id || ''}
                                onChange={handleChange}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return (
                                            <Typography color="textSecondary" sx={{ lineHeight: '1.4375em' }}>
                                                Seleccione la empresa
                                            </Typography>
                                        );
                                    }

                                    const selectedData = itemList.filter((item) => item.id === selected)[0];

                                    return (
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                            <Typography variant="subtitle1" sx={{ lineHeight: '1.4375em' }}>
                                                {selectedData.name}
                                            </Typography>

                                        </Stack>
                                    );
                                }}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem disabled value="">
                                    <Typography color="textSecondary">Seleccione la empresa</Typography>
                                </MenuItem>
                                {itemList.map((item, i) => (
                                    <MenuItem key={i} value={item.id}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                            <Typography variant="subtitle1">{item.name}</Typography>

                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1">Cargo</Typography>
                        <SelectOnChange
                            name="cargo"
                            label="Cargo"
                            options={itemList1}
                            onChange={handleChange1}
                            value={valueCargo}
                        />
                    </Stack>
                </Grid>




                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1" id="itemQuantity">
                            Años
                        </Typography>
                        <TextField
                            fullWidth
                            type="number"
                            name="quantity"
                            value={selectedQuantity}
                            onChange={handleChange}
                            error={Boolean(errors.quantityError)}
                            helperText={errors.quantityError}
                            disabled={!selectedItem?.id}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1" id="itemAmount">
                            Meses
                        </Typography>
                        <TextField fullWidth name="amount" value={amount} disabled />
                    </Stack>
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

AddItemPage.propTypes = {
    handleAddItem: PropTypes.func,
    setAddItemClicked: PropTypes.func
};

export default AddItemPage;
