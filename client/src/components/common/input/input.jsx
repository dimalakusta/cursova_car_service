import { useController } from 'react-hook-form';
import { FormControl, TextField } from '@mui/material';
import { StyledLabel } from './input.styles';

const MIN_INPUT_WIDTH = 185;

const Input = ({
  id,
  name,
  control,
  label,
  placeholder,
  type,
  endAdornment,
  rows,
  fullWidth,
  width = MIN_INPUT_WIDTH
}) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  });

  const handleChange = value => {
    field.onChange(value);
  };

  return (
    <FormControl fullWidth={fullWidth} variant="standard" sx={{ marginBottom: 6.5, width }}>
      <StyledLabel shrink htmlFor={id}>
        {label}
      </StyledLabel>
      <TextField
        id={id}
        placeholder={placeholder}
        multiline={Boolean(rows)}
        rows={rows}
        autoComplete="off"
        type={type}
        value={field.value}
        InputProps={{ endAdornment }}
        onChange={handleChange}
        onKeyPress={event => {
          if (event?.key === '-' || event?.key === '+') {
            event.preventDefault();
          }
        }}
        helperText={error?.message}
        error={Boolean(error?.message)}
      />
    </FormControl>
  );
};

export { Input };
