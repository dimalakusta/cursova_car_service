import { useController } from 'react-hook-form';
import { FormControl } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { StyledLabel } from '../input/input.styles';

const PhoneNumberInput = ({ id, control, fullWidth, width, name, label = '' }) => {
  const { field } = useController({ control, name });

  const handleChange = value => {
    field.onChange(value);
  };

  return (
    <FormControl fullWidth={fullWidth} variant="standard" sx={{ marginBottom: 6.5, width }}>
      <StyledLabel shrink htmlFor={id}>
        {label}
      </StyledLabel>
      <MuiTelInput
        id={id}
        defaultCountry="UA"
        onlyCountries={['UA']}
        onChange={handleChange}
        value={field.value}
      />
    </FormControl>
  );
};

export { PhoneNumberInput };
