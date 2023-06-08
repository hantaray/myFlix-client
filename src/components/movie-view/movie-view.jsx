export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <button onClick={onBackClick}>Back</button>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
    </div>
  );
};
