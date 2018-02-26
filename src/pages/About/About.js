import React, { PureComponent } from 'react'
import {  Container, Row, Col } from 'reactstrap'
import StaticStory from '../../components/StaticStory'
import BigTitle from '../../components/BigTitle'
import {Helmet} from 'react-helmet';
import './About.css'

class About extends PureComponent {
   organizers = [
    'unilu.jpg',
    'c2dh.jpg',
    'minister.jpg',
  ];

   partners = [
    'aleh.jpg',
    'archives.jpg',
    'bibliolux.jpg',
    'cna.jpg',
    'europeana.jpg',
    'diddeleng.jpg',
    'militaire.jpg',
    'mnha.jpg',
    'migration.jpg',
  ];

  render(){
        return(
          <div className="About__wrapper">
            <Helmet>
                    <title>{this.context.t('about')}</title>
            </Helmet>
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
                    <div className="About__logo_wrapper">
                      { this.organizers.map(organizer => (
                          <div className="col-4">
                            <img className="img-fluid" src={'/img/logo/' + organizer}></img>
                          </div>
                        ))
                      }
                    </div>
                    <h4>
                      {this.context.t('partner institutions')}
                    </h4>
                    <div className="About__logo_wrapper">
                      { this.partners.map(partner => (
                          <div className="col-4">
                            <img className="img-fluid" src={'/img/logo/' + partner}></img>
                          </div>
                        ))
                      }
                    </div>
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
