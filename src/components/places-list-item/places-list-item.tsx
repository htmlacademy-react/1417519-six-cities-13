import { MouseEvent, memo } from 'react';
import { classesFor } from '../../types/classes-for';
import { useAppSelector } from '../hooks/use-select';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../consts';
import { Offer } from '../../types/offer';
import { changeFavStatus } from '../../store/api-actions';
import { PremiumMark } from '../premium-mark/premium-mark';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { getAuthorizationStatus } from '../../store/user-process/user-selectors';
import { updateFavoriteOffer } from '../../store/offers-data/offers-data';
import { useAppDispatch } from '../hooks/use-dispatch';


type PlacesListScreenProps = {
  offer:Offer;
  onListItemHover: (listItemName: string) => void;
  onListItemUnHover:(listItemName: string) => void;
  classesForPlacesList:classesFor;
}

function PlacesListItem ({offer,onListItemHover,onListItemUnHover,classesForPlacesList}: PlacesListScreenProps,):JSX.Element{
  const {placesCardType,imageWrapper} = classesForPlacesList;
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(getAuthorizationStatus);
  const offerId = offer.id;

  const handleListItemHover = (event:MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onListItemHover(offerId);
  };

  const handleListItemUnHover = (event:MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onListItemUnHover(offerId);
  };

  const handleBookmarkClick = (event:MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    if(loginStatus !== 'AUTH'){
      dispatch(redirectToRoute(AppRoute.Login));
    }else{

      if(offer.isFavorite){
        dispatch(changeFavStatus({offerId , isFavorite: false}));
        dispatch(updateFavoriteOffer({offerId , isFavorite: false}));
      }else{
        dispatch(changeFavStatus({offerId , isFavorite: true}));
        dispatch(updateFavoriteOffer({offerId , isFavorite: true}));
      }
    }
  };

  return (
    <article
      className={cn(placesCardType,'place-card')}
      key={offer.id}
      onMouseEnter={handleListItemHover}
      onMouseLeave={handleListItemUnHover}
    >
      {offer.isPremium && <PremiumMark/>}
      <div className={cn(imageWrapper,'place-card__image-wrapper')}>
        <a

          href="#"
        >
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            onClick={handleBookmarkClick}
            className= {offer.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button ' : 'place-card__bookmark-button button'}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20 }%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>);
}


export default memo(PlacesListItem);
