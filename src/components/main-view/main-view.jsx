import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { MoviesList } from "../movies-list/movies-list";
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';

import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setFavMovies } from "../../redux/reducers/movies";

export const MainView = () => {
  const user = useSelector((state) => state.user.user) || JSON.parse(localStorage.getItem("user"));
  const token = useSelector((state) => state.user.token) || localStorage.getItem("token");
  const movies = useSelector((state) => state.movies.list);
  const favoriteMovies = useSelector((state) => state.movies.favList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    fetch('https://movie-api-zy6n.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
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
            image: movie.imageURL,
          };
        });

        dispatch(setMovies(moviesFromApi));
        dispatch(setFavMovies(moviesFromApi.filter(m => user.favoriteMovies.includes(m.id))));
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/signup'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/movies/:movieId'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>{!user ? <Navigate to="/login" replace /> : <MoviesList movies={movies} />}</>
            }
          />
          <Route
            path='/users'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <>
                    <ProfileView favoriteMovies={favoriteMovies} />
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};