import { useAppSelector } from '../hooks/use-select';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/review-list';
import { sortTimeReviews } from '../../utils/utils';
import { getReviews } from '../../store/reviews/reviews-selectors';


function Reviews ():JSX.Element {

  const reviews = useAppSelector(getReviews);
  const lastReviews = reviews && sortTimeReviews([...reviews]).slice(0, 10);


  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
  Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList reviews={lastReviews}/>
      <ReviewForm />
    </section>
  );
}

export default Reviews;
