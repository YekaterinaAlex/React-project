import type { CardProps } from './card.type';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardCheckbox,
} from './Card.styled';

function Card({
  name,

  onClick,
  isSelected,
  onToggleSelect,
}: CardProps) {
  return (
    <StyledCard onClick={onClick}>
      <StyledCardCheckbox
        type="checkbox"
        checked={isSelected}
        onClick={(event) => event.stopPropagation()}
        onChange={onToggleSelect}
      />
      <div>
        <StyledCardHeader>{name}</StyledCardHeader>
      </div>
    </StyledCard>
  );
}

export default Card;
