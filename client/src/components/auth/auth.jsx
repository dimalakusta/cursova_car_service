import { Typography } from '@mui/material';
import { AppRoute, DataStatus } from 'common/enums/enums';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { authActionCreator } from 'store/auth/auth';
import { LoginForm } from './components/login-form/login-form';
import { StyledLoginFormContainer } from './auth.styles';
import { RegistrationForm } from './components/registration-form/registration-form';
import { WorkshopRegistrationForm } from './components/workshop-registration-form/workshop-registration-form';

const Auth = () => {
  const dispatch = useDispatch();
  const { dataStatus, error } = useSelector(state => ({
    dataStatus: state.auth.dataStatus,
    error: state.auth.error
  }));

  const { pathname } = useLocation();

  const handleLogin = useCallback(
    payload => dispatch(authActionCreator.login(payload)),
    [dispatch]
  );

  const handleRegister = useCallback(
    payload => dispatch(authActionCreator.register(payload)),
    [dispatch]
  );

  const getScreen = path => {
    switch (path) {
      case AppRoute.LOGIN: {
        return (
          <LoginForm
            onLogin={handleLogin}
            isLoading={dataStatus === DataStatus.PENDING}
            errorMessage={error}
          />
        );
      }
      case AppRoute.REGISTRATION: {
        return (
          <RegistrationForm
            onRegister={handleRegister}
            isLoading={dataStatus === DataStatus.PENDING}
            errorMessage={error}
          />
        );
      }
      case AppRoute.WORKSHOP_REGISTRATION: {
        return <WorkshopRegistrationForm onRegisterWorkshop={() => {}} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <StyledLoginFormContainer elevation={0}>
      <Typography variant="h4" marginBottom={10} align="center">
        Welcome to Car Service App!
      </Typography>
      {getScreen(pathname)}
    </StyledLoginFormContainer>
  );
};

export { Auth };
