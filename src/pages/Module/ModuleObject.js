import ReactDOM from 'react-dom'
import React, { PureComponent } from 'react'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap'
import { Card, CardImg, CardBlock } from 'reactstrap'
import { Player, ControlBar, BigPlayButton } from 'video-react'
import AudioPlayer from '../../components/AudioPlayer'

import Background from '../../components/Background'

const fullHeight = { height: '100%'}

class ModuleObjectContentVideo extends PureComponent {
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
    this.unsubscribe = this.player.manager.subscribeToPlayerStateChange(this.handlePlayerChange)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe()
    }
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const node = ReactDOM.findDOMNode(this)
    this.setState({
      width: node.parentNode.clientWidth,
      height: node.parentNode.clientHeight,
    })
  }

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

    const { module } = this.props
    const media = get(module, 'id.attachment')

    return (
      <div className="ModuleObject__container">
        <Player fluid={false} ref={ref => this.player = ref} height={playerHeight} width={playerWidth}>
          <source src={media} />
          <BigPlayButton position="center" />
          <ControlBar autoHide={false} />
        </Player>
        <div lassName="ModuleObject__caption" style={{width: playerWidth}}>{module.caption}</div>
      </div>
    )
  }
}

const ModuleObjectContentImage = pure(({ module }) => {
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
        <div style={objectContainerStyle}></div>
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

class ModuleObjectContentAudio extends PureComponent {
  render() {
    const { module } = this.props
    const media = get(module, 'id.attachment')
    return (
      <div className='Module__object__audio'>
        <AudioPlayer source={`https://cors-anywhere.herokuapp.com/${media}`} />
        <div className="Module__object__audio__caption">{module.caption}</div>
      </div>
    )
  }
}

const ModuleObjectContent = ({ module }) => {
  if (module.type === 'video') {
    return <ModuleObjectContentVideo module={module} />
  } else if (module.type === 'image') {
    return <ModuleObjectContentImage module={module} />
  } else if (module.type === 'audio') {
    return <ModuleObjectContentAudio module={module} />
  } else {
    throw new Error(`ModuleObject invalid module type [${module.type}]`)
  }
}

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
                <ModuleObjectContent module={module}/>
              </Col>
              <Col md="4" />
          </Row>}

          {(size === 'medium') &&
            <Row style={fullHeight}>
              <Col md="2" />
              <Col md="8">
                <ModuleObjectContent module={module}/>
              </Col>
              <Col md="2" />
          </Row>}

         {(size === 'big') &&
            <Row style={fullHeight}>
              <Col md="12">
                <ModuleObjectContent module={module}/>
              </Col>
          </Row>}
         }
      </div>
    )
  }
}


export default ModuleObject
