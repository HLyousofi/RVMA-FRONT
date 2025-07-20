// InputField.jsx
import TextField from '@mui/material/TextField';
import { Controller } from "react-hook-form";
import { useState } from "react";


const InputField = ({ 
  name, 
  label, 
  control, 
  multiline = false,
  defaultValue = '', 
  disabled = false,
  rules = {}, 
  variant = 'outlined',
  type = 'text',
  sx = {},
  ...rest 
}) => {
  const align = type === 'number' ? 'right' : 'left';
  
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
          sx={{ 
            input: { textAlign: align },
            ...sx 
          }}
          {...rest}
        />
      )}
    />
  );
};

export default InputField;

// UploadFileField.jsx

export const UploadFileField = ({ 
  name = "file",
  label = "Télécharger un fichier",
  control,
  rules = {},
  accept = "image/*", // .svg, .png, .jpg, .gif
  disabled = false,
}) => {
  // const { control: internalControl } = useForm();
  // const control = externalControl || internalControl;
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file ? file.name : 0);
    }
  };

  return (
    <div className="dark:bg-gray-800 rounded-lg">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field : { onChange, ref, field }, fieldState: { error } }) => (
          <div className="relative">
            {/* <label
              htmlFor={`${name}_input`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {label}
            </label> */}
            <input
              {...field}
              id={`${name}_input`}
              type="file"
              ref={ref}
              accept={accept}
              disabled={disabled}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                onChange(file || null); 
                handleFileChange(e);
              }}
            />
            <label
              htmlFor={`${name}_input`}
              className={`block w-full text-sm text-white border rounded-lg cursor-pointer 
                ${disabled 
                  ? 'bg-gray-500 border-gray-600' 
                  : 'bg-blue-600 border-gray-300 dark:bg-blue-700 dark:border-gray-600 hover:bg-blue-700 dark:hover:bg-blue-800'
                } text-center py-2`}
            >
              Choisir un fichier
            </label>
            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
      {fileName && !disabled && (
        <p className="mt-1 text-sm text-green-600 dark:text-green-400">
          Fichier sélectionné : {fileName}
        </p>
      )}
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
        SVG, PNG, JPG ou GIF (MAX. 800x400px)
      </p>
    </div>
  );
};

