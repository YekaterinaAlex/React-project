import type { CardProps } from './card.type';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardDescription,
} from './Card.styled';

function Card({
  name,
  description,
  onClick,
  isSelected,
  onToggleSelect,
}: CardProps) {
  return (
    <StyledCard onClick={onClick}>
      <input
        type="checkbox"
        checked={isSelected}
        onClick={(event) => event.stopPropagation()}
        onChange={onToggleSelect}
      />
      <div>
        <StyledCardHeader>{name}</StyledCardHeader>
        <StyledCardDescription>{description}</StyledCardDescription>
      </div>
    </StyledCard>
  );
}

export default Card;
