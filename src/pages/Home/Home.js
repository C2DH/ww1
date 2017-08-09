import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import './Home.css'


// const BACKGROUND_CLASSES = [
//   'Home__background--slide1', 'Home__background--slide2', 'Home__background--slide3'
// ]
//
// const BACKGROUND_INTERVAL = 5000;


class Home extends React.Component {

  state = {
    backgroundClass : "Home__background--slide1"
  }

  backgroundClasses = [
    'Home__background--slide1', 'Home__background--slide2', 'Home__background--slide3'
  ];

  // componentDidMount(){
  //   this.backgroundHandler = setInterval(()=>{
  //     const currentIndex = BACKGROUND_CLASSES.indexOf(this.state.backgroundClass);
  //     const nextIndex = currentIndex === BACKGROUND_CLASSES.length - 1 ? 0 : currentIndex + 1;
  //     this.setState({ backgroundClass: BACKGROUND_CLASSES[nextIndex] })
  //   }, BACKGROUND_INTERVAL);
  // }
  //
  // componentWillUnmount(){
  //   clearInterval(this.backgroundHandler)
  // }


  render() {
    //const { backgroundClass } = this.state;
    return (
      <div className="Home__wrapper">
        {this.backgroundClasses.map((className, index) => (
           <div className={'Home__background ' + className} key={index}>
           </div>
        ))}
        <Container className="Home__container d-flex flex-column">
          <div className="Home__MainRow d-flex flex-column justify-content-center">
          <Row>
            <Col lg="1" md="1" xs="1" className="Home__MainRow-yearsCol hidden-md-down animated fadeIn"><h3>1914</h3></Col>
            <Col lg="10" md="12">
              <h3 className="hidden-lg-up Home__MainRow-yearsCol-xs animated fadeIn">1914 – 1918</h3>
              <h1 className="Home__title animated fadeIn">ÉISCHTE WELTKRICH</h1>
              <h4 className="Home__subtitle animated fadeIn">{this.context.t('remembering the great war in luxembourg')}</h4>
            </Col>
            <Col lg="1" md="1"  xs="1" className="Home__MainRow-yearsCol hidden-md-down animated fadeIn"><h3>1918</h3></Col>
          </Row>
          </div>
          <div className="Home__NavigationRow animated fadeInUp">
          <Row>
            <Col lg="3" md="6" xs="12" className="Home__NavigationCol Home__NavigationCol_themes">
              <Link to="/themes" className="Home__NavigationCol_link">
                <h6 className="Home__NavigationCol_h6">{this.context.t('discover the')}</h6>
                <span>
                  <i className="icon-hand" />
                </span>
                <h2 className="Home__NavigationCol_h2">
                  {this.context.t('themes')}
                </h2>
                <span>
                  <i className="icon-hand-reverse" />
                </span>
              </Link>
            </Col>
            <Col lg="3" md="6" xs="12" className="Home__NavigationCol Home__NavigationCol_collection">
              <Link to="/collection" className="Home__NavigationCol_link">
              <h6 className="Home__NavigationCol_h6">{this.context.t('browse the')}</h6>
                <span>
                  <i className="icon-hand" />
                </span>
              <h2 className="Home__NavigationCol_h2">{this.context.t('collection')}</h2>
                <span>
                  <i className="icon-hand-reverse" />
                </span>
              </Link>
            </Col>
            <Col lg="3" md="6" xs="12" className="Home__NavigationCol Home__NavigationCol_map">
              <Link to="/map" className="Home__NavigationCol_link">
                <h6 className="Home__NavigationCol_h6">{this.context.t('explore the')}</h6>
                  <span>
                    <i className="icon-hand" />
                  </span>
                <h2 className="Home__NavigationCol_h2">{this.context.t('map')}</h2>
                  <span>
                    <i className="icon-hand-reverse" />
                  </span>
              </Link>
            </Col>
            <Col lg="3" md="6" xs="12" className="Home__NavigationCol Home__NavigationCol_timeline">
              <Link to="/timeline" className="Home__NavigationCol_link">
                <h6 className="Home__NavigationCol_h6">{this.context.t('follow the')}</h6>
                  <span>
                    <i className="icon-hand" />
                  </span>
                <h2 className="Home__NavigationCol_h2">{this.context.t('timeline')}</h2>
                  <span>
                    <i className="icon-hand-reverse" />
                  </span>
              </Link>
            </Col>
          </Row>
        </div>
        </Container>
      </div>
    )

  }
}

Home.contextTypes = {
  t: React.PropTypes.func.isRequired
}


export default Home
