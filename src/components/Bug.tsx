type Props = {
  mustThrowError: boolean;
};

function Bug({ mustThrowError }: Props) {
  return;
  if (mustThrowError) {
    throw new Error('Test Error');
  }
  return null;
}
export default Bug;
