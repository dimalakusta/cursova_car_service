import { styled } from '@mui/material';

export const StyledServiceItem = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.others.borderColor};
`;
