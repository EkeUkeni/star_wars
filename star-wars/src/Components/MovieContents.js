import { useState, useEffect } from "react";
import {
  getCharacters,
  getPlanets,
  getSpecies,
  getStarships,
  getVehicles,
} from "../Pages/MovieDetails";
import { Link, useParams } from "react-router-dom";
import starWarsLogo from '../star.PNG'

const MovieContents = () => {
  const { episode_id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/${episode_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Status is ${response.status}`);
        }
        return response.json();
      })
      .then((rawData) => {
        console.log(rawData);
        console.log(typeof rawData);

        const {
          episode_id,
          title,
          director,
          producer,
          opening_crawl,
          characters,
          planets,
          species,
          starships,
          vehicles,
        } = rawData;
        return Promise.all([
          getCharacters(characters),
          getPlanets(planets),
          getSpecies(species),
          getStarships(starships),
          getVehicles(vehicles),
        ]).then(
          ([
            characterNames,
            planetNames,
            specieNames,
            starshipNames,
            vehicleNames,
          ]) => ({
            title,
            episode_id,
            director,
            producer,
            opening_crawl,
            characterNames,
            planetNames,
            specieNames,
            starshipNames,
            vehicleNames,
          })
        );
      })
      .then((movieData) => {
        setError(null);
        setData([movieData]);
        console.log(movieData);
      })
      .catch((error) => {
        setData([]);
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [episode_id]);

  return (
    <>
      <div style={{background:"black", color:"white"}}>
        <img className='logo' src={starWarsLogo} alt='logo'/>
        {loading && <div>Data is loading. Please wait...</div>}
        {error && (
          <div>{`There is a problem fetching your data - ${error}`}</div>
        )}
        {console.log(data)}
        {data &&
          data.map((movieDetail) => {
            return (
              <div className="MovieContainer" key={movieDetail.episode_id}>
                <Link style={{color:"rgb(151, 149, 149)"}} to="/">Back to list</Link>
                <div className="titleRapper">
                    <h2>{movieDetail.title}</h2>
                    <p>Director: {movieDetail.director}</p>
                    <p>Producer: {movieDetail.producer}</p>
                </div>
                <p className="Description">Description </p>
                {movieDetail.opening_crawl}
                <p className="subHeading">Characters</p>
                <ul className="details">
                  {movieDetail.characterNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <p className="subHeading">Planets </p>
                <ul className="details">
                  {movieDetail.planetNames.map((name) => (
                    <li key={name}> {name}</li>
                  ))}
                </ul>
                <p className="subHeading">Species </p>
                <ul className="details">
                  {movieDetail.specieNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <p className="subHeading">Starships</p>
                <ul className="details">
                  {movieDetail.starshipNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <p className="subHeading">Vehicles </p>
                <ul className="details">
                  {movieDetail.vehicleNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MovieContents;