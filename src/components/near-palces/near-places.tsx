import { getNeigborhoodOffers } from '../../store/offers-data/offers-selectors';
import { classesFor } from '../../types/classes-for';
import { Offers } from '../../types/offer';
import { useAppSelector } from '../hooks/use-select';
import PlacesList from '../places-list/places-list';

type PlacesListPageScreenProps = {
  handleListItemHover: (listItemName: string) => void;
  handleListItemUnHover:(listItemName: string) => void;
  classesForPlacesList:classesFor;
}

function NearPlaces({handleListItemHover,handleListItemUnHover,classesForPlacesList}: PlacesListPageScreenProps): JSX.Element {
  const nearPlacesOffers = useAppSelector(getNeigborhoodOffers) as Offers;
  const neighbourhoodOffers = nearPlacesOffers?.slice(0,3);
  return (
    <section className="near-places places">
      <h2 className="near-places__title">
Other places in the neighbourhood
      </h2>
      <PlacesList
        activeSorting={'Popular'}
        rentingOffers = {neighbourhoodOffers}
        onListItemHover={handleListItemHover}
        onListItemUnHover={handleListItemUnHover}
        classesForPlacesList={classesForPlacesList}
      />
    </section>);
}

export default NearPlaces;
