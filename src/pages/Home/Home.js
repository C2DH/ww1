import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import './Home.css'


const BACKGROUND_CLASSES = [
  'Home__background--slide1', 'Home__background--slide2', 'Home__background--slide3'
]

const BACKGROUND_INTERVAL = 5000;


class Home extends React.Component {

  state = {
    backgroundClass : "Home__background--slide1"
  }

  componentDidMount(){
    this.backgroundHandler = setInterval(()=>{
      const currentIndex = BACKGROUND_CLASSES.indexOf(this.state.backgroundClass);
      const nextIndex = currentIndex === BACKGROUND_CLASSES.length - 1 ? 0 : currentIndex + 1;
      this.setState({ backgroundClass: BACKGROUND_CLASSES[nextIndex] })
    }, BACKGROUND_INTERVAL);
  }

  componentWillUnmount(){
    clearInterval(this.backgroundHandler)
  }


  render() {
    const { backgroundClass } = this.state;
    return (
      <div className={`Home__background ${backgroundClass}`}>
      <Container className="Home__container d-flex flex-column">
        <div className="Home__MainRow">
        <Row>
          <Col md="1" sm="1" xs="1" className="Home__MainRow-yearsCol"><h3>1914</h3></Col>
          <Col md="10" sm="10"  xs="10">
            <h1 className="Home__title BehrensAntiqua fadeInUp animated">ÉISCHTE WELTKRICH</h1>
            <h4 className="Home__subtitle">Remembering the Great War in Luxembourg</h4>
          </Col>
          <Col md="1" sm="1"  xs="1" className="Home__MainRow-yearsCol"><h3>1918</h3></Col>
        </Row>
        </div>
        <div className="Home__NavigationRow">
        <Row >
          <Col md="3" sm="6" xs="6" className="Home__NavigationCol Home__NavigationCol_themes">
            <Link to="/themes">
              <h6 className="Home__NavigationCol_h6">DISCOVER THE</h6>
              <h2>Themes</h2>
            </Link>
          </Col>
          <Col md="3" sm="6" xs="6" className="Home__NavigationCol Home__NavigationCol_collection">
            <Link to="/collection">
            <h6 className="Home__NavigationCol_h6">BROWSE THE</h6>
            <h2>Collection</h2>
            </Link>
          </Col>
          <Col md="3" sm="6" xs="6" className="Home__NavigationCol Home__NavigationCol_map">
            <Link to="/map">
              <h6 className="Home__NavigationCol_h6">EXPLORE THE</h6>
              <h2>Map</h2>
            </Link>
          </Col>
          <Col md="3" sm="6" xs="6" className="Home__NavigationCol Home__NavigationCol_timeline">
            <Link to="/timeline">
              <h6 className="Home__NavigationCol_h6">FOLLOW THE</h6>
              <h2>Timeline</h2>
            </Link>
          </Col>
        </Row>
      </div>
      </Container>
      </div>
    )

  }
}



export default Home
