import { CircularProgress, Stack } from '@mui/material';

const LoadingContainer = ({ height = 'calc(100vh - 64px)', spinnerSize = 70 }) => {
  return (
    <Stack justifyContent="center" alignItems="center" height={height}>
      <CircularProgress color="primary" size={spinnerSize} />
    </Stack>
  );
};

export { LoadingContainer };
