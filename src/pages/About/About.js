import React, { PureComponent } from 'react'
import {  Container, Row, Col } from 'reactstrap'
import StaticStory from '../../components/StaticStory'
import BigTitle from '../../components/BigTitle'
import {Helmet} from 'react-helmet';
import './About.css'

class About extends PureComponent {
   organizers = [
    {url: 'unilu.jpg',link: 'https://www.c2dh.uni.lu/'},
    {url: 'c2dh.jpg',link: 'https://www.c2dh.uni.lu/'},
    {url: 'minister.jpg',link: 'https://gouvernement.lu'}
  ];

   partners = [
    {url: 'aleh.jpg',link: 'https://www.facebook.com/ALEH-Association-Luxembourgeoise-des-Enseignants-dHistoire-279868907267/'},
    {url: 'archives.jpg',link: 'http://anlux.public.lu'},
    {url: 'bibliolux.jpg',link: 'http://www.bnl.public.lu'},
    {url: 'cna.jpg',link: 'http://www.cna.public.lu'},
    {url: 'diddeleng.jpg',link: 'http://www.dudelange.lu'},
    {url: 'militaire.jpg',link: 'https://www.mnhm.net'},
    {url: 'mnha.jpg',link: 'http://www.mnha.lu'},
    {url: 'migration.jpg',link: 'https://www.cdmh.lu'},
    {url: 'eych.jpg',link: 'https://patrimoine2018.lu'}
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
                            <a href={organizer.link} target="_blank">
                              <img className="img-fluid About__logo__img" src={'/img/logo/' + organizer.url}></img>
                            </a>
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
                            <a href={partner.link} target="_blank">
                            <img className="img-fluid About__logo__img" src={'/img/logo/' + partner.url}></img>
                            </a>
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
