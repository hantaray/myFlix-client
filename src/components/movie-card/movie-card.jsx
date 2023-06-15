import { PropTypes } from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

// Here all the props constraints for the MovieCard are defined
MovieCard.propTypes = {
  // must include a movie object (means that it’s an object)
  movie: PropTypes.shape({
    // movie prop (object) may contain a title/description/genres etc. key;
    // if it does, then it must be of type string
    // here it is required
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string
    }),
    image: PropTypes.string.isRequired,
  }).isRequired,
  // must contain onMovieClick and it must be a function
  onMovieClick: PropTypes.func.isRequired
};