import React from 'react'
import { connect } from 'react-redux'
import { pure } from 'recompose'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import {
  getCurrentLanguage,
} from '../../state/selectors'
import CollectionItemLink from '../CollectionItemLink'
import './CollectionDoc.css'

const CollectionDoc = ({ doc, hasImage, lang, showDocLink=false }) => (
  <div className="CollectionDoc">
    <Link to={{ pathname:`/collection/item/${doc.id}`, search: '?lang=' + lang.label.toLowerCase(), state:{modal:true} }} >
      { hasImage && ( <img src={doc.snapshot} alt={doc.translated.title}/> )}
      { !hasImage && (
        <div className={`CollectionDoc__inner_container ${(doc.data.type === 'report') && 'CollectionDoc__inner_container_audio'}`}>
          {doc.translated.title} ({doc.data.type})
        </div> )}
      {/* {get(doc, 'data.coordinates.geometry.coordinates')} */}
    </Link>
    <div className="CollectionDoc__frame">
    </div>
    {showDocLink && <div className="CollectionDoc__Link"><CollectionItemLink doc={doc}/></div>}
  </div>
)

export default connect(state => ({
  lang: getCurrentLanguage(state),
}))(pure(CollectionDoc))
