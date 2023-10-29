import './App.css';
import { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import Output from './components/Output/Output';

export const localStorageKey = 'searchValue-kotokatu';

class App extends Component {
  state = {
    searchValue: localStorage.getItem(localStorageKey) || '',
    apiData: [],
    isLoading: false,
  };

  setValue = (value: string) => {
    this.setState({ searchValue: value });
  };

  getSearchResults = async () => {
    this.setState({ isLoading: true });
    const res = await fetch(
      `https://swapi.dev/api/people/?search=${this.state.searchValue}`
    );
    const data = await res.json();
    this.setState({ apiData: data.results, isLoading: false });
  };

  throwError = () => {
    this.setState({ apiData: 'test' });
  };

  componentDidMount = () => {
    this.getSearchResults();
  };
  render() {
    return (
      <div className="container">
        <h1>Search Star Wars characters by name</h1>
        <SearchForm
          value={this.state.searchValue}
          setValue={this.setValue}
          searchItems={this.getSearchResults}
          isLoading={this.state.isLoading}
        />
        {this.state.isLoading ? (
          <div className="loader" />
        ) : (
          <Output data={this.state.apiData} />
        )}
        <button onClick={this.throwError} disabled={this.state.isLoading}>
          Error
        </button>
      </div>
    );
  }
}

export default App;
