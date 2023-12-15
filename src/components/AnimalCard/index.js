import React from 'react';
import RatingForm from '../RatingForm';
import './index.css';

const AnimalCard = ({ animal, toggleLiking, handleRatingSubmit }) => {
  if (!animal) {
    return <p>Select an animal from the list to view details</p>;
  }

  return (
    <div className='animal-card'>
      <button onClick={() => toggleLiking(animal)} className='like-button'>
        {animal.liked ? 'Liked' : 'Click to like this animal'}
      </button>
      <h2>{animal.name}</h2>
      <p>{animal.locations[0]}</p>
      <RatingForm key={animal.name} animal={animal} handleRatingSubmit={handleRatingSubmit} />
    </div>
  );
};

export default AnimalCard;
