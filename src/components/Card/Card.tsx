import React from 'react';
import './CardList.css';

type Props = {
  name: string;
  description: string;
};

class Card extends React.Component<Props> {
  render() {
    const { name, description } = this.props;
    return (
      <div className="card">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    );
  }
}

export default Card;
