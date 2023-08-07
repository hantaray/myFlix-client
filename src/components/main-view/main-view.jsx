import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

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

        setMovies(moviesFromApi);
        setFavoriteMovies(movies.filter(m => user.favoriteMovies.includes(m.id)));
      });
  }, [token]);

  // update the user state and local storage
  const updateUser = (user) => {
    setUser(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setFavoriteMovies(movies.filter(m => user.favoriteMovies.includes(m.id)));
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.clear();
        }}
      />
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
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
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
                    <MovieView user={user} token={token} movies={movies} updateUser={updateUser} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className='mb-4' key={movie.id} md={3}>
                        <MovieCard
                          user={user}
                          token={token}
                          movie={movie}
                          updateUser={updateUser}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
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
                    <ProfileView
                      user={user}
                      token={token}
                      favoriteMovies={favoriteMovies}
                      updateUser={updateUser}
                    />
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