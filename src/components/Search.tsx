import React from 'react';

type State = {
  value: string;
};

class Search extends React.Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      value: '',
    };
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button>Search</button>
      </div>
    );
  }
}

export default Search;
