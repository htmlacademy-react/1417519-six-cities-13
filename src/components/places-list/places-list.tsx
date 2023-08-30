import { Offer, Offers } from '../../types/offer';
import cn from 'classnames';
import { classesFor } from '../../types/classes-for';
import { sorting } from '../../utils/utils';
import PlacesListItem from '../places-list-item/places-list-item';


type PlacesListScreenProps = {
  activeSorting: string;
  rentingOffers: Offers;
  onListItemHover: (listItemName: string) => void;
  onListItemUnHover:(listItemName: string) => void;
  classesForPlacesList:classesFor;
}

function PlacesList ({activeSorting,rentingOffers,onListItemHover,onListItemUnHover,classesForPlacesList}: PlacesListScreenProps,):JSX.Element {
  const {placesListType} = classesForPlacesList;

  return (
    <div className={cn(placesListType,'places__list')}>
      {sorting[activeSorting](rentingOffers).map((offer:Offer) => (
        <PlacesListItem
          offer={offer}
          key={offer.id}
          onListItemHover={onListItemHover}
          onListItemUnHover={onListItemUnHover}
          classesForPlacesList={classesForPlacesList}
        />
      ))}
    </div>
  );
}

export default PlacesList;
