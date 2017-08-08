import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';
import Slider from 'react-slick'
import Background from '../../components/Background'
import './Module.css'


class ModuleCarousel extends PureComponent {

  state = {
    currentIndex: 0,
  }


  render() {
    const { chapter, module } = this.props

    const NextArrowButton = ({ onClick }) => (
      <button  className='ModuleCarousel__control_btn ModuleCarousel__control_btn_right' onClick={onClick}><i className="material-icons md-28">keyboard_arrow_right</i></button>
    )

    const PrevArrowButton = ({ onClick }) => (
      <button className='ModuleCarousel__control_btn ModuleCarousel__control_btn_left' onClick={onClick}><i className="material-icons md-28">keyboard_arrow_left</i></button>
    )

    const settings = {
      dots: false,
      speed: 500,
      slidesToShow: 1,
      initialSlide: 0,
      lazyLoad: false,
      slidesToScroll: 1,
      variableWidth: true,
      adaptiveHeight: false,
      prevArrow: <PrevArrowButton />,
      nextArrow: <NextArrowButton />,
      focusOnSelect: true,
      infinite: false,
      centerMode: true,
      afterChange : (idx) => {
        this.setState({currentIndex: idx })
      }
    }
    const { currentIndex } = this.state

    const backgroundColor = get(module, 'background.color')
    const backgroundImage = get(module, 'background.object.id.attachment')
    const backgroundOverlay = get(module, 'background.object.overlay')

    return (
      <div style={{height:'100%'}}>
        <Background image={backgroundImage} color={backgroundColor} overlay={backgroundOverlay} />
        <Container className="ModuleCarousel__slider_container">
          <Slider {...settings}>
            {module.objects.map((pic, i) => (
              // <div className={`ModuleCarousel__inner_slider ${ i === currentIndex ? '' : 'ModuleCarousel__inner_slider--opaque'  }`} key={cover} style={{backgroundImage: `url(${cover})`}}/>
              <div className={`ModuleCarousel__inner_slider ${ i !== currentIndex  ?  'ModuleCarousel__inner_slider--opaque' : '' }`} key={pic.id.id} >
                <img src={pic.id.attachment} />
              </div>
            ))}
          </Slider>
          <div className="ModuleCarousel__control_container">
            <span> {currentIndex + 1} / {module.objects.length} </span>
          </div>
        </Container>
        <div className="ModuleCarousel__caption">
          <i className="icon-hand ModuleCarousel__caption_icon" />{module.caption}
        </div>
      </div>
    )
  }
}


export default ModuleCarousel
