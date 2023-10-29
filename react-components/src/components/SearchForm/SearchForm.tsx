import { ChangeEvent, FormEvent, Component } from 'react';
import { localStorageKey } from '../../App';

type SearchFormProps = {
  value: string;
  setValue: (value: string) => void;
  searchItems: () => void;
  isLoading: boolean;
};

class SearchForm extends Component<SearchFormProps> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.setValue(e.target.value.trim());
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.searchItems();
    localStorage.setItem(localStorageKey, this.props.value);
  };
  render() {
    return (
      <form className="form-search" onSubmit={this.handleSubmit}>
        <input
          className="input-search"
          type="text"
          value={this.props.value}
          onChange={this.handleChange}
          disabled={this.props.isLoading}
        />
        <button type="submit" disabled={this.props.isLoading}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
