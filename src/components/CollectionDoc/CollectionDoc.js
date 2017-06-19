import React from 'react'
import { pure } from 'recompose'
import { Link } from 'react-router-dom'
import './CollectionDoc.css'

const CollectionDoc = ({ doc, hasImage }) => (
  <div className="CollectionDoc">
    <Link to={{ pathname:`/collection/item/${doc.id}`, state:{modal:true} }} >
      { hasImage && ( <img src={doc.snapshot} alt={doc.title} style={{height:'100%', width:'100%'}}/> )}
      { !hasImage && ( <div style={{height:200}}>{doc.title} ({doc.data.type})</div> )}
    </Link>
  </div>
)

export default pure(CollectionDoc)
