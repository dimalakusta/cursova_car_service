import { Box, Button, CircularProgress } from '@mui/material';
import { Select, LoadingContainer } from 'components/common/common';
import { useAppForm, useModal } from 'hooks/hooks';
import { notification as notificationService } from 'services/services';
import { useAssignProviderMutation, useGetProvidersQuery } from 'store/order/order';
import { DEFAULT_ASSIGN_PROVIDER_FORM_PAYLOAD } from './constants';

const AssignProviderForm = ({ orderId, workshopId }) => {
  const { handleClose: handleCloseModal } = useModal();
  const { handleSubmit, watch, control } = useAppForm({
    defaultValues: DEFAULT_ASSIGN_PROVIDER_FORM_PAYLOAD
  });
  const [assignProvider, { isLoading }] = useAssignProviderMutation();
  const { data: serviceProviders = [], isLoading: isServiceProvidersLoading } =
    useGetProvidersQuery(workshopId);
  const serviceProviderId = watch('serviceProviderId');

  const handleAssignProvider = async values => {
    await assignProvider({
      id: orderId,
      serviceProviderId: values.serviceProviderId
    }).unwrap();
    notificationService.success('Майстер отримає повідомлення про роботу');
    handleCloseModal();
  };

  if (isServiceProvidersLoading) {
    return <LoadingContainer />;
  }

  return (
    <Box as="form" noValidate onSubmit={handleSubmit(handleAssignProvider)} sx={{ padding: 5 }}>
      <Box sx={{ marginRight: 3 }}>
        <Select
          control={control}
          name="serviceProviderId"
          label=""
          options={serviceProviders.map(serviceProvider => ({
            id: serviceProvider.id,
            fullName: serviceProvider.user.fullName
          }))}
          selectedValueLabelName="fullName"
          paperWidth={500}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        disabled={!serviceProviderId || isLoading}
        fullWidth
        type="submit"
        sx={{ textTransform: 'uppercase', maxWidth: 500, marginTop: 3 }}
      >
        {isLoading ? <CircularProgress size={20} /> : 'Назначити'}
      </Button>
    </Box>
  );
};

export { AssignProviderForm };
