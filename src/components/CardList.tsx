import React from 'react';
import Card from './Card';

type Item = {
  name: string;
  description: string;
};

type Props = {
  items: Item[];
};

class CardList extends React.Component<Props> {
  render() {
    const { items } = this.props;
    return (
      <div>
        <h2>Results</h2>
        {items.length === 0 ? (
          <p>No results yet</p>
        ) : (
          items.map((item) => (
            <Card
              key={item.name}
              name={item.name}
              description={item.description}
            />
          ))
        )}
      </div>
    );
  }
}
export default CardList;
