import { Stack } from '@mui/material';
import { ModalVariant } from 'common/enums/enums';
import { LoadingContainer } from 'components/common/common';
import { useModal } from 'hooks/hooks';
import { useSelector } from 'react-redux';
import { useGetWorkshopsQuery } from 'store/workshop/workshop';
import { WorkshopCard } from './components/components';

const Workshops = () => {
  const { handleOpen } = useModal();
  const { userRole } = useSelector(state => ({ userRole: state.auth.user.role }));
  const { data: workshops = [], isFetching } = useGetWorkshopsQuery();

  const handleOpenOrderForm = workshop => () =>
    handleOpen({ variant: ModalVariant.CREATE_ORDER, state: { workshop } });

  if (isFetching) {
    return <LoadingContainer height="calc(100vh - 64px)" />;
  }

  return (
    <Stack direction="column" gap={8} padding={4}>
      {workshops.map(workshop => (
        <WorkshopCard
          userRole={userRole}
          key={workshop.id}
          workshop={workshop}
          onOpenOrderForm={handleOpenOrderForm(workshop)}
        />
      ))}
    </Stack>
  );
};

export { Workshops };
