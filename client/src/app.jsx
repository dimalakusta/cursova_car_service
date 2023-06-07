import { AppRoute, StorageKey } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import {
  Main,
  PrivateRoute,
  PublicRoute,
  Header,
  SideMenu,
  LoadingContainer
} from 'components/common/common';
import { Home } from 'components/home/home';
import { Modals } from 'components/modals/modals';
import { Orders } from 'components/orders/orders';
import { Workshop } from 'components/workshop/workshop';
import { useCallback, useEffect, useState } from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { storage } from 'services/services';
import { authActionCreator } from 'store/auth/auth';

const App = () => {
  const { user } = useSelector(state => ({
    user: state.auth.user
  }));
  const dispatch = useDispatch();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  const handleUserLogout = useCallback(() => dispatch(authActionCreator.logout()), [dispatch]);

  const handleSideMenuOpen = useCallback(() => {
    setIsSideMenuOpen(true);
  }, []);

  const handleSideMenuClose = useCallback(() => {
    setIsSideMenuOpen(false);
  }, []);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActionCreator.loadCurrentUser());
    }
  }, [hasToken, dispatch]);

  if (hasToken && !hasUser) {
    return <LoadingContainer height="100vh" />;
  }

  return (
    <>
      {hasUser && (
        <>
          <Header
            onLogout={handleUserLogout}
            isSideMenuOpen={isSideMenuOpen}
            onSideMenuOpen={handleSideMenuOpen}
            username={user?.username}
          />
          <SideMenu isOpen={isSideMenuOpen} onClose={handleSideMenuClose} />
        </>
      )}
      <Main hasHeader={hasUser}>
        <Routes>
          <Route
            path={AppRoute.LOGIN}
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            path={AppRoute.REGISTRATION}
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            path={AppRoute.WORKSHOP_REGISTRATION}
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            path={AppRoute.ROOT}
            element={
              <PrivateRoute>
                <Home onLogout={handleUserLogout} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.WORKSHOP_$ID}
            element={
              <PrivateRoute>
                <Workshop />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.ORDERS}
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.ANY} element={<></>} />
        </Routes>
      </Main>
      <NotificationContainer />
      <Modals />
    </>
  );
};

export { App };
