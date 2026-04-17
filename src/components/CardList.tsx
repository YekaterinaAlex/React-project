import React from 'react';
import Card from './Card';

class CardList extends React.Component {
  render() {
    return (
      <div>
        <h2>Results</h2>
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}
export default CardList;
