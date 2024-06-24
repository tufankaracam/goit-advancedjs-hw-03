import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_zMYkDcT7E7ClDYCk8RDsL3nBAN5CE0mtMOCsNxluIO1nv4QwJxLKfqnnu6Jw1Xkp';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export const fetchCatByBreed = async breedId => {
  try {
    const result = await axios.get(`images/search?breed_ids=${breedId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBreeds = async () => {
  try {
    const result = await axios.get('/breeds');
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
