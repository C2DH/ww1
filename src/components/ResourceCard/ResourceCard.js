import React from 'react'
import './ResourceCard.css'

const ResourceCard = (props) => (
  <div className="ResourceCard__container">
    <img src="http://via.placeholder.com/250x250"/>
    <div className="ResourceCard__text_container">
      <p className="ResourceCard__pub_date">Publishing date: {props.pubDate}</p>
      <h3>{props.title}</h3>
      <p><i>by </i>{props.author}</p>
      <button className="ResourceCard__downloadBtn">Download</button>
    </div>
  </div>
)

export default ResourceCard
