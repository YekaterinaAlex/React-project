import type { FlyoutProps } from './flyout.type';
import { StyledFlyout, StyledFlyoutButton } from './Flyout.styled';

function Flyout({ items, onUnselect, onDownload }: FlyoutProps) {
  if (items.length === 0) {
    return null;
  }
  const count = items.length;

  return (
    <StyledFlyout>
      <p>
        {count} {count === 1 ? 'item' : 'items'} selected.
      </p>

      <StyledFlyoutButton onClick={onUnselect}>Unselect All</StyledFlyoutButton>

      <StyledFlyoutButton onClick={onDownload}>Download</StyledFlyoutButton>
    </StyledFlyout>
  );
}

export default Flyout;
