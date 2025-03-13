import { useDropzone } from 'react-dropzone';

import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Image from 'components/image';
import { Controller, useFormContext } from 'react-hook-form';

export default function UploadBox({ name, defaultValue, placeholder, onDelete, error, disabled, sx, ...other }) {
  const { control } = useFormContext();

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    accept: {
      'image/*': [],
    },
    ...other,
  });

  const hasError = isDragReject || error;

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Box
            {...getRootProps()}
            sx={{
              m: 0.5,
              width: '700px',
              height: '1',
              flexShrink: 0,
              display: 'flex',
              borderRadius: 1,
              cursor: 'pointer',
              alignItems: 'center',
              color: 'text.disabled',
              justifyContent: 'center',
              bgcolor: field.value === null ? (theme) => alpha(theme.palette.grey[500], 0.08) : null,
              ...(isDragActive && {
                opacity: 0.72,
              }),
              ...(disabled && {
                opacity: 0.48,
                pointerEvents: 'none',
              }),
              ...(hasError && {
                color: 'error.main',
                borderColor: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              }),
              '&:hover': {
                opacity: 0.72,
              },
              ...sx,
            }}
          >
            <input {...getInputProps()} />
            {field.value === null ? <>{placeholder}</> : <Image alt="avatar" src={field.value} sx={{ width: 0.7, height: 0.7, borderRadius: '10%' }} />}
          </Box>

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}