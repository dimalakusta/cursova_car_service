import { CancelRounded as CancelRoundedIcon } from '@mui/icons-material';
import { Dialog, Typography } from '@mui/material';
import { useModal } from 'hooks/hooks';
import { CompleteOrderForm } from './components/components';
import {
  ButtonDirection,
  StyledIconButton,
  StyledModalHeader
} from './complete-order-modal.styles';

const CompleteOrderModal = () => {
  const {
    handleClose,
    modalConfig: {
      state: { order = null }
    }
  } = useModal();

  return (
    <Dialog open onClose={handleClose} PaperProps={{ sx: { minWidth: 550 } }}>
      <StyledModalHeader>
        <Typography variant="h6">Виконати роботи</Typography>
        <StyledIconButton direction={ButtonDirection.RIGHT} onClick={handleClose}>
          <CancelRoundedIcon />
        </StyledIconButton>
      </StyledModalHeader>
      <CompleteOrderForm orderId={order?.id} />
    </Dialog>
  );
};

export { CompleteOrderModal };
