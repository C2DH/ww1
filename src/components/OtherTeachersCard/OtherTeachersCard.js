import React from 'react'
import './OtherTeachersCard.css'

const OtherTeachersCard = () => (
  <div className="OtherTeachersCard__Card">
      <h6 className="OtherTeachersCard__title">Title of the exercise Title of the exercise Title of the exercise</h6>
      <p>Licee XXX, Luxembourg</p>
      <p>Year: 2017</p>
      <p>Teacher(s): John Doe</p>
      <a className="btn btn-secondary OtherTeachersCard__project_link" href="">
        Link
        <i className="material-icons">link</i>
      </a>
  </div>
)

export default OtherTeachersCard
