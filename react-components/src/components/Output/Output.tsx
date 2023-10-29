import { Component } from 'react';

type Item = {
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

type OutputProps = {
  data: Item[];
};

class Output extends Component<OutputProps> {
  render() {
    return (
      <ul className="output-list">
        {this.props.data.map((item) => {
          return (
            <li className="output-item" key={item.url}>
              <h3>{item.name}</h3>
              <ul>
                <li>Birth year: {item.birth_year}</li>
                <li>Gender: {item.gender}</li>
                <li>Height: {item.height}</li>
                <li>Eye color: {item.eye_color}</li>
                <li>Hair color: {item.hair_color}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Output;
