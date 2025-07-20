import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import moment from "moment";
import 'dayjs/locale/fr';
import dayjs from "dayjs";

const DatePickerField = ({name, label,control,rules, minDate=dayjs()}) => {

    const [local, setLocal] = useState('fr');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={local} >
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field ,fieldState: { error }  }) => {
                    const { value, onChange } = field;
                    const parsedValue = value ? dayjs(value, 'YYYY-MM-DD') : null;
                    return (
                        <DatePicker
                            label={label}
                            {...field}
                            value={parsedValue ?? null}
                            onChange={(newValue) => {
                                // Passer la nouvelle valeur au format ISO ou null
                                onChange(newValue ? newValue.toISOString() : null);
                              }}
                            size="small"
                            minDate={minDate}
                            slotProps={{ textField: { variant: "standard",
                                                      error: !!error,
                                                      helperText: error?.message } }}
                        />
                )}}
            />
    
        </LocalizationProvider>

    )
}

export default DatePickerField;