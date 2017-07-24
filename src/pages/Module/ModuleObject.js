import ReactDOM from 'react-dom'
import React, { PureComponent } from 'react'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';
import { Player, ControlBar, BigPlayButton } from 'video-react'

import Background from '../../components/Background'

const fullHeight = { height: '100%'}

class VideoWrapper extends PureComponent {
  state = {
    width: null,
    height: null,
    player: {},
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    this.setState({
      width: node.parentNode.clientWidth,
      height: node.parentNode.clientHeight,
    })
    console.log(node)
    this.player.subscribeToStateChange(this.handlePlayerChange)
    console.log(this.player)
  }

  // componentWillUnmount() {
  //   this.player.
  // }

  handlePlayerChange = (state) => {
    this.setState({
      player: state,
    })
  }

  render() {
    const { player, width, height } = this.state
    let useHeight = height - 100

    let playerHeight = 0
    let playerWidth = 0

    if (player.videoHeight && player.videoWidth && width && useHeight) {
      const videoMaxHeight = width * (player.videoHeight / player.videoWidth)
      if (videoMaxHeight < useHeight) {
        playerHeight = videoMaxHeight
        playerWidth = width
      } else {
        playerHeight = useHeight
        playerWidth = useHeight * (player.videoWidth / player.videoHeight)
      }
    }


    return (
      <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Player fluid={false} ref={ref => this.player = ref} height={playerHeight} width={playerWidth}>
          <source src={'https://player.vimeo.com/external/223611221.sd.mp4?s=740bb77a04459c2aa3d8c7404d6b3b97693f0731&profile_id=164'} />
          <BigPlayButton position="center" />
          <ControlBar autoHide={false} />
        </Player>
        <div style={{ height: 70, textAlign: 'left', width: playerWidth, backgroundColor: 'white' }}>ahahah</div>
      </div>
    )
  }
}

const ModuleObjectCard = pure(({ module }) => {
  const media = get(module, 'id.attachment')
  const size = get(module, 'size', 'medium')

  let cardImgHeight = '400px'
  if (size === 'small') {
    cardImgHeight = '250px'
  } else if(size === 'medium') {
    cardImgHeight = '400px'
  } else if (size === 'big') {
    cardImgHeight = '90vh'
  }

  const objectStyle = {
    backgroundColor: 'transparent',
    alignItems: 'center',
  }

  const objectContainerStyle = {
    width: '100%',
    height: cardImgHeight,
    backgroundSize: 'cover',
    backgroundImage: `url(${media})`
  }

  return (
    <div style={objectStyle} className="Module__container">
      <Card className="Module__objectCard">
        {/* <div style={objectContainerStyle}></div> */}
        {/* <div style={{ width: '100%', height: 400, backgroundColor: 'red' }}>
          <Player fluid={false} height={400}>
            <source src={media} />
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} />
          </Player>
        </div> */}
        <CardBlock>
          <div className="d-inline-flex">
            <i className="icon-hand Mods__DocumentOnly_Card_icon"  />
            <div className="Module__objectCard_text">
              {module.caption}
            </div>
          </div>
        </CardBlock>
      </Card>
    </div>
  )
})

class ModuleObject extends PureComponent {
  render() {
    const { chapter, module } = this.props

    const size = get(module, 'size')

    const backgroundColor = get(module, 'background.color')
    const backgroundImage = get(module, 'background.object.id.attachment')
    const backgroundOverlay = get(module, 'background.object.overlay')

    return (
      <div style={fullHeight}>
        <Background image={backgroundImage} color={backgroundColor} overlay={backgroundOverlay} />

          {(size === 'small') &&
            <Row style={fullHeight}>
              <Col md="4" />
              <Col md="4" style={fullHeight}>
                {/* <ModuleObjectCard module={module} /> */}
                <VideoWrapper module={module}/>
              </Col>
              <Col md="4" />
          </Row>}

          {(size === 'medium') &&
            <Row style={fullHeight}>
              <Col md="2" />
              <Col md="8">
                {/* <ModuleObjectCard module={module} /> */}
                <VideoWrapper module={module}/>
              </Col>
              <Col md="2" />
          </Row>}

         {(size === 'big') &&
            <Row style={fullHeight}>
              <Col md="12">
                <VideoWrapper module={module}/>
                {/* <ModuleObjectCard module={module} /> */}
              </Col>
          </Row>}
         }
      </div>
    )
  }
}


export default ModuleObject
