import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalActionCreator } from 'store/modal/modal.slice';

const useModal = () => {
  const dispatch = useDispatch();
  const { modalConfig } = useSelector(state => ({
    modalConfig: state.modal.modalConfig
  }));

  const handleClose = useCallback(() => dispatch(modalActionCreator.closeModal()), [dispatch]);

  const handleOpen = useCallback(
    state => dispatch(modalActionCreator.openModal(state)),
    [dispatch]
  );

  return {
    handleOpen,
    handleClose,
    modalConfig
  };
};

export { useModal };
