import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Data = {
  name: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
  birth_year: string;
};

function Details() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://swapi.dev/api/people/${searchParams.get('details')}
        `
      );
      const data = await res.json();
      setData(data);
    };
    if (searchParams.get('details') !== null) fetchData();
  }, [searchParams]);

  return data ? (
    <ul>
      <li>Birth year: {data.birth_year}</li>
      <li>Gender: {data.gender}</li>
      <li>Height: {data.height}</li>
      <li>Eye color: {data.eye_color}</li>
      <li>Hair color: {data.hair_color}</li>
    </ul>
  ) : null;
}

export default Details;
