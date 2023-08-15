import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setFavMovies } from "../../redux/reducers/movies";

export const MovieCard = ({ movie }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [isFavorite, setIsFavorite] = useState(false);
  const movies = useSelector((state) => state.movies.list);

  const dispatch = useDispatch();

  useEffect(() => {
    // check if a movie is a favorite one
    if (user && user.favoriteMovies && user.favoriteMovies.includes(movie.id)) {
      setIsFavorite(true);
    }
  }, [user, movie.id]);

  function addToFav(movieTitle) {
    fetch(
      `https://movie-api-zy6n.onrender.com/users/${user.username}/movies/${movieTitle}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert('Added to favorites');
        } else {
          alert('Update failed');
        }
        return response.json();
      })
      .then((data) => {
        // set is favorite to true and update the user after adding a favorite movie successfully
        setIsFavorite(true);
        dispatch(setUser(data));
        dispatch(setFavMovies(movies.filter(m => data.favoriteMovies.includes(m.id))));
      });
  }

  function removeFromFav(movieTitle) {
    fetch(
      `https://movie-api-zy6n.onrender.com/users/${user.username}/movies/${movieTitle}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert('Removed from favorites');
        } else {
          alert('Update failed');
        }
        return response.json();
      })
      .then((data) => {
        // set is favorite to false and update the user after removing a favorite movie successfully
        setIsFavorite(false);
        dispatch(setUser(data));
        dispatch(setFavMovies(movies.filter(m => data.favoriteMovies.includes(m.id))));
      });
  }

  return (
    <Card className='h-100'>
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Card.Img variant='top' src={movie.image} />
      </Link>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant='link'>Open</Button>
        </Link>
        {isFavorite ? (
          <Button variant='danger' onClick={() => removeFromFav(movie.title)}>
            X
          </Button>
        ) : (
          <Button onClick={() => addToFav(movie.title)}>+</Button>
        )}
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
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
    }),
    image: PropTypes.string.isRequired,
  }).isRequired,
};