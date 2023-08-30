import { cityNames } from '../../consts';
import { getFavoriteOffers } from '../../store/offers-data/offers-selectors';
import FavoriteLocItem from '../favorites-item/favotites-item';
import { useAppSelector } from '../hooks/use-select';


function FavoriteLocList ():JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  return (
    <ul className="favorites__list">
      {cityNames.map((name)=>(
        <FavoriteLocItem
          key={name}
          favoriteOffers={favoriteOffers.filter((offer)=> offer.city.name === name)}
        />))}
    </ul>

  );
}

export default FavoriteLocList;
