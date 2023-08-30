import { useAppSelector } from '../../components/hooks/use-select';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import FavoriteLocEmpty from '../../components/favorites-empty/favorites-empty';
import Header from '../../components/header/header';
import FavoritesMainPage from '../../components/favorites-main-page/favorites-main-page';
import { getFavoriteOffers, isOfferLoading } from '../../store/offers-data/offers-selectors';


function FavorivePage ():JSX.Element{
  const favoritesOfferFetchingStatus = useAppSelector(isOfferLoading);
  const rentingOffers = useAppSelector(getFavoriteOffers);


  return (
    <>
      {favoritesOfferFetchingStatus === true && <LoadingScreen/>}
      {favoritesOfferFetchingStatus === false && rentingOffers && (
        <div className="page">
          <Header/>
          {rentingOffers.length < 1 && (<FavoriteLocEmpty/>)}
          {rentingOffers.length > 0 && (
            <FavoritesMainPage/>
          )}

          <footer className="footer container">
            <a className="footer__logo-link" href="main.html">
              <img
                className="footer__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={64}
                height={33}
              />
            </a>
          </footer>
        </div>
      )}
    </>
  );
}

export default FavorivePage;
