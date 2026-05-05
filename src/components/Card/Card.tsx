import '../CardList/CardList.css';

type Props = {
  name: string;
  description: string;
  onClick: () => void;
};

function Card({ name, description, onClick }: Props) {
  return (
    <button className="card" onClick={onClick}>
      <h3>{name}</h3>
      <p>{description}</p>
    </button>
  );
}

export default Card;
