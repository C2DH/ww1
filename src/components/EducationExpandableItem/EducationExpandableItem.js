import React, { PureComponent } from 'react'
import { Container, Row, Col, Collapse } from 'reactstrap';
import './EducationExpandableItem.css'

class EducationExpandableItem extends PureComponent {

    state = {
      open:false
    }

    toggleExpand = () => {
      this.setState({
        open: !this.state.open
      })
    }

render () {

  return (
      <Container fluid={true} className='EducationExpandableItem'>
        <Row className='EducationExpandableItem__topRow'>
          <Col xs={12} md={11} lg={11}>
          <h2 className="EducationExpandableItem__titleLabel" onClick={this.toggleExpand}>
              {this.props.label}{': '}<span className="EducationExpandableItem__title">{this.props.title}</span>
            </h2>
          </Col>
          <Col md={1} lg={1} className="hidden-sm-down">
            <button onClick={this.toggleExpand} className="btn btn-secondary EducationExpandableItem__btn" key="button">
              <i className="material-icons">{this.state.open ? 'remove': 'add'}</i>
            </button>
          </Col>
        </Row>
        <Collapse isOpen={this.state.open}>
          <div className="EducationExpandableItem__container">
            <h6 className="EducationExpandableItem__show_less hidden-md-up" onClick={this.toggleExpand}><span>show less</span></h6>
              <p className="EducationExpandableItem__text">{this.props.description}</p>
          </div>
        </Collapse>
      </Container>

     )
   }
}

export default EducationExpandableItem
