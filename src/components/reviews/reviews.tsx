import { useAppSelector } from '../hooks/use-select';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/review-list';

function Reviews ():JSX.Element {

  const reviews = useAppSelector((state) => state.rewiews);


  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
  Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList reviews={reviews}/>
      <ReviewForm />
    </section>
  );
}

export default Reviews;
