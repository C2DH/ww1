import React from 'react';
import { Container, Row, Col } from 'reactstrap'
import JSONTree from 'react-json-tree'
import moment from 'moment'
import { get } from 'lodash'

const DateDisplay = ({date, startDate, endDate}) => {
  console.log("da", date)
  if(!startDate && !endDate){
    if(date){ return (<div style={{color:'white'}}>{date}</div>)}
    return null
  }

  const startDateFormatted = moment(startDate).format('MMMM DD, YYYY')

  return (
    <div style={{color:'white'}}>
      {startDateFormatted}
    </div>

  )

}

//TODO: MOVE AWAY. ADD GLOBAL MAPBOX ACCESS TOKEN
const MiniMap = ({coords, width=300, height=200}) => {
  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/pin-s-x+f00(${coords[1]},${coords[0]})/${coords[1]},${coords[0]},13/${width}x${height}?access_token=pk.eyJ1IjoiYmlhbmNoaW1ybyIsImEiOiJOY0FqNUxrIn0.C2YPVWz8M0nPeG2pZLybKQ`
  return (
    <img src={url} width={width} height={height} alt='Map of Albany, NY'/>
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
    <div style={{height:'100vh', width:'100%', backgroundColor:'#222'}}>
      <Container style={{height:'100%'}}>
        <Row style={{height:'100%'}}>
          <Col style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <img src={doc.attachment} alt={doc.title} className="img-fluid"/>
          </Col>
          <Col md={3} lg={3} style={{padding:'10'}}>
              <DateDisplay date={get(doc, 'translated.date')} startDate={doc.data.start_date} endDate={doc.data.end_date}/>
            <h3 style={{color:'#ccc'}}>{doc.title}</h3>
            <p>{get(doc, 'translated.description')}</p>

            {/*
            <JSONTree data={doc} />
            */}
            { coords && (
              <MiniMap coords={coords}/>
            )}

          </Col>
        </Row>
      </Container>

    </div>
  )
}
