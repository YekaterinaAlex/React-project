import React from 'react';

type Props = {
  mustThrowError: boolean;
};

class Bug extends React.Component<Props> {
  render() {
    if (this.props.mustThrowError) {
      throw new Error('Test Error');
    }
    return null;
  }
}
export default Bug;
