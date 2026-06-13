export type CardProps = {
  name: string;

  onClick: () => void;
  isSelected: boolean;
  onToggleSelect: () => void;
};
