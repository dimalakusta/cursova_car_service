import { styled, IconButton } from '@mui/material';

export const ButtonDirection = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

export const StyledModalHeader = styled('div')`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.others.borderColor};
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  ${({ direction }) => (direction === ButtonDirection.LEFT ? 'left: 12px;' : 'right: 12px;')}
`;
