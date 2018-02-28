import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import {Helmet} from 'react-helmet';
import { Container, Row, Col } from 'reactstrap'
import ManualCard from '../../components/ManualCard'
import OtherTeachersCard from '../../components/OtherTeachersCard'
import BigTitle from '../../components/BigTitle'
import EducationFooter from '../../components/EducationFooter'
import StaticStory from '../../components/StaticStory'
import { getEducationals } from '../../state/selectors'
import { loadEducationals, unloadEducationals } from '../../state/actions'
import './Education.css'

class Education extends PureComponent {
  componentDidMount() {
    this.props.loadEducationals()
  }

  componentWillUnmount() {
    this.props.unloadEducationals()
  }

  render() {
    const { educationals } = this.props
    return (
      <div className="Education__wrapper">
        <Helmet>
                <title>{this.context.t('education')}</title>
        </Helmet>
        <div className="Resources__top_wrapper animated fadeIn">
          <Container>
            <BigTitle title={this.context.t('education')} />
            <Row>
              <Col>
                  <h6 className="Education__h6">{this.context.t('introduction and pedagogical approach')}</h6>
                  <StaticStory slug='education' />
              </Col>
            </Row>
          </Container>
        </div>
        {educationals && <Container className="animated fadeIn">
          <Row>
            <Col>
              <h6 className="Education__h6">{this.context.t('pedagogical activities')}</h6>
            </Col>
          </Row>
          <Row className="Education__ManualsRow">
            {educationals.map(edu => (
              <Col lg="4" xs="12" key={edu.id}>
                <ManualCard
                  onClick={() => this.props.history.push(`/education/${edu.slug}`)}
                  title={edu.data.title}
                  image={get(edu, 'covers[0].data.resolutions.medium.url')}
                />
              </Col>
            ))}
          </Row>
{        /*  <Row>
            <Col md="12">
              <div className="Education__OtherTeachersRow">
                <h6 className="Education__h6">See how other teachers used our materials</h6>
                <div className="Education__Card-container">
                  <OtherTeachersCard />
                  <OtherTeachersCard />
                </div>
              </div>
            </Col>
          </Row> */}
        </Container>}
        { educationals &&
          <EducationFooter />
        }
      </div>
    )
  }
}

Education.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  educationals: getEducationals(state),
})

export default connect(mapStateToProps, {
  loadEducationals,
  unloadEducationals,
})(Education)
