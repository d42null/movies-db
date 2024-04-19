import { Suspense, lazy, useCallback, useContext,  useState } from "react";
// import { fetchNextPage, resetMovies } from "../../reducers/movies";
// import { useAppDispatch, useAppSelector } from "../../hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
// import { Filters } from "./MoviesFilter";
import MovieCard from "./MovieCard";
import { MovieDetails, MoviesFilters, MoviesQuery, useGetConfigurationQuery, useGetMoviesQuery } from "../../services/tmdb";
const initialQuery:MoviesQuery = {
  page: 1,
  filters: {},
};
const MoviesFilter=lazy(()=>import("./MoviesFilter"))
export default function Movies() {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);
  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);
  // const dispatch = useAppDispatch();
  // const movies = useAppSelector((state) => state.movies.top);
  const movies = data?.results ?? []
  // const loading = useAppSelector((state) => state.movies.loading);
  // const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);
  const hasMorePages = data?.hasMorePages;
  function formatImageUrl(imagePath?: string | null) {
    return imagePath && configuration ? `${configuration.images.base_url}w780${imagePath}` : undefined;
  }
  // const [filters, setFilters] = useState<any>();

  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== anonymousUser;
  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);
  const [targetRef] = useIntersectionObserver({onIntersect});

  // useEffect(() => {
  //   dispatch(resetMovies());
  // }, [dispatch]);
 
  // useEffect(() => {
  //   if (entry?.isIntersecting && hasMorePages) {
  //     const moviesFilters = filters
  //       ? {
  //           keywords: filters?.keywords.map((k:any) => k.id),
  //           genres: filters?.genres,
  //         }
  //       : undefined;

  //     dispatch(fetchNextPage(moviesFilters));
  //   }
  // }, [dispatch, entry?.isIntersecting, filters, hasMorePages]);
const handleAddToFavorite=useCallback(
  (id: number): void => alert(`Not implemented! Action: ${auth.user.name} is adding movie ${id} to favorites.`),
  [auth.user.name]
);
  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
      <Grid item xs="auto">
        <Suspense fallback={<span>Loading filters...</span>}>
        <MoviesFilter
          onApply={(filters) => {
            // dispatch(resetMovies());
            // setFilters(filters);
            const moviesFilters:MoviesFilters={
              keywords:filters.keywords.map(k=>k.id),
              genres:filters.genres,
            }
            setQuery({
              page:1,filters:moviesFilters
            })
          }}
        />
        </Suspense>
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!isFetching && !movies.length && <Typography variant="h6">No movies were found that match your query.</Typography>}
          <Grid container spacing={4}>
            {movies.map((m:MovieDetails, i:number) => (
              <Grid item key={`${m.id}-${i}`} xs={12} sm={6} md={4}>
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  overview={m.overview}
                  popularity={m.popularity}
                  image={formatImageUrl(m.backdrop_path)}
                  enableUserActions={loggedIn}
                  onAddFavorite={handleAddToFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>{isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}</div>
        </Container>
      </Grid>
    </Grid>
  );
}

// Component.displayName="Movies"