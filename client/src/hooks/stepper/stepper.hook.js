import { StepperContext } from 'contexts/contexts';
import { useContext } from 'react';

const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within StepperProvider');
  }

  return context;
};

export { useStepper };
