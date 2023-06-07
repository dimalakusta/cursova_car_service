import { Select, Input, YearField } from 'components/common/common';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useStepper } from 'hooks/hooks';

const FillCarInfo = ({ carOptions }) => {
  const { control, watch } = useFormContext();
  const { handleNext } = useStepper();

  const carId = watch('carId');
  const model = watch('model');
  const yearOfProduction = watch('yearOfProduction');
  const licensePlateNumber = watch('licensePlateNumber');

  const isNextButtonDisabled =
    !carId || !model.trim() || !yearOfProduction || !licensePlateNumber.trim();

  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h2" marginBottom={7}>
        Яким автомобілем ти керуєш?
      </Typography>
      <Typography variant="h6" color="text.disabled" marginBottom={3}>
        Дані автомобіля
      </Typography>
      <Box sx={{ marginBottom: 6 }}>
        <Select
          control={control}
          name="carId"
          label="Марка"
          options={carOptions}
          selectedValueLabelName="brand"
          paperWidth={500}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Input control={control} name="model" label="Модель" width={500} />
      </Box>
      <Box sx={{ marginBottom: 6 }}>
        <YearField control={control} name="yearOfProduction" label="Рік виробництва" width={500} />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Input
          control={control}
          name="licensePlateNumber"
          label="Номерний знак"
          placeholder="CE 2626 CE"
          width={500}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={isNextButtonDisabled}
        onClick={handleNext}
        sx={{ textTransform: 'uppercase', maxWidth: 500, marginTop: 3 }}
      >
        Далі
      </Button>
    </Stack>
  );
};

export { FillCarInfo };
