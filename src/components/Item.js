import React from 'react';
import { Container, Row, Col } from 'reactstrap'

export default ({doc}) => {
  return (
    <div style={{height:'100vh', width:'100%', backgroundColor:'#222'}}>
      <Container fluid style={{height:'100%'}}>
        <Row style={{height:'100%'}}>
          <Col style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <img src={doc.attachment} alt={doc.title} className="img-fluid"/>
          </Col>
          <Col md={3} lg={3} style={{padding:'10'}}><h3 style={{color:'#ccc'}}>{doc.title}</h3></Col>
        </Row>
      </Container>

    </div>
  )
}
