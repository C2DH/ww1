import React, { PureComponent } from 'react'
import { find } from 'lodash'
import { connect } from 'react-redux'
import WayPoint from 'react-waypoint'
import moment from 'moment'
import { Container, Row, Col } from 'reactstrap'
import TimelineExpandableItem from '../../components/TimelineExpandableItem'
import TimelineExpandableYear from '../../components/TimelineExpandableYear'
import {
  loadTimelineDocuments,
  unloadTimelineDocuments,
} from '../../state/actions'
import {
  getTimelineDocuments,
  getTimelineDocumentsLoading,
} from '../../state/selectors'
import './Timeline.css'

const YEARS = [1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1924]

class Timeline extends PureComponent {
  state = {
    viewedYear: null,
    viewedMonth: null,
    scrollToId: null,

  }

  componentDidMount() {
    this.props.loadTimelineDocuments()
  }

  componentWillUnmount() {
    this.props.unloadTimelineDocuments()
  }

  entering = (doc) => {
    const m = moment(doc.data.start_date)
    this.setState({
      viewedYear: m.year(),
      viewedMonth: m.month() + 1,
    })
  }

  moveToDocAtYearAndMonth = (year, month) => {
    const doc = find(this.props.documents, d => {
      const [docYear,docMonth] = d.data.date.original.split('-')
      const sameYear = year === +docYear
      if (month) {
        return sameYear && month === +docMonth
      } else {
        return sameYear
      }
    })
    if (doc) {
      let nextState = {
        scrollToId: doc.id,
        viewedYear: year,
      }
      if (month) {
        nextState = { ...nextState, viewedMonth: month }
      }
      this.setState(nextState)
    }
  }

  onItemScrollComplete = () => {
    this.setState({ scrollToId: null })
  }

  render() {
    const { documents } = this.props
    return (
      <div className="Timeline__Wrapper">
        <div className="Timeline__TopRow d-flex align-items-center">
          <Container>
            <Row>
              <Col md="12">
                <h2>Timeline</h2>
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="Timeline__Content">
          <Row>
            <Col lg="1" md="12" sm="12" xs="12" className="Timeline__TimelineNav fixed">
              <div className="Timeline__yearsContainer d-flex flex-lg-column">
                <div className="hidden-lg-up Timeline__yearsContainer_responsive_borders"></div>
                {YEARS.map(year =>(
                   <TimelineExpandableYear
                     onYearClick={this.moveToDocAtYearAndMonth}
                     open={year === this.state.viewedYear}
                     openMonth={this.state.viewedMonth}
                     year={year}
                     key={year}
                   />
                ))}
              </div>
            </Col>
            {documents && <Col lg="11" md="12" sm="12" xs="12" className="Timeline__scrollingCol">
              {documents.map(doc => (
                <div key={doc.id} className="Timeline__expandable_wrapper">
                  <TimelineExpandableItem
                    scrollTo={doc.id === this.state.scrollToId}
                    onScrollComplete={this.onItemScrollComplete}
                    item={doc}
                    key={doc.id}
                  />
                  <WayPoint onEnter={() => this.entering(doc)} />
                </div>
              ))}
            </Col>}
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  documents: getTimelineDocuments(state),
  loading: getTimelineDocumentsLoading(state),
})

export default connect(mapStateToProps, {
  loadTimelineDocuments,
  unloadTimelineDocuments,
})(Timeline)
