import Card from '../Card/Card';
import './CardList.css';

type Item = {
  name: string;
  description: string;
};

type Props = {
  items: Item[];
  onItemClick: (name: string) => void;
};

function CardList({ items, onItemClick }: Props) {
  return (
    <div className="card-list">
      <h2>Results</h2>
      {items.length === 0 ? (
        <p>No results yet</p>
      ) : (
        items.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            description={item.description}
            onClick={() => onItemClick(item.name)}
          />
        ))
      )}
    </div>
  );
}

export default CardList;
