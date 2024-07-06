import React from 'react';
import Search from './components/Search';
import { Person } from './helpers/interfaces';
import List from './components/List';

const URL = 'https://swapi.dev/api/people/';

interface AppProps {}

interface AppState {
  elements: Person[];
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    elements: [],
  };

  getPeople() {
    fetch(URL)
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
    this.getPeople();
  }

  render() {
    return (
      <>
        <Search />
        <List elements={this.state.elements} />
      </>
    );
  }
}

export default App;
