import { InputBase, InputLabel, styled } from '@mui/material';

export const StyledLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '20px',
  position: 'relative',
  '&.Mui-focused': {
    color: theme.palette.text.primary
  }
}));

export const StyledInput = styled(InputBase)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  border: 'none',
  padding: theme.spacing(2.5, 3),
  background: theme.palette.others.background,
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    fontFamily: "'Inter', sans-serif"
  },
  '&.Mui-focused': {
    color: theme.palette.text.primary
  }
}));
