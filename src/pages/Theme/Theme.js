import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap';
import './Theme.css'

import {
  getTheme,
} from '../../state/selectors'

import {
  loadTheme,
  unloadTheme,
} from '../../state/actions'

import {
  getThemeCover,
} from '../../utils'

class Theme extends PureComponent  {
  componentDidMount() {
    this.props.loadTheme(this.props.match.params.slug)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.props.unloadTheme()
      this.props.loadTheme(nextProps.match.params.slug)
    }
  }

  componentWillUnmount() {
    this.props.unloadTheme()
  }

  render() {
    const { theme } = this.props

    let containerStyle = {}
    if (theme) {
      containerStyle = { backgroundImage: `url(${getThemeCover(theme)})` }
    }

    return (
      <Container fluid className="padding-r-l-0 Theme__container" style={containerStyle}>
        {theme && <div className="Theme__inner_container">
          <div className="Theme__chapters_btn_container">
            <span>Chapters</span>
            <button className="Theme__chapters_btn"><i className="material-icons md-24">list</i></button>
          </div>
          <label>THEME</label>
          <h1>{theme.translated.title}</h1>
          <div className="Theme__text_container">
            <p>{theme.translated.abstract}</p>
          </div>
          <button className="Theme__start_btn">START</button>
        </div>}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
})

export default connect(mapStateToProps, {
  loadTheme,
})(Theme)
