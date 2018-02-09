import React, { PureComponent } from 'react'
import {  Container, Row, Col } from 'reactstrap'
import StaticStory from '../../components/StaticStory'
import BigTitle from '../../components/BigTitle'
import './About.css'

class About extends PureComponent {

  render(){
        return(
          <div className="About__wrapper">
            <Container>
              <BigTitle title={this.context.t('about')} />
              <Row>
                <Col xs="12" md="6">
                    <StaticStory slug='about' />
                </Col>
                <Col xs="12" md="6">
                  <div className="Static__intro">
                    <h4>
                      {this.context.t('organizers')}
                    </h4>
                    <h4>
                      {this.context.t('partner institutions')}
                    </h4>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )
  }
}

About.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default About
