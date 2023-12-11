import axios from "axios";

export const fetchCatByBreed = (breed_id) => {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breed_id}`
  );
};
export const fetchBreeds = () => {
  return axios.get("/breeds").then((response) => {
    return response.data;
  });
};
