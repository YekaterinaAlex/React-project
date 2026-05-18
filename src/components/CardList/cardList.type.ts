import type { Item } from '../../pages/Home/home.type';

export type CardListItem = {
  name: string;
  description: string;
};

export type CardListProps = {
  items: CardListItem[];
  onItemClick: (name: string) => void;
  selectedItemNames: string[];
  onToggleSelect: (item: Item) => void;
};
