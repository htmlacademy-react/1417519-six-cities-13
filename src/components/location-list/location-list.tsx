import { cityNames } from '../../consts';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/use-select';
import { useAppDispatch } from '../hooks/use-dispatch';
import classNames from 'classnames';
import { getCurrentCity } from '../../store/offers-data/offers-selectors';
import { setActiveCity } from '../../store/offers-data/offers-data';

function LocationList () {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCurrentCity);

  const handleCityClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    const city = evt.currentTarget.dataset.city as string;
    dispatch(setActiveCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cityNames.map((city)=> (
        <li
          className="locations__item"
          key={city}
          data-city={city}
          onClick={handleCityClick}
        >
          <Link
            className={classNames(
              {
                'locations__item-link tabs__item tabs__item--active':
                  city === currentCity,
                'locations__item-link tabs__item': city !== currentCity,
              },
              ''
            )}
            to="#"
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LocationList;
