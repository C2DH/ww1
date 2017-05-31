import React from 'react'
import './OtherTeachersCard.css'

const OtherTeachersCard = () => (
  <div className="OtherTeachersCard__Card">
    <img className="img-responsives OtherTeachersCard__img" alt={'placeholder'} src="http://placehold.it/630x370" />
    <div className="OtherTeachersCard__text-container">
      <p className="OtherTeachersCard__title">Title of the exercise</p>
      <table className="OtherTeachersCard__table">
        <tr>
          <td>Licee XXX, Paris</td>
        </tr>
        <tr>
          <td>Year:</td>
          <td>2017</td>
        </tr>
        <tr>
          <td>Teacher:</td>
          <td>John Doe</td>
        </tr>
      </table>
      <p className="OtherTeachersCard__link">Link</p>
    </div>
  </div>
)

export default OtherTeachersCard
