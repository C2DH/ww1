import React from 'react';
import { Container, Row, Col, Label } from 'reactstrap'
import JSONTree from 'react-json-tree'
import moment from 'moment'
import { get } from 'lodash'
import './CollectionItem.css'

const RelatedObjects = ({relatedObjects}) => (
  <div className="CollectionItem__Relatedobjects">
    <Label className="CollectionItem__label">RELATED OBJECTS</Label>
    <hr className="CollectionItem__Relatedobjects_divider" />
    <div>

    </div>
    <hr className="CollectionItem__Relatedobjects_divider" />
  </div>
)

const SeeAlso = ({relatedObjects}) => (
  <div className="CollectionItem__Relatedobjects">
    <Label className="CollectionItem__label">SEE ALSO</Label>
    <div>
      <button className="CollectionItem__btn">1918</button>
    </div>
    <hr className="CollectionItem__Relatedobjects_divider" />
  </div>
)

const DateDisplay = ({date, startDate, endDate}) => {
  console.log("da", date)
  if(!startDate && !endDate){
    if(date){ return (<div style={{color:'white'}}>{date}</div>)}
    return null
  }

  const startDateFormatted = moment(startDate).format('MMMM DD, YYYY')

  return (
    <div>
      <p className="CollectionItem__date">{startDateFormatted}</p>
    </div>

  )

}

//TODO: MOVE AWAY. ADD GLOBAL MAPBOX ACCESS TOKEN
const MiniMap = ({coords, width=230, height=140}) => {
  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/pin-s-x+f00(${coords[1]},${coords[0]})/${coords[1]},${coords[0]},13/${width}x${height}?access_token=pk.eyJ1IjoiYmlhbmNoaW1ybyIsImEiOiJOY0FqNUxrIn0.C2YPVWz8M0nPeG2pZLybKQ`
  return (
    <img src={url} width={width} height={height} alt='Map of Albany, NY' />
  )
}



export default ({doc}) => {
  console.log(doc)
  let coords = get(doc, 'data.coordinates.geometry.coordinates')
  if(coords){
    coords = coords.map(item => parseFloat(item))
    coords = [coords[0], coords[1]]
  }
  return (
    <div className="CollectionItem__wrapper_div">
      <Container>
        <Row>
          <div className="CollectionItem__container">
            <Col className="CollectionItem__doc_container">
              <img src={doc.attachment} alt={doc.title} className="img-fluid"/>
              <JSONTree data={doc} />
            </Col>
            <Col md={3} lg={3} className="CollectionItem__info_container">
                <DateDisplay
                  date={get(doc, 'translated.date')}
                  startDate={doc.data.start_date}
                  endDate={doc.data.end_date}
                />
              <h3 className="CollectionItem__title">{doc.title}</h3>
              <hr className="CollectionItem__title_divider" />
              <p className="CollectionItem__description">
                {get(doc, 'translated.description')}
              </p>
              {/* <JSONTree data={doc} /> */}
              { coords && (
                <MiniMap coords={coords}/>
              )}
              <RelatedObjects />
              <SeeAlso />
            </Col>
          </div>
        </Row>
      </Container>

    </div>
  )
}
