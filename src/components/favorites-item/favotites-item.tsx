import { Offers } from '../../types/offer';
import FavoritePlaceCard from '../favorites-place-card/favorites-place-card';

type FavoriteLocItemsScreenProps = {
  favoriteOffers: Offers;
}

function FavoriteLocItem ({favoriteOffers}:FavoriteLocItemsScreenProps):JSX.Element {

  return (
    <>
      { favoriteOffers.length < 1 && (null)}
      {favoriteOffers.length > 0 && (
        <li className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{favoriteOffers[0].city.name}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteOffers.map((offer) => (
              <FavoritePlaceCard key={offer.id} rentingOffer = {offer}/>
            ))}
          </div>
        </li>
      )}
    </>
  );
}

export default FavoriteLocItem;
