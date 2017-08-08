import React from 'react'
import './ResourceCard.css'

const ResourceCard = ({ title, author, image, pubDate }) => (
  <div className="ResourceCard__container">
    <div style={{backgroundImage: `url(${image})`}} className="ResourceCard__image hidden-md-down">
    </div>
    <div className="ResourceCard__text_container">
      <p className="ResourceCard__pub_date">Publishing date: {pubDate}</p>
      <h3>{title}</h3>
      <p className="ResourceCard__pub_date"><i>by </i>{author}</p>
      <div className="ResourceCard__downloadBtn_wrapper">
        <button className="btn btn-secondary ResourceCard__downloadBtn">
          <i className="material-icons">file_download</i>
          Download
        </button>
      </div>
    </div>
  </div>
)

export default ResourceCard
