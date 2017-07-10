import React, { PureComponent } from 'react'
import { get } from 'lodash'
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'
import { Container, Row } from 'reactstrap';
import './Themes.css'
import {
  loadThemes,
  unloadThemes,
} from '../../state/actions'
import {
  getThemes,
  getThemesLoading,
  getThemesError,
} from '../../state/selectors'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class ThemeContainer extends PureComponent {
  handleOnMouseEnter = () => {
    this.props.onEnterTheme(this.props.theme)
  }
  handleOnMouseLeave = () => {
    this.props.onLeaveTheme(this.props.theme)
  }

  render() {
    const { theme, hover, responsiveBackground } = this.props
    return (
       <div>
         <MediaQuery minWidth={768} className="Themes__theme_container">
           <hr />
           <h2 className="Themes__theme_title">
             <span
             onMouseEnter={this.handleOnMouseEnter}
             onMouseLeave={this.handleOnMouseLeave}>
               {hover ? <i className="icon-hand Themes__hand_pointer_left" /> : null}{theme.translated.title}{hover ? <i className="icon-hand-reverse Themes__hand_pointer_right" /> : null}</span></h2>
           <hr className="hidden-md-up" />
        </MediaQuery>
        <MediaQuery maxWidth={767} className="Themes__theme_container" style={{backgroundImage: `url(${responsiveBackground})`}}>
          <hr />
          <h2 className="Themes__theme_title">{theme.translated.title}</h2>
          <hr className="hidden-md-up" />
       </MediaQuery>

       </div>
    )

  }
}

class Themes extends PureComponent {
  state = {
    hoverTheme: null,
  }

  componentDidMount() {
    this.props.loadThemes()
  }

  componentWillUnmount() {
    this.props.unloadThemes()
  }

  handleOnEnterTheme = (theme) => {
    this.setState({ hoverTheme: theme })
  }

  handleOnLeaveTheme = (theme) => {
    this.setState({ hoverTheme: null })
  }

  render () {
    const { hoverTheme } = this.state
    const { themes } = this.props

    return (
      <Container fluid className="padding-r-l-0 Themes__container">
        {/* style={{ backgroundImage: hoverTheme ? `url(${hoverTheme.cover})` : undefined }}> */}
        <CSSTransitionGroup component="div"
        transitionName="backgroundTheme"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        {hoverTheme && (
          <div key="background" style={{
            width: '100%',
            height: '100%',
            position:'absolute',
            zIndex: 1000,
            backgroundImage: `url(${get(hoverTheme, 'covers[0].attachment')})`
          }}
          className="Themes__backgroundTheme">
          </div>
        )}
        </CSSTransitionGroup>
        <Row className="Themes__TitleRow" style={{zIndex: 1001}}>
          <h1>Themes</h1>
        </Row>
        <Row>

          {themes && <div className="Themes__theme_title_container" style={{zIndex: 1001}}>
            {themes.map(theme =>(
              <ThemeContainer
                key={theme.id}
                theme={theme}
                hover={hoverTheme && theme.id === hoverTheme.id}
                onEnterTheme={this.handleOnEnterTheme}
                onLeaveTheme={this.handleOnLeaveTheme}
                responsiveBackground={get(theme, 'covers[0].attachment')}
              />
            ))}
            <hr className="hidden-md-down" />
          </div>}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  themes: getThemes(state),
  loading: getThemesLoading(state),
  error: getThemesError(state),
})

export default connect(mapStateToProps, {
  loadThemes,
  unloadThemes,
})(Themes)
