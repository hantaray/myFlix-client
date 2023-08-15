import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MoviesFilter } from "../movies-filter/movies-filter.jsx";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = (movies) => {
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const filteredMovies = movies.movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter)
  );
  return (
    <>
      <Row>
        <MoviesFilter />
      </Row>
      <Row>
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
