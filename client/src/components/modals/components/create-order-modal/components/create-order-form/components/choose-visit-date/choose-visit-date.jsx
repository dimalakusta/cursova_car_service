import { DatePicker } from 'components/common/common';
import { useFormContext } from 'react-hook-form';
import { useStepper } from 'hooks/hooks';
import { Box, Button, Stack, Typography, CircularProgress } from '@mui/material';

const ChooseVisitDate = ({ isLoading, isContactInfoFilled }) => {
  const { control, watch } = useFormContext();
  const { handleNext } = useStepper();

  const visitDate = watch('visitDate');

  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h2" marginBottom={7}>
        Коли ви можете залишити свій автомобіль?
      </Typography>
      <Typography variant="h6" color="text.disabled" marginBottom={3}>
        Оберіть дату і час
      </Typography>
      <Box sx={{ marginBottom: 6 }}>
        <DatePicker control={control} name="visitDate" label="Оберіть дату і час" />
      </Box>

      {isContactInfoFilled ? (
        <Button
          variant="contained"
          color="primary"
          disabled={!visitDate || isLoading}
          fullWidth
          type="submit"
          form="hook-form"
          sx={{ textTransform: 'uppercase', maxWidth: 500, marginTop: 3 }}
        >
          {isLoading ? <CircularProgress size={20} /> : 'Далі'}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!visitDate}
          onClick={handleNext}
          sx={{ textTransform: 'uppercase', maxWidth: 500, marginTop: 3 }}
        >
          Далі
        </Button>
      )}
    </Stack>
  );
};

export { ChooseVisitDate };
