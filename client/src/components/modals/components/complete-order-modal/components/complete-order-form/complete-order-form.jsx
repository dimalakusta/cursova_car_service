import { Box, Button, CircularProgress } from '@mui/material';
import { Input } from 'components/common/common';
import { useAppForm, useModal } from 'hooks/hooks';
import { notification as notificationService } from 'services/services';
import { useCompleteOrderMutation } from 'store/order/order';
import { DEFAULT_COMPLETE_ORDER_FORM_PAYLOAD } from './constants';

const CompleteOrderForm = ({ orderId }) => {
  const { handleClose: handleCloseModal } = useModal();
  const { handleSubmit, watch, control } = useAppForm({
    defaultValues: DEFAULT_COMPLETE_ORDER_FORM_PAYLOAD
  });
  const [completeOrder, { isLoading }] = useCompleteOrderMutation();
  const noteByProvider = watch('noteByProvider');

  const handleCompleteOrder = async values => {
    await completeOrder({
      id: orderId,
      noteByProvider: values.noteByProvider
    }).unwrap();
    notificationService.success('Замовлення відмічено як виконане');
    handleCloseModal();
  };

  return (
    <Box as="form" noValidate onSubmit={handleSubmit(handleCompleteOrder)} sx={{ padding: 5 }}>
      <Box sx={{ marginRight: 3 }}>
        <Input
          control={control}
          name="noteByProvider"
          rows={5}
          label="Опишіть результат роботи"
          placeholder="Було полагоджено гальма..."
          width={500}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        disabled={!noteByProvider.trim('') || isLoading}
        fullWidth
        type="submit"
        sx={{ textTransform: 'uppercase', maxWidth: 500, marginTop: 3 }}
      >
        {isLoading ? <CircularProgress size={20} /> : 'Виконати'}
      </Button>
    </Box>
  );
};

export { CompleteOrderForm };
