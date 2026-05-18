export type CardListItem = {
  name: string;
  description: string;
};

export type CardListProps = {
  items: CardListItem[];
  onItemClick: (name: string) => void;
};
