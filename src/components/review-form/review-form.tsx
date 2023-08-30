import * as dayjs from 'dayjs';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/use-dispatch';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/use-select';
import { AuthorizationStatus, RequestStatus } from '../../consts';
import { fetchReviewsAction, postReview } from '../../store/api-actions';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/user-selectors';
import { getReviewsStatusLoading } from '../../store/reviews/reviews-selectors';
import ReviewFormRating from '../review-form-rating/review-form-rating';

type TOfferReview = {
  offerId: string;
}

function ReviewForm ():JSX.Element{
  const dispatch = useAppDispatch();
  const {offerId} = useParams() as TOfferReview;
  const userData = useAppSelector(getUserData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const reload = useAppSelector(getReviewsStatusLoading);

  const [formData, setFormData] = useState({
    id: '',
    comment: '',
    date: '',
    rating: 0,
    user: {
      name: userData?.name,
      avatarUrl: userData?.avatarUrl,
      isPro: userData?.isPro
    },
  });

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData,[name]:value});
  };


  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData,[name]:value});
  };

  const handleSubmitClick = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(offerId){
      const a = evt.target as Comment;
      a.data = JSON.stringify({...formData , offerId});
      dispatch(postReview(evt.target as Comment));
    }
    setFormData({...formData,
      id: crypto.randomUUID(),
      date: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    });
  };


  useEffect(() => {
    if (reload === RequestStatus.SUCCESS) {
      dispatch(fetchReviewsAction(offerId));
    }
    return ()=> {
      setFormData({...formData, rating:0, comment:''});
    };
  }, [dispatch, offerId, reload]);

  const isFormValid = formData.comment.length < 49 || formData.comment.length > 299 || formData.rating === 0;

  return (
    <>
      {authorizationStatus !== AuthorizationStatus.Auth && (<div></div>)}
      {authorizationStatus === AuthorizationStatus.Auth && (
        <form
          className="reviews__form form"
          action="#"
          method="post"
          onSubmit={handleSubmitClick}
        >
          <label className="reviews__label form__label" htmlFor="review">
    Your review
          </label>
          <ReviewFormRating
            handleRatingChange={handleRatingChange}
          />
          <textarea
            className="reviews__textarea form__textarea"
            onChange={handleCommentChange}
            id="comment"
            name="comment"
            value={formData.comment}
            placeholder="Tell how was your stay, what you like and what can be improved"
            minLength={50}
            maxLength={300}
          />
          <div className="reviews__button-wrapper">
            <p className="reviews__help">
      To submit review please make sure to set{' '}
              <span className="reviews__star">rating</span> and describe
      your stay with at least{' '}
              <b className="reviews__text-amount">50 characters</b>.
            </p>
            <button
              className="reviews__submit form__submit button"
              type="submit"
              disabled={isFormValid}
            >
      Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default ReviewForm;
