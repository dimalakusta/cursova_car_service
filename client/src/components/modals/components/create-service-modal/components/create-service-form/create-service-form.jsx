import { Box, Button, CircularProgress } from '@mui/material';
import { Input } from 'components/common/common';
import { useAppForm, useModal } from 'hooks/hooks';
import { notification as notificationService } from 'services/services';
import { useCreateServiceMutation } from 'store/service/service';
import { DEFAULT_CREATE_SERVICE_FORM_PAYLOAD } from './constants';

const CreateServiceForm = ({ workshopId }) => {
  const { handleClose: handleCloseModal } = useModal();
  const { handleSubmit, watch, control } = useAppForm({
    defaultValues: DEFAULT_CREATE_SERVICE_FORM_PAYLOAD
  });
  const [createService, { isLoading }] = useCreateServiceMutation();
  const title = watch('title');
  const price = watch('price');

  const handleSubmitService = async values => {
    await createService({
      ...values,
      price: Number(values.price),
      workshopId
    }).unwrap();
    notificationService.success('Нова послуга успішно створена');
    handleCloseModal();
  };

  return (
    <Box as="form" noValidate onSubmit={handleSubmit(handleSubmitService)} sx={{ padding: 5 }}>
      <Box sx={{ marginBottom: 2 }}>
        <Input
          control={control}
          name="title"
          label="Назва"
          placeholder="Заміна задніх гальмівних дисків"
          width={500}
        />
      </Box>
      <Box sx={{ marginBottom: 6 }}>
        <Input control={control} name="price" label="Ціна (у грн)" width={500} type="number" />
      </Box>
      <Button
        variant="contained"
        color="primary"
        disabled={!price || !title.trim() || isLoading}
        fullWidth
        type="submit"
        sx={{ textTransform: 'uppercase', maxWidth: 500, marginTop: 3 }}
      >
        {isLoading ? <CircularProgress size={20} /> : 'Створити'}
      </Button>
    </Box>
  );
};

export { CreateServiceForm };
