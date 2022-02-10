import { TextField } from "@material-ui/core";
import React from "react";
import {
    Control,
    Controller,
    RegisterOptions,
    /*   EventType, */
} from "react-hook-form";

InputText.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.array,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export const InputText = ({
    name,
    control,
    defaultValue,
    label,
    rules,
    errorMessage,
    isPassword,
    /*   onChangeInput */
}) => {
    return (
        <div className="mb-4">
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) => (
                    <TextField
                        {...field}
                        error={errorMessage ? true : false}
                        /*   onChange={onChangeInput} */
                        variant="outlined"
                        label={label}
                        className="w-full bg-white text-xs rounded"
                        color="primary"
                        type={isPassword ? "password" : "text"}
                        margin="none"
                        size="small"
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                    />


                )}
            />
            <span className="text-xs text-red-500"> {errorMessage}</span>
        </div>
    );
};

{/* <TextField
    fullWidth
    id="email"
    name="email"
    label="Email"
    defaultValue={formik.values.email}
    onChange={formik.handleChange}
    error={formik.touched.email && Boolean(formik.errors.email)}
    helperText={formik.touched.email && formik.errors.email}
/> */}