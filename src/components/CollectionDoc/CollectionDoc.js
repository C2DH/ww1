import React from 'react'
import { connect } from 'react-redux'
import { pure } from 'recompose'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import MdTitle from '../../components/MdTitle'
import {
  getCurrentLanguage,
} from '../../state/selectors'
import CollectionItemLink from '../CollectionItemLink'
import './CollectionDoc.css'

const CollectionDoc = ({ doc, hasImage, lang, showDocLink = false, squared = false, index, isScrolling }) => (
  <div className={`CollectionDoc ${squared ? 'squared' : ''}`}>
    <Link to={{ pathname:`/collection/item/${doc.id}`, search: '?lang=' + lang.label.toLowerCase(), state:{modal:true} }} >
      { hasImage && ( <img src={doc.data.resolutions.thumbnail.url} alt={doc.translated.title}/> )}
      { !hasImage && (
        <div className={`CollectionDoc__inner_container ${squared ? 'squared' : ''} CollectionDoc__frame_over_${doc.data.type}`}>
          <MdTitle title={doc.translated.title}></MdTitle>
        </div> )}
      {/* {get(doc, 'data.coordinates.geometry.coordinates')} */}
    </Link>
    { hasImage &&
        <div className={`CollectionDoc__frame CollectionDoc__frame_over_${doc.data.type}`}>
      </div>
    }
    {showDocLink && <div className="CollectionDoc__Link"><CollectionItemLink doc={doc}/></div>}
  </div>
)

export default connect(state => ({
  lang: getCurrentLanguage(state),
}))(pure(CollectionDoc))
