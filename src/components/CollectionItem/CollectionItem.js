import React, { PureComponent } from 'react';
import { Container, Row, Col, Label } from 'reactstrap'
import EventDate from '../../components/EventDate'
import moment from 'moment'
import MediaQuery from 'react-responsive'
import { get, keys, capitalize } from 'lodash'
import CollectionItemPreview from '../CollectionItemPreview'
import './CollectionItem.css'


const EXAMPLE_METADATA = {
  author : "Mimmo",
  publication_date: "1880"
}


class AdditionalInformation extends PureComponent {

  state = {
    open:false
  }

  toggleInfo = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
  const {metadata} = this.props
  const metadataKeys = keys(metadata);

  return (
    <div>
      <Label className="CollectionItem__label CollectionItem__additional_info">
        ADDITIONAL INFORMATION
        <button onClick={this.toggleInfo}><i className={this.state.open ? `icon-keyboard_arrow_up` : `icon-keyboard_arrow_down`} /></button>
      </Label>
      <hr className="CollectionItem__Relatedobjects_divider mt-0" />
      {this.state.open ? <div>
      { metadataKeys.map(k => (
        <p key={k} className="CollectionItem__AdditionalInformation_text">
          <b>{capitalize(k.split("_").join(" "))}:</b> <i>{metadata[k]}</i>
        </p>

      ))}
    </div> : null}
    </div>

  )
 }
}


//id: 193 has related!
const RelatedObjects = ({items}) => {

  return (<div className="CollectionItem__Relatedobjects">
    <Label className="CollectionItem__label">RELATED OBJECTS</Label>
    <hr className="CollectionItem__Relatedobjects_divider mt-0" />
    { items.map(item => (
        <div key={item.id} className="d-inline-flex">
          <img src="http://placehold.it/70x70" alt="related object image" className="CollectionItem__Relatedobjects__img"/>
          <div className="CollectionItem__Relatedobjects__text_container">
            <h6>{item.title}</h6>
            <p>{item.type}</p>
          </div>
        </div>
      ))}
    <hr className="CollectionItem__Relatedobjects_divider" />
  </div>)
}

const SeeAlso = ({doc}) => (
  <div className="CollectionItem__Relatedobjects">
    <Label className="CollectionItem__label">SEE ALSO</Label>
    <div>
      {doc.data.year && <button className="CollectionItem__btn">{get(doc, "data.year")}</button>}
      {doc.data.type && <button className="CollectionItem__btn">{get(doc, "data.type")}</button>}
    </div>
    <hr className="CollectionItem__Relatedobjects_divider mb-0" />
  </div>
)


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
        <MediaQuery minWidth={991}>
        <Row>
          <div className="CollectionItem__container">
            <Col>
              <CollectionItemPreview doc={doc}/>
            </Col>
            <Col md={3} lg={3} className="CollectionItem__info_container">
                <p className="CollectionItem__date">
                  <EventDate
                    date={get(doc, 'translated.date')}
                    startDate={doc.translated.start_date}
                    endDate={doc.translated.end_date}
                  />
                </p>
              <h3 className="CollectionItem__title">{doc.title}</h3>
              <hr className="CollectionItem__title_divider" />
              <p className="CollectionItem__description">
                  { get(doc, 'translated.description') }
              </p>

              {/* <JSONTree data={doc} /> */}
              { coords && (
                <MiniMap coords={coords}/>
              )}
              { get(doc, "documents.length") && (
                <RelatedObjects items={get(doc, "documents")}/>
              )}
              <SeeAlso doc={doc}/>
              <AdditionalInformation metadata={EXAMPLE_METADATA}/>

            </Col>
          </div>
        </Row>
      </MediaQuery>
      <MediaQuery maxWidth={991}>

          <div className="CollectionItem__container">
            <CollectionItemPreview doc={doc}/>
            <div className="CollectionItem__info_container">
                <p className="CollectionItem__date">
                  <EventDate
                    date={get(doc, 'translated.date')}
                    startDate={doc.translated.start_date}
                    endDate={doc.translated.end_date}
                  />
                </p>
              <h3 className="CollectionItem__title">{doc.title}</h3>
              <hr className="CollectionItem__title_divider" />
              <p className="CollectionItem__description">
                  { get(doc, 'translated.description') }
              </p>

              { coords && (
                <MiniMap coords={coords}/>
              )}
              { get(doc, "documents.length") && (
                <RelatedObjects items={get(doc, "documents")}/>
              )}
              <SeeAlso doc={doc}/>
              <AdditionalInformation metadata={EXAMPLE_METADATA}/>

            </div>
          </div>
      </MediaQuery>

      </Container>

    </div>
  )
}
