import { PropTypes } from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ user, token, movie }) => {
  function addToFav(movieTitle) {
    console.log('movieTitle', movieTitle)
    fetch(`https://movie-api-zy6n.onrender.com/users/${user.username}/movies/${movieTitle}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log('response', response)
      if (response.ok) {
        alert("Added to favorites");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  }

  function removeFromFav(movieTitle) {
    console.log('movieTitle', movieTitle)
    fetch(`https://movie-api-zy6n.onrender.com/users/${user.username}/movies/${movieTitle}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log('response', response)
      if (response.ok) {
        alert("Removed from favorites");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  }

  return (
    <Card className="h-100">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Card.Img variant="top" src={movie.image} />
      </Link>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button onClick={() => addToFav(movie.title)}>+</Button>
        <Button variant="danger" onClick={() => removeFromFav(movie.title)}>X</Button>
      </Card.Body>
    </Card >
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
  }).isRequired
};