import React, { PureComponent } from 'react'
import MdTitle from '../../components/MdTitle'
import EventDate from '../../components/EventDate'
import './ResourceCard.css'

class ResourceCard extends PureComponent {
  render(){
    const { title, author, image, date, startDate, attachment, description } = this.props;
    return (
      <div className="ResourceCard__container">
        <div style={{backgroundImage: `url(${image})`}} className="ResourceCard__image hidden-md-down">
        </div>
        <div className="ResourceCard__text_container">
          <p className="ResourceCard__pub_date">
            {this.context.t('publishing date')}: <EventDate
              date={date}
              startDate={startDate}
            />
          </p>
          <h3>
            <MdTitle title={title}></MdTitle>
          </h3>
          <p className="ResourceCard__pub_date"><i>{this.context.t('by')} </i>{author}</p>
          <p>
              {description}
          </p>
          <div className="ResourceCard__downloadBtn_wrapper">
            <a role="button"
              className="btn btn-secondary ResourceCard__downloadBtn"
              href={attachment} target="_blank"
              >
              <i className="material-icons">file_download</i>
              {this.context.t('download')}
            </a>
          </div>
        </div>
      </div>
    )
  }
}


ResourceCard.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default ResourceCard
