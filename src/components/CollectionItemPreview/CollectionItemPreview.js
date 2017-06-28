import React from 'react';
import CollectionItemPreviewDefault from './CollectionItemPreviewDefault'
import CollectionItemPreviewImage from './CollectionItemPreviewImage'
import CollectionItemPreviewPDF from './CollectionItemPreviewPDF'
import CollectionItemPreviewVideo from './CollectionItemPreviewVideo'
import CollectionItemPreviewAudio from './CollectionItemPreviewAudio'

export default class CollectionItemPreview extends React.PureComponent {
  render() {
    const { doc } = this.props
    if (doc.type == 'image' || doc.data.type == 'image') {
      return (<CollectionItemPreviewImage doc={doc}/>)
    } else if (doc.data.type === 'pdf' || (typeof(doc.src)=='string' && doc.src.endsWith('.pdf'))){
      return (<CollectionItemPreviewPDF doc={doc}/>)
    } else if (doc.data.type === 'video'){
      return (<CollectionItemPreviewVideo doc={doc}/>)
    } else if (doc.data.type === 'audio'){
      return (<CollectionItemPreviewAudio doc={doc}/>)
    }
    return (<CollectionItemPreviewDefault doc={doc}/>)
  }
}
