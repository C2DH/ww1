import React from 'react'
import './CollectionDoc.css'

const CollectionDoc = ({ doc, measure }) => (
  <div className="CollectionDoc">
    <h2>{doc.title}</h2>
    <p>{doc.translated.description}</p>
    {/**/}
    {(doc.type === 'image' && doc.attachment) && (
      <img  onload={measure} src={doc.attachment} alt={doc.title} className="CollectionDoc__Image" />
    )}
  </div>
)

export default CollectionDoc
