import React from 'react';
import JSONTree from 'react-json-tree'
import AudioPlayer from '../AudioPlayer'
import CollectionItemDownload from '../CollectionItemDownload'
import { isSafari, replaceExtension } from '../../utils'
import { get } from 'lodash'

export default class CollectionItemPreviewAudio extends React.PureComponent {

  render() {
    const { doc } = this.props

    let media = get(doc, 'attachment')
    const sources = get(doc, 'data.sources', [])
    const title = get(doc, 'translated.title')
    if (isSafari()) {
      const sourceAlternative = sources.filter(s => s.type === 'audio/mpeg')
      if (sourceAlternative.length > 0) {
        media = sourceAlternative[0].src
      } else {
        media = replaceExtension(media, 'mp3')
      }
    }
    if(!media){ return null }

    return (
      <div className="CollectionItemPreview__doc_preview">
        <div className="CollectionItemPreview__audio_wrapper">
            <AudioPlayer source={`${media}`} title={title}/>
        </div>
      <div className="CollectionItem__doc_controls">
        <CollectionItemDownload doc={doc} className="CollectionItem__btn_download"/>
      </div>
    </div>
  );
  }
}
