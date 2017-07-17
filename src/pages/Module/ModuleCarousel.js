import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get, findIndex } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';
import Slider from 'react-slick'
import Background from '../../components/Background'
import './Module.css'


class ModuleCarousel extends PureComponent {

  state = {
    currentIndex:0
  }


  render() {
    const { chapter, module } = this.props
    const fakeCovers = [
      'https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?h=350&auto=compress&cs=tinysrgb',
      'https://images.pexels.com/photos/413186/pexels-photo-413186.jpeg?h=350&auto=compress&cs=tinysrgb',
      'https://images.pexels.com/photos/420177/pexels-photo-420177.jpeg?h=350&auto=compress&cs=tinysrgb',
      'https://images.pexels.com/photos/464377/pexels-photo-464377.jpeg?h=350&auto=compress&cs=tinysrgb',
      'https://images.pexels.com/photos/463684/pexels-photo-463684.jpeg?h=350&auto=compress&cs=tinysrgb',
    ]


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
      slidesToScroll: 1,
      variableWidth: true,
      adaptiveHeight: true,
      prevArrow: <PrevArrowButton />,
      nextArrow: <NextArrowButton />,
      focusOnSelect: true,
      infinite: true,
      centerMode: false,
      variableWidth: true,
      afterChange : (idx) => { this.setState({currentIndex: idx -1 })  }
    }
    const { currentIndex } = this.state
    let currentCount = currentIndex + 1
    if(currentIndex == 5){
      currentCount = 1
    }
    if(currentIndex == -1){
      currentCount = 5
    }
    return (
      <div style={{height:'100%'}}>
        <Background color={get(module, 'background.color')} />
          <Container className="ModuleCarousel__slider_container">
            <Slider {...settings}>
              {fakeCovers.map((cover, i) => (
                // <div className={`ModuleCarousel__inner_slider ${ i === currentIndex ? '' : 'ModuleCarousel__inner_slider--opaque'  }`} key={cover} style={{backgroundImage: `url(${cover})`}}/>
                <div className={`ModuleCarousel__inner_slider ${ i !== currentIndex  ?  'ModuleCarousel__inner_slider--opaque' : '' }`} key={cover} >
                  <img src={cover} />
                </div>

              ))}
            </Slider>
            <div className="ModuleCarousel__control_container">
              <span> {currentCount} / {fakeCovers.length} </span>
            </div>
          </Container>
          <Row className="ModuleCarousel__caption">
            <i className="icon-hand ModuleCarousel__caption_icon" />{module.caption}
          </Row>
      </div>
    )
  }
}


export default ModuleCarousel
