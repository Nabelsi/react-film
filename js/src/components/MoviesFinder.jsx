import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useDebouncedValue } from "../hooks/useDebouncedValue";
import defaultMovies from "../defaultMovies";
import FilterForm from "./FilterForm";
import MovieTeasers from "./MovieTeasers";
import Movie from "./Movie";

export default function MoviesFinder() {
  const [movies, setMovies] = useState(defaultMovies);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);

  useMovieSearch(debouncedSearchTerm, setMovies);

  return (
    <div className="movies-finder">
      <Router>
        <header>
          <Link to="/">Start</Link>
          <Link to="/kontakt">Kontakt</Link>
        </header>
        <Switch>
          <Route exact path="/">
            <Helmet>
              <title>React Filmdatenbank</title>
            </Helmet>
            <FilterForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <MovieTeasers movies={movies} />
          </Route>
          <Route path="/kontakt">
            <Helmet>
              <title>Kontakt</title>
            </Helmet>
            <h2>Kontakt</h2>
          </Route>
          <Route path="/movie/:id">
            <Movie />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

/* 
1. Erschafft einen neuen state searchTerm und verknüpft ihn mit dem Eingabefeld
als kontrollierten Input.
2. Nutzt useDebouncedValue um den Wert debouncedSearchTerm zu erhalten.
3. Nutzt useEffect, um aus der Datenbank die zum Suchbegriff passenden Ergebnisse
zu laden. Achtet dabei darauf, dass mindestens 2 Buchstaben eingegeben wurden, bevor
die Anfrage gemacht wird. Wenn weniger Buchstaben eingegeben sind, sollen wieder
die defaultMovies angezeigt werden.
Basis-URL:
https://omdbapi.com/?apikey=3df3b4a8&s=Suchbegriff
*/

function useMovieSearch(debouncedSearchTerm, setMovies) {
  useEffect(() => {
    if (debouncedSearchTerm.length < 2) {
      setMovies(defaultMovies);
      return;
    }

    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://omdbapi.com/?apikey=3df3b4a8&s=${debouncedSearchTerm}`
        );

        if (!response.ok) {
          throw new Error("Fehler beim Laden der Daten.");
        }
        const jsonData = await response.json();

        if (jsonData.Response === "True") {
          setMovies(jsonData.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.log(error);
        // TODO: Hier sollte noch eine Anzeige für die User erscheinen
      }
    }
    fetchMovies();
  }, [debouncedSearchTerm, setMovies]);
}
