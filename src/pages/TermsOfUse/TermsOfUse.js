import React, { PureComponent } from 'react'
import {  Container, Row, Col } from 'reactstrap'
import StaticStory from '../../components/StaticStory'
import BigTitle from '../../components/BigTitle'
import {Helmet} from 'react-helmet';
import './TermsOfUse.css'

class TermOfUse extends PureComponent {

  render(){
        return(
          <div className="About__wrapper">
            <Helmet>
                    <title>{this.context.t('terms of use')}</title>
            </Helmet>
            <Container>
              <BigTitle title={this.context.t('terms of use')} />
              <Row>
                <Col xs="12" md="8">
                    <StaticStory slug='terms-of-use' />
                </Col>
              </Row>
            </Container>
          </div>
        )
  }
}

TermOfUse.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TermOfUse
