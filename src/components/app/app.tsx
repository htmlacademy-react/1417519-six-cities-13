import {Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../hooks/use-select';
import LoadingScreen from '../loading-screen/loading-screen';
import { HelmetProvider } from 'react-helmet-async';

import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavorivePage from '../../pages/favorite-page/favorite-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Error from '../../pages/404-page/404-page';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-gistory';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/user-selectors';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';
import { useAppDispatch } from '../hooks/use-dispatch';


function App (): JSX.Element{
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  useEffect(() => {
    dispatch(fetchOffersAction());
    if(authorizationStatus === 'AUTH'){
      dispatch(checkAuthAction());
    }
  }, [dispatch,authorizationStatus]);

  if (!isAuthChecked) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element=
              {<MainPage/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            //
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavorivePage/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element={
              <OfferPage/>
            }
          />
          <Route
            path="*"
            element={<Error />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
