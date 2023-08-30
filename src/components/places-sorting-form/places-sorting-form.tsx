import { useState,KeyboardEvent } from 'react';
import cn from 'classnames';
import { TSorting } from '../../types/sorting';
import { SortingMap } from '../../consts';
import { memo } from 'react';

type SortingProps = {
  activeSorting: string;
  onChange: (newSorting: TSorting) => void;
}

function Sorting ({activeSorting, onChange}: SortingProps){
  const [isOpened, setOpenedState] = useState(false);
  const opened = isOpened ? 'places__options--opened' : '';

  function handleKeydown(evt:KeyboardEvent) {
    if(evt.key === 'Escape' && isOpened){
      evt.preventDefault();
      setOpenedState(false);
    }
  }

  function handleTypeClick() {
    setOpenedState((prevIsOpened) => !prevIsOpened);
  }

  function handleSortingItemClick(type: TSorting){
    onChange(type);
    setOpenedState(false);
  }

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onKeyDown={handleKeydown}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleTypeClick}
      >
        {SortingMap[activeSorting as keyof typeof SortingMap]}
        <svg
          className="places__sorting-arrow"
          width={7}
          height={4}
        >
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={cn(`places__options places__options--custom ${opened}`)}>
        {(Object.entries(SortingMap)
        ).map(([type,label]) => (
          <li
            key={type}
            className={cn('places__option',{
              'places__option--active': activeSorting === type,
            })}
            tabIndex={0}
            onClick={()=>handleSortingItemClick(type)}
          >
            {label}
          </li>
        ))}
      </ul>
    </form>
  );
}


export default memo(Sorting);
