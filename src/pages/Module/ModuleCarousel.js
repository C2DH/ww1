import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';
import Slider from 'react-slick'
import Background from '../../components/Background'
import CollectionItemLink from '../../components/CollectionItemLink'

class ModuleCarousel extends PureComponent {

  state = {
    currentIndex: 0,
  }

  constructor(props) {
    super(props)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  next() {
   this.slider.slickNext()
  }
  previous() {
    this.slider.slickPrev()
  }

  render() {
    const { chapter, module, style } = this.props

    // const NextArrowButton = ({ onClick }) => (
    //   <button  className='ModuleCarousel__control_btn ModuleCarousel__control_btn_right' onClick={onClick}><i className="material-icons md-28">keyboard_arrow_right</i></button>
    // )
    //
    // const PrevArrowButton = ({ onClick }) => (
    //   <button className='ModuleCarousel__control_btn ModuleCarousel__control_btn_left' onClick={onClick}><i className="material-icons md-28">keyboard_arrow_left</i></button>
    // )

    const settings = {
      dots: false,
      speed: 500,
      slidesToShow: 1,
      initialSlide: 0,
      lazyLoad: false,
      slidesToScroll: 1,
      variableWidth: true,
      adaptiveHeight: false,
      // prevArrow: <PrevArrowButton />,
      // nextArrow: <NextArrowButton />,
      arrows: false,
      focusOnSelect: true,
      infinite: false,
      centerMode: true,
      centerPadding: '0px',
      afterChange : (idx) => {
        this.setState({currentIndex: idx })
      }
    }
    const { currentIndex } = this.state

    const backgroundColor = get(module, 'background.color')
    const backgroundImage = get(module, 'background.object.id.attachment')
    const backgroundOverlay = get(module, 'background.object.overlay')
    const bbox = get(module, 'background.object.bbox')

    return (
      <div style={style || {height:'100%', position:'relative'}}>
        <Background
          image={backgroundImage}
          color={backgroundColor}
          overlay={backgroundOverlay}
          bbox={bbox}
        />
      <Container fluid style={{height:'100%'}}>
          <Row style={{height:'100%'}}>
            <Col style={{height:'100%'}}>
              <div className="ModuleCarousel__wrapper">
                <div className="ModuleCarousel__slider_container">
                    <Slider ref={c => this.slider = c } {...settings}>
                      {module.objects.map((pic, i) => (
                        <div className={`ModuleCarousel__inner_slider ${ i !== currentIndex  ?  'ModuleCarousel__inner_slider--opaque' : '' }`} key={pic.id.id} >
                          <img src={pic.id.attachment} />
                          <div className="ModuleCarousel__CollectionItemLink"><CollectionItemLink doc={pic.id}/></div>
                        </div>
                      ))}
                    </Slider>
                    <div className="ModuleCarousel__control_container">
                      <button  className='ModuleCarousel__control_btn ModuleCarousel__control_btn_right' onClick={this.previous}><i className="material-icons md-28">keyboard_arrow_left</i></button>
                      <span> {currentIndex + 1} / {module.objects.length} </span>
                      <button  className='ModuleCarousel__control_btn ModuleCarousel__control_btn_right' onClick={this.next}><i className="material-icons md-28">keyboard_arrow_right</i></button>
                    </div>

                </div>
                <div className="ModuleCarousel__caption">
                    <span>
                      <i className="icon-hand Mods__DocumentOnly_Card_icon"  />
                      <span> {module.caption}</span>
                    </span>
                </div>
              </div>
            </Col>
          </Row>
          </Container>
      </div>
    )
  }
}


export default ModuleCarousel
