import { isRejectedWithValue } from '@reduxjs/toolkit';
import { notification as notificationService } from 'services/services';

export const errorHandlerMiddleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    notificationService.error(action?.error?.message);
  }
  return next(action);
};
