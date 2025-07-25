import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteField = ({ options, name, label, control, rules = {}, variant='outlined', isLoading=false}) => {



  return (
    
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error }}) => {
          const { value} =field;
          return (
          <Autocomplete
            {...field}
            options={options || []}
            disabled={isLoading === "true"}
            value={value || null}
            getOptionLabel={(option) => option?.label || option?.plateNumber}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant={variant}
                className="w-full"
                error={!!error}
                helperText={error?.message}
              />
            
            )}
          />
          );
        }}
      />
  );
};

export default AutocompleteField;
