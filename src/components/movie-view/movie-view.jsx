import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

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
    </div>
  );
};
