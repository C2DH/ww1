import React, { PureComponent } from 'react';
import { Container, Row, Col, Label, Collapse, Button } from 'reactstrap'
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

  // state = {
  //   open:false
  // }
  //
  // toggleInfo = () => {
  //   this.setState({
  //     open: !this.state.open
  //   })
  // }

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
  const {metadata} = this.props
  const metadataKeys = keys(metadata);

  return (
    <div>
      <div className="CollectionItem__additional_info d-flex align-items-center">
        <h6 onClick={this.toggle} className="CollectionItem__label">
          additional information
        </h6>
        <i className="material-icons">{this.state.collapse? 'keyboard_arrow_up': 'keyboard_arrow_down'}</i>
      </div>
       <Collapse isOpen={this.state.collapse}>
         { metadataKeys.map(k => (
           <p key={k} className="CollectionItem__AdditionalInformation_text">
             <b>{capitalize(k.split("_").join(" "))}:</b> <i>{metadata[k]}</i>
           </p>
         ))}
       </Collapse>
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
    <h6 className="CollectionItem__label">SEE ALSO</h6>
      {doc.data.year && <button className="CollectionItem__btn btn btn-secondary">{get(doc, "data.year")}</button>}
      {doc.data.type && <button className="CollectionItem__btn btn btn-secondary">{get(doc, "data.type")}</button>}
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
        <Row>
            <Col lg="8">
              <CollectionItemPreview doc={doc}/>
            </Col>
            <Col lg="4" className="CollectionItem__info_container">
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
        </Row>

      </Container>

    </div>
  )
}
