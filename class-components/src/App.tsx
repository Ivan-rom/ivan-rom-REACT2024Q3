import React from 'react';
import Search from './components/Search';
import { Person } from './helpers/interfaces';
import List from './components/List';
import Loader from './components/Loader';
import ErrorButton from './components/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary';

const URL = 'https://swapi.dev/api/people/';

interface AppProps {}

interface AppState {
  elements: Person[];
  searchTerm: string;
  isLoading: boolean;
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    elements: [],
    searchTerm: '',
    isLoading: false,
  };

  updateSearchTerm(searchTerm: string) {
    this.setState((prevState) => {
      return { ...prevState, searchTerm };
    });
    localStorage.setItem('search-term', searchTerm);

    this.getPeople(searchTerm);
  }

  getPeople(search: string = '') {
    this.setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });

    fetch(search ? `${URL}/?search=${search}` : URL)
      .then((res) => res.json())
      .then((res) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            elements: res.results,
            isLoading: false,
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
        <ErrorBoundary>
          <ErrorButton />
          <Search
            searchTerm={this.state.searchTerm}
            updateSearch={this.updateSearchTerm.bind(this)}
          />
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <List elements={this.state.elements} />
          )}
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
