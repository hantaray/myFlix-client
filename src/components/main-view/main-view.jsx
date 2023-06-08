import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Silence of the Lambs",
      description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      genre: {
        name: "Thriller",
        description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
      },
      director: {
        name: "Jonathan Demme",
        bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
        birth: "1944",
        death: "2017"
      },
      image: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
      featured: false,
      genres: []
    },
    {
      director: {
        name: "Park Chan-wook",
        bio: "...",
        yearBirth: 1963,
        yearDeath: null
      },
      id: 2,
      title: "Oldboy",
      description: "...",
      genres: [
        {
          id: "6481fc12a32c9659f05f50cb",
          name: "thriller",
          description: "Films that evoke excitement and suspense in the audience. The suspense element found in most films' plots is particularly exploited by the filmmaker in this genre. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible."
        }
      ],
      image: "https://upload.wikimedia.org/wikipedia/en/6/67/Oldboykoreanposter.jpg",
      Description: "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days.",
      featured: false
    },
    {
      director: {
        name: "Martin Scorsese",
        bio: "An American film director, producer, screenwriter and actor. Scorsese emerged as one of the major figures of the New Hollywood era.",
        yearBirth: 1942,
        yearDeath: null
      },
      id: 3,
      title: "Taxi Driver",
      description: "...",
      genres: [
        {
          id: "6481fc12a32c9659f05f50cc",
          name: "thriller",
          description: "Films that evoke excitement and suspense in the audience. The suspense element found in most films' plots is particularly exploited by the filmmaker in this genre. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible."
        }
      ],
      image: "https://upload.wikimedia.org/wikipedia/en/3/33/Taxi_Driver_%281976_film_poster%29.jpg",
      featured: false
    },
    {
      director: {
        name: "Luc Besson",
        bio: "...",
        yearBirth: 1959,
        yearDeath: null
      },
      id: 4,
      title: "Léon: The Professional",
      description: "...",
      genres: [
        {
          id: "6481fc12a32c9659f05f50cd",
          name: "action",
          description: "Associated with particular types of spectacle (e.g., explosions, chases, combat)"
        }
      ],
      image: "https://upload.wikimedia.org/wikipedia/en/0/03/Leon-poster.jpg",
      featured: false
    },
    {
      director: {
        name: "Edward Zwick",
        bio: "...",
        yearBirth: 1952,
        yearDeath: null
      },
      id: 5,
      title: "The Last Samurai",
      description: "...",
      genres: [
        {
          "_id": "6481fc12a32c9659f05f50ce",
          "name": "historical",
          "description": "Films that either provide more-or-less accurate representations of historical accounts or depict fictional narratives placed inside an accurate depiction of a historical setting."
        }
      ],
      image: "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Last_Samurai.jpg",
      featured: false
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
