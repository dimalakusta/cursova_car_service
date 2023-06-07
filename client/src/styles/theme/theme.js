import { createTheme } from '@mui/material';
import { palette } from './palette';
import { shape } from './shape';
import { typography } from './typography';
import { components } from './components';

export const theme = createTheme({
  components,
  palette,
  shape,
  typography,
  spacing: 4
});
