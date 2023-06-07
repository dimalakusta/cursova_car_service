import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Typography, Divider } from '@mui/material';
import { Input } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { login as loginValidationSchema } from 'validation-schemas/validation-schemas.js';
import { StyledForm } from '../../auth.styles';

const DEFAULT_LOGIN_FORM_PAYLOAD = {
  email: '',
  password: ''
};

const LoginForm = ({ onLogin, isLoading, errorMessage }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { control, handleSubmit, formState } = useAppForm({
    defaultValues: DEFAULT_LOGIN_FORM_PAYLOAD,
    validationSchema: loginValidationSchema
  });

  const handleSumbitLogin = values => {
    onLogin(values);
  };

  const handleShownPassword = () => {
    setIsPasswordShown(prevState => !prevState);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleSumbitLogin)}>
      <Typography variant="h6" marginBottom={8}>
        Увійти до аккаунту
      </Typography>
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        control={control}
        name="email"
        fullWidth
        width={350}
      />
      <Input
        id="password"
        label="Password"
        type={isPasswordShown ? 'text' : 'password'}
        placeholder="••••••"
        control={control}
        name="password"
        fullWidth
        width={350}
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
        Увійти
      </Button>

      <NavLink to={AppRoute.REGISTRATION}>
        <Typography variant="subtitle1">Зареєструватися</Typography>
      </NavLink>
      <Divider sx={{ marginBottom: 3, marginTop: 3, width: '100%' }}>Або</Divider>
      <NavLink to={AppRoute.WORKSHOP_REGISTRATION}>
        <Typography variant="subtitle1">Зареєструвати нову майстерню</Typography>
      </NavLink>
    </StyledForm>
  );
};

export { LoginForm };
