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

  updateElements(elements: Person[]) {
    this.setState({ elements, isLoading: false });
  }

  render() {
    return (
      <>
        <ErrorBoundary>
          <ErrorButton />
          <Search updateElements={this.updateElements.bind(this)} />
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
