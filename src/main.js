import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SlimSelect from 'slim-select';
import { fetchCatByBreed, fetchBreeds } from './cat';

const breedSelect = document.querySelector('.breedSelect');
const content = document.querySelector('.content');
const name = document.querySelector('.name');
const description = document.querySelector('.description');
const temperaments = document.querySelector('.temperaments');
const image = document.querySelector('.image');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const start = async () => {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  content.style.display = 'none';
  error.style.display = 'none';

  try {
    const breeds = await fetchBreeds();

    breedSelect.innerHTML = `<option data-placeholder="true">Select a cat</option>`+breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');

    loader.style.display = 'none';
    breedSelect.style.display = 'block';
    new SlimSelect({
      select: '.breedSelect',
      placeholder: 'Select a Cat',
    });
  } catch (e) {
    iziToast.error({
      title: 'Error',
      message: 'Opps! Something went wrong! Try reloading the page!',
    });
    loader.style.display = 'none';
    error.style.display = 'block';
  }
};

document.addEventListener('DOMContentLoaded', start);

breedSelect.addEventListener('change', async event => {
  loader.style.display = 'block';
  error.style.display = 'none';
  content.style.display = 'none';

  try {
    const breedId = event.target.value;
    const data = await fetchCatByBreed(breedId);

    name.textContent = data[0].breeds[0].name;
    description.textContent = data[0].breeds[0].description;
    temperaments.innerHTML = `<b>Temperaments:</b> ${data[0].breeds[0].temperament}`;
    image.src = data[0].url;
    image.alt = data[0].breeds[0].name;

    loader.style.display = 'none';
    content.style.display = 'flex';
  } catch (e) {
    iziToast.error({
      title: 'Error',
      message: 'Opps! Something went wrong! Try reloading the page!',
    });
    loader.style.display = 'none';
    error.style.display = 'block';
  }
});
