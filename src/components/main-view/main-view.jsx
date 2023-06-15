import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-api-zy6n.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            genres: movie.genres,
            director: movie.director,
            image: movie.imageURL
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    let similarMovies = movies.filter(movie => movie.genres[0].name === selectedMovie.genres[0].name
      && movie.title !== selectedMovie.title);

    return (
      <>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
