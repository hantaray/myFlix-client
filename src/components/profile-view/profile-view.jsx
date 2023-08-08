import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, favoriteMovies, updateUser }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(() => {
    const bday = new Date(user.birthday).toLocaleDateString();
    return bday;
  })

  const updateUserWithChangedData = (updatedUsername) => {
    if (!token) return;

    fetch(`https://movie-api-zy6n.onrender.com/users/${updatedUsername}`, {

      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((user) => {
        updateUser(user)
      });
  }

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
        updateUserWithChangedData(username);
        setBirthday(new Date(birthday).toLocaleDateString());
        alert("Update successful");
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
        updateUser(null);
        localStorage.clear();
        alert("Successful unregistered");
        window.location.replace('/login');
      } else {
        alert("Update failed");
      }
    });
  };

  // set birthday to string if null
  if (birthday == null) {
    setBirthday("");
  }

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
            <MovieCard user={user} token={token} movie={movie} updateUser={updateUser} />
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