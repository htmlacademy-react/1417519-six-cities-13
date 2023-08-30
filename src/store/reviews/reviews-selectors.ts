import { NameSpace } from '../../consts';
import { Review } from '../../types/reviews';
import { State } from '../../types/state';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const isReviewsStatusLoading = (state: State): boolean => state[NameSpace.Reviews].isReviewsDataLoading;
export const getReviewsStatusLoading = (state: State): string => state[NameSpace.Reviews].status;

