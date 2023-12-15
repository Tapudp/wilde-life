import React, { useEffect, useState } from 'react';
import AnimalCard from '../AnimalCard';
import APIService from '../../services/api';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localstorage';
import constants from '../../constants';
import * as utils from '../../utils/functions';
import './index.css';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // Check if data is in local storage
        const storedData = getFromLocalStorage('animalData');
        if (storedData) {
          setAnimals(storedData);
        } else {
          // If not in local storage, fetch data from the API
          const promises = constants.LIST_OF_ANIMALS.map((animalName) =>
            APIService.GET({ endpoint: `animals?name=${animalName}` }).then((result) =>
              utils.formatData(result)
            )
          );
          const animalData = await Promise.all(promises);
          setAnimals(animalData);
          // Save data to local storage for future use
          saveToLocalStorage('animalData', animalData);
        }
      } catch (error) {
        console.error('Error while fetching data:', error.message, error.name);
        alert(`There was an error while fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
  };

  const handleRatingSubmit = ({ animal, rating, preferences }) => {
    const newAnimalDetails = { ...animal, rating: rating, preferences: preferences };

    setAnimals((prev) => {
      const result = prev.map((item) => {
        if (utils.areNamesMatching(item, animal)) {
          return newAnimalDetails;
        }
        return item;
      });

      // updating the local storage with the same liking result
      saveToLocalStorage('animalData', result);
      return result;
    });

    setSelectedAnimal(newAnimalDetails);
  };

  const isAnimalSelected = (animalDetails) =>
    selectedAnimal !== null && utils.areNamesMatching(selectedAnimal, animalDetails)
      ? 'selected'
      : '';

  const toggleLiking = (animalDetails) => {
    const newAnimalDetails = { ...animalDetails, liked: !animalDetails.liked };

    setAnimals((prev) => {
      const result = prev.map((item) => {
        if (utils.areNamesMatching(item, animalDetails)) {
          return newAnimalDetails;
        }
        return item;
      });
      // updating the local storage with the same liking result
      saveToLocalStorage('animalData', result);
      return result;
    });

    setSelectedAnimal(newAnimalDetails);
  };

  return (
    <div>
      <h1>Wildlife</h1>
      {!isLoading ? (
        <div className='animal-list-container'>
          <div className='left-part'>
            <h2>All Animals</h2>
            <div className='all-animals'>
              {animals.map((animal) => (
                <div
                  className={`animal-element ${isAnimalSelected(animal)}`}
                  key={animal.name}
                  onClick={() => handleAnimalClick(animal)}
                >
                  {animal.name} {animal.liked && '❤️'}
                </div>
              ))}
            </div>
          </div>
          <div className='right-part'>
            <AnimalCard
              key={selectedAnimal && selectedAnimal.name}
              animal={selectedAnimal && { ...selectedAnimal }}
              toggleLiking={toggleLiking}
              handleRatingSubmit={handleRatingSubmit}
            />
          </div>
        </div>
      ) : (
        <div> Loading . . . </div>
      )}
    </div>
  );
};

export default AnimalList;
