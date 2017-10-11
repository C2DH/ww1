import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import ModuleText from './ModuleText'
import ModuleObject from './ModuleObject'
import ModuleGallery from './ModuleGallery'
import ModuleMap from './ModuleMap'
import ModuleTextObject from './ModuleTextObject'
import ModuleTextMap from './ModuleTextMap'
import ModuleTextGallery from './ModuleTextGallery'
// import ModuleMapText from './ModuleMapText'

import { get } from 'lodash'
import { setScrollDelta } from '../../state/actions'
import { scaleLinear } from 'd3-scale'
import ScrollLock from 'react-scrolllock'
import { ScrollHelperTop, ScrollHelperBottom, BASE_SCROLL_HELPER_HEIGHT } from '../../components/ScrollHelpers'

import {
  getTheme,
  getChapter,
  getTotalChapterModules,
  getChapterIndex,
  makeGetModule,
} from '../../state/selectors'

import './Module.css'

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
    case 'text_map':
      return ModuleTextMap
    case 'text_gallery':
      return ModuleTextGallery

    default:
      throw new Error(`Invalid module type ${moduleType}`)
  }
}



class Module extends PureComponent {

  scrollScale = scaleLinear()
    .domain([-BASE_SCROLL_HELPER_HEIGHT, 0, BASE_SCROLL_HELPER_HEIGHT])
    .range([0, 1, 0])

  state = {
    moduleHeight : 0,
    stopScroll: true,
    scrolling: 0,
  }

  componentWillReceiveProps (nextProps){

    if (this.props.scroll !== nextProps.scroll){
      if(nextProps.scroll === BASE_SCROLL_HELPER_HEIGHT){
        this.setState({scrolling:-1})
        this.toNextModule()
      }
    }

    if (this.props.scroll !== nextProps.scroll){
      if(nextProps.scroll === -BASE_SCROLL_HELPER_HEIGHT){
        this.setState({scrolling:1})
        this.toPrevModule()
      }
    }

  }

  componentDidMount(){
    this._isMounted = true
    window.scrollTo(0, BASE_SCROLL_HELPER_HEIGHT)

    this.setState({stopScroll:true})
    setTimeout(()=>{
      if(this._isMounted){
        this.setState({stopScroll:false})
      }
    }, 1200)
  }

  componentWillUnmount(){
    this._isMounted = false
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

  toPrevModule = () => {
    const { moduleIndex, history, theme, chapter, chapterIndex } = this.props

    const themeUrl = `/themes/${theme.slug}`
    const chapterUrl = `${themeUrl}/chapters/${chapter.slug}`

    if (moduleIndex > 1) {
      history.push(`${chapterUrl}/modules/${Number(moduleIndex) - 1}`)
    } else {
      if(chapterIndex > 1){
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

    const background = module.background || {}
    let bottomScrollBackground

    const topScrollBackground = background.color ?  background.color : background.object ? background.object.overlay : 'transparent'
    const topScrollOverlay =  background.object &&  background.object.overlay


    if((module.size && module.size === 'big') || module.module === 'map' || module.module === 'gallery'){
      bottomScrollBackground = '#fff'
    } else {
      bottomScrollBackground = topScrollBackground
    }
    const bottomScrollOverlay = topScrollOverlay

    // console.log("opacity", this.scrollScale(this.props.scroll))
    // console.log("mh", this.state.moduleHeight)

    return  <div>
    <ScrollHelperTop moduleIndex={moduleIndex} background={topScrollBackground} overlay={topScrollOverlay}/>
    <div style={{ marginTop: this.state.scrolling * 150, ...moduleContainerStyle,
        // opacity:1 - (this.props.scroll/1000)
        opacity: this.scrollScale(this.props.scroll)
      }}>
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
    <ScrollHelperBottom moduleIndex={moduleIndex} background={bottomScrollBackground} overlay={bottomScrollOverlay}/>
    {this.state.stopScroll && <ScrollLock/> }
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
