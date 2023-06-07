import { styled } from '@mui/material';

export const StyledImageWrapper = styled('div')`
  ${({ width }) => width && `width: ${width}px`};

  ${({ height }) => height && `height: ${height}px`};

  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}px`};

  ${({ isCircular }) =>
    isCircular &&
    `
    border-radius: 50%; 
    overflow: hidden;`}

  ${({ isCentered }) => isCentered && 'margin: auto'};
  overflow: hidden;
`;

export const StyledImage = styled('img')`
  display: block;
  max-width: 100%;
  height: auto;
  background-color: transparent;
  object-fit: cover;
`;
