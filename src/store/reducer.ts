import { createReducer } from '@reduxjs/toolkit';
import { FullOffer, Offers } from '../types/offer';
import {
  changeCity,
  dropOffer,
  loadNearPlaces,
  loadOffer,
  loadOffers,
  loadReviews,
  requireAuthorization,
  setAuthData,
  setNearOffersDataLoadingStatus,
  setNewReviewsDataLoadingStatus,
  setOfferDataLoadingStatus,
  setOffersDataLoadingStatus,
  setReviewsDataLoadingStatus
} from './action';

import { AuthorizationStatus } from '../consts';
import { Reviews } from '../types/reviews';
import { UserData } from '../types/user-data';

type InitialState = {
  currentCity: string | undefined;
  offers: Offers;
  offer:FullOffer | null;
  nearPlaces:Offers | undefined;
  rewiews: Reviews;
  favorites: [];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  isOfferDataLoading:boolean;
  isNearOffersDataLoading:boolean;
  isReviewsDataLoading:boolean;
  userData: UserData | null;
  isNewReviewDataLoading: boolean;
}

const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  offer: null,
  nearPlaces: [],
  rewiews: [],
  favorites: [],
  userData: null,
  isOfferDataLoading: false,
  isNearOffersDataLoading: false,
  isReviewsDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  isNewReviewDataLoading: false,
};


const reducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(changeCity,(state,action) => {
      state.currentCity = action.payload;
    })
    .addCase(loadOffers,(state,action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer,(state,action) => {
      state.offer = action.payload;
    })
    .addCase(loadNearPlaces,(state,action) => {
      state.nearPlaces = action.payload;
    })
    .addCase(requireAuthorization,(state,action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadReviews,(state,action) => {
      state.rewiews = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setNearOffersDataLoadingStatus, (state, action) => {
      state.isNearOffersDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.nearPlaces = [];
    })
    .addCase(setAuthData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setNewReviewsDataLoadingStatus, (state, action) => {
      state.isNewReviewDataLoading = action.payload;
    });
});

export {reducer};
