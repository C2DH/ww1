import React, { PureComponent } from 'react'
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

const THEMES = [
  {
    id: 1,
    title: "The Occupation",
    cover: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Approaching_Omaha.jpg'
  },
  {
    id: 2,
    title: "Death on the home front",
    cover: 'https://tesisecondaguerramondiale.files.wordpress.com/2013/06/russian-front-eastern-front-ww2-second-world-war-two-rare-pics-pictures-images-photos-005.jpg',
  },
  {
    id: 3,
    title: "The food crisis",
    cover: 'http://www.xsjjys.com/data/out/282/WHDQ-514151224.jpg',
  },
  {
    id: 4,
    title: "Migrations",
    cover: 'http://i2.cdn.cnn.com/cnnnext/dam/assets/140828132527-03-world-war-ii-horizontal-large-gallery.jpg',
  },
  {
    id: 5,
    title: "The aftermath",
    cover: 'https://polishpress.files.wordpress.com/2008/01/old_town_warsaw_waf-2012-1501-311945.jpg',
  }
]

class ThemeContainer extends PureComponent {
  handleOnMouseEnter = () => {
    this.props.onEnterTheme(this.props.theme)
  }
  handleOnMouseLeave = () => {
    this.props.onLeaveTheme(this.props.theme)
  }

  render() {
    const { theme, hover, responsiveBackground } = this.props
    var MediaQuery = require('react-responsive')
    return (
       <div>
         <MediaQuery minDeviceWidth={768} className="Themes__theme_container">
           <hr />
           <h2 className="Themes__theme_title">
             <span
             onMouseEnter={this.handleOnMouseEnter}
             onMouseLeave={this.handleOnMouseLeave}>
               {hover ? <i className="fa fa-hand-pointer-o Themes__hand_pointer_left" /> : null}{theme.title}{hover ? <i className="fa fa-hand-pointer-o Themes__hand_pointer_right" /> : null}</span></h2>
           <hr className="hidden-md-up" />
        </MediaQuery>
        <MediaQuery maxWidth={767} className="Themes__theme_container" style={{backgroundImage: `url(${responsiveBackground})`}}>
          <hr />
          <h2 className="Themes__theme_title">
            <span
            onMouseEnter={this.handleOnMouseEnter}
            onMouseLeave={this.handleOnMouseLeave}>
              {hover ? <i className="fa fa-hand-pointer-o Themes__hand_pointer_left" /> : null}{theme.title}{hover ? <i className="fa fa-hand-pointer-o Themes__hand_pointer_right" /> : null}</span></h2>
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
    return (
      <Container fluid className="padding-r-l-0 Themes__container"
        style={{ backgroundImage: hoverTheme ? `url(${hoverTheme.cover})` : undefined }}>
        <Row className="Themes__TitleRow">
          <h1>Themes</h1>
        </Row>
        <Row>

          <div className="Themes__theme_title_container">
            {THEMES.map(theme =>(
              <ThemeContainer
                key={theme.id}
                theme={theme}
                hover={hoverTheme && theme.id === hoverTheme.id}
                onEnterTheme={this.handleOnEnterTheme}
                onLeaveTheme={this.handleOnLeaveTheme}
                responsiveBackground={theme.cover}
              />
            ))}
            <hr className="hidden-md-down" />
          </div>
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
