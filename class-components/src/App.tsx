import React from 'react';
import Search from './components/Search';
import { Person } from './helpers/interfaces';
import List from './components/List';

const URL = 'https://swapi.dev/api/people/';

interface AppProps {}

interface AppState {
  elements: Person[];
  searchTerm: string;
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    elements: [],
    searchTerm: '',
  };

  updateSearchTerm(searchTerm: string) {
    this.setState((prevState) => {
      return { ...prevState, searchTerm };
    });
    localStorage.setItem('search-term', searchTerm);

    this.getPeople(searchTerm);
  }

  getPeople(search: string = '') {
    fetch(search ? `${URL}/?search=${search}` : URL)
      .then((res) => res.json())
      .then((res) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            elements: res.results,
          };
        }),
      );
  }

  componentDidMount(): void {
    const searchTerm = localStorage.getItem('search-term');
    if (searchTerm) this.setState({ searchTerm, elements: [] });

    this.getPeople(searchTerm || '');
  }

  render() {
    return (
      <>
        <Search
          searchTerm={this.state.searchTerm}
          updateSearch={this.updateSearchTerm.bind(this)}
        />
        <List elements={this.state.elements} />
      </>
    );
  }
}

export default App;
