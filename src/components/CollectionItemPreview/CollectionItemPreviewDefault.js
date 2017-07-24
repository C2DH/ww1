import React from 'react';
import JSONTree from 'react-json-tree'

export default class CollectionItemPreviewDefault extends React.PureComponent {
  render() {
    const { doc } = this.props
    return (
      <div>
        <JSONTree data={doc} />
      </div>
    )
  }
}
