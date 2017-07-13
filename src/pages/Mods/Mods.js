import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import Background from '../../components/Background'
import ChaptersControl from '../../components/ChaptersControl'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';
import './Mods.css'

const TextOnly = ({ title, text}) => (
  <Row>
    <Col md="6">
      <h3 className="Mods__heading">{title}</h3>
      <div className="Mods__text_container">
        <p>{text}</p>
      </div>
    </Col>
    <Col md="6" />
  </Row>
)

const TextCenter = ({ title, text}) => (
  <Row>
    <Col md="3" />
    <Col md="6">
      <h3 className="Mods__heading">{title}</h3>
      <div className="Mods__text_container">
        <p>{text}</p>
      </div>
    </Col>
    <Col md="3" />
  </Row>
)

const DocOnlyCard = ({ cover, text }) => (
  <div>
    <Card className="Mods__DocumentOnly_Card">
      <CardImg top width="100%" src={cover} alt="Card image cap" />
      <CardBlock>
        <div className="d-inline-flex">
          <i className="icon-hand Mods__DocumentOnly_Card_icon"  />
          <div className="Mods__DocumentOnly_text">
            {text}
          </div>
        </div>
      </CardBlock>
    </Card>
  </div>
)

const DocumentOnlySmall = () => (
  <Row>
    <Col md="2" />
    <Col md="8">
      <DocOnlyCard
        text="Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh. Mauris blandit aliquet elit,
              eget tincidunt nibh pulvinar a."
       cover="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
     />
    </Col>
    <Col md="2" />
  </Row>
)

const DocumentOnlyFullScreen = () => (
  <div className="DocumentOnlyFullScreen__container">
    <DocOnlyCard
      text="Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh. Mauris blandit aliquet elit,
            eget tincidunt nibh pulvinar a."
      cover="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
    />
  </div>
)



class Mods extends PureComponent  {
  render() {

    return (
      <Container fluid className="padding-r-l-0 Mods__container">
         <Background
           image="https://images.pexels.com/photos/299455/pexels-photo-299455.jpeg?h=350&auto=compress&cs=tinysrgb"
           overlay={null}
           color={null}
         />
         <div  className="Mods__inner_container">
            <ChaptersControl
              title="Occupation"
              currentIndex="1"
              count="6"
            />
              {/* <TextCenter
                title="Title accumsan id imperdiet et port at sem"
                text="Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh. Mauris blandit aliquet elit,
                      eget tincidunt nibh pulvinar a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. Vestibulum ac diam."
              /> */}
               {/* <DocumentOnlySmall /> */}

               <DocumentOnlyFullScreen />

          </div>

      </Container>
    )
  }
}


export default Mods
