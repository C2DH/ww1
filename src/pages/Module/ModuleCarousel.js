import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';
import Slider from 'react-slick'
import Background from '../../components/Background'
import './Module.css'


class ModuleCarousel extends PureComponent {

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
      <button className='ModuleCarousel__control_btn' onClick={onClick}><i className="material-icons md-28">keyboard_arrow_left</i></button>
    )

    const PrevArrowButton = ({ onClick }) => (
      <button className='ModuleCarousel__control_btn' onClick={onClick}><i className="material-icons md-28">keyboard_arrow_right</i></button>
    )

    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true,
      adaptiveHeight: true,
      prevArrow: <PrevArrowButton />,
      nextArrow: <NextArrowButton />,
    }

    return (
      <div style={{height:'100%'}}>
        <Background color={get(module, 'background.color')} />
          <Container className="ModuleCarousel__slider_container">
            <Slider {...settings}>
              {fakeCovers.map(cover => (
                <div className="ModuleCarousel__inner_slider" key={cover} style={{backgroundImage: `url(${cover})`}}/>
              ))}
            </Slider>
            <div className="ModuleCarousel__control_container">
              <span> 1 / 4 </span>
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
