import { Action, Reducer } from "redux";

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
}
interface MovieState {
  top: Movie[];
}
const initialState: MovieState = {
  top: [
    { id: 0, title: "Inception", popularity: 98, overview: "Dreams..." },
    {
      id: 1,
      title: "The Shawshank Redemption",
      popularity: 98,
      overview: "Redemption...",
    },
    { id: 2, title: "The Godfather", popularity: 97, overview: "Godfather..." },
    {
      id: 3,
      title: "The Dark Knight",
      popularity: 96.5,
      overview: "Batman...",
    },
    {
      id: 4,
      title: "The Godfather Part II",
      popularity: 96,
      overview: "Part II...",
    },
    { id: 5, title: "Angry Men", popularity: 94, overview: "Men..." },
  ],
};
const moviesReducer: Reducer<MovieState, Action> = (state, action) => {
  return initialState;
};
export default moviesReducer;
