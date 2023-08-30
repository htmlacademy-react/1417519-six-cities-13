import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Reviews } from '../../types/reviews';
import { NameSpace, RequestStatus } from '../../consts';
import { fetchReviewsAction, postReview } from '../api-actions';
import { toast } from 'react-toastify';

type initialState = {
  reviews: Reviews;
  isReviewsDataLoading: boolean;
  status: string;
};

const initialState: initialState = {
  reviews: [],
  isReviewsDataLoading: false,
  status: RequestStatus.IDLE
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setReviewStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsDataLoading = false;
      })
      .addCase(postReview.pending, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.reviews.unshift(action.payload);
      })
      .addCase(postReview.rejected, (state) => {
        state.status = RequestStatus.ERROR;
        toast.warn('Failed to post comment. Please, try again later');
      });
  }
});

export const { setReviewStatus } = reviews.actions;
