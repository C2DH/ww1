import React from 'react';
import CollectionItemPreviewDefault from './CollectionItemPreviewDefault'
import CollectionItemPreviewImage from './CollectionItemPreviewImage'
import CollectionItemPreviewPDF from './CollectionItemPreviewPDF'
import CollectionItemPreviewVideo from './CollectionItemPreviewVideo'
import CollectionItemPreviewAudio from './CollectionItemPreviewAudio'

export default class CollectionItemPreview extends React.PureComponent {
  render() {
    const { doc } = this.props
    switch (doc.type) {
      case 'image':
        return (<CollectionItemPreviewImage doc={doc}/>)
        case 'pdf':
          return (<CollectionItemPreviewPDF doc={doc}/>)
        case 'video':
          return (<CollectionItemPreviewVideo doc={doc}/>)
        case 'audio':
          return (<CollectionItemPreviewAudio doc={doc}/>)
      default:
        return (<CollectionItemPreviewDefault doc={doc}/>)
    }

  }
}
