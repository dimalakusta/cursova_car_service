import { ModalVariant } from 'common/enums/enums';
import { StepperProvider } from 'contexts/contexts';
import { useModal } from 'hooks/hooks';
import { useMemo } from 'react';
import {
  CreateOrderModal,
  CreateServiceModal,
  AssignProviderModal,
  CompleteOrderModal
} from './components/components';

const Modals = () => {
  const { modalConfig } = useModal();

  const modalsByVariant = useMemo(
    () => ({
      [ModalVariant.CREATE_ORDER]: (
        <StepperProvider>
          <CreateOrderModal />
        </StepperProvider>
      ),
      [ModalVariant.CREATE_SERVICE]: <CreateServiceModal />,
      [ModalVariant.ASSIGN_PROVIDER]: <AssignProviderModal />,
      [ModalVariant.COMPLETE_ORDER]: <CompleteOrderModal />,
      DEFAULT: null
    }),
    []
  );

  return modalsByVariant[modalConfig.variant] ?? modalsByVariant.DEFAULT;
};

export { Modals };
