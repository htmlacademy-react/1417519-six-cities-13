import {AxiosInstance} from 'axios';
import { createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Offers, FullOffer, FavoritesStatusData, Offer } from '../types/offer.js';
import { redirectToRoute } from './action';
import { saveToken,dropToken } from '../services/token.js';
import { AppRoute,APIRoute, NameSpace } from '../consts';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import { FormData, Review, Reviews } from '../types/reviews.js';

export const fetchOffersAction = createAsyncThunk<Offers,undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offers}/fetchOffers`,
  async(_arg,{extra:api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<FullOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offer}/fetchOffer`,
  async (offerId, { extra: api}) => {
    const {data} = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchNeigbourhoodOffersAction = createAsyncThunk<Offers, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.NearPlaces}/fetchNeigbourhoodOffers`,
  async (offerId, { extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (offerId, { extra: api}) => {
    const {data} = await api.get<Reviews>(`comments/${offerId}`);
    return data;
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


export const fetchFavoritesAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FAVORITES/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Favorites);
    return data;
  },
);

export const changeFavStatus = createAsyncThunk<Offer,FavoritesStatusData,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }
 >(
   `${NameSpace.Offers}/changeFavStatus`,
   async ({offerId , isFavorite}, {dispatch, extra: api }) => {
     const url = `${APIRoute.Favorites}/${offerId}/${+isFavorite}`;
     const { data } = await api.post<Offer>(url);
     dispatch(fetchFavoritesAction());
     return data;
   },
 );


export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/login`,
  async ({login: email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
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
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
