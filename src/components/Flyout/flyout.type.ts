import type { Item } from '../../pages/Home/home.type';

export interface FlyoutProps {
  items: Item[];
  onUnselect: () => void;
  onDownload: () => void;
}
