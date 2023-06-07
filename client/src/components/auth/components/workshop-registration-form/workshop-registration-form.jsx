import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import {
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Typography,
  FormGroup,
  Stack
} from '@mui/material';
import { Input, PhoneNumberInput } from 'components/common/common';
import { AppRoute } from 'common/enums/enums.js';
import { useAppForm } from 'hooks/hooks.js';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { registration as registrationValidationSchema } from 'validation-schemas/validation-schemas.js';
import { StyledForm } from '../../auth.styles';

const DEFAULT_WORKSHOP_REGISTRATION_PAYLOAD = {
  username: '',
  email: '',
  password: '',
  name: ''
};

const WorkshopRegistrationForm = ({ onRegisterWorkshop, isLoading }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { control, formState, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_WORKSHOP_REGISTRATION_PAYLOAD,
    validationSchema: registrationValidationSchema
  });

  const handleSubmitWorkshopRegister = values => {
    onRegisterWorkshop(values);
  };

  const handleShownPassword = () => {
    setIsPasswordShown(prevState => !prevState);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleSubmitWorkshopRegister)}>
      <Typography variant="h6" marginBottom={8}>
        Створити нову майстерню
      </Typography>
      <Stack direction="column">
        <FormGroup row sx={{ display: 'flex', justifyContent: 'space-between', minWidth: 650 }}>
          <Input
            id="username"
            label="Юзернейм адміністратора"
            type="text"
            placeholder="example123"
            control={control}
            name="username"
            width={300}
          />
          <Input
            id="email"
            label="Електронна пошта адміністратора"
            type="email"
            placeholder="example@gmail.com"
            control={control}
            name="email"
            width={300}
          />
        </FormGroup>

        <Input
          id="password"
          label="Пароль"
          type={isPasswordShown ? 'text' : 'password'}
          placeholder="••••••"
          control={control}
          name="password"
          width={300}
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
        <FormGroup row sx={{ display: 'flex', justifyContent: 'space-between', minWidth: 650 }}>
          <Input
            id="name"
            label="Назва"
            type="text"
            placeholder="ТОВ-Автосервіс"
            control={control}
            name="name"
            width={300}
            fullWidth
          />

          <Input
            id="address"
            label="Адреса"
            type="text"
            placeholder="м. Чернівці, вул. Івасюка"
            control={control}
            name="address"
            width={300}
            fullWidth
          />
        </FormGroup>

        <Input
          id="description"
          label="Короткий опис"
          type="text"
          rows={4}
          placeholder="СТО почало працювати в квітні 2020р..."
          control={control}
          name="address"
          width={500}
          fullWidth
        />
        <FormGroup row sx={{ display: 'flex', justifyContent: 'space-between', minWidth: 650 }}>
          <PhoneNumberInput control={control} name="phoneNumber" label="Номер телефону" />
          <Input
            id="website"
            label="Вебсайт"
            type="text"
            placeholder="https://car-service.com"
            control={control}
            name="website"
            width={300}
          />
        </FormGroup>
      </Stack>

      <Button
        color="primary"
        size="large"
        variant="contained"
        fullWidth
        type="submit"
        sx={{ marginBottom: 8, width: 400 }}
        disabled={!formState.isDirty || !formState.isValid || isLoading}
      >
        Зареєструвати майстерню
      </Button>

      <NavLink to={AppRoute.LOGIN}>
        <Typography variant="subtitle1">Увійти до платформи</Typography>
      </NavLink>
      <Divider sx={{ marginBottom: 3, marginTop: 3, width: '100%' }}>Або</Divider>
      <NavLink to={AppRoute.REGISTRATION}>
        <Typography variant="subtitle1">Зареєструватися</Typography>
      </NavLink>
    </StyledForm>
  );
};

export { WorkshopRegistrationForm };
