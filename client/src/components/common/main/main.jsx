import { StyledContainer, ViewportContainer } from './main.styles';

const Main = ({ children, hasHeader }) => {
  return (
    <ViewportContainer>
      <StyledContainer fixed hasHeader={hasHeader}>
        {children}
      </StyledContainer>
    </ViewportContainer>
  );
};

export { Main };
