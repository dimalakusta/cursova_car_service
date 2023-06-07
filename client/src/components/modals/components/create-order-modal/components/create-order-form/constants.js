export const DEFAULT_CREATE_ORDER_FORM_PAYLOAD = {
  services: [],
  description: '',
  carId: '',
  model: '',
  yearOfProduction: null,
  licensePlateNumber: '',
  phoneNumber: '',
  fullName: ''
};

export const CREATE_ORDER_FORM_STEPS = [
  'Обери послугу',
  'Заповни інформацію про автомобіль',
  'Обери дату візиту',
  'Заповніть контактні дані'
];

export const getFormSteps = isContactInfoFilled => {
  return isContactInfoFilled ? CREATE_ORDER_FORM_STEPS.slice(0, 3) : CREATE_ORDER_FORM_STEPS;
};
