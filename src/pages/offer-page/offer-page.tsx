import { useParams } from 'react-router-dom';
import { FavoritesStatusData, FullOffer, Offers } from '../../types/offer';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import { OfferPremiumMark } from '../../components/offer-premium-mark/offer-premium-mark';
import OfferInside from '../../components/offer-inside/offer-inside';
import OfferHost from '../../components/offer-host/offer-host';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { useEffect, useState } from 'react';
import NearPlaces from '../../components/near-palces/near-places';
import { useAppSelector } from '../../components/hooks/use-select';
import { changeFavStatus, fetchNeigbourhoodOffersAction, fetchOfferAction, fetchReviewsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../components/hooks/use-dispatch';
import { redirectToRoute } from '../../store/action';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import Error from '../404-page/404-page';
import {MouseEvent} from 'react';
import { AppRoute } from '../../consts';
import Header from '../../components/header/header';
import { getNeigborhoodOffers, getOffer, getOffers, isNeigbourhoodOffersLoading, isOfferLoading } from '../../store/offers-data/offers-selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-selectors';
import { dropOffer, updateFavoriteOffer } from '../../store/offers-data/offers-data';


function OfferPage(): JSX.Element {
  const {offerId} = useParams();
  const dispatch = useAppDispatch();

  const rentingOffers = useAppSelector(getOffers);

  const actualOffer = useAppSelector(getOffer) as FullOffer;
  const currentOffer = rentingOffers.find((offer)=>offer.id === offerId) as Offer;
  const nearPlacesOffers = useAppSelector(getNeigborhoodOffers) as Offers;
  const neighbourhoodOffersForMap = nearPlacesOffers?.slice(0,3).concat(currentOffer);

  const offerFetchingStatus = useAppSelector(isOfferLoading);
  const nearOffersFetchingStatus = useAppSelector(isNeigbourhoodOffersLoading);

  const loginStatus = useAppSelector(getAuthorizationStatus);

  const mapType = 'offer__map';
  const classesForPlacesList = {
    mapType:'offer__map',
    placesListType: 'near-places__list',
    placesCardType: 'near-places__card ',
    imageWrapper:'cities__image-wrapper',
  };

  const [, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const handleListItemHover = (listItemName: string) => {
    const currentPoint = rentingOffers.find((point) => point.id === listItemName);
    setSelectedPoint(currentPoint);
  };

  const handleListItemUnHover = (listItemName: string) => {
    const currentPoint = rentingOffers.find((point) => point.id === listItemName);
    if(currentPoint){
      setSelectedPoint(undefined);
    }
  };

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferAction(offerId));
      dispatch(fetchNeigbourhoodOffersAction(offerId));
      dispatch(fetchReviewsAction(offerId));
    }
    return () => {
      dispatch(dropOffer());
    };
  }, [offerId,dispatch]);

  const validId = rentingOffers.find((offer)=> offer.id === offerId);

  if(!validId) {
    return <Error/>;
  }

  const handleBookmarkClick = (event:MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    if(loginStatus !== 'AUTH'){
      dispatch(redirectToRoute(AppRoute.Login));
    }else{
      if(actualOffer.isFavorite){
        dispatch(changeFavStatus({offerId , isFavorite: false} as FavoritesStatusData));
        dispatch(updateFavoriteOffer({offerId, isFavorite: false} as FavoritesStatusData));
      }else{
        dispatch(changeFavStatus({offerId , isFavorite: true} as FavoritesStatusData));
        dispatch(updateFavoriteOffer({offerId, isFavorite: true} as FavoritesStatusData));
      }
    }
  };

  return (
    <>
      {offerFetchingStatus || nearOffersFetchingStatus && <LoadingScreen/>}
      {offerFetchingStatus === false && actualOffer && (
        <div className="page">
          <Header/>
          <main className="page__main page__main--offer">
            <section className="offer">
              <div className="offer__gallery-container container">
                <OfferGallery actualImages = {actualOffer.images} />
              </div>
              <div className="offer__container container">
                <div className="offer__wrapper">
                  {actualOffer.isPremium ? <OfferPremiumMark /> : ''}
                  <div className="offer__name-wrapper">
                    <h1 className="offer__name">
                      {actualOffer.title}
                    </h1>
                    <button
                      onClick={handleBookmarkClick}
                      className={actualOffer.isFavorite ? 'offer__bookmark-button offer__bookmark-button--active button ' : 'offer__bookmark-button button'}
                      type="button"
                    >
                      <svg className="offer__bookmark-icon" width={31} height={33}>
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="offer__rating rating">
                    <div className="offer__stars rating__stars">
                      <span style={{ width: `${actualOffer.rating * 20 }%`}} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="offer__rating-value rating__value">{actualOffer.rating}</span>
                  </div>
                  <ul className="offer__features">
                    <li className="offer__feature offer__feature--entire">{actualOffer.type}</li>
                    <li className="offer__feature offer__feature--bedrooms">
                      {actualOffer.bedrooms} Bedrooms
                    </li>
                    <li className="offer__feature offer__feature--adults">
              Max {actualOffer.maxAdults} adults
                    </li>
                  </ul>
                  <div className="offer__price">
                    <b className="offer__price-value">€{actualOffer.price}</b>
                    <span className="offer__price-text">&nbsp;night</span>
                  </div>
                  <OfferInside actualGoods = {actualOffer.goods}/>
                  <OfferHost actualOffer = {actualOffer}/>
                  <Reviews/>
                </div>
              </div>
              <Map
                points={neighbourhoodOffersForMap}
                selectedPoint={currentOffer}
                mapType = {mapType}
              />
            </section>
            <div className="container">
              <NearPlaces
                handleListItemHover={handleListItemHover}
                handleListItemUnHover={handleListItemUnHover}
                classesForPlacesList={classesForPlacesList}
              />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
export default OfferPage;
