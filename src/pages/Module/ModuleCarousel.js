import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';
import Slider from 'react-slick'
import Background from '../../components/Background'
import CollectionItemLink from '../../components/CollectionItemLink'
import LastModule from '../../components/LastModule'

class ModuleCarousel extends PureComponent {

  state = {
    currentIndex: 0,
    visibility: 'hidden',
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

  componentDidMount() {
    //quite bad
    this.next()
    this.previous()
    setTimeout(function() {
      this.setState({visibility:'visible'});
    }.bind(this), 1000);

  }

  render() {
    const { chapter, module, style, lastModule } = this.props

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
    const backgroundOverlay = get(module, 'background.object.overlay')
    const bbox = get(module, 'background.object.bbox')
    let backgroundImage = get(module, 'background.object.id.attachment')
    backgroundImage = !backgroundImage?'':(bbox.length)?backgroundImage:get(module, 'background.object.id.data.resolutions.medium.url','')

    return (
      <div style={style || {height:'100%', position:'relative', overflowY:'auto'}}>
        <Background
          image={backgroundImage}
          color={backgroundColor}
          overlay={backgroundOverlay}
          bbox={bbox}
        />
      <Container fluid style={{height:'100%'}}>
          <Row style={{height:'100%'}}>
            <Col style={{height:'100%'}}>
              <div className="ModuleCarousel__wrapper" style={{visibility:this.state.visibility}}>
                <div className="ModuleCarousel__slider_container">
                    <Slider ref={c => this.slider = c } {...settings}>
                      {module.objects.map((pic, i) => (
                        <div className={`ModuleCarousel__inner_slider ${ i !== currentIndex  ?  'ModuleCarousel__inner_slider--opaque' : '' } animated fadeInRight`} key={pic.id.id} >
                          <img src={pic.id.data.resolutions.medium.url || pic.id.attachment} />
                          <div className="ModuleCarousel__CollectionItemLink"><CollectionItemLink doc={pic.id}/></div>
                        </div>
                      ))}
                    </Slider>
                    <div className="ModuleCarousel__control_container animated fadeIn">
                      <button  className='ModuleCarousel__control_btn ModuleCarousel__control_btn_right' onClick={this.previous}><i className="material-icons md-28">keyboard_arrow_left</i></button>
                      <span> {currentIndex + 1} / {module.objects.length} </span>
                      <button  className='ModuleCarousel__control_btn ModuleCarousel__control_btn_right' onClick={this.next}><i className="material-icons md-28">keyboard_arrow_right</i></button>
                    </div>

                </div>
                {(module.caption) &&
                    <div className="Module__object_caption_text card-block Module__gallery_carousel_caption animated fadeInUp">
                      <i className="icon-hand Module__object_caption_hand"  />
                      <div className="Module__object_caption_text_cont">
                        <p className="card-text">
                          {module.caption}
                        </p>
                      </div>
                    </div>
                  }
              </div>
            </Col>
          </Row>
          </Container>
          {
            lastModule && <LastModule></LastModule>
          }
      </div>
    )
  }
}


export default ModuleCarousel
