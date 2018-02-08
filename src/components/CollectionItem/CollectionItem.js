import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Label, Collapse, Button } from 'reactstrap'
import EventDate from '../../components/EventDate'
import moment from 'moment'
import MediaQuery from 'react-responsive'
import { get, keys, capitalize } from 'lodash'
import CollectionItemPreview from '../CollectionItemPreview'
import CollectionItemRelated from '../CollectionItemRelated'
import Markdown from 'markdown-to-jsx';
import './CollectionItem.css'


const ADDITIONAL_METATDATA_KEYS = ['creator','provenance','archive_id','copyrights']


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
  let additional = metadataKeys.map(k => {
    const datum = get(doc.translated, k, get(doc, k, null))
    if(datum){
      return {key: k, value: datum}
    }
  }).filter(function(d){
    return d
  })
  return (
  <div>
    { additional.length &&
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
           { additional.map(item => {
             return (
               <tr key={item.key}>
                 <th scope="row">{this.context.t(item.key)}</th>
                 <td>{item.value}</td>
               </tr>
             )
            })
           }
           </tbody>
          </table>
        </Collapse>
      </div>
    }
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


class SeeAlso extends PureComponent {
  render() {
    const { doc } = this.props
    const { t } = this.context
    const dataType = get(doc, 'data.type')

    let year = get(doc, 'data.year')
    let yearLink
    if (year && parseInt(year)) {
      year = parseInt(year)
      if (year < 1914) {
        year = '<1914,1914'
      }
      else if(year > 1921){
        year = '1921,1921>'
      } else {
        year = `${year},${year+1}`
      }
      yearLink = `/collection/?years=${year}`
    } else if (`${year}`.toLowerCase() === 'uncertain') {
      yearLink = `/collection/?uncertainYears=1`

      const mStartDate = moment(get(doc, 'data.start_date', ''))
      const startYear = mStartDate.isValid() ? mStartDate.year() : '<1914'

      const mEndDate = moment(get(doc, 'data.end_date', ''))
      const endYear = mEndDate.isValid() ? mEndDate.year() : '1921>'

      yearLink += `&years=${startYear},${endYear}`
    }

    return (
    <div className="CollectionItem__Relatedobjects">
      <h6 className="CollectionItem__label">{t('see also')}</h6>
        {year && <Link to={yearLink}><button className="CollectionItem__btn btn btn-secondary">{get(doc, "data.year")}</button></Link>}
        {dataType && <Link to={`/collection/?types=${dataType}`}><button className="CollectionItem__btn btn btn-secondary">{get(doc, "data.type")}</button></Link>}
    </div>)
  }
}

SeeAlso.contextTypes = {
  t: React.PropTypes.func.isRequired
}



//TODO: MOVE AWAY. ADD GLOBAL MAPBOX ACCESS TOKEN
const MiniMap = ({coords, width=350, height=140}) => {
  const url = `https://api.mapbox.com/styles/v1/eischteweltkrich/cj5cizaj205vv2qlegw01hubm/static/pin-s+f56350(${coords[1]},${coords[0]})/${coords[1]},${coords[0]},13/${width}x${height}@2x?access_token=pk.eyJ1IjoiZWlzY2h0ZXdlbHRrcmljaCIsImEiOiJjajRpYnR1enEwNjV2MndtcXNweDR5OXkzIn0._eSF2Gek8g-JuTGBpw7aXw`
  return (
    <img src={url} width='100%' height='auto' className="my-4" />
  )
}




export default ({ doc, onCloseClick }) => {
  console.log(doc)
  let coords = get(doc, 'data.coordinates.geometry.coordinates')
  if(coords){
    coords = coords.map(item => parseFloat(item))
    coords = [coords[0], coords[1]]
  }

  const relatedType = ['image', 'audio', 'video', 'correspondence', 'other', 'physical object', 'book']
  let related = get(doc, "documents",[])
  related.filter(item => relatedType.indexOf(item)>-1?true:false)

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
                <div className="CollectionItem__description">
                  <Markdown>
                    { get(doc, 'translated.description') || ''}
                  </Markdown>
                </div>

                { coords && (
                  <MiniMap coords={coords}/>
                )}
                { related.length && (
                  <CollectionItemRelated items={related}/>
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
