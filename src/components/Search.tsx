import React from 'react';

type Props = {
  value: string;
  onSearch: (value: string) => void;
};

class Search extends React.Component<Props> {
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearch(e.target.value);
  };

  handleSearchClick = () => {
    this.props.onSearch(this.props.value);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default Search;
