import moment from 'moment';
import { Reviews } from '../../types/reviews';
import { useAppSelector } from '../hooks/use-select';
import { getReviews } from '../../store/reviews/reviews-selectors';
import { sortTimeReviews } from '../../utils/utils';


function ReviewsList ():JSX.Element{

  const reviews = useAppSelector(getReviews);
  const lastReviews = reviews && sortTimeReviews([...reviews]).slice(0, 10) as Reviews;

  return (
    <ul className="reviews__list">
      {lastReviews.map((review) => (
        <li className="reviews__item" key={review.id}>
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={review.user.avatarUrl}
                width={54}
                height={54}
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">{review.user.name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: `${review.rating * 20 }%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              {review.comment}
            </p>
            <time className="reviews__time" dateTime={moment(review.date).format('YYYY-MM-DD')}>
              {moment(review.date).format('MMMM YYYY')}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ReviewsList;
