import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import { useController } from 'react-hook-form';

const DatePicker = ({ control, name }) => {
  const { field } = useController({ control, name });

  const handleChange = newValue => {
    field.onChange(newValue.toDate().toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StaticDateTimePicker
        slotProps={{
          actionBar: {
            actions: []
          }
        }}
        slots={{ toolbar: null }}
        ampm={false}
        disablePast
        ampmInClock={false}
        onChange={handleChange}
        orientation="landscape"
      />
    </LocalizationProvider>
  );
};

export { DatePicker };
