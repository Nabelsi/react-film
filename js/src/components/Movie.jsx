import { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";

export default function Movie() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  // Mit useEffect die Daten für den spezifischen Film laden und am Ende
  // in movie speichern.

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://omdbapi.com/?apikey=3df3b4a8&i=${id}`
        );

        if (!response.ok) {
          throw new Error("Problem beim Laden");
        }

        const movieData = await response.json();

        setMovie(movieData);
      } catch (error) {
        console.log(error);
        setError(`Es gab leider ein Problem: ${error.message}`);
      }
    }

    fetchMovie();
  }, [id]);

  if (error) {
    return <strong>{error}</strong>;
  }

  if (!movie) {
    return <LoadingSpinner />;
  }

  const { Title, Plot, Poster, Year, Runtime, Ratings } = movie;

  return (
    <article className="movie">
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <h2 className="movie__title">{Title}</h2>

      {Poster && (
        <img
          src={Poster}
          alt={`Filmplakat ${Title}`}
          className="movie__poster"
        />
      )}
      {Plot && <p className="movie__plot">{Plot}</p>}
      <h3>Details</h3>
      <dl className="movie__details">
        {Year && (
          <>
            <dt>Jahr</dt>
            <dd>{Year}</dd>
          </>
        )}
        {Runtime && (
          <>
            <dt>Dauer</dt>
            <dd>{Runtime}</dd>
          </>
        )}
      </dl>
      {Ratings.length && (
        <>
          <h3>Bewertungen</h3>
          <dl className="movie__ratings">
            {Ratings.map(({ Source, Value }) => (
              <Fragment key={Source}>
                <dt>{Source}</dt>
                <dd>{Value}</dd>
              </Fragment>
            ))}
          </dl>
        </>
      )}
    </article>
  );
}

/* 

<article class="movie">
  <h2 class="movie__title">Titel</h2>
  <!-- Bild nur anzeigen, wenn vorhanden -->
  <img src="" alt="" class="movie__poster" />
  <!-- Plot anzeigen, wenn vorhanden -->
  <p class="movie__plot">Plot</p>
  <h3>Details</h3>
  <dl class="movie__details">
    <!-- Auch Jahr und Dauer prüfen, ob sie vorhanden sind -->
    <dt>Jahr</dt>
    <dd>2000</dd>
    <dt>Dauer</dt>
    <dd>200 Minuten</dd>
  </dl>

  <!-- Bonus: Die Ratings ausgeben. Ihr könnt wieder eine dl-Liste verwenden. -->
  <dl class="movie__ratings">
    <div>
      <dt>Rotten Tomatoes</dt>
      <dd>90%</dd>
    </div>
  </dl>
</article>


*/

// https://www.mediaevent.de/xhtml/dl.html
// http://html5doctor.com/the-dl-element/
