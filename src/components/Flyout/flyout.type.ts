import type { Item } from '../../features/Home/home.type';

export interface FlyoutProps {
  items: Item[];
  onUnselect: () => void;
  onDownload: () => void;
}
