import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const StyledLoginFormContainer = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: 421,
  minWidth: 420,
  padding: theme.spacing(12, 16),
  background: theme.palette.common.white
}));

export const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // flex: 1,
  padding: theme.spacing(0, 15),
  // margin: theme.spacing(15, 0),
  minWidth: 600
}));
