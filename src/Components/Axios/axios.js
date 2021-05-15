import axios from "axios";

const movie = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default movie;
