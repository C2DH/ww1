import ReactDOM from 'react-dom'
import React, { PureComponent } from 'react'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap'
import { Card, CardImg, CardText, CardBlock } from 'reactstrap'
import { Player, ControlBar, BigPlayButton, FullscreenToggle } from 'video-react'
import AudioPlayer from '../../components/AudioPlayer'
import CollectionItemLink from '../../components/CollectionItemLink'
import * as d3Color from 'd3-color'
import Background from '../../components/Background'
import MediaQuery from 'react-responsive'
import {
  lockScroll,
  unlockScroll,
} from '../../state/actions'

const fullHeight = { height: '100%', position:'relative'}

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
    this.props.unlockScroll()
  }

  toggleFullscreen = () => {
    if (this.state.player.isFullscreen) {
      this.props.unlockScroll()
    } else {
      this.props.lockScroll()
    }
    this.player.toggleFullscreen()
  }

  handleResize = () => {
    const node = ReactDOM.findDOMNode(this)
    this.setState({
      width: node.parentNode.clientWidth,
      height: node.parentNode.clientHeight,
    })
  }

  handlePlayerChange = (state) => {
    // User exit fullscreen mode \w ESC key unlock scroll
    if (
      this.state.player.isFullscreen &&
      this.state.player.isFullscreen !== state.isFullscreen
    ) {
      this.props.unlockScroll()
    }

    this.setState({
      player: state,
    })
  }

  render() {
    const { player, width, height } = this.state
    let useHeight = height -80;

    let playerHeight = 0
    let playerWidth = 0

    if (player.videoHeight && player.videoWidth && width && useHeight) {
      const videoMaxHeight = width * (player.videoHeight / player.videoWidth)
      if (videoMaxHeight < useHeight) {
        playerHeight = videoMaxHeight
        playerWidth = width - 30
      } else {
        playerHeight = useHeight
        playerWidth = useHeight * (player.videoWidth / player.videoHeight)
      }
    }

    const { module } = this.props
    const media = get(module, 'id.url', get(module, 'id.attachment'))
    const size = get(module, 'size')
    const position = get(module, 'position')
    const backgroundColor = get(module, 'background.color')
    const backgroundColorRgb = d3Color.color(backgroundColor || '#373a3c').rgb()

    const objectVideoFullStyle = {
      backgroundImage: `linear-gradient(to bottom, rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},1) 0%,rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},0.0) 5%,rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},0) 100%)`,
    }

    return (
      <Card className="Module__objectCard video">
        {(size != 'big') &&
        <div className="Module__objectCard_video">
          <Player fluid={true} ref={ref => this.player = ref}>
            <source src={media} />
            <BigPlayButton position="center" />
            <ControlBar autoHide={false}>
              <FullscreenToggle
                actions={{
                  toggleFullscreen: this.toggleFullscreen,
                }}
              />
            </ControlBar>
          </Player>
        </div>
        }
        {(size != 'big') &&
          <div className="ModuleObjectContentImage__Link"><CollectionItemLink doc={module.id}/></div>
        }
        {(size === 'big') &&
          <div className="Module__objectCard_videoFull">
            <Player fluid={false} ref={ref => this.player = ref}>
              <source src={media} />
              <BigPlayButton position="center" />
              <ControlBar autoHide={false}>
                <FullscreenToggle
                  actions={{
                    toggleFullscreen: this.toggleFullscreen,
                  }}
                />
              </ControlBar>
            </Player>
            <div className="Module__objectCard_videoFull_overlay" style={objectVideoFullStyle}></div>
          </div>
        }
        <CardBlock className="video_full">
          <CardText>
            <i className="icon-hand"  />
            {module.caption}
          </CardText>
        </CardBlock>
        {(size === 'big') &&
          <div className="ModuleObjectContentImage__Link videoFull"><CollectionItemLink doc={module.id}/></div>
        }
      </Card>
    )
  }
}

const ModuleObjectContentVideoLockable = connect(undefined, {
  lockScroll,
  unlockScroll,
})(ModuleObjectContentVideo)

const ModuleObjectContentImage = pure(({ module, resize }) => {
  const media = get(module, 'id.attachment')
  const size = get(module, 'size')
  const position = get(module, 'position')
  const backgroundColor = get(module, 'background.color')
  const backgroundColorRgb = d3Color.color(backgroundColor || '#373a3c').rgb()

  let backgroundImage = `linear-gradient(to bottom, rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},1) 0%,rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},0.0) 5%,rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},0) 100%),url(${media})`

  if(!module.caption && size == 'big'){
    backgroundImage = `linear-gradient(to bottom, rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},1) 0%,rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},0.0) 5%,rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},0) 100%),
    linear-gradient(to top, rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},1) 0%,rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},0.0) 5%,rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},0) 100%),
     url(${media})`;
  }

  const objectImgFullStyle = {
    width: '100%',
    backgroundSize: 'cover',
    backgroundImage: backgroundImage,
    backgroundPosition: 'center center'
  }


  return (
      <Card className="Module__objectCard">
        {(size != 'big' || resize) &&
          <CardImg top className="Module__objectCard_img" src={media}/>
        }
        {(size != 'big' || resize) &&
          <div className="ModuleObjectContentImage__Link"><CollectionItemLink doc={module.id}/></div>
        }
        {(size === 'big' && !resize) &&
          <div style={objectImgFullStyle} className="Module__objectCard_imgFull">
            <div className="ModuleObjectContentImage__Link"><CollectionItemLink doc={module.id}/></div>
          </div>
        }

        {(module.caption) &&
            <CardBlock className="Module__object_caption_text">
              <i className="icon-hand Module__object_caption_hand"  />
              <div className="Module__object_caption_text_cont">
                <CardText>
                  {module.caption}
                </CardText>
              </div>
            </CardBlock>
          }
      </Card>
  )
})

class ModuleObjectContentAudio extends PureComponent {
  render() {
    const { module } = this.props
    let media = get(module, 'id.attachment')
    let title = get(module, 'id.translated.title')

    if(!media){ return null }

    // #TODO: FIXME SERVERS SIDE (OR HANDLE WITH PROXY)
    if (media.indexOf("http://178.62.220.183/media/http") == 0){
      media = decodeURIComponent(media.replace("http://178.62.220.183/media/", ""))
    }

    return (
      <div className='Module__object__audio'>
        <div className='Module__object__audio_wrapper'>
          <AudioPlayer source={`https://cors-anywhere.herokuapp.com/${media}`} title={title}/>
        </div>
        <div className="Module__object__audio__caption">
          <span>
            <i className="icon-hand"  />
            <span> {module.caption}</span>
          </span>
          <div><CollectionItemLink doc={module.id}/></div>
        </div>
      </div>
    )
  }
}

export const ModuleObjectContent = ({ module, resize }) => {
  if (module.type === 'video') {
    return <ModuleObjectContentVideoLockable module={module} />
  } else if (module.type === 'image') {
    return <ModuleObjectContentImage module={module} resize={resize} />
  } else if (module.type === 'audio') {
    return <ModuleObjectContentAudio module={module} />
  } else {
    throw new Error(`ModuleObject invalid module type [${module.type}]`)
  }
}

class ModuleObject extends PureComponent {
  render() {
    const { chapter, module } = this.props

    let size = get(module, 'size')
    if (module.type === 'audio') {
      size = 'big' }

    const backgroundColor = get(module, 'background.color')
    const backgroundImage = get(module, 'background.object.id.attachment')
    const backgroundOverlay = get(module, 'background.object.overlay')
    const bbox = get(module, 'background.object.bbox')

    let offset = 4;
    let col = 4;

    if(size === 'medium'){
      col = 8;
      offset = 2;
    }else if(size === 'big'){
      col = 12;
      offset = 0;
    }

    return (
      <div style={fullHeight}>
        <Background
          image={backgroundImage}
          color={backgroundColor}
          overlay={backgroundOverlay}
          bbox={bbox}
        />
        <MediaQuery maxWidth={767}>
            <Container fluid className="Module__container_obj mediumModule">
              <Row className="Module__object_row">
                  <Col lg={{ size: col, offset: offset }} className="d-flex">
                    <ModuleObjectContent module={module} resize={true}/>
                  </Col>
              </Row>
             </Container>
        </MediaQuery>
        <MediaQuery minWidth={768}>
          <Container fluid className={"Module__container_obj " + size+"Module"}>
            <Row className="Module__object_row">
                <Col lg={{ size: col, offset: offset }} className="d-flex">
                  <ModuleObjectContent module={module}/>
                </Col>
            </Row>
           </Container>
         </MediaQuery>
      </div>
    )
  }
}


export default ModuleObject
