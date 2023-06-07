import {
  ArrowCircleLeftRounded as ArrowCircleLeftRoundedIcon,
  CancelRounded as CancelRoundedIcon
} from '@mui/icons-material';
import { Dialog, Typography } from '@mui/material';
import { LoadingContainer } from 'components/common/common';
import { useModal, useStepper } from 'hooks/hooks';
import { useGetCarsQuery } from 'store/car/car';
import { useGetServicesQuery } from 'store/service/service';
import { CreateOrderForm } from './components/components';
import { ButtonDirection, StyledIconButton, StyledModalHeader } from './create-order-modal.styles';

const CreateOrderModal = () => {
  const { activeStep, handleBack } = useStepper();
  const {
    handleClose,
    modalConfig: {
      state: { workshop = null }
    }
  } = useModal();
  const { data: cars = [], isLoading: isCarsLoading } = useGetCarsQuery();
  const { data: services = [], isLoading: isServicesLoading } = useGetServicesQuery();

  if (isCarsLoading || isServicesLoading) {
    return <LoadingContainer height="100%" />;
  }

  return (
    <Dialog open onClose={handleClose} PaperProps={{ sx: { minWidth: 1070 } }}>
      <StyledModalHeader>
        {activeStep > 0 ? (
          <StyledIconButton direction={ButtonDirection.LEFT} onClick={handleBack}>
            <ArrowCircleLeftRoundedIcon />
          </StyledIconButton>
        ) : null}
        <Typography variant="h6">{workshop?.name}</Typography>
        <Typography variant="subtitle2">{workshop?.address}</Typography>
        <StyledIconButton direction={ButtonDirection.RIGHT} onClick={handleClose}>
          <CancelRoundedIcon />
        </StyledIconButton>
      </StyledModalHeader>

      <CreateOrderForm cars={cars} services={services} workshopId={workshop?.id} />
    </Dialog>
  );
};

export { CreateOrderModal };
