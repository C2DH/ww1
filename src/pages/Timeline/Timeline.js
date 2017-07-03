import React, { PureComponent } from 'react'
import { find } from 'lodash'
import { connect } from 'react-redux'
import WayPoint from 'react-waypoint'
import moment from 'moment'
import { Row, Col } from 'reactstrap'
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

  onYearClick = (year) => {
    const doc = find(this.props.documents, d => {
      // TODO: Better to this ehheeh
      const currentYear = +d.data.date.original.split('-')[0]
      return currentYear === year
    })
    if (doc) {
      this.setState({ scrollToId: doc.id })
    }
  }

  onItemScrollComplete = () => {
    this.setState({ scrollToId: null })
  }

  render() {
    const { documents } = this.props
    return (
      <div style={{height: '100vh'}}>
        <Row className="Timeline__TopRow">
          <Col md="12">
            <h2>Timeline</h2>
          </Col>
        </Row>
        <Row>
          <Col md="2" sm="12" xs="12" className="Timeline__TimelineNav fixed">
            <div className="Timeline__yearsContainer">
              {YEARS.map(year =>(
                 <TimelineExpandableYear
                   onYearClick={this.onYearClick}
                   open={year === this.state.viewedYear}
                   openMonth={this.state.viewedMonth}
                   year={year}
                   key={year}
                 />
              ))}
            </div>
          </Col>
          {documents && <Col md="10" sm="12" xs="12" className="Timeline__scrollingCol">
            {documents.map(doc => (
              <div key={doc.id}>
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
