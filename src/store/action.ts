import {createAction} from '@reduxjs/toolkit';
import { FullOffer, Offer, Offers } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../consts';
import { Reviews } from '../types/reviews';
import { UserData } from '../types/user-data';

export const changeCity = createAction(
  'main/changeCity',
  (city:string | undefined) => ({payload: city})
);

export const loadOffers = createAction<Offers>('main/loadOffers');

export const loadOffer = createAction<FullOffer>('offer/loadOffer');

export const loadReviews = createAction<Reviews>('offer/loadReviews');

export const dropOffer = createAction('OFFER/drop');

export const loadFavorites = createAction<Offer>('main/loadFavorites');

export const loadNearPlaces = createAction<Offers>('main/loadNearPlaces');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setQuestionsDataLoadingStatus');

export const setOfferDataLoadingStatus = createAction<boolean>('data/setQuestionDataLoadingStatus');

export const setNearOffersDataLoadingStatus = createAction<boolean>('data/setNearOffersDataLoadingStatus');

export const setReviewsDataLoadingStatus = createAction<boolean>('data/setReviewsDataLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');

export const setAuthData = createAction('USER/setUserInfo', (userInfo: UserData | null) => ({payload: userInfo}));

export const setNewReviewsDataLoadingStatus = createAction<boolean>('data/setNewReviewsDataLoadingStatus');
