import { Input, PhoneNumberInput } from 'components/common/common';
import { Box, Button, Stack, Typography, CircularProgress } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const FillUserInfo = ({ isLoading }) => {
  const { control, watch } = useFormContext();

  const fullName = watch('fullName');
  const phoneNumber = watch('phoneNumber');

  const isSubmitButtonDisabled = !fullName.trim() || !phoneNumber.trim();

  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h2" marginBottom={7}>
        Заповніть ваші контактні дані
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Input
          control={control}
          name="fullName"
          label="Імʼя та прізвище"
          placeholder="Олена Трафенчук"
          width={500}
        />
      </Box>
      <Box sx={{ marginBottom: 6 }}>
        <PhoneNumberInput control={control} name="phoneNumber" label="Номер телефону" width={500} />
      </Box>

      <Button
        variant="contained"
        color="primary"
        disabled={isSubmitButtonDisabled || isLoading}
        fullWidth
        type="submit"
        form="hook-form"
        sx={{ textTransform: 'uppercase', maxWidth: 500, marginTop: 3 }}
      >
        {isLoading ? <CircularProgress size={20} /> : 'Далі'}
      </Button>
    </Stack>
  );
};

export { FillUserInfo };
