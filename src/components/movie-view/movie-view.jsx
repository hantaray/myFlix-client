import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ user, token, movies, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  const similarMovies = () =>
    movies.filter(m => m.genres[0].name === movie.genres[0].name
      && m.id !== movieId);

  return (
    <div>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
      <Link to={`/`}>
        <img className="w-100" src={movie.image} />
      </Link>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genres[0].name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <hr />
      <h2>Similar Movies</h2>
      <div className='row-posters'>
        {similarMovies(movie.genres[0].name).map((movie) => (
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              window.location.reload();
            }}
            id='link-style'
            to={`/movies/${movie._id}`}
          >
            <MovieCard
              user={user}
              token={token}
              movie={movie}
              updateUser={updateUser}
            />
          </Link>
        ))}
      </div>
    </div >
  );
};
