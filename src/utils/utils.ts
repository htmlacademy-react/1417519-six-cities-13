import dayjs from 'dayjs';
import { Offer } from '../types/offer';
import { Review } from '../types/reviews';
import { TSorting } from '../types/sorting';

function sortByRating(a:Offer,b:Offer){
  return b.rating - a.rating;
}

function sortLowToHigh(a:Offer,b:Offer){
  return a.price - b.price;
}

function sortHighToLow(a:Offer,b:Offer){
  return b.price - a.price;
}

export const sorting:Record<TSorting, (offers:Offer[]) => Offer[]> = {
  Popular: (offers:Offer[]) => offers.slice(),
  HighToLow: (offers:Offer[]) => offers.slice().sort(sortHighToLow),
  LowToHigh: (offers:Offer[]) => offers.slice().sort(sortLowToHigh),
  TopRated: (offers:Offer[]) => offers.slice().sort(sortByRating),
};

export const sortTimeReviews = (reviews: Review[]): Review[] =>
  reviews.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
