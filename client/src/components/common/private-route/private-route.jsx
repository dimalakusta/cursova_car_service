import { Navigate } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useSelector(state => ({ user: state.auth.user }));

  const hasUser = Boolean(user);

  return hasUser ? (
    children
  ) : (
    <Navigate
      to={{ pathname: AppRoute.LOGIN, state: { from: rest.location } }}
    />
  );
};

export { PrivateRoute };
