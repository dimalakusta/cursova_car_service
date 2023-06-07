import { Stack, Typography } from '@mui/material';
import { ModalVariant, UserRole } from 'common/enums/enums';
import { LoadingContainer } from 'components/common/common';
import { useModal } from 'hooks/hooks';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useChangeOrderStatusMutation, useGetOrdersQuery } from 'store/order/order';
import { OrderCard } from './components/components';

const Orders = () => {
  const { user } = useSelector(state => ({
    user: state.auth.user
  }));
  const { data: orders = [], isLoading } = useGetOrdersQuery();
  const [changeOrderStatus] = useChangeOrderStatusMutation();
  const { handleOpen } = useModal();

  const handleChangeOrderStatus = useCallback(
    ({ id, status }) =>
      () =>
        changeOrderStatus({ id, status }),
    [changeOrderStatus]
  );

  const handleOpenAssignProviderModal = useCallback(
    order => () => {
      handleOpen({ variant: ModalVariant.ASSIGN_PROVIDER, state: { order } });
    },
    [handleOpen]
  );

  const handleCompleteOrderModalOpen = useCallback(
    order => () => {
      handleOpen({ variant: ModalVariant.COMPLETE_ORDER, state: { order } });
    },
    [handleOpen]
  );

  if (isLoading) {
    return <LoadingContainer height="calc(100vh - 64px)" />;
  }

  return (
    <Stack direction="column" gap={8} padding={4} sx={{ width: '100%' }}>
      <Typography variant="h2" color="text.primary" marginBottom={4}>
        {user.role === UserRole.ADMIN ? 'Замовлення майстерні' : 'Мої замовлення'}
      </Typography>
      {orders.length ? (
        orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            userRole={user.role}
            userId={user.id}
            onChangeStatus={handleChangeOrderStatus}
            onAssignProviderModalOpen={handleOpenAssignProviderModal(order)}
            onCompleteOrderModalOpen={handleCompleteOrderModalOpen(order)}
          />
        ))
      ) : (
        <Typography variant="h6" color="text.primary" marginBottom={4} align="center">
          На даний момент ви не зробили жодного замовлення
        </Typography>
      )}
    </Stack>
  );
};

export { Orders };
