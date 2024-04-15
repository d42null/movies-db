import { connect } from "react-redux";
import { Movie } from "../../reducers/movies";
import { RootState } from "../../store";
import { MovieCard } from "./MovieCard";
import styles from "./Movies.module.scss";
import { useEffect, useState } from "react";
import { MovieDetails, client } from "../../api/tmdb";

export function MoviesFetch() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  useEffect(() => {
    async function loadData() {
      const config = await client.getConfiguration();
      const imageUrl = config.images.base_url;
      const results = await client.getNowPlaying();
      const mappedResults: Movie[] = results.map((m) => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        popularity: m.popularity,
        image: m.backdrop_path?`${imageUrl}w780${m.backdrop_path}`:undefined,
      }));
      setMovies(mappedResults);
    }
    loadData();
  }, []);
  return <Movies movies={movies} />;
}
interface MoviesProps {
  movies: Movie[];
}
function Movies({ movies }: MoviesProps) {
  return (
    <section>
      <div className={styles.list}>
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            id={m.id}
            title={m.title}
            overview={m.overview}
            popularity={m.popularity}
            image={m.image}
          />
        ))}
      </div>
    </section>
  );
}
const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
});
const connector = connect(mapStateToProps);
export default connector(Movies);
