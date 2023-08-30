import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { fetchFavoritesAction, fetchNeigbourhoodOffersAction, fetchOfferAction, fetchOffersAction } from '../api-actions';
import { FavoritesStatusData, FullOffer, Offers } from '../../types/offer';
import { Reviews } from '../../types/reviews';

type InitialState = {
  currentCity: string | undefined;
  offers: Offers;
  offer:FullOffer | null;
  nearPlaces:Offers | undefined;
  rewiews: Reviews;
  favorites: Offers;
  isOffersDataLoading: boolean;
  isOfferDataLoading:boolean;
  isNearOffersDataLoading:boolean;
  isReviewsDataLoading:boolean;
  isNewReviewDataLoading: boolean;
  isFavoritesDataLoading: boolean;
  setNewFavoriteStatus: boolean;
  hasError: boolean;
}

const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  offer: null,
  nearPlaces: [],
  rewiews: [],
  favorites: [],
  isOfferDataLoading: false,
  isNearOffersDataLoading: false,
  isReviewsDataLoading: false,
  isOffersDataLoading: false,
  isNewReviewDataLoading: false,
  isFavoritesDataLoading:false,
  setNewFavoriteStatus: false,
  hasError: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers:{
    setActiveCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    updateFavoriteOffer: (state, action: PayloadAction<FavoritesStatusData>) => {
      const currentOfferIndex = state.offers.findIndex(
        (offer) => offer.id === action.payload.offerId
      );

      if(state.nearPlaces){
        const currentNearOfferIndex = state.nearPlaces.findIndex(
          (offer) => offer.id === action.payload.offerId
        );
        if (currentNearOfferIndex !== -1) {
          state.nearPlaces[currentNearOfferIndex].isFavorite = Boolean(
            action.payload.isFavorite
          );
        }

        if (currentOfferIndex !== -1) {
          state.offers[currentOfferIndex].isFavorite = Boolean(
            action.payload.isFavorite
          );
        }
        if(state.offer && state.offer.id === state.offers[currentOfferIndex].id){
          state.offer.isFavorite = Boolean(
            action.payload.isFavorite
          );
        }
      }
    },
    dropOffer: (state) => {
      state.offer = null;
      state.nearPlaces = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending,(state) => {

        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled,(state,action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchNeigbourhoodOffersAction.pending, (state) => {
        state.isNearOffersDataLoading = true;
      })
      .addCase(fetchNeigbourhoodOffersAction.fulfilled, (state, action) => {
        state.nearPlaces = action.payload;
        state.isNearOffersDataLoading = false;
      })
      .addCase(fetchNeigbourhoodOffersAction.rejected, (state) => {
        state.isNearOffersDataLoading = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesDataLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoritesDataLoading = false;
      });
  },
});

export const { dropOffer, setActiveCity, updateFavoriteOffer } = offersData.actions;
