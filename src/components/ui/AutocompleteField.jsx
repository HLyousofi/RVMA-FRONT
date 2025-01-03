import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteField = ({ options, name,onSelect, label, control, isLoading=false}) => {

  return (
    
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options}
            getOptionLabel={(option) => option.label || ''}
            disabled={isLoading}
            onChange={(_, value) => {
              field.onChange(value);
              onSelect(value ? value.id : null); // Return the selected item's id
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                className="w-full"
              />
            )}
          />
        )}
      />
  );
};

export default AutocompleteField;
