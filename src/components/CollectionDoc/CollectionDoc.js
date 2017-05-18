import React from 'react'
import './CollectionDoc.css'

const CollectionDoc = ({ doc }) => (
  <div className="CollectionDoc">
    <h2>{doc.title}</h2>
    <p>{doc.translated.description}</p>
    {(doc.type === 'image' && doc.attachment) && (
      <img src={doc.attachment} alt={doc.title} className="CollectionDoc__Image" />
    )}
  </div>
)

export default CollectionDoc
