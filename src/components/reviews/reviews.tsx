import { useAppSelector } from '../hooks/use-select';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/review-list';
import { getReviews } from '../../store/reviews/reviews-selectors';


function Reviews ():JSX.Element {

  const reviews = useAppSelector(getReviews);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
  Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList/>
      <ReviewForm />
    </section>
  );
}

export default Reviews;
