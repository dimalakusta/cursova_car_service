import { StyledImage, StyledImageWrapper } from './image.styles';

const Image = ({
  alt,
  isCentered = false,
  isCircular = false,
  height,
  src,
  width,
  borderRadius
}) => (
  <StyledImageWrapper
    width={width}
    height={height}
    isCentered={isCentered}
    isCircular={isCircular}
    borderRadius={borderRadius}
  >
    <StyledImage src={src} alt={alt} loading="lazy" />
  </StyledImageWrapper>
);

export { Image };
