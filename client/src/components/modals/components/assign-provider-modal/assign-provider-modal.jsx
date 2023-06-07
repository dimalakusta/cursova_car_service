import { CancelRounded as CancelRoundedIcon } from '@mui/icons-material';
import { Dialog, Typography } from '@mui/material';
import { useModal } from 'hooks/hooks';
import { AssignProviderForm } from './components/components';
import {
  ButtonDirection,
  StyledIconButton,
  StyledModalHeader
} from './assign-provider-modal.styles';

const AssignProviderModal = () => {
  const {
    handleClose,
    modalConfig: {
      state: { order = null }
    }
  } = useModal();

  return (
    <Dialog open onClose={handleClose} PaperProps={{ sx: { minWidth: 550 } }}>
      <StyledModalHeader>
        <Typography variant="h6">Назначити майстра</Typography>
        <StyledIconButton direction={ButtonDirection.RIGHT} onClick={handleClose}>
          <CancelRoundedIcon />
        </StyledIconButton>
      </StyledModalHeader>
      <AssignProviderForm orderId={order?.id} workshopId={order?.workshopId} />
    </Dialog>
  );
};

export { AssignProviderModal };
