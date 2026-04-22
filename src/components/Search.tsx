import React from 'react';
import './Search.css';

type Props = {
  value: string;
  onSearch: (value: string) => void;
};

type State = {
  inputValue: string;
};

class Search extends React.Component<Props, State> {
  state: State = {
    inputValue: this.props.value,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.value !== this.props.value) {
      this.setState({ inputValue: this.props.value });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.inputValue);
  };

  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <button className="search-button" onClick={this.handleSearchClick}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
