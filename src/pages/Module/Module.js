import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ModuleText from './ModuleText'
import ModuleObject from './ModuleObject'
import ModuleGallery from './ModuleGallery'
import ModuleMap from './ModuleMap'
import ModuleTextObject from './ModuleTextObject'
import ModuleTextMap from './ModuleTextMap'
import ModuleTextGallery from './ModuleTextGallery'

import { get } from 'lodash'
import { setScrollDelta, lockScroll } from '../../state/actions'
import { scaleLinear } from 'd3-scale'
import ScrollLock from 'react-scrolllock'
import { ScrollHelperTop, ScrollHelperBottom, BASE_SCROLL_HELPER_HEIGHT, scrollScale } from '../../components/ScrollHelpers'

import {
  getTheme,
  getChapter,
  getTotalChapterModules,
  getTotalThemeChapters,
  getChapterIndex,
  makeGetModule,
  getMakeLangUrl,
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

  state = {
    stopScroll: true,
    scrolling: 0,
  }

  canGoNext = () => {
    return (this.props.chapterIndex < this.props.totalChapters -1 ) || (this.props.moduleIndex < this.props.totalChapterModules)
  }

  componentWillReceiveProps (nextProps){

    if (this.canGoNext() && this.props.scroll !== nextProps.scroll && !nextProps.scrollLock){
      if(nextProps.scroll === BASE_SCROLL_HELPER_HEIGHT){
        // this.setState({scrolling:-1})
        this.toNextModule()
      }
    }

    if (this.props.scroll !== nextProps.scroll && !nextProps.scrollLock){
      if(nextProps.scroll === -BASE_SCROLL_HELPER_HEIGHT){
        // this.setState({scrolling:1})
        this.toPrevModule()
      }
    }

  }

  componentDidMount(){
    this._isMounted = true
    window.scrollTo(0, BASE_SCROLL_HELPER_HEIGHT)

    this.props.lockScroll(1200)

    // this.setState({stopScroll:true})
    // setTimeout(()=>{
    //   if(this._isMounted){
    //     this.setState({stopScroll:false})
    //   }
    // }, 1200)
  }

  componentWillUnmount(){
    // this._isMounted = false
  }

  toNextModule = () => {
    const { moduleIndex, totalChapterModules, history, theme, chapter, chapterIndex, makeUrl } = this.props
    const nextChapterSlug = get(theme, `stories[${Number(chapterIndex) + 1}].slug`)
    const themeUrl = `/themes/${theme.slug}`
    const chapterUrl = `${themeUrl}/chapters/${chapter.slug}`
    if (moduleIndex < totalChapterModules) {
      history.push(makeUrl(`${chapterUrl}/modules/${Number(moduleIndex) + 1}`))
    } else {
      if(nextChapterSlug){
        // Go to cover of next chapter
        history.push(makeUrl(`${themeUrl}/chapters/${nextChapterSlug}`))
      }

    }
  }

  toPrevModule = () => {
    const { moduleIndex, history, theme, chapter, makeUrl } = this.props

    const themeUrl = `/themes/${theme.slug}`
    const chapterUrl = `${themeUrl}/chapters/${chapter.slug}`

    if (moduleIndex > 1) {
      history.push(makeUrl(`${chapterUrl}/modules/${Number(moduleIndex) - 1}`))
    } else {
      history.push(makeUrl(`${chapterUrl}`))
    }
  }


  render() {
    const { chapter, module } = this.props
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

    return  <div>
    <ScrollHelperTop background={topScrollBackground} overlay={topScrollOverlay}/>
    {/* This was this.state.scrolling * 150 */}
    <div style={{ marginTop: 0 * 150, ...moduleContainerStyle,
        opacity: scrollScale(this.props.scroll)
      }}>
        {React.createElement(getModuleComponent(module.module), {
          chapter,
          module,
        })}

    </div>
    <ScrollHelperBottom  background={bottomScrollBackground} overlay={bottomScrollOverlay}/>
    {/* {this.state.stopScroll && <ScrollLock/> } */}
  </div>
  }
}


const makeMapStateToProps = () => {
  const getModule = makeGetModule()
  const mapStateToProps = (state, props) => {
    const moduleIndex = Number(props.match.params.moduleIndex)
    return {
      makeUrl: getMakeLangUrl(state),
      scrollLock: state.scrollLock,
      theme: getTheme(state),
      chapter: getChapter(state),
      module: getModule(state, moduleIndex),
      scroll: state.scroll,
      moduleIndex: moduleIndex,
      chapterIndex: getChapterIndex(state),
      totalChapterModules: getTotalChapterModules(state),
      totalChapters: getTotalThemeChapters(state),
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, { setScrollDelta, lockScroll })(Module)
