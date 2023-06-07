import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useAppForm, useModal, useStepper } from 'hooks/hooks';
import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { notification as notificationService } from 'services/services';
import { authActionCreator } from 'store/auth/auth';
import { useCreateOrderMutation } from 'store/order/order';
import {
  ChooseServiceStep,
  ChooseVisitDate,
  FillCarInfo,
  FillUserInfo
} from './components/components';
import { DEFAULT_CREATE_ORDER_FORM_PAYLOAD, getFormSteps } from './constants';

const CreateOrderForm = ({ cars, services, workshopId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({
    user: state.auth.user
  }));
  const { activeStep } = useStepper();
  const { handleClose: handleCloseModal } = useModal();
  const methods = useAppForm({
    defaultValues: DEFAULT_CREATE_ORDER_FORM_PAYLOAD
  });
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleSubmitOrder = async values => {
    await createOrder({
      ...values,
      services: values.services.map(({ id, title, price }) => ({ id, title, price })),
      workshopId
    }).unwrap();
    await dispatch(authActionCreator.loadCurrentUser()).unwrap();
    notificationService.success('Ваше замовлення успішно створено');
    handleCloseModal();
  };

  const isContactInfoFilled = Boolean(user.phoneNumber) && Boolean(user.fullName);

  const steps = useMemo(() => getFormSteps(isContactInfoFilled), [isContactInfoFilled]);

  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        id="hook-form"
        noValidate
        onSubmit={methods.handleSubmit(handleSubmitOrder)}
        sx={{ padding: 5 }}
      >
        <Stepper activeStep={activeStep} sx={{ marginBottom: 10 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 ? <ChooseServiceStep serviceOptions={services} /> : null}
        {activeStep === 1 ? <FillCarInfo carOptions={cars} /> : null}
        {activeStep === 2 ? <ChooseVisitDate isContactInfoFilled={isContactInfoFilled} /> : null}
        {activeStep === 3 && !isContactInfoFilled ? <FillUserInfo isLoading={isLoading} /> : null}
      </Box>
    </FormProvider>
  );
};

export { CreateOrderForm };
