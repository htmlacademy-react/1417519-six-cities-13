/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Offers, FullOffer, Offer } from '../types/offer.js';
import {
  loadFavorites,
  loadNearPlaces,
  loadOffer,
  loadOffers,
  loadReviews,
  redirectToRoute,
  requireAuthorization,
  setAuthData,
  setNearOffersDataLoadingStatus,
  setOfferDataLoadingStatus,
  setOffersDataLoadingStatus,
  setReviewsDataLoadingStatus} from './action';
import { saveToken,dropToken } from '../services/token.js';
import { AppRoute,APIRoute,AuthorizationStatus, NameSpace } from '../consts';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import { FormData, Review, Reviews } from '../types/reviews.js';

export const fetchOffersAction = createAsyncThunk<void,undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offers}/fetchOffers`,
  async(_arg,{dispatch,extra:api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offer}/fetchOffer`,
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOfferDataLoadingStatus(true));
    const {data} = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    dispatch(setOfferDataLoadingStatus(false));
    dispatch(loadOffer(data));
  },
);

export const fetchNeigbourhoodOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.NearPlaces}/fetchNeigbourhoodOffers`,
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setNearOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(setNearOffersDataLoadingStatus(false));
    dispatch(loadNearPlaces(data));
  }
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setReviewsDataLoadingStatus(true));
    const {data} = await api.get<Reviews>(`comments/${offerId}`);
    dispatch(setReviewsDataLoadingStatus(false));
    dispatch(loadReviews(data));
  }
);


export const postReview = createAsyncThunk<Review,Comment,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }
 >(
   `${NameSpace.Reviews}/postReview`,
   async (formdata, { extra: api }) => {
     const a = JSON.parse(formdata.data) as FormData;
     const { data } = await api.post<Review>(`comments/${a.offerId}`, ({comment: a.comment, rating: +a.rating}));
     return data;
   },
 );


export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FAVORITES/fetch',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer>(APIRoute.Favorites);
      dispatch(loadFavorites(data));
    } catch {
      throw new Error();
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(setAuthData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(redirectToRoute(AppRoute.Login));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/login`,
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
