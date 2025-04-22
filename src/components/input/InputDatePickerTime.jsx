import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
  FormHelperText,
  Grid,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

const InputDatePickerTime = ({ label, name, defaultValue, size, bug, ...others }) => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

  // Asegúrate de que el valor esté en el formato correcto: 'YYYY-MM-DDTHH:mm'
  const formattedDefaultValue = dayjs(defaultValue).format('YYYY-MM-DDTHH:mm');

  return (
    <Fragment>
      <Controller
        name={name}
        defaultValue={formattedDefaultValue}
        render={({ field }) => (
          <TextField
            {...field}
            id={name}
            label={label}
            type="datetime-local"
            size={matchesXS ? 'small' : 'medium'}
            InputLabelProps={{
              shrink: true,
              className: bug ? 'required-label' : '',
              required: bug || false,
            }}
            error={!!bug}
            fullWidth
            {...others}
          />
        )}
      />
      {bug && (
        <Grid item xs={12}>
          <FormHelperText error>{bug.message}</FormHelperText>
        </Grid>
      )}
    </Fragment>
  );
};

export default InputDatePickerTime;

InputDatePickerTime.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.any,
  name: PropTypes.string,
  size: PropTypes.string,
  bug: PropTypes.any,
};
