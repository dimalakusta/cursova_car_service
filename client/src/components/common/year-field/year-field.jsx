import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useController } from 'react-hook-form';

const YearField = ({ control, name, label, width = 185 }) => {
  const { field } = useController({ control, name });

  const handleChange = newValue => {
    field.onChange(newValue ? Number(newValue.format('YYYY')) : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateField disableFuture label={label} onChange={handleChange} format="YYYY" sx={{ width }} />
    </LocalizationProvider>
  );
};

export { YearField };
