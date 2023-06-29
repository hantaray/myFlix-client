import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-api-zy6n.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <Col md={5}>
            Login:
            <LoginView onLoggedIn={(user) => setUser(user)} />
            Register:
            <SignupView />
          </Col>
        </>
      ) : selectedMovie ? (
        <>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          {/* todo: */}
          {/* let similarMovies = movies.filter(movie => movie.genres[0].name === selectedMovie.genres[0].name
      && movie.title !== selectedMovie.title);
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
          ))} */}
        </>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
          {movies.map((movie) => (
            <Col className="mb-3" key={movie.id} md={3}>
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
