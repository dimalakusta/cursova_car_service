import { styled } from '@mui/material';

export const ContactsIconWrapper = styled('div')`
  height: 32px;
  border-radius: 50%;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  background-color: ${({ theme }) => theme.palette.others.borderColor};
`;
