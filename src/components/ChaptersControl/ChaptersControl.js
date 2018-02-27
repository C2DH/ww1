import React, { PureComponent } from 'react'
import './ChaptersControl.css'
import './circle.css'

class ChaptersControl extends PureComponent {
  componentDidMount() {
    //window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    //window.removeEventListener('keydown', this.handleKeyPress)
  }

  // handleKeyPress = (e) => {
  //   const { hasPrev, hasNext, onClickPrev, onClickNext } = this.props
  //   if (e.key === 'ArrowDown' && hasNext) {
  //     onClickNext()
  //   }
  //   if (e.key === 'ArrowUp' && hasPrev) {
  //     onClickPrev()
  //   }
  // }

  render() {
    const { hasNext, hasPrev, title, onClickTheme, onClickNext, onClickPrev, currentIndex, count, onClickChapters, moduleIndex, moduleTot } = this.props
    let percentage = parseInt(moduleIndex*100/moduleTot);
    return (
      <div>

        <div className="Theme__title d-md-none d-flex align-items-center justify-content-center animated fadeInDown ChaptersControl__delay">
          <h2 onClick={onClickTheme} className="m-0">{title}</h2>
        </div>

        <div className="ChaptersControl__chapters_num_container animated fadeInRight ChaptersControl__delay">
          <span className="AtlasGrotesk-Medium-Web d-none d-md-block ChaptersControl__chapters_num_container_title" onClick={onClickTheme}>{title}</span>
          {/*<button onClick={onClickChapters} className="btn ChaptersControl__chapters_btn rounded-circle">{currentIndex}/{count}</button>*/}
          <div onClick={onClickChapters} className="ChaptersControl__chapters_progress">
            <div className={`c100 p${percentage}`}>
                <span>{currentIndex}/{count}</span>
                <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                </div>
            </div>
          </div>
        </div>
        <div className="ChaptersControl__controls_container d-none d-md-block animated fadeInRight ChaptersControl__delay">
          <button onClick={onClickPrev} disabled={!hasPrev} className="btn rounded-circle ChaptersControl__chapters_btn ChaptersControl__chapters_btn_control"><i className="material-icons md-26">keyboard_arrow_up</i></button>
          <button onClick={onClickNext} disabled={!hasNext} className="btn rounded-circle ChaptersControl__chapters_btn ChaptersControl__chapters_btn_control"><i className="material-icons md-26">keyboard_arrow_down</i></button>
        </div>

        <div className="ChaptersControl__controls_container_mobile d-flex d-md-none animated fadeInUp ChaptersControl__delay">
          <div className="w-50">
            <button onClick={onClickPrev} disabled={!hasPrev} className="h-100 border-0 btn btn-secondary btn-block rounded-0">
              <i className="material-icons md-26">keyboard_arrow_up</i>
            </button>
          </div>
          <div className="w-50">
            <button onClick={onClickNext} disabled={!hasNext} className="h-100 border-0 btn btn-secondary btn-block rounded-0">
              <i className="material-icons md-26">keyboard_arrow_down</i>
            </button>
          </div>
        </div>

      </div>
    )
  }
}

export default ChaptersControl
