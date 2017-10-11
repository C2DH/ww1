import React from 'react'
import { connect } from 'react-redux'
import { scaleLinear } from 'd3-scale'
import { setScrollDelta } from '../../state/actions'

export const BASE_SCROLL_HELPER_HEIGHT = 100

const scrollHelperMapStateToProps = (state) => ({
    scroll: state.scroll,
})

export const scrollScale = scaleLinear()
  .domain([-BASE_SCROLL_HELPER_HEIGHT, 0, BASE_SCROLL_HELPER_HEIGHT])
  .range([0, 1, 0])

export const ScrollHelperTop = connect(scrollHelperMapStateToProps) (class extends React.PureComponent {

  render(){
    const { background='transparent', scroll } = this.props
    return (
        <div style={{
            height:BASE_SCROLL_HELPER_HEIGHT,
            backgroundColor: background,
            width: '100%',
            opacity: scrollScale(scroll),
            position:'relative'}}>
        </div>
    )

  }
})


export const ScrollHelperBottom = connect(scrollHelperMapStateToProps, { setScrollDelta }) (class extends React.PureComponent {

  bottomHook = null;
  lastScroll = null

  handleScroll = (e) => {
    if(!this.bottomHook){return}
    var rect = this.bottomHook.getBoundingClientRect();
    const h = window.innerHeight
    const bottomFade = (rect.bottom, h - rect.bottom + BASE_SCROLL_HELPER_HEIGHT)
    const delta = bottomFade > 0 ?  bottomFade : window.scrollY < BASE_SCROLL_HELPER_HEIGHT ? -(BASE_SCROLL_HELPER_HEIGHT - window.scrollY) : 0

    if(this.ctrl){
      clearTimeout(this.ctrl)
    }
    this.ctrl = setTimeout(()=>{
      if (Math.abs(delta) > 0 &&  Math.abs(delta) < 200){
        window.scroll({top: BASE_SCROLL_HELPER_HEIGHT, left:0, behavior: 'smooth'})
      }
    }, 250)

    this.props.setScrollDelta(delta)

  }

  componentDidMount(){
    var rect = this.bottomHook.getBoundingClientRect();
    this.initialTop = rect.top
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll, true)
  }

  render(){
    const { background='transparent', scroll } = this.props

    return (
        <div style={{
            // height:BASE_SCROLL_HELPER_HEIGHT-this.props.scroll,
            height:BASE_SCROLL_HELPER_HEIGHT,
            backgroundColor: background,
            width: '100%', position:'relative',
            opacity: scrollScale(scroll),
          }}>
          <div ref={(r)=>{
            this.bottomHook=r;
          }} style={{position:'absolute', bottom:0, height:2, backgroundColor:'red', right:0, left:0}}></div>
        </div>
    )

  }
})
