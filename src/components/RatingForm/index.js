import React, { useState } from 'react';
import './index.css';

const RatingForm = ({ animal, handleRatingSubmit }) => {
  const [rating, setRating] = useState(animal.rating || 0);
  const [preferences, setPreferences] = useState(animal.preferences || {});

  const handleRatingChange = (event) => {
    setRating(event.target.value);
    handleRatingSubmit({ animal, rating: event.target.value, preferences });
  };

  const handleAttributeChange = (attribute) => {
    setPreferences((prevPreferences) => {
      const newSetOfPreferences = {
        ...prevPreferences,
        [attribute]: !prevPreferences[attribute],
      };
      handleRatingSubmit({ animal, rating, preferences: newSetOfPreferences });
      return newSetOfPreferences;
    });
  };

  return (
    <div className='rating-form'>
      <div className='rating-value'>
        <p>
          <b>Rate this {animal.name}:</b>
        </p>
        <input type='range' min='0' max='10' value={rating} onChange={handleRatingChange} />
        <div>{rating}</div>
      </div>

      <div>Preferences:</div>
      <div className='preferences-container'>
        {Object.entries(animal.characteristics).map(([characKey, characValue]) => {
          return (
            <div key={`${characKey}-${characValue}`} className='preference-label'>
              <p className='preference-key'>{characKey}</p>
              <p className='preference-value'>{characValue}</p>
              <input
                type='checkbox'
                checked={preferences[`${characKey}-${characValue}`] || false}
                onChange={() => handleAttributeChange(`${characKey}-${characValue}`)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingForm;
