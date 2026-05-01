import '../CardList/CardList.css';

type Props = {
  name: string;
  description: string;
};

function Card({ name, description }: Props) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
