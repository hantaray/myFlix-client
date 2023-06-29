import { PropTypes } from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
      </Card.Body>
    </Card>
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