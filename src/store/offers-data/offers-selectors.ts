import { NameSpace } from '../../consts';
import { FullOffer, Offers } from '../../types/offer';
import { State } from '../../types/state';

export const getOffers = (state: State): Offers => state[NameSpace.Offers].offers;
export const isOffersDataLoading = (state: State):boolean => state[NameSpace.Offers].isOffersDataLoading;

export const getOffer = (state: State): FullOffer | null => state[NameSpace.Offers].offer;

export const isOfferLoading = (state: State): boolean => state[NameSpace.Offers].isOfferDataLoading;

export const getNeigborhoodOffers = (state: State): Offers | undefined => state[NameSpace.Offers].nearPlaces;
export const isNeigbourhoodOffersLoading = (state: State): boolean => state[NameSpace.Offers].isNearOffersDataLoading;

export const getCurrentCity = (state: State): string | undefined => state[NameSpace.Offers].currentCity;

export const getFavoriteOffers = (state: State): Offers => state[NameSpace.Offers].favorites;
export const getFavoriteDataStatus = (state: State): boolean => state[NameSpace.Offers].isFavoritesDataLoading;

export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;
