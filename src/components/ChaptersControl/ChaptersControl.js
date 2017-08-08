import React, { PureComponent } from 'react'
import './ChaptersControl.css'

class ChaptersControl extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress = (e) => {
    const { hasPrev, hasNext, onClickPrev, onClickNext } = this.props
    if (e.key === 'ArrowDown' && hasNext) {
      onClickNext()
    }
    if (e.key === 'ArrowUp' && hasPrev) {
      onClickPrev()
    }
  }

  render() {
    const { hasNext, hasPrev, title, onClickTheme, onClickNext, onClickPrev, currentIndex, count } = this.props
    return (
      <div>
        <div className="ChaptersControl__chapters_num_container">
          <span onClick={onClickTheme}>{title}</span>
          <button className="ChaptersControl__chapters_btn">{currentIndex}/{count}</button>
        </div>
        <div className="ChaptersControl__controls_container">
          {hasPrev && <button onClick={onClickPrev} className="ChaptersControl__chapters_btn ChaptersControl__chapters_btn_control"><i className="material-icons md-26">keyboard_arrow_up</i></button>}
          {hasNext && <button onClick={onClickNext} className="ChaptersControl__chapters_btn ChaptersControl__chapters_btn_control"><i className="material-icons md-26">keyboard_arrow_down</i></button>}
        </div>
      </div>
    )
  }
}

export default ChaptersControl
