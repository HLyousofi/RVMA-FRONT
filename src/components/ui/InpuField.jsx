// src/components/InputField.jsx

import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const InputField = ({ 
  name, 
  label, 
  control, 
  multiline = false,
  defaultValue = '', 
  disabled=false,
  rules = {}, 
  variant = 'outlined',
  type = 'text',
  ...rest 
}) => {
  const align = (type === 'number') ? 'right' : 'left';
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          disabled={disabled}
          multiline={multiline}
          variant={variant}
          fullWidth
          error={!!error}
          helperText={error?.message}
          sx={{ input: { textAlign: align } }}
          {...rest}
        />
      )}
    />
  );
};

export default InputField;



