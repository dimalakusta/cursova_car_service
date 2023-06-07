import { useState, useCallback, useMemo } from 'react';
import { StepperContext } from './stepper.context';

const StepperProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, []);

  const value = useMemo(
    () => ({
      activeStep,
      handleNext,
      handleBack,
      handleReset
    }),
    [activeStep, handleBack, handleNext, handleReset]
  );

  return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
};

export { StepperProvider };
