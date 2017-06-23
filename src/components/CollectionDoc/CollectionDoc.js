import React from 'react'
import { pure } from 'recompose'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import './CollectionDoc.css'

const CollectionDoc = ({ doc, hasImage }) => (
  <div className="CollectionDoc">
    <Link to={{ pathname:`/collection/item/${doc.id}`, state:{modal:true} }} >
      { hasImage && ( <img src={doc.snapshot} alt={doc.title} style={{height:'100%', width:'100%'}}/> )}
      { !hasImage && (
        <div className={`CollectionDoc__inner_container ${(doc.data.type === 'report') && 'CollectionDoc__inner_container_audio'}`}>
          {doc.title} ({doc.data.type})
        </div> )}
      {/* {get(doc, 'data.coordinates.geometry.coordinates')} */}
    </Link>
  </div>
)

export default pure(CollectionDoc)
