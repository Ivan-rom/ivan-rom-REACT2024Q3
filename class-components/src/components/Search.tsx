import React from 'react';

interface SearchProps {
  searchTerm: string;
  updateSearch: (text: string) => void;
}

interface SearchState {
  text: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  state = {
    text: this.props.searchTerm,
  };

  componentDidMount() {
    const searchTerm = localStorage.getItem('search-term');
    if (searchTerm) this.setState({ text: searchTerm });
  }

  submitHandler(e: React.FormEvent) {
    e.preventDefault();
    this.props.updateSearch(this.state.text.trim());
  }

  render() {
    return (
      <form onSubmit={this.submitHandler.bind(this)}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={this.state.text}
          onChange={({ target }) => this.setState({ text: target.value })}
        />
        <button>Search</button>
      </form>
    );
  }
}

export default Search;
