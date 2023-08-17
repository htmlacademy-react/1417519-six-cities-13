import * as dayjs from 'dayjs';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/use-dispatch';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/use-select';
import { AuthorizationStatus } from '../../consts';
import { fetchReviewsAction, postReview } from '../../store/api-actions';
import { setNewReviewsDataLoadingStatus } from '../../store/action';

type TOfferReview = {
  offerId: string;
}

function ReviewForm (){
  const dispatch = useAppDispatch();
  const {offerId} = useParams() as TOfferReview;
  const userData = useAppSelector((state)=> state.userData);
  const authorizationStatus = useAppSelector((state)=> state.authorizationStatus);
  const reload = useAppSelector((state)=> state.isNewReviewDataLoading);

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
      dispatch(setNewReviewsDataLoadingStatus(true));
    }
    setFormData({...formData,
      id: crypto.randomUUID(),
      date: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    });
  };

  useEffect(()=>{
    if(reload){
      dispatch(fetchReviewsAction(offerId));
      dispatch(setNewReviewsDataLoadingStatus(false));
      setFormData({...formData, rating:0, comment:''});
    }
  },[dispatch,offerId,reload,formData]);


  return (
    <>
      {authorizationStatus !== AuthorizationStatus.Auth && (<div></div>)}
      {authorizationStatus === AuthorizationStatus.Auth && (
        <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitClick}>
          <label className="reviews__label form__label" htmlFor="review">
    Your review
          </label>
          <div className="reviews__rating-form form__rating"
            onChange={handleRatingChange}
          >
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={5}
              id="5-stars"
              type="radio"
            />
            <label
              htmlFor="5-stars"
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={4}
              id="4-stars"
              type="radio"
            />
            <label
              htmlFor="4-stars"
              className="reviews__rating-label form__rating-label"
              title="good"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={3}
              id="3-stars"
              type="radio"
            />
            <label
              htmlFor="3-stars"
              className="reviews__rating-label form__rating-label"
              title="not bad"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={2}
              id="2-stars"
              type="radio"
            />
            <label
              htmlFor="2-stars"
              className="reviews__rating-label form__rating-label"
              title="badly"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={1}
              id="1-star"
              type="radio"
            />
            <label
              htmlFor="1-star"
              className="reviews__rating-label form__rating-label"
              title="terribly"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </div>
          <textarea
            className="reviews__textarea form__textarea"
            onChange={handleCommentChange}
            id="comment"
            name="comment"
            value={formData.comment}
            placeholder="Tell how was your stay, what you like and what can be improved"
            minLength={50}
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
              disabled={formData.comment.length < 49}
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
