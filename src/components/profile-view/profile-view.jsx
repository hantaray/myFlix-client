import { useEffect, useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  // const [user, setUser] = useState({});
  // const [favoriteMovies, setFavoriteMovies] = useState([]);

  var favoriteMovies = movies.filter(m => user.favoriteMovies.includes(m.id));
  console.log('favoriteMovies', favoriteMovies)

  // setFavoriteMovies(movies.filter(m => user.favoriteMovies.includes(m.id)));

  useEffect(() => {
    if (!token) return;

    fetch(`https://movie-api-zy6n.onrender.com/users/${user.username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((user) => {
        console.log('userfavs', user.favoriteMovies)
        // setUser(user);
        setUsername(user.username);
        setPassword(user.password);
        setEmail(user.email);
        setBirthday(user.birthday);
        // setFavoriteMovies(movies.filter(m => user.favoriteMovies.includes(m.id)));
      });
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://movie-api-zy6n.onrender.com/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Update successful");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  };

  const unregister = (event) => {
    event.preventDefault();

    fetch(`https://movie-api-zy6n.onrender.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Successful unregistered");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  };

  // console.log(username)
  // console.log(password)
  // console.log(email)
  // console.log(birthday)

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="text"
            value={birthday}
            placeholder={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <>
        {favoriteMovies.map((movie) => (
          <Col className="mb-4" key={movie.id} md={3}>
            <MovieCard user={user} token={token} movie={movie} />
          </Col>
        ))}
      </>

      <Form onSubmit={unregister}>
        <Button variant="danger" type="submit">
          Unregister
        </Button>
      </Form>

    </>
  );
};