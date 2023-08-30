import { ChangeEvent } from 'react';

type ReviewFormRatingProp = {
  handleRatingChange:(evt: ChangeEvent<HTMLInputElement>) => void;
  reviewDataRating: number;
}

function ReviewFormRating ({handleRatingChange,reviewDataRating}:ReviewFormRatingProp):JSX.Element{
  return (
    <div className="reviews__rating-form form__rating">
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={5}
        id="5-stars"
        type="radio"
        checked={reviewDataRating === 5}
        onChange={(evt) => handleRatingChange(evt)}
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
        checked={reviewDataRating === 4}
        onChange={handleRatingChange}

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
        checked={reviewDataRating === 3}
        onChange={handleRatingChange}

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
        checked={reviewDataRating === 2}
        onChange={handleRatingChange}

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
        checked={reviewDataRating === 1}
        onChange={handleRatingChange}
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
  );
}

export default ReviewFormRating;
