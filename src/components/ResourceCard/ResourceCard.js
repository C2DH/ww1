import React from 'react'
import './ResourceCard.css'

const ResourceCard = ({ title, author, image, pubDate }) => (
  <div className="ResourceCard__container">
    <img src={image} />
    <div className="ResourceCard__text_container">
      <p className="ResourceCard__pub_date">Publishing date: {pubDate}</p>
      <h3>{title}</h3>
      <p><i>by </i>{author}</p>
      <button className="ResourceCard__downloadBtn">Download</button>
    </div>
  </div>
)

export default ResourceCard
