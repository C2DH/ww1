import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Theme from '../Theme'
import Chapter from '../Chapter'
import NotFound from '../../components/NotFound'

import {
  getTheme,
  getThemeError,
} from '../../state/selectors'

import {
  loadTheme,
  unloadTheme,
} from '../../state/actions'

class ThemeExplorer extends PureComponent  {
  componentDidMount() {
    this.props.loadTheme(this.props.match.params.themeSlug)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.themeSlug !== this.props.match.params.themeSlug) {
      this.props.unloadTheme()
      this.props.loadTheme(nextProps.match.params.themeSlug)
    }
  }

  componentWillUnmount() {
    this.props.unloadTheme()
  }

  render() {
    const { theme, error, match } = this.props

    if (get(error, 'response.status') === 404) {
      return <NotFound />
    }

    return (
      <div>

        {theme && (
          <Switch>
            <Route path={`${match.path}`} exact component={Theme} />
            <Route path={`${match.path}/chapters/:chapterSlug`} component={Chapter} />
            <Route component={NotFound} />
          </Switch>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
  error: getThemeError(state),
})

export default connect(mapStateToProps, {
  loadTheme,
  unloadTheme,
})(ThemeExplorer)
