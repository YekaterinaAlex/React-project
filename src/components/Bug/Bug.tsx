import type { BugProps } from './bug.type';

function Bug({ mustThrowError }: BugProps) {
  if (mustThrowError) {
    throw new Error('Test Error');
  }

  return null;
}

export default Bug;
