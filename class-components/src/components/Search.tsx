import React from 'react';
import { Person } from '../helpers/interfaces';

const URL = 'https://swapi.dev/api/people/';

interface SearchProps {
  updateElements: (elements: Person[]) => void;
  updateLoader: (isLoading: boolean) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const searchTerm = localStorage.getItem('search-term');
    this.state = {
      searchTerm: searchTerm || '',
    };
  }

  componentDidMount(): void {
    this.makeRequest(this.state.searchTerm);
  }

  makeRequest(search = '') {
    this.props.updateLoader(true);
    fetch(search ? `${URL}/?search=${search}` : URL)
      .then((res) => res.json())
      .then((res) => {
        this.props.updateElements(res.results);
        this.props.updateLoader(false);
      });
  }

  submitHandler(e: React.FormEvent) {
    e.preventDefault();
    const search = this.state.searchTerm.trim();
    localStorage.setItem('search-term', search);
    this.makeRequest(search);
  }

  render() {
    return (
      <form onSubmit={this.submitHandler.bind(this)}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={({ target }) => this.setState({ searchTerm: target.value })}
        />
        <button>Search</button>
      </form>
    );
  }
}

export default Search;
