import Card from '../Card';
import { StyledCardList } from './CardList.styled';
import type { CardListProps } from './cardList.type';

function CardList({
  items,
  onItemClick,
  selectedItemNames,
  onToggleSelect,
}: CardListProps) {
  return (
    <StyledCardList>
      <h2>Results</h2>
      {items.length === 0 ? (
        <p>No results yet</p>
      ) : (
        items.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            onClick={() => onItemClick(item.name)}
            isSelected={selectedItemNames.includes(item.name)}
            onToggleSelect={() => onToggleSelect(item)}
          />
        ))
      )}
    </StyledCardList>
  );
}

export default CardList;
