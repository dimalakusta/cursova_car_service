import { createContext } from 'react';

export const StepperContext = createContext({
  activeStep: 0,
  handleNext: null,
  handleBack: null,
  handleReset: null
});
