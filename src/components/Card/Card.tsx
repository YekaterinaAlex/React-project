import type { CardProps } from './card.type';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardDescription,
} from './Card.styled';

function Card({ name, description, onClick }: CardProps) {
  return (
    <StyledCard onClick={onClick}>
      <StyledCardHeader>{name}</StyledCardHeader>
      <StyledCardDescription>{description}</StyledCardDescription>
    </StyledCard>
  );
}

export default Card;
