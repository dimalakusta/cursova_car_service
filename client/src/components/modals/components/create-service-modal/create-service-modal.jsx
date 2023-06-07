import { CancelRounded as CancelRoundedIcon } from '@mui/icons-material';
import { Dialog, Typography } from '@mui/material';
import { useModal } from 'hooks/hooks';
import { CreateServiceForm } from './components/components';
import {
  ButtonDirection,
  StyledIconButton,
  StyledModalHeader
} from './create-service-modal.styles';

const CreateServiceModal = () => {
  const {
    handleClose,
    modalConfig: {
      state: { workshop = null }
    }
  } = useModal();

  return (
    <Dialog open onClose={handleClose} PaperProps={{ sx: { minWidth: 550 } }}>
      <StyledModalHeader>
        <Typography variant="h6">Створити нову послугу</Typography>
        <StyledIconButton direction={ButtonDirection.RIGHT} onClick={handleClose}>
          <CancelRoundedIcon />
        </StyledIconButton>
      </StyledModalHeader>
      <CreateServiceForm workshopId={workshop?.id} />
    </Dialog>
  );
};

export { CreateServiceModal };
