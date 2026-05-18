import type { FlyoutProps } from './flyout.type';

function Flyout({ items, onUnselect, onDownload }: FlyoutProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <p>{items.length} items selected</p>

      <button onClick={onUnselect}>Unselect All</button>

      <button onClick={onDownload}>Download</button>
    </div>
  );
}

export default Flyout;
