import React from 'react';
import Search from './components/Search';
import { Person } from './helpers/interfaces';
import List from './components/List';
import Loader from './components/Loader';
import ErrorButton from './components/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary';

interface AppProps {}

interface AppState {
  elements: Person[];
  isLoading: boolean;
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    elements: [],
    isLoading: true,
  };

  render() {
    return (
      <>
        <ErrorBoundary>
          <ErrorButton />
          <Search
            updateLoader={(isLoading) => this.setState({ isLoading })}
            updateElements={(elements: Person[]) => this.setState({ elements })}
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
