import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppDispatch } from '../hooks/use-dispatch';
import { useAppSelector } from '../hooks/use-select';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/user-selectors';
import { getFavoriteOffers } from '../../store/offers-data/offers-selectors';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';

function HeaderNav () {

  const dispatch = useAppDispatch();
  const userDataStatus = useAppSelector(getAuthorizationStatus);

  const userData = useAppSelector(getUserData);
  const favorites = useAppSelector(getFavoriteOffers);

  useEffect(() => {
    if(userDataStatus === 'AUTH'){
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch,userDataStatus]);

  return (
    <nav className="header__nav">
      {userDataStatus === 'NO_AUTH' && (
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to={AppRoute.Login}
          >
            <span className="header__signout">Login</span>
          </Link>
        </li>)}
      {userDataStatus === 'AUTH' && (
        <ul className="header__nav-list">
          <li className="header__nav-item user">

            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
                {userData?.avatarUrl
                  &&
                  <img src={userData?.avatarUrl}
                    width={20} height={20}
                    style={{borderRadius:'50%'}}
                  />}
              </div>
              <span className="header__user-name user__name">
                {userData?.email}
              </span>
              {favorites.length > 0 && <span className="header__favorite-count">{favorites.length}</span>}
            </Link>

          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              } }
              to={AppRoute.Login}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default HeaderNav;
