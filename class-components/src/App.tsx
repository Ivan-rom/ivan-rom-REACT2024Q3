import { FunctionComponent, useState } from 'react';
import Search from './components/Search';
import { Person } from './helpers/interfaces';
import List from './components/List';
import Loader from './components/Loader';
import ErrorButton from './components/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary';

const App: FunctionComponent = () => {
  const [elements, setElements] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <ErrorBoundary>
        <ErrorButton />
        <Search
          updateElements={(elements: Person[]) => setElements(elements)}
          updateLoader={(isLoading: boolean) => setIsLoading(isLoading)}
        />
        {isLoading ? <Loader /> : <List elements={elements} />}
      </ErrorBoundary>
    </>
  );
};

export default App;
