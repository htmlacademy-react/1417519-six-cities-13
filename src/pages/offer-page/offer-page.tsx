import Logo from '../../components/logo/logo';
import { useParams } from 'react-router-dom';
import { FullOffer, Offers } from '../../types/offer';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import { OfferPremiumMark } from '../../components/offer-premium-mark/offer-premium-mark';
import OfferInside from '../../components/offer-inside/offer-inside';
import OfferHost from '../../components/offer-host/offer-host';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { useEffect, useState } from 'react';
import NearPlaces from '../../components/near-palces/near-places';
import HeaderNav from '../../components/header-nav/header-nav';
import { useAppSelector } from '../../components/hooks/use-select';
import { fetchNeigbourhoodOffersAction, fetchOfferAction, fetchReviewsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../components/hooks/use-dispatch';
import { dropOffer } from '../../store/action';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import Error from '../404-page/404-page';

function OfferPage(): JSX.Element {
  const {offerId} = useParams();
  const dispatch = useAppDispatch();

  const rentingOffers = useAppSelector((state)=> state.offers);
  const actualOffer: FullOffer = useAppSelector((state)=> state.offer) as FullOffer;
  const neighbourhoodOffers = useAppSelector((state)=> state.nearPlaces) as Offers;
  const offerFetchingStatus = useAppSelector((state) => state.isOfferDataLoading);
  const nearOffersFetchingStatus = useAppSelector((state) => state.isNearOffersDataLoading);
  const reviewsOfferFetchingStatus = useAppSelector((state) => state.isReviewsDataLoading);

  const mapType = 'offer__map';
  const classesForPlacesList = {
    mapType:'offer__map',
    placesListType: 'near-places__list',
    placesCardType: 'near-places__card ',
    imageWrapper:'cities__image-wrapper',
  };

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
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


  return (
    <>
      {offerFetchingStatus || nearOffersFetchingStatus || reviewsOfferFetchingStatus && <LoadingScreen/>}
      {offerFetchingStatus === false && actualOffer && (
        <div className="page">
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <Logo/>
                <HeaderNav/>
              </div>
            </div>
          </header>
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
                points={neighbourhoodOffers}
                selectedPoint={selectedPoint}
                mapType = {mapType}
              />
            </section>
            <div className="container">
              <NearPlaces
                neighbourhoodOffers= {neighbourhoodOffers}
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
