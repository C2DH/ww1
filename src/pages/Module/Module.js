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


const BASE_SCROLL_HELPER_HEIGHT = 1000

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

  handleScroll = (e) => {
    var rect = this.bottomHook.getBoundingClientRect();
    const delta = this.initialTop - rect.top
    console.log("delta", delta, this.props.moduleIndex)
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
            height:BASE_SCROLL_HELPER_HEIGHT-this.props.scroll, backgroundColor:'teal', width: '100%', position:'relative',
            opacity: 0.05,
          }}>
          <div ref={(r)=>{
            this.bottomHook=r;
          }} style={{position:'absolute', bottom:0, height:2, backgroundColor:'red', right:0, left:0}}></div>
        </div>
    )

  }
})

class Module extends PureComponent {

  componentWillReceiveProps (nextProps){
    console.log(nextProps.scroll)
    if (this.props.scroll !== nextProps.scroll){
      if(nextProps.scroll > 800){
        console.log("bye bye")
        this.toNextModule()
        window.scrollTo(0,0)
      }
    }
  }

  componentDidMount(){
    this.props.setScrollDelta(0)
  }

  toNextModule = () => {
    const { moduleIndex, totalChapterModules, history, theme, chapter, chapterIndex } = this.props
    const nextChapterSlug = get(theme, `stories[${Number(chapterIndex) + 1}].slug`)
    const themeUrl = `/themes/${theme.slug}`
    const chapterUrl = `${themeUrl}/chapters/${chapter.slug}`

    if (moduleIndex < totalChapterModules) {
      history.push(`${chapterUrl}/modules/${Number(moduleIndex) + 1}`)
    } else {
      // Go to cover of next chapter
      history.push(`${themeUrl}/chapters/${nextChapterSlug}`)
    }
  }



  render() {
    const { chapter, module, moduleIndex } = this.props
    if (!module) {
      return null
    }
    return  <div>
    <ScrollHelperTop moduleIndex={moduleIndex}/>
    <div style={{ ...moduleContainerStyle, opacity:1 - (this.props.scroll/1000) }}>
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
    <ScrollHelperBottom moduleIndex={moduleIndex}/>
  </div>
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
