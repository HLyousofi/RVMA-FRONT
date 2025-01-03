// src/components/InputField.jsx

import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const InputField = ({ 
  name, 
  label, 
  control, 
  defaultValue = '', 
  rules = {}, 
  type = 'text', 
  ...rest 
}) => {
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
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error?.message}
          className="mb-4"
          {...rest}
        />
      )}
    />
  );
};

export default InputField;



