import {
  AddRounded as AddRoundedIcon,
  CalendarMonthRounded as CalendarMonthRoundedIcon,
  CancelRounded as CancelRoundedIcon,
  CheckRounded as CheckRoundedIcon,
  AccountCircleRounded as AccountCircleRoundedIcon,
  EngineeringRounded as EngineeringRoundedIcon
} from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { OrderStatus, UserRole } from 'common/enums/enums';
import moment from 'moment';
import { memo } from 'react';
import { StyledCard, StyledCardContent } from './order-card.styles';

const statusLabels = {
  [OrderStatus.REQUESTED]: {
    title: 'Очікує підтвердження',
    color: 'secondary'
  },
  [OrderStatus.ACCEPTED]: {
    title: 'Прийнято в роботу',
    color: 'primary'
  },
  [OrderStatus.REJECTED]: {
    title: 'Відхилено',
    color: 'error'
  },
  [OrderStatus.COMPLETED]: {
    title: 'Виконано',
    color: 'success'
  }
};

const OrderCard = memo(
  ({ order, userRole, onChangeStatus, onAssignProviderModalOpen, onCompleteOrderModalOpen }) => {
    return (
      <StyledCard>
        <StyledCardContent>
          <Stack direction="column" gap={2} sx={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" marginBottom={2}>
                  {order.car.brand} {order.model}
                </Typography>
                <Typography variant="body2" color="text.secondary" marginBottom={2}>
                  Рік випуску: {order.yearOfProduction}
                </Typography>
                <Typography variant="body2" color="text.secondary" marginBottom={2}>
                  Номерний знак: {order.licensePlateNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary" marginBottom={2}>
                  Ціна: {order.services.reduce((acc, service) => acc + service.price, 0)} грн
                </Typography>
                <Stack direction="row" gap={4} alignItems="center" marginBottom={4}>
                  <CalendarMonthRoundedIcon />
                  <Typography variant="body2" color="text.secondary">
                    Дата візиту: {moment(order.visitDate).format('MMMM Do, YYYY HH:mm')}
                  </Typography>
                </Stack>
                {order.user.fullName && order.user.phoneNumber ? (
                  <Stack direction="row" gap={4} alignItems="center" marginBottom={4}>
                    <AccountCircleRoundedIcon />
                    <Typography variant="body2" color="text.secondary">
                      Контактні дані клієнта: {order.user.fullName} {order.user.phoneNumber}
                    </Typography>
                  </Stack>
                ) : null}
                {order.serviceProviderId ? (
                  <Stack direction="row" gap={4} alignItems="center" marginBottom={4}>
                    <EngineeringRoundedIcon />
                    <Typography variant="body2" color="text.secondary">
                      Імʼя майстра: {order?.serviceProvider?.user?.fullName}
                    </Typography>
                  </Stack>
                ) : null}
              </Box>
              <Chip
                label={statusLabels[order.status].title}
                color={statusLabels[order.status].color}
              />
            </Stack>

            <Stack direction="column" spacing={2} maxWidth="30%">
              <Typography variant="body2" color="text.secondary" marginBottom={2}>
                Обрані послуги:
              </Typography>
              {order.services.map(service => (
                <Chip key={service.id} label={service.title} color="secondary" />
              ))}
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={4} marginTop={5}>
              <Typography variant="body2" color="text.primary">
                {order.description}
              </Typography>
            </Stack>
            {order.noteByProvider ? (
              <Stack direction="row" justifyContent="space-between" gap={4} marginTop={5}>
                <Typography variant="body2" color="text.primary">
                  Нотатки від майстра: {order.noteByProvider}
                </Typography>
              </Stack>
            ) : null}

            {userRole === UserRole.ADMIN ? (
              <Stack direction="row-reverse" alignItems="center" gap={4} marginTop={5}>
                {order.status === OrderStatus.REQUESTED ? (
                  <>
                    <Button
                      size="large"
                      startIcon={<CancelRoundedIcon />}
                      variant="outlined"
                      color="error"
                      onClick={onChangeStatus({ id: order.id, status: OrderStatus.REJECTED })}
                    >
                      Відхилити
                    </Button>
                    <Button
                      size="large"
                      startIcon={<AddRoundedIcon />}
                      variant="contained"
                      color="primary"
                      onClick={onChangeStatus({ id: order.id, status: OrderStatus.ACCEPTED })}
                    >
                      Прийняти
                    </Button>
                  </>
                ) : null}

                {order.status === OrderStatus.ACCEPTED && !order.serviceProviderId ? (
                  <Button
                    size="large"
                    startIcon={<AddRoundedIcon />}
                    variant="contained"
                    color="primary"
                    onClick={onAssignProviderModalOpen}
                  >
                    Назначити майстра
                  </Button>
                ) : null}
              </Stack>
            ) : null}

            {userRole === UserRole.SERVICE_PROVIDER && order.status !== OrderStatus.COMPLETED ? (
              <Stack direction="row-reverse" alignItems="center" gap={4} marginTop={5}>
                <Button
                  size="large"
                  startIcon={<CheckRoundedIcon />}
                  variant="contained"
                  color="success"
                  onClick={onCompleteOrderModalOpen}
                >
                  Виконати роботу
                </Button>
              </Stack>
            ) : null}
          </Stack>
        </StyledCardContent>
      </StyledCard>
    );
  }
);

OrderCard.displayName = 'OrderCard';

export { OrderCard };
