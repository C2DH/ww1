import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Label, Collapse, Button } from 'reactstrap'
import EventDate from '../../components/EventDate'
import moment from 'moment'
import MediaQuery from 'react-responsive'
import { get, keys, capitalize } from 'lodash'
import CollectionItemPreview from '../CollectionItemPreview'
import './CollectionItem.css'


const ADDITIONAL_METATDATA_KEYS = ['repository', 'copyright']


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
  const {doc, metadataKeys=[]} = this.props

  return (
    <div>
      <div className="CollectionItem__additional_info d-flex align-items-center" onClick={this.toggleInfo}>
        <h6 className="CollectionItem__label">
          {this.context.t('additional information')}
        </h6>
        <i className="material-icons">{this.state.open ? 'keyboard_arrow_up': 'keyboard_arrow_down'}</i>
      </div>
      <Collapse isOpen={this.state.open}>
       <table className="table table-bordered CollectionItem__AdditionalInformation_table">
           <tbody>
         { metadataKeys.map(k => {
           const datum = get(doc.translated, k, get(doc, k, null))
           if(datum === null){ return null}
           return (
             <tr key={k}>
               <th scope="row">{capitalize(k.split("_").join(" "))}</th>
               <td>{datum}</td>
             </tr>
           )
          })
         }
         </tbody>
        </table>
      </Collapse>
    </div>

  )
 }
}

const CloseButton = ({ onClick }) => (
  <Col xs="12" lg="1" className="order-2-sm-1">
    <div className="CollectionItem__close_btn_container">
      <button
        type="button"
        className="CollectionItem__close_btn"
        aria-label="Close"
        onClick={onClick}
        >
          <i aria-hidden="true" className="material-icons">close</i>
        </button>
    </div>
  </Col>
)

const RelatedObjects = ({items}) => {

  return (<div className="CollectionItem__Relatedobjects">
    <Label className="CollectionItem__label">{this.context.t('related object')}</Label>
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

const SeeAlso = ({doc}) => {
  let year = get(doc, "data.year")
  const dataType = get(doc, "data.type")
  if(year && parseInt(year)){
    if(year < 1914){
      year = '<1914,1914'
    }
    else if(year > 1914){
      year = '1921,1921>'
    } else {
      year = `${year},${year+1}`
    }
  }

  return (
  <div className="CollectionItem__Relatedobjects">
    <h6 className="CollectionItem__label">see also</h6>
      {year && <Link to={`/collection/?years=${year}`}><button className="CollectionItem__btn btn btn-secondary">{get(doc, "data.year")}</button></Link>}
      {dataType && <Link to={`/collection/?types=${dataType}`}><button className="CollectionItem__btn btn btn-secondary">{get(doc, "data.type")}</button></Link>}
  </div>)
}



//TODO: MOVE AWAY. ADD GLOBAL MAPBOX ACCESS TOKEN
const MiniMap = ({coords, width=230, height=140}) => {
  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/pin-s-x+f00(${coords[1]},${coords[0]})/${coords[1]},${coords[0]},13/${width}x${height}?access_token=pk.eyJ1IjoiYmlhbmNoaW1ybyIsImEiOiJOY0FqNUxrIn0.C2YPVWz8M0nPeG2pZLybKQ`
  return (
    <img src={url} width={width} height={height} alt='Map of Albany, NY' />
  )
}




export default ({ doc, onCloseClick }) => {
  console.log(doc)
  let coords = get(doc, 'data.coordinates.geometry.coordinates')
  if(coords){
    coords = coords.map(item => parseFloat(item))
    coords = [coords[0], coords[1]]
  }

  return (
    <div className="CollectionItem__wrapper_div">
      <Container fluid>
        <Row className="CollectionItem__main_row">
            <Col xs="12" lg="8" className="order-2">
              <div className="CollectionItem__doc_container">
                <CollectionItemPreview doc={doc}/>
              </div>
            </Col>
            <Col xs="12" lg="3" className="CollectionItem__info_container order-2">
              <div className="CollectionItem__info">
                <p className="CollectionItem__date">
                  <EventDate
                    date={get(doc, 'translated.date')}
                    startDate={doc.translated.start_date}
                    endDate={doc.translated.end_date}
                  />
                </p>
                <h3 className="CollectionItem__title">{doc.translated.title}</h3>
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
                <AdditionalInformation doc={doc} metadataKeys={ADDITIONAL_METATDATA_KEYS}/>
             </div>

            </Col>
            <CloseButton onClick={onCloseClick} />
            {/* <Col lg="1" className="hidden-sm-down" style={{paddingRight: 0, paddingLeft: 0, maxWidth: '1px'}}/> */}
        </Row>

      </Container>

    </div>
  )
}

AdditionalInformation.contextTypes = {
  t: React.PropTypes.func.isRequired
}
