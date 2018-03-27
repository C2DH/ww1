import React, { PureComponent } from 'react'
import { Card, CardImg, CardText, CardBlock } from 'reactstrap'
import $ from 'jquery';

export default class Caption extends PureComponent {

  componentDidMount(){
    //console.log(this.refs.caption.scrollLeft = this.refs.caption.scrollLeftMax)
  }

  getScrollTarget = (ref) => {
    this.scrollTarget = ref;
   }

  handleHover = () =>{
    const maxScroll =  this.scrollTarget.scrollWidth - this.scrollTarget.clientWidth;
    $(this.scrollTarget).stop().animate({scrollLeft: maxScroll}, maxScroll*30)
  }

  handleOut = () =>{
    const maxScroll =  this.scrollTarget.scrollWidth - this.scrollTarget.clientWidth;
    $(this.scrollTarget).stop().animate({scrollLeft: 0}, maxScroll*30)
  }

  render() {
    const { caption } = this.props

    return (
      <div className="Module__object_caption_text_wrap">
        <i onMouseOver={this.handleHover} onMouseOut={this.handleOut} className="icon-hand Module__object_caption_hand"  />
        <div className="Module__object_caption_text_cont">
          <p className="card-text" ref={this.getScrollTarget}>
            {caption}
          </p>
        </div>
      </div>
    )
  }
}
