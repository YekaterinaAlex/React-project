import type { Item } from '../../features/Home/home.type';

export type CardListItem = {
  name: string;
};

export type CardListProps = {
  items: CardListItem[];
  onItemClick: (name: string) => void;
  selectedItemNames: string[];
  onToggleSelect: (item: Item) => void;
};
