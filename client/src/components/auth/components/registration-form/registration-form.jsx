import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Divider, Typography } from '@mui/material';
import { Input } from 'components/common/common';
import { AppRoute } from 'common/enums/enums.js';
import { useAppForm } from 'hooks/hooks.js';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { registration as registrationValidationSchema } from 'validation-schemas/validation-schemas.js';
import { StyledForm } from '../../auth.styles';

const DEFAULT_REGISTRATION_PAYLOAD = {
  username: '',
  email: '',
  password: ''
};

const RegistrationForm = ({ onRegister, errorMessage, isLoading }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { control, formState, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_REGISTRATION_PAYLOAD,
    validationSchema: registrationValidationSchema
  });

  const handleSubmitRegister = values => {
    onRegister(values);
  };

  const handleShownPassword = () => {
    setIsPasswordShown(prevState => !prevState);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleSubmitRegister)}>
      <Typography variant="h6" marginBottom={8}>
        Створити новий аккаунт
      </Typography>
      <Input
        id="username"
        label="Username"
        type="text"
        placeholder="Vasya"
        control={control}
        name="username"
        width={350}
        fullWidth
      />
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        control={control}
        name="email"
        width={350}
        fullWidth
      />
      <Input
        id="password"
        label="Password"
        type={isPasswordShown ? 'text' : 'password'}
        placeholder="••••••"
        control={control}
        name="password"
        width={350}
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShownPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {isPasswordShown ? (
                <VisibilityOffIcon width={24} height={24} />
              ) : (
                <VisibilityIcon width={24} height={24} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      <Box
        sx={{
          maxWidth: 350,
          marginBottom: 4,
          dispay: 'flex',
          justifyContent: 'center'
        }}
      >
        <Typography variant="subtitle1" color="others.error">
          {errorMessage}
        </Typography>
      </Box>
      <Button
        color="primary"
        size="large"
        variant="contained"
        fullWidth
        type="submit"
        sx={{ marginBottom: 8, width: 400 }}
        disabled={!formState.isDirty || !formState.isValid || isLoading}
      >
        Зареєструватися
      </Button>
      <NavLink to={AppRoute.LOGIN}>
        <Typography variant="subtitle1">Увійти до платформи</Typography>
      </NavLink>
      <Divider sx={{ marginBottom: 3, marginTop: 3, width: '100%' }}>Або</Divider>
      <NavLink to={AppRoute.WORKSHOP_REGISTRATION}>
        <Typography variant="subtitle1">Зареєструвати нову майстерню</Typography>
      </NavLink>
    </StyledForm>
  );
};

export { RegistrationForm };
