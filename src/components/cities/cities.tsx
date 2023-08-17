import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { useState } from 'react';
import { useAppSelector } from '../../components/hooks/use-select';
import Sorting from '../places-sorting-form/sorting';

function Cities ():JSX.Element {
  const [activeSorting,setActiveSorting] = useState('Popular');
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const classesForPlacesList = {
    mapType:'cities__map',
    placesListType: 'cities__places-list  tabs__content',
    placesCardType: 'cities__card',
    imageWrapper:'cities__image-wrapper',
  };


  const activeCity = useAppSelector((state)=> state.currentCity);
  const rentingOffers = useAppSelector((state)=> state.offers);
  const actualOffers = rentingOffers.filter((offer)=> offer.city.name === activeCity);

  const handleListItemHover = (listItemName: string) => {
    const currentPoint = actualOffers.find((point) => point.id === listItemName);
    setSelectedPoint(currentPoint);
  };
  const handleListItemUnHover = (listItemName: string) => {
    const currentPoint = actualOffers.find((point) => point.id === listItemName);
    if(currentPoint){
      setSelectedPoint(undefined);
    }
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{actualOffers.length} places to stay in {activeCity}</b>
          <Sorting
            activeSorting = {activeSorting}
            onChange = {(newSorting) => setActiveSorting(newSorting)}
          />
          <PlacesList
            activeSorting = {activeSorting}
            rentingOffers = {actualOffers}
            onListItemHover={handleListItemHover}
            onListItemUnHover={handleListItemUnHover}
            classesForPlacesList={classesForPlacesList}
          />
        </section>
        <div className="cities__right-section">
          <Map
            points={actualOffers}
            selectedPoint={selectedPoint}
            mapType = {classesForPlacesList.mapType}
          />
        </div>
      </div>
    </div>
  );

}

export {Cities};

