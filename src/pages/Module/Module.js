import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import ModuleText from './ModuleText'
import ModuleObject from './ModuleObject'
import ModuleTextObject from './ModuleTextObject'
import ModuleGallery from './ModuleGallery'
import ModuleMap from './ModuleMap'
import ModuleMapText from './ModuleMapText'
import WayPoint from 'react-waypoint'

import { get } from 'lodash'
import { setScrollDelta } from '../../state/actions'
import { scaleLinear } from 'd3-scale'
import './Module.css'

import {
  getTheme,
  getChapter,
  getTotalChapterModules,
  getChapterIndex,
  makeGetModule,
} from '../../state/selectors'

const moduleContainerStyle = {
  height: '100vh'
}

const getModuleComponent = moduleType => {
  switch (moduleType) {
    case 'text':
      return ModuleText
    case 'object':
      return ModuleObject
    case 'gallery':
      return ModuleGallery
    case 'map':
      return ModuleMap
    case 'text_object':
      return ModuleTextObject
    default:
      throw new Error(`Invalid module type ${moduleType}`)
  }
}

const fakeModule = {
  text: {
    module: 'text',
    background: {
      color: '#333'
    },
    position: 'left',
    text: {
      content: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
    }
  },

  object: {
    module : 'object',
    background: {
      color: '#333'
    },
    size: 'medium',
    caption: "ciao ciao"
  },

  text_object: {
    module: 'text_object',
    background: {
      color: '#333'
    },
    text: {
      content: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
    },
    object: {
      size: 'big',
      caption: 'hello!'
    }

  }
}


const BASE_SCROLL_HELPER_HEIGHT = 201
const SCROLL_THRESHOLD = 200

const scrollHelperMapStateToProps = (state) => ({
    scroll: state.scroll,
})


const ScrollHelperTop = connect(scrollHelperMapStateToProps) (class extends React.PureComponent {

  render(){
    return (
        <div style={{
            height:this.props.scroll, backgroundColor:'yellow', width: 1000, position:'relative', opacity: 0.2,

            // paddingTop: this.state.delta,
            // marginBottom: this.state.delta/2,
            // top: this.state.margin,
            // marginBottom: this.state.margin
          }}>
          <div ref={(r)=>{
            this.bottomHook=r;
          }} style={{position:'absolute', top:0, height:2, backgroundColor:'red', right:0, left:0}}></div>
        </div>
    )

  }
})



const ScrollHelperBottom = connect(scrollHelperMapStateToProps, { setScrollDelta }) (class extends React.PureComponent {

  bottomHook = null;
  lastTime = false

  handleScroll = (e) => {
    var rect = this.bottomHook.getBoundingClientRect();
    const delta = this.initialTop - rect.top
    this.props.setScrollDelta(delta)
  }

  componentDidMount(){
    var rect = this.bottomHook.getBoundingClientRect();
    this.initialTop = rect.top
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  render(){
    return (
        <div style={{
            height: !this.props.scroll ? BASE_SCROLL_HELPER_HEIGHT : BASE_SCROLL_HELPER_HEIGHT - this.props.scroll - 10,
            marginBottom: 10,
            // height: BASE_SCROLL_HELPER_HEIGHT,
            backgroundColor:'teal', width: '100%', position:'relative',
            opacity: 0.5,
          }}>
          <div ref={(r)=>{
            this.bottomHook=r;
          }} style={{position:'absolute', bottom:0, height:2, backgroundColor:'red', right:0, left:0}}></div>
        </div>
    )

  }
})


const ScrollingContainer = connect(scrollHelperMapStateToProps, { setScrollDelta }) (class extends React.PureComponent {

  firstScroll = false
  scrollScale = scaleLinear()
    .range([-201, 10, 0, 0, 0, 10, 201])
    .domain([-200, 100, 100, 0, 100, 100, 200])

  state = {
    renderCycle:0,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  componentWillReceiveProps(){
    // if(this.props.scroll > SCROLL_THRESHOLD || this.props.scroll < -SCROLL_THRESHOLD){
    //   window.removeEventListener('scroll', this.handleScroll, false)
    //   setTimeout(()=>{
    //     window.addEventListener('scroll', this.handleScroll, false)
    //   }, 300)
    // }
  }


  handleScroll = (e) => {
    if(this.firstScroll){
        const scaledScroll = this.scrollScale(window.scrollY - BASE_SCROLL_HELPER_HEIGHT).toFixed(2)
        // const scaledScroll = window.scrollY - BASE_SCROLL_HELPER_HEIGHT
        console.log(scaledScroll, window.scrollY - BASE_SCROLL_HELPER_HEIGHT)

        if(this.props.scroll != scaledScroll){
            this.props.setScrollDelta(scaledScroll)
        } else {
          //needed for rendering and keeping marginTop in sync
          this.setState({renderCycle:this.state.renderCycle+1})
        }
    }
  }

  render(){
    const styleProps = this.firstScroll ? { height: this.innerDiv.clientHeight + BASE_SCROLL_HELPER_HEIGHT * 2} : {}
    const xx =  window.scrollY - BASE_SCROLL_HELPER_HEIGHT
    const innerProps =  {
      marginTop :  this.firstScroll
      ? window.scrollY  //+ Math.sign(xx) / 10
      : BASE_SCROLL_HELPER_HEIGHT//BASE_SCROLL_HELPER_HEIGHT + currentScroll
    }
    return(
    <div style={styleProps}>
      <div ref={(d) => {
          this.innerDiv = d
          if(!this.firstScroll){
              window.scrollTo(0, BASE_SCROLL_HELPER_HEIGHT)
              this.firstScroll = true
          }
        }} style={innerProps}>
        {this.props.children}
      </div>
    </div>)
  }


})


class Module extends PureComponent {


  totalScroll = 0
  initialScroll = window.scrollY
  
  componentWillReceiveProps (nextProps){

    if (this.props.scroll !== nextProps.scroll){
      if(nextProps.scroll > SCROLL_THRESHOLD){
        console.log("bye bye to next")
        this.toNextModule()
        // window.scrollTo(0,0)
      }
      if(nextProps.scroll < -SCROLL_THRESHOLD){
        console.log("bye bye to prev")
        this.toPrevModule()
        // window.scrollTo(0,0)
      }
    }
  }

  handleScroll = (e) => {
    console.log("scroll event", e, window.scrollY)
    if(window.scrollY > this.initialScroll){
      console.log("down")
      this.totalScroll += window.scrollY
    } else {
      console.log("up")
      this.totalScroll -= window.scrollY
    }

    console.log("total", this.totalScroll)
    this.initialScroll = window.scrollY

  }

  componentDidMount(){
    this.props.setScrollDelta(0)
    // window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount(){
    // window.removeEventListener('scroll', this.handleScroll, false)
  }

  toNextModule = () => {
    const { moduleIndex, totalChapterModules, history, theme, chapter, chapterIndex } = this.props
    const nextChapterSlug = get(theme, `stories[${Number(chapterIndex) + 1}].slug`)
    const themeUrl = `/themes/${theme.slug}`
    const chapterUrl = `${themeUrl}/chapters/${chapter.slug}`

    if (moduleIndex < totalChapterModules) {
      history.push(`${chapterUrl}/modules/${Number(moduleIndex) + 1}`)
      return Number(moduleIndex) + 1
    } else {
      // Go to cover of next chapter
      history.push(`${themeUrl}/chapters/${nextChapterSlug}`)
      return 0
    }
  }

  toPrevModule = () => {
    const { moduleIndex, totalChapterModules, history, theme, chapter, chapterIndex } = this.props
    const themeUrl = `/themes/${theme.slug}`
    const chapterUrl = `${themeUrl}/chapters/${chapter.slug}`

    if (moduleIndex > 0) {
      history.push(`${chapterUrl}/modules/${Number(moduleIndex) -1 }`)
    } else {
      // Go to cover of next chapter
      if(chapterIndex > 0){
        const prevChapterSlug = get(theme, `stories[${Number(chapterIndex) - 1}].slug`)
        history.push(`${themeUrl}/chapters/${prevChapterSlug}`)
      }
    }
  }



  render() {
    const { chapter, module, moduleIndex } = this.props
    if (!module) {
      return null
    }
    return  <ScrollingContainer>
    {/* <ScrollHelperTop moduleIndex={moduleIndex}/> */}
    <div style={{ ...moduleContainerStyle, opacity:1 - (this.props.scroll/BASE_SCROLL_HELPER_HEIGHT) }}>
      {React.createElement(getModuleComponent(module.module), {
        chapter,
        module,
      })}
      {/* <ModuleText chapter={chapter} module={module}/> */}
      {/* <ModuleObject chapter={chapter} module={fakeModule.object}  /> */}
      {/* <ModuleTextObject chapter={chapter} module={fakeModule.text_object}  /> */}
      {/* <ModuleCarousel chapter={chapter} module={fakeModule.object} /> */}
      {/* <ModuleMap chapter={chapter} module={fakeModule.object} /> */}
      {/* <ModuleMapText chapter={chapter} module={fakeModule.text_object}  /> */}
    </div>
    {/* <div style={{height:140, backgroundColor:'red'}}>ciao</div> */}
    {/* <ScrollHelperBottom moduleIndex={moduleIndex}/> */}
  </ScrollingContainer>
  }
}


const makeMapStateToProps = () => {
  const getModule = makeGetModule()
  const mapStateToProps = (state, props) => {
    const moduleIndex = props.match.params.moduleIndex
    return {
      theme: getTheme(state),
      chapter: getChapter(state),
      module: getModule(state, moduleIndex),
      scroll: state.scroll,
      moduleIndex: moduleIndex,
      chapterIndex: getChapterIndex(state),
      totalChapterModules: getTotalChapterModules(state),
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, { setScrollDelta })(Module)
