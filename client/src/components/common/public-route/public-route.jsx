import { Navigate } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children, ...rest }) => {
  const { user } = useSelector(state => ({ user: state.auth.user }));
  const hasUser = Boolean(user);

  return hasUser ? (
    <Navigate
      to={{ pathname: AppRoute.ROOT, state: { from: rest.location } }}
    />
  ) : (
    children
  );
};

export { PublicRoute };
