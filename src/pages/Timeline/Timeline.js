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
  timelineDocumentEnterViewport,
  timelineDocumentLeaveViewport,
} from '../../state/actions'
import {
  getTimelineDocuments,
  getTimelineValidMonthsByYears,
  getTimelineDocumentsLoading,
  getViewedYearAndMonth,
} from '../../state/selectors'
import './Timeline.css'

const YEARS = [1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1924]

class Timeline extends PureComponent {
  state = {
    scrollToId: null,
  }

  componentDidMount() {
    this.props.loadTimelineDocuments()
  }

  componentWillUnmount() {
    this.props.unloadTimelineDocuments()
  }

  entering = (docIndex) => {
    this.props.timelineDocumentEnterViewport(docIndex)
  }

  leaving = (docIndex) => {
    this.props.timelineDocumentLeaveViewport(docIndex)
  }

  moveToDocAtYearAndMonth = (year, month) => {
    const doc = find(this.props.documents, d => {
      const m = moment(d.data.start_date)
      const docYear = m.year()
      const docMonth = m.month() + 1
      const sameYear = year === docYear
      if (month) {
        return sameYear && month === docMonth
      } else {
        return sameYear
      }
    })
    if (doc) {
      this.setState({
        scrollToId: doc.id
      })
    }
  }

  onItemScrollComplete = () => {
    this.setState({ scrollToId: null })
  }

  render() {
    const { documents, validMonthsByYears } = this.props
    const { viewedYear, viewedMonth } = this.props
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
              <div className="Timeline__yearsContainer d-flex flex-lg-column" ref={c => this.scrollContainer = c}>
                <div className="hidden-lg-up Timeline__yearsContainer_responsive_borders"></div>
                {YEARS.map(year =>(
                   <TimelineExpandableYear
                     validMonthsByYears={validMonthsByYears}
                     onYearClick={this.moveToDocAtYearAndMonth}
                     open={year === viewedYear}
                     openMonth={viewedMonth}
                     year={year}
                     key={year}
                   />
                ))}
              </div>
            </Col>
            {documents && <Col lg="11" md="12" sm="12" xs="12" className="Timeline__scrollingCol">
              {documents.map((doc, index) => (
                <div key={doc.id} className="Timeline__expandable_wrapper">
                  <TimelineExpandableItem
                    scrollTo={doc.id === this.state.scrollToId}
                    onScrollComplete={this.onItemScrollComplete}
                    item={doc}
                    key={doc.id}
                  />
                  <WayPoint
                    onEnter={() => this.entering(index)}
                    onLeave={() => this.leaving(index)}
                  />
                </div>
              ))}
            </Col>}
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { viewedYear, viewedMonth } = getViewedYearAndMonth(state)
  return {
    viewedYear,
    viewedMonth,
    documents: getTimelineDocuments(state),
    validMonthsByYears: getTimelineValidMonthsByYears(state),
    loading: getTimelineDocumentsLoading(state),
  }
}

export default connect(mapStateToProps, {
  loadTimelineDocuments,
  unloadTimelineDocuments,
  timelineDocumentEnterViewport,
  timelineDocumentLeaveViewport,
})(Timeline)
