import { Controller } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const CheckboxField = ({ name, label, control,onChangeCallback, defaultValue = false, rules = {} }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Switch
              {...field}
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                if (onChangeCallback) {
                  onChangeCallback(e.target.checked);
                }
              }}
              color="primary"
            />
          }
          label={label}
          className="mb-4"
        />
      )}
    />
  );
};

export default CheckboxField;
