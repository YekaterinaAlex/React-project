export type CardProps = {
  name: string;
  description: string;
  onClick: () => void;
  isSelected: boolean;
  onToggleSelect: () => void;
};
